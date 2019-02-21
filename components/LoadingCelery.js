import   React,
       { Component } from 'react'
import { Button } from 'react-native-elements';
import { StyleSheet,
         View,
         TouchableHighlight,
         Image,
         Dimensions } from 'react-native';
import    AutoHeightImage from 'react-native-auto-height-image';

export default class LoadingCelery extends Component {

  render() {
    return (

    <View style={{flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center'}}>
    <AutoHeightImage
      source={require('../assets/celery.gif')}
      style={{
        backgroundColor: 'transparent',
        position: 'absolute',
        top: Dimensions.get('window').height*0.3}}
        width={Dimensions.get('window').width*0.385}
    />
    </View>
    )
  }
}
