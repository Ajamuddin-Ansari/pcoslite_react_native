import { SafeAreaView, StyleSheet, TextInput, View, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
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
import Loader from '../../../../components/Loader'
import { useFocusEffect } from '@react-navigation/native';

const UpdateWeight = ({ route }) => {
  const [currentWeight, setCurrentWeight] = useState("");
  const [goalWeight, setGoalWeight] = useState("");
  const [weightgain, setWeightGain] = useState("");
  const [weightloss, setWeightLoss] = useState("");
  const [note, setNote] = useState("");
  const [id, setId] = useState("");
  const [date, setDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showProgress, setShowProgress] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    var seldate = moment(currentDate).format("YYYY-MM-DD");
    setDatePickerVisible(Platform.OS === 'ios');
    setDate(seldate);
    setSelectedDate(selectedDate);

  };

  const userdata = async () => {
    try {
      const weightDetails = route.params?.item;

      setCurrentWeight(weightDetails.current_weight);
      setDate(weightDetails.date);
      setGoalWeight(weightDetails.goal_weight);
      setWeightGain(weightDetails.weight_gain);
      setWeightLoss(weightDetails.weight_loss);
      setNote(weightDetails.note);
      setId(weightDetails.id)


    } catch (error) {
      console.error("Error retrieving user data:", error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      userdata();


      return () => false;
    }, [])
  );


  const updateweightdetails = async () => {

    try {
     
      const inputParams = {
        current_weight: currentWeight,
        goal_weight: goalWeight,
        weight_loss: weightloss,
        weight_gain: weightgain,
        note: note,
        date:date

      };
      UserAxios.getResponse(
        `${appStrings.screens.api_names.update_weight}/${id}`,
        inputParams,
        "post",
        (response, error) => {

          if (!error) {
            if (!response.error) {
              console.log("resssss", response);
              Toast.show(response.message)
              navigationRef.current?.navigate(appStrings.screens.appStrings.weightScreen)
            }
          }
          else {

            if (error.name != undefined && error.name != null)
              console.log("........", error.name);
          }
        }
      )
    } catch (error) {
      console.error('Error editing weight:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>

        <View style={styles.view}>
          <ScrollView>
            <View style={{ left: 15, marginTop: 15, flexDirection: 'row', alignItems: 'center', borderColor: grey_Border, borderWidth: 1, padding: 5, borderRadius: 10, width: "92%", height: 50 }}>
              <TextInput
                value={date} // Format the date for display
                editable={false}
                placeholderTextColor={grey}
                placeholder='Select Date*'
                placeholderStyle={{ color: grey_Border }}
                style={{ flex: 1, color: black, paddingLeft: 10, fontSize: 16 }}
              />

              {/* Calendar Icon */}
              <TouchableOpacity onPress={() => {
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
                onChangeText={(text) => {
                  setCurrentWeight(text);
                }}
                keyboardType={"numeric"}

              />

            </View>

            <View style={{ marginTop: 15 }}>
              <SimpleTextInput
                placeholder="Goal Weight* (Kg)"
                containerStyle={{ height: 50, width: "92%", marginLeft: 15 }}
                value={goalWeight}
                editable={false}
                onChangeText={(text) => {
                  setGoalWeight(text);
                }}
                keyboardType={"numeric"}

              />

            </View>

            <View style={{ marginTop: 15 }}>
              <SimpleTextInput
                placeholder="Weight Gained* (Kg)"
                containerStyle={{ height: 50, width: "92%", marginLeft: 15 }}
                value={weightgain}
                editable={false}
                onChangeText={(text) => {
                  setWeightGain(text);
                }}
                keyboardType={"numeric"}

              />

            </View>

            <View style={{ marginTop: 15 }}>
              <SimpleTextInput
                placeholder="Weight loss* (Kg)"
                containerStyle={{ height: 50, width: "92%", marginLeft: 15 }}
                value={weightloss}
                keyboardType={"numeric"}
                editable={false}
                onChangeText={(text) => {
                  setWeightLoss(text);
                }}

              />

            </View>

            <View style={{ marginTop: 15 }}>
              <SimpleTextInput
                placeholder="Note"
                containerStyle={{ height: 100, width: "92%", marginLeft: 15 }}
                inputStyle={{ marginTop: -30 }}
                value={note}
                onChangeText={(text) => {
                  setNote(text);
                }}

              />

            </View>

          </ScrollView>
        </View>

      </View>
      <View style={{ bottom: 0, left: 0, right: 0, position: "absolute" }}>
        <CustomButton
          title="Update"
          onPress={() => updateweightdetails()}
          buttonStyle={styles.buttonStyle}
        />
      </View>
      <Loader showHud={showProgress} />
    </SafeAreaView>

  )
}

export default UpdateWeight

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
    height: "87%",
    borderRadius: 30,
    alignSelf: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingBottom: 15,
    marginTop: '4%'
  }
})