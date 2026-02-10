@echo off
setlocal

set "SCRIPT_DIR=%~dp0"
for %%I in ("%SCRIPT_DIR%..") do set "REPO_ROOT=%%~fI"
set "ANDROID_DIR=%REPO_ROOT%\apps\referidos-android\android"
set "GRADLE_LOCAL_HOME=%REPO_ROOT%\.gradle-local"
set "ANDROID_SDK_HOME=%REPO_ROOT%\.android-local"
set "ANDROID_SDK_ROOT=C:\Users\Sebas\AppData\Local\Android\Sdk"
set "ANDROID_HOME=%ANDROID_SDK_ROOT%"
set "EXPECTED_NDK=27.1.12297006"
set "EXPECTED_PLATFORM=android-35"
set "TIMEOUT_SECONDS=%~1"
if "%TIMEOUT_SECONDS%"=="" set "TIMEOUT_SECONDS=1800"

set "JAVA_HOME=C:\Program Files\Java\jdk-21.0.10"
set "PATH=%JAVA_HOME%\bin;%ANDROID_SDK_ROOT%\platform-tools;%ANDROID_SDK_ROOT%\cmdline-tools\latest\bin;C:\Windows\System32;C:\Progra~1\nodejs;%PATH%"

if not exist "%JAVA_HOME%\bin\java.exe" (
  echo java_home_invalid
  exit /b 1
)
if not exist "%ANDROID_SDK_ROOT%\platforms\%EXPECTED_PLATFORM%\android.jar" (
  echo android_platform_missing_%EXPECTED_PLATFORM%
  exit /b 1
)
if not exist "%ANDROID_SDK_ROOT%\build-tools\35.0.0\aapt2.exe" (
  echo android_build_tools_35_missing
  exit /b 1
)
if not exist "%ANDROID_SDK_ROOT%\ndk\%EXPECTED_NDK%\ndk-build.cmd" (
  echo android_ndk_missing_%EXPECTED_NDK%
  exit /b 1
)
if not exist "%ANDROID_SDK_HOME%" mkdir "%ANDROID_SDK_HOME%" >nul 2>nul
if not exist "%GRADLE_LOCAL_HOME%" mkdir "%GRADLE_LOCAL_HOME%" >nul 2>nul

echo [android] JAVA_HOME=%JAVA_HOME%
echo [android] ANDROID_SDK_ROOT=%ANDROID_SDK_ROOT%
echo [android] GRADLE_USER_HOME=%GRADLE_LOCAL_HOME%
echo [android] Building debug APK with arm64-v8a only (timeout=%TIMEOUT_SECONDS%s)...
echo [android] timeout_arg_raw=%~1

for %%I in ("%SCRIPT_DIR%run_android_assemble_debug_inner.ps1") do set "INNER_PS=%%~fI"
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%INNER_PS%" -AndroidDir "%ANDROID_DIR%" -GradleHome "%GRADLE_LOCAL_HOME%" -TimeoutSeconds %TIMEOUT_SECONDS%
set "ERR=%ERRORLEVEL%"

cd /d "%REPO_ROOT%" >nul 2>nul
exit /b %ERR%
