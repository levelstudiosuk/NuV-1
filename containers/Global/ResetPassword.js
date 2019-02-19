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
      this.changePasswordText    = this.changePasswordText.bind(this);
      this.changePassword2Text = this.changePassword2Text.bind(this);
      this.resetPasswordRequest = this.resetPasswordRequest.bind(this);
    }

  state = {
      email: "",
      password:    "",
      password2: ""
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

  resetPasswordRequest(){
    var session_url = 'http://nuv-api.herokuapp.com/reset_password_request';
    var {navigate} = this.props.navigation;
    var self = this;
    const formData = new FormData();

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
                  <TextInput
                    style={[signInStyle.button, { marginTop:Dimensions.get('window').height*0.15}]}
                    onChangeText         =  {(password) => {this.changePasswordText(password)}}
                    value                =  {this.state.password} placeholder='New password' placeholderTextColor = 'black'
                    underlineColorAndroid=  'transparent' underlineColorIOS="grey"
                   />
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

         <View style={signInStyle.submitContainer}>
          <GlobalButton
            buttonTitle="Reset password"
            onPress={() => this.resetPasswordRequest()}
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
