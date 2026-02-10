@echo off
setlocal
set "JAVA21=C:\Program Files\Java\jdk-21.0.10"
if not exist "%JAVA21%\bin\java.exe" (
  echo jdk21_not_found_at_%JAVA21%
  exit /b 1
)

echo Setting JAVA_HOME to %JAVA21%
"C:\Windows\System32\setx.exe" JAVA_HOME "%JAVA21%" >nul
if errorlevel 1 (
  echo setx_java_home_failed
  exit /b 1
)

for /f "tokens=2,*" %%A in ('"C:\Windows\System32\reg.exe" query "HKCU\Environment" /v Path 2^>nul ^| "C:\Windows\System32\findstr.exe" /I "Path"') do set "USERPATH=%%B"
echo %USERPATH% | "C:\Windows\System32\findstr.exe" /I /C:"%JAVA21%\bin" >nul
if errorlevel 1 (
  if defined USERPATH (
    "C:\Windows\System32\setx.exe" Path "%USERPATH%;%JAVA21%\bin" >nul
  ) else (
    "C:\Windows\System32\setx.exe" Path "%JAVA21%\bin" >nul
  )
  if errorlevel 1 (
    echo setx_path_failed
    exit /b 1
  )
)

echo done
endlocal
