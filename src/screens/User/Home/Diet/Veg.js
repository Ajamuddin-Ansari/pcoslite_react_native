import { StyleSheet, SafeAreaView, View, TouchableOpacity, FlatList ,Text} from 'react-native'
import React, { useState } from 'react'
import { black, green1, grey, grey_border, white } from '../../../../../lib/colors'
import CustomText from '../../../../components/CustomText'
import CustomImage from '../../../../components/CustomImage'
import { navigationRef } from '../../../../../lib/RootNavigation'
import appStrings from '../../../../../lib/appStrings'
import { useFocusEffect } from '@react-navigation/native';
import Loader from '../../../../components/Loader'
import UserAxios from '../../../../components/WsHelper/UserAxios'
import AsyncStorageKeys from '../../../../../lib/AsyncStorageKeys'
import AsyncStorage from '../../../../components/AsyncStorage'
import { Icon } from 'react-native-elements'
import moment from 'moment';
import { Dropdown } from 'react-native-element-dropdown'

// const data = [
//   {
//     day: 1,
//     mealDescription: 'Here is your Day 1 Meal',
//     protein: '200g',
//     carbs: '50g',
//     image: require('../../../../../assets/user/meal.png'),
//     meals: [
//       {
//         id: 1,
//         mealTime: 'Morning',
//         time: '6:00am - 7:00am',
//         protein: '0.2gm',
//         carbs: '10gm',
//         diet1: '1 Glass Zeera Water',
//         subd1: 'Soak 1 tablespoon of zeera seeds overnight, sieve and have(zeera helps body to burn fat effectively)',
//         diet2: 'Soaked Almonds',
//         subd2: 'Soaked almonds (4-5),soaked walnuts(2).',
//         image1: require('../../../../../assets/user/diet/day1/1.png'),

//       },
//       {
//         id: 2,
//         mealTime: 'Breakfast',
//         time: '8:00am - 9:00am',
//         protein: '0.2gm',
//         carbs: '10gm',
//         diet1: 'Sandwich',
//         subd1: 'Onion-cucumber sandwich (2 in no.)(multigrain bread)(stuﬀed with onion and cucumber with mint coriander spread + Salted lemon water (1glass)(Without sugar)',
//         image1: require('../../../../../assets/user/diet/day1/2.png'),

//       },
//       {
//         id: 3,
//         mealTime: 'Mid Meal',
//         time: '11:00am - 12:00am',
//         protein: '0.2gm',
//         carbs: '10gm',
//         diet1: 'Fruit',
//         subd1: 'Any one fruit opt form fruits like apple /jamun /cherries /pomegranate /papaya',
//         image1: require('../../../../../assets/user/diet/day1/3.png'),
//       },

//       {
//         id: 4,
//         mealTime: 'Lunch',
//         time: '1:00pm - 2:00pm',
//         protein: '0.2gm',
//         carbs: '10gm',
//         diet1: 'Full Meal',
//         subd1: 'Multigrain roti (1 in no.), stuffed with grated veggies, moong dal palak (1 Bowl), salad (1 quater plate).',
//         image1: require('../../../../../assets/user/diet/day1/4.png'),

//       },
//       {
//         id: 5,
//         mealTime: 'Evening',
//         time: 'Around 4:00pm',
//         protein: '0.2gm',
//         carbs: '10gm',
//         diet1: 'Tea',
//         subd1: 'Green tea /lemon tea (1 cup) these detox teas helps to reduce fluid retention from your body which is known as water weight.',
//         image1: require('../../../../../assets/user/diet/day1/5.png'),

//       },
//       {
//         id: 6,
//         mealTime: 'Late Evening',
//         time: '6:00pm',
//         protein: '0.2gm',
//         carbs: '10gm',
//         diet1: 'PCOSLite',
//         subd1: '2 scoops of 20gm each in 250ml water.',
//         image1: require('../../../../../assets/user/diet/day1/6.png'),

//       },
//       {

//         id: 7,
//         mealTime: 'Dinner',
//         time: '8:00 pm - 9:00 pm',
//         protein: '0.2gm',
//         carbs: '10gm',
//         diet1: 'Paneer-pea salad',
//         subd1: '50 gms paneer, 2 tablespoon boiled peas, onion, tomato,cabbage, cucumber (1 bowl)',
//         image1: require('../../../../../assets/user/diet/day1/7.png'),
//       },

