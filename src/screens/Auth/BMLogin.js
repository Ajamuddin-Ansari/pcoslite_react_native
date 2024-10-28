
import { SafeAreaView, StyleSheet, Text, View, Dimensions,TouchableOpacity,Modal } from 'react-native';
import React, { useState } from 'react';
import CustomButton from '../../components/CustomButton';
import CustomText from '../../components/CustomText';
import CustomImage from '../../components/CustomImage';
import appStrings from '../../../lib/appStrings';
import { navigationRef } from '../../../lib/RootNavigation';
import AuthAxios from '../../components/WsHelper/AuthAxios';
import AsyncStorageKeys from '../../../lib/AsyncStorageKeys';
import AsyncStorage from '../../components/AsyncStorage';
 import { StackActions } from '@react-navigation/native';
import { black, dark_pink,green1, grey1,grey_border, white } from '../../../lib/colors';
import Loader from '../../components/Loader';
import Toast from 'react-native-simple-toast';
import Lottie from 'lottie-react-native';
import SimpleTextInput from '../../components/SimpleTextInput';
import UserAxios from '../../components/WsHelper/UserAxios';
import { useFocusEffect } from '@react-navigation/native';
import WebView from 'react-native-webview';

const { width, height } = Dimensions.get('window');

const BMLogin = (props) => {

  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const [terms, setTerms] = useState(null);
  const [policy, setPolicy] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [visible, setVisible] = useState(false);

  const openModal = () => {
    if (terms) {
      setModalVisible(true);
    } else {
      console.error('Content is not available');
      Alert.alert('Error', 'Content is not available.');
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const openPolicyModal = () => {
    if (policy) {
      setVisible(true);
    } else {
      console.error('Content is not available');
      Alert.alert('Error', 'Content is not available.');
    }
  };

  const closePolicyModal = () => {
    setVisible(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

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



  const handleLogin = async () => {

    if (mobile.trim() === '') {
      Toast.show('Enter mobile number');
      return;
    }

    // Check if mobile number is a 10-digit valid number
    if (!/^\d{10}$/.test(mobile)) {
      Toast.show('Enter a valid 10-digit mobile number');
      return;
    }

    // Check if password is empty
    if (password.trim() === '') {
      Toast.show('Enter password');
      return;
    }
    setShowProgress(true);

    let inputParams = {
      mobile: mobile,
      sw_password: password,
    };

    AuthAxios.getResponse(
      `${appStrings.screens.api_names.user_login}`,
      inputParams,
      "post",
      (response, error) => {

        if (!error) {
          if (!response.error) {

            if (response.status === 200) {
              console.log("response", response);
             
              const user_role = JSON.stringify(response.user.role);
              const ID = JSON.stringify(response.user.id);
              const emp_code = response.user.emp_code;
              const name = response.user.name ;
              console.log("emp_code---->", emp_code,name);
              AsyncStorage.saveData(AsyncStorageKeys.customer_id, ID);
              AsyncStorage.saveData(AsyncStorageKeys.role, user_role);
              AsyncStorage.saveData(AsyncStorageKeys.name, name);
              AsyncStorage.saveData(AsyncStorageKeys.emp_code, JSON.stringify(emp_code));
                          
               navigateToHome(response.user);

              Toast.show(response.message);

            } else if (response.status === 401) {

              Toast.show(response.message);

            } else if (response.status === 400) {
              Toast.show(response.message);
            }

          } else {

            console.log("Error", response.error);
          }

        }
        else {

          if (error.name != undefined && error.name != null)
            console.log(error.name);
        }
        setShowProgress(false);
      }
    );
  };

  const navigateToHome = (token, id) => {

    AsyncStorage.saveData(
      AsyncStorageKeys.app_flow,
      appStrings.screens.navigators.bottomTabNavigator
    );

    setTimeout(() => {
      const resetActions = StackActions.replace(
        appStrings.screens.navigators.bottomTabNavigator
      );
      props.navigation.dispatch(resetActions);
    }, 1);
  };

  const handleForgetPassword = async () => {
    if (mobile.trim() === '') {
      Toast.show('Enter mobile number');
      return;
    }

    try {
      const inputParams = {
        mobile: mobile
      };
      AuthAxios.getResponse(
        `${appStrings.screens.api_names.forgetpassword}`,
        inputParams,
        "post",
        (response, error) => {

          if (!error) {
            if (!response.error) {
              console.log("ssssss", response);
              if (response.status === 200) {
                Toast.show(response.message);
              } else if (response.status === 401) {
                Toast.show(response.message);
              }
            } else {
              console.log("Error", response.Error);
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
    <SafeAreaView style={{ backgroundColor: white, flex: 1 }}>

      {/* <CustomText style={{ alignSelf: 'center', fontSize: 18, fontWeight: 'bold', color: black, top: "4%" }}>"Everything will be delivered in 20 minutes."</CustomText> */}

      <View style={{ marginTop: '5%', alignSelf: 'center' }}>
        <CustomImage
          source={require('../../../assets/logo.png')}
          resizeMode="contain"
          style={{ width: 280, height: 75, alignSelf: 'center' }}
        />
      </View>

      <View style={styles.lottie}>
        <Lottie source={require('../../../assets/lottieFiles/login.json')} autoPlay loop />
      </View>


      <View style={{ height: height / 2.8, width: width - 30, alignSelf: "center", marginTop: 10 }}>
        <CustomText style={{ alignSelf: "flex-start", fontSize: 26, fontWeight: 'bold', fontFamily: "Poppins", color: black, top: 10 }}>Login As A Employee</CustomText>
        <View>
          
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: "5%", }}>
            <View style={{ height: 55, width: "20%", borderRadius: 13, justifyContent: "center", borderWidth: 1, borderColor: grey_border, marginTop: 15 }}>
              <CustomText style={{ alignSelf: "center", fontSize: 15, fontWeight: "500", lineHeight: 30 }}>+91</CustomText>
            </View>
            <SimpleTextInput
              placeholder="Enter your mobile number"
              value={mobile}
              onChangeText={(text) => {
                setMobile(text);
              }}
              secureTextEntry={false}
              containerStyle={{ top: 5, width: "77%" }}
              keyboardType={"numeric"}
              maxLength={10}
            />
           
          </View>

          <SimpleTextInput
            placeholder="Enter your password"
            containerStyle={{ marginTop: 20 }}
            value={password}
            secureTextEntry={!showPassword}
            onChangeText={(text) => {
              setPassword(text);
            }}
            rightIcon={showPassword ? 'eye-off' : 'eye'}

            onPress={togglePasswordVisibility}
          />


          <View style={{ alignSelf: 'center', flexDirection: 'row', marginTop: 8 }}>
            <CustomText style={{ fontWeight: 'bold', fontSize: 15, color: grey1 }}>Forget password ask</CustomText>
            <TouchableOpacity onPress={handleForgetPassword}>
              <CustomText style={{ fontWeight: 'bold', fontSize: 15, color: green1 }}> Admin</CustomText>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ marginTop: "5%" }}>
          <CustomButton
            title="Login"
            onPress={handleLogin}
            buttonStyle={styles.buttonStyle}
          />
        </View>

        <View style={{ alignSelf: 'center', flexDirection: 'row', marginTop: 10 }}>
          <CustomText style={{ fontWeight: 'bold', fontSize: 15, color: grey1 }}>Login as a</CustomText>
          <TouchableOpacity onPress={() => {
            navigationRef.current?.navigate(appStrings.screens.authNavigator.userlogin);
          }}>
            <CustomText style={{ fontWeight: 'bold', fontSize: 15, color: green1 }}> Patient</CustomText>
          </TouchableOpacity>
        </View>

      </View>

      <View style={{ alignSelf: 'center', bottom: 10, position: "absolute" }}>
        <CustomText style={{ fontWeight: 'bold', fontSize: 12, color: grey1 }}>By clicking on get OTP you confirm that you agree</CustomText>
        <View style={{flexDirection:"row"}}>
        <TouchableOpacity onPress={openModal}>
          <CustomText style={{ fontWeight: 'bold', fontSize: 12, left: 35, color: green1 }}> Term & Condition</CustomText>
        </TouchableOpacity>
        <CustomText style={{ fontWeight: 'bold', fontSize: 12, left: 35, color: black }}> and </CustomText>
        <TouchableOpacity onPress={openPolicyModal}>
          <CustomText style={{ fontWeight: 'bold', fontSize: 12, left: 35, color: green1 }}> Privacy Policy</CustomText>
        </TouchableOpacity>
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View>
              <CustomText style={{alignSelf:"center",color:black,fontSize:20,fontWeight:"bold"}}>Terms And Conditions</CustomText>
            </View>
           
            { terms && terms ? (
     
     <WebView
       source={{ html:`<style>body { font-size: 40px; margin: 35px; }</style>${terms}` }}
       style={styles.webView}       
     />
   
   ) : (
     <Text>Error loading terms and conditions</Text>
   )}
           
           
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={closePolicyModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View>
              <CustomText style={{alignSelf:"center",color:black,fontSize:20,fontWeight:"bold"}}>Privacy Policy</CustomText>
            </View>
           
            { policy && policy ? (
     
     <WebView
       source={{ html:`<style>body { font-size: 40px; margin: 35px; }</style>${policy}` }}
       style={styles.webView}       
     />
   
   ) : (
     <Text>Error loading privacy policy</Text>
   )}
           
           
          </View>
        </View>
      </Modal>

      <Loader showHud={showProgress} />
    </SafeAreaView>
  );
};

export default BMLogin;

const styles = StyleSheet.create({
  buttonStyle: {
    width: '92%',
    paddingVertical: 13,
    borderRadius: 10,
    alignSelf: 'center',
    backgroundColor: dark_pink,
  },
  webView:{    
      flex: 1, 
      fontSize: 18,
      color:black
  },
  lottie: {
    height: "30%",
    width: "70%",
    right: 25,
    alignSelf: "center"
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '96%',
    height:"90%",
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
   
  },
  modalText: {
    fontSize: 16,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'green',
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
