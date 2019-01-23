import React from 'react';
import { StyleSheet, Dimensions, Button, Text, View } from 'react-native';
import { Constants } from 'expo'
import * as TimeGreeting from '../../helper_functions/TimeGreeting.js';
import NavBar from '../../components/NavBar.js';

export default class Home extends React.Component {
  static navigationOptions = {
      header: null,

  };

  render() {
    const {navigate} = this.props.navigation;

    return (
      <View style={homeStyle.container}>
      <Text style={homeStyle.header}>NüV - Lifestyle support</Text>
      <View style={homeStyle.buttonContainer}>
        <Text style={{fontSize: 18, color: 'midnightblue'}}> {TimeGreeting.getTimeBasedGreeting("Jarrod")} </Text>
      </View>
      <Button
        title="Go [somewhere tbc]"
        onPress={() => navigate('Home', {name: 'SignIn'})}
      />
      <NavBar navigation={this.props.navigation} />
      </View>
    );
  }
}

const homeStyle = StyleSheet.create({
  container: {
    flex: 1,
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
  buttonContainer: {
    marginBottom: Dimensions.get('window').height*0.01
  }
});
