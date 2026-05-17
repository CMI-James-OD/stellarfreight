# StellarFreight

[![Stellar](https://img.shields.io/badge/Stellar-Soroban-black.svg?style=for-the-badge&logo=stellar)](https://stellar.org)
[![Next.js](https://img.shields.io/badge/Next.js-15-black.svg?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue.svg?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

**StellarFreight** is a modern freight logistics platform that uses the [Stellar](https://stellar.org) blockchain as its primary payment rail. Shippers pay in USDC or XLM, funds are held in a Soroban smart contract escrow, and payment is released automatically on delivery confirmation — no banks, no wire delays, no hidden fees.

---

## ✨ Key Features

- **Live Shipment Booking** — shippers submit cargo details and receive a unique Stellar payment address instantly; the booking is recorded in the database in real time
- **Stellar-Powered Payments** — USDC and XLM accepted natively; no bank account required
- **Soroban Smart Escrow** — escrow contract written and ready for testnet deployment; funds lock on-chain and release only on verified delivery
- **On-Chain Transparency** — every payment state is verifiable on the public Stellar ledger
- **Real-Time Shipment Tracking** — unique `TWL` tracking codes, live status updates, blockchain payment receipts
- **Full Admin Dashboard** — create, update, and manage shipments with role-based access control
- **Contact & Quote Requests** — live quote form wired to the backend
- **Dark / Light Mode** — full next-themes support across every page

---

## ✅ What's Working Now

| Feature | Status |
|---|---|
| Shipment booking (`/book`) | ✅ Live — creates DB record + generates Stellar payment address |
| Shipment tracking (`/track`) | ✅ Live |
| Contact / quote requests (`/contact`) | ✅ Live |
| Admin dashboard (create / edit / delete shipments) | ✅ Live |
| Stellar payment address generation | ✅ Live — unique `G…` address generated per booking |
| On-chain payment confirmation | 🔧 In progress — Horizon webhook listener |
| Soroban smart escrow | 🔧 Contract written (`contracts/escrow/`), testnet deployment in progress |
| Automatic fund release on delivery | 🔧 In progress |

---

## 🔗 Stellar Payment Flow

1. **Book** ✅ — shipper submits cargo details at `/book`; system generates a unique Stellar payment address and creates a DB record with `payment_status: pending`
2. **Pay** ✅ — shipper sends USDC or XLM from any Stellar-compatible wallet to the generated address; payment confirms on-chain in seconds
3. **Dispatch** 🔧 — Soroban escrow contract locks funds; carrier receives dispatch signal *(testnet deployment in progress)*
4. **Track** ✅ — shipper tracks shipment at `/track/[code]`; status updates and payment events are visible in real time
5. **Release** 🔧 — on delivery confirmation, Soroban contract releases payment to carrier automatically *(in progress)*

All payment steps are verifiable on [stellar.expert](https://stellar.expert) using the Stellar address from your booking confirmation.

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 15, TypeScript, Tailwind CSS v4, Framer Motion |
| UI Components | Radix UI, shadcn-style CVA components |
| Database | PostgreSQL + Prisma ORM |
| Smart Contracts | Rust + Soroban SDK (Stellar blockchain) |
| Payments | USDC on Stellar, XLM, Stellar payment address generation |
| Auth | Session-based (bcrypt + secure cookies) |
| Testing | Vitest + Testing Library (frontend), Cargo test (contracts) |

---

## 📁 Project Structure

```
stellarfreight/
├── frontend/          Next.js 15 app — marketing site, tracking, admin
│   ├── app/           App Router (route groups: marketing, tracking, admin)
│   │   ├── api/       API routes — /api/book, /api/contact, /api/shipments, /api/admin
│   │   ├── (marketing)/  Public pages — home, book, contact, track, services, faqs, etc.
│   │   ├── (admin)/   Admin dashboard — shipment management
│   │   └── (tracking)/ Public tracking pages
│   ├── components/    UI components, marketing patterns, admin widgets
│   ├── content/       All page copy and data (content/marketing.ts)
│   ├── lib/           Auth, DB, shipment utilities
│   ├── prisma/        Schema + migrations
│   └── public/        Images, icons
│
├── contracts/         Soroban smart contracts (Rust)
│   └── escrow/        Shipment escrow — lock, confirm, refund
│
├── backend/           Express API + stellar-sdk (in development)
├── docs/              Architecture and integration documentation
└── scripts/           Git hook setup scripts
```

---

## 🚀 Quick Start

### Prerequisites

- [Node.js v20+](https://nodejs.org/)
- [Rust](https://rustup.rs/) + `wasm32-unknown-unknown` target (for contracts)
- [Docker](https://www.docker.com/) (for PostgreSQL)

### 1. Clone and enable hooks

```bash
git clone https://github.com/CMI-James-OD/shipment_logistics_tracker.git
cd shipment_logistics_tracker

# macOS / Linux
bash scripts/setup-hooks.sh

# Windows PowerShell
powershell -ExecutionPolicy Bypass -File scripts/setup-hooks.ps1
```

### 2. Start the database

```bash
docker-compose up -d
```

### 3. Run the frontend

```bash
cd frontend
cp .env.example .env.local   # fill in your DATABASE_URL and SESSION_SECRET
npm install
npm run db:migrate
npm run dev
```

Runs at **http://localhost:3000**

### 4. Build the escrow contract (optional)

```bash
cd contracts/escrow
cargo test
cargo build --target wasm32-unknown-unknown --release
```

---

## 🧪 Testing & Quality Checks

```bash
# Frontend — lint, typecheck, unit tests
cd frontend
npm run lint
npm run typecheck
npm test

# Contracts — format check, Clippy, unit tests
cd contracts/escrow
cargo fmt --check
cargo clippy -- -D warnings
cargo test
```

---

## 📚 Documentation

| Document | Description |
|---|---|
| [Architecture](docs/ARCHITECTURE.md) | Monorepo structure and system design |
| [Contributing](CONTRIBUTING.md) | How to contribute |
| [Security](SECURITY.md) | Vulnerability reporting and security practices |
| [Code of Conduct](CODE_OF_CONDUCT.md) | Community standards |
| [Dev Guide](CLAUDE.md) | Developer conventions and quick reference |

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Enable hooks (`bash scripts/setup-hooks.sh`)
4. Make your changes and run tests
5. Open a pull request against `main`

See [CONTRIBUTING.md](CONTRIBUTING.md) for full guidelines.

---

## 🛡 Security

For vulnerabilities or security concerns, see [SECURITY.md](SECURITY.md). Do **not** open public issues for security reports.

---

## 📄 License

MIT — see [LICENSE](LICENSE) for details.

---

_Built with ❤️ for the Stellar Ecosystem_
