# Security Policy

## Supported Versions

| Version | Supported |
|---------|-----------|
| main    | ✅ Yes    |
| older branches | ❌ No |

## Reporting a Vulnerability

**Please do not report security vulnerabilities through public GitHub issues.**

If you discover a potential security vulnerability in StellarFreight — whether in the Soroban escrow contract, the backend API, or the frontend — please send an email to:

**security@stellarfreight.com**

Include the following in your report:

- A clear description of the vulnerability
- Steps to reproduce (proof of concept)
- Potential impact (e.g. fund loss, data exposure, escrow bypass)
- Any suggested fixes or mitigations

We will acknowledge your report within **48 hours** and provide a resolution timeline. Please follow responsible disclosure practices and give us reasonable time to address the issue before making it public.

## Security Best Practices for Contributors

- **Never commit private keys or secrets.** All `.env` files are gitignored. Use `.env.example` for templates.
- **Contract audits.** All Soroban contract changes that affect fund custody must be reviewed before mainnet deployment.
- **Dependency hygiene.** Run `npm audit` (frontend/backend) and `cargo audit` (contracts) before raising a PR.
- **No hardcoded addresses.** Stellar contract addresses and wallet addresses must come from environment variables only.
- **Auth on every admin route.** All `/api/admin/*` routes require a valid session token.

## Stellar-Specific Security Notes

- Soroban escrow contracts are **non-custodial** — StellarFreight does not hold private keys.
- All payment state is verifiable on the public Stellar ledger via [stellar.expert](https://stellar.expert) or the [Horizon API](https://horizon.stellar.org).
- Smart contract addresses are disclosed to shippers at booking time.

## Bug Bounty

We are setting up a formal bug bounty program. In the meantime, significant security contributions will be publicly acknowledged.
