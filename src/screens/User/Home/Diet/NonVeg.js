import { StyleSheet, SafeAreaView, View, TouchableOpacity, FlatList,Text } from 'react-native'
import React,{useState} from 'react'
import { black, green1, grey, white } from '../../../../../lib/colors'
import CustomText from '../../../../components/CustomText'
import CustomImage from '../../../../components/CustomImage'
import { navigationRef } from '../../../../../lib/RootNavigation'
import appStrings from '../../../../../lib/appStrings'
import UserAxios from '../../../../components/WsHelper/UserAxios'
import Loader from '../../../../components/Loader'
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '../../../../components/AsyncStorage'
import AsyncStorageKeys from '../../../../../lib/AsyncStorageKeys'
import { Icon } from 'react-native-elements'
import moment from 'moment'

// const data = [
//   {
//     day: 1,
//     mealDescription: 'Here is your Day 1 Meal',
//     protein: '200g',
//     carbs: '50g',
//     image: require('../../../../../assets/user/nonveg1.png'),
//     meals: [
//       {
//         id: 1,
//         mealTime: 'Morning',
//         time: '6:00am - 7:00am',
//         protein: '0.2gm',
//         carbs: '10gm',
//         diet1: 'Chia-lemon water',
//         subd1: 'Take 1 glass without sugar and salt.Chia-lemon combination helps to boost metabolic rate',
//         diet2: 'Soaked Almonds',
//         subd2: 'Soaked almonds (4-5),soaked walnuts(2).',
//         image1: require('../../../../../assets/user/diet/nonveg/nv1.png'),
//       },
//       {
//         id: 2,
//         mealTime: 'Breakfast',
//         time: '8:00am - 9:00am',
//         protein: '0.2gm',
//         carbs: '10gm',
//         diet1: 'Oats cheela',
//         subd1: '(1-2 in number) Use 2 tbsp oats paste mix with curd + plenty on vegetables + Coriander mint chutney',
//         image1: require('../../../../../assets/user/diet/nonveg/nv2.png'),
//       },
//       {
//         id: 3,
//         mealTime: 'Mid Meal',
//         time: '11:00am - 12:00am',
//         protein: '0.2gm',
//         carbs: '10gm',
//         diet1: 'Fruit',
//         subd1: '1 cut apple',
//         image1: require('../../../../../assets/user/diet/nonveg/nv3.png'),
//       },

//       {
//         id: 4,
//         mealTime: 'Lunch',
//         time: '1:00pm - 2:00pm',
//         protein: '0.2gm',
//         carbs: '10gm',
//         diet1: 'Full Meal',
//         subd1: 'Multigrain Roti(2 in no.) + egg bhurji(1 bowl) + carrot-onion salad(1 quarter plate).',
//         image1: require('../../../../../assets/user/diet/nonveg/nv4.png'),

//       },
//       {
//         id: 5,
//         mealTime: 'Evening',
//         time: 'Around 4:00pm',
//         protein: '0.2gm',
//         carbs: '10gm',
//         diet1: 'Tea',
//         subd1: 'Lemon Tea (1 cup) These detox teas help to reduce ﬂuid reten on from your body which is known as water weight.',
//         image1: require('../../../../../assets/user/diet/nonveg/nv5.png'),

//       },
//       {
//         id: 6,
//         mealTime: 'Late Evening',
//         time: '6:00pm',
//         protein: '0.2gm',
//         carbs: '10gm',
//         diet1: 'PCOSLite',
//         subd1: '2 scoops of 20gm each in 250ml water.',
//         image1: require('../../../../../assets/user/diet/nonveg/nv6.png'),

//       },
//       {
//         id: 7,
//         mealTime: 'Dinner',
//         time: '8:00 pm - 9:00 pm',
//         protein: '0.2gm',
//         carbs: '10gm',
//         diet1: 'Mix soya bowl salad',
//         subd1: '75gms of boiled soya chunks mixed with sauteed broccoli,bell peppers,carrot (for dressing use mint-coriander spreads) ( 1 quarter plate)',
//         image1: require('../../../../../assets/user/diet/nonveg/nv7.png'),
//       },

