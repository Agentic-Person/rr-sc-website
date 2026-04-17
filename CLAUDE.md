# CLAUDE.md — Restoration Roofing SC (Next.js)

## Deployment Workflow

After every commit, run both pushes:

```bash
git push origin main
git push client main
```

- **origin** = `Agentic-Person/rr-sc-website` — Vercel GitHub integration auto-deploys on every push here
- **client** = `SCROOF1/restorationroofing` (Tom's client repo — needs Vercel connected in dashboard)

**Do NOT use a deploy hook.** The Vercel GitHub integration fires automatically on push to `origin`. The Vercel project `rr-sc-website` (ID `prj_jgABxNWBIU98USh0Py4MkXCXJYPq`, team `sc-roofing`) is now correctly linked to `Agentic-Person/rr-sc-website` on `main` (relinked April 17, 2026 — it had been silently pointing at the old Vite archive `Agentic-Person/restorationroofing-sc` for ~10 days).

No active deploy hooks exist on this project — the relink wiped them. If you ever need a one-shot deploy without a commit, use the CLI: `vercel deploy --prod --yes` from the project root.

Other Vercel projects on team `sc-roofing` to leave alone:
- `td-rr-website` (ID `prj_C14FFEZ1g3RyCo63zONpsxoV5HpT`) — Vite framework preset, separate legacy project. Do not push to it or trigger its hooks.
- `td-nova-website` — unrelated (different client site).

## Commit Author

All commits must use this co-author line:
```
Co-Authored-By: Jimmy Davidson <jimmy@agenticpersonnel.com>
```

## Project Structure

- App Router: `src/app/` (pages, API routes, layouts)
- Components: `src/components/` (Header, Footer, ChatWidget, shared, ui/)
- Data: `src/lib/` (data.ts, supabase.ts, materials.ts, utils.ts)
- Knowledge base: `lib/knowledgebase/`
- Static assets: import via `@assets/` alias (maps to `attached_assets/`)
- Public: `public/` (sitemap.xml, robots.txt)

## Vercel Config

- Team: `sc-roofing`
- Project: `rr-sc-website`
- Live URL: https://rr-sc-website.vercel.app
- Framework: Next.js (auto-detected)

## Environment Variables

Client-side vars use `NEXT_PUBLIC_` prefix (not `VITE_`).
Server-side vars (OPENAI_API_KEY, SUPABASE_SERVICE_ROLE_KEY) have no prefix.

## Previous Build (Vite SPA)

The old Vite SPA build is preserved at:
- Repo: `Agentic-Person/restorationroofing-sc`
- Vercel project: `td-rr-website`
- Do not deploy from the old repo — it is an archive only.
