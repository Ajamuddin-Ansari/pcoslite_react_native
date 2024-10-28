import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React,{useState} from 'react'
import WebView from 'react-native-webview';
import UserAxios from '../../../../components/WsHelper/UserAxios';
import appStrings from '../../../../../lib/appStrings';
import { useFocusEffect } from '@react-navigation/native';
import { white } from '../../../../../lib/colors';

const TermsCondition = () => {
  const [terms, setTerms] = useState();

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
            
             setTerms(response.data.terms_conditions)
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
   
    { terms && terms ? (
     
      <WebView
        source={{ html:`<style>body { font-size: 40px; margin: 35px; }</style>${terms}` }}
        style={styles.webView}       
      />
    
    ) : (
      <Text>Error loading terms and conditions</Text>
    )}
    
    </SafeAreaView>
  );
};

export default TermsCondition;

const styles = StyleSheet.create({
  webView:{
    
      flex: 1, 
      fontSize: 18,
    },
 
});