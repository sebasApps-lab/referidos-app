@echo off
setlocal
set "PATH=C:\Progra~1\nodejs;C:\Windows\System32;%PATH%"
call C:\Progra~1\nodejs\npm.cmd ci
exit /b %ERRORLEVEL%