//       {
//         id: 8,
//         mealTime: 'Post Dinner',
//         time: '9:30 pm',
//         protein: '0.2gm',
//         carbs: '10gm',
//         diet1: 'Fennel seeds water',
//         subd1: 'Add 1 teaspoon of fennel seeds in 1 glass of water, boil, sieve & have. saunf help in reduce fat storage by improving vitamin and mineral absorption in the body',
//         image1: require('../../../../../assets/user/diet/nonveg/nv8.png'),
//       },

//     ],
//   },
//   {
//     day: 2,
//     mealDescription: 'Here is your Day 2 Meal',
//     protein: '200g',
//     carbs: '50g',
//     image: require('../../../../../assets/user/nonveg1.png'),
//     meals: [
//       {
//         id: 9,
//         mealTime: 'Morning',
//         time: '6:00am - 7:00am',
//         protein: '0.2gm',
//         carbs: '10gm',
//         diet1: 'Chia-lemon water',
//         subd1: 'Take 1 glass without sugar and salt.Chia-lemon combination helps to boost metabolic rate',
//         diet2: 'Soaked Almonds',
//         subd2: 'Soaked almonds (4-5),soaked walnuts(2).',
//         image1: require('../../../../../assets/user/diet/nonveg/nv1.png'),
//       },
//       {
//         id: 10,
//         mealTime: 'Breakfast',
//         time: '8:00am - 9:00am',
//         protein: '0.2gm',
//         carbs: '10gm',
//         diet1: 'Quinoa and Egg Bowl',
//         subd1: 'Add sautéed vegetables like broccoli, zucchini, and carrots for extra ﬁber and nutrients.',
//         image1: require('../../../../../assets/user/diet/nonveg/21.png'),
//       },
//       {
//         id: 11,
//         mealTime: 'Mid Meal',
//         time: '11:00am - 12:00am',
//         protein: '0.2gm',
//         carbs: '10gm',
//         diet1: 'Fruit',
//         subd1: '1 Bowl cut papaya.',
//         image1: require('../../../../../assets/user/diet/nonveg/22.png'),

//       },

//       {
//         id: 12,
//         mealTime: 'Lunch',
//         time: '1:00pm - 2:00pm',
//         protein: '0.2gm',
//         carbs: '10gm',
//         diet1: 'Full Meal',
//         subd1: 'Multigrain roti(2 in no.) + Seasonal vegetables(1 bowl) + zeera raita(1 bowl) + carrot salad(1 quarter plate)',
//         image1: require('../../../../../assets/user/diet/nonveg/23.png'),

//       },
//       {
//         id: 13,
//         mealTime: 'Evening',
//         time: 'Around 4:00pm',
//         protein: '0.2gm',
//         carbs: '10gm',
//         diet1: 'Tea',
//         subd1: 'Lemon Tea (1 cup) These detox teas help to reduce ﬂuid reten on from your body which is known as water weight.',
//         image1: require('../../../../../assets/user/diet/nonveg/nv5.png'),

//       },
//       {
//         id: 14,
//         mealTime: 'Late Evening',
//         time: '6:00pm',
//         protein: '0.2gm',
//         carbs: '10gm',
//         diet1: 'PCOSLite',
//         subd1: '2 scoops of 20gm each in 250ml water.',
//         image1: require('../../../../../assets/user/diet/nonveg/nv6.png'),

//       },
//       {
//         id: 15,
//         mealTime: 'Dinner',
//         time: '8:00 pm - 9:00 pm',
//         protein: '0.2gm',
//         carbs: '10gm',
//         diet1: 'Cauliﬂower mix veg pulao',
//         subd1: 'Use 2 tablespoon chopped cauliﬂower instead of rice cooked with beans, onion, tomatoes, carrot)+mint raita (1 bowl) + onion radish salad(1 quarter plate)',
//         image1: require('../../../../../assets/user/diet/nonveg/24.png'),
//       },

//       {
//         id: 16,
//         mealTime: 'Post Dinner',
//         time: '9:30 pm',
//         protein: '0.2gm',
//         carbs: '10gm',
//         diet1: 'Fennel seeds water',
//         subd1: 'Add 1 teaspoon of fennel seeds in 1 glass of water, boil, sieve & have. saunf help in reduce fat storage by improving vitamin and mineral absorption in the body',
//         image1: require('../../../../../assets/user/diet/nonveg/nv8.png'),
//       },

//     ],

