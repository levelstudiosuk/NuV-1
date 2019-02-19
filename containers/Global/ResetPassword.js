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
import * as ValidatePassword from '../../helper_functions/ValidatePassword.js';
import SubmittedFormSpinner from '../../components/SubmittedFormSpinner.js';

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
      this.resetPasswordEmailRequest = this.resetPasswordEmailRequest.bind(this);
      this.passwordFeedback = this.passwordFeedback.bind(this);
      this.passwordMatchChecker = this.passwordMatchChecker.bind(this);
      this.fieldCompletionCheck = this.fieldCompletionCheck.bind(this);
    }

  state = {
      email: "",
      password:    "",
      password2: "",
      resetPasswordToken: "",
      spinner: false
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

  fieldCompletionCheck(){
    if (this.state.password === ""){
      Alert.alert(
            "Please enter a password"
          )
          return;
    }
    if (this.state.password2 === ""){
      Alert.alert(
            "Please fill in both password fields"
          )
          return;
    }
    if (ValidatePassword.validatePassword(this.state.password) === false) {
      Alert.alert(
            "Please enter a valid password"
          )
          return;
    }
    if (this.state.password != this.state.password2){
      Alert.alert(
            "Your passwords need to match"
          )
          return;
    }
    if (this.state.resetPasswordToken === ""){
      Alert.alert(
            "Please enter the token from the email you received from NüV"
          )
          return;
    }
  else {
    return "Complete"
  }
  }

  passwordFeedback(){
    if (ValidatePassword.validatePassword(this.state.password) === true){
      this.setState({
        passwordTextColor: '#0dc6b5',
        firstPasswordError: false
      })
    }
    else {
      this.setState({
        passwordTextColor: 'crimson',
        firstPasswordError: true
      })
    }
  }

  passwordMatchChecker(){
    if (this.state.password != this.state.password2){
          this.setState({
            passwordTextColor: 'crimson',
            password2TextColor: 'crimson',
            passwordMismatch: true
          })
    }
    else {
      this.setState({
        password2TextColor: '#0dc6b5',
        passwordTextColor: '#0dc6b5',
        firstPasswordError: false,
        passwordMismatch: false
      })
    }
  }


  resetPasswordRequest(){

    if (this.fieldCompletionCheck() != "Complete"){
      return;
    }

    else {

      var session_url = 'http://nuv-api.herokuapp.com/reset_password';
      var {navigate} = this.props.navigation;
      var self = this;

      console.log("Token: ", this.state.resetPasswordToken);

    axios.post(session_url, {"reset_password_token": this.state.resetPasswordToken, "new_password": this.state.password.trim(), "new_password_confirmation": this.state.password2.trim()}, { headers: { "Content-Type": "application/json" }}
  ).then(function(response) {
    var responseData = response.request['_response']
    console.log("Reset response", response);
    if (responseData != "code not found, check email"){
    self.setState({
      spinner: true
    }, function(){
      setTimeout(function(){
      self.setState({
        spinner: false
      }, function(){
        navigate('Landing')
      })
    }, 4500);
    })
  }
    else {
      Alert.alert(
        'Oh dear - it seems that your reset code is not valid'
        )
    }
  }).catch(function(e){
      Alert.alert(
        'That is not a valid reset code'
        )
        console.log(e);
        })
      }
      }

  resetPasswordEmailRequest(){
    var session_url = 'http://nuv-api.herokuapp.com/reset_password_request';
    var {navigate} = this.props.navigation;
    var self = this;

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

      <SubmittedFormSpinner spinner={this.state.spinner} message="Success! You can now log back in to NüV with your new password. Taking you home..." />


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
                <Text style={{paddingLeft: Dimensions.get('window').width*0.025, paddingRight: Dimensions.get('window').width*0.025, fontSize: Dimensions.get('window').width > 750 ? 20 : 14, textAlign: 'center', marginTop: Dimensions.get('window').height*0.065}}>
                  Please verify your identity here with the token we sent to your email address. You might need to check your "Junk" or "Spam" folder{"\n"}{"\n"}
                </Text>

                <View style={{alignItems: 'center'}}>

                  <TextInput
                    style={[signInStyle.button, { color: this.state.passwordTextColor, marginTop:Dimensions.get('window').height*0.025}]}
                    onChangeText         =  {(password) => {this.changePasswordText(password)}}
                    value                =  {this.state.password} placeholder='New password' placeholderTextColor = 'black'
                    underlineColorAndroid=  'transparent' underlineColorIOS="grey"
                    onEndEditing={this.passwordFeedback}

                   />
                   </View>

                   {
                     this.state.firstPasswordError ? (

                   <Text style={{fontSize: 15, textAlign: 'center', padding: 20, flexWrap: 'wrap' }}>Your password must be more than 8 characters long and should contain at least one upper case letter, one lower case letter and at least one number.</Text>

                 ) : null
               }

                </View>

           ) :

        null

          }

          { this.state.resetRequestMade === true ? (

            <View>
             <TextInput
               style={[signInStyle.button, {color: this.state.password2TextColor}]}
               onChangeText          =  {(password2) => {this.changePassword2Text(password2)}}
               value                 =  {this.state.password2} placeholder='Confirm new password' placeholderTextColor  =  'black'
               underlineColorAndroid =  'transparent'
               onEndEditing={this.passwordMatchChecker}
              />

              {
                this.state.passwordMismatch ? (

              <Text style={{fontSize: 15, textAlign: 'center', padding: 20, flexWrap: 'wrap' }}>Your passwords need to match. Please review fields.</Text>

            ) : null
          }


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
    fontSize:           15,
  }
});
