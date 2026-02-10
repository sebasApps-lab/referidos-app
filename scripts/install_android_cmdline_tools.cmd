@echo off
setlocal

set "SDKROOT=C:\Users\Sebas\AppData\Local\Android\Sdk"
set "TOOLS_DIR=%SDKROOT%\cmdline-tools"
set "LATEST_DIR=%TOOLS_DIR%\latest"
set "RUNID=%RANDOM%%RANDOM%"
set "ZIP_PATH=%TEMP%\commandlinetools-win-%RUNID%.zip"
set "EXTRACT_DIR=%TEMP%\android_cmdline_tools_extract_%RUNID%"
set "URL=https://dl.google.com/android/repository/commandlinetools-win-11076708_latest.zip"

if exist "%LATEST_DIR%\bin\sdkmanager.bat" (
  echo cmdline_tools_already_installed
  exit /b 0
)

if not exist "%SDKROOT%" (
  echo android_sdk_root_missing
  exit /b 1
)

echo Downloading Android command-line tools...
"C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe" -NoProfile -Command ^
  "Invoke-WebRequest -Uri '%URL%' -OutFile '%ZIP_PATH%'"
if errorlevel 1 (
  echo download_failed
  exit /b 1
)

if exist "%EXTRACT_DIR%" rmdir /s /q "%EXTRACT_DIR%"
mkdir "%EXTRACT_DIR%"

echo Extracting...
"C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe" -NoProfile -Command ^
  "Expand-Archive -Path '%ZIP_PATH%' -DestinationPath '%EXTRACT_DIR%' -Force"
if errorlevel 1 (
  echo extract_failed
  exit /b 1
)

if not exist "%TOOLS_DIR%" mkdir "%TOOLS_DIR%"
if exist "%LATEST_DIR%" rmdir /s /q "%LATEST_DIR%"

if exist "%EXTRACT_DIR%\cmdline-tools" (
  move "%EXTRACT_DIR%\cmdline-tools" "%LATEST_DIR%" >nul
) else (
  echo extracted_layout_unexpected
  exit /b 1
)

if exist "%LATEST_DIR%\bin\sdkmanager.bat" (
  echo cmdline_tools_installed
) else (
  echo cmdline_tools_install_incomplete
  exit /b 1
)

if exist "%ZIP_PATH%" del /f /q "%ZIP_PATH%"
if exist "%EXTRACT_DIR%" rmdir /s /q "%EXTRACT_DIR%"

endlocal
