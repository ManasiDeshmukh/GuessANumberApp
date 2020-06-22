import React, { useState, useRef, useEffect } from 'react';
import { View, Text,FlatList, StyleSheet,
   Button, Alert, ScrollView,Dimensions } from 'react-native';
import {Ionicons} from '@expo/vector-icons'

import NumberContainer from '../components/Number';
import Card from '../components/Card';
import DefaultStyles from '../components/default-styles'
import MainButton from '../components/MainButton'
import BodyText from '../components/BodyText'

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
};

const renderListItem=(value,numOfRound)=>

  (<View  key={value} style={styles.listItem} >
    <BodyText>#{numOfRound}</BodyText>
  
      <BodyText>{value}</BodyText>
    </View>)








const GameScreen = props => {
  const initialGuess=generateRandomBetween(1, 100, props.userChoice)
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [pastGuesses, setPastGuesses] = useState([initialGuess]);
  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  const { userChoice, onGameOver } = props;

  useEffect(() => {
      //run after evry render cycle
    if (currentGuess === userChoice) {
      onGameOver(pastGuesses.length);
      //number of rounds
    }
  }, [currentGuess, userChoice, onGameOver]);
//You can add any input to that array which should trigger the useEffect() function to run again. for first args
//when currentguess changes we are telling to react to run useeefect fun again

  const nextGuessHandler = direction => {
    if (//whether data is grter or smaller than comps guess num
      (direction === 'lower' && currentGuess < props.userChoice) ||
      (direction === 'greater' && currentGuess > props.userChoice)
    ) {
      Alert.alert("Don't lie!", 'You know that this is wrong...', [
        { text: 'Sorry!', style: 'cancel' }
      ]);
      return;
    }
    if (direction === 'lower') {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess+1;
    }
    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
    setCurrentGuess(nextNumber);
   // setRounds(curRounds => curRounds + 1);
   setPastGuesses(curPastGuesses=>[nextNumber,...curPastGuesses])
  };





  return (
    <View style={styles.screen}>
      <Text style={DefaultStyles.title}>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <MainButton  onPress={nextGuessHandler.bind(this, 'lower')}>
<Ionicons name="md-remove" size={24} color="white"/>

        </MainButton>
        <MainButton
          onPress={nextGuessHandler.bind(this, 'greater')}
        ><Ionicons name="md-add" size={24} color="white"/>
        </MainButton>
        
      </Card>

<View style={styles.listConatiner}>
<ScrollView contentContainerStyle={styles.list}>
{pastGuesses.map((guess,index)=>renderListItem(guess,pastGuesses.length-index))} 
{/* 2nd args me agr index diya toh jb naya num add hoga to 1st pe aayeg isliye 2nd arg vaise diya
 li jo naya aaye vo konse num oe aaya vo index pe list me dikhaye */}
</ScrollView>
</View>
 </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center'
  },
  listConatiner:{
    width:Dimensions.get('window').width>350?'60%':'80%',
  
    flex:1 //android me scroll hone k liye
  },
  list:{
    flexGrow:1,//scroll
    alignItems:'center',
    justifyContent:'flex-end'
  },
  
  listItem:{
borderColor:'#ccc',
borderWidth:1,
padding:15,
marginVertical:10,
backgroundColor:'white',
flexDirection:'row',
width:'80%',
justifyContent:'space-between'

  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: Dimensions.get('window').height >600?20:5,
    width: 400,
    maxWidth: '95%'
  }
});

export default GameScreen;
