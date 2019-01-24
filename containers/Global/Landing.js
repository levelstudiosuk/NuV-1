import React from 'react';
import { StyleSheet, Image, Dimensions, Button, Text, View } from 'react-native';
import { Constants } from 'expo'
import NavBar from '../../components/NavBar.js';
import AutoHeightImage from 'react-native-auto-height-image';

export default class Landing extends React.Component {
  static navigationOptions = {
      header: null,

  };
  render() {

    const {navigate} = this.props.navigation;

    return (
      <View style={landingStyle.container}>
      <AutoHeightImage source={require('../../assets/AppIcons/transparentlogo.png')} style={{marginTop: Constants.statusBarHeight + Dimensions.get('window').height*0.25}} width={Dimensions.get('window').width*0.77} />

      <View style={landingStyle.iconsContainer}>
      <Button
        title="Register"
        style={{marginLeft: Dimensions.get('window').width*0.035, marginRight: Dimensions.get('window').width*0.035}}
        onPress={() => navigate('Register', {name: 'Home'})}
      />

      <Button
        style={{marginLeft: Dimensions.get('window').width*0.035, marginRight: Dimensions.get('window').width*0.035}}
        title="Sign in"
        onPress={() => navigate('SignIn', {name: 'Home'})}
      />

      </View>

      </View>
    );
  }
}

const landingStyle = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconsContainer: {
    width: Dimensions.get('window').width*0.5,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
