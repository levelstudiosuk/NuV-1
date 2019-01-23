import React from 'react';
import { StyleSheet, Button, Text, View } from 'react-native';

export default class Register extends React.Component {
  static navigationOptions = {
    title: 'Register for NüV',
  };
  render() {
    const {navigate} = this.props.navigation;
    return (
      <Button
        title="Go home"
        onPress={() => navigate('Home', {name: 'Register'})}
      />
    );
  }
}
