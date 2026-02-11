param(
  [Parameter(Mandatory = $true)]
  [string]$AndroidDir,
  [Parameter(Mandatory = $true)]
  [string]$GradleHome,
  [Parameter(Mandatory = $true)]
  [string]$AndroidUserHome,
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

if (-not (Test-Path -LiteralPath $AndroidUserHome)) {
  New-Item -Path $AndroidUserHome -ItemType Directory -Force | Out-Null
}

$env:GRADLE_USER_HOME = $GradleHome
$env:ANDROID_USER_HOME = $AndroidUserHome
if (Test-Path Env:ANDROID_SDK_HOME) {
  Remove-Item Env:ANDROID_SDK_HOME -ErrorAction SilentlyContinue
}

$repoRoot = Resolve-Path (Join-Path $AndroidDir "..\..\..")
$screensCxxPath = Join-Path $repoRoot "node_modules\react-native-screens\android\.cxx"

$gradleArgs = @(
  "-g", $GradleHome,
  "app:assembleDebug",
  "--no-daemon",
  "--console=plain",
  "--max-workers=1",
  "-PreactNativeArchitectures=arm64-v8a"
)

function Kill-BuildProcesses {
  try {
    Get-Process -Name ninja,cmake,java,gradle -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
  } catch {}
}

function Invoke-GradleWithTimeout {
  param(
    [string]$WorkingDirectory,
    [string[]]$Arguments,
    [int]$TimeoutSec
  )

  $safeArgs = $Arguments | ForEach-Object {
    if ($_ -match "\s") { "`"$_`"" } else { $_ }
  }
  $cmdLine = ".\gradlew.bat " + ($safeArgs -join " ")

  $stdout = Join-Path $env:TEMP ("rn-gradle-out-" + [guid]::NewGuid().ToString("N") + ".log")
  $stderr = Join-Path $env:TEMP ("rn-gradle-err-" + [guid]::NewGuid().ToString("N") + ".log")

  Write-Host "[android] gradlew command: $cmdLine"
  Write-Host "[android] timeout=${TimeoutSec}s"
  Write-Host "[android] start=$(Get-Date -Format o)"
  Write-Host "[android] GRADLE_USER_HOME=$env:GRADLE_USER_HOME"
  Write-Host "[android] ANDROID_USER_HOME=$env:ANDROID_USER_HOME"

  $proc = Start-Process `
    -FilePath "cmd.exe" `
    -ArgumentList @("/d", "/c", $cmdLine) `
    -WorkingDirectory $WorkingDirectory `
    -PassThru `
    -NoNewWindow `
    -RedirectStandardOutput $stdout `
    -RedirectStandardError $stderr

  $stopwatch = [System.Diagnostics.Stopwatch]::StartNew()
  $lastHeartbeat = -1

  while (-not $proc.HasExited) {
    $elapsed = [int][Math]::Floor($stopwatch.Elapsed.TotalSeconds)
    if ($elapsed -ge $TimeoutSec) {
      Write-Host "[android] timeout reached at ${elapsed}s. Killing process tree pid=$($proc.Id)"
      try { & cmd.exe /d /c "taskkill /PID $($proc.Id) /T /F >nul 2>nul" | Out-Null } catch {}
      Kill-BuildProcesses
      if (Test-Path $stdout) { Get-Content -Path $stdout -Tail 120 }
      if (Test-Path $stderr) { Get-Content -Path $stderr -Tail 120 }
      return @{
        ExitCode = 124
        TimedOut = $true
        Stdout = $stdout
        Stderr = $stderr
      }
    }

    if ($elapsed -ge 0 -and $elapsed % 10 -eq 0 -and $elapsed -ne $lastHeartbeat) {
      $lastHeartbeat = $elapsed
      Write-Host "[android] running... ${elapsed}s"
    }
    Start-Sleep -Seconds 1
  }

  Write-Host "[android] finished in $([int][Math]::Floor($stopwatch.Elapsed.TotalSeconds))s with exit_code=$($proc.ExitCode)"
  if (Test-Path $stdout) { Get-Content -Path $stdout }
  if (Test-Path $stderr) { Get-Content -Path $stderr }

  return @{
    ExitCode = $proc.ExitCode
    TimedOut = $false
    Stdout = $stdout
    Stderr = $stderr
  }
}

$firstRun = Invoke-GradleWithTimeout -WorkingDirectory $AndroidDir -Arguments $gradleArgs -TimeoutSec $TimeoutSeconds

if ($firstRun.ExitCode -eq 0) {
  exit 0
}

if ($firstRun.TimedOut) {
  Write-Host "[android] ERROR assemble_timeout_after_${TimeoutSeconds}s"
  exit 124
}

$combinedOutput = ""
if (Test-Path $firstRun.Stdout) { $combinedOutput += (Get-Content -Path $firstRun.Stdout -Raw) }
if (Test-Path $firstRun.Stderr) { $combinedOutput += "`n" + (Get-Content -Path $firstRun.Stderr -Raw) }

$isCxxLock =
  $combinedOutput -match "react-native-screens:configureCMakeDebug\[arm64-v8a\]" -and
  $combinedOutput -match "being used by another process"

if (-not $isCxxLock) {
  exit $firstRun.ExitCode
}

Write-Host "[android] Detected react-native-screens .cxx lock. Retrying once after cleanup..."
Kill-BuildProcesses
Start-Sleep -Seconds 1
if (Test-Path -LiteralPath $screensCxxPath) {
  try {
    & cmd.exe /d /c "rmdir /s /q `"$screensCxxPath`"" | Out-Null
  } catch {}
}

$secondRun = Invoke-GradleWithTimeout -WorkingDirectory $AndroidDir -Arguments $gradleArgs -TimeoutSec $TimeoutSeconds
if ($secondRun.TimedOut) {
  Write-Host "[android] ERROR assemble_timeout_after_retry_${TimeoutSeconds}s"
  exit 124
}

exit $secondRun.ExitCode
