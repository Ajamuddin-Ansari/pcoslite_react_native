import { StyleSheet, View, SafeAreaView, FlatList, TouchableOpacity, ScrollView,Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { black, green1, grey, grey123, grey_border, orange, white } from '../../../../../lib/colors'
import CustomText from '../../../../components/CustomText'
import { navigationRef } from '../../../../../lib/RootNavigation'
import appStrings from '../../../../../lib/appStrings'
import AsyncStorage from '../../../../components/AsyncStorage'
import AsyncStorageKeys from '../../../../../lib/AsyncStorageKeys'
import UserAxios from '../../../../components/WsHelper/UserAxios'
import { useFocusEffect } from '@react-navigation/native';
import Loader from '../../../../components/Loader'
import { Icon } from 'react-native-elements'
import moment from 'moment'
import { Dropdown } from 'react-native-element-dropdown'

// const data = [
//   {
//     patient_id:"patient_id",
//     day: "Day 1",
//     exercise: 'Supercharged Warmup',
//     value:1,
//     description: [
//       {
//         id:1,
//         step: "Step 1",
//         step_name: 'Pacer Steps',
//         time: '10 Sec',
//         image: require('../../../../../assets/user/exercise/warmup1.png'),
//         status:"if 0 = uncheck 1= check"

//       },
//       {
//         id:2,
//         step: "Step 2",
//         step_name: 'Jumping Jacks',
//         time: '40 Sec',
//         image: require('../../../../../assets/user/exercise/E2.png'),

//       },
//       {
//         id:3,
//         step: "Step 3",
//         step_name: 'Pacer Steps',
//         time: '10 Sec',
//         image: require('../../../../../assets/user/exercise/warmup1.png'),

//       },
//       {
//         id:4,
//         step: "Step 4",
//         step_name: 'Climbers',
//         time: '10 Sec',
//         image: require('../../../../../assets/user/exercise/warmup2.png'),

//       },
//       {
//         id:5,
//         step: "Step 5",
//         step_name: 'High Knees',
//         time: '40 Sec',
//         image: require('../../../../../assets/user/exercise/warmup3.png'),

//       },
//       {
//         id:6,
//         step: "Step 6",
//         step_name: 'Climbers',
//         time: '10 Sec',
//         image: require('../../../../../assets/user/exercise/warmup2.png'),

//       },
//       {
//         id:7,
//         step: "Step 7",
//         step_name: 'Pacer Steps',
//         time: '10 Sec',
//         image: require('../../../../../assets/user/exercise/warmup1.png'),

//       },
//       {
//         id:8,
//         step: "Step 8",
//         step_name: 'Jumping Jacks',
//         time: '40 Sec',
//         image: require('../../../../../assets/user/exercise/E2.png'),

//       },
//       {
//         id:9,
//         step: "Step 9",
//         step_name: 'Pacer Steps',
//         time: '10 Sec',
//         image: require('../../../../../assets/user/exercise/warmup1.png'),

//       },
//     ]
//   },
//   {
//     patient_id:"patient_id",
//     day: "Day 2",
//     exercise: 'Full Body Workout',

//     value:2,
//     description: [
//       {
//         id:10,
//         step: "Step 1",
//         step_name: 'High Knees',
//         time: '20 Sec',
//         image: require('../../../../../assets/user/exercise/warmup3.png'),
//       },
//       {
//         id:11,
//         step: "Step 2",
//         step_name: 'Climber Taps',
//         time: '20 Sec',
//         image: require('../../../../../assets/user/exercise/body1.png'),

//       },
//       {
//         id:12,
//         step: "Step 3",
//         step_name: 'High Knees',
//         time: '20 Sec',
//         image: require('../../../../../assets/user/exercise/warmup3.png'),

//       },
//       {
//         id:13,
//         step: "Step 4",
//         step_name: 'Lunge Step-ups',
//         time: '10 Sec',
//         image: require('../../../../../assets/user/exercise/body2.png'),

//       },
//       {
//         id:14,
//         step: "Step 5",
//         step_name: 'Shoulder Taps',
//         time: '20 Sec',
//         image: require('../../../../../assets/user/exercise/body4.png'),

//       },
//       {
//         id:15,
//         step: "Step 6",
//         step_name: 'Lunge Step-ups',
//         time: '10 Sec',
//         image: require('../../../../../assets/user/exercise/body2.png'),

//       },
//       {
//         id:16,
//         step: "Step 7",
//         step_name: 'Raised leg plank hold',
//         time: '20 count',
//         image: require('../../../../../assets/user/exercise/body3.png'),

//       },


//     ]
//   },
//   {
//     patient_id:"patient_id",
//     day: "Day 3",
//     exercise: 'Butterfly Exercise',
//     value:3,

//     description: [
//       {
//         id:17,
//         step: "Step 1",
//         step_name: 'Jumping Jacks',
//         time: '20 Sec',
//         image: require('../../../../../assets/user/exercise/E2.png'),


//       },
//       {
//         id:18,
//         step: "Step 2",
//         step_name: 'Wide twists',
//         time: '10 Sec',
//         image: require('../../../../../assets/user/exercise/arm1.png'),

//       },
//       {
//         id:19,
//         step: "Step 3",
//         step_name: 'Jumping Jacks',
//         time: '20 Sec',
//         image: require('../../../../../assets/user/exercise/E2.png'),

//       },
//       {
//         id:20,
//         step: "Step 4",
//         step_name: 'Wide arm circles',
//         time: '20 Sec',
//         image: require('../../../../../assets/user/exercise/arm2.png'),

//       },
//       {
//         id:21,
//         step: "Step 5",
//         step_name: 'Jumping Jacks',
//         time: '20 Sec',
//         image: require('../../../../../assets/user/exercise/E2.png'),

//       },
//       {
//         id:22,
//         step: "Step 6",
//         step_name: 'Wide arm circles',
//         time: '20 Sec',
//         image: require('../../../../../assets/user/exercise/arm2.png'),
//       },

//     ]
//   },
//   {
//     patient_id:"patient_id",
//     day: "Day 4",
//     exercise: 'Legs Basic Workout',
//     value:4,

//     description: [
//       {
//         id:23,
//         step: "Step 1",
//         step_name: 'March Steps',
//         time: '20 Sec',
//         image: require('../../../../../assets/user/exercise/leg1.png'),

//       },
//       {
//         id:24,
//         step: "Step 2",
//         step_name: 'Step Jacks',
//         time: '10 Sec',
//         image: require('../../../../../assets/user/exercise/leg2.png'),

//       },
//       {
//         id:25,
//         exercise: "Step 3",
//         step_name: 'March Steps',
//         time: '20 Sec',
//         image: require('../../../../../assets/user/exercise/leg1.png'),

//       },
//       {
//         id:26,
//         step: "Step 4",
//         step_name: 'Calf Raises',
//         time: '20 Sec',
//         image: require('../../../../../assets/user/exercise/leg3.png'),

//       },
//       {
//         id:27,
//         step: "Step 5",
//         step_name: 'Step Jacks',
//         time: '10 Sec',
//         image: require('../../../../../assets/user/exercise/leg2.png'),
//       },
//       {
//         id:28,
//         step: "Step 6",
//         step_name: 'Calf Raises',
//         time: '20 Sec',
//         image: require('../../../../../assets/user/exercise/leg3.png'),

//       },
//       {
//         id:29,
//         step: "Step 7",
//         step_name: 'Step Jacks',
//         time: '10 Sec',
//         image: require('../../../../../assets/user/exercise/leg2.png'),
//       },

//     ]
//   },
//   {
//     patient_id:"patient_id",
//     day: "Day 5",
//     exercise: 'Chair Based Legs Stretching',
//     value:5,

//     description: [
//       {
//         id:30,
//         step: "Step 1",
//         step_name: '10 Barre Assembles',
//         time: '5 sets | 30 sec rest',
//         image: require('../../../../../assets/user/exercise/chair1.png'),

//       },
//       {
//         id:31,
//         step: "Step 2",
//         step_name: '10 Thigh super burner',
//         time: '5 sets | 30 sec rest',
//         image: require('../../../../../assets/user/exercise/chair2.png'),

//       },
//       {
//         id:32,
//         step: "Step 3",
//         step_name: '10 Four-part arabesque lunges',
//         time: '5 sets | 30 sec rest',
//         image: require('../../../../../assets/user/exercise/chair3.png'),

//       },
//       {
//         id:33,
//         step: "Step 4",
//         step_name: '10 Four-part arabesque lunges',
//         time: '5 sets | 30 sec rest',
//         image: require('../../../../../assets/user/exercise/chair4.png'),

//       },
//       {
//         id:34,
//         step: "Step 5",
//         step_name: '20 Arabesque Pulses',
//         time: '5 sets | 30 sec rest',
//         image: require('../../../../../assets/user/exercise/chair5.png'),

//       },

//     ]
//   },
//   {
//     patient_id:"patient_id",
//     day: "Day 6",
//     exercise: 'Ladybug',
//     value:6,

//     description: [
//       {
//         id:35,
//         step: "Step 1",
//         step_name: 'Pacer Steps',
//         //time: '10 Sec',
//         image: require('../../../../../assets/user/exercise/ladybug1.png'),

//       },
//       {
//         id:36,
//         step: "Step 2",
//         step_name: 'Pacer Steps',
//         //time: '10 Sec',
//         image: require('../../../../../assets/user/exercise/ladybug2.png'),

//       },
//       {
//         id:37,
//         step: "Step 3",
//         step_name: 'Pacer Steps',
//         //time: '10 Sec',
//         image: require('../../../../../assets/user/exercise/ladybug3.png'),

//       },
//       {
//         id:38,
//         step: "Step 4",
//         step_name: 'Bridge Pose',
//         //time: '10 Sec',
//         image: require('../../../../../assets/user/exercise/ladybug4.png'),

//       },
//       {
//         id:39,
//         step: "Step 5",
//         step_name: 'Pacer Steps',
//         //time: '10 Sec',
//         image: require('../../../../../assets/user/exercise/ladybug5.png'),

//       },
//       {
//         id:40,
//         step: "Step 6",
//         step_name: 'Pacer Steps',
//         //time: '10 Sec',
//         image: require('../../../../../assets/user/exercise/ladybug6.png'),

//       },

//     ]
//   },
//   {
//     patient_id:"patient_id",
//     day: "Day 7",
//     exercise: 'Intense Warmup',
//     value:7,

//     description: [
//       {
//         id:41,
//         step: "Step 1",
//         step_name: 'Pacer Steps',
//         time: '10 Sec',
//         image: require('../../../../../assets/user/exercise/E2.png'),

//       },
//       {
//         id:42,
//         step: "Step 2",
//         step_name: 'Pacer Steps',
//         time: '10 Sec',
//         image: require('../../../../../assets/user/tea.png'),

//       },
//       {
//         id:43,
//         step: "Step 3",
//         step_name: 'Pacer Steps',
//         time: '10 Sec',
//         image: require('../../../../../assets/user/tea.png'),

//       },
//       {
//         id:44,
//         step: "Step 4",
//         step_name: 'Pacer Steps',
//         time: '10 Sec',
//         image: require('../../../../../assets/user/tea.png'),

//       },
//       {
//         id:45,
//         step: "Step 5",
//         step_name: 'Pacer Steps',
//         time: '10 Sec',
//         image: require('../../../../../assets/user/tea.png'),

//       },
//       {
//         id:46,
//         step: "Step 6",
//         step_name: 'Pacer Steps',
//         time: '10 Sec',
//         image: require('../../../../../assets/user/tea.png'),

//       },
//       {
//         id:47,
//         step: "Step 7",
//         step_name: 'Pacer Steps',
//         time: '10 Sec',
//         image: require('../../../../../assets/user/tea.png'),

//       },
//       {
//         id:48,
//         step: "Step 8",
//         step_name: 'Pacer Steps',
//         time: '10 Sec',
//         image: require('../../../../../assets/user/tea.png'),

//       },
//       {
//         id:49,
//         step: "Step 9",
//         step_name: 'Pacer Steps',
//         time: '10 Sec',
//         image: require('../../../../../assets/user/tea.png'),

//       },


//     ]
//   },
//   {
//     patient_id:"patient_id",
//     day: "Day 8",
//     exercise: 'Core Stability',
//     value:8,

//     description: [
//       {
//         id:50,
//         step: "Exercise 1",
//         step_name: '20 alt arm / leg raises',
//         time: '5 Sets | 30 Sec rest',
//         image: require('../../../../../assets/user/exercise/core1.png'),

//       },
//       {
//         id:51,
//         step: "Exercise 2",
//         step_name: '20 Elbow plank leg raises',
//         time: '5 Sets | 30 Sec rest',
//         image: require('../../../../../assets/user/exercise/core2.png'),

//       },
//       {
//         id:52,
//         step: "Exercise 3",
//         step_name: '20 Side bridges',
//         time: '5 Sets | 30 Sec rest',
//         image: require('../../../../../assets/user/exercise/core3.png'),

//       },
//       {
//         id:53,
//         step: "Exercise 4",
//         step_name: '20 Side bridge leg raises',
//         time: '5 Sets | 30 Sec rest',
//         image: require('../../../../../assets/user/exercise/core4.png'),

//       },


//     ]
//   },
//   {
//     patient_id:"patient_id",
//     day: "Day 9",
//     exercise: 'Basic Yoga',
//     value:9,

//     description: [
//       {
//         id:54,
//         step: "Step 1",
//         step_name: 'Pacer Steps',
//         time: '10 Sec',
//         image: require('../../../../../assets/user/exercise/yoga1.png'),

//       },
//       {
//         id:55,
//         step: "Step 2",
//         step_name: 'Pacer Steps',
//         time: '10 Sec',
//         image: require('../../../../../assets/user/exercise/yoga2.png'),

//       },
//       {
//         id:56,
//         step: "Step 3",
//         step_name: 'Pacer Steps',
//         time: '10 Sec',
//         image: require('../../../../../assets/user/exercise/yoga3.png'),

//       },
//       {
//         id:57,
//         step: "Step 4",
//         step_name: 'Pacer Steps',
//         time: '10 Sec',
//         image: require('../../../../../assets/user/exercise/yoga4.png'),

//       },
//       {
//         id:58,
//         step: "Step 5",
//         step_name: 'Pacer Steps',
//         time: '10 Sec',
//         image: require('../../../../../assets/user/exercise/yoga5.png'),

//       },
//       {
//         id:59,
//         step: "Step 6",
//         step_name: 'Pacer Steps',
//         time: '10 Sec',
//         image: require('../../../../../assets/user/exercise/yoga6.png'),

//       },
//       {
//         id:60,
//         step: "Step 7",
//         step_name: 'Pacer Steps',
//         time: '10 Sec',
//         image: require('../../../../../assets/user/exercise/yoga7.png'),

//       },
//       {
//         id:61,
//         step: "Step 8",
//         step_name: 'Pacer Steps',
//         time: '10 Sec',
//         image: require('../../../../../assets/user/exercise/yoga8.png'),

//       },
//       {
//         id:62,
//         step: "Step 9",
//         step_name: 'Pacer Steps',
//         time: '10 Sec',
//         image: require('../../../../../assets/user/exercise/yoga9.png'),

//       },


//     ]
//   },
//   {
//     patient_id:"patient_id",
//     day: "Day 10",
//     exercise: 'Hip Workout',
//     value:10,

//     description: [
//       {
//         id:63,
//         exercise: "Step 1",
//         step_name: '16 Squat Step-back',
//         time: '4 Sets | 30 Sec rest',
//         image: require('../../../../../assets/user/exercise/hip1.png'),

//       },
//       {
//         id:64,
//         exercise: "Step 2",
//         step_name: '16 Staggered deadlifts',
//         time: '4 Sets | 30 Sec rest',
//         image: require('../../../../../assets/user/exercise/hip2.png'),

//       },
//       {
//         id:65,
//         exercise: "Step 3",
//         step_name: '16 Back leg raises',
//         time: '4 Sets | 30 Sec rest',
//         image: require('../../../../../assets/user/exercise/hip3.png'),

//       },
//       {
//         id:66,
//         exercise: "Step 4",
//         step_name: '16 Split Lunges',
//         time: '4 Sets | 30 Sec rest',
//         image: require('../../../../../assets/user/exercise/hip4.png'),

//       },
//       {
//         id:67,
//         exercise: "Step 5",
//         step_name: '16 Tricep dips',
//         time: '4 Sets | 30 Sec rest',
//         image: require('../../../../../assets/user/exercise/hip5.png'),

//       },

//     ]
//   },

// ];
const monthsList = [
  {value : 1, label: 'January'},
  {value : 2, label: 'February'},
  {value : 3, label: 'March'},
  {value : 4, label: 'April'},
  {value : 5, label: 'May'},
  {value : 6, label: 'June'},
  {value : 7, label: 'July'},
  {value : 8, label: 'August'},
  {value : 9, label: 'September'},
  {value : 10, label: 'October'},
  {value : 11, label: 'November'},
  {value : 12, label: 'December'},
]
const Exercise = () => {
  const [exerciseData, setExerciseData] = useState([]);
  const [currentYear,setCurrentYear] = useState(new Date().getFullYear())
  const [currentMonth,setCurrentMonth] = useState(new Date().getMonth()+1)
  const [currentDate,setCurrentDate] = useState(new Date((new Date().getFullYear(),new Date().getMonth(),1)))
  const [showProgress, setShowProgress] = useState(false);
  const [monthWiseExerciseData,setMonthWiseExerciseData] = useState([])
  const [monthsArr,setMonthsArr] = useState(monthsList);
  const [yearArr,setYearArr] = useState([]);
  const [selectedMonth,setSelectedMonth] = useState(monthsList[currentMonth].label)
  useFocusEffect(
    React.useCallback(() => {
      let currentDate = new Date();
      let month = currentDate.getMonth()+1;
      let year = currentDate.getFullYear();
      getDaysInMonth(month,year)
      // ExerciseList();
      return () => false;
    }, [])
  );
  const getDaysInMonth=(month,year)=>{
    // console.log("getDaysInMonth===",month,year)
    let days = new Date(year,month,0).getDate()
    let currDate = new Date(year,month,2);
    let months = [];
    let years = [];
    let count = currentMonth;
    let yearCount = currentMonth;
    for(let i=0;i<=6;i++){
      console.log("curent",6-i)
      months.push(monthsList[count-1]);
      // setMonthsArr(monthsList[count-1])
      count--
      if(count == 0 ){
        count = 12;
      }
      if(yearCount-i <= 0){
        years.push(year-1);
      }
      else{
        years.push(year);
      }
      setMonthsArr(months);
      setYearArr(years);

    }
    // setDaysOfMonth(days)
    monthlyList(month,year);
    ExerciseList(days,month,year);
  }

  const monthlyList=async (month,year)=>{
    const id = await AsyncStorage.getData(AsyncStorageKeys.patient_id);
    const patientid = JSON.parse(id) || [];
    let ApiEndPoint = appStrings.screens.api_names.monthly_exercise_list.replace('${patient_id}',patientid).replace('${month}',month).replace('${year}',year);

    //start working from here need to fetch completed exercise list then need to check status on basis of date in check status function.
    setShowProgress(true);

    let inputParams = {};
    UserAxios.getResponse(
      ApiEndPoint,
      inputParams,
      "get",
      (response, error) => {
        // console.log("response from monthly list====>>",response)
        if (!error) {
          if (!response.error) {
            setShowProgress(false);
            // console.log("monthWiseExerciseData----",JSON.stringify(response.data))
            setMonthWiseExerciseData(response.data)
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
  }

  const ExerciseList = async (daysInMonth,currMonth,currYear) => {

    const id = await AsyncStorage.getData(AsyncStorageKeys.patient_id);
    const patientid = JSON.parse(id) || [];
    let exerciseArr = [];
    let count = 0;
    let i=0;
    // let dateToday
    setShowProgress(true);

    let inputParams = {};
    UserAxios.getResponse(
      `${appStrings.screens.api_names.exercise}`,
      inputParams,
      "get",
      (response, error) => {
        if (!error) {
          if (!response.error) {
          for(i=1;i<=daysInMonth;i++){
            // console.log("response exercise_list--->",response)
          exerciseArr.push(response.exercise_list[count])
          count++
          if(count===10){
            count=0;
          }
          //  console.log("date--",new Date(dateToday.setDate(dateToday.getDate()+i)))
          }
          //  console.log("ExerciseArr--->",exerciseArr)
           setExerciseData(exerciseArr)
           setShowProgress(false);

          } else {
            console.log("Error", response.Error);
          }
        }
        else {
          console.log("error",error)
          if (error.name != undefined && error.name != null)
            console.log(error.name);
        }
        setShowProgress(false);
      }
    );
  };

  const checkStatus=(ind)=>{
    let dateToday = new Date(currentYear,currentMonth-1,1);
    let _date = new Date(dateToday.setDate(dateToday.getDate()+ind+1))
    let match = [];
    if(monthWiseExerciseData.length == 0){
      return false
    }else{
      
      // console.log("MonthWise Excercise List---->>>",monthWiseExerciseData)
        match = monthWiseExerciseData.find(exercise=>{
        let exerciseDate = moment(exercise.date).add(1,"day").startOf('day');
        let calendarDate = moment(_date,'DD-MM-YYYY').startOf('day');
        // console.log("calendarDate",calendarDate,"exerciseDate",exerciseDate)
        return calendarDate.isSame(exerciseDate)       
        }
      )
      
    }
    // console.log("match",match)
    if(match){
      return match
    }
  }
  
  /////
  const getStepList=(item)=>{
     let steps=[];
    //  console.log("item----",item.stepCount);
     let i=0;
     for(i=1;i<=item.stepCount;i++){
      // console.log("Hghghg===",i)
      steps.push({stepStatus:0,stepNumber:i})
     }
     return steps
  }
 
  const renderExerciseItem = ({ item,index }) => {
    let active = checkStatus(index);
    console.log("active===>>>>",active);

    var steps = active? active.steps : getStepList(item)
    var day =moment().date();
    return (

      <TouchableOpacity
        style={[styles.listItem,{backgroundColor:active?.status ? green1 : !active &&  index+1 == day ? "#FFF4D6" : white }]}
        onPress={() => {
          console.log("logggg",moment().day(),currentMonth)
          // if(moment().day() >= index+1){
          navigationRef.current?.navigate(appStrings.screens.appStrings.exerciseStep, {           
             "day_id": item.day_id,
             "index":index+1,
             "month":currentMonth,
             "year":currentYear,
             "exercise_id":item.id,
            productTitle: `DAY ${index+1}`
          });
        // }
        }}
      >
        <View style={{ flex: 1}}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", flex: 1 }}>
            <CustomText style={[styles.dayTitle,{color: active?.status ? white : black}]}>DAY {index+1}</CustomText>
             {
             active?.status ? (
                <CustomText style={[styles.description,{color: active?.status ? white : '#888'}]}>Completed</CustomText>          
              ):null
             }
           
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <CustomText style={[styles.description,{color: active?.status ? white : black}]}>{item.exercise}</CustomText>
          {
            active?.status ? (
              <Icon name="checkbox-marked" type="material-community" color={active?.status ? white : grey} size={26} />        
            ):null
          }
         </View>
       
          <View style={{marginTop:10,flexDirection:'row',alignItems:'center'}}>
            {
              steps.map((item,index)=>{
                return(
                  <View style={{ 
                    width: 22,
                    height: 22,
                    borderRadius: 50,
                    marginRight:8,
                    alignItems:'center',
                    justifyContent:'center',
                    borderWidth:1,
                    borderColor:item.stepStatus ==1 ? "white" : "#000",
                    backgroundColor:item.stepStatus ==1 ? "green" : "white"
                    }}>
                    <Text style={{color:item.stepStatus ==1 ? "#fff":"#000",fontSize:12}}>{index+1}</Text>
                    </View>
                )
              })
            }
          </View>
         
         
        {/* <View style={{marginTop:10,flexDirection:'row',justifyContent:'space-evenly',alignItems:'center'}}>
          <View style={styles.circle}>
           <Text style={{color:'#fff',fontSize:12}}>1</Text>
          </View>
          <View style={styles.circle}>
           <Text style={{color:'#fff'}}>2</Text>
          </View>
          <View style={styles.circle}>
           <Text style={{color:'#fff'}}>3</Text>
          </View>
          <View style={styles.circle}>
           <Text style={{color:'#fff'}}>4</Text>
          </View>
          <View style={styles.circle}>
           <Text style={{color:'#fff'}}>5</Text>
          </View>
          <View style={styles.circle}>
           <Text style={{color:'#fff'}}>6</Text>
          </View>
          <View style={styles.circle}>
           <Text style={{color:'#fff'}}>7</Text>
          </View>
          <View style={styles.circle}>
           <Text style={{color:'#fff'}}>8</Text>
          </View>
        </View> */}

        </View>

      </TouchableOpacity>


    );
  };



  return (
    <SafeAreaView style={styles.container}>
      {/* <View style={{ alignItems:'flex-end' }}>
        <Dropdown
          data={monthsArr}
          value={currentMonth}
          onChange={(item) => {
            console.log("itemm-->", item)
            let days = new Date(yearArr[item._index],item.value,0).getDate()
            setSelectedMonth(item.label);
            // console.log("days==",days)
            monthlyList(item.value,yearArr[item._index])
            ExerciseList(days,item.value,yearArr[item._index])
          }}
          labelField="label"
          maxHeight={300}
          valueField="value"
          placeholder="Select Month*"
          inputSearchStyle={{ height: 40, fontSize: 16 }}
          selectedTextStyle={{ fontSize: 16, color: black }}
          itemTextStyle={{ fontSize: 16, color: black }}
          style={{ height: 50, width: '50%', paddingHorizontal: 10, color: black,backgroundColor:white,margin:8 ,borderRadius: 10, borderWidth: 1, borderColor: grey_border}}
        />
      </View> */}
      <ScrollView>
        {
          exerciseData.length > 0 ?
            (
              <>

                <View>
                  <FlatList
                    data={exerciseData}
                    renderItem={renderExerciseItem}
                    keyExtractor={(item) => { item.day }}
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
      </ScrollView>

      <Loader showHud={showProgress} />
    </SafeAreaView>
  )
}

export default Exercise

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white
  },
  viewMoreText: {
    marginTop: 10,
    fontSize: 16,
    color: '#1e90ff',
  },

  listItem: {
    padding: 10,
    shadowColor: black,
    shadowOffset: { width: 1, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.65,
    elevation: 6,
    //backgroundColor: white,
    width: "96%",
    // height: 100,
    borderRadius: 15,
    flex: 1,
    alignSelf: "center",
    //justifyContent: "center",
    flexDirection: "row",
    paddingBottom: 25,
    marginTop: 20,
    bottom: 10,
    paddingLeft: 20
  },
  container1: {
    padding: 0,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  exercise: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  dayTitle: {
    fontSize: 20,
    fontWeight: '700',

  },
  description: {
    fontSize: 16,
    
  },
  exercise: {
    color: grey123,
    fontSize: 16,
    fontWeight: "400",
    fontFamily: "poppins"
  },
  subexercise: {
    color: black,
    fontSize: 16,
    fontWeight: "700",
    left: 40
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 100 / 2,
    backgroundColor: "green",
    alignItems:'center'
  },
})