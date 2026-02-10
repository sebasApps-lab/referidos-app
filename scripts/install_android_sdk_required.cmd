@echo off
setlocal
set "SDKMANAGER=C:\Users\Sebas\AppData\Local\Android\Sdk\cmdline-tools\latest\bin\sdkmanager.bat"
if not exist "%SDKMANAGER%" (
  echo sdkmanager_missing
  exit /b 1
)

echo Installing required Android SDK packages...
call "%SDKMANAGER%" --install "build-tools;35.0.0" "ndk;27.1.12297006" "platforms;android-35" "cmdline-tools;latest"
if errorlevel 1 (
  echo sdk_install_failed
  exit /b 1
)

echo sdk_install_ok
endlocal
