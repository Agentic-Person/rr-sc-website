-- Contact form submissions table
create table if not exists public.contact_submissions (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now() not null,
  name text not null,
  email text,
  phone text not null,
  address text,
  service text,
  message text,
  preferred_contact text default 'phone',
  status text default 'new' check (status in ('new', 'contacted', 'scheduled', 'completed', 'archived'))
);

-- Enable Row Level Security
alter table public.contact_submissions enable row level security;

-- Allow anonymous inserts (from the website form)
create policy "Allow anonymous inserts" on public.contact_submissions
  for insert with check (true);

-- Only authenticated/service role can read submissions
create policy "Service role can read all" on public.contact_submissions
  for select using (auth.role() = 'service_role');

-- Add index for sorting by date
create index idx_contact_submissions_created_at on public.contact_submissions (created_at desc);
