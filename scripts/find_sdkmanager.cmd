@echo off
setlocal
echo Searching sdkmanager.bat in common locations...
if exist "C:\Program Files\Android\Android Studio" (
  dir /s /b "C:\Program Files\Android\Android Studio\sdkmanager.bat" 2>nul
  dir /s /b "C:\Program Files\Android\Android Studio\*sdkmanager*.bat" 2>nul
)
if exist "C:\Users\Sebas\AppData\Local\Android\Sdk" (
  dir /s /b "C:\Users\Sebas\AppData\Local\Android\Sdk\*sdkmanager*.bat" 2>nul
)
if exist "C:\ProgramData\chocolatey" (
  dir /s /b "C:\ProgramData\chocolatey\*sdkmanager*.bat" 2>nul
)
endlocal
