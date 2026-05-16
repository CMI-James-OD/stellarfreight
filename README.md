# StellarFreight

[![Stellar](https://img.shields.io/badge/Stellar-Soroban-black.svg?style=for-the-badge&logo=stellar)](https://stellar.org)
[![Next.js](https://img.shields.io/badge/Next.js-15-black.svg?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue.svg?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

**StellarFreight** is a modern freight logistics platform that uses the [Stellar](https://stellar.org) blockchain as its primary payment rail. Shippers pay in USDC or XLM, funds are held in a Soroban smart contract escrow, and payment is released automatically on delivery confirmation — no banks, no wire delays, no hidden fees.

---

## ✨ Key Features

- **Stellar-Powered Payments** — USDC and XLM accepted natively; no bank account required
- **Soroban Smart Escrow** — funds are locked on-chain and released only on verified delivery
- **On-Chain Transparency** — every payment state is verifiable on the public Stellar ledger
- **Real-Time Shipment Tracking** — unique tracking codes, live status, blockchain receipts
- **Full Admin Dashboard** — create, update, and manage shipments with role-based access control
- **Dark / Light Mode** — full next-themes support across every page

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 15, TypeScript, Tailwind CSS v4, Framer Motion |
| UI Components | Radix UI, shadcn-style CVA components |
| Database | PostgreSQL + Prisma ORM |
| Smart Contracts | Rust + Soroban SDK (Stellar blockchain) |
| Payments | USDC on Stellar, XLM, Stellar Anchor Network (SEP-24/31) |
| Auth | Session-based (bcrypt + secure cookies) |
| Testing | Vitest + Testing Library (frontend), Cargo test (contracts) |

---

## 📁 Project Structure

```
stellarfreight/
├── frontend/          Next.js 15 app — marketing site, tracking, admin
│   ├── app/           App Router (route groups: marketing, tracking, admin)
│   ├── components/    UI components, marketing patterns, admin widgets
│   ├── content/       All page copy and data (content/marketing.ts)
│   ├── lib/           Auth, DB, utilities
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

## 🔗 Stellar Payment Flow

1. **Book** — shipper submits cargo details; system generates a Stellar payment address + Soroban escrow contract
2. **Pay** — shipper sends USDC or XLM from any Stellar-compatible wallet; payment confirms on-chain in seconds
3. **Dispatch** — escrow contract locks funds; carrier receives immediate dispatch signal
4. **Track** — carrier updates milestones; payment and delivery events are recorded on the Stellar ledger
5. **Release** — on delivery confirmation, Soroban contract releases payment to carrier automatically

All payment steps are verifiable on [stellar.expert](https://stellar.expert) using the transaction hash from your shipment dashboard.

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