//   },
//   {
//     day: 3,
//     mealDescription: 'Here is your Day 3 Meal',
//     protein: '200g',
//     carbs: '50g',
//     image: require('../../../../../assets/user/nonveg1.png'),
//     meals: [
//       {
//         id: 17,
//         mealTime: 'Morning',
//         time: '6:00am - 7:00am',
//         protein: '0.2gm',
//         carbs: '10gm',
//         diet1: 'Chia-lemon water',
//         subd1: 'Take 1 glass without sugar and salt.Chia-lemon combination helps to boost metabolic rate',
//         diet2: 'Soaked Almonds',
//         subd2: 'Soaked almonds (4-5),soaked walnuts(2).',
//         image1: require('../../../../../assets/user/diet/nonveg/nv1.png'),
//       },
//       {
//         id: 18,
//         mealTime: 'Breakfast',
//         time: '8:00am - 9:00am',
//         protein: '0.2gm',
//         carbs: '10gm',
//         diet1: 'Sandwich',
//         subd1: 'Multigrain Grilled Chicken Sandwich(1 in no.) + salty lemon Water(1 glass)',
//         image1: require('../../../../../assets/user/diet/nonveg/31.png'),
//       },
//       {
//         id: 19,
//         mealTime: 'Mid Meal',
//         time: '11:00am - 12:00am',
//         protein: '0.2gm',
//         carbs: '10gm',
//         diet1: 'Coconut water',
//         subd1: 'Fresh coconut water (1 glass).',
//         image1: require('../../../../../assets/user/diet/nonveg/32.png'),
//       },

//       {
//         id: 20,
//         mealTime: 'Lunch',
//         time: '1:00pm - 2:00pm',
//         protein: '0.2gm',
//         carbs: '10gm',
//         diet1: 'Full Meal',
//         subd1: 'Oats - moong Khichdi (1 quarter plate) add lots of vegetables + salad(1 quarter plate)',
//         image1: require('../../../../../assets/user/diet/nonveg/33.png'),

//       },
//       {
//         id: 21,
//         mealTime: 'Evening',
//         time: 'Around 4:00pm',
//         protein: '0.2gm',
//         carbs: '10gm',
//         diet1: 'Tea',
//         subd1: 'Lemon Tea (1 cup) These detox teas help to reduce ﬂuid reten on from your body which is known as water weight.',
//         image1: require('../../../../../assets/user/diet/nonveg/nv5.png'),

//       },
//       {
//         id: 22,
//         mealTime: 'Late Evening',
//         time: '6:00pm',
//         protein: '0.2gm',
//         carbs: '10gm',
//         diet1: 'PCOSLite',
//         subd1: '2 scoops of 20gm each in 250ml water.',
//         image1: require('../../../../../assets/user/diet/nonveg/nv6.png'),
//       },
//       {
//         id: 23,
//         mealTime: 'Dinner',
//         time: '8:00 pm - 9:00 pm',
//         protein: '0.2gm',
//         carbs: '10gm',
//         diet1: 'Broccoli - green salad',
//         subd1: 'mix with broccoli, beetroot, onion, cucumber, tomato + 1 tsp of pumpkin seeds(1 bowl)',
//         image1: require('../../../../../assets/user/diet/nonveg/34.png'),
//       },

//       {
//         id: 24,
//         mealTime: 'Post Dinner',
//         time: '9:30 pm',
//         protein: '0.2gm',
//         carbs: '10gm',
//         diet1: 'Fennel seeds water',
//         subd1: 'Add 1 teaspoon of fennel seeds in 1 glass of water, boil, sieve & have. saunf help in reduce fat storage by improving vitamin and mineral absorption in the body',
//         image1: require('../../../../../assets/user/diet/nonveg/nv8.png'),
//       },

