import React from 'react';
import { StyleSheet, ScrollView, Platform, TouchableHighlight, Image, TextInput, Dimensions, Button, Text, View } from 'react-native';
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

}

  state = {
      email: "",
      password: "",
      name: "",
      location: "",
      bio: "",
      image: null
    };

    componentDidMount(){
      this.setState({
        navigation: this.props.navigation
      })
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

    changeBioText(bio){
      this.setState({
        bio: bio
      })
    }

    postData(){
      var session_url = 'http://localhost:3000/signup';
      var {navigate} = this.props.navigation;
      var self = this;
      axios.post(session_url, {"user":
  	{
      "email": this.state.email,
      "password": this.state.password
    }
    }
  ).then(function(response) {
        axios.post(`http://localhost:3000/login`, {"user":
    	{
        "email": self.state.email,
        "password": self.state.password
      }
      }).then(function(second_response) {
        var token = second_response.headers.authorization
         axios.post('http://localhost:3000/profiles',
         {"profile": {
          "name": self.state.name,
         "bio": self.state.bio,
         "user_is_vegan": self.returnVeganSelectionForPost(),
         "location": self.state.location,
         "image": "htttp://test.com/avatar"}},
      { headers: { Authorization: `${token}` }})
      .then(function(third_response){
        axios.get('http://localhost:3000/this_users_profile',
       { headers: { Authorization: `${token}` }})
       .then(function(fourth_response){
         var responseForName = JSON.parse(fourth_response.request['_response'])
           navigate('Home', {token: token, id: responseForName.id, name: responseForName.name, bio: responseForName.bio, user_is_vegan: responseForName.user_is_vegan, location: responseForName.location})
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
       quality: 1,
       exif: true,
       aspect: [4, 4]
     });

     console.log(result);

     if (!result.cancelled) {
       this.setState({ image: result.uri });
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
            style={{marginTop: Dimensions.get('window').height*0.1, borderBottomColor: 'grey', width: Dimensions.get('window').width*0.5, height: 40, marginBottom: Dimensions.get('window').height*0.04, borderColor: 'white', borderWidth: 1, textAlign: 'center', fontWeight: 'normal', fontSize: 15}}
            onChangeText={(email) => {this.changeEmailText(email)}}
            value={this.state.email} placeholder='Email address' placeholderTextColor='black'
            underlineColorAndroid='transparent'
          />

          <TextInput
            style={{borderBottomColor: 'grey', width: Dimensions.get('window').width*0.5, height: 40, marginBottom: Dimensions.get('window').height*0.04, borderColor: 'white', borderWidth: 1, textAlign: 'center', fontWeight: 'normal', fontSize: 15}}
            onChangeText={(password) => {this.changePasswordText(password)}}
            value={this.state.password} placeholder='Password' placeholderTextColor='black'
            underlineColorAndroid='transparent'
          />

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

          <VWayToggle returnVToggleSelection={this.returnVToggleSelection} />

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
             buttonTitle="Submit"
              onPress={() => this.postData()}/>
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
    marginBottom: Platform.OS === 'ios' ? Dimensions.get('window').height*0.05 : Dimensions.get('window').height*0.05
  },
  header: {
    fontSize: 24,
    color: 'green',
    textAlign: 'center',
    marginTop:  Constants.statusBarHeight+10,
    marginBottom: Dimensions.get('window').height*0.01
  },
});
