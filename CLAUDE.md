# CLAUDE.md — Restoration Roofing SC (Next.js)

## Deployment Workflow

After every commit, run both pushes:

```bash
git push origin main
git push client main
```

- **origin** = `Agentic-Person/rr-sc-website` — Vercel GitHub integration auto-deploys on every push here
- **client** = `SCROOF1/restorationroofing` (Tom's client repo — needs Vercel connected in dashboard)

**Do NOT use a deploy hook.** The Vercel GitHub integration fires automatically on push to `origin`. Running a hook in addition creates duplicate simultaneous production deployments that race to set the production alias, breaking `live` status.

Deploy hook (for reference only, do not call): `https://api.vercel.com/v1/integrations/deploy/prj_jgABxNWBIU98USh0Py4MkXCXJYPq/QcPRUiXCDI`

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