//     ],
//   },
//   {
//     day: 4,
//     mealDescription: 'Here is your Day 4 Meal',
//     protein: '200g',
//     carbs: '50g',
//     image: require('../../../../../assets/user/nonveg1.png'),
//     meals: [
//       {
//         id: 25,
//         mealTime: 'Morning',
//         time: '6:00am - 7:00am',
//         protein: '0.2gm',
//         carbs: '10gm',
//         diet1: 'Chia-lemon water',
//         subd1: 'Take 1 glass without sugar and salt.Chia-lemon combination helps to boost metabolic rate',
//         diet2: 'Soaked Almonds',
//         subd2: 'Soaked almonds (4-5),soaked walnuts(2).',
//         image1: require('../../../../../assets/user/diet/nonveg/nv1.png'),
//       },
//       {
//         id: 26,
//         mealTime: 'Breakfast',
//         time: '8:00am - 9:00am',
//         protein: '0.2gm',
//         carbs: '10gm',
//         diet1: 'Raw papaya beans bowl',
//         subd1: '2 tbsp boiled black beans + 2 tbsp raw papaya salad + some ﬁnely chopped vegetables of your choice + 2 tsp lemon juice + pinch of salt and black pepper',
//         image1: require('../../../../../assets/user/diet/nonveg/41.png'),
//       },
//       {
//         id: 27,
//         mealTime: 'Mid Meal',
//         time: '11:00am - 12:00am',
//         protein: '0.2gm',
//         carbs: '10gm',
//         diet1: 'Seeds',
//         subd1: 'Flax seed + pumpkin seeds (1 tablespoon)',
//         image1: require('../../../../../assets/user/diet/nonveg/42.png'),
//       },

//       {
//         id: 28,
//         mealTime: 'Lunch',
//         time: '1:00pm - 2:00pm',
//         protein: '0.2gm',
//         carbs: '10gm',
//         diet1: 'Full Meal',
//         subd1: 'Multigrain roti (1 in no) + chicken curry (2 psc)(1 bowl) + salad (1 quarter plate)',
//         image1: require('../../../../../assets/user/diet/nonveg/43.png'),

//       },
//       {
//         id: 29,
//         mealTime: 'Evening',
//         time: 'Around 4:00pm',
//         protein: '0.2gm',
//         carbs: '10gm',
//         diet1: 'Tea',
//         subd1: 'Lemon Tea (1 cup) These detox teas help to reduce ﬂuid reten on from your body which is known as water weight.',
//         image1: require('../../../../../assets/user/diet/nonveg/nv5.png'),

//       },
//       {
//         id: 30,
//         mealTime: 'Late Evening',
//         time: '6:00pm',
//         protein: '0.2gm',
//         carbs: '10gm',
//         diet1: 'PCOSLite',
//         subd1: '2 scoops of 20gm each in 250ml water.',
//         image1: require('../../../../../assets/user/diet/nonveg/nv6.png'),
//       },
//       {
//         id: 31,
//         mealTime: 'Dinner',
//         time: '8:00 pm - 9:00 pm',
//         protein: '0.2gm',
//         carbs: '10gm',
//         diet1: 'Mix vegetable soup',
//         subd1: 'add chopped cauliﬂower, cabbage, tomatoes, carrot, green chillies (1 big bowl) + multigrain bread (1 slice)',
//         image1: require('../../../../../assets/user/diet/nonveg/44.png'),
//       },

//       {
//         id: 32,
//         mealTime: 'Post Dinner',
//         time: '9:30 pm',
//         protein: '0.2gm',
//         carbs: '10gm',
//         diet1: 'Fennel seeds water',
//         subd1: 'Add 1 teaspoon of fennel seeds in 1 glass of water, boil, sieve & have. saunf help in reduce fat storage by improving vitamin and mineral absorption in the body',
//         image1: require('../../../../../assets/user/diet/nonveg/nv8.png'),
//       },

//     ],
//   },
//   {
//     day: 5,
//     mealDescription: 'Here is your Day 5 Meal',
//     protein: '200g',
//     carbs: '50g',
//     image: require('../../../../../assets/user/nonveg1.png'),
//     meals: [
//       {
//         id: 33,
//         mealTime: 'Morning',
//         time: '6:00am - 7:00am',
//         protein: '0.2gm',
//         carbs: '10gm',
//         diet1: 'Chia-lemon water',
//         subd1: 'Take 1 glass without sugar and salt.Chia-lemon combination helps to boost metabolic rate',
//         diet2: 'Soaked Almonds',
//         subd2: 'Soaked almonds (4-5),soaked walnuts(2).',
//         image1: require('../../../../../assets/user/diet/nonveg/nv1.png'),
//       },
//       {
//         id: 34,
//         mealTime: 'Breakfast',
//         time: '8:00am - 9:00am',
//         protein: '0.2gm',
//         carbs: '10gm',
//         diet1: 'Fruits',
//         subd1: '1 bowl cut papaya',
//         image1: require('../../../../../assets/user/diet/nonveg/51.png'),
//       },
//       {
//         id: 35,
//         mealTime: 'Mid Meal',
//         time: '11:00am - 12:00am',
//         protein: '0.2gm',
//         carbs: '10gm',
//         diet1: 'Ragi cheela',
//         subd1: '(1 in no) 100% ragi atta + Vegetable stew (1 bowl) made with brinjal + bottle gourd + zucchini + ½ cup moong dal)',
//         image1: require('../../../../../assets/user/diet/nonveg/52.png'),
//       },

