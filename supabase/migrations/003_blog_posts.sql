-- Blog posts table for CMS-managed blog content
create table if not exists public.blog_posts (
  id uuid default gen_random_uuid() primary key,
  slug text unique not null,
  title text not null,
  excerpt text not null,
  content text not null,
  category text not null,
  image text,
  author text default 'Restoration Roofing SC',
  published boolean default false,
  published_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  metadata jsonb default '{}'::jsonb
);

-- Enable Row Level Security
alter table public.blog_posts enable row level security;

-- Anonymous users can only read published posts
create policy "Public can read published posts" on public.blog_posts
  for select using (published = true);

-- Service role has full access (for API endpoints)
create policy "Service role full access" on public.blog_posts
  for all using (auth.role() = 'service_role');

-- Indexes for common query patterns
create index idx_blog_posts_slug on public.blog_posts (slug);
create index idx_blog_posts_published_at on public.blog_posts (published_at desc);
create index idx_blog_posts_category on public.blog_posts (category);

-- Auto-update updated_at on row modification
create or replace function public.handle_blog_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger blog_posts_updated_at
  before update on public.blog_posts
  for each row
  execute function public.handle_blog_updated_at();
