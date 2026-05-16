# StellarFreight — Enable shared Git hooks (Windows PowerShell)
# Usage: powershell -ExecutionPolicy Bypass -File scripts/setup-hooks.ps1
$ErrorActionPreference = "Stop"

$repoRoot = git rev-parse --show-toplevel
Set-Location $repoRoot

git config core.hooksPath .githooks

Write-Host "Git hooks enabled." -ForegroundColor Green
Write-Host ("hooksPath: {0}" -f (git config --get core.hooksPath))
Write-Host ""
Write-Host "Hooks installed:"
Write-Host "  pre-commit  -- cargo fmt on staged Rust, eslint on staged frontend"
Write-Host "  pre-push    -- cargo clippy + test, frontend lint + typecheck + test"
