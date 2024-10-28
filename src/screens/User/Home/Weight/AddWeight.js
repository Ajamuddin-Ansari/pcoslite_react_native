import { SafeAreaView, StyleSheet, TextInput, View, ScrollView, TouchableOpacity, LogBox } from 'react-native'
import React, { useState, useEffect } from 'react'
import { black, dark_pink, grey, grey_Border, white } from '../../../../../lib/colors'
import CustomImage from '../../../../components/CustomImage'
import CustomButton from '../../../../components/CustomButton'
import DateTimePicker from '@react-native-community/datetimepicker';
import SimpleTextInput from '../../../../components/SimpleTextInput'
import moment from 'moment/moment'
import UserAxios from '../../../../components/WsHelper/UserAxios'
import appStrings from '../../../../../lib/appStrings'
import Toast from 'react-native-simple-toast';
import { navigationRef } from '../../../../../lib/RootNavigation'
import AsyncStorage from '../../../../components/AsyncStorage'
import AsyncStorageKeys from '../../../../../lib/AsyncStorageKeys'
import Loader from '../../../../components/Loader'
import CustomText from '../../../../components/CustomText'


const AddWeight = ({ route }) => {
  const [currentWeight, setCurrentWeight] = useState("");
  const [goalWeight, setGoalWeight] = useState('');
  const [weightgain, setWeightGain] = useState("Weight Gain");
  const [weightloss, setWeightLoss] = useState("Weight Loss");
  const [note, setNote] = useState("");
  const [date, setDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showProgress, setShowProgress] = useState(false);
  const [currentDate, setCurrentDate] = useState('')

  const Goal = route.params?.goalWeight || 0
  console.log("Goal", Goal);

  useEffect(() => {
    const date = new Date();
    const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

    setCurrentDate(formattedDate);
  }, []);

  console.log("currentDate", currentDate);

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    var seldate = moment(currentDate).format("YYYY-MM-DD");
    setDatePickerVisible(Platform.OS === 'ios');
    setDate(seldate);
    setSelectedDate(selectedDate);

  };

  useEffect(() => {

    if (currentWeight.toString().length >= 2) {
      calculateWeightdetails();
    }

  }, [currentWeight]);

  const calculateWeightdetails = async () => {
    const id = await AsyncStorage.getData(AsyncStorageKeys.patient_id);
    const patientid = JSON.parse(id) || [];
    //console.log("patient_id",patientid);
    var CampDate = moment(date).format("YYYY-MM-DD")

    setShowProgress(true)
    const inputParams = {
      patient_id: patientid,
      current_weight: currentWeight,
      date: CampDate

    };
    UserAxios.getResponse(
      `${appStrings.screens.api_names.weight_metrics}`,
      inputParams,
      "post",
      (response, error) => {
        console.log("response..........", response);

        if (!error) {
          if (!response.error) {

            if (response.status === 200) {

              Toast.show(response.message)
              console.log("RRRR", response);
              setWeightGain(response.data.weight_gain)
              setWeightLoss(response.data.weight_loss)

            }
            // if (response.status === 401) {
            //   const errorMessage =
            //     (response.message.date && response.message.date[0]) ||
            //     (response.message.current_weight && response.message.current_weight[0]) ||
            //     (response.message.goal_weight && response.message.goal_weight[0])

            //     'An unknown error occurred';
            //   Toast.show(errorMessage);
            // }

          }
          else {

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

  const addweightdetails = async () => {

    const id = await AsyncStorage.getData(AsyncStorageKeys.patient_id);
    const patient_id = JSON.parse(id) || [];
    console.log("patient_id", patient_id);

    var CampDate = moment(date).format("YYYY-MM-DD")

    if (!currentWeight) {
      Toast.show('Enter current weight');
      return;
    }

    if (!goalWeight && !Goal) {
      Toast.show('Enter goal weight');
      return;
    }
    setShowProgress(true)
    const inputParams = {
      patient_id: patient_id,
      current_weight: currentWeight,
      goal_weight: goalWeight || Goal,
      weight_loss: weightloss,
      weight_gain: weightgain,
      date: CampDate,
      note: note

    };
    UserAxios.getResponse(
      `${appStrings.screens.api_names.add_weight}`,
      inputParams,
      "post",
      (response, error) => {

        if (!error) {
          if (!response.error) {

            if (response.status === 200) {

              Toast.show(response.message)
              navigationRef.current?.navigate(appStrings.screens.appStrings.weightScreen)
              // const weight = response.data.current_weight;
              // console.log("weight");
              // AsyncStorage.saveData(AsyncStorageKeys.currentWeight, weight);
              // AsyncStorage.saveData(AsyncStorageKeys.goalWeight, response.data.goal_weight);

            } else if (response.status === 401) {
              const errorMessage =
                (response.message.date && response.message.date[0]) ||
                (response.message.current_weight && response.message.current_weight[0]) ||
                (response.message.goal_weight && response.message.goal_weight[0]) ||

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

  return (
    <SafeAreaView style={styles.container}>
      <View>
        {/* <View style={{ marginTop: '3%', alignSelf: 'center', width: 100, height: 100, borderRadius: 55, backgroundColor: grey_card }}>
          <CustomImage
            source={require('../../../../../assets/patient.png')}
            resizeMode="contain"
            style={{ width: 100, height: 100, alignSelf: 'center', }}
          />
        </View>
        <View style={{ alignSelf: "center", top: 5 }}>
          <CustomText style={{ alignSelf: "center", fontSize: 19, fontweight: "500" }}>Patient1355</CustomText>

        </View> */}
        <View style={styles.view}>
          <ScrollView>
            <View style={{ left: 15, marginTop: 15, flexDirection: 'row', alignItems: 'center', borderColor: grey_Border, borderWidth: 1, padding: 5, borderRadius: 10, width: "92%", height: 50 }}>
              <TextInput
                value={moment(date).format("YYYY-MM-DD")} // Format the date for display
                editable={false}
                placeholderTextColor={grey}
                //placeholder={date}
                placeholderStyle={{ color: grey_Border }}
                style={{ flex: 1, color: black, paddingLeft: 10, fontSize: 16 }}
              />

              {/* Calendar Icon */}
              <TouchableOpacity activeOpacity={0.9}
                onPress={() => {
                  setDatePickerVisible(false)

                }}>
                <View style={{ right: 5 }}>
                  <CustomImage
                    source={require('../../../../../assets/date.png')}
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

            <View style={{ marginTop: 20 }}>
              <SimpleTextInput
                placeholder="Current weight* (Kg)"
                containerStyle={{ height: 50, width: "92%", marginLeft: 15 }}
                value={currentWeight}
                //placeholderTextColor={grey}
                onChangeText={(text) => {
                  setCurrentWeight(text);
                }}
                keyboardType={"numeric"}

              />
              {/* <FloatingInput
                label="Current weight"
                value={currentWeight}
                onChangeText={(text) => {
                  setCurrentWeight(text);
                }}
              /> */}
            </View>

            <View style={{ marginTop: 15 }}>
              <SimpleTextInput
                placeholder="Goal Weight* (Kg)"
                containerStyle={{ height: 50, width: "92%", marginLeft: 15 }}
                value={goalWeight || Goal}
                disabled={Goal ? true : false}
                placeholderTextColor={grey}
                onChangeText={(text) => {
                  setGoalWeight(text);
                }}
                editable={Goal ? false : true}

                keyboardType={"numeric"}

              />
              {/* <FloatingInput
                label="Goal Weight"
                value={goalWeight}
                onChangeText={(text) => {
                  setGoalWeight(text);
                }}
              /> */}
            </View>


            <View style={{ marginTop: 25, height: 50, width: "92%", marginLeft: 15, borderRadius: 10, borderColor: grey_Border, borderWidth: 1 }}>
              <CustomText style={{ fontSize: 15, color: grey, margin: 12, left: 2 }}>{weightgain}</CustomText>
              {/* <SimpleTextInput
                placeholder="Weight Gained (Kg)"
                containerStyle={{ height: 50, width: "92%", marginLeft: 15 }}
                value={weightgain}
                editable={false}
                //placeholderTextColor={grey}
                onChangeText={(text) => {
                  setWeightGain(text);
                }}
                keyboardType={"numeric"}

              /> */}

            </View>

            <View style={{ marginTop: 35, height: 50, width: "92%", marginLeft: 15, borderRadius: 10, borderColor: grey_Border, borderWidth: 1 }}>
              <CustomText style={{ fontSize: 15, color: grey, margin: 12, left: 2 }}>{weightloss}</CustomText>
              {/* <SimpleTextInput
                placeholder="Weight loss (Kg)"
                editable={false}
                containerStyle={{ height: 50, width: "92%", marginLeft: 15 }}
                value={weightloss}
                keyboardType={"numeric"}
                //placeholderTextColor={grey}
                onChangeText={(text) => {
                  setWeightLoss(text);
                }}

              /> */}
              {/* <FloatingInput
                label="Weight loss"
                value={weightloss}
                onChangeText={(text) => {
                  setWeightLoss(text);
                }}
              /> */}
            </View>

            <View style={{ marginTop: 25 }}>
              <SimpleTextInput
                placeholder="Note"
                containerStyle={{ height: 100, width: "92%", marginLeft: 15 }}
                inputStyle={{ marginTop: -30 }}
                value={note}
                //placeholderTextColor={grey}
                onChangeText={(text) => {
                  setNote(text);
                }}

              />
              {/* <FloatingInput
                label="Note"
                value={note}
                onChangeText={(text) => {
                  setNote(text);
                }}
                style={{
                  height: 80,
                  borderWidth: 1,
                  borderRadius: 13,
                  fontSize: 20,         
                  paddingLeft: 15,
                  borderColor: grey_Border,
                }}
              /> */}
            </View>

          </ScrollView>
        </View>

      </View>
      <View style={{ bottom: 0, left: 0, right: 0, position: "absolute" }}>
        <CustomButton
          title="Add"
          onPress={() => addweightdetails()}
          buttonStyle={styles.buttonStyle}
        />
      </View>
      <Loader showHud={showProgress} />
    </SafeAreaView>

  )
}

export default AddWeight

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
    //marginBottom: 20
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
    height: "87%",
    // flex: 1,
    borderRadius: 30,
    alignSelf: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingBottom: 15,
    marginTop: '4%'
  }
})