//       {

//         id: 8,
//         mealTime: 'Post Dinner',
//         time: '9:30 pm',
//         protein: '0.2gm',
//         carbs: '10gm',
//         diet1: 'Warm Cinnamon Water',
//         subd1: 'Boil 4-5 cinnamon sticks in 1 glass of water, sieve and have (Cinnamon help in reduce fat storage by improving vitamin and mineral absorption in the body) (Take 1 Glass)',
//         image1: require('../../../../../assets/user/diet/day1/8.png'),
//       },

//     ],
//   },
//   {
//     day: 2,
//     mealDescription: 'Here is your Day 2 Meal',
//     protein: '200g',
//     carbs: '50g',
//     image: require('../../../../../assets/user/meal.png'),
//     meals: [
//       {
//         id: 9,
//         mealTime: 'Morning',
//         time: '6:00am - 7:00am',
//         protein: '0.2gm',
//         carbs: '10gm',
//         diet1: '1 Glass Zeera Water',
//         subd1: 'Soak 1 tablespoon of zeera seeds overnight, sieve and have(zeera helps body to burn fat effectively)',
//         diet2: 'Soaked Almonds',
//         subd2: 'Soaked almonds (4-5),soaked walnuts(2).',
//         image1: require('../../../../../assets/user/diet/day1/1.png'),
//       },
//       {
//         id: 10,
//         mealTime: 'Breakfast',
//         time: '8:00am - 9:00am',
//         protein: '0.2gm',
//         carbs: '10gm',
//         diet1: 'Besan cheela',
//         subd1: '1-2 in number, Use 2 tbsp besan atta + stuﬀ with 50 gm paneer and vegetables. add pinch of salt and pepper with mint-coriander chutney',
//         image1: require('../../../../../assets/user/diet/day1/day21.png'),
//       },
//       {

//         id: 11,
//         mealTime: 'Mid Meal',
//         time: '11:00am - 12:00am',
//         protein: '0.2gm',
//         carbs: '10gm',
//         diet1: 'Flax seeds buttermilk',
//         subd1: '1 tsp Flax seeds in 1 glass of buttermilk (1 glass)',
//         image1: require('../../../../../assets/user/diet/day1/day22.png'),
//       },

//       {
//         id: 12,
//         mealTime: 'Lunch',
//         time: '1:00pm - 2:00pm',
//         protein: '0.2gm',
//         carbs: '10gm',
//         diet1: 'Full Meal',
//         subd1: 'Vegetable Brown Rice Biryani (1 quarter plate) (Starch removed) + radish-cucumber Salad (1 quarter plate) + Mint raita(1 bowl)',
//         image1: require('../../../../../assets/user/diet/day1/day23.png'),

//       },
//       {
//         id: 13,
//         mealTime: 'Evening',
//         time: 'Around 4:00pm',
//         protein: '0.2gm',
//         carbs: '10gm',
//         diet1: 'Tea',
//         subd1: 'Green tea / lemon tea (1 cup) these detox teas helps to reduce fluid retention from your body which is known ad water weight.',
//         image1: require('../../../../../assets/user/diet/day1/5.png'),

//       },
//       {
//         id: 14,
//         mealTime: 'Late Evening',
//         time: '6:00pm',
//         protein: '0.2gm',
//         carbs: '10gm',
//         diet1: 'PCOSLite',
//         subd1: '2 scoops of 20gm each in 250ml water.',
//         image1: require('../../../../../assets/user/diet/day1/6.png'),

//       },
//       {
//         id: 15,
//         mealTime: 'Dinner',
//         time: '8:00 pm - 9:00 pm',
//         protein: '0.2gm',
//         carbs: '10gm',
//         diet1: 'Light Meal',
//         subd1: 'Multigrain roti(2 in no.) + Tori sabji (1 bowl) + salad (1 quarter plate).',
//         image1: require('../../../../../assets/user/diet/day1/day24.png'),
//       },

//       {
//         id: 16,
//         mealTime: 'Post Dinner',
//         time: '9:30 pm',
//         protein: '0.2gm',
//         carbs: '10gm',
//         diet1: 'Warm Cinnamon Water',
//         subd1: 'boil 4-5 cinnamon sticks in 1 glass of water, sieve and have (Cinnamon help in reduce fat storage by improving vitamin and mineral absorption in the body) (Take 1 Glass)',
//         image1: require('../../../../../assets/user/diet/day1/8.png'),
//       },

