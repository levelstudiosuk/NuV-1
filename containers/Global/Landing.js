import React from 'react';
import { StyleSheet, Dimensions, Button, Text, View } from 'react-native';
import { Constants } from 'expo'

export default class Landing extends React.Component {
  static navigationOptions = {
      header: null,

  };
  render() {

    const {navigate} = this.props.navigation;

    return (
      <View style={landingStyle.container}>
      <Text style={landingStyle.header}>NüV - Lifestyle support</Text>
      <View style={landingStyle.buttonContainer}>
      <Button
        title="Register"
        onPress={() => navigate('Register', {name: 'Home'})}
      />
      </View>
      <View style={landingStyle.buttonContainer}>
      <Button
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
    marginTop: Constants.statusBarHeight,
    flexDirection: 'column',
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
  buttonContainer: {
    marginBottom: Dimensions.get('window').height*0.01
  }
});
