@echo off
setlocal
cd /d apps\referidos-android
call C:\Progra~1\nodejs\npm.cmd install -D @react-native-community/cli
set ERR=%ERRORLEVEL%
cd /d ..\..
exit /b %ERR%
