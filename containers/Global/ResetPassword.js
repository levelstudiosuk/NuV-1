import    React from 'react';
import {  Alert,
          StyleSheet,
          Platform,
          TextInput,
          Image,
          Dimensions,
          Text,
          View } from 'react-native';
import {  Constants } from 'expo'
import    GlobalButton from '../../components/GlobalButton.js';
import    AutoHeightImage from 'react-native-auto-height-image';
import    axios from 'axios';
import {  Tile  } from 'react-native-elements';
import * as ValidateEmail from '../../helper_functions/ValidateEmail.js';


export default class ResetPassword extends React.Component {
  static navigationOptions = {
    title: null,
    headerTitle: (
     <AutoHeightImage width={75} style={{position: 'absolute', right: Platform.OS === 'android' ? 0 : -65 }} source={require('../../assets/greenlogo.png')}/>
   ),
 }

  constructor(props) {
    super(props);
      this.changeEmailText    = this.changeEmailText.bind(this);
      this.changeTokenText    = this.changeTokenText.bind(this);
      this.changePasswordText    = this.changePasswordText.bind(this);
      this.changePassword2Text = this.changePassword2Text.bind(this);
      this.resetPasswordRequest = this.resetPasswordRequest.bind(this);
    }

  state = {
      email: "",
      password:    "",
      password2: "",
      resetPasswordToken: ""
    };

    changeEmailText(email){
      this.setState({
        email: email
      })
    }

  changePasswordText(password){
    this.setState({
      password: password
    })
  }

  changePassword2Text(password){
    this.setState({
      password2: password
    })
  }

  changeTokenText(token){
    this.setState({
      resetPasswordToken: token
    })
  }

  resetPasswordRequest(){
    var session_url = 'http://nuv-api.herokuapp.com/reset_password_request';
    var {navigate} = this.props.navigation;
    var self = this;
    const formData = new FormData();

    axios.get(session_url, {params: {"reset_password_token": this.state.resetPasswordToken, "new_password": this.state.password.trim(), "new_password_confirmation": this.state.password2}}, { headers: { "Content-Type": "application/json" }}
  ).then(function(response) {
    var responseData = response.request['_response']
    if (responseData === "Password reset code emailed"){
    self.setState({
      resetRequestMade: true
    })
  }
    else {
      Alert.alert(
        'Looks like no NüV account with that email address exists...'
        )
    }
  }).catch(function(e){
      Alert.alert(
        'No NüV account exists with that email address'
        )
        console.log(e);
        })
      }

  resetPasswordEmailRequest(){
    var session_url = 'http://nuv-api.herokuapp.com/reset_password_request';
    var {navigate} = this.props.navigation;
    var self = this;
    const formData = new FormData();

    if (ValidateEmail.validateEmail(this.state.email) != true){
      Alert.alert(
        'Please enter a valid email address'
        )
    }
    else {
    axios.get(session_url, {params: {"email": this.state.email.toLowerCase()}}, { headers: { "Content-Type": "application/json" }}
  ).then(function(response) {
    var responseData = response.request['_response']
    if (responseData === "Password reset code emailed"){
    self.setState({
      resetRequestMade: true
    })
  }
    else {
      Alert.alert(
        'Oh dear - it seems that no NüV account with that email address exists at present'
        )
    }
  }).catch(function(e){
      Alert.alert(
        'Oh dear - it seems that no NüV account with that email address exists at present'
        )
        console.log(e);
        })

      }
      }

render() {
  const {navigate} = this.props.navigation;
    return (

      <View style={signInStyle.container}>

      { !this.state.resetRequestMade ? (

          <TextInput
            style={[signInStyle.button, { marginTop:Dimensions.get('window').height*0.15}]}
            onChangeText         =  {(email) => {this.changeEmailText(email)}}
            value                =  {this.state.email} placeholder='Email address' placeholderTextColor = 'black'
            underlineColorAndroid=  'transparent' underlineColorIOS="grey"
           />

         ) :

      null

        }

        { this.state.resetRequestMade === true ? (

                <View>
                <Text style={{fontSize: Dimensions.get('window').width > 750 ? 20 : 14, textAlign: 'center', marginTop: Dimensions.get('window').height*0.065}}>
                  Please enter your new password here and also verify your identity with the token we sent to your email address{"\n"}{"\n"}
                </Text>

                <View style={{alignItems: 'center'}}>

                  <TextInput
                    style={[signInStyle.button, { marginTop:Dimensions.get('window').height*0.025}]}
                    onChangeText         =  {(password) => {this.changePasswordText(password)}}
                    value                =  {this.state.password} placeholder='New password' placeholderTextColor = 'black'
                    underlineColorAndroid=  'transparent' underlineColorIOS="grey"
                   />
                   </View>

                </View>

           ) :

        null

          }

          { this.state.resetRequestMade === true ? (

            <View>
             <TextInput
               style={signInStyle.button}
               onChangeText          =  {(password2) => {this.changePassword2Text(password2)}}
               value                 =  {this.state.password2} placeholder='Confirm new password' placeholderTextColor  =  'black'
               underlineColorAndroid =  'transparent'
              />
            </View>

             ) :

          null

            }

            { this.state.resetRequestMade === true ? (

              <View>
               <TextInput
                 style={signInStyle.button}
                 onChangeText          =  {(token) => {this.changeTokenText(token)}}
                 value                 =  {this.state.resetPasswordToken} placeholder='Email token' placeholderTextColor  =  'black'
                 underlineColorAndroid =  'transparent'
                />
              </View>

               ) :

            null

              }

         <View style={signInStyle.submitContainer}>
          <GlobalButton
            buttonTitle="Reset password"
            onPress={() => !this.state.resetRequestMade === true ? this.resetPasswordEmailRequest() : this.resetPasswordRequest() }
          />
         </View>
      </View>
    )
  }
}

const signInStyle = StyleSheet.create({
  container: {
    backgroundColor:    'white',
    alignItems:         'center',
    justifyContent:     'center',
  },
  submitContainer: {
    alignItems:         'center',
    marginTop:          30,
    marginBottom:       Dimensions.get('window').height*0.035,
  },
  button: {
    borderBottomColor:  'grey',
    width:              Dimensions.get('window').width*0.5,
    height:             40,
    marginBottom:       Dimensions.get('window').height*0.04,
    borderColor:        'white',
    borderWidth:        1,
    textAlign:          'center',
    fontWeight:         'normal',
    fontSize:           15
  }
});
