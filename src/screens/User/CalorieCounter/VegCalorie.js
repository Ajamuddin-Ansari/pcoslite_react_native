import { StyleSheet, SafeAreaView, View, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import CustomText from '../../../components/CustomText';
import { grey,white } from '../../../../lib/colors';


// const data = [
//   {

//     food: "Tea 1 cup (2tsp cream & 2tsp sugar)",
//     fat: 2.9,
//     cholesterol:10,
//     calories:70

//   },
//   { 


//     food: "Coﬀee 1 cup (2tsp cream & 2tsp sugar)",
//     fat: 2.9,
//     cholesterol:10,
//     calories:70

//   },
//   {

//     food: "Tea 1 cup (2tsp skim & 2tsp sugar)",
//     fat: 0,
//     cholesterol:0,
//     calories:45
//   },
//   {
//     food: "Coﬀee 1 cup (2tsp skim & 2tsp sugar)",
//     fat: 0,
//     cholesterol:0,
//     calories:45
//   },
//   {

//     food: "Cola drinks (350 ml)",
//     fat: 0,
//     cholesterol:0,
//     calories:145
//   },
//   {

//     food: "Ginger ale (350 ml)",
//     fat: 0,
//     cholesterol:0,
//     calories:115
//   },
//   {

//     food: "Beer Regular (350 ml)",
//     fat: 0,
//     cholesterol:0,
//     calories:150
//   },
//   {

//     food: "Beer, light (350 ml)",
//     fat: 0,
//     cholesterol:0,
//     calories:100
//   },
//   {

//     food: "Gin,Rum/Whisky/Vodka",
//     fat: 0,
//     cholesterol:0,
//     calories:105
//   },
//   {

//     food: "(86 proof) 1 jigger (43 ml) Gin, Rum/Whisky/Vodka (80 proof)",
//     fat: 0,
//     cholesterol:0,
//     calories:39
//   },
//   {

//     food: "Wines (Dry) 1 glass (100 ml)",
//     fat: 0,
//     cholesterol:0,
//     calories:85
//   },
//   {

//     food: "Wines (Sweet) 1 glass (100 ml)",
//     fat: 0,
//     cholesterol:0,
//     calories:140
//   },
//   {

//     food: "Champagne (100 ml)",
//     fat: 0,
//     cholesterol:0,
//     calories:84
//   },

//   {

//     food: "Brandy (30 ml)",
//     fat: 0,
//     cholesterol:0,
//     calories:77
//   },
//   {

//     food: "Martini (1 cocktail)",
//     fat: 0,
//     cholesterol:0,
//     calories:215
//   },
//   {

//     food: "Cordials & Liquors (30 ml)",
//     fat: 0,
//     cholesterol:0,
//     calories:97
//   },
//   {

//     food: "Squash (100 ml)",
//     fat: 0,
//     cholesterol:0,
//     calories:70
//   },

//   {

//     food: "Tomato juice (100 ml)",
//     fat: 0,
//     cholesterol:0,
//     calories:40
//   },

//   {

//     food: "Squash (100 ml)",
//     fat: 0,
//     cholesterol:0,
//     calories:70
//   },

//   {

//     food: "Orange juice (100 ml)",
//     fat: 0,
//     cholesterol:0,
//     calories:61
//   },
//   {

//     food: "Coconut water (100 ml)",
//     fat: 0,
//     cholesterol:0,
//     calories:24
//   },

//   {

//     food: "Apple juice (100 ml)",
//     fat: 0,
//     cholesterol:0,
//     calories:59
//   },
//   {

//     food: "Fresh Lime (Without Sugar) 1 glass (150 ml)",
//     fat: 0,
//     cholesterol:0,
//     calories:145
//   },
//   {

//     food: "Fresh Lime (With 2tsp Sugar) 1 glass (150 ml)",
//     fat: 0,
//     cholesterol:0,
//     calories:55
//   },



// ];

const VegCalorie = ({ route }) => {

  const [vegcaloriedata, setVegCalorieData] = useState([]);

  const cdata = route.params?.data;

  useEffect(() => {
    if (cdata) {
      setVegCalorieData(cdata);
    }

  }, [cdata]);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.listItem}>
        <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-evenly" }}>
          <View style={[styles.label, { flex: 0.30, backgroundColor: "#40C6FF" }]}>
            <CustomText style={styles.labelText}>Food</CustomText>
          </View>

          <View style={[styles.label, { flex: 0.20, backgroundColor: "#FF7E07" }]}>
            <CustomText style={styles.labelText}>Fat</CustomText>
          </View>

          <View style={[styles.label, { flex: 0.28, backgroundColor: "#40C6FF" }]}>
            <CustomText style={styles.labelText}>Cholesterol</CustomText>
          </View>

          <View style={[styles.label, { flex: 0.25, backgroundColor: "#FF7E07" }]}>
            <CustomText style={{ fontSize: 13, color: white }}>Calories</CustomText>
          </View>

        </View>

        <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 5 }}>
          <View style={{ width: 100, marginTop: -10 }}>
            <CustomText numberOfLines={4} ellipsizeMode='tail' style={[styles.valueText, { textAlign: "center" }]}>{item.food}</CustomText>
          </View>

          <View style={{ flex: 0.20 }}>
            <CustomText style={styles.valueText}>{item.fat}</CustomText>
          </View>

          <View style={{ flex: 0.28 }}>
            <CustomText style={styles.valueText}>{item.cholesterol}</CustomText>
          </View>

          <View style={{ flex: 0.20 }}>
            <CustomText style={styles.valueText}>{item.calories}</CustomText>
          </View>

        </View>

      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>

      <FlatList
        data={vegcaloriedata}
        renderItem={renderItem}
      />
    </SafeAreaView>
  )
}

export default VegCalorie

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    alignItems: "center",
    height:28,
    borderRadius: 20,
    paddingVertical: 4,
    marginHorizontal: 5
  },
  labelText: {
    fontSize: 13,
    color: white
  },
  valueText: {
    fontSize: 13,
    fontWeight: "bold",
    
  },

  listItem: {
    padding: 10,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.65,
    elevation: 3,
    backgroundColor: 'white',
    width: '96%',
    height: 120,
    borderRadius: 15,
    alignSelf: 'center',
    marginTop: 20,
    bottom: 10,
  },

  dayTitle: {
    fontSize: 24,
    fontWeight: '700',
  },
  description: {
    color: grey,
    marginTop: 10
  },
  nutrient: {
    color: "#777777",
    marginTop: 10,
    fontSize: 13,
    fontWeight: "400"
  },

})