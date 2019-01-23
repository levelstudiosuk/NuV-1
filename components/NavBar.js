import React from 'react';
import { StyleSheet, TextInput, TouchableHighlight, Dimensions, Button, Text, View } from 'react-native';
import { Constants } from 'expo'

export default class NavBar extends React.Component {
  static navigationOptions = {
    title: 'Enter your NüV registration data below',
    header: null,
  };

  constructor(props) {
  super(props);

}

  state = {

    };

  render() {
    const {navigate} = this.props.navigation;

    return (
      <View style={ChooseTimePeriodStyle.iconsContainer}>

      <TouchableHighlight
      style={{position: 'relative', top: '0%'}}
        onPress={() => {
          onPress={() => navigate('Home', {name: 'NavBar'})}
          }}>
            <Image source={require('../assets/AppIcons/home.png')} style={{height: 32, marginRight: 40, width: 32, position: 'relative'}}/>
      </TouchableHighlight>

      <TouchableHighlight
      style={{position: 'relative', top: '0%'}}
        onPress={() => {
          onPress={() => navigate('Home', {name: 'NavBar'})}
          }}>
            <Image source={require('../assets/icons/map.png')} style={{height: 32, marginRight: 40, width: 32, position: 'relative'}}/>
      </TouchableHighlight>

      <TouchableHighlight
      style={{position: 'relative', top: '0%'}}
        onPress={() => {
          onPress={() => navigate('Home', {name: 'NavBar'})}
          }}>
            <Image source={require('../assets/icons/settings.png')} style={{height: 32, marginRight: 40, width: 32, position: 'relative'}}/>
      </TouchableHighlight>

      </View>
    );
  }
}

const registerUserStyle = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    color: 'green',
    textAlign: 'center',
    marginBottom: Dimensions.get('window').height*0.01
  },
  iconsContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: 'white',
  },
});
