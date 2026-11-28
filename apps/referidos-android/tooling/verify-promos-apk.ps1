param(
    [Parameter(Mandatory = $true)][string]$Apk,
    [Parameter(Mandatory = $true)][ValidateSet('dev', 'offline')][string]$Mode,
    [Parameter(Mandatory = $true)][string]$BuildToolsDirectory
)

$ErrorActionPreference = 'Stop'
$apkPath = (Resolve-Path -LiteralPath $Apk).Path
$aapt = Join-Path $BuildToolsDirectory 'aapt.exe'
$badging = & $aapt dump badging $apkPath
if ($LASTEXITCODE -ne 0 -or -not ($badging -match "^package: name='com\.referidosandroid\.promosbeta' ")) {
    throw 'Expected a valid Promos beta APK'
}

$networkPermission = [bool]($badging -match "^uses-permission: name='android\.permission\.INTERNET'")
if ($networkPermission -ne ($Mode -eq 'dev')) {
    throw 'Unexpected network permission for the requested build mode'
}
if ($badging -match "^uses-permission: name='android\.permission\.(CAMERA|ACCESS_FINE_LOCATION|ACCESS_COARSE_LOCATION|ACCESS_NETWORK_STATE|READ_EXTERNAL_STORAGE|WRITE_EXTERNAL_STORAGE|WAKE_LOCK|RECEIVE_BOOT_COMPLETED|FOREGROUND_SERVICE)'") {
    throw 'Unexpected manifest permission in Promos APK'
}

$manifest = & $aapt dump xmltree $apkPath AndroidManifest.xml
if ($LASTEXITCODE -ne 0 -or
    -not ($manifest -match 'android:scheme.*="referidospromosbeta"') -or
    -not ($manifest -match 'android:host.*="auth"') -or
    -not ($manifest -match 'android:pathPrefix.*="/callback"') -or
    -not ($manifest -match 'android:authorities.*="com\.referidosandroid\.promosbeta\.promo-exports"')) {
    throw 'Expected Promos callback and export provider in manifest'
}
if ($Mode -eq 'dev' -and -not ($manifest -match 'android:usesCleartextTraffic.*=\(type 0x12\)0x0$')) {
    throw 'Expected cleartext traffic to be disabled'
}

Add-Type -AssemblyName System.IO.Compression.FileSystem
$archive = [IO.Compression.ZipFile]::OpenRead($apkPath)
try {
    $configs = @($archive.Entries | Where-Object FullName -CEQ 'assets/promos-backend.json')
    $expectedCount = [int]($Mode -eq 'dev')
    if ($configs.Count -ne $expectedCount) { throw 'Unexpected number of backend config assets' }
    if ($Mode -eq 'dev') {
        $reader = [IO.StreamReader]::new($configs[0].Open())
        try {
            $reader.ReadToEnd() | & node (Join-Path $PSScriptRoot 'promos-dev-config.mjs') check-stdin
            if ($LASTEXITCODE -ne 0) { throw 'Packaged DEV configuration failed validation' }
        } finally { $reader.Dispose() }
    }

    $bundle = $archive.GetEntry('assets/index.android.bundle')
    if (-not $bundle) { throw 'Standalone APK must contain the application bundle' }
    $stream = $bundle.Open()
    $bytes = [IO.MemoryStream]::new()
    try {
        $stream.CopyTo($bytes)
        $bundleText = [Text.Encoding]::ASCII.GetString($bytes.ToArray())
        if ($bundleText -match '[a-z0-9]{20}\.supabase\.co') {
            throw 'The JS bundle contains a Supabase host outside the isolated asset'
        }
    } finally {
        $stream.Dispose()
        $bytes.Dispose()
    }
} finally { $archive.Dispose() }

"Promos APK verified ($Mode): $apkPath"
