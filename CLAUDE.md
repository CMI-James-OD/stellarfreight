# StellarFreight - Developer Guide

## Monorepo structure
| Directory | What lives here |
|---|---|
| `frontend/` | Next.js 15 marketing + admin + tracking app |
| `backend/` | Express API + stellar-sdk (in development) |
| `contracts/` | Soroban smart contracts (Rust) |
| `docs/` | Architecture & integration documentation |

## Running locally

### Frontend
```bash
cd frontend
npm install
npm run dev
```
Runs at http://localhost:3000

### Contracts (Rust/Soroban)
```bash
cd contracts
cargo build --target wasm32-unknown-unknown --release
```
Requires Rust + `wasm32-unknown-unknown` target (see `contracts/rust-toolchain.toml`).

## Key conventions
- All page copy lives in `frontend/content/marketing.ts`
- Dark mode border pattern: always use `dark:border-white/[0.07]` alongside `border-border`
- Stellar brand colour: `text-stellar`, `bg-stellar/10`, `ring-stellar/20` utility classes
- Email domain: `@stellarfreight.com` only; do not use legacy brand domains
- Do not run `npm run build` during development - use `npm run dev`
