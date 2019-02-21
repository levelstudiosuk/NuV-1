import React from 'react';
import { StyleSheet, ScrollView, Platform, Alert, TouchableHighlight, Image, TextInput, Dimensions, Button, Text, View } from 'react-native';
import { Constants } from 'expo'
import GlobalButton from '../../components/GlobalButton.js';
import TwoWayToggle from '../../components/TwoWayToggle.js';
import LoadingCelery from '../../components/LoadingCelery.js';
import VenueFormOverlay from '../../components/VenueFormOverlay.js';
import AutoHeightImage from 'react-native-auto-height-image';
import Expo, { ImagePicker } from 'expo';
import {Permissions} from 'expo'
import { Dropdown } from 'react-native-material-dropdown';
import StarRating from 'react-native-star-rating';
import axios from 'axios';
import * as TimeGreeting from '../../helper_functions/TimeGreeting.js';
import SubmittedFormSpinner from '../../components/SubmittedFormSpinner.js';

export default class VenueForm extends React.Component {
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
  this.changePostcodeText = this.changePostcodeText.bind(this);
  this.pickImage = this.pickImage.bind(this);
  this.onStarRatingPress = this.onStarRatingPress.bind(this);
  this.returnVToggleSelection = this.returnVToggleSelection.bind(this);
  this.validatePostcode = this.validatePostcode.bind(this);
  this.openOverlay = this.openOverlay.bind(this);
  this.closeOverlay = this.closeOverlay.bind(this);
  this.userInVenueStateUpdate = this.userInVenueStateUpdate.bind(this);
  this.getPostcodeCoordinates = this.getPostcodeCoordinates.bind(this);
  this.postData = this.postData.bind(this);

}

  state = {
      name: "",
      postcode: "",
      location: "",
      description: "",
      url: "",
      image: null,
      type: "",
      starCount: 3,
      vegan: true,
      overlayVisible: true,
      spinner: false
    };

    componentDidMount(){
      navigator.geolocation.getCurrentPosition(
      position => {
        const myLocation = JSON.stringify(position);

        this.setState({ latitude: position.coords.latitude,
                      longitude: position.coords.longitude }, function(){ console.log("My position", this.state.latitude, this.state.longitude)});
      },
      error => Alert.alert(error.message),
      { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 }
    );
    }

    openOverlay(){
      this.setState({
        overlayVisible: true
      })
    }

    closeOverlay(){
      this.setState({
        overlayVisible: false
      })
    }

    userInVenueStateUpdate(status){
      this.setState({
        userInVenue: status
      }, function(){
        this.closeOverlay();
      })
    }

    onStarRatingPress(rating) {
    this.setState({
      starCount: rating
    });
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

    changeDescriptionText(description){
      this.setState({
        description: description
      })
    }

    changePostcodeText(postcode){
      this.setState({
        postcode: postcode
      })
    }

    changeUrlText(url){
      this.setState({
        url: url
      })
    }

    getButtonTitle(){
      if (!this.state.image){
        return "Add image"
      }
      else if (!this.state.image_two){
        return "Add image 2"
      }
      else if (!this.state.image_three){
        return "Add image 3"
      }
      else if (!this.state.image_four){
        return "Add image 4"
      }
      else if (!this.state.image_five){
        return "Add image 5"
      }
      else if (!this.state.image_six){
        return "Add image 6"
      }
    }

    validatePostcode(){
      var self = this;

      fetch( `http://api.postcodes.io/postcodes/${this.state.postcode.replace(' ', '')}`)
      .then(
    function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' + response.status);
        self.setState({ validPostcode: false }, function(){
          console.log("Postcode valid: ", self.state.validPostcode);
        })
      }
      else {
        self.setState({ validPostcode: true }, function(){
          console.log("Response status: ", response.status);
          if (self.state.userInVenue === false){
          self.getPostcodeCoordinates()
        }
        })
      };
    })}

    getPostcodeCoordinates(){
      var self = this;

      fetch( `http://api.postcodes.io/postcodes/${this.state.postcode}`)
      .then(
    function(response) {
      var response = response
      console.log("response from PC", JSON.parse(response['_bodyInit']));
      self.setState({
        latitude: JSON.parse(response['_bodyInit']).result.latitude,
        longitude: JSON.parse(response['_bodyInit']).result.longitude
      })
    }
  )
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

     if (!result.cancelled && !this.state.image) {
       this.setState({ image: result.uri });
     }
     else if (!result.cancelled && !this.state.image_two) {
       this.setState({ image_two: result.uri });
     }
     else if (!result.cancelled && !this.state.image_three) {
       this.setState({ image_three: result.uri });
     }
     else if (!result.cancelled && !this.state.image_four) {
       this.setState({ image_four: result.uri });
     }
     else if (!result.cancelled && !this.state.image_five) {
       this.setState({ image_five: result.uri });
     }
     else if (!result.cancelled && !this.state.image_six) {
       this.setState({ image_six: result.uri });
     }
   };

   postData(){

     if (this.state.validPostcode === true){

       this.setState({

         postingData: true

       }, function(){

     var {navigate} = this.props.navigation;
     var self = this;
     var token = this.props.navigation.getParam('token', 'NO-ID');
     if (this.state.image){
     var uriParts = this.state.image.split('.')
     var fileType = uriParts[uriParts.length - 1];
     var longitude = this.state.longitude;
     var latitude = this.state.latitude;

   }

     const formData = new FormData();
     formData.append('venue[title]', self.state.name);
     formData.append('venue[description]', self.state.description);
     formData.append('venue[content_is_vegan]', self.state.vegan);
     formData.append('venue[venue_type]', self.state.type);
     formData.append('venue[latitude]', self.state.latitude);
     formData.append('venue[longitude]', self.state.longitude);
     formData.append('venue[url]', self.state.url.toLowerCase());
     formData.append('venue[postcode]', self.state.postcode);
     // formData.append('venue[rating]', self.state.starCount);

     if (this.state.image){
     formData.append('venue[venue_main_image]', {
      uri: self.state.image,
      name: `${self.state.image}.${fileType}`,
      type: `image/${fileType}`,
    });
    }

      if (this.state.image_two){
      formData.append('venue[venue_image_data][]', {
       uri: self.state.image_two,
       name: `${self.state.image_two}.${fileType}`,
       type: `image/${fileType}`,
     });
    }

     if (this.state.image_three){
     formData.append('venue[venue_image_data][]', {
      uri: self.state.image_three,
      name: `${self.state.image_three}.${fileType}`,
      type: `image/${fileType}`,
     });
     }

     if (this.state.image_four){
     formData.append('venue[venue_image_data][]', {
      uri: self.state.image_four,
      name: `${self.state.image_four}.${fileType}`,
      type: `image/${fileType}`,
     });
     }

     if (this.state.image_five){
     formData.append('venue[venue_image_data][]', {
      uri: self.state.image_five,
      name: `${self.state.image_five}.${fileType}`,
      type: `image/${fileType}`,
     });
     }

     if (this.state.image_six){
     formData.append('venue[venue_image_data][]', {
      uri: self.state.image_six,
      name: `${self.state.image_six}.${fileType}`,
      type: `image/${fileType}`,
     });
     }

       axios.post('http://nuv-api.herokuapp.com/venues',
      formData,
    { headers: { Authorization: `${token}`, 'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' }})

    .then(function(response){
      var {navigate} = self.props.navigation;

      self.setState({ postingData: false }, function(){
      navigate('Home', {avatar: self.props.navigation.getParam('avatar', 'NO-ID'), token: self.props.navigation.getParam('token', 'NO-ID'), id: self.props.navigation.getParam('id', 'NO-ID'), name: self.props.navigation.getParam('name', 'NO-ID'), bio: self.props.navigation.getParam('bio', 'NO-ID'), location: self.props.navigation.getParam('location', 'NO-ID'), user_is_vegan: self.props.navigation.getParam('user_is_vegan', 'NO-ID')})
    })
    })
    .catch(function(error){
      console.log(error);
    })

    })

  }
  else {
    Alert.alert(
          "Please enter a valid UK postcode"
        )
  }
   }

  render() {
    const {navigate} = this.props.navigation;
    var image = this.state.image
    var image_two = this.state.image_two
    var image_three = this.state.image_three
    var image_four = this.state.image_four
    var image_five = this.state.image_five
    var image_six = this.state.image_six

    let typeOptions = [{
      value: 'Restaurant',
    },
     {
      value: 'Grocery Store',
    },
     {
      value: 'Bar',
    },
    {
     value: 'Outfitter',
   }
  ];

    return (

      <View style={registerUserStyle.container}>

      { this.state.postingData != true ? (

      <ScrollView style={{width: Dimensions.get('window').width*0.95}} showsVerticalScrollIndicator={false}>
      <View style={registerUserStyle.container}>

            <View style={{marginTop: Dimensions.get('window').height*0.07}}>
            </View>

            <VenueFormOverlay overlayVisible={this.state.overlayVisible} closeOverlay={this.closeOverlay} userInVenueStateUpdate={this.userInVenueStateUpdate} />

            <AutoHeightImage
              width={70}
              source={require('../../assets/AppIcons/dining.png')}
              style={{marginBottom: Dimensions.get('window').height*0.04}}
            />

            <Text style={{fontSize: 18, textAlign: 'center'}}>
            You are adding an EATERY.{"\n"}{"\n"}
            Our community would love to hear about your favourite ethical cafe, restauraunt, market or streetfood stall. Please ensure information is as accurate as possible and complete all fields.{"\n"}{"\n"}
            PS: Thanks {this.props.navigation.getParam('name', 'NO-ID')} - you are a star!
            </Text>

            <View style={{marginTop: Dimensions.get('window').height*0.04}}>
            </View>

            <TwoWayToggle returnVToggleSelection={this.returnVToggleSelection} />

          <TextInput
            style={{marginTop: Dimensions.get('window').height*0.02, borderBottomColor: 'grey', width: Dimensions.get('window').width*0.5, height: 40, marginBottom: Dimensions.get('window').height*0.05, borderColor: 'white', borderWidth: 1, textAlign: 'center', fontWeight: 'normal', fontSize: 15}}
            onChangeText={(name) => {this.changeNameText(name)}}
            value={this.state.name} placeholder='Venue name' placeholderTextColor='black'
            underlineColorAndroid='transparent'
          />

          <TextInput
            style={{borderBottomColor: 'grey', width: Dimensions.get('window').width*0.5, height: 40, marginBottom: Dimensions.get('window').height*0.04, borderColor: 'white', borderWidth: 1, textAlign: 'center', fontWeight: 'normal', fontSize: 15}}
            onChangeText={(postcode) => {this.changePostcodeText(postcode)}}
            value={this.state.postcode} placeholder='Venue postcode' placeholderTextColor='black'
            underlineColorAndroid='transparent' onEndEditing={()=> this.validatePostcode()}
          />

          <TextInput
            style={{borderBottomColor: 'grey', width: Dimensions.get('window').width*0.5, height: 40, marginBottom: Dimensions.get('window').height*0.04, borderColor: 'white', borderWidth: 1, textAlign: 'center', fontWeight: 'normal', fontSize: 15}}
            onChangeText={(url) => {this.changeUrlText(url)}}
            value={this.state.url} placeholder='Link to venue site' placeholderTextColor='black'
            underlineColorAndroid='transparent' maxLength={500} multiline={true}
          />

          <Dropdown
            containerStyle={{justifyContent: 'center', height: Dimensions.get('window').height*0.04, width: Dimensions.get('window').width*0.5, marginBottom: Dimensions.get('window').height*0.04}}
            label='Venue type'
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
            style={{marginTop: Dimensions.get('window').height*0.01, borderWidth: 1, borderColor: 'grey', width: Dimensions.get('window').width*0.75, height: 100, marginBottom: Dimensions.get('window').height*0.04, textAlign: 'center', fontWeight: 'normal', fontSize: 15}}
            onChangeText={(description) => {this.changeDescriptionText(description)}}
            value={this.state.description} placeholder='Help out the NüV community by writing something' placeholderTextColor='black'
            underlineColorAndroid='transparent' maxLength={500} multiline={true}
          />

          <StarRating
        disabled={false}
        maxStars={5}
        rating={this.state.starCount}
        selectedStar={(rating) => this.onStarRatingPress(rating)}
        fullStarColor={'#a2e444'}
        containerStyle={{marginBottom: Dimensions.get('window').height*0.04}}
      />

      { !this.state.image_six ? (

      <GlobalButton
         buttonTitle={this.getButtonTitle()}
         onPress={() => this.pickImage()}
      />

    ) : null

  }

      {image &&
      <Image source={{ uri: image }} style={{ width: 200, height: 200, marginTop: Dimensions.get('window').height*0.05, marginBottom: Dimensions.get('window').height*0.05 }} />}

      {image_two &&
      <Image source={{ uri: image_two }} style={{ width: 200, height: 200, marginTop: Dimensions.get('window').height*0.05, marginBottom: Dimensions.get('window').height*0.05 }} />}

      {image_three &&
      <Image source={{ uri: image_three }} style={{ width: 200, height: 200, marginTop: Dimensions.get('window').height*0.05, marginBottom: Dimensions.get('window').height*0.05 }} />}

      {image_four &&
      <Image source={{ uri: image_four }} style={{ width: 200, height: 200, marginTop: Dimensions.get('window').height*0.05, marginBottom: Dimensions.get('window').height*0.05 }} />}

      {image_five &&
      <Image source={{ uri: image_five }} style={{ width: 200, height: 200, marginTop: Dimensions.get('window').height*0.05, marginBottom: Dimensions.get('window').height*0.05 }} />}

      {image_six &&
      <Image source={{ uri: image_six }} style={{ width: 200, height: 200, marginTop: Dimensions.get('window').height*0.05, marginBottom: Dimensions.get('window').height*0.05 }} />}

          <View style={registerUserStyle.submitContainer}>
          <GlobalButton
             buttonTitle="Submit"
             onPress={() => this.postData()}/>
          </View>


          </View>

          </ScrollView>

        ) : <LoadingCelery />

      }

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
