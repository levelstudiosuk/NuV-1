import React from 'react';
import { StyleSheet, TextInput, Image, TouchableHighlight, Dimensions, Button, Text, View } from 'react-native';
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
      <View style={navStyle.iconsContainer}>

      <TouchableHighlight underlayColor="white"
          onPress={() => navigate('Home', this.props.attributes)}
          >
            <Image source={require('../assets/AppIcons/home.png')} style={{height: 32, marginLeft: Dimensions.get('window').width*0.11, marginRight: Dimensions.get('window').width*0.11, width: 32, marginBottom: 20}}/>
      </TouchableHighlight>

      <TouchableHighlight underlayColor="white"
      onPress={() => navigate('Map', this.props.attributes)}
          >
            <Image source={require('../assets/AppIcons/map.png')} style={{height: 32, marginRight: Dimensions.get('window').width*0.11, width: 32, marginBottom: 20}}/>
      </TouchableHighlight>

      <TouchableHighlight underlayColor="white"
      onPress={() => navigate('Favourites', this.props.attributes)}
          >
            <Image source={require('../assets/AppIcons/star.png')} style={{height: 32, marginRight: Dimensions.get('window').width*0.11, width: 32, marginBottom: 20}}/>
      </TouchableHighlight>

      <TouchableHighlight underlayColor="white"
        onPress={() => navigate('Landing', this.props.attributes)}
          >
            <Image source={require('../assets/AppIcons/settings.png')} style={{height: 32, marginRight: Dimensions.get('window').width*0.11, width: 32, marginBottom: 20}}/>
      </TouchableHighlight>

      </View>
    );
  }
}

const navStyle = StyleSheet.create({
  iconsContainer: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
