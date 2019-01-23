import React from 'react';
import { StyleSheet, Button, Text, View } from 'react-native';

export default class Home extends React.Component {
  static navigationOptions = {
    title: 'Welcome',
  };
  render() {
    const {navigate} = this.props.navigation;
    return (
      <Button
        title="Go to registration page"
        onPress={() => navigate('Register', {name: 'Home'})}
      />
    );
  }
}
