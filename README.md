# Shipment Logistics Tracker (Modernized)

This project has been migrated to a modern production-focused stack:

- Next.js App Router + TypeScript (strict mode)
- Tailwind CSS + shadcn-style UI components
- Supabase Auth + Postgres + RLS
- Zod schema validation
- Vitest + GitHub Actions CI quality gates

## Quick Start

1. Install dependencies:

```bash
npm install
```

2. Configure environment:

```bash
cp .env.example .env.local
```

Set:
- `NEXT_PUBLIC_APP_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

3. Run database bootstrap SQL in Supabase:
- `supabase/sql/001_init.sql`

4. Create an admin user in Supabase Auth dashboard (Email/Password).

5. Start dev server:

```bash
npm run dev
```

## Routes

- `/` marketing homepage
- `/about`, `/services`, `/team`, `/faqs`, `/support`, `/policy`, `/parcel`
- `/track` and `/track/[trackingCode]`
- `/admin` and `/admin/dashboard`

## Security Notes

- Firebase and legacy OTP server were removed.
- Access control is enforced via Supabase Auth and RLS policies.

## Quality Gates

```bash
npm run lint
npm run typecheck
npm test
npm run build
```