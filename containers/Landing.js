import React from 'react';
import { StyleSheet, Dimensions, Button, Text, View } from 'react-native';
import { Constants } from 'expo'

export default class Landing extends React.Component {
  static navigationOptions = {
      header: null,

  };

  currentTime(){
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();

    return {hours: hours, minutes: minutes}
  }

  getTimeBasedGreeting(user){
    var timeNow = this.currentTime();

    if (timeNow.hours > 22 && timeNow.hours < 5){
      return `Hello, ${user}, you'\re up awfully late tonight!`
    }
    else if (timeNow.hours > 4 && timeNow.hours < 13){
      return `Good morning, ${user}!`
    }
    else if (timeNow.hours > 13 && timeNow.hours < 18){
      return `Good afternoon, ${user}!`
    }
    else if (timeNow.hours > 18 && timeNow.hours < 23){
      return `Good evening, ${user}!`
    }
  }

  render() {
    const {navigate} = this.props.navigation;

    return (
      <View style={homeStyle.container}>
      <Text style={homeStyle.header}>NüV - Lifestyle support</Text>
      <View style={homeStyle.buttonContainer}>
        <Text style={{fontSize: 18, color: 'midnightblue'}}> {this.getTimeBasedGreeting("Jarrod")} </Text>
      </View>
      <Button
        title="Go home"
        onPress={() => navigate('Home', {name: 'SignIn'})}
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
  buttonContainer: {
    marginBottom: Dimensions.get('window').height*0.01
  }
});