//     ],

//   },
//   {
//     day: 3,
//     mealDescription: 'Here is your Day 3 Meal',
//     protein: '200g',
//     carbs: '50g',
//     image: require('../../../../../assets/user/meal.png'),
//     meals: [
//       {
//         id: 17,
//         mealTime: 'Morning',
//         time: '6:00am - 7:00am',
//         protein: '0.2gm',
//         carbs: '10gm',
//         diet1: '1 Glass Zeera Water',
//         subd1: 'Soak 1 tablespoon of zeera seeds overnight, sieve and have(zeera helps body ti burn fat effectively)',
//         diet2: 'Soaked Almonds',
//         subd2: 'Soaked almonds (4-5),soaked walnuts(2).',
//         image1: require('../../../../../assets/user/diet/day1/1.png'),
//       },
//       {
//         id: 18,
//         mealTime: 'Breakfast',
//         time: '8:00am - 9:00am',
//         protein: '0.2gm',
//         carbs: '10gm',
//         diet1: 'Oats vegetable cheela',
//         subd1: '100% oats atta + grated veggies (1 in no) + mint-coriander chutney',
//         image1: require('../../../../../assets/user/diet/day1/31.png'),
//       },
//       {
//         id: 19,
//         mealTime: 'Mid Meal',
//         time: '11:00am - 12:00am',
//         protein: '0.2gm',
//         carbs: '10gm',
//         diet1: 'Fruit',
//         subd1: 'Any one fruit opt form fruits like apple /jamun /cherries /pomegranate /papaya',
//         image1: require('../../../../../assets/user/diet/day1/3.png'),
//       },

//       {
//         id: 20,
//         mealTime: 'Lunch',
//         time: '1:00pm - 2:00pm',
//         protein: '0.2gm',
//         carbs: '10gm',
//         diet1: 'Full Meal',
//         subd1: 'Multigrain roti (2 in no) + lauki sabji (1 bowl) + cucumber salad',
//         image1: require('../../../../../assets/user/diet/day1/32.png'),

//       },
//       {
//         id: 21,
//         mealTime: 'Evening',
//         time: 'Around 4:00pm',
//         protein: '0.2gm',
//         carbs: '10gm',
//         diet1: 'Tea',
//         subd1: 'Green tea / lemon tea (1 cup) these detox teas helps to reduce fluid retention from your body which is known ad water weight.',
//         image1: require('../../../../../assets/user/diet/day1/5.png'),

//       },
//       {
//         id: 22,
//         mealTime: 'Late Evening',
//         time: '6:00pm',
//         protein: '0.2gm',
//         carbs: '10gm',
//         diet1: 'PCOSLite',
//         subd1: '2 scoops of 20gm each in 250ml water.',
//         image1: require('../../../../../assets/user/diet/day1/6.png'),

//       },
//       {
//         id: 23,
//         mealTime: 'Dinner',
//         time: '8:00 pm - 9:00 pm',
//         protein: '0.2gm',
//         carbs: '10gm',
//         diet1: 'Vegetable daliya (1 quarter plate)',
//         subd1: '2 tbsp add saute vegetables in 1 tsp oil for 2-3 mins add 1.5 cup water, simmer vegetables for 10 minutes + salad (1 quarter plate) squeeze lemon on top',
//         image1: require('../../../../../assets/user/diet/day1/33.png'),
//       },

//       {
//         id: 24,
//         mealTime: 'Post Dinner',
//         time: '9:30 pm',
//         protein: '0.2gm',
//         carbs: '10gm',
//         diet1: 'Warm Cinnamon Water',
//         subd1: 'Boil 4-5 cinnamon sticks in 1 glass of water, sieve and have (Cinnamon help in reduce fat storage by improving vitamin and mineral absorp on in the body) (Take 1 Glass)',
//         image1: require('../../../../../assets/user/diet/day1/8.png'),
//       },

