import React from 'react'
import {Text,StyleSheet} from 'react-native'
const BodyText=props=><Text style={{...styles.body,...props.style}}>{props.children}</Text>
//above line said map internal styles in object and alsp apply externally applied styles
const styles=StyleSheet.create({
    body:
    {
        fontFamily:'open-sans-bold'
    }
})
export default BodyText