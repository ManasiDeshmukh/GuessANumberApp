import React from 'react';
import{View,Text,StyleSheet }from 'react-native';
import color from '../constants/color'
import TitleText from '../components/TitleText'
const Header=props=>
{
return (
    <View style={styles.header}>
        <TitleText style={styles.hedertitle}>{props.title}</TitleText>
    </View>
);
};

const styles=StyleSheet.create(
    {
header:
{
width:'100%',
paddingTop:36,
backgroundColor:color.primary,
alignItems:'center',
justifyContent:'center'

},
hedertitle:
{
color:'black',
fontSize:18,
fontFamily:'open-sans-bold'
}
    }
)
export default Header;

  