//     ],
//   },
//   {
//     day: 4,
//     mealDescription: 'Here is your Day 4 Meal',
//     protein: '200g',
//     carbs: '50g',
//     image: require('../../../../../assets/user/meal.png'),
//     meals: [
//       {
//         id: 25,
//         mealTime: 'Morning',
//         time: '6:00am - 7:00am',
//         protein: '0.2gm',
//         carbs: '10gm',
//         diet1: '1 Glass Zeera Water',
//         subd1: 'Soak 1 tablespoon of zeera seeds overnight, sieve and have(zeera helps body ti burn fat effectively)',
//         diet2: 'Soaked Almonds',
//         subd2: 'Soaked almonds (4-5),soaked walnuts(2).',
//         image1: require('../../../../../assets/user/diet/day1/1.png'),
//       },
//       {
//         id: 26,
//         mealTime: 'Breakfast',
//         time: '8:00am - 9:00am',
//         protein: '0.2gm',
//         carbs: '10gm',
//         diet1: 'Paneer sandwich',
//         subd1: '2 slice mul grain bread (stuﬀed with paneer) + 1 glass Lemon water (without sugar)',
//         image1: require('../../../../../assets/user/diet/day1/41.png'),
//       },
//       {
//         id: 27,
//         mealTime: 'Mid Meal',
//         time: '11:00am - 12:00am',
//         protein: '0.2gm',
//         carbs: '10gm',
//         diet1: 'Coconut water',
//         subd1: 'Take coconut water (1 glass)',
//         image1: require('../../../../../assets/user/diet/day1/42.png'),
//       },

//       {
//         id: 28,
//         mealTime: 'Lunch',
//         time: '1:00pm - 2:00pm',
//         protein: '0.2gm',
//         carbs: '10gm',
//         diet1: 'Full Meal',
//         subd1: 'Mul grain roti (2 in no.) + paneer bhurji (1 bowl) + cucumber - onion salad (1 big plate).',
//         image1: require('../../../../../assets/user/diet/day1/43.png'),

//       },
//       {
//         id: 29,
//         mealTime: 'Evening',
//         time: 'Around 4:00pm',
//         protein: '0.2gm',
//         carbs: '10gm',
//         diet1: 'Tea',
//         subd1: 'Green tea /lemon tea (1 cup) these detox teas helps to reduce fluid retention from your body which is known ad water weight.',
//         image1: require('../../../../../assets/user/diet/day1/5.png'),

//       },
//       {
//         id: 30,
//         mealTime: 'Late Evening',
//         time: '6:00pm',
//         protein: '0.2gm',
//         carbs: '10gm',
//         diet1: 'PCOSLite',
//         subd1: '2 scoops of 20gm each in 250ml water.',
//         image1: require('../../../../../assets/user/diet/day1/6.png'),

//       },
//       {
//         id: 31,
//         mealTime: 'Dinner',
//         time: '8:00 pm - 9:00 pm',
//         protein: '0.2gm',
//         carbs: '10gm',
//         diet1: 'Mix Veg paneer bowl',
//         subd1: '75 gms of paneer with sauteed broccoli ,bell peppers, carrot (for dressing use mint-coriander spreads) (1 quarter plate)',
//         image1: require('../../../../../assets/user/diet/day1/44.png'),
//       },

//       {
//         id: 32,
//         mealTime: 'Post Dinner',
//         time: '9:30 pm',
//         protein: '0.2gm',
//         carbs: '10gm',
//         diet1: 'Warm Cinnamon Water',
//         subd1: 'Boil 4-5 cinnamon sticks in 1 glass of water, sieve and have (Cinnamon help in reduce fat storage by improving vitamin and mineral absorp on in the body) (Take 1 Glass)',
//         image1: require('../../../../../assets/user/diet/day1/8.png'),
//       },

