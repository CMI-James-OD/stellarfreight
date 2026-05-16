# Shipment Logistics Tracker (Modernized)

This project uses a modern production-focused stack:

- Next.js App Router + TypeScript (strict mode)
- Tailwind CSS + shadcn-style UI components
- Prisma + PostgreSQL
- Custom admin auth with httpOnly cookie sessions
- Zod schema validation
- Vitest + CI quality gates

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
- `DATABASE_URL`
- `ADMIN_SESSION_SECRET`
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`

3. Prepare the database:

```bash
npm run db:generate
npm run db:migrate
npm run db:seed
```

4. Start dev server:

```bash
npm run dev
```

## Routes

- `/` marketing homepage
- `/about`, `/services`, `/team`, `/faqs`, `/support`, `/policy`, `/parcel`
- `/track` and `/track/[trackingCode]`
- `/admin` and `/admin/dashboard`

## Admin Backend

- Public tracking uses `GET /api/shipments/[trackingCode]`.
- Admin login uses `POST /api/admin/login`.
- Admin logout uses `POST /api/admin/logout`.
- Admin shipment CRUD uses `/api/admin/shipments` and `/api/admin/shipments/[id]`.

## Security Notes

- Supabase has been removed.
- Admin sessions are stored in PostgreSQL and referenced by an httpOnly cookie.
- Change the default seed password before using a real environment.

## Quality Gates

```bash
npm run lint
npm run typecheck
npm test
npm run build
```
