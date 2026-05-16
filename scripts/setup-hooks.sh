#!/usr/bin/env bash
# StellarFreight — Enable shared Git hooks
# Usage: bash scripts/setup-hooks.sh
set -euo pipefail

REPO_ROOT="$(git rev-parse --show-toplevel)"
cd "$REPO_ROOT"

git config core.hooksPath .githooks
chmod +x .githooks/pre-commit
chmod +x .githooks/pre-push

echo "✅ Git hooks enabled."
echo "   hooksPath: $(git config --get core.hooksPath)"
echo ""
echo "Hooks installed:"
echo "  pre-commit  — cargo fmt on staged Rust, eslint on staged frontend"
echo "  pre-push    — cargo clippy + test, frontend lint + typecheck + test"
