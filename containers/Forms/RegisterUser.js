import React from 'react';
import { StyleSheet, Alert, ScrollView, Platform, TouchableHighlight, Image, TextInput, Dimensions, Button, Text, View } from 'react-native';
import { Constants } from 'expo'
import GlobalButton from '../../components/GlobalButton.js';
import VWayToggle from '../../components/VWayToggle.js';
import AutoHeightImage from 'react-native-auto-height-image';
import Expo, { ImagePicker } from 'expo';
import {Permissions} from 'expo'
import axios from 'axios';

export default class RegisterUser extends React.Component {
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
  this.changeNameText = this.changeNameText.bind(this);
  this.changeLocationText = this.changeLocationText.bind(this);
  this.changeBioText = this.changeBioText.bind(this);
  this.pickImage = this.pickImage.bind(this);
  this.returnVToggleSelection = this.returnVToggleSelection.bind(this);
  this.emailFeedback = this.emailFeedback.bind(this);
  this.passwordFeedback = this.passwordFeedback.bind(this);
  this.passwordMatchChecker = this.passwordMatchChecker.bind(this);
  this.fieldCompletionCheck = this.fieldCompletionCheck.bind(this);
  this.processRegistration = this.processRegistration.bind(this);

}

  state = {
      email: "",
      password: "",
      password2: "",
      name: "",
      location: "",
      bio: "",
      image: null,
      vSelection: "vegetarian",
      sentPhotoWarning: false
    };

    componentDidMount(){
      this.setState({
        navigation: this.props.navigation
      })
    }

    fieldCompletionCheck(){
      if (this.state.email === ""){
        Alert.alert(
              "Please enter an email address"
            )
            return;
      }
      if (this.validateEmail() === false) {
        Alert.alert(
              "Please enter a valid email address"
            )
            return;
      }
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
      if (this.validatePassword() === false) {
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
      if (this.state.name === ""){
        Alert.alert(
              "Please enter a username"
            )
           return;
      }
      if (this.state.location === ""){
        Alert.alert(
              "Please enter a hometown"
            )
          return;
      }
      if (this.state.bio === ""){
        Alert.alert(
              "Please enter a bio"
            )
          return;
      }
      if (this.state.sentPhotoWarning === false){
      if (!this.state.image){
        Alert.alert(
              "You have not uploaded a profile picture. Add one or tap 'Submit' to proceed without one"
            )
            this.setState({ sentPhotoWarning: true })
          return;
      }
    }
      else {
        return "Complete"
      }
    }

    validateEmail(){
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(this.state.email.toLowerCase());
    }

    emailFeedback(){
      if (this.validateEmail() === true){
        this.setState({
          emailTextColor: '#0dc6b5'
        })
      }
      else {
        this.setState({
          emailTextColor: 'crimson'
        })
      }
    }

    validatePassword(){
      var re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{9,}$/;
      return re.test(this.state.password);
    }

    passwordFeedback(){
      if (this.validatePassword() === true){
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

    changeEmailText(email){
      this.setState({
        email: email
      })
    }

    changeNameText(name){
      this.setState({
        name: name
      })
    }

    changeLocationText(location){
      this.setState({
        location: location
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

    changeBioText(bio){
      this.setState({
        bio: bio
      })
    }

    processRegistration(){
      this.setState({
        processingRegistration: true
      },
    function(){
      this.postData();
    })
    }

    getButtonMessage(){
      if (this.state.processingRegistration === true){
        return "Processing..."
      }
      else {
        return "Submit"
      }
    }

    postData(){
      if (this.fieldCompletionCheck() != "Complete"){
        return;
      }

      var session_url = 'http://nuv-api.herokuapp.com/signup';
      var {navigate} = this.props.navigation;
      var self = this;
      var uriParts = this.state.image ? this.state.image.split('.') : 'file:///Users/james/programming_work/nuv/NuV/assets/wil.jpg'.split('.');
      var fileType = uriParts[uriParts.length - 1];
      const avatar = 'file:///Users/james/programming_work/nuv/NuV/assets/wil.jpg';
      var pathh = `${avatar}.${fileType}`;

      axios.post(session_url, {"user":
  	{
      "email": this.state.email.trim(),
      "password": this.state.password.trim()
    }
    }
  ).then(function(response) {
        axios.post(`http://nuv-api.herokuapp.com/login`, {"user":
    	{
        "email": self.state.email.trim(),
        "password": self.state.password.trim()
      }
      }).then(function(second_response) {
        var token = second_response.headers.authorization;
        const formData = new FormData();
       formData.append('profile[name]', self.state.name.trim());
       formData.append('profile[bio]', self.state.bio);
       formData.append('profile[user_is_vegan]', self.state.vSelection);
       formData.append('profile[location]', self.state.location);
       formData.append('profile[avatar]', {
        uri: self.state.image ? self.state.image : 'file:///Users/james/programming_work/nuv/NuV/assets/wil.jpg',
       name: self.state.image ? `${Date.now()}.${fileType}` : pathh,
       type: `image/${fileType}`,
      });

         axios.post('http://nuv-api.herokuapp.com/profiles',
        formData,
      { headers: { Authorization: `${token}`, 'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' }})
      .then(function(third_response){
        axios.get('http://nuv-api.herokuapp.com/this_users_profile',
       { headers: { Authorization: `${token}` }})
       .then(function(fourth_response){
         var responseForName = JSON.parse(fourth_response.request['_response'])
         console.log("RESP", responseForName);
         var uri = responseForName.avatar.url

           navigate('Home', {user_id: responseForName.user_id, avatar: uri, token: token, id: responseForName.id, name: responseForName.name, bio: responseForName.bio, user_is_vegan: responseForName.user_is_vegan, location: responseForName.location})
          })
        })
      })
    }).catch(function(e){
          console.log(e);
        })
    }

    returnVToggleSelection(selection){
      this.setState({
        vSelection: selection
      })
    }

    returnVeganSelectionForPost(){
      if (this.state.vSelection === "vegan"){
        return "vegan";
      }
      else if (this.state.vSelection === "vegetarian") {
        return "vegetarian";
      }
      else {
        return null;
      }
    }

    pickImage = async () => {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);

     let result = await ImagePicker.launchImageLibraryAsync({
       allowsEditing: true,
       mediaTypes: ImagePicker.MediaTypeOptions.All,
       quality: 0.5, //NB: Set at 0.5 to reduce file size for DB
       exif: false,  //NB: Set to false to reduce file sive for DB
       aspect: [4, 4]
     });

     console.log(result);

     if (!result.cancelled) {
       this.setState({ image: result.uri});
     }
   };


  render() {
    const {navigate} = this.props.navigation;

    var image = this.state.image

    return (

      <View style={registerUserStyle.container}>

      <ScrollView style={{width: Dimensions.get('window').width*0.95}} showsVerticalScrollIndicator={false}>
      <View style={registerUserStyle.container}>

          <TextInput
            style={{color: this.state.emailTextColor, marginTop: Dimensions.get('window').height*0.1, borderBottomColor: 'grey', width: Dimensions.get('window').width*0.5, height: 40, marginBottom: Dimensions.get('window').height*0.04, borderColor: 'white', borderWidth: 1, textAlign: 'center', fontWeight: 'normal', fontSize: 15}}
            onChangeText={(email) => {this.changeEmailText(email)}}
            value={this.state.email} placeholder='Email address' placeholderTextColor='black'
            underlineColorAndroid='transparent' onEndEditing={this.emailFeedback}
          />

          <TextInput
            style={{color: this.state.passwordTextColor, borderBottomColor: 'grey', width: Dimensions.get('window').width*0.5, height: 40, marginBottom: Dimensions.get('window').height*0.04, borderColor: 'white', borderWidth: 1, textAlign: 'center', fontWeight: 'normal', fontSize: 15}}
            onChangeText={(password) => {this.changePasswordText(password)}}
            value={this.state.password} placeholder='Password' placeholderTextColor='black'
            underlineColorAndroid='transparent' onEndEditing={this.passwordFeedback}
          />

          {
            this.state.firstPasswordError ? (

          <Text style={{fontSize: 15, textAlign: 'center', padding: 20, flexWrap: 'wrap' }}>Your password must be more than 8 characters long and should contain at least one upper case letter, one lower case letter and at least one number.</Text>

        ) : null
      }

          <TextInput
            style={{color: this.state.password2TextColor, borderBottomColor: 'grey', width: Dimensions.get('window').width*0.5, height: 40, marginBottom: Dimensions.get('window').height*0.04, borderColor: 'white', borderWidth: 1, textAlign: 'center', fontWeight: 'normal', fontSize: 15}}
            onChangeText={(password) => {this.changePassword2Text(password)}}
            value={this.state.password2} placeholder='Confirm password' placeholderTextColor='black'
            underlineColorAndroid='transparent' onEndEditing={this.passwordMatchChecker}
          />

          {
            this.state.passwordMismatch ? (

          <Text style={{fontSize: 15, textAlign: 'center', padding: 20, flexWrap: 'wrap' }}>Your passwords need to match. Please review fields.</Text>

        ) : null
      }

          <TextInput
            style={{borderBottomColor: 'grey', width: Dimensions.get('window').width*0.5, height: 40, marginBottom: Dimensions.get('window').height*0.04, borderColor: 'white', borderWidth: 1, textAlign: 'center', fontWeight: 'normal', fontSize: 15}}
            onChangeText={(name) => {this.changeNameText(name)}}
            value={this.state.name} placeholder='Name' placeholderTextColor='black'
            underlineColorAndroid='transparent'
          />

          <TextInput
            style={{borderBottomColor: 'grey', width: Dimensions.get('window').width*0.5, height: 40, marginBottom: Dimensions.get('window').height*0.04, borderColor: 'white', borderWidth: 1, textAlign: 'center', fontWeight: 'normal', fontSize: 15}}
            onChangeText={(location) => {this.changeLocationText(location)}}
            value={this.state.location} placeholder='Town/City' placeholderTextColor='black'
            underlineColorAndroid='transparent'
          />

          <VWayToggle returnVToggleSelection={this.returnVToggleSelection}  />

          <TextInput
            style={{marginTop: Dimensions.get('window').height*0.03, borderWidth: 1, borderColor: 'grey', width: Dimensions.get('window').width*0.75, height: 100, marginBottom: Dimensions.get('window').height*0.04, textAlign: 'center', fontWeight: 'normal', fontSize: 15}}
            onChangeText={(bio) => {this.changeBioText(bio)}}
            value={this.state.bio} placeholder='Tell us about yourself' placeholderTextColor='black'
            underlineColorAndroid='transparent' maxLength={500} multiline={true}
          />

          <GlobalButton
             buttonTitle="Profile pic"
             onPress={() => this.pickImage()}/>


        {image &&
          <Image source={{ uri: image }} style={{ width: 200, height: 200, marginTop: Dimensions.get('window').height*0.05, marginBottom: Dimensions.get('window').height*0.05 }} />}

          <View style={registerUserStyle.submitContainer}>
          <GlobalButton
             buttonTitle={this.getButtonMessage()}
              onPress={() => this.processRegistration()}/>
          </View>

          </View>

          </ScrollView>

      </View>
    );
  }
}

const registerUserStyle = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitContainer: {
    alignItems: 'center',
    marginTop: Dimensions.get('window').height*0.03,
    marginBottom: Platform.OS === 'ios' ? Dimensions.get('window').height*0.3 : Dimensions.get('window').height*0.3
  },
  header: {
    fontSize: 24,
    color: 'green',
    textAlign: 'center',
    marginTop:  Constants.statusBarHeight+10,
    marginBottom: Dimensions.get('window').height*0.01
  },
});
