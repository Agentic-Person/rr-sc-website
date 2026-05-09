-- Per-tier installed prices for the customer-facing roof quote.
--
-- Before this migration, only Duration had its own installed price column;
-- Oakridge and TAMKO Hail Guard installed prices were derived as:
--   installedPerSquare = duration_installed + (shingle_cost − duration_cost)
--
-- Tom now sets installed prices per tier independently of the shingle cost
-- (shingle cost stays the raw material number; installed price covers labor,
-- overhead, margin and varies tier-to-tier for reasons outside the formula).
-- This migration adds the two missing installed-price columns and backfills
-- them from the previous formula so site behavior is unchanged until the next
-- publish from /tools/pricing.

alter table public.pricing_config
  add column if not exists oak_installed numeric(10, 2) not null default 411,
  add column if not exists tamko_installed numeric(10, 2) not null default 558;

-- Backfill the existing single row from the prior derivation so the live site
-- keeps the same numbers until Tom publishes the new ones.
update public.pricing_config
set
  oak_installed = duration_installed + (oak_cost - duration_cost),
  tamko_installed = duration_installed + (tamko_cost - duration_cost)
where id = 1;
