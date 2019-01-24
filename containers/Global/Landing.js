import React from 'react';
import { StyleSheet, Image, Dimensions, Text, View } from 'react-native';
import { Constants } from 'expo'
import NavBar from '../../components/NavBar.js';
import GlobalButton from '../../components/GlobalButton.js';
import AutoHeightImage from 'react-native-auto-height-image';

export default class Landing extends React.Component {
  static navigationOptions = {
      header: null,

  };
  render() {

    const {navigate} = this.props.navigation;

    return (
      <View style={landingStyle.container}>
      <AutoHeightImage source={require('../../assets/AppIcons/transparentlogo.png')} style={{marginTop: Constants.statusBarHeight + Dimensions.get('window').height*0.18}} width={Dimensions.get('window').width*0.77} />

      <View style={landingStyle.iconsContainer}>

      <GlobalButton marginLeft={Dimensions.get('window').width*0.12} onPress={() => navigate('SignIn', {name: 'Home'})} buttonTitle={"Sign in"} />
      <GlobalButton marginRight={Dimensions.get('window').width*0.20} onPress={() => navigate('Register', {name: 'Home'})} buttonTitle={"Register"} />

      </View>

      <View style={landingStyle.descriptionContainer}>
        <Text style={landingStyle.descriptionText}>DESCRIPTION: At vero eos et aos ducimupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod max</Text>
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
    marginTop: Dimensions.get('window').height*0.1
  },
  descriptionText: {
    paddingLeft: Dimensions.get('window').width*0.115,
    paddingRight: Dimensions.get('window').width*0.115
  },

  iconsContainer: {
    width: Dimensions.get('window').width,
    marginLeft: 0,
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
