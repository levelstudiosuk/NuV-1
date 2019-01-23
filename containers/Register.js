import React from 'react';
import { StyleSheet, Button, Text, View } from 'react-native';
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
      <Text>
      REGISTER FOR NÜV
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
});
