-- ============================================================================
-- Migration: 002_knowledge_base
-- Description: RAG knowledge base for roofing chatbot with pgvector
-- ============================================================================

-- 1. Enable pgvector extension
-- ============================================================================
create extension if not exists vector with schema extensions;

-- 2. Roofing knowledge base table
-- ============================================================================
create table if not exists public.roofing_knowledge (
  id          bigserial    primary key,
  chunk_id    text         unique not null,
  content     text         not null,
  embedding   vector(1536),  -- OpenAI text-embedding-ada-002 dimensions
  tokens      integer,
  category    text         check (category in (
                             'materials', 'climate', 'installation', 'maintenance',
                             'commercial', 'troubleshooting', 'company', 'insurance',
                             'pricing', 'locations', 'emergency'
                           )),
  subcategory  text,
  urgency      text        check (urgency in ('emergency', 'high', 'normal', 'informational')),
  season       text        check (season in ('spring', 'summer', 'fall', 'winter', 'year-round')),
  location     text        check (location in ('charleston', 'coastal', 'lowcountry', 'general')),
  service_type text        check (service_type in ('residential', 'commercial', 'both')),
  metadata     jsonb       default '{}'::jsonb,
  created_at   timestamptz default now(),
  updated_at   timestamptz default now()
);

comment on table public.roofing_knowledge is 'RAG knowledge base chunks for the roofing chatbot';

-- 3. Chat conversations table
-- ============================================================================
create table if not exists public.chat_conversations (
  id          uuid        primary key default gen_random_uuid(),
  session_id  text        unique not null,
  messages    jsonb       default '[]'::jsonb,
  lead_score  integer     default 0,
  status      text        default 'active' check (status in ('active', 'completed', 'handed_off')),
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);

comment on table public.chat_conversations is 'Stores chatbot conversation history and lead scoring';

-- 4. Vector similarity search function
-- ============================================================================
create or replace function public.search_knowledge_base(
  query_embedding vector(1536),
  match_threshold float default 0.62,
  match_count     int   default 5
)
returns table (
  id           bigint,
  chunk_id     text,
  content      text,
  category     text,
  subcategory  text,
  urgency      text,
  season       text,
  location     text,
  service_type text,
  metadata     jsonb,
  similarity   float
)
language plpgsql
stable
as $$
begin
  return query
    select
      rk.id,
      rk.chunk_id,
      rk.content,
      rk.category,
      rk.subcategory,
      rk.urgency,
      rk.season,
      rk.location,
      rk.service_type,
      rk.metadata,
      1 - (rk.embedding <=> query_embedding) as similarity
    from public.roofing_knowledge rk
    where 1 - (rk.embedding <=> query_embedding) > match_threshold
    order by rk.embedding <=> query_embedding
    limit match_count;
end;
$$;

comment on function public.search_knowledge_base is 'Cosine similarity search over roofing knowledge embeddings';

-- 5. IVFFlat index on embedding column
-- ============================================================================
-- IVFFlat requires existing rows to build lists; with an empty table we use a
-- small number of lists. Re-create with more lists once the table has data
-- (recommended: rows / 1000, minimum 10).
create index if not exists idx_roofing_knowledge_embedding
  on public.roofing_knowledge
  using ivfflat (embedding vector_cosine_ops)
  with (lists = 10);

-- Supporting indexes for common filter patterns
create index if not exists idx_roofing_knowledge_category   on public.roofing_knowledge (category);
create index if not exists idx_roofing_knowledge_urgency    on public.roofing_knowledge (urgency);
create index if not exists idx_roofing_knowledge_location   on public.roofing_knowledge (location);
create index if not exists idx_roofing_knowledge_season     on public.roofing_knowledge (season);
create index if not exists idx_roofing_knowledge_chunk_id   on public.roofing_knowledge (chunk_id);
create index if not exists idx_chat_conversations_session   on public.chat_conversations (session_id);
create index if not exists idx_chat_conversations_status    on public.chat_conversations (status);

-- 6. Row Level Security
-- ============================================================================

-- roofing_knowledge: service_role read/write, anon read-only
alter table public.roofing_knowledge enable row level security;

create policy "Service role full access on roofing_knowledge"
  on public.roofing_knowledge
  for all
  to service_role
  using (true)
  with check (true);

create policy "Anonymous read access on roofing_knowledge"
  on public.roofing_knowledge
  for select
  to anon
  using (true);

-- chat_conversations: anon insert + select own rows, service_role full access
alter table public.chat_conversations enable row level security;

create policy "Service role full access on chat_conversations"
  on public.chat_conversations
  for all
  to service_role
  using (true)
  with check (true);

create policy "Anonymous insert on chat_conversations"
  on public.chat_conversations
  for insert
  to anon
  with check (true);

create policy "Anonymous select own conversations"
  on public.chat_conversations
  for select
  to anon
  using (
    session_id = coalesce(
      current_setting('request.headers', true)::json ->> 'x-session-id',
      current_setting('request.jwt.claims', true)::json ->> 'session_id'
    )
  );

-- Updated_at trigger
-- ============================================================================
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger trg_roofing_knowledge_updated_at
  before update on public.roofing_knowledge
  for each row execute function public.set_updated_at();

create trigger trg_chat_conversations_updated_at
  before update on public.chat_conversations
  for each row execute function public.set_updated_at();
