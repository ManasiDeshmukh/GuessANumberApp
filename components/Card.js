import React from 'react';
import { View, StyleSheet } from 'react-native';

const Card = props => {
  return (// Card madhe j common components ahe te use kele so that reuse ho shekl  
    <View style={{ ...styles.card, ...props.style }}>{props.children}</View>
 //spread operator is used for distributing all the properties
//all key-val pairs of card style into new object
 );
};

const styles = StyleSheet.create({
  card: {
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },//for iso
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 8,//shadow for android 
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10
  }
});

export default Card;
