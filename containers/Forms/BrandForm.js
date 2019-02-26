import React from 'react';
import { Alert, StyleSheet, ScrollView, Platform, TouchableHighlight, Image, TextInput, Dimensions, Button, Text, View } from 'react-native';
import { Constants } from 'expo'
import GlobalButton from '../../components/GlobalButton.js';
import TwoWayToggle from '../../components/TwoWayToggle.js';
import AutoHeightImage from 'react-native-auto-height-image';
import Expo, { ImagePicker } from 'expo';
import {Permissions} from 'expo'
import { Dropdown } from 'react-native-material-dropdown';
import StarRating from 'react-native-star-rating';
import axios from 'axios';
import * as TimeGreeting from '../../helper_functions/TimeGreeting.js';
import SubmittedFormSpinner from '../../components/SubmittedFormSpinner.js';

export default class BrandForm extends React.Component {
  static navigationOptions = {
    title: null,
    headerTitle: (
     <AutoHeightImage width={75} style={{position: 'absolute', right: Platform.OS === 'android' ? 0 : -65 }} source={require('../../assets/greenlogo.png')}/>
 ),
}

  constructor(props) {
  super(props);

  this.changeNameText = this.changeNameText.bind(this);
  this.changeDescriptionText = this.changeDescriptionText.bind(this);
  this.changeLocationText = this.changeLocationText.bind(this);
  this.changeUrlText = this.changeUrlText.bind(this);
  this.pickImage = this.pickImage.bind(this);
  this.onStarRatingPress = this.onStarRatingPress.bind(this);
  this.returnVToggleSelection = this.returnVToggleSelection.bind(this);
  this.postData = this.postData.bind(this);

}

  state = {
      name: "",
      description: "",
      location: "",
      url: "",
      image: null,
      type: "",
      starCount: 3,
      vegan: true,
      spinner: false
    };

    onStarRatingPress(rating) {
    this.setState({
      starCount: rating
    });
  }

    changeNameText(name){
      this.setState({
        name: name
      })
    }

    returnVToggleSelection(selection){
      if (selection === "Vegan"){
        this.setState({
          vegan: true
        })
      }
      else {
        this.setState({
          vegan: false
        })
      }
    }

    changeLocationText(location){
      this.setState({
        location: location
      })
    }

    changeDescriptionText(description){
      this.setState({
        description: description
      })
    }

