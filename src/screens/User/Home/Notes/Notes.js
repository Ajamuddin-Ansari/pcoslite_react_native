import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { black, dark_pink, dark_purple, pink, red, white } from '../../../../../lib/colors'
import CustomText from '../../../../components/CustomText'

const Notes = () => {
    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={[styles.view, { backgroundColor: "#03058c", marginTop: 20, bottom: 5 }]}>
                    <CustomText style={styles.text}>NUTRITION GUIDELINES</CustomText>
                </View>
                <View style={{ paddingHorizontal: 15 }}>
                    <CustomText style={styles.textStyle}>{'\u25CF'} Include ﬁbre rich carbohydrates in breakfast to prevent your blood glucose levels from spiking and then falling, which can lead to hunger quickly after you eat.
                        {`\n`}{`\n`}{'\u25CF'} The sooner you eat your breakfast after getting up, the better it is for your
                        metabolism and overall health.{`\n`}{`\n`}
                        {'\u25CF'} (It’s important to take mid morning after 2 hours of the breakfast as our
                        body takes a minimum of 2 hours to digest and absorb the food and also
                        helps to stay full for a longer period).{`\n`}{`\n`}
                        {'\u25CF'} 1 plate of green salad 15 minutes before lunch. (Fibre of salads help to
                        introduce more dietary ﬁbre in diet){`\n`}{`\n`}
                        {'\u25CF'} Mixing of ﬂour helps to meet daily need of dietary ﬁbre which promotes
                        good gut health ,improve diges on system and boost up the metabolism
                    </CustomText>
                </View>


                <CustomText style={[styles.text, { fontSize: 20, color: dark_pink, borderBottomWidth: 3, borderBottomColor: dark_pink }]}> Tips we generally forget</CustomText>

                <View style={{ paddingHorizontal: 15, marginTop: 10 }}>

                    <CustomText style={styles.textStyle}>{'\u25CF'} Reduce the amount of time you spend sitting. Increase the time you spend moving each day.
                        {`\n`}{`\n`}{'\u25CF'} Weight yourself once per week at the same time of day.{`\n`}{`\n`}
                        {'\u25CF'} Keep track of body measurements (waist, hip, thigh, and upper arm){`\n`}{`\n`}
                        {'\u25CF'} Reduce the amount of time you spend sitting. Increase the time you spend moving each day.Use low-fat cooking methods such as baking,grilling, boiling, poaching, broiling, roasting, steaming, or microwaving without adding fat.{`\n`}{`\n`}
                        {'\u25CF'} Avoid frying.{`\n`}{`\n`}
                        {'\u25CF'} Use nonstick cookware or cooking sprays.{`\n`}{`\n`}
                        {'\u25CF'} Ask for the nutrition information from the restaurant to help you choose low-calorie, low-fat menu items.{`\n`}{`\n`}

                    </CustomText>
                </View>

                <View style={[styles.view, { backgroundColor: dark_pink, }]}>
                    <CustomText style={styles.text}>NUTRITION GUIDELINES</CustomText>
                </View>
                <View style={{ paddingHorizontal: 15, marginTop: 10 }}>

                    <CustomText style={styles.textStyle}>{'\u25CF'}  45 mins of physical activity is necessary in your daily routine.
                        {`\n`}{`\n`}{'\u25CF'} Eat a diet rich in wholegrains, vegetables, fruits, lean proteins, and dairy.{`\n`}{`\n`}
                        {'\u25CF'} Avoid consuming processed food items like pickles, papads, cold drinks, chips, biscuits.{`\n`}{`\n`}
                        {'\u25CF'} Limit high fat, high sugar foods,instead have natural sugar in the form of fruits.{`\n`}{`\n`}
                        {'\u25CF'} Avoid having sweet fruits like chikoo, banana, mango,grapes. You can have fruits like apple, pears, papaya,guava, berries, and oranges.{`\n`}{`\n`}
                        {'\u25CF'} Decrease your portion size.{`\n`}{`\n`}
                        {'\u25CF'} Limit restaurant and fast food meals by cooking at home more often.{`\n`}{`\n`}
                        {'\u25CF'} Avoid consuming whole Milk. You can substitute low-fat milk on alternative days.{`\n`}{`\n`}
                        {'\u25CF'} Make sure to have at least 2-3 litres of water daily to maintain electrolyte balance.{`\n`}{`\n`}
                        {'\u25CF'} Eat slowly and enjoy the meal.{`\n`}{`\n`}
                        {'\u25CF'} Turn oﬀ the TV and computer during meals and snacks{`\n`}{`\n`}
                    </CustomText>
                </View>

                <View style={[styles.view, { backgroundColor: "#16ABFA" }]}>
                    <CustomText style={[styles.text, { fontSize: 20 }]}>Tips to add more ﬁbre to diet</CustomText>
                </View>
                <View style={{ paddingHorizontal: 15, marginTop: 10 }}>

                    <CustomText style={styles.textStyle}>{'\u25CF'}  Add a salad to your sandwich ﬁllings.
                        {`\n`}{`\n`}{'\u25CF'} Try homemade vegetable soups.{`\n`}{`\n`}
                        {'\u25CF'} Add extra vegetables to stews, casseroles, curries and sauces.{`\n`}{`\n`}
                        {'\u25CF'} Steaming vegetables rather than boiling helps reduce the loss of vitamins in cooking.{`\n`}{`\n`}
                        {'\u25CF'} Soaking vegetables in water is not a good idea as vitamins are lost.{`\n`}{`\n`}
                        {'\u25CF'} Avoid sugar, honey-coated or chocolate-based breakfast cereals.{`\n`}{`\n`}
                        {'\u25CF'} Use tomato-based sauces instead of creamy or cheese-based ones.{`\n`}{`\n`}
                        {'\u25CF'} Do not add fat to Potatoes, Chapattis or Rice.{`\n`}{`\n`}
                        {'\u25CF'} Make sure you have a good sleep for at least 7-8 hours daily.{`\n`}{`\n`}
                        {'\u25CF'} Don't skip the water, have water at least 30 minutes before and after you eat{`\n`}{`\n`}
                        {'\u25CF'} Try not to use any gadgets before 2 hours of sleeping{`\n`}{`\n`}
                        {'\u25CF'} If yours is a desk job make sure you try to stand for 5 mins every 45 mins{`\n`}{`\n`}
                        {'\u25CF'} Cut down radiation exposure as much as possible{`\n`}{`\n`}
                        {'\u25CF'} Expose yourself to sunlight for 15-20 mins daily{`\n`}{`\n`}
                        {'\u25CF'} Take oil baths twice a week{`\n`}{`\n`}
                        {'\u25CF'} Practise deep relaxation and guided meditation – every morning & night{`\n`}{`\n`}
                        {'\u25CF'} Use castor oil pack over the liver and uterus sections of the belly (20 mins) for better health. Do this for 45 days.{`\n`}{`\n`}
                        {'\u25CF'} Walk barefoot on the ground for 20-30 minutes daily.{`\n`}{`\n`}
                        {'\u25CF'} Stick with pilates, weight training, or yoga. Avoid excessive cardio.{`\n`}{`\n`}
                    </CustomText>
                </View>

                <CustomText style={[styles.text, { fontSize: 20, color: red, borderBottomWidth: 3, borderBottomColor: red, marginTop: -20 }]}> Intuitive eating vs calorie counting</CustomText>
                <View style={{ paddingHorizontal: 15, marginTop: 10 }}>

                    <CustomText style={styles.textStyle}>{`    `} As opposed to the traditional "clean eating" or "healthy eating", which emphasises what foods should be
                        strictly eaten and what should be avoided, intuitive eating focuses on your body’s hunger cues. It is a method of eating that not only helps you to eat better, but also helps you to enjoy food more.
                        {`\n`}{`\n`}{'\u25CF'} Follow your hunger cues, don’t obsess over calories & weight.{`\n`}{`\n`}
                        {'\u25CF'} Choose meals based on your appetite{`\n`}{`\n`}
                        {'\u25CF'} Have at least 2.5-3 litres of water. Use Glass/steel bottle preferably.{`\n`}{`\n`}
                        {'\u25CF'} Be cautious with your portions{`\n`}{`\n`}

                    </CustomText>
                </View>

                <CustomText style={[styles.text, { fontSize: 20, color: dark_pink, borderBottomWidth: 3, borderBottomColor: dark_pink, marginTop: -40 }]}> Processed Foods and Reﬁned Oils</CustomText>
                <View style={{ paddingHorizontal: 15, marginTop: 10 }}>

                    <CustomText style={styles.textStyle}>{``} Waves of energy surges and crashes accompany sugar consumption and make it tough for the brain to
                        maintain balance which can result in short-term eﬀects like mood shifts and energy imbalances. High-sugar diets also negatively impact long-term cognitive abilities and memory retention.

                    </CustomText>
                </View>

                <CustomText style={[styles.text, { fontSize: 20, color: "#03058c", borderBottomWidth: 3, borderBottomColor: "#03058c" }]}> Why “Organic”?</CustomText>
                <View style={{ paddingHorizontal: 15, marginTop: 10 }}>

                    <CustomText style={styles.textStyle}>{``} The term "organic" is used to diﬀerentiate between products produced through approved methods of organic farming using manure as fertilisers, and those produced by other means, usually conventional chemical-based farming.
                        In order to be labelled organic, a food product must be free of artiﬁcial food additives like artiﬁcial sweeteners,
                        preservatives, colouring, ﬂavouring and monosodium glutamate (MSG). They must also have been grown
                        without the involvement of artiﬁcial chemicals, hormones, antibiotics or genetically modiﬁed organisms.

                    </CustomText>
                </View>

                <CustomText style={[styles.text, { fontSize: 20, color: dark_pink, borderBottomWidth: 3, borderBottomColor: dark_pink }]}> Sugar Cravings</CustomText>
                <View style={{ paddingHorizontal: 15, marginTop: 10 }}>

                    <CustomText style={styles.textStyle}>{``} Waves of energy surges and crashes accompany sugar consumption and make it tough for the brain to
                        maintain balance which can result in short-term eﬀects like mood shifts and energy imbalances. High-sugar diets also negatively impact long-term cognitive abilities and memory retention.

                    </CustomText>
                </View>

                <CustomText style={[styles.text, { fontSize: 20, color: red, borderBottomWidth: 3, borderBottomColor: red }]}> 7 Tips to Manage Sugar Cravings:</CustomText>
                <View style={{ paddingHorizontal: 15, marginTop: 10 }}>

                    <CustomText style={styles.textStyle}>
                        {'\u25CF'} Avoid added sugars, reﬁned sugars, and ar ﬁcial sweeteners.{`\n`}{`\n`}
                        {'\u25CF'} Have a high protein breakfast - 15-20 gm of protein to start the day can curb appetite and stabilise blood sugar{`\n`}{`\n`}
                        {'\u25CF'} Replace reﬁned carbs or simple carbs from complex carbs - keeps you full longer{`\n`}{`\n`}
                        {'\u25CF'} One should have at least 7-8 hours of sleep.{`\n`}{`\n`}
                        {'\u25CF'} Include more of high ﬁbre fruits & vegetables - supplement with ﬁbres and an oxidants that reduces inﬂammation and builds immunity{`\n`}{`\n`}
                        {'\u25CF'} Drink plenty of ﬂuids - to stay well hydrated. Drinking more water helps to ﬂush out toxins and maintain electrolyte balance.{`\n`}{`\n`}
                        {'\u25CF'} Move your body - boosts energy levels and improves metabolism{`\n`}{`\n`}

                    </CustomText>
                </View>
                <View style={{ marginBottom: 20 }}></View>

            </ScrollView>
        </View>
    )
}

export default Notes

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white
    },
    textStyle: {
        fontSize: 16,
        textAlign: "justify"
    },
    view: {

        height: 50,
        width: "94%",
        alignSelf: "center",
        borderRadius: 15
    },
    text: {
        color: white,
        alignSelf: "center",
        paddingVertical: 13,
        fontWeight: "bold",
        fontSize: 18,

    }
})