//       {
//         id: 36,
//         mealTime: 'Lunch',
//         time: '1:00pm - 2:00pm',
//         protein: '0.2gm',
//         carbs: '10gm',
//         diet1: 'Full Meal',
//         subd1: 'Burrito bowl. 2 tbsp boiled beans + 2 tbsp cooked brown rice (optional) + 50 gm homemade paneer + 1 tbsp hung curd + mixed herbs + pinch of salt and black pepper',
//         image1: require('../../../../../assets/user/diet/nonveg/53.png'),

//       },
//       {
//         id: 37,
//         mealTime: 'Evening',
//         time: 'Around 4:00pm',
//         protein: '0.2gm',
//         carbs: '10gm',
//         diet1: 'Tea',
//         subd1: 'Lemon Tea (1 cup) These detox teas help to reduce ﬂuid reten on from your body which is known as water weight.',
//         image1: require('../../../../../assets/user/diet/nonveg/nv5.png'),

//       },
//       {
//         id: 38,
//         mealTime: 'Late Evening',
//         time: '6:00pm',
//         protein: '0.2gm',
//         carbs: '10gm',
//         diet1: 'PCOSLite',
//         subd1: '2 scoops of 20gm each in 250ml water.',
//         image1: require('../../../../../assets/user/diet/nonveg/nv6.png'),

//       },
//       {
//         id: 39,
//         mealTime: 'Dinner',
//         time: '8:00 pm - 9:00 pm',
//         protein: '0.2gm',
//         carbs: '10gm',
//         diet1: 'Greek Yogurt and Chicken Salad',
//         subd1: 'Mix grilled chicken pieces with Greek yogurt and chopped vegetables like cucumbers, bell peppers, and cherry tomatoes. Sprinkle it with some herbs and a dash of lemon juice.(1 bowl)',
//         image1: require('../../../../../assets/user/diet/nonveg/54.png'),
//       },

//       {
//         id: 40,
//         mealTime: 'Post Dinner',
//         time: '9:30 pm',
//         protein: '0.2gm',
//         carbs: '10gm',
//         diet1: 'Fennel seeds water',
//         subd1: 'Add 1 teaspoon of fennel seeds in 1 glass of water, boil, sieve & have. saunf help in reduce fat storage by improving vitamin and mineral absorption in the body',
//         image1: require('../../../../../assets/user/diet/nonveg/nv8.png'),
//       },

//     ],
//   },

//   {
//     day: 6,
//     mealDescription: 'Here is your Day 6 Meal',
//     protein: '200g',
//     carbs: '50g',
//     image: require('../../../../../assets/user/nonveg1.png'),
//     meals: [
//       {
//         id: 41,
//         mealTime: 'Morning',
//         time: '6:00am - 7:00am',
//         protein: '0.2gm',
//         carbs: '10gm',
//         diet1: 'Chia-lemon water',
//         subd1: 'Take 1 glass without sugar and salt.Chia-lemon combination helps to boost metabolic rate',
//         diet2: 'Soaked Almonds',
//         subd2: 'Soaked almonds (4-5),soaked walnuts(2).',
//         image1: require('../../../../../assets/user/diet/nonveg/nv1.png'),
//       },
//       {
//         id: 42,
//         mealTime: 'Breakfast',
//         time: '8:00am - 9:00am',
//         protein: '0.2gm',
//         carbs: '10gm',
//         diet1: 'Omelette',
//         subd1: 'Egg white omelette (1 in no.) + multigrain toasted bread (2slice.)',
//         image1: require('../../../../../assets/user/diet/nonveg/61.png'),
//       },
//       {
//         id: 43,
//         mealTime: 'Mid Meal',
//         time: '11:00am - 12:00am',
//         protein: '0.2gm',
//         carbs: '10gm',
//         diet1: 'Seeds',
//         subd1: 'Flax seed + pumpkin seeds (1 tablespoon)',
//         image1: require('../../../../../assets/user/diet/nonveg/62.png'),
//       },

