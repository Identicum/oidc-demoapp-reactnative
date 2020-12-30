# Android Tips

## 1. Add AM DNS resolution to AVD host file
Add the enviroment variables ```ANDROID_HOME```, ```ANDROID_SDK_ROOT``` and ```PATH``` pointing to the SDK binaries, for example:

```bash
export ANDROID_HOME=/Users/mbesozzi/Library/Android/sdk
export ANDROID_SDK_ROOT=/Users/mbesozzi/Library/Android/sdk
export PATH=$ANDROID_SDK_ROOT/emulator:$ANDROID_SDK_ROOT/tools:$ANDROID_SDK_ROOT/platform-tools:$PATH
```

- 1.1. Launch device in mode writable-system
```bash
emulator -list-avds
emulator -avd <device-name> -writable-system
```

- 2.1. Change the emulator host file
```bash
adb root
adb remount
adb pull /etc/hosts /tmp/hosts
echo "<am-ip>    <am-dns>" >> /tmp/hosts
adb push /tmp/hosts /etc/hosts
```

## 2. Add self-signed certificate to AVD

- 2.1 Copy the self-signed certificate to the path ```oidc-demoapp-reactive/android/app/src/main/res/raw```, for example:
```bash
cp /tmp/my_ca /GITHUB_HOME/oidc-demoapp-reactive/android/app/src/main/res/raw
```

- 2.2 Create the file network_security_config.xml in ```oidc-demoapp-reactive/android/app/src/main/res/xml``` with the following content:

```
<?xml version="1.0" encoding="utf-8"?>
<network-security-config>
    <domain-config>
        <domain includeSubdomains="true">{dns-am}</domain>
        <trust-anchors>
            <certificates src="@raw/my_ca"/>
        </trust-anchors>
    </domain-config>
</network-security-config>
```

- 2.3 Add the following lines to the ```AndroidManifest.xml``` file

```
<application
      ...
      android:networkSecurityConfig="@xml/network_security_config"
      ...
```

## 3. Set VERBOSE log in AppAuth

```
adb shell setprop log.tag.AppAuth VERBOSE
adb logcat
// Restart app
```


