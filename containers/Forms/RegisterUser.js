import React from 'react';
import { StyleSheet, TextInput, Dimensions, Button, Text, View } from 'react-native';
import { Constants } from 'expo'

export default class RegisterUser extends React.Component {
  static navigationOptions = {
    title: 'Enter your NüV registration data below',
    header: null,
  };

  constructor(props) {
  super(props);

  this.changeUsernameText = this.changeUsernameText.bind(this);
  this.changePasswordText = this.changePasswordText.bind(this);

}

  state = {
      username: "",
      password: ""
    };

    changeUsernameText(username){
      this.setState({
        username: username
      })
    }

    changePasswordText(password){
      this.setState({
        password: password
      })
    }

  render() {
    const {navigate} = this.props.navigation;

    return (
      <View style={registerUserStyle.container}>
        <Text style={registerUserStyle.header}>
        NüV - Lifestyle support
        </Text>

          <TextInput
            style={{height: 40, marginBottom: Dimensions.get('window').height*0.04, borderColor: 'green', borderWidth: 1, textAlign: 'center', fontWeight: 'normal', fontSize: 15}}
            onChangeText={(username) => {this.changeUsernameText(username)}}
            value={this.state.username} placeholder='Your NüV username' placeholderTextColor='black'
            underlineColorAndroid='transparent'
          />

         <TextInput
           style={{height: 40, marginBottom: Dimensions.get('window').height*0.04, borderColor: 'green', borderWidth: 1, textAlign: 'center', fontWeight: 'normal', fontSize: 15}}
           onChangeText={(password) => {this.changePasswordText(password)}}
           value={this.state.password} placeholder='Your NüV password' placeholderTextColor='black'
           underlineColorAndroid='transparent'
         />

         <View style={{marginBottom: Dimensions.get('window').height*0.02}}>
         <Button
           title="Submit and register for NüV"
           onPress={() => navigate('MyProfile', {name: 'SignIn'})}
         />
         </View>

         <Button
           title="Go home"
           onPress={() => navigate('Home', {name: 'SignIn'})}
         />

      </View>
    );
  }
}

const registerUserStyle = StyleSheet.create({
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
