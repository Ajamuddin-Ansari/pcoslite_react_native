import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import WebView from 'react-native-webview';
import { useFocusEffect } from '@react-navigation/native';
import UserAxios from '../../../components/WsHelper/UserAxios';
import { white } from '../../../../lib/colors';
import appStrings from '../../../../lib/appStrings';


const TermsAndCondition = () => {
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
        `${appStrings.screens.api_names.user_setting}`,
        inputParams,
        "get",
        (response, error) => {

          if (!error) {
            if (!response.error) {
              console.log("kkk", response.data);
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

    <SafeAreaView style={{ flex: 1, backgroundColor: white }}>

      {terms && terms ? (

        <WebView
          source={{ html: `<style>body { font-size: 40px; margin: 35px; }</style>${terms}` }}
          style={styles.webView}
        />

      ) : (
        <Text>Error loading terms and conditions</Text>
      )}

    </SafeAreaView>
  );
};

export default TermsAndCondition;

const styles = StyleSheet.create({
  webView: {
    webView: {
      flex: 1,
      fontSize: 18,
    },
  }
});