    changeUrlText(url){
      this.setState({
        url: url
      })
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
       this.setState({ image: result.uri });
     }
   };

   validateUrl(url) {
    var res = url.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    if(res == null)
        return false;
    else
        return true;
}

   fieldCompletionCheck(){
     if (this.state.name === "" || this.state.name.length < 1 || !this.state.name.match(/[a-z]/i)){
       Alert.alert(
             "Please enter the name of the brand"
           )
           return;
     }
     if (this.state.type === ""){
       Alert.alert(
             "Please pick the category the brand falls into"
           )
           return;
     }
     if (this.state.description === "" || this.state.description.length < 1 || !this.state.description.match(/[a-z]/i)){
       Alert.alert(
             "Please enter a proper description of the brand"
           )
           return;
     }
     if (this.state.url === "" || this.validateUrl(this.state.url) != true){
       Alert.alert(
             "Please enter a valid url"
           )
         return;
     }
     if (!this.state.image){
       Alert.alert(
             "You have not uploaded a brand picture. Add one to proceed"
           )
         return;
     }
   else {
     return "Complete"
   }
   }

   postData(){

     if (this.fieldCompletionCheck() != "Complete"){
       return;
     }

     else {

    this.setState({
      spinner: true
    }, function(){

    var {navigate} = this.props.navigation;
    var self = this;
    var token = this.props.navigation.getParam('token', 'NO-ID');
    var uriParts = this.state.image.split('.')
    var fileType = uriParts[uriParts.length - 1];
    const formData = new FormData();
    formData.append('brand[title]', self.state.name);
    formData.append('brand[description]', self.state.description);
    formData.append('brand[content_is_vegan]', self.state.vegan);
    formData.append('brand[brand_type]', self.state.type);
    formData.append('brand[URL]', self.state.url.toLowerCase());
    formData.append('brand[brand_main_image]', {
     uri: self.state.image,
     name: `${self.state.image}.${fileType}`,
     type: `image/${fileType}`,
   });

      axios.post('http://nuv-api.herokuapp.com/brands',
     formData,
   { headers: { Authorization: `${token}`, 'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' }})

   .then(function(response){
     console.log("RESP", response);
     var brandResponse = JSON.parse(response.request['_response'])
     var {navigate} = self.props.navigation;

     self.setState({
       uploadedBrandId: brandResponse.id
     }, function(){
       self.postRating()
      })

   })
   .catch(function(error){
     console.log(error);
   })

 })

}
   }

   postRating(){

     const {navigate} = this.props.navigation;


     this.setState({
       ratingPending: true
     },
     function(){

       var token = this.props.navigation.getParam('token', 'NO-ID');
       var id = this.state.uploadedBrandId
       console.log("Brand ID", id);
       var self = this;

     axios.post(`http://nuv-api.herokuapp.com/brands/${id}/rating`, {"rating": `${self.state.starCount}`},

  { headers: { Authorization: `${token}` }})

  .then(function(response){

    self.setState({
      ratingPending: false,
      spinner: false
    },
    function(){
      navigate('Home', {avatar: self.props.navigation.getParam('avatar', 'NO-ID'), token: self.props.navigation.getParam('token', 'NO-ID'), id: self.props.navigation.getParam('id', 'NO-ID'), name: self.props.navigation.getParam('name', 'NO-ID'), bio: self.props.navigation.getParam('bio', 'NO-ID'), location: self.props.navigation.getParam('location', 'NO-ID'), user_is_vegan: self.props.navigation.getParam('user_is_vegan', 'NO-ID')})

    }
  )
  }).catch(function(error){
    console.log("Error: ", error);
  })
})
   }


  render() {
    const {navigate} = this.props.navigation;
    var image = this.state.image

    let typeOptions = [{
      value: 'Household',
    },
     {
      value: 'Cosmetics',
    },
     {
      value: 'Fashion',
    },
    {
     value: 'Consumables',
   }
  ];

    return (

      <View style={registerUserStyle.container}>

      <SubmittedFormSpinner spinner={this.state.spinner} />

      <ScrollView style={{width: Dimensions.get('window').width*0.95}} showsVerticalScrollIndicator={false}>
      <View style={registerUserStyle.container}>

            <View style={{marginTop: Dimensions.get('window').height*0.07}}>
            </View>

            <AutoHeightImage
              width={70}
              source={require('../../assets/AppIcons/shopping.png')}
              style={{marginBottom: Dimensions.get('window').height*0.04}}
            />

            <Text style={{fontSize: 18, textAlign: 'center'}}>
            You are adding a BRAND or SHOP{"\n"}{"\n"}
            Please share your favourite ethical brands and shops here, our community will thank you. All we ask is you ensure information is as accurate as possible and complete all fields.{"\n"}{"\n"}
            PS. Thanks {this.props.navigation.getParam('name', 'NO-ID')} - you are a star!
            </Text>

            <View style={{marginTop: Dimensions.get('window').height*0.04}}>
            </View>

            <TwoWayToggle returnVToggleSelection={this.returnVToggleSelection} />

          <TextInput
            style={{marginTop: Dimensions.get('window').height*0.02, borderBottomColor: 'grey', width: Dimensions.get('window').width*0.5, height: 40, marginBottom: Dimensions.get('window').height*0.05, borderColor: 'white', borderWidth: 1, textAlign: 'center', fontWeight: 'normal', fontSize: 15}}
            onChangeText={(name) => {this.changeNameText(name)}}
            value={this.state.name} placeholder='Brand name' placeholderTextColor='black'
            underlineColorAndroid='transparent'
          />

          <Dropdown
            containerStyle={{justifyContent: 'center', height: Dimensions.get('window').height*0.04, width: Dimensions.get('window').width*0.5, marginBottom: Dimensions.get('window').height*0.04}}
            label='Brand category'
            textColor={'black'}
            baseColor={'black'}
            dropdownOffset={{ top: 0, left: 0 }}
            data={typeOptions}
            itemTextStyle={{textAlign: 'center'}}
            overlayStyle={{alignItems: 'center', marginTop: Dimensions.get('window').height*0.09}}
            pickerStyle={{alignItems: 'center', backgroundColor: 'white', width: Dimensions.get('window').width*0.5}}
            selectedItemColor={'black'}
            disabledItemColor={'grey'}
            itemTextStyle={{textAlign: 'center'}}
            onChangeText={(value) => this.setState({type: value}) }
          />

          <TextInput
            style={{borderBottomColor: 'grey', width: Dimensions.get('window').width*0.5, height: 40, marginBottom: Dimensions.get('window').height*0.04, borderColor: 'white', borderWidth: 1, textAlign: 'center', fontWeight: 'normal', fontSize: 15}}
            onChangeText={(description) => {this.changeDescriptionText(description)}}
            value={this.state.description} placeholder='Brand description' placeholderTextColor='black'
            underlineColorAndroid='transparent'
          />

          <TextInput
            style={{borderBottomColor: 'grey', width: Dimensions.get('window').width*0.5, height: 40, marginBottom: Dimensions.get('window').height*0.04, borderColor: 'white', borderWidth: 1, textAlign: 'center', fontWeight: 'normal', fontSize: 15}}
            onChangeText={(url) => {this.changeUrlText(url)}}
            value={this.state.url} placeholder='Link to site' placeholderTextColor='black'
            underlineColorAndroid='transparent' maxLength={500} multiline={true}
          />

          <StarRating
        disabled={false}
        maxStars={5}
        rating={this.state.starCount}
        selectedStar={(rating) => this.onStarRatingPress(rating)}
        fullStarColor={'#a2e444'}
        containerStyle={{marginTop: Dimensions.get('window').height*0.01, marginBottom: Dimensions.get('window').height*0.04}}
      />

          <GlobalButton
             buttonTitle="Brand logo"
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
    marginBottom: Platform.OS === 'ios' ? Dimensions.get('window').height*0.5 : Dimensions.get('window').height*0.5
  },
  header: {
    fontSize: 24,
    color: 'green',
    textAlign: 'center',
    marginTop:  Constants.statusBarHeight+10,
    marginBottom: Dimensions.get('window').height*0.01
  },
});
