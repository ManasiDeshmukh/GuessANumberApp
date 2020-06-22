import React from 'react'
import{ View,Text,StyleSheet,Dimensions,Image,ScrollView} from 'react-native'
import BodyText from '../components/BodyText'
import TitleText from '../components/TitleText'
import Colors from '../constants/color';
import MainButton from '../components/MainButton'


const GameOver=props=>
{
return(<ScrollView>
    <View styles={styles.screen}>
        <TitleText>Game over</TitleText>
  <View style={styles.imageContainer}> 
     <Image 
     fetchDuration={1000}
     // 1000 millisec
        style={styles.image}
        resizeMode="contain"
         // using image locally 
       source={require('../assets/original.png')}/>
       
        
       {/* 
       //using web image from google
        for web images u have to set width and height
         source={{
            uri:'https://now.northropgrumman.com/wp-content/uploads/2017/11/11.07.17_mt_everest.jpg'
        }}/>  */}
        </View>  
       <View style={styles.resultContainer}>
            <BodyText style={styles.resultText}>Your phone needed <Text style={styles.highlight}>{props.roundsNumber}</Text> to guess the number <Text style={styles.highlight}>
             {props.userNumber}</Text></BodyText></View>

<MainButton onPress={props.onRestart}>NEW GAME</MainButton>
</View></ScrollView>
)
};
const styles=StyleSheet.create({
screen:
{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
},
imageContainer:{
   borderRadius:Dimensions.get('window').width*0.7/2,
   borderWidth:3,
   borderColor: 'black',
   width:Dimensions.get('window').width*0.7,
   height:Dimensions.get('window').width*0.7,
   overflow:"hidden",
   marginVertical:Dimensions.get('window').height/20,
   marginLeft:35
},
resultContainer:{
    marginVertical:Dimensions.get('window').height/60,
    marginHorizontal:30
    //it provide space above and below the line
},
image:
{
  width:'100%',
  height:'100%'
},
highlight:
{
   color:Colors.primary,
   fontFamily:'open-sans-bold'

},
resultText:{
    textAlign:'center',
   fontSize:Dimensions.get('window').height<400?16:20
}
})
export default GameOver