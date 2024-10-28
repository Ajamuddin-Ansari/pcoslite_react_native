/* eslint-disable prettier/prettier */
import { View, ScrollView, TextInput, StyleSheet, Dimensions, TouchableOpacity, Alert, Platform } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomText from '../../../components/CustomText';
import CustomButton from '../../../components/CustomButton';
import appStrings from '../../../../lib/appStrings';
import { black, dark_pink, green, grey, grey1, grey123, grey2, grey_Border, grey_bg, primary, red, white } from '../../../../lib/colors';
import Loader from '../../../components/Loader';
import DateTextView from '../../../components/DateTextView';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';
import { Dropdown } from "react-native-element-dropdown";
import FloatingInput from '../../../components/FloatingInput';
import UserAxios from '../../../components/WsHelper/UserAxios';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useFocusEffect } from '@react-navigation/native';
import CustomImage from '../../../components/CustomImage';
// import { navigationRef } from '../../../../lib/RootNavigation';
import AsyncStorage from '../../../components/AsyncStorage';
import AsyncStorageKeys from '../../../../lib/AsyncStorageKeys';
import Toast from 'react-native-simple-toast';
import { navigationRef } from '../../../../lib/RootNavigation';
import SimpleTextInput from '../../../components/SimpleTextInput';
import { Dialog, ListItem,Icon } from 'react-native-elements';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Base_Url from '../../../components/WsHelper/Base_Url';
//import DropDownPicker from 'react-native-dropdown-picker';

const screenWidth = Dimensions.get("screen").width;

