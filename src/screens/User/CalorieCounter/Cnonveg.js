import { StyleSheet, SafeAreaView, View, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import { navigationRef } from '../../../../lib/RootNavigation';
import CustomImage from '../../../components/CustomImage';
import CustomText from '../../../components/CustomText';
import appStrings from '../../../../lib/appStrings';
import { black, grey, white } from '../../../../lib/colors';

const data = [
  {
    title: "Eggs",
    subTitle: "Here is calories which you gain when you taking eggs.",
    image: require('../../../../assets/user/Calorienonveg/egg.png'),
    calorie:[
      {
        
        food: "1 Egg (boiled)",
        fat: 6.0,
        cholesterol:280,
        calories:80
      
      },
      { 
      
        
        food: "1 Egg white (boiled)",
        fat: 0.0,
        cholesterol:0.0,
        calories:40
      
      },
      {
     
        food: "1 Egg (Scrambled/omelet)",
        fat: 10.0,
        cholesterol:285,
        calories:130
      },
      {
        food: "1 Egg (Fried)",
        fat: 11.0,
        cholesterol:280,
        calories:190
      },
     
    ]
  },
  {
    title: "Soups",
    subTitle: "Here is calories which you Gain when you taking soups.",
    image: require('../../../../assets/user/Calorienonveg/soup.png'),
    calorie:[
      {
        
        food: "Chicken Broth(1 cup)",
        fat: 1.4,
        cholesterol:1,
        calories:39
      
      },
      {        
        food: "Chicken Noodle(1 cup)",
        fat:2.5,
        cholesterol:7,
        calories:39
      
      },
      {
     
        food: "Minestrone(1 cup)",
        fat: 2.5,
        cholesterol:2,
        calories:83
      },
     
      {
        food: "Cream of mushroom (whole milk)(1 cup)",
        fat: 9.0,
        cholesterol:2,
        calories:129
      },
      {
        food: "Cream of Celery (whole milk)(1 cup)",
        fat: 5.6,
        cholesterol:1.5,
        calories:90
      },
     
     
    ]
  },
  
  {
    title: "Meats",
    subTitle: "Here is calories which you Gain when you taking meats.",
    image: require('../../../../assets/user/Calorienonveg/meat.png'),
    calorie:[
      {
        
        food: "Goat meat (lean 100 gm)",
        fat:10.5,
        cholesterol:94,
        calories:118
      
      },
      {        
        food: "Goat liver (100 gm)",
        fat:3.8,
        cholesterol:250,
        calories:107
      
      },
      {
     
        food: "Beef (lean)(100 gm)",
        fat: 10.3,
        cholesterol:92,
        calories:114
      },
      {
        food: "Lamb chops (boiled)(60 gm)",
        fat: 5.5,
        cholesterol:60,
        calories:120
      },
      {
        food: "Lamb leg roasted",
        fat:8.0,
        cholesterol:80,
        calories:235
      },
      {
        food: "Mutton Ball curry (145 gm)",
        fat:18,
        cholesterol:90,
        calories:240
      },
      
    ]
  },
  {
    title: "Pork",
    subTitle: "Here is calories which you Gain when you taking pork.",
    image: require('../../../../assets/user/Calorienonveg/pork.png'),
    calorie:[
      {
        
        food: "Lean (100 gm)",
        fat:13.2,
        cholesterol:94,
        calories:114
      
      },
      {        
        food: "Bacon (2 Med. slices)",
        fat:7.1,
        cholesterol:40,
        calories:85
      
      },
      {
     
        food: "Chops (boiled)(60 gm)",
        fat: 22.1,
        cholesterol:94,
        calories:305
      },
      {
        food: "Sausages/Ham/Salami(100 gm)",
        fat: 32.4,
        cholesterol:100,
        calories:114
      },
      {
        food: "Frankfurter (100gm)",
        fat:50,
        cholesterol:150,
        calories:170
      },
     
    ]
  },
  {
    title: "Chicken",
    subTitle: "Here is calories which you Gain when you taking chicken.",
    image: require('../../../../assets/user/Calorienonveg/chicken.png'),
    calorie:[
      {
        
        food: "Light without skin (100 gm)",
        fat:4.5,
        cholesterol:85,
        calories:109
      
      },
      {        
        food: "Dark without skin (100 gm)",
        fat:10.5,
        cholesterol:94,
        calories:109
      
      },
      {
     
        food: "Chicken Ala King (1 cup)",
        fat: 20.0,
        cholesterol:1.50,
        calories:470
      },
      {
        food: "Fried chicken (100 gm)",
        fat: 12.0,
        cholesterol:8.0,
        calories:85
      },
     
    ]
  },
  {
    title: "Breast",
    subTitle: "Here is calories which you Gain when you taking breast.",
    image: require('../../../../assets/user/Calorienonveg/breast.png'),
    calorie:[
      {
        
        food: "With skin, roasted (half cup)",
        fat:7.6,
        cholesterol:83,
        calories:193
      
      },
      {        
        food: "Without skin, roasted (half cup)",
        fat:3.1,
        cholesterol:73,
        calories:142
      
      },
      {
     
        food: "With skin, fried (half cup)",
        fat: 8.7,
        cholesterol:88,
        calories:218
      },
      {
        food: "Without skin, fried (half cup)",
        fat: 4.1,
        cholesterol:78,
        calories:261
      },
     
    ]
  },
  {
    title: "Drum Stick",
    subTitle: "Here is calories which you Gain when you taking drum stick.",
    image: require('../../../../assets/user/Calorienonveg/drumstick.png'),
    calorie:[
      {
        
        food: "With skin, roasted (one cup)",
        fat:5.8,
        cholesterol:48,
        calories:112
      
      },
      {        
        food: "Without skin, roasted (one cup)",
        fat:2.5,
        cholesterol:41,
        calories:76
      
      },
      {
     
        food: "With skin, fried (one cup)",
        fat: 6.7,
        cholesterol:44,
        calories:120
      },
      {
        food: "Without skin, fried (half cup)",
        fat: 3.4,
        cholesterol:40,
        calories:82
      },
      {
        food: "Dam ka chicken",
        fat: 15,
        cholesterol:95,
        calories:260
      },
     
    ]
  },
  {
    title: "Fish",
    subTitle: "Here is calories which you Gain when you taking fish.",
    image: require('../../../../assets/user/Calorienonveg/fish.png'),
    calorie:[
      {
        
        food: "Fish cutlet (80 gm/2)",
        fat:9,
        cholesterol:130,
        calories:190
      
      },
      {        
        food: "Fish curry (jhol)(110 gm)",
        fat:3,
        cholesterol:30,
        calories:40
      
      },
      {
     
        food: "White pomfert (100 gm)",
        fat: 2,
        cholesterol:30,
        calories:87
      },
      {
        food: "White pomfert fried (125 gm)",
        fat: 10,
        cholesterol:40,
        calories:225
      },

      {
        food: "Black pomfert (100 gm)(steamed)",
        fat: 20,
        cholesterol:40,
        calories:111
      },
      {
        food: "Salmon(100 gm)(steamed)",
        fat: 11,
        cholesterol:88,
        calories:141
      },
      {
        food: "Mackerel (100 gm)",
        fat: 17.8,
        cholesterol:75,
        calories:93
      },
      {
        food: "Prawns/Shrimp",
        fat: 1.1,
        cholesterol:199,
        calories:94
      },
      {
        food: "Prawn Curry (145 gm)",
        fat: 7,
        cholesterol:160,
        calories:220
      },
      {
        food: "Lobsters",
        fat: 0.6,
        cholesterol:73,
        calories:90
      },
      {
        food: "Oysters",
        fat: 5.0,
        cholesterol:112,
        calories:400
      },
      {
        food: "Crabs",
        fat: 0.6,
        cholesterol:72,
        calories:100
      },
          
    ]
  },
 
];

const Cnonveg = () => {

  const renderItem = ({ item }) => {
    return (
      <View style={styles.listItem}>
        <TouchableOpacity activeOpacity={0.7}
        onPress={() => navigationRef.current?.navigate(appStrings.screens.appStrings.vegCalorie, { "item": item.id,"productTitle": item.title,"data":item.calorie })}
        >
          <View style={styles.row}>
            <View style={{ width: "60%",left:5 }}>
              <CustomText style={styles.dayTitle}>{item.title}</CustomText>
              <CustomText style={styles.description}>{item.subTitle}</CustomText>

            </View>
            <View style={styles.imageContainer}>
              <CustomImage
                source={item.image}
                resizeMode="contain"
                style={styles.image}
              />
            </View>
          </View>
        </TouchableOpacity>

      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>

      <FlatList
        data={data}
        renderItem={renderItem}
      //keyExtractor={(item) => `day-${item.day}`} 
      />


    </SafeAreaView>
  )
}

export default Cnonveg

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white
  },
  row: {
    flexDirection: 'row',

  },
  imageContainer: {

    width: "40%",
    alignSelf: 'center',
  },
  image: {
    width: 131,
    height: 110,
    alignSelf: 'center',
  },
  listItem: {
    padding: 10,
    shadowColor: black,
    shadowOffset: { width: 1, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.65,
    elevation: 6,
    backgroundColor: white,
    width: "92%",
    height: "45%",
    borderRadius: 15,
    flex: 1,
    alignSelf: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingBottom: 25,
    marginTop: 20,
    bottom: 10
  },
  textContainer: {


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