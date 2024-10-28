import React, { useEffect } from "react";
import { StyleSheet, View, Image } from "react-native";
import AsyncStorageKeys from "../../lib/AsyncStorageKeys";
import AsyncStorage from "../components/AsyncStorage";
import appStrings from "../../lib/appStrings";

const Splash = (props) => {
  const navigation = props.navigation;

  useEffect(() => {
    setTimeout(() => {
      navigateToScreen();
    }, 1000);
  }, []);

  const navigateToScreen = async () => {

    const app_flow = await AsyncStorage.getData(AsyncStorageKeys.app_flow);
    console.log("app_flow",app_flow);
    if (app_flow != "") navigation.replace(app_flow);
    else navigation.replace(appStrings.screens.navigators.authNavigator);
  };

  return (
    <>
      <View style={styles.viewStyle}>
        <Image
          resizeMode="contain"
          style={styles.logoStyle}
          source={require('../../assets/logo.png')}
        />

        {/* <Text style={styles.textStyle}>
          {appStrings.screens.appStrings.splash}
        </Text> */}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  viewStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  logoStyle: {
    height: 200,
    width: 200,
  },
  textStyle: {
    color: "#6B0F1A",
    marginVertical: 10,
    fontSize: 20,
  },
});

export default Splash;
