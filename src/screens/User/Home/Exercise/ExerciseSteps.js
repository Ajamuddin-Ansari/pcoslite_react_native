import { SafeAreaView, StyleSheet, FlatList, View, TouchableOpacity} from 'react-native'
import React, { useState} from 'react'
import { black, grey, white } from '../../../../../lib/colors'
import CustomText from '../../../../components/CustomText';
import CustomImage from '../../../../components/CustomImage';
import { CheckBox } from 'react-native-elements';
import UserAxios from '../../../../components/WsHelper/UserAxios';
import appStrings from '../../../../../lib/appStrings';
import { useFocusEffect } from '@react-navigation/native';
import Loader from '../../../../components/Loader';
import Image_Url from '../../../../components/WsHelper/Image_Url';
import AsyncStorage from '../../../../components/AsyncStorage';
import AsyncStorageKeys from '../../../../../lib/AsyncStorageKeys';
import moment from 'moment';

const ExerciseSteps = ({ route }) => {
  const [stepsData, setStepsData] = useState([]);
  const [selectedItems, setSelectedItems] = useState({});
  const [showProgress, setShowProgress] = useState(false);
  
  
  const toggleCheckbox = (itemId) => {
    console.log(index,moment().date())
    if(moment().date()==index){
    setSelectedItems(prevState => {
      const newState = {
        ...prevState,
        [itemId]: !prevState[itemId]
      };
      console.log("selectedItems",stepsData);
      stepsData.map(item =>{
        if(item.status != '1' && item.id==itemId){
          item.status = item.id === itemId ? "1" : item.status;
          UpdateStepStatus(itemId);
        }
       
        }
        )
        
         return newState;
    });
  }
  };

  const exerciseId = route.params?.exercise_id;
  const dayId = route.params?.day_id;
  const index = route.params?.index;
  const month =  route.params?.month;
  const year =  route.params?.year;

  useFocusEffect(
    React.useCallback(() => {
      console.log(moment(`${year}-06-${index}`).format('YYYY-MM-DD'))
      ExerciseList();    
      return () => false;
    }, [])
  );

  const ExerciseList = async () => {
    const id = await AsyncStorage.getData(AsyncStorageKeys.patient_id);
    const patientid = JSON.parse(id) || [];
    const _date = moment(`${year}-${month}-${index}`).format('YYYY-MM-DD')
    setShowProgress(true);

    let inputParams = {};
    UserAxios.getResponse(
      `${appStrings.screens.api_names.step_list}${patientid}&day_id=${dayId}&date=${_date}`,
      inputParams,
      "get",
      (response, error) => {
        if (!error) {
          if (!response.error) {
            console.log("response", response);
            setStepsData(response.data)
            
           
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


  const UpdateStepStatus = async (itemId) => {
    const id = await AsyncStorage.getData(AsyncStorageKeys.patient_id);
    const patient_id = JSON.parse(id) || [];
   
 
     setShowProgress(true);
 
     let inputParams = {
      patient_id: patient_id,
      day_id : dayId,
      exercise_id :exerciseId,
      step_id : itemId

     };
     UserAxios.getResponse(
       `${appStrings.screens.api_names.update_status}`,
       inputParams,
       "post",
       (response, error) => {
         if (!error) {
           if (!response.error) {
             console.log("response///", response);
            
 
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


  const RenderExerciseStepItem = ({ item,index }) => {
  
    return (
      <View style={styles.listItem}>
        <TouchableOpacity activeOpacity={0.9}>

          <View>
            <CustomText style={{ alignSelf: "center", color: black, fontSize: 16 }}>Step {index + 1}</CustomText>
            <CustomText style={{ color: black, fontSize: 16, alignSelf: "center", fontWeight: "bold",marginTop:5 }}>{item.step}</CustomText>
            <View style={styles.imageContainer}>
              <CustomImage
                source={{ uri: `${Image_Url}${item.step_image}` }}
                resizeMode="contain"
                style={styles.image}
              />
            </View>

          </View>
          <CustomText style={{ fontWeight: "bold", alignSelf: "center", top: "5%" }}>{item.sec} {item.sec === null ? null : "Sec" }</CustomText>

          <View style={{ top: item.sec === null ? 10 : 30, width: "55%", alignSelf: "center" }}>
         
            <CheckBox
              title='Done'
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
      <View>
        {
          stepsData.length > 0 ?
            (
              <>

                <View>
                  <FlatList
                    data={stepsData}
                    renderItem={({ item, index }) => <RenderExerciseStepItem item={item} index={index} />}
                    keyExtractor={(item) => {item.day}}
                  />
                </View>
              </>
            ) :
            <>
              <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginTop: "70%" }}>
                <CustomText style={{ fontSize: 18, color: grey }}>No Data Found.</CustomText>

              </View>
            </>

        }
      </View>

      <Loader showHud={showProgress} />
    </SafeAreaView>
  )
}

export default ExerciseSteps

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white
  },
  imageContainer: {
    marginTop: '5%',
    alignSelf: 'center',

  },
  image: {
    width: 222,
    height: 206,

  },
  listItem: {
    padding: 10,
    shadowColor: black,
    shadowOffset: { width: 1, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.65,
    elevation: 6,
    backgroundColor: white,
    width: "94%",
    height: "50%",
    borderRadius: 15,
    flex: 1,
    alignSelf: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingBottom: "15%",
    paddingHorizontal: 20,
    marginTop: 20,
    bottom: 10
  },
  checkboxContainer: {
    backgroundColor: 'transparent',
    borderWidth: 0,

  },
})