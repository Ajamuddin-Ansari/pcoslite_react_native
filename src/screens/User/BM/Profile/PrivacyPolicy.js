import { SafeAreaView,StyleSheet,Text} from 'react-native'
import React,{useState} from 'react'
import WebView from 'react-native-webview';
import UserAxios from '../../../../components/WsHelper/UserAxios';
import appStrings from '../../../../../lib/appStrings';
import { useFocusEffect } from '@react-navigation/native';
import { white } from '../../../../../lib/colors';

const PrivacyPolicy = () => {
  const [policy, setPolicy] = useState();

  useFocusEffect(
    React.useCallback(() => {
      SettingApi();
      return () => false;
    }, [])
  );

  const SettingApi = async () => {
    try {
      const inputParams = {};
      UserAxios.getResponse(
        `${appStrings.screens.api_names.setting}`,
        inputParams,
        "get",
        (response, error) => {

          if (!error) {
            if (!response.error) {
             
             setPolicy(response.data.privacy_policy)
            } 

          }
          else {

            if (error.name != undefined && error.name != null)
              console.log("........", error.name);
          }

        }
      )
    } catch (error) {
      console.error('Error creating camp:', error);
    }
  };

  return (
    
    <SafeAreaView style={{flex:1, backgroundColor:white}}>
   
    { policy && policy ? (
     
      <WebView
        source={{ html:`<style>body { font-size: 40px; margin: 35px; }</style>${policy}` }}
        style={styles.webView}       
      />
    
    ) : (
      <Text>Error loading Privacy Policy</Text>
    )}
    
    </SafeAreaView>
  );
};

export default PrivacyPolicy;

const styles = StyleSheet.create({
  webView:{
    webView: {
      flex: 1, 
      fontSize: 18,
    },
  }
});