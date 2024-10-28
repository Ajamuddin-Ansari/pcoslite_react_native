import { StyleSheet, SafeAreaView, View, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import { navigationRef } from '../../../../lib/RootNavigation';
import CustomImage from '../../../components/CustomImage';
import CustomText from '../../../components/CustomText';
import appStrings from '../../../../lib/appStrings';
import { black, grey, white } from '../../../../lib/colors';

const data = [
  {
    id:1,
    title: "Beverages",
    subTitle: "Here is calories which you gain when you drink beverages.",
    image: require('../../../../assets/user/Calorieveg/beverages.png'),
    calorie:[
      {
        
        food: "Tea 1 cup (2tsp cream & 2tsp sugar)",
        fat: 2.9,
        cholesterol:10,
        calories:70
      
      },
      { 
      
        
        food: "Coﬀee 1 cup (2tsp cream & 2tsp sugar)",
        fat: 2.9,
        cholesterol:10,
        calories:70
      
      },
      {
     
        food: "Tea 1 cup (2tsp skim & 2tsp sugar)",
        fat: 0,
        cholesterol:0,
        calories:45
      },
      {
        food: "Coﬀee 1 cup (2tsp skim & 2tsp sugar)",
        fat: 0,
        cholesterol:0,
        calories:45
      },
      {
      
        food: "Cola drinks (350 ml)",
        fat: 0,
        cholesterol:0,
        calories:145
      },
      {
      
        food: "Ginger ale (350 ml)",
        fat: 0,
        cholesterol:0,
        calories:115
      },
      {
        
        food: "Beer Regular (350 ml)",
        fat: 0,
        cholesterol:0,
        calories:150
      },
      {
        
        food: "Beer, light (350 ml)",
        fat: 0,
        cholesterol:0,
        calories:100
      },
      {
        
        food: "Gin,Rum/Whisky/Vodka",
        fat: 0,
        cholesterol:0,
        calories:105
      },
      {
        
        food: "(86 proof) 1 jigger (43 ml) Gin, Rum/Whisky/Vodka (80 proof)",
        fat: 0,
        cholesterol:0,
        calories:39
      },
      {
        
        food: "Wines (Dry) 1 glass (100 ml)",
        fat: 0,
        cholesterol:0,
        calories:85
      },
      {
        
        food: "Wines (Sweet) 1 glass (100 ml)",
        fat: 0,
        cholesterol:0,
        calories:140
      },
      {
        
        food: "Champagne (100 ml)",
        fat: 0,
        cholesterol:0,
        calories:84
      },
      
      {
        
        food: "Brandy (30 ml)",
        fat: 0,
        cholesterol:0,
        calories:77
      },
      {
        
        food: "Martini (1 cocktail)",
        fat: 0,
        cholesterol:0,
        calories:215
      },
      {
        
        food: "Cordials & Liquors (30 ml)",
        fat: 0,
        cholesterol:0,
        calories:97
      },
      {
        
        food: "Squash (100 ml)",
        fat: 0,
        cholesterol:0,
        calories:70
      },
    
      {
        
        food: "Tomato juice (100 ml)",
        fat: 0,
        cholesterol:0,
        calories:40
      },
    
      {
        
        food: "Squash (100 ml)",
        fat: 0,
        cholesterol:0,
        calories:70
      },
    
      {
        
        food: "Orange juice (100 ml)",
        fat: 0,
        cholesterol:0,
        calories:61
      },
      {
        
        food: "Coconut water (100 ml)",
        fat: 0,
        cholesterol:0,
        calories:24
      },
    
      {
        
        food: "Apple juice (100 ml)",
        fat: 0,
        cholesterol:0,
        calories:59
      },
      {
        
        food: "Fresh Lime (Without Sugar) 1 glass (150 ml)",
        fat: 0,
        cholesterol:0,
        calories:145
      },
      {
        
        food: "Fresh Lime (With 2tsp Sugar) 1 glass (150 ml)",
        fat: 0,
        cholesterol:0,
        calories:55
      },   
    ]

  },
  { 
    id:2,
    title: "Snacks",
    subTitle: "Here is calories which you Gain when you taking snacks.",
    image: require('../../../../assets/user/Calorieveg/snacks.png'),
    calorie:[
      {
        
        food: "Kachori (1 small)",
        fat: 15,
        cholesterol:10,
        calories:200
      
      },
      { 
      
        
        food: "Patty (Veg. 1 piece)",
        fat: 15,
        cholesterol:10,
        calories:260
      
      },
      {
     
        food: "Potato Vada (3 pieces/60 gm)",
        fat: 7,
        cholesterol:0,
        calories:170
      },
      {
        food: "Samosa (1 big/65gm)",
        fat: 13,
        cholesterol:0,
        calories:210
      },
      {
      
        food: "Vada (Dhai) (2 pieces)",
        fat: 19,
        cholesterol:0,
        calories:345
      },
      {
      
        food: "Bhelpuri (1 plate small)",
        fat: 5,
        cholesterol:0,
        calories:130
      },
      {
        
        food: "Chat (plate with 5 papries)",
        fat: 12,
        cholesterol:0,
        calories:210
      },
      {
        
        food: "Namkeen (fried) (2 tsp)",
        fat: 5,
        cholesterol:0,
        calories:85
      },
      {
        
        food: "Mathri (50 gm)",
        fat: 15,
        cholesterol:0,
        calories:200
      },
      {
        
        food: "Sandwich (2) (65 gm) with butter",
        fat: 14,
        cholesterol:0,
        calories:195
      },
      {
        
        food: "Pizza (1 slice) (medium)",
        fat: 2.1,
        cholesterol:0,
        calories:150
      },
      {
        
        food: "Popcorn (1 cup plain)",
        fat: 0,
        cholesterol:0,
        calories:25
      },
      {
        
        food: "Pan cake (1 plain)",
        fat: 3,
        cholesterol:0,
        calories:60
      },
      
      {
        
        food: "Crackers Monaco (4)",
        fat: 3.0,
        cholesterol:0,
        calories:50
      },
      {
        
        food: "Marie (2)",
        fat: 1.0,
        cholesterol:0,
        calories:55
      },
      {
        
        food: "Hamburger (1 Big Boy)",
        fat: 3.5,
        cholesterol:0,
        calories:570
      },
      {
        
        food: "Dhokla (1 piece)",
        fat: 0.5,
        cholesterol:0,
        calories:75
      },
    
      {
        
        food: "Chicken Nuggets (6)",
        fat: 20.0,
        cholesterol:0,
        calories:320
      },
    ]
  },
  {
    id:3,
    title: "Dairy Products",
    subTitle: "Here is calories which you Gain when you taking dairy products.",
    image: require('../../../../assets/user/Calorieveg/dairy.png'),
    calorie:[
      {
        
        food: "Full cream buﬀalo milk or curd (225 ml/1 cup)",
        fat: 17.6,
        cholesterol:70,
        calories:234
      
      },
      {         
        food: "Full cream cow milk or curd (225 ml/1 cup)",
        fat: 8.2,
        cholesterol:28,
        calories:134
      
      },
      {
     
        food: "Toned 3.5%",
        fat: 7,
        cholesterol:24,
        calories:124
      },
      {
        food: "Toned 1.5%",
        fat: 3,
        cholesterol:14,
        calories:90
      },
      {
      
        food: "Toned 1.0%",
        fat: 2,
        cholesterol:8,
        calories:50
      },
      {
      
        food: "Skimmed",
        fat: 0.2,
        cholesterol:0,
        calories:58
      },
      {
        
        food: "Butter Milk (Skimmed)",
        fat: 2,
        cholesterol:0,
        calories:38
      },
      {
        
        food: "Shake (Vanilla/Chocolate)",
        fat: 5.6,
        cholesterol:18,
        calories:185
      },
      {
        
        food: "Whole buﬀalo milk khoya (25 gm)",
        fat: 7.8,
        cholesterol:40,
        calories:105.25
      },
      {
        
        food: "Whole cow milk khoya (25 gm)",
        fat: 6.5,
        cholesterol:25,
        calories:103.25
      },
      {
        
        food: "Skimmed milk khoya (25 gm)",
        fat: 0.4,
        cholesterol:4,
        calories:0.65
      },
      {
        
        food: "Whole buﬀalo milk paneer (25 gm)",
        fat: 7.8,
        cholesterol:31,
        calories:95.75
      },
      {
        
        food: "Whole cow milk paneer (25 gm)",
        fat: 6.5,
        cholesterol:22.25,
        calories:79.75
      },
      
      {
        
        food: "Skimmed milk paneer (25 gm)",
        fat: 0.4,
        cholesterol:1.75,
        calories:21.5
      },
      {
        
        food: "American processed cheese (25 gm)",
        fat: 7.8,
        cholesterol:23.5,
        calories:93.75
      },
      {
        
        food: "Swiss cheese (25 gm)",
        fat: 6.85,
        cholesterol:23.0,
        calories:93.75
      },
      {
        
        food: "Cheddar cheese (25 gm)",
        fat: 8.28,
        cholesterol:26.0,
        calories:102.50
      },
    
      {
        
        food: "Cheese with (10% fat)(25 gm)",
        fat: 2.3,
        cholesterol:7.75,
        calories:41.25
      },
      {
        
        food: "Icecream (100 gms) 1 small cup",
        fat: 10,
        cholesterol:41,
        calories:200
      },
      {
        
        food: "Kulﬁ (100 gms) 1 small cup",
        fat: 1.5,
        cholesterol:30,
        calories:300
      },
      {
        
        food: "Condensed milk (25 gm)",
        fat: 1.9,
        cholesterol:8.5,
        calories:80.0
      },
      {
        
        food: "Sour Cream (25 gm)",
        fat: 7.0,
        cholesterol:11.2,
        calories:53.75
      },
      {
        
        food: "Soyabean Milk (225 ml)",
        fat: 4.0,
        cholesterol:0,
        calories:87
      },
    ]
  },
  {
    id:4,
    title: "Cereals",
    subTitle: "Here is calories which you Gain when you taking Cereals.",
    image: require('../../../../assets/user/Calorieveg/cereals.png'),
    calorie:[
      {
        
        food: "Wheat Roti(1 Phulka/35 gms)",
        fat: 0.5,
        cholesterol:0,
        calories:85
      
      },
      { 
           
        food: "Wheat Paratha (1 med/50gm)",
        fat: 10,
        cholesterol:0,
        calories:120
      
      },
      {
     
        food: "Puri (1 med/25 gm)",
        fat: 5,
        cholesterol:0,
        calories:150
      },
      {
        food: "Rice (Boiled/Steamed) (100 gm/1 katori)",
        fat: 0.5,
        cholesterol:0,
        calories:110
      },
      {
      
        food: "Rice Pulao (150 gm/1 katori)",
        fat: 10.5,
        cholesterol:0,
        calories:180
      },
      {
      
        food: "Rice Brown (1 katori)",
        fat: 1,
        cholesterol:0,
        calories:116
      },
      {
        
        food: "Kichri (100 gm/1 katori)",
        fat: 7,
        cholesterol:0,
        calories:215
      },
      {
        
        food: "Idli (Sooji/Rice) (115 gm/Two)",
        fat: 0.6,
        cholesterol:0,
        calories:155
      },
      {
        
        food: "Dosa Plain (85 gm)",
        fat: 7,
        cholesterol:0,
        calories:255
      },
      {
        
        food: "Upma (130 gm/1 katori)",
        fat: 9,
        cholesterol:0,
        calories:210
      },
      {
        
        food: "Missi Roti (1/35 gm)",
        fat: 1.1,
        cholesterol:0,
        calories:90
      },
      {
        
        food: "Noodles (boiled) (1 cup)",
        fat: 0.9,
        cholesterol:0,
        calories:200
      },
      {
        
        food: "Spaghetti& Meat Balls (1 cup)",
        fat: 9,
        cholesterol:40,
        calories:330
      },
      
      {
        
        food: "Macroni (boiled) (1 cup)",
        fat: 0.9,
        cholesterol:0,
        calories:190
      },
      {
        
        food: "Bread Roll (1 medium)",
        fat: 1.5,
        cholesterol:0,
        calories:155
      },
      {
        
        food: "Bread White (1 slice/25 gm)",
        fat: 0.1,
        cholesterol:0,
        calories:70
      },
      {
        
        food: "Bread Brown (1 slice/25 gm)",
        fat: 0.3,
        cholesterol:0,
        calories:65
      },
    
      {
        
        food: "Corn Flakes (20 gm)",
        fat: 0.4,
        cholesterol:0,
        calories:80
      },
      {
        
        food: "Oats (quick cooked) (25 gm)",
        fat: 1.9,
        cholesterol:0,
        calories:93
      },
      {
        
        food: "Barley (uncooked) (25 gm)",
        fat: 0.3,
        cholesterol:0,
        calories:84
      },
     
    ]
  },
  {
    id:5,
    title: "Pulses",
    subTitle: "Here is calories which you Gain when you taking Cereals.",
    image: require('../../../../assets/user/Calorieveg/pulses.png'),
    calorie:[
      {
        
        food: "Bengal Gram Roasted(Bhuna chana 100 gm)",
        fat: 5.2,
        cholesterol:0,
        calories:69
      
      },
      { 
           
        food: "Bengal Gram cooked(1 katori/12 gm)",
        fat: 5.0,
        cholesterol:0,
        calories:125
      
      },
      {
     
        food: "Black Gram cooked(120 gm)",
        fat: 5.0,
        cholesterol:0,
        calories:125
      },
      {
        food: "Lentil/Broken Dals (140 gm/1 katori)",
        fat: 4.0,
        cholesterol:0,
        calories:160
      },
      {
      
        food: "Sambhar (160 gm/1 katori)",
        fat: 4.0,
        cholesterol:8,
        calories:80
      },
      {
      
        food: "Moong & Mouth Sprouts (30 gm)",
        fat: 0.3,
        cholesterol:0,
        calories:23
      },
      {
        
        food: "Mixed Pulses with half cup cooked rice (1 katori)",
        fat: 4.1,
        cholesterol:0,
        calories:223
      },
         
    ]
  },
  {
    id:6,
    title: "Vegetables",
    subTitle: "Here is calories which you Gain when you taking vegitables.",
    image: require('../../../../assets/user/Calorieveg/vegitable.png'),
    calorie:[
      {
        
        food: "Potato (Fresh) (100gms)",
        fat: 0.1,
        cholesterol:0,
        calories:97
      
      },
      { 
           
        food: "Potato (mashed with milk & butter)(half cup)",
        fat: 0.1,
        cholesterol:0,
        calories:97
      
      },
      {
     
        food: "Potato (baked) (1 large)",
        fat: 0,
        cholesterol:0,
        calories:90
      },
      {
        food: "Potato (boiled) (1 large)",
        fat: 0,
        cholesterol:0,
        calories:90
      },
      {
      
        food: "Potato & veg curry (100 gm)",
        fat: 6,
        cholesterol:0,
        calories:120
      },
      {
      
        food: "Potato Chips (10)",
        fat: 5,
        cholesterol:0,
        calories:115
      },
      {
        
        food: "Sweet Potatoes (Boiled) (1 med.)",
        fat: 0,
        cholesterol:0,
        calories:120
      },
      {
        
        food: "Stuﬀed & baked",
        fat: 4,
        cholesterol:23.0,
        calories:60
      },
      {
        
        food: "Fresh (Medium)",
        fat: 0,
        cholesterol:0,
        calories:25
      },
      {
        
        food: "Tomato ketchup (1tbsp)",
        fat: 0,
        cholesterol:0,
        calories:15
      },
      {
        
        food: "Onion (Half cup sliced)",
        fat: 0,
        cholesterol:0,
        calories:23
      },
      {
        
        food: "Peas (half cup fresh boiled)",
        fat: 0,
        cholesterol:0,
        calories:55
      },
      {
        
        food: "Carrot (half cup/1 fresh)",
        fat: 0.2,
        cholesterol:0,
        calories:25
      },
      {
        
        food: "Cabbage (Shredded 1 cup)",
        fat: 0,
        cholesterol:0,
        calories:12
      },
      {
        
        food: "Corn (small)",
        fat: 0,
        cholesterol:0,
        calories:70
      },
      {
        
        food: "Cucumber 6 slices",
        fat: 0,
        cholesterol:0,
        calories:5
      },
      {
        
        food: "Cauliﬂower (half cup boiled)",
        fat: 0,
        cholesterol:0,
        calories:15
      },
      {
        
        food: "Pumpkin (half cup cooked)",
        fat: 0,
        cholesterol:0,
        calories:33
      },
      {
        
        food: "Beans (French green)(100 bm boiled)",
        fat: 0,
        cholesterol:0,
        calories:30
      },
      {
        
        food: "Brinjal (100 gm cooked)",
        fat: 2,
        cholesterol:0,
        calories:70
      },
      {
        
        food: "Brocoli (half cup)",
        fat: 0,
        cholesterol:0,
        calories:20
      },
      {
        
        food: "Baked Beans (half cup)",
        fat: 0,
        cholesterol:0,
        calories:155
      },
      {
        
        food: "Lettuce (two leaves)",
        fat: 0,
        cholesterol:0,
        calories:3
      },
      {
        
        food: "Beets (half cup)",
        fat: 0,
        cholesterol:0,
        calories:28
      },
      {
        
        food: "Mushroom (half cup)",
        fat: 0,
        cholesterol:0,
        calories:10
      },
      {
        
        food: "Radish (Red) (4 small)",
        fat: 0,
        cholesterol:0,
        calories:5
      },
      {
        
        food: "Spinach (half cup cooked)",
        fat: 7,
        cholesterol:0,
        calories:20
      },
         
    ]
  },
  {
    id:7,
    title: "Soups",
    subTitle: "Here is calories which you Gain when you taking soups.",
    image: require('../../../../assets/user/Calorieveg/soup.png'),
    calorie:[
      {
        food: "Onion(1 cup)",
        fat: 1.3,
        cholesterol:0,
        calories:57
      },
      {
        food: "Tomato(1 cup)",
        fat: 1.9,
        cholesterol:0,
        calories:86
      },
      
    ]
    
  },
  {
    id:8,
    title: "Salad Dressing",
    subTitle: "Here is calories which you Gain when you taking Salad.",
    image: require('../../../../assets/user/Calorieveg/salad.png'),
    calorie:[
      {
        
        food: "French (low cal)(1tbsp)",
        fat: 0.9,
        cholesterol:1,
        calories:22
      
      },
      {        
        food: "French (regular)(1tbsp)",
        fat:6.4,
        cholesterol:9,
        calories:67
      
      },
      {
     
        food: "Mayonnaise(1tbsp)",
        fat: 11,
        cholesterol:8,
        calories:100
      },
      {
        food: "Thosand island (regular)(1tbsp)",
        fat: 5.6,
        cholesterol:4,
        calories:59
      },
      {
        food: "Italian (regular)(1tbsp)",
        fat: 7.1,
        cholesterol:10,
        calories:69
      },
      
    ]
  },

];

const Cveg = () => {

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

export default Cveg

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