//     ],
//   },
//   {
//     day: 5,
//     mealDescription: 'Here is your Day 5 Meal',
//     protein: '200g',
//     carbs: '50g',
//     image: require('../../../../../assets/user/meal.png'),
//     meals: [
//       {
//         id: 33,
//         mealTime: 'Morning',
//         time: '6:00am - 7:00am',
//         protein: '0.2gm',
//         carbs: '10gm',
//         diet1: '1 Glass Zeera Water',
//         subd1: 'Soak 1 tablespoon of zeera seeds overnight, sieve and have(zeera helps body ti burn fat effectively)',
//         diet2: 'Soaked Almonds',
//         subd2: 'Soaked almonds (4-5),soaked walnuts(2).',
//         image1: require('../../../../../assets/user/diet/day1/1.png'),
//       },
//       {
//         id: 34,
//         mealTime: 'Breakfast',
//         time: '8:00am - 9:00am',
//         protein: '0.2gm',
//         carbs: '10gm',
//         diet1: 'Mix soya bowl salad',
//         subd1: '75gms of boiled soya chunks mixed with sauteed broccoli,bell peppers,carrot (for dressing use mint-coriander spreads)(1 quarter plate)',
//         image1: require('../../../../../assets/user/diet/day1/51.png'),
//       },
//       {
//         id: 35,
//         mealTime: 'Mid Meal',
//         time: '11:00am - 12:00am',
//         protein: '0.2gm',
//         carbs: '10gm',
//         diet1: 'Fruit',
//         subd1: 'Cut papaya (1 bowl) + 1 tbsp mix seeds (1 tbsp mix seeds of pumpkin and sunfower seeds)',
//         image1: require('../../../../../assets/user/diet/day1/52.png'),
//       },

//       {
//         id: 36,
//         mealTime: 'Lunch',
//         time: '1:00pm - 2:00pm',
//         protein: '0.2gm',
//         carbs: '10gm',
//         diet1: 'Full Meal',
//         subd1: 'Boiled brown Rice (1 quarter plate) (Starch removed) + chole (1 bowl) + Salad(1 quarter plate)',
//         image1: require('../../../../../assets/user/diet/day1/53.png'),

//       },
//       {
//         id: 37,
//         mealTime: 'Evening',
//         time: 'Around 4:00pm',
//         protein: '0.2gm',
//         carbs: '10gm',
//         diet1: 'Tea',
//         subd1: 'Green tea /lemon tea (1 cup) these detox teas helps to reduce fluid retention from your body which is known ad water weight.',
//         image1: require('../../../../../assets/user/diet/day1/5.png'),

//       },
//       {
//         id: 38,
//         mealTime: 'Late Evening',
//         time: '6:00pm',
//         protein: '0.2gm',
//         carbs: '10gm',
//         diet1: 'PCOSLite',
//         subd1: '2 scoops of 20gm each in 250ml water.',
//         image1: require('../../../../../assets/user/diet/day1/6.png'),

//       },
//       {
//         id: 39,
//         mealTime: 'Dinner',
//         time: '8:00 pm - 9:00 pm',
//         protein: '0.2gm',
//         carbs: '10gm',
//         diet1: 'Quinoa pulao',
//         subd1: '2 tablespoon of quinoa cooked with plenty of vegetables (1 quarter plate) + mint-coriander chutney.',
//         image1: require('../../../../../assets/user/diet/day1/54.png'),
//       },

//       {
//         id: 40,
//         mealTime: 'Post Dinner',
//         time: '9:30 pm',
//         protein: '0.2gm',
//         carbs: '10gm',
//         diet1: 'Warm Cinnamon Water',
//         subd1: 'Boil 4-5 cinnamon sticks in 1 glass of water, sieve and have (Cinnamon help in reduce fat storage by improving vitamin and mineral absorp on in the body) (Take 1 Glass)',
//         image1: require('../../../../../assets/user/diet/day1/8.png'),
//       },

//     ],
//   },

//   {
//     day: 6,
//     mealDescription: 'Here is your Day 6 Meal',
//     protein: '200g',
//     carbs: '50g',
//     image: require('../../../../../assets/user/meal.png'),
//     meals: [
//       {
//         id: 41,
//         mealTime: 'Morning',
//         time: '6:00am - 7:00am',
//         protein: '0.2gm',
//         carbs: '10gm',
//         diet1: '1 Glass Zeera Water',
//         subd1: 'Soak 1 tablespoon of zeera seeds overnight, sieve and have(zeera helps body ti burn fat effectively)',
//         diet2: 'Soaked Almonds',
//         subd2: 'Soaked almonds (4-5),soaked walnuts(2).',
//         image1: require('../../../../../assets/user/diet/day1/1.png'),
//       },
//       {
//         id: 42,
//         mealTime: 'Breakfast',
//         time: '8:00am - 9:00am',
//         protein: '0.2gm',
//         carbs: '10gm',
//         diet1: 'Bran Wheat ﬂakes',
//         subd1: '(Take 1 bowl) 2 tbsp wheat ﬂakes, add nuts and seeds with plain yoghourt/curd',
//         image1: require('../../../../../assets/user/diet/day1/61.png'),
//       },
//       {
//         id: 43,
//         mealTime: 'Mid Meal',
//         time: '11:00am - 12:00am',
//         protein: '0.2gm',
//         carbs: '10gm',
//         diet1: 'Vegetable juice',
//         subd1: '(Take 1 Glass) add 1/4th carrot, 1/4th beetroot, 2-3 mint leaves, 1 amla , 1 inch ginger, ½ tomato, ½ cucumber (have along with ﬁbre)',
//         image1: require('../../../../../assets/user/diet/day1/62.png'),
//       },

