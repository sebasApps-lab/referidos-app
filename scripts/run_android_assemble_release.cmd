@echo off
setlocal

set "SCRIPT_DIR=%~dp0"
for %%I in ("%SCRIPT_DIR%..") do set "REPO_ROOT=%%~fI"
set "ANDROID_DIR=%REPO_ROOT%\apps\referidos-android\android"
set "GRADLE_LOCAL_HOME=%REPO_ROOT%\.gradle-local"
set "ANDROID_USER_HOME=%REPO_ROOT%\.android-local"
set "ANDROID_SDK_ROOT=C:\Users\Sebas\AppData\Local\Android\Sdk"
set "ANDROID_HOME=%ANDROID_SDK_ROOT%"
set "ANDROID_SDK_HOME="
set "EXPECTED_NDK=27.1.12297006"
set "EXPECTED_PLATFORM=android-35"
set "TIMEOUT_SECONDS=%~1"
if "%TIMEOUT_SECONDS%"=="" set "TIMEOUT_SECONDS=2400"

set "JAVA_HOME=C:\Program Files\Java\jdk-21.0.10"
set "PATH=%JAVA_HOME%\bin;%ANDROID_SDK_ROOT%\platform-tools;%ANDROID_SDK_ROOT%\cmdline-tools\latest\bin;C:\Windows\System32;C:\Progra~1\nodejs;%PATH%"

if not exist "%JAVA_HOME%\bin\java.exe" (
  echo java_home_invalid
  exit /b 1
)
if not exist "%JAVA_HOME%\bin\keytool.exe" (
  echo keytool_missing
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
if not exist "%ANDROID_USER_HOME%" mkdir "%ANDROID_USER_HOME%" >nul 2>nul
if not exist "%GRADLE_LOCAL_HOME%" mkdir "%GRADLE_LOCAL_HOME%" >nul 2>nul

set "RELEASE_DIR=%ANDROID_USER_HOME%\release-keystore"
if not exist "%RELEASE_DIR%" mkdir "%RELEASE_DIR%" >nul 2>nul

if "%ANDROID_RELEASE_STORE_FILE%"=="" (
  set "ANDROID_RELEASE_STORE_FILE=%RELEASE_DIR%\referidos-upload.jks"
)
if "%ANDROID_RELEASE_STORE_PASSWORD%"=="" (
  set "ANDROID_RELEASE_STORE_PASSWORD=referidos_upload_2026"
)
if "%ANDROID_RELEASE_KEY_ALIAS%"=="" (
  set "ANDROID_RELEASE_KEY_ALIAS=referidos-upload"
)
if "%ANDROID_RELEASE_KEY_PASSWORD%"=="" (
  set "ANDROID_RELEASE_KEY_PASSWORD=referidos_upload_2026"
)

if not exist "%ANDROID_RELEASE_STORE_FILE%" (
  echo [android] Generating local release keystore for smoke build...
  "%JAVA_HOME%\bin\keytool.exe" -genkeypair -v ^
    -keystore "%ANDROID_RELEASE_STORE_FILE%" ^
    -storepass "%ANDROID_RELEASE_STORE_PASSWORD%" ^
    -keypass "%ANDROID_RELEASE_KEY_PASSWORD%" ^
    -alias "%ANDROID_RELEASE_KEY_ALIAS%" ^
    -keyalg RSA -keysize 2048 -validity 10000 ^
    -dname "CN=Referidos Android, OU=Mobile, O=Referidos, L=Quito, ST=Pichincha, C=EC" >nul 2>nul
)

if not exist "%ANDROID_RELEASE_STORE_FILE%" (
  echo release_keystore_missing
  exit /b 1
)

echo [android] JAVA_HOME=%JAVA_HOME%
echo [android] ANDROID_SDK_ROOT=%ANDROID_SDK_ROOT%
echo [android] ANDROID_USER_HOME=%ANDROID_USER_HOME%
echo [android] GRADLE_USER_HOME=%GRADLE_LOCAL_HOME%
echo [android] RELEASE_STORE_FILE=%ANDROID_RELEASE_STORE_FILE%
echo [android] Building release APK with proguard/minify (timeout=%TIMEOUT_SECONDS%s)...

for %%I in ("%SCRIPT_DIR%run_android_assemble_release_inner.ps1") do set "INNER_PS=%%~fI"
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%INNER_PS%" ^
  -AndroidDir "%ANDROID_DIR%" ^
  -GradleHome "%GRADLE_LOCAL_HOME%" ^
  -TimeoutSeconds %TIMEOUT_SECONDS% ^
  -AndroidUserHome "%ANDROID_USER_HOME%" ^
  -ReleaseStoreFile "%ANDROID_RELEASE_STORE_FILE%" ^
  -ReleaseStorePassword "%ANDROID_RELEASE_STORE_PASSWORD%" ^
  -ReleaseKeyAlias "%ANDROID_RELEASE_KEY_ALIAS%" ^
  -ReleaseKeyPassword "%ANDROID_RELEASE_KEY_PASSWORD%"
set "ERR=%ERRORLEVEL%"

cd /d "%REPO_ROOT%" >nul 2>nul
exit /b %ERR%
