/* eslint-disable prettier/prettier */
import { View, ScrollView, TextInput, StyleSheet, RefreshControl, Dimensions, TouchableOpacity, Text, Alert, Platform } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomText from '../../../components/CustomText';
import CustomButton from '../../../components/CustomButton';
import appStrings from '../../../../lib/appStrings';
import { black, dark_pink, green, grey, grey_Border, primary, red, white } from '../../../../lib/colors';
import Loader from '../../../components/Loader';
import DateTextView from '../../../components/DateTextView';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment, { invalid } from 'moment';
import { Dropdown } from "react-native-element-dropdown";
import UserAxios from '../../../components/WsHelper/UserAxios';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useFocusEffect } from '@react-navigation/native';
import CustomImage from '../../../components/CustomImage';
// import { navigationRef } from '../../../../lib/RootNavigation';
import AsyncStorage from '../../../components/AsyncStorage';
import AsyncStorageKeys from '../../../../lib/AsyncStorageKeys';
import { navigationRef } from '../../../../lib/RootNavigation';
import SimpleTextInput from '../../../components/SimpleTextInput';
import Toast from 'react-native-simple-toast';
import { Image } from 'react-native';
import Base_Url from '../../../components/WsHelper/Base_Url';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Dialog ,Divider,ListItem} from 'react-native-elements';



const screenWidth = Dimensions.get("screen").width;

