import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import CustomButton from '../../components/CustomButton';
import { black, dark_pink, grey1, green, grey2, white, green1 } from '../../../lib/colors';
import appStrings from '../../../lib/appStrings';
import { navigationRef } from '../../../lib/RootNavigation';
import CustomImage from '../../components/CustomImage';
import CustomText from '../../components/CustomText';
import UserAxios from '../../components/WsHelper/UserAxios';
import Toast from 'react-native-simple-toast';
import AsyncStorageKeys from '../../../lib/AsyncStorageKeys';
import AsyncStorage from '../../components/AsyncStorage';
import { StackActions } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import Lottie from 'lottie-react-native';

const { width, height } = Dimensions.get('window');

const OtpScreen = (props) => {
  const { route } = props;
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const mobilenumber = route.params?.mobile;

  const inputRefs = Array(6).fill().map(() => useRef(null));

  const userdata = async () => {
    const userrole = await AsyncStorage.getData(AsyncStorageKeys.role);
    const user_role = JSON.parse(userrole) || [];
    console.log("user1....>>>>>>>>>>>.", user_role);

  }

  useFocusEffect(
    React.useCallback(() => {
      userdata();

      return () => false;
    }, [])
  );

  useEffect(() => {
    inputRefs[0].current.focus();
  }, []);

  const handleChange = (index, value) => {
    if (/^\d$/.test(value) || value === '') {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        inputRefs[index + 1].current.focus();
      }
    }
  };

  const handleVerifyOTP = () => {
    const otpString = otp.join('');
    const inputParams = {
      mobile: mobilenumber,
      otp: otpString
    };

    UserAxios.getResponse(
      `${appStrings.screens.api_names.verify_otp}`,
      inputParams,
      "post",
      (response, error) => {
        if (!error) {
          if (!response.error) {

            if (response.status === 200) {
              console.log("response--->",response)
              const ID = JSON.stringify(response.patient_data.id);
              AsyncStorage.saveData(AsyncStorageKeys.patient_id, ID);
              AsyncStorage.saveData(AsyncStorageKeys.username, response.patient_data.name);
              Toast.show(response.message);
              navigateToHome();
            }
          } else {
            console.log("Response Error:", response.error);
            Toast.show(response.error);
          }
        } else {
          console.log("Request Error:", error);
        }
      }
    );
    console.log('Entered OTP:', otpString);
  };

  const navigateToHome = (token, id) => {

    AsyncStorage.saveData(
      AsyncStorageKeys.app_flow,
      appStrings.screens.navigators.userbottomTabNavigator
    );

    setTimeout(() => {
      const resetActions = StackActions.replace(
        appStrings.screens.navigators.userbottomTabNavigator
      );
      props.navigation.dispatch(resetActions);
    }, 1);
  };


  return (
    <SafeAreaView style={styles.container}>
      <View style={{ marginTop: '8%', alignSelf: 'center' }}>
        <CustomImage
          source={require('../../../assets/logo.png')}
          resizeMode="contain"
          style={{ width: 280, height: 75, alignSelf: 'center' }}
        />
      </View>

      <View style={styles.lottie}>
        <Lottie source={require('../../../assets/lottieFiles/otp.json')} autoPlay loop />
      </View>

      <View style={{ height: height / 2.8, width: width - 30, alignSelf: "center", top: "10%" }}>
        <CustomText style={{ alignSelf: "flex-start", fontSize: 26, fontWeight: 'bold', fontFamily: "Poppins", color: black, top: "2%", left: 5 }}>Enter Your OTP</CustomText>
      </View>

      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={inputRefs[index]}
            style={styles.otpInput}
            value={digit}
            onChangeText={(value) => handleChange(index, value)}
            keyboardType="numeric"
            maxLength={1}
            textAlign="center"
          />
        ))}
      </View>

      <View style={{ marginTop: "10%" }}>
        <CustomButton
          title="Submit"
          onPress={handleVerifyOTP}

          buttonStyle={styles.buttonStyle}
        />
      </View>

      <View style={{ alignSelf: 'center', flexDirection: 'row', marginTop: 15 }}>
        <CustomText style={{ fontWeight: 'bold', fontSize: 15, color: grey1 }}>Want To edit my</CustomText>
        <TouchableOpacity onPress={() => {
          navigationRef.current?.navigate(appStrings.screens.authNavigator.userlogin);
        }}>
          <CustomText style={{ fontWeight: 'bold', fontSize: 15, color: green1 }}> Number</CustomText>
        </TouchableOpacity>
      </View>

      {/* <View style={{ alignSelf: 'center', marginTop: 50 }}>
        <CustomText style={{ fontWeight: 'bold', fontSize: 12, color: grey1 }}>By clicking on get OTP you confirm that you agree</CustomText>
        <TouchableOpacity>
          <CustomText style={{ fontWeight: 'bold', fontSize: 12, left: 35, color: green }}> Term & Condition and Privacy Policy</CustomText>
        </TouchableOpacity>
      </View> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: white
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: "-40%"

  },
  otpInput: {
    width: 50,
    height: 50,
    borderColor: grey2,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 5,
    fontSize: 18,
    textAlign: 'center',
  },
  buttonStyle: {
    width: '92%',
    paddingVertical: 13,
    borderRadius: 10,
    alignSelf: 'center',
    backgroundColor: dark_pink,
  },
  lottie: {
    height: "40%",
    width: "70%",
    alignSelf: "center"
  },
});

export default OtpScreen;
