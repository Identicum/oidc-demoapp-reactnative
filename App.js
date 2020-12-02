/**
 * Identicum OIDC React Native App
 * @author mbesozzi
 * @format
 * @flow strict-local
 */
import React, { Component} from 'react';
import { Button, StyleSheet, View, Text, ScrollView, SafeAreaView} from 'react-native';
import { authorize } from 'react-native-app-auth';
import { Buffer } from 'buffer';

const configs = {
  provider : {
    issuer: '{idpIssuer}',
    clientId: '{clientId}',
    redirectUrl: 'com.identicum.mobile.demo:/oauthredirect',
    additionalParameters: {},
    scopes: ['openid', 'profile'],
    serviceConfiguration: {
       authorizationEndpoint: '{idpAauthorizationEndpoint}',
       tokenEndpoint: '{idpTokenEndpoint}',
       revocationEndpoint: '{idpRevocationEndpoint}'
    }
  }
};  

class App extends Component {
      constructor(props) {
        super(props);
        this.state = { accessToken: '', idToken : '', viewOffset : 'bottom' };
      }
      decodeJwt = (idToken) => {
        console.log("____ Decoding ID token: " + this.state.idToken)
        const jwtBody = idToken.split('.')[1];
        const base64 = jwtBody.replace('-', '+').replace('_', '/');
        const decodedJwt = Buffer.from(base64, 'base64');
        console.log("____ Decoded ID token: " + decodedJwt)
        return JSON.stringify(JSON.parse(decodedJwt));
      }
      _onLogin = () => { 
        console.log("___ Login...")
        authorize(configs.provider).then(authResponse => {
            console.log("___ Response:" + authResponse);
            this.setState( { 
              accessToken: authResponse.accessToken , 
              idToken : authResponse.idToken
            });
          })
          .catch(error => console.log(error));
       };
       _onScroll = (event) => {
          const currentViewOffset = event.nativeEvent.contentOffset.y > 20 ?  "top"  :  "bottom";
          if(this.state.viewOffset != currentViewOffset)
             this.setState( { viewOffset : currentViewOffset } );
       };
      _onLogout = () => {
        console.log("___ Logout...")
        // TODO: Handling revoke token
        this.setState({ 
          accessToken: '',
          idToken : ''
        });
      };
      render() {
        let loggedIn = this.state.accessToken == '' ? false : true;
        console.log("___ Is User logged in: " + loggedIn );
        return (
                <View style={styles.container}>
                { loggedIn ? (
                  <ScrollView contentContainerStyle={{ paddingTop: 30, flexGrow: 1, justifyContent: 'center' , width: "100%"}} onScroll={this._onScroll}>
                    <View style = {[{ width: "90%"}]}>
                            <View >
                              <Text style={styles.fieldHeader}>Access Token</Text>
                              <Text style={styles.fieldValue} selectable>{this.state.accessToken}</Text>
                              <Text style={styles.fieldHeader}>ID Token (decoded)</Text>
                              <Text style={styles.fieldValue} selectable> {this.decodeJwt(this.state.idToken)}</Text>
                              <Text style={styles.fieldHeader}>ID Token (JWT)</Text>
                              <Text style={styles.fieldValue} selectable>{this.state.idToken}</Text>
                            </View> 
                    </View>
                </ScrollView>
                 ): <View></View>}
              <View style={ loggedIn ? ( this.state.viewOffset == "bottom" ? styles.bottomView : styles.topView ): [{ width: "90%"}] } >
                  <Button onPress = { loggedIn ? this._onLogout : this._onLogin } title = { loggedIn ? 'Log Out' : 'Log In' } />
              </View>
            </View>
        );
      }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
     },
    fieldHeader : {
      alignSelf:'center',
      fontSize:15,
      justifyContent:'center',
      alignItems:'center'
    },
    topView:{
      width: '90%', 
      position: 'absolute',
      top: 20
    },
    bottomView:{
      width: '90%', 
      position: 'absolute',
      bottom: 20
    },
    fieldValue : {
      color: '#0071BC',
      margin: 10
    }
});

export default App;