//       {
//         id: 44,
//         mealTime: 'Lunch',
//         time: '1:00pm - 2:00pm',
//         protein: '0.2gm',
//         carbs: '10gm',
//         diet1: 'Full Meal',
//         subd1: 'Coriander brown rice (starch removed) (1 quarter plate) + Any dal tadka.(1 bowl) + cucumber salad (1 quarter plate).',
//         image1: require('../../../../../assets/user/diet/nonveg/63.png'),

//       },
//       {
//         id: 45,
//         mealTime: 'Evening',
//         time: 'Around 4:00pm',
//         protein: '0.2gm',
//         carbs: '10gm',
//         diet1: 'Tea',
//         subd1: 'Lemon Tea (1 cup) These detox teas help to reduce ﬂuid reten on from your body which is known as water weight.',
//         image1: require('../../../../../assets/user/diet/nonveg/nv5.png'),

//       },
//       {
//         id: 46,
//         mealTime: 'Late Evening',
//         time: '6:00pm',
//         protein: '0.2gm',
//         carbs: '10gm',
//         diet1: 'PCOSLite',
//         subd1: '2 scoops of 20gm each in 250ml water.',
//         image1: require('../../../../../assets/user/diet/nonveg/nv6.png'),

//       },
//       {
//         id: 47,
//         mealTime: 'Dinner',
//         time: '8:00 pm - 9:00 pm',
//         protein: '0.2gm',
//         carbs: '10gm',
//         diet1: 'Broccoli - green salad',
//         subd1: 'mix with broccoli, beetroot, onion, cucumber, tomato + 1 tsp of pumpkin seeds(1 bowl)',
//         image1: require('../../../../../assets/user/diet/nonveg/64.png'),
//       },

//       {
//         id: 48,
//         mealTime: 'Post Dinner',
//         time: '9:30 pm',
//         protein: '0.2gm',
//         carbs: '10gm',
//         diet1: 'Fennel seeds water',
//         subd1: 'Add 1 teaspoon of fennel seeds in 1 glass of water, boil, sieve & have. saunf help in reduce fat storage by improving vitamin and mineral absorption in the body',
//         image1: require('../../../../../assets/user/diet/nonveg/nv8.png'),
//       },

//     ],
//   },

//   {
//     day: 7,
//     mealDescription: 'Here is your Day 7 Meal',
//     protein: '200g',
//     carbs: '50g',
//     image: require('../../../../../assets/user/nonveg1.png'),
//     meals: [
//       {
//         id: 49,
//         mealTime: 'Morning',
//         time: '6:00am - 7:00am',
//         protein: '0.2gm',
//         carbs: '10gm',
//         diet1: 'Chia-lemon water',
//         subd1: 'Take 1 glass without sugar and salt.Chia-lemon combination helps to boost metabolic rate',
//         diet2: 'Soaked Almonds',
//         subd2: 'Soaked almonds (4-5),soaked walnuts(2).',
//         image1: require('../../../../../assets/user/diet/nonveg/nv1.png'),
//       },
//       {
//         id: 50,
//         mealTime: 'Breakfast',
//         time: '8:00am - 9:00am',
//         protein: '0.2gm',
//         carbs: '10gm',
//         diet1: 'Green moong chaat',
//         subd1: '(more of veggies) 1 bowl, 2 tablespoon boiled green moong, add ﬁnely chopped vegetables + 1tsp lemon juice',
//         image1: require('../../../../../assets/user/diet/nonveg/71.png'),
//       },
//       {
//         id: 51,
//         mealTime: 'Mid Meal',
//         time: '11:00am - 12:00am',
//         protein: '0.2gm',
//         carbs: '10gm',
//         diet1: 'Fruits',
//         subd1: '1 cut Apple',
//         image1: require('../../../../../assets/user/diet/nonveg/nv3.png'),
//       },

//       {
//         id: 52,
//         mealTime: 'Lunch',
//         time: '1:00pm - 2:00pm',
//         protein: '0.2gm',
//         carbs: '10gm',
//         diet1: 'Full Meal',
//         subd1: 'Coriander brown rice (starch removed) (1 quarter plate ) + ﬁsh curry (2psc) + cucumber salad (1 quarter plate)',
//         image1: require('../../../../../assets/user/diet/nonveg/72.png'),

