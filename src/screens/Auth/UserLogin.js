
import { SafeAreaView, StyleSheet, View, Dimensions, Modal, Text } from 'react-native';
import React, { useState } from 'react';
import CustomButton from '../../components/CustomButton';
import CustomText from '../../components/CustomText';
import CustomImage from '../../components/CustomImage';
import { TouchableOpacity } from 'react-native-gesture-handler';
import appStrings from '../../../lib/appStrings';
import { navigationRef } from '../../../lib/RootNavigation';
import AuthAxios from '../../components/WsHelper/AuthAxios';
import AsyncStorageKeys from '../../../lib/AsyncStorageKeys';
import AsyncStorage from '../../components/AsyncStorage';
import { black, dark_pink, green1, grey1, grey_border, white } from '../../../lib/colors';
import Loader from '../../components/Loader';
import Toast from 'react-native-simple-toast';
import SimpleTextInput from '../../components/SimpleTextInput';
import UserAxios from '../../components/WsHelper/UserAxios';
import { useFocusEffect } from '@react-navigation/native';
import WebView from 'react-native-webview';

const { width, height } = Dimensions.get('window');
//console.log("www", width);

const UserLogin = () => {

  const [mobile, setMobile] = useState("");
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

  const handleOtp = async () => {

    if (mobile.trim() === '') {
      Toast.show('Enter mobile number');
      return;
    }


    // setShowProgress(true);

    let inputParams = {
      mobile: mobile,
      role: 1

    };

    AuthAxios.getResponse(
      `${appStrings.screens.api_names.patient_login}`,
      inputParams,
      "post",
      (response, error) => {

        if (!error) {
          if (!response.error) {
            //console.log("RRrr",response);
            if (response.status === 200) {
              console.log("user_role---->", response);
              Toast.show(response.message)
              navigationRef.current?.navigate(appStrings.screens.authNavigator.otp, { "mobile": mobile });
              const user_role = JSON.stringify(response.role);
            
              AsyncStorage.saveData(AsyncStorageKeys.role, user_role);

            } else if (response.status === 401) {

              Toast.show(response.message.mobile[0]);
            }

          } else {

            console.log("Error", response.error);
          }

        }
        else {

          if (error.name != undefined && error.name != null)
            console.log(error.name);
        }
        //setShowProgress(false);
      }
    );
  };


  return (
    <SafeAreaView style={{ backgroundColor: white, flex: 1 }}>

      {/* <CustomText style={{ alignSelf: 'center', fontSize: 18, fontWeight: 'bold', color: black, top: "4%" }}>"Everything will be delivered in 20 minutes."</CustomText> */}

      <View style={{ alignSelf: 'center' }}>
        <CustomImage
          source={require('../../../assets/user/logo.png')}
          resizeMode="contain"
          style={{ width: 120, height: 45, alignSelf: 'center' }}
        />
      </View>

      <View style={{ marginTop: '5%', alignSelf: 'center' }}>
        <CustomImage
          source={require('../../../assets/logo.png')}
          resizeMode="contain"
          style={{ width: 280, height: 75, alignSelf: 'center' }}
        />
      </View>

      <View style={{ marginTop: '5%', alignSelf: 'center' }}>
        <CustomImage
          source={require('../../../assets/user/patientlogo.png')}
          resizeMode="contain"
          style={{ width: 290, height: 237, alignSelf: 'center' }}
        />
      </View>

      {/* <View style={styles.lottie}>     
        <Lottie source={require('../../../assets/lottieFiles/user.json')} autoPlay loop />
       </View> */}


      <View style={{ height: height / 2.8, width: width - 30, alignSelf: "center", marginTop: 20 }}>
        <CustomText style={{ alignSelf: "flex-start", fontSize: 26, fontWeight: 'bold', fontFamily: "Poppins", color: black, top: "2%", left: 5 }}>Healthy Weight {'\n'}Management Diet </CustomText>
        <View>
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: "5%", }}>
            <View style={{ height: 55, width: "20%", borderRadius: 13, justifyContent: "center", borderWidth: 1, borderColor: grey_border, marginTop: 15 }}>
              <CustomText style={{ alignSelf: "center", fontSize: 18, fontWeight: "500", lineHeight: 30 }}>+91</CustomText>
            </View>
            <SimpleTextInput
              placeholder="Enter your mobile number"
              onChangeText={setMobile}
              secureTextEntry={false}
              containerStyle={{ top: 5, width: "77%" }}
              inputStyle={{ borderRadius: 10 }}
              keyboardType={"numeric"}
              maxLength={10}
            />
            {/* <FloatingLabelInput
              label="Enter Your Number"
              lableStyle={{ marginLeft: 10 }}
              value={mobile}
              maxLength={10}
              style={{
                height: 60, width: 284,
                borderWidth: 1,
                borderRadius: 13,
                fontSize: 20,
                marginLeft: 5,
              
                paddingLeft: 15,
                borderColor: grey_Border,
              }}
              keyboardType={"numeric"}
              onChangeText={(text) => {
                setMobile(text);
              }}
            /> */}
          </View>

        </View>

        <View style={{ marginTop: "8%" }}>
          <CustomButton
            title="Send Otp"
            onPress={() => {
              handleOtp()
              //navigationRef.current?.navigate(appStrings.screens.authNavigator.otp);
            }}
            buttonStyle={styles.buttonStyle}
          />
        </View>

        <View style={{ alignSelf: 'center', flexDirection: 'row', marginTop: "3%" }}>
          <CustomText style={{ fontWeight: 'bold', fontSize: 15, color: grey1 }}>Login as a</CustomText>
          <TouchableOpacity onPress={() => {
            navigationRef.current?.navigate(appStrings.screens.authNavigator.bmlogin);
          }}>
            <CustomText style={{ fontWeight: 'bold', fontSize: 15, color: green1 }}> Employee</CustomText>
          </TouchableOpacity>
        </View>

      </View>
      <View style={{ alignSelf: 'center', bottom: 5, position: "absolute" }}>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={openModal}>
            <CustomText style={{ fontWeight: 'bold', fontSize: 12, color: green1 }}> Term & Condition</CustomText>
          </TouchableOpacity>
          <CustomText style={{ fontWeight: 'bold', fontSize: 12, left: 3, color: black }}> and </CustomText>
          <TouchableOpacity onPress={openPolicyModal}>
            <CustomText style={{ fontWeight: 'bold', fontSize: 12, left: 3, color: green1 }}> Privacy Policy</CustomText>
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
              <CustomText style={{ alignSelf: "center", color: black, fontSize: 20, fontWeight: "bold" }}>Terms And Conditions</CustomText>
            </View>

            {terms && terms ? (

              <WebView
                source={{ html: `<style>body { font-size: 40px; margin: 35px; }</style>${terms}` }}
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
              <CustomText style={{ alignSelf: "center", color: black, fontSize: 20, fontWeight: "bold" }}>Privacy Policy</CustomText>
            </View>

            {policy && policy ? (

              <WebView
                source={{ html: `<style>body { font-size: 40px; margin: 35px; }</style>${policy}` }}
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

export default UserLogin;

const styles = StyleSheet.create({
  buttonStyle: {
    width: '92%',
    paddingVertical: 13,
    borderRadius: 10,
    alignSelf: 'center',
    backgroundColor: dark_pink,
  },
  lottie: {
    height: "30%",
    width: "70%",
    right: 20,
    alignSelf: "center"
  },
  webView: {

    flex: 1,
    fontSize: 18,
    color: black

  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '96%',
    height: "90%",
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
