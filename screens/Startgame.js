import React, { useState,useEffect } from 'react';
import {
  View,
  Alert,
  Text,
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
KeyboardAvoidingView,ScrollView,Dimensions
} from 'react-native';

import Card from '../components/Card';
import Input from '../components/Input';
import color from '../constants/color';
import Number from '../components/Number'
import BodyText from '../components/BodyText'
import TitleText from '../components/TitleText'
import MainButton from '../components/MainButton'


const Startgame = props => {
  const [enteredValue, setEnteredValue] = useState('');
const [confirmed,setconfirm]=useState(false)
const[selectednum,setselectednum]=useState('')
const [buttonWidth,SetButtonwidth]=useState(Dimensions.get('window').width/4)


  const numberInputHandler = inputText => {
    setEnteredValue(inputText.replace(/[^0-9]/g, ''));
    //not exceptong non-number value
// g is for global
  };
const resetHandler=()=>
{
    setEnteredValue('')
    setconfirm(false)
}
useEffect(()=>
{

  const updateLayout=()=>
  {
    SetButtonwidth(Dimensions.get('window').width/4)
  }
  Dimensions.addEventListener('change',updateLayout)
  return()=>
  {
    Dimensions.removeEventListener('change',updateLayout)
  }
})
const confirm=()=>
{const chosenNum=parseInt(enteredValue)
    if(isNaN(chosenNum)|| chosenNum<=0  || chosenNum>99)
    {Alert.alert('Invalid number!',
    'Number has to be between 1 and 99',
    [{text:"Okay",style:'destructive',onPress:resetHandler}]
     ); return;
    }

setconfirm(true)
setselectednum(chosenNum)
setEnteredValue('')
Keyboard.dismiss()
}
let output;
if(confirmed)
{
output=<Card style={styles.output}>
  <Text>You Selected</Text>
<Number>{selectednum}</Number>
<MainButton 
 onPress={()=>props.onStartGame(selectednum)}>START GAME</MainButton>
</Card>
}
  return (<ScrollView><KeyboardAvoidingView
  keyboardVerticalOffset={30}
  behavior="position">
        <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();  //input enter krne k bad keyboard dismiss hona chhiye
      }}
    >
      <View style={styles.screen}>
        <TitleText style={styles.title}> Start a New Game!</TitleText>
        <Card style={styles.inputContainer}>
          <BodyText>Select a Number</BodyText>
          <Input
            style={styles.input}
            blurOnSubmit
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="number-pad" // can give email-address,phone-pad etc
            maxLength={2}
            onChangeText={numberInputHandler}
            value={enteredValue}
          />
          <View style={styles.buttonContainer}>
            <View style={{width:buttonWidth}}>
              <Button title="Reset" onPress={resetHandler} color={color.accent} />
            </View>
            <View style={{width:buttonWidth}}>
              <Button
                title="Confirm"
                onPress={confirm}
                color={color.primary}
              />
            </View>
          </View>
        </Card>
        {output}
      </View>
    </TouchableWithoutFeedback></KeyboardAvoidingView>
    </ScrollView>
);
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center'
  },
  title: {
    //fontSize: 20,
    marginVertical: 10
  },
  text:
  {
fontFamily:'open-sans'
  },
  output:
  {
  alignItems:'center',
  justifyContent:'center' ,  
marginTop:20
  }
  ,
  inputContainer: {
    width: '80%',
    minWidth: 300,
    alignItems: 'center',
    maxWidth:'95%'
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '80%',
    justifyContent: 'space-between',
    paddingHorizontal: 10
  },
 
  input: {
    width: 100,
    textAlign: 'center'
  }
});

export default Startgame;