const CreateCamp = (props) => {
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
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [doctorname, setDoctorName] = useState([]);
  const [doctorvalue, setDoctorValue] = useState('');
  const [doctorId, setDoctorId] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [refreshing, setRefreshing] = useState(false);
  const [doctorDetails,setDoctorDetails] = useState([]);
  const [imageURI, setImageURI] = useState(null);
  const [pickermodal,setPickerModal]=useState(false);

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || new Date();
    const formattedDate = moment(currentDate).format("YYYY-MM-DD");
    setDatePickerVisible(Platform.OS === 'ios');
    setDate(formattedDate);
    setSelectedDate(currentDate);

  };

  const resetState = () => {
    setTitle("");
    setLocation("");
    setStartTime("");
    setEndTime("");
    setDate(new Date());
    setDoctorValue('');
    setDoctorId('');
    setDoctorDetails([])
  };

  const refreshPage = () => {
    resetState();
    doctorList();
  };


  const onRefresh = () => {
    setRefreshing(true);
    doctorList()
    refreshPage()
    setRefreshing(false);
  };

  useFocusEffect(
    React.useCallback(() => {

      doctorList();
      refreshPage()

      return () => false;
    }, [])
  );

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
              console.log("response value===",response)
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

  const createCamp = async () => {
    setShowProgress(true);
    const ID = await AsyncStorage.getData(AsyncStorageKeys.customer_id);
    const user_id = ID ? JSON.parse(ID) : null;
    var CampDate = moment(date).format("YYYY-MM-DD");
    
    //////
    const formData = new FormData();
    // Add patient data
    formData.append('title', title);
    formData.append('start_time', startTime);
    formData.append('end_time', endTime);
    formData.append('doctor_id', doctorId );
    formData.append('location', location);
    formData.append('camp_date', CampDate);
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

      UserAxios.getResponse(
        `${appStrings.screens.api_names.create_camp}`,
        formData,
        "post",
        (response, error) => {
  
          if (!error) {
            if (!response.error) {
              if (response.status === 200) {
                console.log("create camp response---->>>", response);
                Toast.show(response.message)
                navigationRef.current?.navigate(appStrings.screens.tabNavigator.homescreen)
  
                setTitle('');
                setDate('');
                setStartTime('');
                setEndTime('');
                setDoctorId('');
                setLocation('');
                setDoctorDetails([]);
                setImageURI('');
  
              } else if (response.status === 401) {
                const errorMessage =
                  (response.message.title && response.message.title[0]) ||
                  (response.message.camp_date && response.message.camp_date[0]) ||
                  (response.message.start_time && response.message.start_time[0]) ||
                  (response.message.end_time && response.message.end_time[0]) ||
                  (response.message.doctor_id && response.message.doctor_id[0]) ||
                  (response.message.location && response.message.location[0]) ||
                  (response.message.user_id && response.message.user_id[0]) ||
                  (response.message.doctor_image && response.message.doctor_image[0]) ||
                  'An unknown error occurred';
                Toast.show(errorMessage);
                console.log("Errormsg---",errorMessage)
              }
  
            } else {
  
              console.log("Error", response.error);
            }
  
          }
          else {
  
            if (error.name != undefined && error.name != null)
              console.log("........", error.name);
          }
          setShowProgress(false);
        }
  
      )

    }
    else{
      Toast.show("Image field is required");
    }
    // const inputParams = {
    //   title: title,
    //   start_time: startTime,
    //   end_time: endTime,
    //   doctor_id: doctorId,
    //   location: location,
    //   camp_date: CampDate,
    //   user_id: user_id,
    //   // doctor_image: imageURI

    // };
    
  
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

  const getDoctorDetails = (doctorId)=>{
    console.log("doctor id",doctorId.value)
    

    UserAxios.getResponse(
      `${appStrings.screens.api_names.doctor_details}${doctorId.value}`,
      {},
      "get",
      
      (response, error) => {
        
        if (!error) {
          if (!response.error) {
            if (response.status === 200) {

              console.log("response----->", response);
              setDoctorDetails(response.doctor_details)

            }
            else{
              console.log("response--->",response)
            }

          } else {
            console.log("Error", response.Error);
          }
        }
        else {
          console.log("error",error)
          if (error.name != undefined && error.name != null)
            console.log(error.name);
        }
        //setShowProgress(false);
      }
    );
  }


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
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[primary]}
            />
          }>
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
          <View style={{ marginHorizontal: 18, marginTop: -5 }}>
            <CustomText>Camp Date</CustomText>
          </View>

          <View style={{ left: 15, flexDirection: 'row', alignItems: 'center', borderColor: grey_Border, borderWidth: 1, padding: 5, borderRadius: 10, width: "92%", height: 50, marginTop: 10 }}>

            <TextInput
              value={moment(date).format('YYYY-MM-DD')}
              editable={true}
              // placeholderTextColor={grey}
              // placeholder='Select Date*'             
              keyboardType='numeric'
              onChangeText={(text) => {
                setDate(text);
              }}
              placeholderStyle={{ color: grey_Border }}
              style={{ flex: 1, color: black, paddingLeft: 10, fontSize: 16 }}
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

          <View style={{ marginHorizontal: 18, marginTop: 10 }}>
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
              text="Start Time*"
              iconSize={25}

            ></DateTextView>
            <DateTextView
              vStyle={{ width: screenWidth / 2 - 50 }}
              date={endTime}
              onPress={() => {
                endTimeClicked();
              }}
              text="End Time*"
              iconSize={25}
            ></DateTextView>
          </View>

          <View style={{ marginHorizontal: 14, borderRadius: 10, borderWidth: 1, borderColor: grey_Border, marginTop: 20 }}>
            <Dropdown
              data={doctorname}
              value={doctorvalue}
              onChange={(item) => {
                setDoctorValue(item.value);
                setDoctorId(item.value);
                getDoctorDetails(item)
              }}
              search
              maxHeight={300}
              searchPlaceholder="Search..."
              labelField="label"
              valueField="value"
              imageField="image"
              placeholder="Select Doctor*"
              placeholderStyle={{ fontSize: 16, color: grey }}
              inputSearchStyle={{ height: 40, fontSize: 16 }}
              selectedTextStyle={{ fontSize: 16, color: black }}
              itemTextStyle={{ fontSize: 16, color: black }}
              style={{ height: 50, width: '100%', paddingHorizontal: 10, color: black }}
              renderLeftIcon={ ()=> (
                doctorDetails.length > 0 && doctorDetails[0].image && <Image source={{uri: `${Base_Url}/storage/${doctorDetails[0].image}`}} style={{height:30,width:30,borderRadius:8,marginRight:12}} resizeMode='contain'/>
              )}
            />
          </View>
          {doctorDetails.length > 0 && 
          <>
          {doctorDetails[0]?.mobile &&
           <View style={{ marginTop: 15, marginLeft: 15 }}>
            <CustomText>Mobile No.</CustomText>
            <SimpleTextInput
              disabled={true}
              containerStyle={{ height: 50, width: "92%", }}
              value={doctorDetails[0]?.mobile}
              editable={false}
            />
          </View>}
         {doctorDetails[0]?.headQtr && <View style={{ marginTop: 15, marginLeft: 15 }}>
         <CustomText>Headquarter</CustomText>
            <SimpleTextInput
              disabled={true}
              editable={false}
              containerStyle={{ height: 50, width: "92%" }}
              value={doctorDetails[0]?.headQtr}
              //placeholderTextColor={grey}

            />
          </View>}
          </>
}

          <View style={{ marginTop: 15 }}>
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

          <View style={{ marginHorizontal: 18,top:-5 }}>
            <CustomText>Add Doctor Image</CustomText>
          </View>

          <TouchableOpacity
            style={{ marginTop: 5,borderRadius:10, width: 85, height: 85,left: "5%",borderWidth:1,borderColor:grey_Border }}
            onPress={() => setPickerModal(true)}
          >
            <CustomImage
              source={imageURI ? { uri: imageURI } : require('../../../../assets/galleryicon.png')}
              // source={require('../../../../assets/galleryicon.png')}
              resizeMode="contain"
              style={{ width: 75, height: 75, left: "5%",marginTop:3}}
            />
          </TouchableOpacity>

        </ScrollView>
      </View>

      <View style={{ marginTop: "10%" }}>

        <CustomButton
          title="Create Camp"
          onPress={() => createCamp()}
          //onPress={() => navigationRef.current?.navigate(appStrings.screens.tabNavigator.home)}
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
      // onBackdropPress={toggleDialog6}
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
      {/* {userlist.map((l, i) => (
        <ListItem
          key={i}
          containerStyle={{
            marginHorizontal: -10,
            borderRadius: 8,
          }}
          onPress={toggleDialog6}
        >
          <Avatar rounded source={{ uri: l.avatar_url }} />
          <ListItem.Content>
            <ListItem.Title style={{ fontWeight: '700' }}>
              {l.name}
            </ListItem.Title>
            <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      ))} */}
    </Dialog>

      <Loader showHud={showProgress} />
    </SafeAreaView>
  );
};

export default CreateCamp;

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
    // flex: 1,
    borderRadius: 30,
    alignSelf: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingBottom: 15,
    top: 10
  }
});

