import { SafeAreaView,StyleSheet,Text} from 'react-native'
import React,{useState} from 'react'
import WebView from 'react-native-webview';
import UserAxios from '../../../../components/WsHelper/UserAxios';
import appStrings from '../../../../../lib/appStrings';
import { useFocusEffect } from '@react-navigation/native';
import { white } from '../../../../../lib/colors';

const ContactUs = () => {
  const [contactUs, setContactUs] = useState();

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
             
             setContactUs(response.data.contact_us)
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
   
    { contactUs && contactUs ? (
     
      <WebView
        source={{ html:`<style>body { font-size: 40px; margin: 35px; }</style>${contactUs}` }}
        style={styles.webView}       
      />
    
    ) : (
      <Text>Error loading Contact Us</Text>
    )}
    
    </SafeAreaView>
  );
};

export default ContactUs;

const styles = StyleSheet.create({
  webView:{
    webView: {
      flex: 1, 
      fontSize: 18,
    },
  }
});