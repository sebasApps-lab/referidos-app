param(
  [Parameter(Mandatory = $true)]
  [string]$AndroidDir,
  [Parameter(Mandatory = $true)]
  [string]$GradleHome,
  [int]$TimeoutSeconds = 1800
)

$ErrorActionPreference = "Stop"

if (-not (Test-Path -LiteralPath $AndroidDir)) {
  Write-Error "android_dir_missing: $AndroidDir"
  exit 1
}

if (-not (Test-Path -LiteralPath (Join-Path $AndroidDir "gradlew.bat"))) {
  Write-Error "gradlew_missing: $AndroidDir\\gradlew.bat"
  exit 1
}

if (-not (Test-Path -LiteralPath $GradleHome)) {
  New-Item -Path $GradleHome -ItemType Directory -Force | Out-Null
}

$gradleArgs = @(
  "-g", $GradleHome,
  "app:assembleDebug",
  "--no-daemon",
  "--console=plain",
  "--max-workers=2",
  "--offline",
  "-PreactNativeArchitectures=arm64-v8a"
)

Write-Host "[android] gradlew.bat $($gradleArgs -join ' ')"
Write-Host "[android] timeout=${TimeoutSeconds}s"
Write-Host "[android] start=$(Get-Date -Format o)"

$gradlewPath = Join-Path $AndroidDir "gradlew.bat"
$proc = Start-Process `
  -FilePath $gradlewPath `
  -ArgumentList $gradleArgs `
  -WorkingDirectory $AndroidDir `
  -PassThru `
  -NoNewWindow

$stopwatch = [System.Diagnostics.Stopwatch]::StartNew()
$lastReported = -1
while (-not $proc.HasExited) {
  $elapsed = [int][Math]::Floor($stopwatch.Elapsed.TotalSeconds)
  if ($elapsed -ge $TimeoutSeconds) {
    Write-Host "[android] timeout reached at ${elapsed}s, terminating gradle parent pid=$($proc.Id)..."
    try {
      Stop-Process -Id $proc.Id -Force -ErrorAction SilentlyContinue
    } catch {}
    Write-Error "assemble_timeout_after_${TimeoutSeconds}s (killed_pid_$($proc.Id))"
    exit 124
  }
  if ($elapsed -ge 0 -and $elapsed % 10 -eq 0 -and $elapsed -ne $lastReported) {
    $lastReported = $elapsed
    Write-Host "[android] running... ${elapsed}s"
  }
  Start-Sleep -Seconds 1
}

Write-Host "[android] finished in $([int][Math]::Floor($stopwatch.Elapsed.TotalSeconds))s with exit_code=$($proc.ExitCode)"
exit $proc.ExitCode
