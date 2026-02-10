@echo off
setlocal
set "JAVA_HOME=C:\Program Files\Java\jdk-21.0.10"
set "PATH=%JAVA_HOME%\bin;C:\Windows\System32;C:\Progra~1\nodejs;%PATH%"
cd /d apps\referidos-android
call npx react-native config
set ERR=%ERRORLEVEL%
cd /d ..\..
exit /b %ERR%