//       {
//         id: 44,
//         mealTime: 'Lunch',
//         time: '1:00pm - 2:00pm',
//         protein: '0.2gm',
//         carbs: '10gm',
//         diet1: 'Full Meal',
//         subd1: 'Moong Dal Khichdi (1 quarter plate) + sauteed beans(1 bowl) + zeera raita (1 bowl)',
//         image1: require('../../../../../assets/user/diet/day1/63.png'),

//       },
//       {
//         id: 45,
//         mealTime: 'Evening',
//         time: 'Around 4:00pm',
//         protein: '0.2gm',
//         carbs: '10gm',
//         diet1: 'Tea',
//         subd1: 'Green tea / lemon tea (1 cup) these detox teas helps to reduce fluid retention from your body which is known ad water weight.',
//         image1: require('../../../../../assets/user/diet/day1/5.png'),

//       },
//       {
//         id: 46,
//         mealTime: 'Late Evening',
//         time: '6:00pm',
//         protein: '0.2gm',
//         carbs: '10gm',
//         diet1: 'PCOSLite',
//         subd1: '2 scoops of 20gm each in 250ml water.',
//         image1: require('../../../../../assets/user/diet/day1/6.png'),
//       },
//       {
//         id: 47,
//         mealTime: 'Dinner',
//         time: '8:00 pm - 9:00 pm',
//         protein: '0.2gm',
//         carbs: '10gm',
//         diet1: 'Mix-vegetable soup',
//         subd1: '(Take 1 bowl)Homemade, without cream and cornflour) (opt for vegetables like bottle gourd, tomato, beans, carrot, spring onion, peas)+ multigrain bread toast(1 slice)',
//         image1: require('../../../../../assets/user/diet/day1/64.png'),
//       },

//       {
//         id: 48,
//         mealTime: 'Post Dinner',
//         time: '9:30 pm',
//         protein: '0.2gm',
//         carbs: '10gm',
//         diet1: 'Warm Cinnamon Water',
//         subd1: 'Boil 4-5 cinnamon sticks in 1 glass of water, sieve and have (Cinnamon help in reduce fat storage by improving vitamin and mineral absorp on in the body) (Take 1 Glass)',
//         image1: require('../../../../../assets/user/diet/day1/8.png'),
//       },

//     ],
//   },

//   {
//     day: 7,
//     mealDescription: 'Here is your Day 7 Meal',
//     protein: '200g',
//     carbs: '50g',
//     image: require('../../../../../assets/user/meal.png'),
//     meals: [
//       {
//         id: 49,
//         mealTime: 'Morning',
//         time: '6:00am - 7:00am',
//         protein: '0.2gm',
//         carbs: '10gm',
//         diet1: '1 Glass Zeera Water',
//         subd1: 'Soak 1 tablespoon of zeera seeds overnight, sieve and have(zeera helps body ti burn fat effectively)',
//         diet2: 'Soaked Almonds',
//         subd2: 'Soaked almonds (4-5),soaked walnuts(2).',
//         image1: require('../../../../../assets/user/diet/day1/1.png'),
//       },
//       {
//         id: 50,
//         mealTime: 'Breakfast',
//         time: '8:00am - 9:00am',
//         protein: '0.2gm',
//         carbs: '10gm',
//         diet1: 'Mix dal cheela',
//         subd1: '(1-2 in no.) use 1 tbsp moong dal with 1 tbsp urad dal (stuﬀed with 50 gm paneer and vegetables) add pinch of salt and pepper + mint-coriander chutney',
//         image1: require('../../../../../assets/user/diet/day1/71.png'),
//       },
//       {
//         id: 51,
//         mealTime: 'Mid Meal',
//         time: '11:00am - 12:00am',
//         protein: '0.2gm',
//         carbs: '10gm',
//         diet1: 'Coconut water',
//         subd1: 'Take coconut water (1 glass)',
//         image1: require('../../../../../assets/user/diet/day1/72.png'),
//       },

