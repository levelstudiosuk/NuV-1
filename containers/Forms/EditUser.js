import React from 'react';
import { StyleSheet, ScrollView, Platform, TouchableHighlight, Image, TextInput, Dimensions, Button, Text, View } from 'react-native';
import { Constants } from 'expo'
import GlobalButton from '../../components/GlobalButton.js';
import VWayToggle from '../../components/VWayToggle.js';
import AutoHeightImage from 'react-native-auto-height-image';
import Expo, { ImagePicker } from 'expo';
import {Permissions} from 'expo'
import axios from 'axios';

export default class EditUser extends React.Component {
  static navigationOptions = {
    title: null,
    headerTitle: (
     <AutoHeightImage width={75} style={{position: 'absolute', right: Platform.OS === 'android' ? 0 : -65 }} source={require('../../assets/AppIcons/transparentlogo.png')}/>
 ),
}

  constructor(props) {
  super(props);

  this.changeNameText = this.changeNameText.bind(this);
  this.changeLocationText = this.changeLocationText.bind(this);
  this.changeBioText = this.changeBioText.bind(this);
  this.pickImage = this.pickImage.bind(this);
  this.returnVToggleSelection = this.returnVToggleSelection.bind(this);

}

  state = {
      email: "",
      password: "",
      id: this.props.navigation.getParam('id', 'NO-ID'),
      name: this.props.navigation.getParam('name', 'NO-ID'),
      location: this.props.navigation.getParam('location', 'NO-ID'),
      bio: this.props.navigation.getParam('bio', 'NO-ID'),
      image: null,
      vSelection: this.props.navigation.getParam('user_is_vegan', 'NO-ID')
    };

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

   postData(){
     var user_profile_end_point = 'http://localhost:3000/profiles/' + this.state.id
     var token = this.props.navigation.getParam('token', 'NO-ID');
     const {navigate} = this.props.navigation;
     var self = this;

     axios.patch(user_profile_end_point,
     {"profile": {
      "name": self.state.name,
     "bio": self.state.bio,
     "user_is_vegan": self.returnVeganSelectionForPost(),
     "location": self.state.location,
     "image": "htttp://test.com/avatar"}},
  { headers: { Authorization: `${token}` }}).then(function(response){
    console.log("RESP", response);
    var updatedProfile = JSON.parse(response.request['_response'])

    navigate('UserView', {name: updatedProfile.name, bio: updatedProfile.bio, user_is_vegan: updatedProfile.user_is_vegan, location: updatedProfile.location})
  }
  ).catch(function(e){
      console.log(e);
    })
   }


  render() {
    const {navigate} = this.props.navigation;
    var image = this.state.image

    return (

      <View style={editUserStyle.container}>

      <ScrollView style={{width: Dimensions.get('window').width*0.95}} showsVerticalScrollIndicator={false}>
      <View style={editUserStyle.container}>

      <Text style={{fontSize: 18, textAlign: 'center', marginTop: Dimensions.get('window').height*0.035, marginBottom: Dimensions.get('window').height*0.02 }}>
      You are editing your NüV profile.{"\n"}{"\n"}
      Please ensure information is true and complete all fields.{"\n"}{"\n"}
      Thank you! :-)
      </Text>

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

            <VWayToggle returnVToggleSelection={this.returnVToggleSelection} editingUser={true} user_is_vegan={this.props.navigation.getParam('user_is_vegan', 'NO-ID')} />

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

          <View style={editUserStyle.submitContainer}>
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

const editUserStyle = StyleSheet.create({
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
