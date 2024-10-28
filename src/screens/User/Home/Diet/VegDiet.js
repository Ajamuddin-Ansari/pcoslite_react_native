import { StyleSheet, SafeAreaView, View, TouchableOpacity, ScrollView, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import { black, grey, white } from '../../../../../lib/colors'
import CustomText from '../../../../components/CustomText'
import CustomImage from '../../../../components/CustomImage'
import { navigationRef } from '../../../../../lib/RootNavigation'
import appStrings from '../../../../../lib/appStrings'
import { CheckBox } from 'react-native-elements';
import UserAxios from '../../../../components/WsHelper/UserAxios'
import { useFocusEffect } from '@react-navigation/native';
import Loader from '../../../../components/Loader'
import Image_Url from '../../../../components/WsHelper/Image_Url'
import AsyncStorage from '../../../../components/AsyncStorage'
import AsyncStorageKeys from '../../../../../lib/AsyncStorageKeys'
import moment from 'moment'

const VegDiet = ({ route }) => {
  const [dietdata, setDietData] = useState([]);
  const [selectedItems, setSelectedItems] = useState({});
  const [showProgress, setShowProgress] = useState(false);

  const day_id = route.params?.item;
  const type = route.params?.type;
  const index = route.params?.index;
  const month = route.params?.month;
  const year = route.params?.year;
  const toggleCheckbox = (itemId) => {
    if(moment().date() === index)
    {
    setSelectedItems(prevState => {
      const newState = {
        ...prevState,
        [itemId]: !prevState[itemId]
      };
      console.log("selectedItems", itemId);
      dietdata.map(item => {
        console.log("---->", item)
        if (item.status != '1' && itemId == item.id) {
          item.status = item.id === itemId ? "1" : item.status;
          DietStatusApi(itemId);
        }
      }
      )

     

      return newState;
    });
   }
  };

  useFocusEffect(
    React.useCallback(() => {
      VegDietPlanApi();
      return () => false;
    }, [])
  );


  const VegDietPlanApi = async () => {
    const id = await AsyncStorage.getData(AsyncStorageKeys.patient_id);
    const patientid = JSON.parse(id) || [];
    const _date = moment(`${year}-${month}-${index}`).format('YYYY-MM-DD')
    setShowProgress(true);

    let inputParams = {

    };
    UserAxios.getResponse(
      `${appStrings.screens.api_names.veg_dietPlan}${patientid}&type=${type}&day_id=${day_id}&date=${_date}`,
      inputParams,
      "get",
      (response, error) => {
        if (!error) {
          if (!response.error) {         
            setDietData(response.data)

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

  const DietStatusApi = async (itemId) => {

    const id = await AsyncStorage.getData(AsyncStorageKeys.patient_id);
    const patient_id = JSON.parse(id) || [];
   
    setShowProgress(true);

    let inputParams = {
      patient_id: patient_id,
      diet_id: itemId,
      day_id: day_id,
      type: type

    };
    UserAxios.getResponse(
      `${appStrings.screens.api_names.diet_status}`,
      inputParams,
      "post",
      (response, error) => {
        if (!error) {
          if (!response.error) {
           console.log("response",response);
            
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

  const removeHtmlTags = (htmlString) => {
    const withoutLiTags = htmlString.replace(/<li>/g, '\n\u25CF ');
  // Remove other HTML tags
  return withoutLiTags.replace(/<[^>]+>/g, '');
  };

  const renderItem = ({ item }) => {
   // const isChecked = selectedItems[item.id] || false;

    return (
      <View style={styles.listItem}>

      
        <TouchableOpacity activeOpacity={0.7}
          onPress={() => navigationRef.current?.navigate(appStrings.screens.appStrings.vegDiet)}
        >
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <View>
              <CustomText style={styles.dayTitle}>{item.meal_time.name}</CustomText>
              <CustomText style={{ color: grey, marginTop: 5 }}>{item.meal_time.time}</CustomText>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.textContainer}>
              <View style={{ flexDirection: "row" }}>
                <View style={{ width: "100%" }}>
                  <CustomText style={styles.description}>{removeHtmlTags(item.meal)}</CustomText>
                 
                </View>
                <View style={styles.imageContainer}>
                  <CustomImage
                    source={{ uri: `${Image_Url}${item.image}` }}
                    resizeMode="contain"
                    style={styles.image}
                  />
                </View>
              </View>

            

            </View>
          </View>
          <View style={{ top: 20, width: "60%", right: 10 }}>

            <CheckBox
              title='Select Diet'
              checked={item.status === "1"}
              onPress={() => toggleCheckbox(item.id)}             
              style={styles.checkboxContainer}

            />
          </View>

        </TouchableOpacity>

      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>

      <FlatList
        data={dietdata}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <Loader showHud={showProgress} />
    </SafeAreaView>
  )
}

export default VegDiet

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white
  },
  checkboxContainer: {
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  row: {
    flexDirection: 'row',
    justifyContent: "space-between"
  },

  imageContainer: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    top: 30
  },

  image: {
    width: 120,
    height: 120,
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
    height: "40%",
    borderRadius: 15,
    flex: 1,
    alignSelf: "center",
    flexDirection: "row",
    paddingBottom: "10%",
    paddingHorizontal: 15,
    marginTop: 20,
    bottom: 10
  },
  textContainer: {
    width: '80%',
  },
  dayTitle: {
    fontSize: 24,
    fontWeight: '700',
  },
  title1: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 25

  },
  description: {
    color: grey,
    width:"95%",
    marginTop: 5,
    fontSize:16
  },
  nutrient: {
    color: grey,
    marginTop: 10,
  },

})