import React, { useState, useEffect } from 'react'
import { StyleSheet, View } from 'react-native';
import { black, green1, grey, white } from '../../../../../lib/colors'
import { SafeAreaView } from 'react-native'
import CustomText from '../../../../components/CustomText'
//import { RulerPicker } from 'react-native-ruler-picker';
import WeightTracker from './WeightTracker'
import BodyTracker from './BodyTracker'
import CustomTabWeight from '../../../../components/CustomTabWeight'
import Toast from 'react-native-simple-toast';
import RNSpeedometer from 'react-native-speedometer';
import SimpleTextInput from '../../../../components/SimpleTextInput';
import AsyncStorage from '../../../../components/AsyncStorage';
import AsyncStorageKeys from '../../../../../lib/AsyncStorageKeys';
import CustomButton from '../../../../components/CustomButton';


const WeightManagement = () => {
  const [currentTab, setCurrentTab] = useState('WeightTracker');
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState('');
  const [bmiCategory, setBmiCategory] = useState('');
  const [bmiValue, setBmiValue] = useState(0);

  useEffect(() => {
    const retrieveBMIData = async () => {
      try {
        const value = await AsyncStorage.getData(AsyncStorageKeys.bmiValue);
        const category = await AsyncStorage.getData(AsyncStorageKeys.bmiCategory);
        console.log("category", category);
        if (value !== null && category !== null) {
          setBmiValue(parseFloat(value));
          setBmiCategory(category);
        }
      } catch (error) {
        console.error('Error retrieving BMI data:', error);
      }
    };

    retrieveBMIData();
  }, []);

  const calculateBMI = (weight, height) => {
    const heightM = height / 100; // Convert height from cm to meters
    if (heightM <= 0) return 0;
    return (weight / (heightM * heightM)).toFixed(1);
  };

  const getBMICategory = (bmi) => {
    if (bmi < 18.5) {
      return 'Underweight';
    } else if (bmi >= 18.5 && bmi < 24.9) {
      return 'Normal weight';
    } else if (bmi >= 25 && bmi < 29.9) {
      return 'Overweight';
    } else {
      return 'Obesity';
    }
  };

  const handleCalculateBMI = async () => {
    if (!weight) {
      Toast.show('Enter Weight');
      return;
    }

    if (!height) {
      Toast.show('Enter Height');
      return;
    }

    const bmiValue = calculateBMI(parseFloat(weight), parseFloat(height));
    setBmiValue(Math.min(bmiValue, 40));
    setBmiCategory(getBMICategory(bmiValue));

    try {
      await AsyncStorage.saveData(AsyncStorageKeys.bmiValue, bmiValue.toString());
      await AsyncStorage.saveData(AsyncStorageKeys.bmiCategory, getBMICategory(bmiValue));
    } catch (error) {
      console.error('Error saving BMI data:', error);
    }

  };

  const handleTabChange = (tab) => {
    setCurrentTab(tab);
  };

  return (
    <SafeAreaView style={styles.container}>

      <View style={{ justifyContent: "center", marginTop: 10, alignItems: "center", marginHorizontal: 20 }}>

        <RNSpeedometer
          value={bmiValue}
          size={200}
          minValue={0}
          labelWrapperStyle={{ height: 0, width: 0 }}
          maxValue={40}
          easeDuration={500}
          labels={[
            {
              name: '',
              labelColor: '#00bfff',
              valueColor: white,
              activeBarColor: '#00bfff',

            },
            {
              name: '',
              labelColor: '#00ff00',
              activeBarColor: '#00ff00',

            },
            {
              name: '',
              labelColor: '#ffbf00',
              activeBarColor: '#ffbf00',

            },
            {
              name: '',
              labelColor: '#ff0000',
              activeBarColor: '#ff0000',

            },
          ]}
          showLabels={false}
        />

        <CustomText style={{ marginVertical: 10, fontSize: 16, fontWeight: "bold", color: black }}>
          BMI : <CustomText style={{ fontSize: 14, fontWeight: "bold", color: green1 }}>{bmiValue || 0} {bmiCategory}</CustomText>
        </CustomText>

        <View>
          <SimpleTextInput
            placeholder="Enter Weight* (Kg)"
            containerStyle={{ height: 50, width: "92%", marginLeft: 15 }}
            value={weight}
            placeholderTextColor={grey}
            onChangeText={(text) => {
              setWeight(text);
            }}
            editable={true}
            keyboardType={"numeric"}

          />
        </View>

        <View>
          <SimpleTextInput
            placeholder="Enter Height* (Cm)"
            containerStyle={{ height: 50, width: "92%", marginLeft: 15 }}
            value={height}
            placeholderTextColor={grey}
            onChangeText={(text) => {
              setHeight(text);
            }}
            keyboardType={"numeric"}

          />
        </View>

        <View style={{ marginTop: 10, marginBottom: 10 }}>
          <CustomButton
            title="Calculate BMI"
            onPress={handleCalculateBMI}
            buttonStyle={styles.buttonStyle}
            titleStyle={{ fontSize: 15, color: white }}
          />

        </View>

        {/* <View style={styles.resultContainer}>
          <Text style={styles.resultText}>Your BMI: {bmi} ({bmiCategory})</Text>
         
        </View> */}

        {/* <View style={{ width: 65, height: 65, borderRadius: 35, borderWidth: 1, borderColor: grey_Border, backgroundColor: grey_Border }}>
          <CustomImage
            source={require('../../../../../assets/patient.png')}
            resizeMode="contain"
            style={{ width: 65, height: 65, alignSelf: 'center' }}
          />
          <CustomText style={{ fontSize: 10, top: 5, fontWeight: "700" }}>Patient1355</CustomText>
        </View> */}
      </View>

      {/* <View style={{ alignSelf: "center" }}>
        <RulerPicker
          width={700}
          height={150}
          min={0}
          max={150}
          step={1}         
          fractionDigits={0}
          initialValue={weight}    
          onValueChange={(number) => console.log(number)}    
          onValueChangeEnd={(number) => console.log(number)}
          indicatorColor={green1}
          indicatorHeight={70}
          unit="Kg"
           valueTextStyle={{ fontSize: 20 }}
           unitTextStyle={{ fontSize: 20 }}
        />
      </View> */}
      {/* <View style={{ justifyContent: "center",alignItems:"center", marginHorizontal: 20,top:-20 }}>
      <CustomText style={{ fontSize: 20, color: grey3,fontWeight:"bold"}}>Goal Weight : {goalweight || 0} Kg</CustomText>
      </View> */}
      <CustomTabWeight onTabChange={handleTabChange} />

      {currentTab === 'WeightTracker' ? (
        <View style={styles.tab}>
          <WeightTracker />
        </View>
      ) : (
        <View style={styles.tab}>
          <BodyTracker />
        </View>
      )}

    </SafeAreaView>
  )
}

export default WeightManagement

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white
  },
  tab: {
    flex: 1,
  },
  buttonStyle: {
    width: '70%',
    paddingVertical: 8,
    borderRadius: 10,
    alignSelf: 'center',
    backgroundColor: green1,

    //marginBottom: 20
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: '100%',
  },
  resultContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  resultText: {
    fontSize: 18,
    marginBottom: 10,
  },


})