import React from 'react';
import { StyleSheet, Dimensions, Button, Text, View } from 'react-native';
import { Constants } from 'expo'

export default class SignIn extends React.Component {
  static navigationOptions = {
    title: 'Enter your NüV credentials below',
    header: null,
  };
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={signInStyle.container}>
      <Text style={signInStyle.header}>
      Sign in to NüV
      </Text>
      <Button
        title="Go home"
        onPress={() => navigate('Home', {name: 'SignIn'})}
      />
      </View>
    );
  }
}

const signInStyle = StyleSheet.create({
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
});
