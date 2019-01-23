import React from 'react';
import { StyleSheet, TextInput, Dimensions, Button, Text, View } from 'react-native';
import { Constants } from 'expo'

export default class Register extends React.Component {
  static navigationOptions = {
    title: 'Register for NüV',
    header: null,
  };
  
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={registerStyle.container}>
      <Text style={registerStyle.header}>
      Register for NüV
      </Text>
      <Button
        title="Go home"
        onPress={() => navigate('Home', {name: 'Register'})}
      />
      </View>
    );
  }
}

const registerStyle = StyleSheet.create({
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
