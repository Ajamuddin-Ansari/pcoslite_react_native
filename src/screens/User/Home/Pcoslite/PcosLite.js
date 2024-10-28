import { SafeAreaView, StyleSheet, Text, View,ImageBackground, ScrollView } from 'react-native'
import React from 'react'
import { black, grey, white } from '../../../../../lib/colors'
import CustomText from '../../../../components/CustomText'
import CustomImage from '../../../../components/CustomImage'

const PcosLite = () => {
  return (
   <SafeAreaView style={styles.container}>
    <View style={{marginLeft:"10%",marginTop:10}}>
      <CustomText style={{fontSize:24,color:black,fontWeight:"bold"}}>Direction to use</CustomText>
      <CustomText style={{fontSize:16,color:grey}}>For 2 Scoops (40g) in 1 cup water*</CustomText>
    </View>

    <ScrollView>
   
   <View style={{marginTop:15,zIndex:5}}>
    <ImageBackground 
    source={require('../../../../../assets/background1.png')}
    resizeMode="cover" 
    style={styles.image}>
      <CustomText style={styles.numberText}>1</CustomText>
      <View style={{alignSelf: 'center',top:-15}}>
              <CustomImage
                source={require('../../../../../assets/cup1.png')}
                resizeMode="contain"
                style={{ width:72, height: 63, alignSelf: 'center' }}
              />
            </View>   
          <CustomText style={styles.text}>Take 1/3 cup of water</CustomText>
          </ImageBackground>
          </View> 

          
    <View style={{marginTop:-46,zIndex:4}}>
    <ImageBackground 
    source={require('../../../../../assets/background2.png')}
    resizeMode="cover" 
    style={[styles.image,{height:248}]}>
      <CustomText style={styles.numberText}>2</CustomText>
      <View style={{alignSelf: 'center',top:5}}>
              <CustomImage
                source={require('../../../../../assets/Cupnspoon.png')}
                resizeMode="contain"
                style={{ width:70, height: 79, alignSelf: 'center' }}
              />
            </View>  
      <CustomText style={[styles.text,{top:15}]}>Add 2 heap full Scoops {`\n`}(40g) of PCOSLITE  Powder {`\n`}and stir until dissolved {`\n`}completely.</CustomText>
    </ImageBackground>
    </View>

   
   
    <View style={{marginTop:-55,zIndex:3}}>
    <ImageBackground 
    source={require('../../../../../assets/background3.png')}
    resizeMode="cover" 
    style={[styles.image,{height:248}]}>
      <CustomText style={styles.numberText}>3</CustomText>
      <View style={{alignSelf: 'center',top:10}}>
              <CustomImage
                source={require('../../../../../assets/cup1.png')}
                resizeMode="contain"
                style={{ width:72, height: 63, alignSelf: 'center' }}
              />
            </View>  
      <CustomText style={[styles.text,{top:20}]}>Add more water to fill the remaining volume of the {`\n`}cup or add according to {`\n`}your taste preference.</CustomText>
    </ImageBackground>
    </View>

    <View style={{marginTop:-55,zIndex:2}}>
    <ImageBackground 
    source={require('../../../../../assets/background2.png')}
    resizeMode="cover" 
    style={[styles.image,{height:248}]}>
      <CustomText style={styles.numberText}>4</CustomText>
      <View style={{alignSelf: 'center',top:15}}>
              <CustomImage
                source={require('../../../../../assets/cup.png')}
                resizeMode="contain"
                style={{ width:72, height: 63, alignSelf: 'center' }}
              />
            </View>  
      <CustomText style={[styles.text,{top:25,textAlign:"center"}]}>Stir well. Once prepared {`\n`}consume immediately for {`\n`}better taste.</CustomText>
    </ImageBackground>
    </View>

    <View style={{marginHorizontal:15,marginTop:15}}>
      <CustomText style={{textAlign:"center",color:grey,fontSize:16}}>1 to 2 per day as directed by physician / dietician / nutritionist on the basis of the patient requirement. Use as advised by physician? dietician? nutritionist.</CustomText>
    </View>
    <View style={{marginBottom:"10%"}}></View>
    </ScrollView>
   </SafeAreaView>
  )
}

export default PcosLite

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:white
  },
  base:{
    transform: [{ rotate: "180deg" }],
    alignSelf:"center",
   
  },
  baseTop: {
    borderBottomWidth: 70,
    borderBottomColor: "yellow",
    borderLeftWidth: 100,
    borderLeftColor: "transparent",
    borderRightWidth: 100,
    borderRightColor: "transparent",
    height: 0,
    width: 0,
    left: 0,
    top: -70,
    position: "absolute",
  },
  baseBottom: {
    backgroundColor: "yellow",
    height: 110,
    width: 200,
  },
  image: {
   
    height:220,
    width:215,
    alignSelf:"center",
    justifyContent: 'center',
  },
  text:{
    color:white,
    fontSize:14,
    alignSelf:"center",
    textAlign:"center"
  },
  numberText:{
    alignSelf:"flex-start",
    top:10,
    left:10,
    fontSize:30,
    color:white,
    position:"absolute",
    fontWeight:"bold"
  }
})