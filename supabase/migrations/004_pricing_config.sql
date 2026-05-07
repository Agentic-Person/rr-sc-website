-- Single-row pricing configuration table
-- Drives the customer-facing roof quote on /roof-quote and the AI chat estimate engine.
-- Edited via the gated admin tool at /tools/pricing.
--
-- Single-row pattern: a CHECK constraint pins id=1 so we can't accidentally insert
-- a second row. Updates always target id=1.

create table if not exists public.pricing_config (
  id integer primary key check (id = 1),

  -- Core formula inputs (mirror the standalone HTML calculator's "Core Variables")
  measured_squares numeric(10, 2) not null default 22,        -- benchmark roof size in roofing squares
  billable_squares numeric(10, 2) not null default 24,        -- pricing squares (after waste factor)
  duration_installed numeric(10, 2) not null default 425,     -- OC Duration installed price per square (the benchmark)
  quote_range_pct numeric(5, 2) not null default 10,          -- ±% range shown to customers
  steep_slope_add numeric(10, 2) not null default 30,         -- per-sq add-on for steep-slope roofs

  -- Raw shingle costs (drive the per-tier installed price via delta vs duration_cost)
  oak_cost numeric(10, 2) not null default 102,
  duration_cost numeric(10, 2) not null default 116,
  tamko_cost numeric(10, 2) not null default 249,

  -- Reference variables (documented in admin UI but not used in customer formula)
  labor_rate numeric(10, 2) not null default 85,
  dump_rate numeric(10, 2) not null default 15,
  permit_cost numeric(10, 2) not null default 352,
  eagle_cost numeric(10, 2) not null default 28,
  decking_sheets integer not null default 3,
  decking_price numeric(10, 2) not null default 80,

  -- Workflow state: draft (unpublished edits) vs the live snapshot
  -- The live snapshot is what /roof-quote and the chat read.
  draft jsonb,                                                -- shape mirrors the columns above; null when no draft pending
  draft_updated_at timestamptz,
  draft_updated_by text,

  -- Audit trail for the most recent publish
  last_published_at timestamptz,
  last_published_by text,

  -- Auto-managed
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- RLS: only service role can read/write. The admin page goes through a server action
-- using the service role key, so the anon role never touches this table.
alter table public.pricing_config enable row level security;

create policy "Service role full access on pricing_config" on public.pricing_config
  for all using (auth.role() = 'service_role');

-- Auto-update updated_at on every modification
create or replace function public.handle_pricing_config_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger pricing_config_updated_at
  before update on public.pricing_config
  for each row
  execute function public.handle_pricing_config_updated_at();

-- Seed the single row with the values currently shipping in production (May 6, 2026).
-- Numbers come from the on-page Roof Quote tool's calibrated formula.
insert into public.pricing_config (
  id,
  measured_squares, billable_squares, duration_installed, quote_range_pct, steep_slope_add,
  oak_cost, duration_cost, tamko_cost,
  labor_rate, dump_rate, permit_cost, eagle_cost, decking_sheets, decking_price,
  last_published_at, last_published_by
) values (
  1,
  22, 24, 425, 10, 30,
  102, 116, 249,
  85, 15, 352, 28, 3, 80,
  now(), 'system-seed'
)
on conflict (id) do nothing;
