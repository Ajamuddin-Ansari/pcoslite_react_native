import { SafeAreaView, StyleSheet, TouchableOpacity, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { StackActions } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import Alert from '../../../components/Alert'
import AsyncStorage from '../../../components/AsyncStorage';
import AsyncStorageKeys from '../../../../lib/AsyncStorageKeys';
import appStrings from '../../../../lib/appStrings';
import { navigationRef } from '../../../../lib/RootNavigation';
import CustomImage from '../../../components/CustomImage';
import CustomText from '../../../components/CustomText';
import { grey1, grey_Border, white } from '../../../../lib/colors';
import Image_Url from '../../../components/WsHelper/Image_Url';

const Profile = () => {
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);

  const userdata = async () => {
    const user_name = await AsyncStorage.getData(AsyncStorageKeys.username);
    const user_Image = await AsyncStorage.getData(AsyncStorageKeys.userimage);
    console.log("PPPPP", user_name);
    setName(user_name);
    setImage(user_Image);
  }

  useFocusEffect(
    React.useCallback(() => {
      userdata();
      return () => false;
    }, [])
  );


  const showLogoutAlert = () => {

    Alert.alertWithAction(
      appStrings.screens.appStrings.logout,
      appStrings.screens.appStrings.logout_msg,
      appStrings.screens.appStrings.no,
      appStrings.screens.appStrings.yes,
      () => {

        logout();
      }
    );
  };

  const logout = () => {
    AsyncStorage.saveData(AsyncStorageKeys.app_flow, "");
    AsyncStorage.saveData(AsyncStorageKeys.user_id, "");
    AsyncStorage.saveData(AsyncStorageKeys.username,"")
    navigationRef.current?.dispatch(StackActions.replace(appStrings.screens.navigators.authNavigator));

  };


  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={{ marginTop: '3%', alignSelf: 'center', width: 152, height: 150, borderRadius: 75, borderColor: grey_Border, borderWidth: 0.5 }}>
          <CustomImage
            source={image ? { uri: `${Image_Url}${image}` } : require('../../../../assets/profile.png')}
            resizeMode="contain"
            style={{ width: 150, height: 150, borderRadius: 75, alignSelf: 'center' }}
          />
        </View>

        <View style={{ alignSelf: "center", top: 10 }}>
          <CustomText style={{ alignSelf: "center", fontSize: 23, fontweight: "500" }}>{name || "Patientname"}</CustomText>

        </View>

        <View style={styles.bottomLine} />

        <TouchableOpacity onPress={() => navigationRef.current?.navigate(appStrings.screens.appStrings.myProfile)}
          style={{ backgroundColor: white, height: 55, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <View style={{ alignSelf: 'flex-start', paddingVertical: 8, left: 30 }}>
            <CustomImage
              source={require('../../../../assets/p1.png')}
              resizeMode="contain"
              style={{ width: 40, height: 40, alignSelf: 'center' }}
            />
          </View>
          <View style={{ marginRight: "39%" }}>
            <CustomText style={{ fontSize: 16, fontweight: "500" }}>View Profile</CustomText>
          </View>
          <View style={{ alignSelf: 'flex-end', paddingVertical: 18, right: 30 }}>
            <CustomImage
              source={require('../../../../assets/arrow.png')}
              resizeMode="contain"
              style={{ width: 15, height: 20, alignSelf: 'center' }}
            />
          </View>
        </TouchableOpacity>
        <View style={styles.horizLine} />


        <TouchableOpacity onPress={() => navigationRef.current?.navigate(appStrings.screens.appStrings.aboutUs)}
          style={{ backgroundColor: white, height: 55, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <View style={{ alignSelf: 'flex-start', paddingVertical: 8, left: 30 }}>
            <CustomImage
              source={require('../../../../assets/p2.png')}
              resizeMode="contain"
              style={{ width: 40, height: 40, alignSelf: 'center' }}
            />
          </View>
          <View style={{ marginRight: "43%" }}>
            <CustomText style={{ fontSize: 16, fontweight: "500" }}>About Us</CustomText>
          </View>
          <View style={{ alignSelf: 'flex-end', paddingVertical: 18, right: 30 }}>
            <CustomImage
              source={require('../../../../assets/arrow.png')}
              resizeMode="contain"
              style={{ width: 15, height: 20, alignSelf: 'center' }}
            />
          </View>
        </TouchableOpacity>
        <View style={styles.horizLine} />

        <TouchableOpacity onPress={() => navigationRef.current?.navigate(appStrings.screens.appStrings.terms)}
          style={{ backgroundColor: white, height: 55, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <View style={{ alignSelf: 'flex-start', paddingVertical: 8, left: 30 }}>
            <CustomImage
              source={require('../../../../assets/p3.png')}
              resizeMode="contain"
              style={{ width: 40, height: 40, alignSelf: 'center' }}
            />
          </View>
          <View style={{ marginRight: "25%" }}>
            <CustomText style={{ fontSize: 16, fontweight: "500" }}>Term And Condition</CustomText>
          </View>
          <View style={{ alignSelf: 'flex-end', paddingVertical: 18, right: 30 }}>
            <CustomImage
              source={require('../../../../assets/arrow.png')}
              resizeMode="contain"
              style={{ width: 15, height: 20, alignSelf: 'center' }}
            />
          </View>
        </TouchableOpacity>
        <View style={styles.horizLine} />

        <TouchableOpacity onPress={() => navigationRef.current?.navigate(appStrings.screens.appStrings.privacy_policy)}
          style={{ backgroundColor: white, height: 55, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <View style={{ alignSelf: 'flex-start', paddingVertical: 8, left: 30 }}>
            <CustomImage
              source={require('../../../../assets/p4.png')}
              resizeMode="contain"
              style={{ width: 40, height: 40, alignSelf: 'center' }}
            />
          </View>
          <View style={{ marginRight: "35%" }}>
            <CustomText style={{ fontSize: 16, fontweight: "500" }}>Privacy Policy</CustomText>
          </View>
          <View style={{ alignSelf: 'flex-end', paddingVertical: 18, right: 30 }}>
            <CustomImage
              source={require('../../../../assets/arrow.png')}
              resizeMode="contain"
              style={{ width: 15, height: 20, alignSelf: 'center' }}
            />
          </View>
        </TouchableOpacity>
        <View style={styles.horizLine} />


        <TouchableOpacity onPress={() => navigationRef.current?.navigate(appStrings.screens.appStrings.contactUS)}
          style={{ backgroundColor: white, height: 55, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <View style={{ alignSelf: 'flex-start', paddingVertical: 8, left: 30 }}>
            <CustomImage
              source={require('../../../../assets/p5.png')}
              resizeMode="contain"
              style={{ width: 40, height: 40, alignSelf: 'center' }}
            />
          </View>
          <View style={{ marginRight: "39%" }}>
            <CustomText style={{ fontSize: 16, fontweight: "500" }}>Contact Us</CustomText>
          </View>
          <View style={{ alignSelf: 'flex-end', paddingVertical: 18, right: 30 }}>
            <CustomImage
              source={require('../../../../assets/arrow.png')}
              resizeMode="contain"
              style={{ width: 15, height: 20, alignSelf: 'center' }}
            />
          </View>
        </TouchableOpacity>
        <View style={styles.horizLine} />

        <TouchableOpacity onPress={showLogoutAlert}
          style={{ backgroundColor: white, height: 55, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <View style={{ alignSelf: 'flex-start', paddingVertical: 8, left: 30 }}>
            <CustomImage
              source={require('../../../../assets/logout.png')}
              resizeMode="contain"
              style={{ width: 40, height: 40, alignSelf: 'center' }}
            />
          </View>
          <View style={{ marginRight: "62%" }}>
            <CustomText style={{ fontSize: 16, fontweight: "500", color: '#FF0000' }}>Logout</CustomText>
          </View>

        </TouchableOpacity>
        <View style={styles.horizLine} />
      </View>
    </SafeAreaView>
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white
  },
  bottomLine: {
    width: '100%',
    height: 1,
    marginTop: "8%",
    backgroundColor: grey1,
  },
  horizLine: {
    width: '100%',
    height: 1,
    backgroundColor: "#323232",
  }

})