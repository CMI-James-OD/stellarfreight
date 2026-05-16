# StellarFreight - Architecture Overview

## Monorepo Structure

```text
stellarfreight/
├── frontend/     Next.js 15 app (marketing site + admin + tracking UI)
├── backend/      Express API + Stellar SDK (in development)
├── contracts/    Soroban smart contracts (Rust)
└── docs/         Architecture and integration docs
```

## Frontend
Next.js 15 App Router. Route groups: `(marketing)`, `(admin)`, `(tracking)`.
Prisma + PostgreSQL for shipment data (will migrate to backend service).

## Contracts
Soroban escrow contract on Stellar blockchain.
Build: `cd contracts && cargo build --target wasm32-unknown-unknown --release`

## Backend
Coming soon. Will expose REST endpoints consumed by the frontend.
