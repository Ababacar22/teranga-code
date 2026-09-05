# Installe les prérequis pour développer sur Teranga Code (Windows).
# Usage (PowerShell, en administrateur recommandé) :
#   powershell -ExecutionPolicy Bypass -File scripts\setup-windows.ps1

function Ok($msg)   { Write-Host "OK  $msg" -ForegroundColor Green }
function Todo($msg) { Write-Host "->  $msg" -ForegroundColor Yellow }

Write-Host "Teranga Code - installation des prerequis (Windows)"
Write-Host "-----------------------------------------------------"

# 0. winget (Windows Package Manager)
if (-not (Get-Command winget -ErrorAction SilentlyContinue)) {
  Write-Host "winget est introuvable. Installe 'App Installer' depuis le Microsoft Store, puis relance ce script." -ForegroundColor Red
  exit 1
}
Ok "winget disponible"

# 1. Git
if (Get-Command git -ErrorAction SilentlyContinue) {
  Ok "Git deja installe"
} else {
  Todo "Installation de Git..."
  winget install --id Git.Git -e --source winget
}

# 2. Docker Desktop (necessaire pour 'docker compose up')
if (Get-Command docker -ErrorAction SilentlyContinue) {
  Ok "Docker deja installe"
} else {
  Todo "Installation de Docker Desktop..."
  winget install --id Docker.DockerDesktop -e --source winget
  Write-Host "  Lance Docker Desktop une premiere fois manuellement avant de continuer (redemarrage possible requis)." -ForegroundColor Yellow
}

# 3. Node.js (utile pour les scripts hors Docker, ex: build desktop)
if (Get-Command node -ErrorAction SilentlyContinue) {
  Ok "Node.js deja installe ($(node --version))"
} else {
  Todo "Installation de Node.js (LTS)..."
  winget install --id OpenJS.NodeJS.LTS -e --source winget
}

# 4. Rust + Visual Studio Build Tools (uniquement pour construire l'app desktop Tauri)
$answer = Read-Host "Installer Rust + Visual Studio Build Tools pour construire l'app desktop ? [y/N]"
if ($answer -match '^[Yy]$') {
  if (Get-Command cargo -ErrorAction SilentlyContinue) {
    Ok "Rust deja installe"
  } else {
    Todo "Installation de Rust (rustup)..."
    winget install --id Rustlang.Rustup -e --source winget
  }

  Todo "Installation des Visual Studio Build Tools (workload C++, requis par Tauri)..."
  winget install --id Microsoft.VisualStudio.2022.BuildTools -e --source winget --override "--quiet --wait --add Microsoft.VisualStudio.Workload.VCTools"

  Write-Host "  WebView2 est deja preinstalle sur Windows 10/11 a jour - rien a faire de plus." -ForegroundColor Yellow
} else {
  Todo "Rust non installe - necessaire seulement pour 'npm run desktop:build'."
}

Write-Host ""
Write-Host "-----------------------------------------------------"
Write-Host "Prochaines etapes :"
Write-Host "  copy .env.example .env   # renseigne un JWT_SECRET (openssl rand -hex 32, ou un long mot de passe aleatoire)"
Write-Host "  docker compose up --build"
Write-Host ""
Write-Host "Frontend : http://localhost:5185"
Write-Host "Backend  : http://localhost:4000"
