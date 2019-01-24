import React from 'react';
import { StyleSheet, Platform, Dimensions, Button, Text, View } from 'react-native';
import { Constants } from 'expo'
import * as TimeGreeting from '../../helper_functions/TimeGreeting.js';
import NavBar from '../../components/NavBar.js';
import AutoHeightImage from 'react-native-auto-height-image';
import GlobalButton from '../../components/GlobalButton.js';

export default class Home extends React.Component {
  static navigationOptions = {
    title: null,
    headerTitle: (
     <AutoHeightImage width={75} style={{position: 'absolute', right: Platform.OS === 'android' ? 0 : -65 }} source={require('../../assets/AppIcons/transparentlogo.png')}/>
 ),
}

  render() {
    const {navigate} = this.props.navigation;

    return (
      <View style={homeStyle.container}>
      <View style={homeStyle.buttonContainer}>
        <Text style={{fontSize: 18, color: 'midnightblue'}}>{TimeGreeting.getTimeBasedGreeting("Jarrod")} </Text>
      </View>
      <View style={homeStyle.iconsContainer}>

      <GlobalButton marginLeft={Dimensions.get('window').width*0.12} onPress={() => navigate('SignIn', {name: 'Home'})} buttonTitle={"Recipes"} />
      <GlobalButton marginRight={Dimensions.get('window').width*0.12} onPress={() => navigate('Register', {name: 'Home'})} buttonTitle={"Eateries"} />

      </View>

      <View style={homeStyle.iconsContainer}>

      <GlobalButton marginLeft={Dimensions.get('window').width*0.12} onPress={() => navigate('SignIn', {name: 'Home'})} buttonTitle={"Brands"} />
      <GlobalButton marginRight={Dimensions.get('window').width*0.12} onPress={() => navigate('Register', {name: 'Home'})} buttonTitle={"Media"} />

      </View>

      <NavBar navigation={this.props.navigation} />
      </View>
    );
  }
}

const homeStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconsContainer: {
    width: Dimensions.get('window').width,
    marginLeft: 0,
    marginTop: Dimensions.get('window').height*0.035,
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttonContainer: {
    marginBottom: Dimensions.get('window').height*0.01
  }
});
