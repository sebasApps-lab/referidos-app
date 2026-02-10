@echo off
setlocal
echo JAVA_HOME=%JAVA_HOME%
echo.
echo === Java binaries found ===
where java 2>nul
if errorlevel 1 echo java_not_found_in_PATH
echo.
echo === Java folders ===
if exist "C:\Program Files\Java" (
  dir /b /ad "C:\Program Files\Java"
) else (
  echo java_folder_missing
)
echo.
echo ANDROID_HOME=%ANDROID_HOME%
echo ANDROID_SDK_ROOT=%ANDROID_SDK_ROOT%
echo.
echo === Android SDK root dirs ===
if exist "C:\Users\Sebas\AppData\Local\Android\Sdk" (
  dir /b /ad "C:\Users\Sebas\AppData\Local\Android\Sdk"
) else (
  echo android_sdk_missing
)
echo.
echo === cmdline-tools dirs ===
if exist "C:\Users\Sebas\AppData\Local\Android\Sdk\cmdline-tools" (
  dir /b /ad "C:\Users\Sebas\AppData\Local\Android\Sdk\cmdline-tools"
) else (
  echo cmdline_tools_missing
)
echo.
echo === sdkmanager path checks ===
if exist "C:\Users\Sebas\AppData\Local\Android\Sdk\cmdline-tools\latest\bin\sdkmanager.bat" (
  echo sdkmanager_latest_found
) else (
  echo sdkmanager_latest_missing
)
if exist "C:\Users\Sebas\AppData\Local\Android\Sdk\tools\bin\sdkmanager.bat" (
  echo sdkmanager_legacy_found
) else (
  echo sdkmanager_legacy_missing
)
echo.
echo === adb check ===
if exist "C:\Users\Sebas\AppData\Local\Android\Sdk\platform-tools\adb.exe" (
  echo adb_found
) else (
  echo adb_missing
)
echo.
echo === Gradle wrapper check ===
if exist "apps\referidos-android\android\gradlew.bat" (
  echo gradlew_found
) else (
  echo gradlew_missing
)
endlocal
