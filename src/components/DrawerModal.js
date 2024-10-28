import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Share, Linking, Image } from 'react-native';
import Modal from 'react-native-modal';
import { Icon } from 'react-native-elements';
import CustomImage from './CustomImage';
import CustomText from './CustomText';
import { navigationRef } from '../../lib/RootNavigation';
import appStrings from '../../lib/appStrings';
import { StackActions, useNavigation } from '@react-navigation/native';
import Alert from './Alert';
import { SafeAreaView } from 'react-native';
import AsyncStorage from './AsyncStorage';
import AsyncStorageKeys from '../../lib/AsyncStorageKeys';
import UserAxios from './WsHelper/UserAxios';
import AuthAxios from './WsHelper/AuthAxios';
import { WebView } from 'react-native-webview';

const DrawerModal = ({ isVisible, onClose }) => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [appname, setAppname] = useState('');
  const [appimage, setAppimage] = useState();
  const [isWebViewVisible, setIsWebViewVisible] = useState(false);


  const url = 'https://instadrop.androappstech.in/home/delete_account';

  const handleButtonPress = () => {
    setIsWebViewVisible(true);
  };


  const handleWebViewClose = () => {
    setIsWebViewVisible(false);
  };

  const userdata = async () => {
    const username = await AsyncStorage.getData(AsyncStorageKeys.user_name);
    const usermobile = await AsyncStorage.getData(AsyncStorageKeys.user_mobile);

    console.log("user1", username);
    setName(username);
    setMobile(usermobile);
  }



  useEffect(() => {
    const fetchData = async () => {
      await userdata();

    };

    fetchData();
    appdataApi();

  }, []);

  const rateUs = () => {
    Linking.openURL("http://play.google.com/store/apps/details?id=<InstaDrop>")

  };

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
    navigationRef.current?.dispatch(StackActions.replace(appStrings.screens.navigators.authNavigator));

  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        title: 'Let me recommend you this application Easy Shopping',
        message: 'Let me recommend you this application Easy Shopping \n \n You can Earn coins and Buy different varieties in \n InstaDrop through Shopping \n This is my Referred Code INSTA_DROP11 \n \n https://play.google.com/store/apps/details?id=com.shop.instadrop',
        url: 'https://play.google.com/store/apps/details?id=com.shop.instadrop'
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const appdataApi = async () => {

    // setShowProgress(true);
    const ID = await AsyncStorage.getData(AsyncStorageKeys.user_id);
    const user_id = JSON.parse(ID) || [];

    let inputParams = {

      user_id: user_id,

    };

    AuthAxios.getResponse(
      `${appStrings.screens.api_names.terms_conditions}`,
      inputParams,
      "post",
      (response, error) => {
        // console.log(">>>>>>",response)

        if (!error) {
          if (!response.error) {

            setAppname(response.user_data.app_name);

          } else {
            console.log("Error", response.Error);
          }

        }
        else {

          if (error.name != undefined && error.name != null)
            console.log(error.name);
        }
        // setShowProgress(false);
      }
    );
  };

  return (

    <Modal
      isVisible={isVisible}
      onSwipeComplete={onClose}
      onBackdropPress={onClose}
      backdropColor='transparent'
      animationIn="slideInLeft"
      animationOut="slideOutLeft"
      transparent={true}
      style={styles.modal}
      onRequestClose={onClose}

    >
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <View style={styles.drawerContainer}>

            <View style={{ backgroundColor: "#989C98", height: "25%" }}>

              <View>
                <CustomText style={styles.textStyle}>{appname}</CustomText>
                <CustomText style={styles.textStyle}>{name}</CustomText>
                <CustomText style={styles.textStyle}>{mobile}</CustomText>
              </View>

            </View>
            <View>
              <TouchableOpacity style={{ flexDirection: "row", left: 20, top: "5%" }}
                onPress={() => {
                  navigation.navigate(appStrings.screens.appStrings.profile)
                  onClose();
                }}
              >
                <Icon name="account" type="material-community" color={"grey"} size={26} />
                <CustomText style={{ left: 25, top: 5, fontSize: 16 }}>Profile</CustomText>
              </TouchableOpacity>

              <TouchableOpacity style={{ flexDirection: "row", left: 20, top: "12%" }}
                onPress={() => {
                  navigation.navigate(appStrings.screens.appStrings.my_cart)
                  onClose();

                }}>
                <Icon name="cart" type="material-community" color={"grey"} size={26} />
                <CustomText style={{ left: 25, top: 5, fontSize: 16 }}>My Cart</CustomText>
              </TouchableOpacity>

              <TouchableOpacity style={{ flexDirection: "row", left: 20, top: "20%" }}
                onPress={() => {
                  navigation.navigate(appStrings.screens.appStrings.my_orders)
                  onClose();
                }}>
                <Icon name="cart-plus" type="material-community" color={"grey"} size={26} />
                <CustomText style={{ left: 25, top: 5, fontSize: 16 }}>My Orders</CustomText>
              </TouchableOpacity>

              <TouchableOpacity style={{ flexDirection: "row", left: 20, top: "28%" }}
                onPress={() => {
                  navigation.navigate(appStrings.screens.appStrings.contactUS)
                  onClose();
                }}>
                <Icon name="contacts" type="material-community" color={"grey"} size={26} />
                <CustomText style={{ left: 25, top: 5 }}>Contact Us</CustomText>
              </TouchableOpacity>

              <TouchableOpacity style={{ flexDirection: "row", left: 20, top: "36%" }}
                onPress={onShare}>

                <Icon name="share-variant" type="material-community" color={"grey"} size={26} />
                <CustomText style={{ left: 25, top: 5, fontSize: 16 }}>Share this App</CustomText>
              </TouchableOpacity>

              <TouchableOpacity style={{ flexDirection: "row", left: 20, top: "44%" }}
                onPress={() => {
                  navigation.navigate(appStrings.screens.appStrings.qr_code)
                  onClose();
                }}>
                <Icon name="qrcode-scan" type="material-community" color={"grey"} size={26} />
                <CustomText style={{ left: 25, top: 5, fontSize: 16 }}>QR Code</CustomText>
              </TouchableOpacity>

              <TouchableOpacity style={{ flexDirection: "row", left: 20, top: "50%" }}
                onPress={() => {
                  // <WebView source={{ uri: 'http://68.183.92.60/insta_drop/api/User/app' }} />
                  navigation.navigate(appStrings.screens.appStrings.terms_conditions)
                  onClose();
                }}>
                <Icon name="account" type="material-community" color={"grey"} size={26} />
                <CustomText style={{ left: 25, top: 5, fontSize: 16 }}>Term and Conditions</CustomText>
              </TouchableOpacity>

              <TouchableOpacity style={{ flexDirection: "row", left: 20, top: "56%" }}
                onPress={rateUs}>
                <Icon name="star" type="material-community" color={"grey"} size={26} />
                <CustomText style={{ left: 25, top: 5, fontSize: 16 }}>Rate Us</CustomText>
              </TouchableOpacity>

              <TouchableOpacity style={{ flexDirection: "row", left: 20, top: "62%" }}
                onPress={showLogoutAlert}>
                <Icon name="logout" type="material-community" color={"grey"} size={26} />
                <CustomText style={{ left: 25, top: 5, fontSize: 16 }}>Logout</CustomText>

              </TouchableOpacity>



            </View>

          </View>
        </View>
        {isWebViewVisible && (
          <Modal
            visible={isWebViewVisible}
            onRequestClose={handleWebViewClose}
            style={{ flex: 1, marginTop: 10 }}
          >

            <WebView
              source={{ uri: url }}
              style={{ flex: 1 }}
              scrollEnabled={true}
            />


          </Modal>
        )}
      </SafeAreaView>
    </Modal>

  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 0,

    // backgroundColor: 'rgba(0,0,0,0.7)',

  },
  textStyle: {
    color: "white",
    left: 15
  },
  drawerContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderRightWidth: 1,
    borderColor: '#ccc',
    width: '75%',
    top: "6.8%",

  },
  closeButton: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
});

export default DrawerModal;
