import React from 'react';
import { StyleSheet, TextInput, Dimensions, Button, Text, View } from 'react-native';
import { Constants } from 'expo'

export default class SignIn extends React.Component {
  static navigationOptions = {
    title: 'Enter your NüV credentials below',
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


      <View>
      <TextInput
    style={{height: 40, borderColor: 'white', borderWidth: 1, textAlign: 'center', fontWeight: 'normal', fontSize: 19}}
    onChangeText={(username) => {this.changeUsernameText(username)}}
    value={this.state.username} placeholder='Enter your NüV username' placeholderTextColor='white'
    underlineColorAndroid='transparent'
   />
   </View>

     <View>
   <TextInput
 style={{height: 40, borderColor: 'white', borderWidth: 1, textAlign: 'center', fontWeight: 'normal', fontSize: 19}}
 onChangeText={(password) => {this.changePasswordText(password)}}
 value={this.state.password} placeholder='Enter your NüV password' placeholderTextColor='white'
 underlineColorAndroid='transparent'
 />
  </View>

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
