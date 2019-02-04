import React from 'react';
import { StyleSheet, Image, Alert, Dimensions, Text, View, TextStyle, ViewStyle } from 'react-native';
import { Constants } from 'expo'
import NavBar from '../../components/NavBar.js';
import GlobalButton from '../../components/GlobalButton.js';
import AutoHeightImage from 'react-native-auto-height-image';
import axios from 'axios';

export default class Landing extends React.Component {
  static navigationOptions = {
      header: null,

  };

  componentDidMount(){
    this.nudgeHeroku('http://nuv-api.herokuapp.com/login');
  }

  nudgeHeroku(url){
    return axios.get(url)
      .then((response) => console.log(`${url} response: `, response.data)
    ).catch(err => { console.log('caught', err.message); });
  }

  render() {

    const {navigate} = this.props.navigation;
    return (
      <View style={landingStyle.container}>
      <AutoHeightImage source={require('../../assets/AppIcons/transparentlogo.png')} style={{marginTop: Constants.statusBarHeight + Dimensions.get('window').height*0.095}} width={Dimensions.get('window').width*0.77} />

      <View style={landingStyle.iconsContainer}>

      <GlobalButton marginLeft={Dimensions.get('window').width*0.12} onPress={() => navigate('SignIn', {name: 'Home'})} buttonTitle={"Sign in"} />
      <GlobalButton marginRight={Dimensions.get('window').width*0.12} onPress={() => navigate('RegisterUser', {name: 'Home'})} buttonTitle={"Register"} />

      </View>

      <View style={landingStyle.descriptionContainer}>
        <Text style={landingStyle.descriptionText}>

            The lifestyle support system for vegans, vegetarians and the v.curious.{"\n"}{"\n"}
            Join the community. Find and share well researched recipes, brilliant brands, awesome articles and ethical eateries.{"\n"}{"\n"}
            This is just the veganning…
        </Text>
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
  descriptionContainer: {
    marginTop: Dimensions.get('window').height*0.065
  },
  descriptionText: {
    paddingLeft: Dimensions.get('window').width*0.115,
    paddingRight: Dimensions.get('window').width*0.115,
    textAlign: 'center',
    fontSize: 14
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
});
