import React from 'react';
import { Alert, StyleSheet, Platform, TextInput, Image, Dimensions, Text, View } from 'react-native';
import { Constants } from 'expo'
import GlobalButton from '../../components/GlobalButton.js';
import AutoHeightImage from 'react-native-auto-height-image';
import axios from 'axios';

export default class SignIn extends React.Component {
  static navigationOptions = {
    title: null,
    headerTitle: (
     <AutoHeightImage width={75} style={{position: 'absolute', right: Platform.OS === 'android' ? 0 : -65 }} source={require('../../assets/AppIcons/transparentlogo.png')}/>
 ),
}

  constructor(props) {
  super(props);

  this.changeEmailText = this.changeEmailText.bind(this);
  this.changePasswordText = this.changePasswordText.bind(this);

}

  state = {
      email: "",
      password: ""
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

      axios.get('http://nuv-api.herokuapp.com/this_users_profile',

   { headers: { Authorization: `${token}` }})

   .then(function(second_response){

     var responseForName = JSON.parse(second_response.request['_response'])
     console.log("URL",responseForName.avatar.url);
     var uri = responseForName.avatar.url

      navigate('Home', {avatar: uri, token: token, id: responseForName.id, name: responseForName.name, bio: responseForName.bio, user_is_vegan: responseForName.user_is_vegan, location: responseForName.location})

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
            style={{marginTop: Dimensions.get('window').height*0.15, borderBottomColor: 'grey', width: Dimensions.get('window').width*0.5, height: 40, marginBottom: Dimensions.get('window').height*0.04, borderColor: 'white', borderWidth: 1, textAlign: 'center', fontWeight: 'normal', fontSize: 15}}
            onChangeText={(email) => {this.changeEmailText(email)}}
            value={this.state.email} placeholder='Email address' placeholderTextColor='black'
            underlineColorAndroid='transparent' underlineColorIOS="grey"
          />

         <TextInput
           style={{borderBottomColor: 'grey', width: Dimensions.get('window').width*0.5, height: 40, marginBottom: Dimensions.get('window').height*0.04, borderColor: 'white', borderWidth: 1, textAlign: 'center', fontWeight: 'normal', fontSize: 15}}
           onChangeText={(password) => {this.changePasswordText(password)}}
           value={this.state.password} placeholder='Password' placeholderTextColor='black'
           underlineColorAndroid='transparent'
         />

         <View style={signInStyle.submitContainer}>
         <GlobalButton buttonTitle="Sign in" onPress={() => this.postData()} />
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
    alignItems: 'center',
    marginTop: 30,
  },
  header: {
    fontSize: 24,
    color: 'green',
    textAlign: 'center',
    marginTop:  Constants.statusBarHeight+10,
    marginBottom: Dimensions.get('window').height*0.01
  },
});
