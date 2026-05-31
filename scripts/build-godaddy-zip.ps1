# Build GoDaddy deploy zip (Linux-safe paths via tar)
$ErrorActionPreference = "Stop"
$root = Split-Path $PSScriptRoot -Parent
$zip = Join-Path (Split-Path $root -Parent) "after-care-godaddy.zip"
$temp = Join-Path $env:TEMP "aftercare-godaddy-build"

if (-not (Test-Path "$root\app\layout.tsx")) {
  throw "Missing app/layout.tsx at project root."
}

Remove-Item $temp -Recurse -Force -ErrorAction SilentlyContinue
New-Item -ItemType Directory -Path $temp -Force | Out-Null

robocopy $root $temp /E /XD node_modules .next .git .cursor scripts /XF `
  .env.local .env .env.* tsconfig.tsbuildinfo `
  GODADDY-DEPLOY.md SETUP.md README.md CLIENT-*.md .godaddy-deploy.json `
  /NFL /NDL /NJH /NJS | Out-Null

if (Test-Path $zip) { Remove-Item $zip -Force }
Push-Location $temp
tar -a -cf $zip *
Pop-Location
Remove-Item $temp -Recurse -Force

$mb = [math]::Round((Get-Item $zip).Length / 1MB, 2)
Write-Host "Created: $zip - ${mb} MB"
Write-Host "Verify:"
tar -tf $zip | Select-String "^(package.json|server.js|app/layout.tsx|AFTERCARE-DEPLOY.txt)$"