const EditCamp = ({ route }) => {
  const [showProgress, setShowProgress] = useState(false);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [isStartDatePickerVisible, setStartDatePickerVisibility] = useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);
  const [selectedStartTime, setSelectedStartTime] = useState(new Date());
  const [selectedEndTime, setSelectedEndTime] = useState(new Date());
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [date, setDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [doctorName, setDoctorName] = useState([]);
  const [doctorValue, setDoctorValue] = useState("");
  const [doctorId, setDoctorId] = useState([]);
  const [campId, setCampId] = useState([]);
  const [pickermodal,setPickerModal]=useState(false);
  const [imageURI, setImageURI] = useState(null);
  const [doctorImage,setDoctorImage]=useState(null);



  const handleDateChange = (event, selectedDate) => {

    const currentDate = selectedDate || date;
    var seldate = moment(currentDate).format("YYYY-MM-DD");
    setDatePickerVisible(Platform.OS === 'ios');
    setDate(seldate);
    setSelectedDate(selectedDate);

  };
  const userdata = async () => {
    try {
      const campDetails = route.params?.item;
      console.log("capmDEtails===",campDetails)

      setCampId(campDetails.id)
      setTitle(campDetails.title);
      setDate(campDetails.camp_date);
      setStartTime(campDetails.start_time.slice(0, 5));
      setEndTime(campDetails.end_time.slice(0, 5));
      setLocation(campDetails.location);
      setDoctorValue(campDetails.doctor_name);
      setDoctorId(campDetails.doctor_id.toString());
      setDoctorImage(campDetails.doctor_image);

    } catch (error) {
      console.error("Error retrieving user data:", error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      userdata();
      doctorList();

      return () => false;
    }, [])
  );

  const handleDropdownChange = (item) => {
    setDoctorValue(item.value);
    setDoctorId(item.value);
  };


  const doctorList = async () => {
    const emp = await AsyncStorage.getData(AsyncStorageKeys.emp_code);
    const emp_code = emp ? JSON.parse(emp) : null;
     console.log("empCode value===",emp_code)
    try {
      const inputParams = {};
      UserAxios.getResponse(
        `${appStrings.screens.api_names.doctor_list}${emp_code}`,
        inputParams,
        "get",
        (response, error) => {

          if (!error) {
            if (!response.error) {
              //console.log("DOCTORLIST>>>>>",response.doctors);

              const doctorOptions = response.data.map((doctor) => ({
                label: doctor.code ? `${doctor.name} (${doctor.code})` : doctor.name,
                value: doctor.id,
              }));

              setDoctorName(doctorOptions);

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



  const UpdateCamp = async () => {
    try {
      const ID = await AsyncStorage.getData(AsyncStorageKeys.customer_id);
      const user_id = JSON.parse(ID) || [];
      console.log("idddd", user_id);

      const formData = new FormData();
      formData.append('title', title);
      formData.append('start_time', startTime);
      formData.append('end_time', endTime);
      formData.append('doctor_id', doctorId );
      formData.append('location', location);
      formData.append('camp_date', date);
      formData.append('user_id', user_id);


    // Add image data
    if (imageURI) {
      // Determine the file name and type (extension) of the image
      const fileName = imageURI.split('/').pop();
      const fileType = fileName.split('.').pop();

      // Append the image file to the FormData object
      formData.append('doctor_image', {
        uri: Platform.OS === 'ios' ? imageURI : 'file://' + imageURI,
        name: fileName,
        type: `image/${fileType}`,
      });

    }

      // const inputParams = {
      //   title: title,
      //   start_time: startTime,
      //   end_time: endTime,
      //   doctor_id: doctorId,
      //   location: location,
      //   camp_date: date,
      //   user_id: user_id,
      // };

      UserAxios.getResponse(
        `${appStrings.screens.api_names.update_camp}/${campId}`,
        formData,
        "post",
        (response, error) => {

          if (!error) {
            if (!response.error) {
              console.log("resssss", response);
              Toast.show(response.message)
              navigationRef.current?.navigate(appStrings.screens.tabNavigator.homescreen)
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

  const startTimeClicked = () => {
    setStartDatePickerVisibility(true);
  };
  const endTimeClicked = () => {
    setEndDatePickerVisibility(true);
  };
  const hideEndTimePicker = () => {
    setEndDatePickerVisibility(false);
  };

  const hideStartTimePicker = () => {
    setStartDatePickerVisibility(false);
  };

  const handleStartTimeConfirm = (date) => {
    var seldate = moment(date).format("DD.MM.YYYY HH:mm:ss");
    console.log(seldate);
    setStartTime(moment(date).format("HH:mm"));

    setSelectedStartTime(date);
    hideStartTimePicker();
    setShowTimingError(false);
  };

  const handleEndTimeConfirm = (date) => {
    var seldate = moment(date).format("DD.MM.YYYY HH:mm:ss");
    console.log(seldate);
    setEndTime(moment(date).format("HH:mm"));
    setSelectedEndTime(date);
    hideEndTimePicker();
    setShowTimingError(false);
  };

  const openImageLibrary = async(pickerType) => {
    
    const options = {
      mediaType: 'photo',
      quality: 1,
    };
      

    if (pickerType === 'camera') {
       launchCamera(options, (response) => {

        if (response.didCancel) {
          setPickerModal(false)
          Alert.alert('Camera', 'User cancelled image capture');
  
        } 
        else if (response.errorCode) {
          setPickerModal(false)
          Alert.alert('Camera', 'Error: ' + response.errorMessage);
        } 
        else {
          
          setPickerModal(false)
          console.log('Camera response:', response);
          setImageURI(response.assets[0].uri);
  
        }
      });
    }
  else {
      launchImageLibrary(options, (response) => {
      if (response.didCancel) {

        setPickerModal(false)
        Alert.alert('Image Library', 'User cancelled image selection');
      } 
      else if (response.errorCode) 
      {

        setPickerModal(false)
        Alert.alert('Image Library', 'Error: ' + response.errorMessage);
      } 
      else 
      {
        setPickerModal(false);
        console.log('Image library response:', response);
        setImageURI(response.assets[0].uri);

      }
    });
  }
   
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: white }}>

      <View style={styles.view}>
        <ScrollView>
          <View>
            <CustomText style={{ fontSize: 18, fontWeight: 'bold', left: 18 }}>Enter Camp Details Here,</CustomText>
          </View>
          <View style={{ marginTop: 10 }}>
            <SimpleTextInput
              placeholder="Camp Title*"
              containerStyle={{ height: 50, width: "92%", marginLeft: 15 }}
              value={title}
              onChangeText={(text) => {
                setTitle(text);
              }}

            />

          </View>
          <View style={{ marginHorizontal: 18, marginTop: 5 }}>
            <CustomText>Camp Date</CustomText>
          </View>

          <View style={{ left: 15, flexDirection: 'row', alignItems: 'center', borderColor: grey_Border, borderWidth: 1, padding: 5, borderRadius: 10, width: "92%", height: 50, marginTop: 10 }}>

            <TextInput
              value={date}
              editable={false}
              placeholder='Select Date'
              onChange={handleDateChange}
              style={{ flex: 1, color: black, paddingLeft: 10 }}
            />

            {/* Calendar Icon */}
            <TouchableOpacity onPress={() => {
              setDatePickerVisible(true)

            }}>
              <View style={{ right: 5 }}>
                <CustomImage
                  source={require('../../../../assets/date.png')}
                  resizeMode="contain"
                  style={{ width: 25, height: 25, borderRadius: 0 }}
                />
              </View>
            </TouchableOpacity>
          </View>

          {isDatePickerVisible && (
            <DateTimePicker
              value={selectedDate}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}

          <View style={{ marginHorizontal: 18, marginTop: 15 }}>
            <CustomText>Camp Timing</CustomText>
          </View>
          <View
            style={{
              flexDirection: "row",
              marginTop: 15,
              marginHorizontal: 16,
              justifyContent: "space-between",
            }}
          >
            <DateTextView
              vStyle={{ width: screenWidth / 2 - 50 }}
              date={startTime}
              onPress={() => {
                startTimeClicked();
              }}
              text="Start Time"
              iconSize={25}

            ></DateTextView>
            <DateTextView
              vStyle={{ width: screenWidth / 2 - 50 }}
              date={endTime}
              onPress={() => {
                endTimeClicked();
              }}
              text="End Time"
              iconSize={25}
            ></DateTextView>
          </View>

          <View style={{ marginHorizontal: 14, borderRadius: 10, marginTop: 25, borderRadius: 10, borderColor: grey_Border, borderWidth: 1 }}>

            <Dropdown
              data={doctorName}
              value={doctorValue}
              search
              onChange={handleDropdownChange}
              labelField="label"
              valueField="value"
              searchPlaceholder="Search..."
              placeholder={doctorValue ? doctorValue : 'Select Doctor'}
              placeholderStyle={{ fontSize: 14, color: 'black' }}
              selectedTextStyle={{ fontSize: 14, color: 'black' }}
              inputSearchStyle={{ height: 40, fontSize: 16 }}
              itemTextStyle={{ fontSize: 16, color: black }}
              style={{ height: 50, width: '100%', paddingHorizontal: 10 }}
            />
          </View>

          <View style={{ marginTop: 20 }}>

            <SimpleTextInput
              placeholder="Enter Camp Location*"
              containerStyle={{ height: 50, width: "92%", marginLeft: 15 }}
              value={location}
              //placeholderTextColor={grey}
              onChangeText={(text) => {
                setLocation(text);
              }}

            />
          </View>
          <View style={{ marginHorizontal: 18,top:-5 ,marginTop:2}}>
            <CustomText>Add Doctor Image</CustomText>
          </View>

          <TouchableOpacity
            style={{ marginTop: 5,borderRadius:10, width: 85, height: 85,left: "5%",borderWidth:1,borderColor:grey_Border,marginBottom:10 }}
          
          >
            <CustomImage
              source={imageURI ? { uri: imageURI } :{uri: `${Base_Url}/storage/${doctorImage}`}}
              // source={{uri: `${Base_Url}/storage/${item.doctor_image}`}}
              // source={require('../../../../assets/galleryicon.png')}
              resizeMode="contain"
              style={{ width: 75, height: 75, left: "5%",marginTop:3}}
            />
            <View  style={{position:'absolute',bottom:5,right:5}}>
               <Icon name="pencil-circle" type="material-community" color={"#fff"} size={24}  
                  onPress={() => setPickerModal(true)}
              />    
            </View>    
          </TouchableOpacity>

        </ScrollView>
      </View>

      <View style={{ marginTop: "10%" }}>

        <CustomButton
          title="Update Camp"
          onPress={() => { UpdateCamp() }}
          buttonStyle={styles.buttonStyle}
        />
      </View>

      <DateTimePickerModal
        mode="time"
        isVisible={isStartDatePickerVisible}
        locale="en_GB"
        date={selectedStartTime}
        is24Hour={false}
        onCancel={hideStartTimePicker}
        onConfirm={handleStartTimeConfirm}
      />
      <DateTimePickerModal
        mode="time"
        isVisible={isEndDatePickerVisible}
        locale="en_GB"
        date={selectedEndTime}
        is24Hour={false}
        onCancel={hideEndTimePicker}
        onConfirm={handleEndTimeConfirm}
      />
        {/* Select Picker Modal */}
        <Dialog
              isVisible={pickermodal}
              onBackdropPress={()=>setPickerModal(false)}
                >
          <Dialog.Title title="Choose Options"/>
              <ListItem   containerStyle={{
                  marginHorizontal: -10,
                  borderRadius: 8,
                }}>
              <ListItem.Content >
                  <Dialog.Button style={{ fontWeight: '700' }} title={" Open Camera"}
                  onPress={()=>{openImageLibrary('camera')}}>
                  </Dialog.Button>
                  
                  <Dialog.Button style={{ fontWeight: '700' }} title={" Open Gallery"}
                  onPress={()=>{openImageLibrary('photos')}}>
                  </Dialog.Button>
                  
                </ListItem.Content>
                </ListItem>
        </Dialog> 



      <Loader showHud={showProgress} />
    </SafeAreaView>
  );
};

export default EditCamp;

const styles = StyleSheet.create({
  buttonStyle: {
    width: '90%',
    paddingVertical: 12,
    borderRadius: 10,
    alignSelf: 'center',
    backgroundColor: dark_pink,
    marginBottom: 20
  },
  placeholderStyle: {
    color: green,
    fontSize: 14,
    fontFamily: "regular",
  },
  dropdown: {
    borderBottomWidth: 1,
    borderColor: primary,
    marginTop: 8,
    paddingBottom: 3,

  },
  selectedTextStyle: {
    fontSize: 14,
    fontFamily: "regular",
    color: "#4F4F4F",

  },
  inputSearchStyle: {
    fontSize: 14,
    color: "#4F4F4F",
    fontFamily: "regular",
  },
  itemTextStyle: {
    fontSize: 14,
    color: "#4F4F4F",
    fontFamily: "regular"
  },
  labelStyle: {
    marginTop: 25,
    fontSize: 16,
    color: black,
  },
  labelErrorStyle: {
    marginTop: 25,
    fontSize: 16,
    color: red,
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
    height: "70%",
    borderRadius: 30,
    alignSelf: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingBottom: 15,
    top: 10
  }
});

