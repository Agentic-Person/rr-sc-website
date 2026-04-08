# CLAUDE.md — Restoration Roofing SC (Next.js)

## Deployment Workflow

After every commit, run all three steps:

```bash
git push origin main
git push client main
vercel --prod --scope sc-roofing --yes
```

- **origin** = `Agentic-Person/rr-sc-website` (primary repo)
- **client** = `SCROOF1/restorationroofing` (Tom's client repo)
- **vercel --prod** = deploys local build directly to production

Always push to both repos and deploy via CLI.

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
