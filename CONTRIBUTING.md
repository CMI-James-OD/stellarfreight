# Contributing to StellarFreight

Thanks for contributing to StellarFreight — a Stellar-powered global freight platform.

## How to Contribute

1. Find or open an issue to discuss your proposed change.
2. Fork and clone the repository.
3. Create a focused branch: `git checkout -b feature/your-feature-name`
4. Enable the Git hooks (see below) so checks run locally before push.
5. Implement your change and add or update tests.
6. Open a pull request against `main` using the PR template.

## Development Setup

### Prerequisites

- [Node.js v20+](https://nodejs.org/)
- [Rust + Soroban CLI](https://soroban.stellar.org/docs/getting-started/setup) (for contract work)
- [Docker](https://www.docker.com/) (for PostgreSQL)

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Runs at http://localhost:3000

### Contracts (Soroban/Rust)

```bash
cd contracts/escrow
cargo test
```

Requires the `wasm32-unknown-unknown` target. See `contracts/rust-toolchain.toml`.

### Database

```bash
# Start PostgreSQL via Docker
docker-compose up -d

# Apply migrations
cd frontend && npm run db:migrate
```

## Git Hooks

Enable the shared hooks right after cloning so CI failures are caught locally:

**macOS / Linux:**
```bash
bash scripts/setup-hooks.sh
```

**Windows (PowerShell):**
```powershell
powershell -ExecutionPolicy Bypass -File scripts/setup-hooks.ps1
```

Verify: `git config --get core.hooksPath` should return `.githooks`.

The hooks run:
- **pre-commit**: Formats any staged Rust crates (`cargo fmt`) and lints staged frontend files.
- **pre-push**: Runs full checks (Rust clippy + tests, frontend lint + typecheck + tests) only on files you actually changed.

## Code Style

| Area | Standard |
|---|---|
| TypeScript / TSX | ESLint (`next/core-web-vitals`) + Prettier |
| Rust | `cargo fmt` (4-space indent) + Clippy `-D warnings` |
| CSS | Tailwind utility classes — no raw CSS unless in `globals.css` |
| Commits | Conventional Commits (`feat:`, `fix:`, `refactor:`, `docs:`, `chore:`) |

## Pull Request Process

- Keep each PR focused on one area (frontend, contracts, or backend — not all three).
- Run the hooks before pushing to avoid failing CI.
- Update docs (`docs/`, `CLAUDE.md`) when behaviour changes.
- All CI checks must be green before requesting review.

## Issue Reporting

Use the issue templates in `.github/ISSUE_TEMPLATE/`:
- **Bug Report** — for defects in the UI, API, or contract logic
- **Feature Request** — for new capability proposals
- **Smart Contract Change** — for any proposal that touches the Soroban escrow contract

## Security

For security vulnerabilities, see [SECURITY.md](SECURITY.md). Do **not** open public issues for security concerns.
