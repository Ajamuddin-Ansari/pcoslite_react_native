/* eslint-disable prettier/prettier */
import { View, ScrollView, TextInput, StyleSheet, RefreshControl, Dimensions, TouchableOpacity } from 'react-native';
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
import { Icon } from 'react-native-elements';


const screenWidth = Dimensions.get("screen").width;

const AddSnack = (props) => {
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
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [refreshing, setRefreshing] = useState(false);
  const [placevalue, setPlaceValue] = useState('');
  const [lunchvalue, setLunchValue] = useState('');
  const [activityvalue, setActivityValue] = useState('');
  const [moodvalue, setMoodValue] = useState('');
  const [hungerValue, setHungerValue] = useState('');
  const [fullnessValue, setFullnessValue] = useState('');
  const [amount, setAmount] = useState(0);
  const [calories, setCalories] = useState(0);
  const [food, setFood] = useState('');
  const [filled, setFilled] = useState('');

  const place = [
    { label: 'Kitchen', value: 'Kitchen' },
    { label: 'Living Room', value: 'Living Room' },
    { label: 'Bedroom', value: 'Bedroom' },
    { label: 'Car', value: 'Car' },
    { label: 'Desk at work', value: 'Desk at work' },


  ];

  const lunchdata = [
    { label: 'Alone', value: 'Alone' },
    { label: 'Family', value: 'Family' },
    { label: 'Friends', value: 'Friends' },
    { label: 'Colleagues', value: 'Colleagues' },
  ];

  const activitydata = [
    { label: 'Reading', value: 'Reading' },
    { label: 'Watching Tv', value: 'Watching Tv' },
    { label: 'Talking', value: 'Talking' },
    { label: 'Cooking', value: 'Cooking' },
  ];

  const mooddata = [
    { label: 'Neutral', value: 'Neutral' },
    { label: 'Happy', value: 'Happy' },
    { label: 'Tense', value: 'Tense' },
    { label: 'Depressed', value: 'Depressed' },
    { label: 'Angry', value: 'Angry' },
    { label: 'Boared', value: 'Boared' },
    { label: 'Rushed', value: 'Rushed' },
    { label: 'Tired', value: 'Tired' },
  ];

  const hungerdata = [
    { label: 'No Hunger', value: 'No Hunger' },
    { label: 'Slightly Hungry', value: 'Slightly Hungry' },
    { label: 'Moderately Hungry', value: 'Moderately Hungry' },
    { label: 'Hungry', value: 'Hungry' },
    { label: 'Very Hungry', value: 'Very Hungry' },
    { label: 'Starving', value: 'Starving' },

  ];

  const fullnessdata = [
    { label: 'Still Hungry', value: 'Still Hungry' },
    { label: 'Quite Satisfied', value: 'Quite Satisfied' },
    { label: 'Uncomfortable', value: 'Uncomfortable' },
  ];



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

  };

  const refreshPage = () => {
    resetState();

  };


  const onRefresh = () => {
    setRefreshing(true);

    refreshPage()
    setRefreshing(false);
  };

  useFocusEffect(
    React.useCallback(() => {


      refreshPage()

      return () => false;
    }, [])
  );


  const addSnack = async () => {

    const ID = await AsyncStorage.getData(AsyncStorageKeys.patient_id);
    const patientid = ID ? JSON.parse(ID) : null;

    var CampDate = moment(date).format("YYYY-MM-DD")
    console.log("DATT", date);

    setShowProgress(true)
    const inputParams = {
      patient_id: patientid,
      date: CampDate,
      start_time: startTime,
      end_time: endTime,
      place: placevalue,
      with: lunchvalue,
      activity: activityvalue,
      mood: moodvalue,
      hunger_level: hungerValue,
      amount: amount,
      snack_food: food,
      calories: calories,
      fullness: fullnessValue,
      filled_out: filled


    };
    UserAxios.getResponse(
      `${appStrings.screens.api_names.add_snack}`,
      inputParams,
      "post",
      (response, error) => {

        if (!error) {
          if (!response.error) {
            if (response.status === 200) {

              Toast.show(response.message)
              navigationRef.current?.navigate(appStrings.screens.patienttabNavigator.diary)



            } else if (response.status === 401) {
              const errorMessage =

                (response.message.date && response.message.date[0]) ||
                (response.message.start_time && response.message.start_time[0]) ||
                (response.message.end_time && response.message.end_time[0]) ||
                (response.message.place && response.message.place[0]) ||
                (response.message.with && response.message.with[0]) ||
                (response.message.activity && response.message.activity[0]) ||
                (response.message.mood && response.message.mood[0]) ||
                (response.message.hunger_level && response.message.hunger_level[0]) ||
                (response.message.amount && response.message.amount[0]) ||
                (response.message.snack_food && response.message.snack_food[0]) ||
                (response.message.fullness && response.message.fullness[0]) ||
                (response.message.filled_out && response.message.filled_out[0]) ||


                'An unknown error occurred';
              Toast.show(errorMessage);
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



  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: white }}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[primary]}
          />
        }>

        <View style={{ marginHorizontal: 18, marginTop: 10 }}>
          <CustomText style={styles.text}> Date</CustomText>
        </View>

        <View style={{ left: 15, flexDirection: 'row', alignItems: 'center', borderColor: grey_Border, borderWidth: 1, padding: 5, borderRadius: 10, width: "92%", height: 50, marginTop: 10 }}>

          <TextInput
            value={moment(date).format('YYYY-MM-DD')}
            editable={false}
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
          <CustomText style={styles.text}>Snack Start And End Time</CustomText>
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
            vStyle={{ width: screenWidth / 2 - 30 }}
            date={startTime}
            onPress={() => {
              startTimeClicked();
            }}
            text="Start Time*"
            iconSize={25}

          ></DateTextView>
          <DateTextView
            vStyle={{ width: screenWidth / 2 - 30 }}
            date={endTime}
            onPress={() => {
              endTimeClicked();
            }}
            text="End Time*"
            iconSize={25}
          ></DateTextView>
        </View>
        <View style={{ marginHorizontal: 18, marginTop: 15 }}>
          <CustomText style={styles.text}>Place where you take snack</CustomText>
        </View>

        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          data={place}
          labelField="label"
          valueField="value"
          placeholder="Select place"
          value={placevalue}
          onChange={(item) => {
            setPlaceValue(item.value);

          }}
          renderLeftIcon={() => (
            <CustomImage
              source={require('../../../../assets/user/place.png')}
              resizeMode="contain"
              style={{ width: 24, height: 18, alignSelf: "center", top: 2 }}
            />
          )}
        />

        <View style={{ marginHorizontal: 18, marginTop: 15 }}>
          <CustomText style={styles.text}>With Whom you take Lunch</CustomText>
        </View>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          data={lunchdata}
          labelField="label"
          valueField="value"
          placeholder="Select "
          value={lunchvalue}
          onChange={(item) => {
            setLunchValue(item.value);

          }}
          renderLeftIcon={() => (
            <CustomImage
              source={require('../../../../assets/user/people.png')}
              resizeMode="contain"
              style={{ width: 26, height: 20, alignSelf: "center", top: 2 }}
            />
          )}
        />

        <View style={{ marginHorizontal: 18, marginTop: 15 }}>
          <CustomText style={styles.text}>Select Activity during eating</CustomText>
        </View>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          data={activitydata}
          labelField="label"
          valueField="value"
          placeholder="Select Activity"
          value={activityvalue}
          onChange={(item) => {
            setActivityValue(item.value);

          }}
          renderLeftIcon={() => (
            <CustomImage
              source={require('../../../../assets/user/activity.png')}
              resizeMode="contain"
              style={{ width: 22, height: 20, alignSelf: "center", top: 2 }}
            />
          )}
        />

        <View style={{ marginHorizontal: 18, marginTop: 15 }}>
          <CustomText style={styles.text}>Select Mood while eating</CustomText>
        </View>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          data={mooddata}
          labelField="label"
          valueField="value"
          placeholder="Select Mood"
          value={moodvalue}
          onChange={(item) => {
            setMoodValue(item.value);

          }}
          renderLeftIcon={() => (
            <CustomImage
              source={require('../../../../assets/user/mood.png')}
              resizeMode="contain"
              style={{ width: 19, height: 19, alignSelf: "center" }}
            />
          )}
        />

        <View style={{ marginHorizontal: 18, marginTop: 15 }}>
          <CustomText style={styles.text}>Select Hunger Level</CustomText>
        </View>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}

          data={hungerdata}
          labelField="label"
          valueField="value"
          placeholder="Select"
          value={hungerValue}
          onChange={(item) => {
            setHungerValue(item.value);

          }}
          renderLeftIcon={() => (
            <CustomImage
              source={require('../../../../assets/user/hunger.png')}
              resizeMode="contain"
              style={{ width: 22, height: 12, alignSelf: 'center' }}
            />
          )}
        />

        <View style={{ marginHorizontal: 18, marginTop: 15 }}>
          <CustomText style={styles.text}>Amount</CustomText>
        </View>
        <View>
          <SimpleTextInput
            placeholder="Enter your snack amount"
            containerStyle={{ height: 50, width: "92%", marginLeft: 15 }}
            value={amount}
            keyboardType={'numeric'}
            //placeholderTextColor={grey}
            onChangeText={(text) => {
              setAmount(text);
            }}

          />
        </View>

        <View style={{ marginHorizontal: 18, marginTop: 5 }}>
          <CustomText style={styles.text}>Snack Food</CustomText>
        </View>
        <View>
          <SimpleTextInput
            placeholder="Enter your snack"
            containerStyle={{ height: 50, width: "92%", marginLeft: 15 }}
            value={food}
            //placeholderTextColor={grey}
            onChangeText={(text) => {
              setFood(text);
            }}

          />
        </View>

        <View style={{ marginHorizontal: 18, marginTop: 5 }}>
          <CustomText style={styles.text}>Calories</CustomText>
        </View>
        <View>
          <SimpleTextInput
            placeholder="Enter calories(Optional)"
            containerStyle={{ height: 50, width: "92%", marginLeft: 15 }}
            value={calories}
            //placeholderTextColor={grey}
            onChangeText={(text) => {
              setCalories(text);
            }}

          />
        </View>

        <View style={{ marginHorizontal: 18, marginTop: 5 }}>
          <CustomText style={styles.text}>Select Fullness after eating</CustomText>
        </View>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          data={fullnessdata}
          labelField="label"
          valueField="value"
          placeholder="Select Fullness after eating"
          value={fullnessValue}
          onChange={(item) => {
            setFullnessValue(item.value);

          }}
        />

        <View style={{ marginHorizontal: 18, marginTop: 15 }}>
          <CustomText style={styles.text}>Filled out just before or after eating</CustomText>
        </View>
        <View>
          <SimpleTextInput
            placeholder="Yes or No"
            containerStyle={{ height: 50, width: "92%", marginLeft: 15 }}
            value={filled}
            //placeholderTextColor={grey}
            onChangeText={(text) => {
              setFilled(text);
            }}

          />
        </View>

        <View style={{ marginBottom: "30%" }}></View>

      </ScrollView>



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

      <View style={{ bottom: 0, position: "absolute", width: "100%" }}>

        <CustomButton
          title="Add"
          onPress={() => addSnack()}
          //onPress={() => navigationRef.current?.navigate(appStrings.screens.tabNavigator.home)}
          buttonStyle={styles.buttonStyle}
        />
      </View>
      <Loader showHud={showProgress} />
    </SafeAreaView>
  );
};

export default AddSnack;

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
  text: {
    color: grey
  },
  dropdown: {
    height: 45,
    width: '92%',
    borderColor: grey_Border,
    borderWidth: 1,
    borderRadius: 10,
    marginLeft: 15,
    marginTop: 10,
    paddingHorizontal: 10,
    alignItems: "center",

  },
  placeholderStyle: {
    color: grey,
    left: 5
  },
  selectedTextStyle: {
    color: 'black',
  },

});

