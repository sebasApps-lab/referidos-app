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

set "JAVA_HOME=C:\Program Files\Java\jdk-21.0.10"
set "PATH=%JAVA_HOME%\bin;%ANDROID_SDK_ROOT%\platform-tools;%ANDROID_SDK_ROOT%\cmdline-tools\latest\bin;C:\Windows\System32;C:\Progra~1\nodejs;%PATH%"
if not exist "%ANDROID_USER_HOME%" mkdir "%ANDROID_USER_HOME%"
cd /d "%ANDROID_DIR%"
if not exist gradlew.bat (
  echo gradlew_missing
  exit /b 1
)
call gradlew.bat -g "%GRADLE_LOCAL_HOME%" tasks --all --no-daemon --console=plain
set ERR=%ERRORLEVEL%
cd /d "%REPO_ROOT%"
exit /b %ERR%
