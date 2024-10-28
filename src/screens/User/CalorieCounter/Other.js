import { StyleSheet, SafeAreaView, View, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import { navigationRef } from '../../../../lib/RootNavigation';
import CustomImage from '../../../components/CustomImage';
import CustomText from '../../../components/CustomText';
import appStrings from '../../../../lib/appStrings';
import { black, grey, white } from '../../../../lib/colors';


const data = [
  {
    title: "Fruits",
    subTitle: "Here is calories which you gain when you taking Fruits.",
    image: require('../../../../assets/user/other/fruit.png'),
    calorie:[
      {
        
        food: "Banana",
        fat: 0.3,
        cholesterol:0,
        calories:100
      
      },
      { 
           
        food: "Mango",
        fat: 0.4,
        cholesterol:0,
        calories:120
      
      },
      {
     
        food: "Grapes (fresh)",
        fat: 0.3,
        cholesterol:0,
        calories:40
      },
      {
     
        food: "Pomegranate",
        fat: 0.1,
        cholesterol:0,
        calories:80
      },
      {
     
        food: "Pear",
        fat: 0.2,
        cholesterol:0,
        calories:84
      },
      {
     
        food: "Grapefruit",
        fat: 0.1,
        cholesterol:0,
        calories:32
      },
      {
     
        food: "Apple",
        fat: 0.5,
        cholesterol:0,
        calories:60
      },
      {
     
        food: "Dates",
        fat: 0.4,
        cholesterol:0,
        calories:220
      },
      {
     
        food: "Melon",
        fat: 0.2,
        cholesterol:0,
        calories:40
      },
      {
     
        food: "Plum",
        fat: 0.5,
        cholesterol:0,
        calories:30
      },
      {
     
        food: "Papaya",
        fat: 0.1,
        cholesterol:0,
        calories:30
      },
      {
     
        food: "Pineapple",
        fat: 0.1,
        cholesterol:0,
        calories:40
      },
      {
     
        food: "Litchi",
        fat: 0.2,
        cholesterol:0,
        calories:65
      },
      {
     
        food: "Orange",
        fat: 0,
        cholesterol:0,
        calories:65
      },
      {
     
        food: "Strawberries",
        fat: 0,
        cholesterol:0,
        calories:28
      },
      {
     
        food: "Cherries fresh",
        fat: 0,
        cholesterol:0,
        calories:40
      },
      {
     
        food: "Apricots",
        fat: 0,
        cholesterol:0,
        calories:55
      },
      {
     
        food: "Coconut (1 piece fresh/35 gm)",
        fat: 0,
        cholesterol:0,
        calories:155
      },
      
    ]
  },
  {
    title: "Dry Fruits",
    subTitle: "Here is calories which you Gain when you taking dryfruit.",
    image: require('../../../../assets/user/other/dryfruit.png'),
    calorie:[
      {
        
        food: "Figs 1",
        fat: 0,
        cholesterol:0,
        calories:50
      
      },
      { 
           
        food: "Raisins half cup",
        fat: 0,
        cholesterol:0,
        calories:210
      
      },
      {
     
        food: "Apricots half cup",
        fat: 0,
        cholesterol:0,
        calories:170
      },
     
    ]
  },
  {
    title: "Nuts",
    subTitle: "Here is calories which you Gain when you taking nuts.",
    image: require('../../../../assets/user/other/nuts.png'),
    calorie:[
      {
        
        food: "Almonds (30 gm shelled 1/4 cup)",
        fat: 17,
        cholesterol:0,
        calories:194
      
      },
      { 
           
        food: "Cashew nuts (30 gm 1/4 cup)",
        fat: 16.5,
        cholesterol:0,
        calories:178
      
      },
      {
     
        food: "Peanuts (30 gm 1/4 cup)",
        fat: 16.8,
        cholesterol:0,
        calories:170
      },
      {
     
        food: "Walnuts (30 gm 1/4 cup)",
        fat: 20,
        cholesterol:0,
        calories:206
      },
      {
     
        food: "Pistachio nuts (30 gm 1/4 cup)",
        fat: 16,
        cholesterol:0,
        calories:188
      },
     
    ]
  },
  {
    title: "Fats & Oils",
    subTitle: "Here is calories which you Gain when you taking fats and oil.",
    image: require('../../../../assets/user/other/oil.png'),
    calorie:[
      {
        
        food: "Butter 1 tsp(5 gm)",
        fat: 4.1,
        cholesterol:12,
        calories:35
      
      },
      { 
           
        food: "Corn/groundnut oil 1 tsp",
        fat: 5,
        cholesterol:0,
        calories:45
      
      },
      {
     
        food: "Corn oil 1 tsp",
        fat: 5,
        cholesterol:0,
        calories:45
      },
      {
     
        food: "Margarine 1 tsp (5 gm)",
        fat: 4,
        cholesterol:0,
        calories:35
      },
      {
     
        food: "Ghee Desi 5 gm (clariﬁed butter)",
        fat: 5,
        cholesterol:15,
        calories:45
      },
      {
     
        food: "Mayonnaise 5 gm (1 table spoon)",
        fat: 11,
        cholesterol:8,
        calories:100
      },
     
    ]
  },
  {
    title: "Sweet And Deserts",
    subTitle: "Here is calories which you Gain when you taking sweet and desert.",
    image: require('../../../../assets/user/other/sweet.png'),
    calorie:[
      {     
        food: "Sugar 5 gm",
        fat: 0,
        cholesterol:0,
        calories:20
      
      },
      {        
        food: "Honey 5 ml",
        fat: 0,
        cholesterol:0,
        calories:16
      
      },
      {        
        food: "Jaggery 5 gm",
        fat: 0,
        cholesterol:0,
        calories:19
      
      },
      {        
        food: "Brown Sugar 5 gm",
        fat: 0,
        cholesterol:0,
        calories:16
      
      },
      {        
        food: "Jam/Jlly 20 gm 1 tsp",
        fat: 0,
        cholesterol:0,
        calories:55
      
      },
      {        
        food: "Horlicks 5 gms",
        fat: 0,
        cholesterol:0,
        calories:20
      
      },
      {
     
        food: "Jalebi 100 gm",
        fat: 15,
        cholesterol:0,
        calories:380
      },
      {
        food: "Gulag Jamun 2",
        fat: 15,
        cholesterol:31,
        calories:280
      },
      {
        food: "Rice Kheer in whole cow milk(150 ml)(1 katori)",
        fat: 8.2,
        cholesterol:28,
        calories:300
      },
      {
        food: "Maal Pua (1)",
        fat: 15,
        cholesterol:25,
        calories:200
      },
      {
        food: "Rasgullas(2)",
        fat: 0.4,
        cholesterol:1.75,
        calories:110
      },
      {
        food: "Apple pie 1/8 piece",
        fat: 1.2,
        cholesterol:4,
        calories:282
      },
      {
        food: "Sandesh 2 pieces",
        fat: 1,
        cholesterol:0,
        calories:60
      },
      {
        food: "Baked Custard (1/2 cup)",
        fat: 7.3,
        cholesterol:154,
        calories:153
      },
      {
        food: "Gajjar Halwa in Khoya(1 katori)",
        fat: 15,
        cholesterol:18,
        calories:260
      },
      {
        food: "Fruit salad half cup",
        fat: 0,
        cholesterol:0,
        calories:98
      },
      {
        food: "Brownie 1",
        fat: 5,
        cholesterol:27,
        calories:130
      },
      {
        food: "Cheese cake 1/8 cake",
        fat: 14,
        cholesterol:30,
        calories:300
      },
      {
        food: "Chocolate cake with icing 1 piece",
        fat: 10.8,
        cholesterol:26,
        calories:233
      },
      {
        food: "Chocolate chip cookie 1",
        fat: 2.9,
        cholesterol:8,
        calories:120
      },
      {
        food: "Danish Pastry, apple 1 small",
        fat: 4.9,
        cholesterol:9,
        calories:121
      },
      {
        food: "Doughnuts (glazed leavened)",
        fat: 0.5,
        cholesterol:12,
        calories:124
      },
      {
        food: "Jelly (Rex/Jello) 1/2 cup",
        fat: 0,
        cholesterol:0,
        calories:81
      },
      {
        food: "Chocolate sauce/syrup 1 tsp",
        fat: 0,
        cholesterol:0,
        calories:225
      },     
    ]
  },
  {
    title: "Candy",
    subTitle: "Here is calories which you Gain when you taking candy.",
    image: require('../../../../assets/user/other/candy.png'),
    calorie:[
      {
        
        food: "Chocolate 25 gm",
        fat: 9.0,
        cholesterol:5,
        calories:145
      
      },
      { 
      
        
        food: "Caramels (Plain or chocolate 3)",
        fat: 2.9,
        cholesterol:8,
        calories:112
      
      },
      {
     
        food: "Gum drops (28)",
        fat: 0.2,
        cholesterol:0,
        calories:100
      },
      {
        food: "Hard candy (8 ps)",
        fat: 0.3,
        cholesterol:0,
        calories:110
      },
     
    ]
  },
  
];

const Other = () => {

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

export default Other

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