import { StyleSheet, View, SafeAreaView, FlatList, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { black, grey, white } from '../../../../../lib/colors'
import CustomText from '../../../../components/CustomText';
import CustomImage from '../../../../components/CustomImage';
import { navigationRef } from '../../../../../lib/RootNavigation';
import appStrings from '../../../../../lib/appStrings';
import { useFocusEffect } from '@react-navigation/native';
import UserAxios from '../../../../components/WsHelper/UserAxios';
import Loader from '../../../../components/Loader';
import AsyncStorage from '../../../../components/AsyncStorage';
import AsyncStorageKeys from '../../../../../lib/AsyncStorageKeys';
import Toast from 'react-native-simple-toast';

const WeightTracker = () => {
  const [weightList, setWeightList] = useState([]);
  const [showProgress, setShowProgress] = useState(false);
  const [currentDate, setCurrentDate] = useState('');
  const [goalWeight, setGoalWeight] = useState(0);


  useEffect(() => {
    const date = new Date();
    const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

    setCurrentDate(formattedDate);
  }, []);



  useFocusEffect(
    React.useCallback(() => {
      BodyDetailList();

      return () => false;
    }, [])
  );

  const BodyDetailList = async () => {

    const id = await AsyncStorage.getData(AsyncStorageKeys.patient_id);
    const patient_id = JSON.parse(id) || [];
    setShowProgress(true);
    let inputParams = {};
    UserAxios.getResponse(
      `${appStrings.screens.api_names.weight_list}${patient_id}`,
      inputParams,
      "get",
      (response, error) => {
        if (!error) {
          if (!response.error) {
            if (response.status === 200) {
              setWeightList(response.weightManagement)
              setGoalWeight(response.weightManagement[0].goal_weight)
              console.log("lllllllllllll", response.weightManagement[0].goal_weight);
            } else if (response.status === 404) {
              Toast.show(response.message)

            }

          } else {
            console.log("Error", response.Error);
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

  function RenderWeightDataList({ item }) {

    return (

      <TouchableOpacity style={styles.listItem}
        activeOpacity={0.9}>
        <View style={{flex:1,flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
          <View style={{flex:0.8}}>
          <View style={{ flexDirection: "row" }}>
            <CustomText style={{ fontSize: 16, color: black, fontWeight: '700' }}>{item.date}</CustomText>
            {
              item.date === currentDate ? (
                <TouchableOpacity
                  onPress={() => navigationRef.current?.navigate(appStrings.screens.appStrings.updateweight, { "item": item })}>
                  <CustomImage
                    source={require('../../../../../assets/user/edit.png')}
                    resizeMode="contain"
                    style={{ width: 20, height: 20, alignSelf: 'center', marginLeft: 20 }}
                  />
                </TouchableOpacity>
              ) : null
            }

          </View>

          <View>
            <CustomText style={{ color: "#B6B6B6", fontSize: 13, width: 200 }}>Here is your Weight report for For this date.</CustomText>
          </View>

          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <CustomText style={{ fontSize: 14, color: '#646464' }}>Current{`\n`}weight</CustomText>
            <CustomText style={{ alignSelf: "center", fontSize: 14, fontWeight: "bold", left: 5 }}>{item.current_weight} Kg</CustomText>
            <View style={{ marginLeft: 25, flexDirection: "row" }}>
              <CustomText style={{ fontSize: 14, color: '#646464' }}>Goal{`\n`}weight</CustomText>
              <CustomText style={{ alignSelf: "center", fontSize: 14, left: 15, fontWeight: "bold" }}>{item.goal_weight} Kg</CustomText>
            </View>

          </View>

          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <CustomText style={{ fontSize: 14, color: '#646464' }}>Weight{`\n`}loss</CustomText>
            <CustomText style={{ alignSelf: "center", fontSize: 14, fontWeight: "bold", left: 8 }}>{item.weight_loss} Kg</CustomText>
            <View style={{ marginLeft: 33, flexDirection: "row" }}>
              <CustomText style={{ fontSize: 14, color: '#646464' }}>Gained{`\n`}weight</CustomText>
              <CustomText style={{ alignSelf: "center", fontSize: 14, left: 10, fontWeight: "bold" }}>{item.weight_gain} Kg</CustomText>
            </View>

          </View>

          <View style={{ marginTop: 20 }}>
            <CustomText>Note: {item.note}</CustomText>
          </View>
</View>
          

          <View style={{flex:0.2}}>
            <CustomImage
              source={require('../../../../../assets/user/bodytrack.png')}
              resizeMode="contain"
              style={{ width: 42, height: 152 }}
            />

          </View>

        </View>
      </TouchableOpacity>

    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {
        weightList.length > 0 ?
          <>
            <FlatList                
              data={weightList.reverse()}
              renderItem={RenderWeightDataList}
              keyExtractor={(item) => item.id}
              contentContainerStyle={{ paddingBottom: 100 }}
            />
          </> :
          <>
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
              <CustomText style={{ fontSize: 16, color: grey }}>No data Found, Please add weight details.</CustomText>

            </View>
          </>

      }

      <View style={{ bottom: 0, position: "absolute", alignSelf: "center" }}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigationRef.current?.navigate(appStrings.screens.appStrings.addWeight, { "goalWeight": goalWeight })}
          style={{ alignSelf: 'center' }}>
          <CustomImage
            source={require('../../../../../assets/user/addweight.png')}
            resizeMode="contain"
            style={{ width: 60, height: 75 }}
          />

        </TouchableOpacity>
        <CustomText style={{ fontSize: 16, fontWeight: "bold" }}>Add Weight</CustomText>
      </View>
      <Loader showHud={showProgress} />
    </SafeAreaView>
  )
}

export default WeightTracker

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white
  },
  listItem: {

    padding: 10,
    shadowColor: black,
    shadowOffset: { width: 1, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.65,
    elevation: 6,
    backgroundColor: white,
    width: "96%",
    height: 250,
    borderRadius: 15,
    flex: 1,
    alignSelf: "center",
    paddingLeft: 15,
    //justifyContent: "center",
    flexDirection: "row",
    paddingBottom: 55,
    marginTop: 20
  },

});