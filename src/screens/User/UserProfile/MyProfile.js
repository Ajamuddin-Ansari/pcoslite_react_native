import { SafeAreaView, StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import Toast from 'react-native-simple-toast';
import { launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '../../../components/AsyncStorage';
import AsyncStorageKeys from '../../../../lib/AsyncStorageKeys';
import UserAxios from '../../../components/WsHelper/UserAxios';
import appStrings from '../../../../lib/appStrings';
import CustomImage from '../../../components/CustomImage';
import SimpleTextInput from '../../../components/SimpleTextInput';
import CustomButton from '../../../components/CustomButton';
import { black, dark_pink, grey_Border, white } from '../../../../lib/colors';
import Image_Url from '../../../components/WsHelper/Image_Url';
import CustomText from '../../../components/CustomText';

const MyProfile = () => {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const [image, setImage] = useState(null);
  const [imageURI, setImageURI] = useState(null);



  useFocusEffect(
    React.useCallback(() => {
      console.log("HHH");
      profileApi();
      return () => false;
    }, [])
  );

  const profileApi = async () => {
    //setShowProgress(true);

    try {
      const id = await AsyncStorage.getData(AsyncStorageKeys.patient_id);
      const user_id = JSON.parse(id) || [];
      console.log("iddd.......", user_id);

      let inputParams = {};
      UserAxios.getResponse(
        `${appStrings.screens.api_names.patient_profile}/${user_id}`,
        inputParams,
        "get",
        (response, error) => {
          if (!error) {
            if (!response.error) {
              console.log("******", response.patient.name);

              AsyncStorage.saveData(AsyncStorageKeys.username, response.patient.name);
              AsyncStorage.saveData(AsyncStorageKeys.userimage, response.patient.image);
              setName(response.patient.name);
              setMobile(response.patient.mobile);
              setAddress(response.patient.address);
              setImage(response.patient.image);

            } else {
              console.log("Error", response.Error);
            }

          }
          else {

            if (error.name != undefined && error.name != null)
              console.log(error.name);
          }
          //setShowProgress(false);
        }
      );

    } catch (error) {

    }

  };

  const updateProfile = async () => {

    if (name.trim() === '') {
      Toast.show('Enter name');
      return;
    }


    try {
      const ID = await AsyncStorage.getData(AsyncStorageKeys.patient_id);
      const user_id = JSON.parse(ID) || [];

      const formData = new FormData();

      // Add patient data
      formData.append('name', name);
      formData.append('mobile', mobile);
      formData.append('address', address);

      // Add image data
      if (imageURI) {
        // Determine the file name and type (extension) of the image
        const fileName = imageURI.split('/').pop();
        const fileType = fileName.split('.').pop();

        // Append the image file to the FormData object
        formData.append('image', {
          uri: Platform.OS === 'ios' ? imageURI : 'file://' + imageURI,
          name: fileName,
          type: `image/${fileType}`,
        });
      }

      UserAxios.getResponse(
        `${appStrings.screens.api_names.update_patient_profile}/${user_id}`,
        formData,
        "post",
        (response, error) => {
          if (!error) {
            if (!response.error) {
              console.log("reeeessss", response);
              const name = response.patient.name
              AsyncStorage.saveData(AsyncStorageKeys.username, name);

              const image = response.patient.image
              AsyncStorage.saveData(AsyncStorageKeys.userimage, image);

              const data = JSON.stringify(response.patient);
              AsyncStorage.saveData(AsyncStorageKeys.patient_data, data);

              Toast.show(response.message);


            } else {
              console.log("Error", response.Error);
            }

          }
          else {

            if (error.name != undefined && error.name != null)
              console.log(error.name);
          }

        }

      );


    } catch (error) {

    }

  };

  const chooseFile = (type) => {
    let options = {
      mediaType: type,
      maxWidth: 30,
      maxHeight: 50,
      quality: 10,
    };

    // Launch the image picker
    launchImageLibrary(options, (response) => {
      console.log('Response = ', response);

      // Handle different scenarios
      if (response.didCancel) {
        alert('User cancelled image picker');
        return;
      } else if (response.errorCode) {
        alert(`Error: ${response.errorCode}`);
        return;
      } else if (response.assets && response.assets.length > 0) {
        // Set the image URI from the response
        setImageURI(response.assets[0].uri);
      } else {
        alert('Unexpected response from image picker');
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={{ marginTop: '5%', alignSelf: 'center', width: 152, height: 151, borderRadius: 75, borderColor: grey_Border, borderWidth: 0.5 }}>
          <CustomImage
            source={imageURI ? { uri: `${imageURI}` } : { uri: `${Image_Url}${image}` }}
            resizeMode="contain"
            style={{ width: 150, height: 150, borderRadius: 75, alignSelf: 'center' }}
          />

          <TouchableOpacity
            onPress={() => chooseFile('photo')}
            style={{ bottom: 0, right: 0, position: "absolute" }}>
            <CustomImage
              source={require('../../../../assets/photo.png')}
              resizeMode="contain"
              style={{ width: 40, height: 40, alignSelf: 'flex-end' }}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.view}>
          <ScrollView>
            <View style={{ marginTop: 10 }}>
              <CustomText style={{marginLeft:15}}>Name</CustomText>
              <SimpleTextInput
                placeholder="Enter your name"
                containerStyle={{ height: 50, width: "92%", marginLeft: 15 }}
                value={name}
                onChangeText={(text) => {
                  setName(text);
                }}
              />

            </View>

            <View style={{ marginTop: 10 }}>
            <CustomText style={{marginLeft:15}}>Mobile</CustomText>
              <SimpleTextInput
                placeholder="Enter mobile number"
                containerStyle={{ height: 50, width: "92%", marginLeft: 15 }}
                value={mobile}
                editable={false}
                onChangeText={(text) => {
                  setMobile(text);
                }}
                secureTextEntry={false}
                keyboardType={"numeric"}
                maxLength={10}
              />
            </View>

            <View style={{ marginTop: 10 }}>
            <CustomText style={{marginLeft:15}}>Address</CustomText>
              <SimpleTextInput
                placeholder="Enter your address"
                containerStyle={{ height: 50, width: "92%", marginLeft: 15 }}
                value={address}
                onChangeText={(text) => {
                  setAddress(text);
                }}

              />

            </View>


          </ScrollView>
        </View>

      </View>
      <View style={{ width: "100%", bottom: 10, position: "absolute" }}>
        <CustomButton
          title="Update Profile"
          onPress={() => updateProfile()}
          titleStyle={{ fontSize: 22 }}
          buttonStyle={styles.buttonStyle}
        />
      </View>
    </SafeAreaView>

  )
}

export default MyProfile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white
  },
  buttonStyle: {
    width: '90%',
    paddingVertical: 12,
    borderRadius: 10,
    alignSelf: 'center',
    backgroundColor: dark_pink,

  },
  view: {
    margin: 10,
    padding: 10,
    shadowColor: black,
    shadowOffset: { width: 1, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.65,
    elevation: 6,
    backgroundColor: white,
    width: "92%",
    // height: "50%",
    // flex: 1,
    borderRadius: 30,
    alignSelf: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingBottom: 15,
    marginTop: "10%"
  }
})