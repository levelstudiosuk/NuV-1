import React from 'react';
import { StyleSheet, Button, Text, View } from 'react-native';
import { Constants } from 'expo'

export default class Home extends React.Component {
  static navigationOptions = {
      header: null,

  };
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={homeStyle.container}>
      <Text>WELCOME TO NÜV</Text>
      <Button
        title="Go to registration page"
        onPress={() => navigate('Register', {name: 'Home'})}
      />
      </View>
    );
  }
}

const homeStyle = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
