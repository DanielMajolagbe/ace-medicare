# ACE Medicare UK — Vercel Deployment

## Quick deploy
1. `npx vercel .`
2. Set env vars in Vercel dashboard:
   - `DATABASE_URL` — Postgres URL (Neon/Supabase/Railway)
   - `SESSION_SECRET` — long random string
3. Push the DB schema (run once against your prod DB):
   - From the repo root: `DATABASE_URL=<prod_url> pnpm --filter @workspace/db run push`

## Demo login
- Username: **admin**
- Email: **admin@acemedicare.nhs.uk**
- Password: **password123**

The backend now auto-provisions this demo admin account if it does not already exist.
