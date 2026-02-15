param(
  [Parameter(Mandatory = $true)]
  [string]$AndroidDir,
  [Parameter(Mandatory = $true)]
  [string]$GradleHome,
  [Parameter(Mandatory = $true)]
  [string]$AndroidUserHome,
  [Parameter(Mandatory = $true)]
  [string]$ReleaseStoreFile,
  [Parameter(Mandatory = $true)]
  [string]$ReleaseStorePassword,
  [Parameter(Mandatory = $true)]
  [string]$ReleaseKeyAlias,
  [Parameter(Mandatory = $true)]
  [string]$ReleaseKeyPassword,
  [int]$TimeoutSeconds = 2400
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

if (-not (Test-Path -LiteralPath $ReleaseStoreFile)) {
  Write-Error "release_store_file_missing: $ReleaseStoreFile"
  exit 1
}

$env:GRADLE_USER_HOME = $GradleHome
$env:ANDROID_USER_HOME = $AndroidUserHome
if (Test-Path Env:ANDROID_SDK_HOME) {
  Remove-Item Env:ANDROID_SDK_HOME -ErrorAction SilentlyContinue
}

$gradleArgs = @(
  "-g", $GradleHome,
  "app:assembleRelease",
  "--no-daemon",
  "--console=plain",
  "--max-workers=1",
  "-PreactNativeArchitectures=arm64-v8a",
  # react-native-screens CMake release configure hangs on this Windows setup.
  # App runs with newArch=false and these targets are NO-SOURCE in final packaging.
  "-x", ":react-native-screens:configureCMakeRelWithDebInfo[arm64-v8a]",
  "-x", ":react-native-screens:buildCMakeRelWithDebInfo[arm64-v8a]",
  "-Pandroid.enableProguardInReleaseBuilds=true",
  "-Pandroid.release.storeFile=$ReleaseStoreFile",
  "-Pandroid.release.storePassword=$ReleaseStorePassword",
  "-Pandroid.release.keyAlias=$ReleaseKeyAlias",
  "-Pandroid.release.keyPassword=$ReleaseKeyPassword"
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

  $stdout = Join-Path $env:TEMP ("rn-gradle-release-out-" + [guid]::NewGuid().ToString("N") + ".log")
  $stderr = Join-Path $env:TEMP ("rn-gradle-release-err-" + [guid]::NewGuid().ToString("N") + ".log")
  $cmdWithRedirect = "$cmdLine 1>`"$stdout`" 2>`"$stderr`""
  $cmdEscaped = $cmdWithRedirect.Replace('"', '""')
  $cmdArguments = "/d /s /c `"$cmdEscaped`""

  Write-Host "[android] gradlew command: $cmdLine"
  Write-Host "[android] timeout=${TimeoutSec}s"
  Write-Host "[android] start=$(Get-Date -Format o)"
  Write-Host "[android] GRADLE_USER_HOME=$env:GRADLE_USER_HOME"
  Write-Host "[android] ANDROID_USER_HOME=$env:ANDROID_USER_HOME"

  $psi = New-Object System.Diagnostics.ProcessStartInfo
  $psi.FileName = "cmd.exe"
  $psi.Arguments = $cmdArguments
  $psi.WorkingDirectory = $WorkingDirectory
  $psi.UseShellExecute = $false
  $psi.CreateNoWindow = $true

  $proc = New-Object System.Diagnostics.Process
  $proc.StartInfo = $psi
  $null = $proc.Start()

  $stopwatch = [System.Diagnostics.Stopwatch]::StartNew()
  $lastHeartbeat = -1

  while ($true) {
    if ($proc.WaitForExit(1000)) {
      break
    }

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
      }
    }

    if ($elapsed -ge 0 -and $elapsed % 10 -eq 0 -and $elapsed -ne $lastHeartbeat) {
      $lastHeartbeat = $elapsed
      Write-Host "[android] running... ${elapsed}s"
    }
  }

  $proc.WaitForExit()
  $exitCode = $proc.ExitCode

  Write-Host "[android] finished in $([int][Math]::Floor($stopwatch.Elapsed.TotalSeconds))s with exit_code=$exitCode"
  if (Test-Path $stdout) { Get-Content -Path $stdout }
  if (Test-Path $stderr) { Get-Content -Path $stderr }

  return @{
    ExitCode = $exitCode
    TimedOut = $false
  }
}

$run = Invoke-GradleWithTimeout -WorkingDirectory $AndroidDir -Arguments $gradleArgs -TimeoutSec $TimeoutSeconds

if ($run.TimedOut) {
  Write-Host "[android] ERROR release_assemble_timeout_after_${TimeoutSeconds}s"
  exit 124
}

exit $run.ExitCode
