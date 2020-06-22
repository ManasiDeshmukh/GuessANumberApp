import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import * as Font from 'expo-font';
//expo-fonr is pkg
import {AppLoading}from 'expo'
//it will prolong default loadings scrren to active untill a certaain task is done

import Header from './components/Header';
import Startgame from './screens/Startgame';
import Gamescreen from './screens/Gamescreen';
import Gameover from './screens/Gameover';


const fetchFonts=()=>
{
  Font.loadAsync(
    {
      'open-sans':require('./assets/fonts/OpenSans-Regular.ttf'),
      'open-sans-bold':require('./assets/fonts/OpenSans-Bold.ttf')

    }
  );
  //allpw to load fonts
}

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0);
const[dataLoaded,setDataLoaded]=useState(false)
if(!dataLoaded)
{
  return <AppLoading  startAsync={fetchFonts} onFinish={()=>
  {
    setDataLoaded(true)
  }} onError={(err)=>
  {
    console.log(err)
  }}/>
  //apploading provided by expo
  //startAsync :jo task first run hona chhiyr before loadding all thinsg
}
  fetchFonts()
  const configureNewGameHandler = () => {
    setGuessRounds(0);
    setUserNumber(null);
  };

  const startGameHandler = selectedNumber => {
    setUserNumber(selectedNumber);
  };

  const gameOverHandler = numOfRounds => {
    setGuessRounds(numOfRounds);
  };

  let content = <Startgame onStartGame={startGameHandler} />;//default output

  if (userNumber && guessRounds <= 0) {
    content = (  //braces me ka jo upr satet me hai vo aur left side vala props ka

      <Gamescreen userChoice={userNumber} onGameOver={gameOverHandler} />//computer guess num
    );
  } else if (guessRounds > 0) {
    content = (
      <Gameover
        roundsNumber={guessRounds}
        userNumber={userNumber}
        onRestart={configureNewGameHandler}
      />
    );
  }

  return (
    <View style={styles.screen}>
      <Header title="Guess a Number" />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});
