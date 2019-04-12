import    React from 'react';
import {  Alert,
          StyleSheet,
          Platform,
          TextInput,
          Image,
          Dimensions,
          Text,
          AsyncStorage,
          View } from 'react-native';
import {  Constants } from 'expo'
import    GlobalButton from '../../components/GlobalButton.js';
import    AutoHeightImage from 'react-native-auto-height-image';
import    axios from 'axios';
import {  Tile  } from 'react-native-elements';

export default class SignIn extends React.Component {
  static navigationOptions = {
    title: null,
    headerTitle: (
     <AutoHeightImage width={75} style={{position: 'absolute', right: Platform.OS === 'android' ? 0 : -65 }} source={require('../../assets/greenlogo.png')}/>
   ),
 }

  constructor(props) {
    super(props);
      this.changeEmailText    = this.changeEmailText.bind(this);
      this.changePasswordText = this.changePasswordText.bind(this);
    }

  state = {

    };

  componentDidMount(){
    this.retrieveUserCredentials();
  }

  retrieveUserCredentials(){
      AsyncStorage.getItem('me').then((me) => {
        this.setState({
          email: me ? JSON.parse(me)[0].email : "",
          password: me ? JSON.parse(me)[0].password : "",
          userRemembered: true
        }, function(){
          if (!me){
            this.setState({
              email: "",
              password: "",
              userRemembered: false
            }
          )
          }
        })
      }).catch((error) => {
        console.log(error)
       }
     )
      }

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

  transitionToResetPage(){
    var {navigate} = this.props.navigation;

    navigate('ResetPassword')
  }

  storeLogInCredentials = async(response, token, admin) => {

    var self = this;
    var {navigate} = this.props.navigation;
    var responseForName = response;
    var uri = responseForName.needs_avatar === true ? null : responseForName.avatar
    var token = token;
    var admin = admin;

    var credentials = {email: this.state.email, password: this.state.password}

    try {
      AsyncStorage.getItem('me').then((me) => {
        const myDetails = me ? JSON.parse(me) : [];
        if (myDetails.length === 0){
          myDetails.push(credentials);
          AsyncStorage.setItem('me', JSON.stringify(myDetails));
      }
      navigate('Home', {
            avatar:        uri,
            token:         token,
            id:            responseForName.id,
            name:          responseForName.name,
            bio:           responseForName.bio,
            user_is_vegan: responseForName.user_is_vegan,
            user_id:       responseForName.user_id,
            location:      responseForName.location,
            admin: admin
          })
  })}
    catch (error) {
      Alert.alert(
             "Could not complete the login process"
          )
    }
}

  postData(){
    var session_url = 'http://nuv-api.herokuapp.com/login';
    var {navigate} = this.props.navigation;
    var self = this;
    axios.post(session_url, {"user":
	{
    "email": this.state.email.trim(),
    "password": this.state.password.trim()
  }
  }
  ).then(function(response) {
    var token = response.headers.authorization
    var admin = JSON.parse(response.request['_response']).admin
      axios.get('http://nuv-api.herokuapp.com/this_users_profile',
        { headers: { Authorization: `${token}` }})

   .then(function(second_response){
     console.log("Response for name: ", second_response);
     var responseForName = JSON.parse(second_response.request['_response'])
     console.log("Response for name2 : ", responseForName);
     var uri = responseForName.needs_avatar === true ? null : responseForName.avatar

     if (self.state.userRemembered === false){
     self.storeLogInCredentials(responseForName, token, admin);
   }
   else {
     navigate('Home', {
           avatar:        uri,
           token:         token,
           id:            responseForName.id,
           name:          responseForName.name,
           bio:           responseForName.bio,
           user_is_vegan: responseForName.user_is_vegan,
           user_id:       responseForName.user_id,
           location:      responseForName.location,
           admin: admin
         })
   }

    })}).catch(function(e){
      Alert.alert(
        'There was an error logging you in. Make sure to enter valid credentials.'
        )
        console.log(e);
        })
      }

render() {
  const {navigate} = this.props.navigation;
    return (

      <View style={signInStyle.container}>

          <TextInput
            style={[signInStyle.button, { marginTop:Dimensions.get('window').height*0.15}]}
            onChangeText         =  {(email) => {this.changeEmailText(email)}}
            value                =  {this.state.email} placeholder='Email address' placeholderTextColor = 'black'
            underlineColorAndroid=  'transparent' underlineColorIOS="grey"
           />

         <TextInput
           style={signInStyle.button}
           onChangeText          =  {(password) => {this.changePasswordText(password)}}
           value                 =  {this.state.password} placeholder='Password' placeholderTextColor  =  'black'
           underlineColorAndroid =  'transparent'
           secureTextEntry={true}
          />

         <View style={signInStyle.submitContainer}>
          <GlobalButton
            buttonTitle="Sign in"
            onPress={() => this.postData()}
          />
         </View>
         <View>

         <Text
         style={{fontSize: Dimensions.get('window').width > 750 ? 20 : 16, color: '#2e8302', textAlign: 'center', paddingLeft: 20, paddingRight: 20}}
         onPress={() => this.transitionToResetPage()}
         >
         Forgotten password?
        </Text>
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