//       },
//       {
//         id: 53,
//         mealTime: 'Evening',
//         time: 'Around 4:00pm',
//         protein: '0.2gm',
//         carbs: '10gm',
//         diet1: 'Tea',
//         subd1: 'Lemon Tea (1 cup) These detox teas help to reduce ﬂuid reten on from your body which is known as water weight.',
//         image1: require('../../../../../assets/user/diet/nonveg/nv5.png'),

//       },
//       {
//         id: 54,
//         mealTime: 'Late Evening',
//         time: '6:00pm',
//         protein: '0.2gm',
//         carbs: '10gm',
//         diet1: 'PCOSLite',
//         subd1: '2 scoops of 20gm each in 250ml water.',
//         image1: require('../../../../../assets/user/diet/nonveg/nv6.png'),

//       },
//       {
//         id: 55,
//         mealTime: 'Dinner',
//         time: '8:00 pm - 9:00 pm',
//         protein: '0.2gm',
//         carbs: '10gm',
//         diet1: 'Vegetable mushroom salad',
//         subd1: '½ diced cucumber + ½ diced beetroot + 1 small onion + 5-6 mushroom + pinch of salt and black pepper - Saute the onions and mushrooms before combining.',
//         image1: require('../../../../../assets/user/diet/nonveg/73.png'),
//       },

//       {
//         id: 56,
//         mealTime: 'Post Dinner',
//         time: '9:30 pm',
//         protein: '0.2gm',
//         carbs: '10gm',
//         diet1: 'Fennel seeds water',
//         subd1: 'Add 1 teaspoon of fennel seeds in 1 glass of water, boil, sieve & have. saunf help in reduce fat storage by improving vitamin and mineral absorption in the body',
//         image1: require('../../../../../assets/user/diet/nonveg/nv8.png'),
//       },

//     ],
//   },

// ];