//       {
//         id: 52,
//         mealTime: 'Lunch',
//         time: '1:00pm - 2:00pm',
//         protein: '0.2gm',
//         carbs: '10gm',
//         diet1: 'Barley pulao',
//         subd1: '2 tbsp roasted barley cooked with plenty of vegetables (1 quarter plate) + mix veg raita(1 big bowl).',
//         image1: require('../../../../../assets/user/diet/day1/73.png'),

//       },
//       {
//         id: 53,
//         mealTime: 'Evening',
//         time: 'Around 4:00pm',
//         protein: '0.2gm',
//         carbs: '10gm',
//         diet1: 'Tea',
//         subd1: 'Green tea /lemon tea (1 cup) these detox teas helps to reduce fluid retention from your body which is known ad water weight.',
//         image1: require('../../../../../assets/user/diet/day1/5.png'),

//       },
//       {
//         id: 54,
//         mealTime: 'Late Evening',
//         time: '6:00pm',
//         protein: '0.2gm',
//         carbs: '10gm',
//         diet1: 'PCOSLite',
//         subd1: '2 scoops of 20gm each in 250ml water.',
//         image1: require('../../../../../assets/user/diet/day1/6.png'),

//       },
//       {
//         id: 55,
//         mealTime: 'Dinner',
//         time: '8:00 pm - 9:00 pm',
//         protein: '0.2gm',
//         carbs: '10gm',
//         diet1: 'Beetroot-moong salad',
//         subd1: '2 tablespoon boiled moong, beetroot, apple, 1 tbsp ﬂax seeds + sunﬂower seeds (1 bowl)',
//         image1: require('../../../../../assets/user/diet/day1/74.png'),
//       },

//       {
//         id: 56,
//         mealTime: 'Post Dinner',
//         time: '9:30 pm',
//         protein: '0.2gm',
//         carbs: '10gm',
//         diet1: 'Warm Cinnamon Water',
//         subd1: 'Boil 4-5 cinnamon sticks in 1 glass of water, sieve and have (Cinnamon help in reduce fat storage by improving vitamin and mineral absorp on in the body)(Take 1 Glass)',
//         image1: require('../../../../../assets/user/diet/day1/8.png'),
//       },

//     ],
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

