import React from 'react';
import { StyleSheet, TextInput, Dimensions, Text, View } from 'react-native';
import { Constants } from 'expo'
import GlobalButton from '../../components/GlobalButton.js';
import AutoHeightImage from 'react-native-auto-height-image';

export default class SignIn extends React.Component {
  static navigationOptions = {
    title: null,

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
      <View style={signInStyle.container}>


      <AutoHeightImage source={require('../../assets/AppIcons/transparentlogo.png')} style={{marginTop: Constants.statusBarHeight + Dimensions.get('window').height*0.05}} width={Dimensions.get('window').width*0.77} />


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

         <View style={signInStyle.submitContainer}>
         <GlobalButton onPress={() => navigate('Home', {name: 'SignIn'})} buttonTitle={"Sign in"} />
         </View>

      </View>
    );
  }
}

const signInStyle = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitContainer: {
    alignItems: 'center'
  },
  header: {
    fontSize: 24,
    color: 'green',
    textAlign: 'center',
    marginTop:  Constants.statusBarHeight+10,
    marginBottom: Dimensions.get('window').height*0.01
  },
});
