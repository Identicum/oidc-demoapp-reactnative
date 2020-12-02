# OpenID Connect React Native Application

This demo application shows how to do the federation process with an OAuth provider using the library react-native-app-auth.


**Prerequisites:** [Node.js](https://nodejs.org/) and Xcode (for iOS/Mac) or Android Studio (for Android).

## 1. Install

```bash
git clone https://github.com/embesozzi/oidc-demoapp-reactnative.git
cd oidc-demoapp-reactnative
yarn install
```

## 2. Configure OAuth Provider

### Create OAuth Application in your OAuth Provider
Create an OAuth client as a Public client with the following information: **client id** (e.g., `oidc-demoapp-reactnative`),  **scopes** (e.g., `openid profile`), grant type `Authorization Code` and define the **Login redirect URI** (e.g., `com.identicum.demo.mobile:/callback`).

### Specify Your Issuer, Client ID, and Redirect URI

Open `App.js` and adjust the initialization of `react-native-app-auth` with your settings.

```js
provider : {
    issuer: '{idpIssuer}',
    clientId: '{clientId}',
    redirectUrl: 'com.identicum.demo.mobile:/callback'
    ...
    serviceConfiguration: {
       authorizationEndpoint: '{idpAauthorizationEndpoint}',
       tokenEndpoint: '{idpTokenEndpoint}',
       revocationEndpoint: '{idpRevocationEndpoint}'
    }
  }
};
```

Update `ios/demoapp/Info.plist` and `android/app/build.gradle` to replace the redirect scheme (`com.identicum.demo.mobile:/callback`) with the one that matches your native app's redirect URI.

## 3. Run the App

### iOS Applications only

To run the app on iOS, you'll first need to install CocoaPods:

```bash
sudo gem install cocoapods
```

Then `cd` into the `ios` directory and run `pod install`. Then you can run the following command to start and deploy the app into iOS Simulator.

```bash
npm run ios
```

You should see the `demoapp` pod being installed and linked to the sample app.

### Android applications only

To run the app on Android, you'll have to an Android Virtual Device (AVD). Open Android Studio, select open existing project, and choose the `android` directory in your cloned project. If you're prompted to update anything, approve it.

To create a new AVD, navigate to **Tools** > **Android** > **AVD Manager**. Create a new Virtual Device and run it. I recommend using Pixel 2 with `Android API 27 x86`.
 
```bash
npm run android
```

## Links

This example uses the following libraries:

* [React Native App Auth](https://github.com/FormidableLabs/react-native-app-auth)

## Troubleshooting