const Veg = () => {
  const [vegDaysData, setVegDaysData] = useState([]);
  const [showProgress, setShowProgress] = useState(false);
  const [currentMonth,setCurrentMonth] = useState(0)
  const [currentYear,setCurrentYear] = useState(0);
  const [type,setType] = useState("1")
  const [monthlyDiet,setMonthlyDiet] = useState([]);
  const [monthsArr,setMonthsArr] = useState(monthsList);
  const [selectedMonth,setSelectedMonth] = useState(monthsList[currentMonth].label);
  const [yearArr,setYearArr] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      let days = moment().daysInMonth()
      let month = moment().month()+1
      let year = moment().year();
      setCurrentMonth(month)
      setCurrentYear(year)
      monthlyDietList(month,year)
      VegDaysList(days);
      getDaysInMonth(month,year)
      return () => false;
    }, [])
  );

  const getDaysInMonth=(month,year)=>{
    console.log("getDaysInMonth===",month,year)
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
      console.log("count--->",count)
      if(count == 0 ){
        count = 12;
      }
      if(yearCount-i <= 0){
        years.push(year-1);
      }
      else{
        years.push(year);
      }
      console.log("6 months list",months)
      console.log("6 years list",years)
      setMonthsArr(months);
      setYearArr(years);

    }
    // setDaysOfMonth(days)
    // monthlyDietList(month,year);
    // ExerciseList(days,month,year);
  }
  

  const monthlyDietList=async(month,year)=>{
    const id = await AsyncStorage.getData(AsyncStorageKeys.patient_id);
    const patientid = JSON.parse(id) || [];
    const apiEndPoint = appStrings.screens.api_names.monthly_diet_list.replace('${patient_id}',patientid).replace("${month}",month).replace('${year}',year).replace('${type}',"1")
    setShowProgress(true);
  
    let inputParams = {};
    UserAxios.getResponse(
      apiEndPoint,
      inputParams,
      "get",
      (response, error) => {
        if (!error) {
          if (!response.error) {
            console.log("response setMonthlyDiet----->", response);
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
  const VegDaysList = async (daysInMonth) => {
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
            console.log("response diet day list", response);
            let diet = []
            let count = 0;
            for(let i=1;i<=daysInMonth;i++){
              diet.push(response.data[count])
              count++
              if(count==7){
                count=0;
              }
            }
            setVegDaysData(diet)

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
        let calendarDate = moment(_date,'DD-MM-YYYY').startOf('day')
        return calendarDate.isSame(dietDate)       
        }
      )
    }
    if(completed){
      return completed
    }
  }

  const getDietCountList=(item)=>{
    let dietSteps=['M','B','MM','L','E','LE','D','PD']
    return dietSteps
 }

  const renderItem = ({ item,index }) => {
    const completed = getCompletedDiet(index);
    // console.log("completed====>>>",completed);
    var dietSteps = getDietCountList(item)
    return (
      <View style={[styles.listItem,{backgroundColor: completed?.status ? green1 : !completed &&  index+1 == moment().date() ? "#FFF4D6" : white }]}>
        <TouchableOpacity activeOpacity={0.7}
          onPress={() => {
            // if (moment().day() >= index + 1) {
              navigationRef.current?.navigate(appStrings.screens.appStrings.vegDiet, { "item": item.id, "type": 1, "index":index+1,"month":currentMonth,'year':currentYear })
            // }
          }
          }
        >
          <View style={styles.row}>
            <View style={{ backgroundColor: "#92F6AE", height: 120, width: 78, top: -10, left: 0 }}>
              <View style={styles.imageContainer}>
                <CustomImage
                  source={require('../../../../../assets/user/meal.png')}
                  resizeMode="contain"
                  style={styles.image}
                />
              </View>
            </View>

            <View style={styles.textContainer}>
              <CustomText style={[styles.dayTitle,{color: completed?.status ? white : black}]}>DAY {index+1}</CustomText>
              <CustomText style={[styles.description,{color: completed?.status ? white : black}]}>Here is your {index+1} Meal</CustomText>
             {
              completed?.status ? (
                <>
                 <View style={{flexDirection:"row"}}>
               
               <CustomText style={[styles.description,{color: completed?.status ? white : black,fontWeight:"bold"}]}>Completed</CustomText>
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
                    //  paddingVertical:4,
                    //  paddingHorizontal:6,
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
        <CustomText style={{ fontSize: 20, margin: 20 }}>Here, is your Veg Diet Plan.</CustomText>
        <View style={{ right: 15 }}>
          <CustomImage
            source={require('../../../../../assets/user/VegIcon.png')}
            resizeMode="contain"
            style={{ width: 21, height: 21, alignSelf: 'center', marginTop: 25, borderRadius:0 }}
          />
        </View>

      </View>
       
       {/* Diet History DropDown */}

       {/* <View style={{ alignItems:'flex-end' }}>
        <Dropdown
          data={monthsArr}
          value={currentMonth}
          onChange={(item) => {
            console.log("itemm-->", item)
            let days = new Date(yearArr[item._index],item.value,0).getDate()
            setSelectedMonth(item.label);
            // console.log("days==",days)
            monthlyDietList(item.value,yearArr[item._index])
            VegDaysList(days)
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

   
      <FlatList
        data={vegDaysData}
        renderItem={renderItem}
        keyExtractor={(item,index) => item.day+index}
      />

    <Loader showHud={showProgress} />
    </SafeAreaView>
  )
}

export default Veg

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white
  },
  row: {
    flexDirection: 'row',
    //alignItems: 'center',
  },
  imageContainer: {
    marginTop: '2%',
    alignSelf: 'center',
  },
  image: {
    width: 145,
    height: 132,
    left: 15,
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
    // marginLeft:'5%',
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
    color: "#777777",
    marginTop: 10,
    fontSize: 13,
    fontWeight: "400"
  },

})