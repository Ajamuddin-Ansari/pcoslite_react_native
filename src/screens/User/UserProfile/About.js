import { SafeAreaView, StyleSheet, Text } from 'react-native'
import React, { useState } from 'react'
import WebView from 'react-native-webview';
import { useFocusEffect } from '@react-navigation/native';
import UserAxios from '../../../components/WsHelper/UserAxios';
import appStrings from '../../../../lib/appStrings';
import { white } from '../../../../lib/colors';


const About = () => {
  const [aboutUs, setAboutUs] = useState();

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

              setAboutUs(response.data.about_us)
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

      {aboutUs && aboutUs ? (

        <WebView
          source={{ html: `<style>body { font-size: 40px; margin: 35px; }</style>${aboutUs}` }}
          style={styles.webView}
        />

      ) : (
        <Text>Error loading About Us</Text>
      )}

    </SafeAreaView>
  );
};

export default About;

const styles = StyleSheet.create({
  webView: {
    webView: {
      flex: 1,
      fontSize: 18,
    },
  }
});