const NonVeg = () => {
  const [nonvegDaysData, setNonVegDaysData] = useState([]);
  const [showProgress, setShowProgress] = useState(false);
  const [currentMonth,setCurrentMonth] = useState(0)
  const [currentYear,setCurrentYear] = useState(0)
  const [monthlyDiet,setMonthlyDiet] = useState([])
  useFocusEffect(
    React.useCallback(() => {
      let days = moment().daysInMonth()
      let month = moment().month()+1
      let year = moment().year();
      setCurrentMonth(month)
      setCurrentYear(year)
      monthlyDietList(month,year)
      NonVegDaysList(days);
      return () => false;
    }, [])
  );
  const monthlyDietList=async(month,year)=>{
    const id = await AsyncStorage.getData(AsyncStorageKeys.patient_id);
    const patientid = JSON.parse(id) || [];
    const apiEndPoint = appStrings.screens.api_names.monthly_diet_list.replace('${patient_id}',patientid).replace("${month}",month).replace('${year}',year).replace('${type}',"2")
    setShowProgress(true);
  
    let inputParams = {};
    UserAxios.getResponse(
      apiEndPoint,
      inputParams,
      "get",
      (response, error) => {
        if (!error) {
          if (!response.error) {
            console.log("response----->", response);
            setMonthlyDiet(response.data)

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
  const NonVegDaysList = async (daysInMonth) => {
    const id = await AsyncStorage.getData(AsyncStorageKeys.patient_id);
    const patientid = JSON.parse(id) || [];

    setShowProgress(true);

    let inputParams = {};
    UserAxios.getResponse(
      `${appStrings.screens.api_names.diet_days_list}`,
      inputParams,
      "get",
      (response, error) => {
        if (!error) {
          if (!response.error) {
            console.log("response", response);
            let diet = []
            let count = 0;
            for(let i=1;i<=daysInMonth;i++){
              diet.push(response.data[count])
              count++
              if(count==7){
                count=0;
              }
            }
            // setVegDaysData(diet)
            setNonVegDaysData(diet)

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
  const getCompletedDiet=(ind)=>{
    let completed = [];
    let dateToday = new Date(currentYear,currentMonth-1,1);
    let _date = new Date(dateToday.setDate(dateToday.getDate()+ind+1))
    if(monthlyDiet.length === 0){
      return false
    }
    else{
      completed = monthlyDiet.find(diet=>{
        let dietDate = moment(diet.date).add(1,'day').startOf('day');
        let calendarDate = moment(_date,'DD-MM-YYYY').startOf('day');
        return calendarDate.isSame(dietDate)       
        }
      )
    }
    if(completed){
      return completed
    }
  }

  const getDietCountList=()=>{
    let dietSteps=['M','B','MM','L','E','LE','D','PD']
    return dietSteps
 }

  const renderItem = ({ item,index }) => {
    const completed = getCompletedDiet(index);
    var dietSteps = getDietCountList()
    return (
      <View style={[styles.listItem,{backgroundColor:completed?.status ? green1 : !completed &&  index+1 == moment().date() ? "#FFF4D6" : white }]}>
        <TouchableOpacity activeOpacity={0.7}
          onPress={() =>{
            // if (moment().day() >= index + 1) { 
              navigationRef.current?.navigate(appStrings.screens.appStrings.nonvegDiet, { "item": item.id, "type":2, "index":index+1,"month":currentMonth,'year':currentYear })
            // }
          }}>
          <View style={styles.row}>
            <View style={{ backgroundColor: "#92F6AE", height: 105, width: 78, top:completed?.status ? -10 : -10, left: 10 }}>
              <View style={styles.imageContainer}>
                <CustomImage
                  source={require('../../../../../assets/user/nonveg2.png')}
                  resizeMode="contain"
                  style={styles.image}
                />
              </View>
            </View>
            <View style={styles.textContainer}>
              <CustomText style={[styles.dayTitle,{color:completed?.status ? white : black}]}>DAY {index+1}</CustomText>
              <CustomText style={[styles.description,{color:completed?.status ? white : black}]}>Here is your {index+1} Meal </CustomText>
             
              {
             completed?.status ? (
                <>
                 <View style={{flexDirection:"row"}}>
               
               <CustomText style={[styles.description,{color:completed?.status ? white : black,fontWeight:"bold"}]}>Completed</CustomText>
               {
            completed?.status ? (
               <Icon name="checkbox-marked" type="material-community" color={completed?.status ? white:grey} size={24} style={{marginTop:8,left:5}} />        
             ):null
           }
           </View>
                </>
              ):null
             }
             
            </View>
          </View>
            {/*  */}
            <View style={{marginTop:10,flexDirection:'row',alignItems:'center'}}>
              {
              dietSteps.map((item,index)=>{
                return(
                  <View style={{ 
                     width:28,
                     height:28,
                    borderRadius: 50,
                    marginRight:8,
                    alignItems:'center',
                    justifyContent:'center',
                    borderWidth:1,
                    // borderColor: "#000",
                    backgroundColor:"green",
                    borderColor:completed && completed?.diets[index].mealStatus ==1 ? "white" : "#000",
                    backgroundColor:completed && completed?.diets[index].mealStatus ==1 ? "green" : "white"
                    }}>
                    <Text style={{color:completed && completed?.diets[index].mealStatus ==1 ? "#fff":"#000" ,fontSize:10}}>{item}</Text>
                    </View>
                )
              })
            }
          </View>
        </TouchableOpacity>

      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <CustomText style={{ fontSize: 20, margin: 20 }}>Here, is your Non Veg Diet Plan.</CustomText>
        <View style={{ right: 15 }}>
          <CustomImage
            source={require('../../../../../assets/user/NonVegIcon.png')}
            resizeMode="contain"
            style={{ width: 21, height: 21,borderRadius:0, alignSelf: 'center', marginTop: 25 }}
          />
        </View>
      </View>

      <FlatList
        data={nonvegDaysData}
        renderItem={renderItem}
        keyExtractor={(item,index) => item.day+index}
      />

<Loader showHud={showProgress} />
    </SafeAreaView>
  )
}

export default NonVeg

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    marginTop: '2%',
    alignSelf: 'center',
  },
  image: {
    width: 130,
    height: 125,
    top: 20,
    alignSelf: 'center',
  },
  listItem: {
    padding: 10,
    shadowColor: black,
    shadowOffset: { width: 1, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.65,
    elevation: 6,
    //backgroundColor: white,
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
    left: 40,
    width: '60%',
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
    color: grey,
    marginTop: 10,
  },

})