import React from 'react';
import { StyleSheet, Dimensions, Button, Text, View } from 'react-native';
import { Constants } from 'expo'

export default class Home extends React.Component {
  static navigationOptions = {
      header: null,

  };
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={homeStyle.container}>
      <Text style={homeStyle.header}>NüV - Lifestyle support</Text>
      <Button
        style={homeStyle.button}
        title="Register"
        onPress={() => navigate('Register', {name: 'Home'})}
      />
      <Button
        style={homeStyle.button}
        title="Sign in"
        onPress={() => navigate('SignIn', {name: 'Home'})}
      />
      </View>
    );
  }
}

const homeStyle = StyleSheet.create({
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
  button: {
    marginBottom: 10
  }
});
