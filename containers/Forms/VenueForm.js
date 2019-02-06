import React from 'react';
import { StyleSheet, ScrollView, Platform, TouchableHighlight, Image, TextInput, Dimensions, Button, Text, View } from 'react-native';
import { Constants } from 'expo'
import GlobalButton from '../../components/GlobalButton.js';
import TwoWayToggle from '../../components/TwoWayToggle.js';
import AutoHeightImage from 'react-native-auto-height-image';
import Expo, { ImagePicker } from 'expo';
import {Permissions} from 'expo'
import { Dropdown } from 'react-native-material-dropdown';
import StarRating from 'react-native-star-rating';
import axios from 'axios';

export default class VenueForm extends React.Component {
  static navigationOptions = {
    title: null,
    headerTitle: (
     <AutoHeightImage width={75} style={{position: 'absolute', right: Platform.OS === 'android' ? 0 : -65 }} source={require('../../assets/AppIcons/transparentlogo.png')}/>
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

}

  state = {
      name: "",
      postcode: "",
      location: "",
      url: "",
      image: null,
      type: "",
      starCount: 3
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
     var {navigate} = this.props.navigation;
     var self = this;
     var token = this.props.navigation.getParam('token', 'NO-ID');
     var uriParts = this.state.image.split('.')
     var fileType = uriParts[uriParts.length - 1];

     const formData = new FormData();
     formData.append('venue[title]', self.state.name);
     formData.append('venue[description]', self.state.description);
     formData.append('venue[content_is_vegan]', true);
     formData.append('venue[venue_type]', self.state.type);
     formData.append('venue[url]', self.state.url);
     formData.append('venue[postcode]', self.state.postcode);
     formData.append('venue[rating]', self.state.starCount);
     formData.append('venue[venue_image_data][]', {
      uri: self.state.image,
      name: `${self.state.image}.${fileType}`,
      type: `image/${fileType}`,
    });
    formData.append('venue[venue_main_image]', {
     uri: self.state.image,
     name: `${self.state.image}.${fileType}`,
     type: `image/${fileType}`,
   });

       axios.post('http://nuv-api.herokuapp.com/venues',
      formData,
    { headers: { Authorization: `${token}`, 'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' }})

    .then(function(response){
      console.log("RESP", response);
      var {navigate} = self.props.navigation;
      navigate('Home', {avatar: self.props.navigation.getParam('avatar', 'NO-ID'), token: self.props.navigation.getParam('token', 'NO-ID'), id: self.props.navigation.getParam('id', 'NO-ID'), name: self.props.navigation.getParam('name', 'NO-ID'), bio: self.props.navigation.getParam('bio', 'NO-ID'), location: self.props.navigation.getParam('location', 'NO-ID'), user_is_vegan: self.props.navigation.getParam('user_is_vegan', 'NO-ID')})

    })
    .catch(function(error){
      console.log(error);
    })


   }


  render() {
    const {navigate} = this.props.navigation;
    var image = this.state.image

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

      <ScrollView style={{width: Dimensions.get('window').width*0.95}} showsVerticalScrollIndicator={false}>
      <View style={registerUserStyle.container}>

            <View style={{marginTop: Dimensions.get('window').height*0.07}}>
            </View>

            <AutoHeightImage
              width={70}
              source={require('../../assets/AppIcons/dining.png')}
              style={{marginBottom: Dimensions.get('window').height*0.04}}
            />

            <Text style={{fontSize: 18, textAlign: 'center'}}>
            You are adding an EATERY.{"\n"}{"\n"}
            Our community would love to hear about your favourite ethical cafe, restauraunt, market or streetfood stall. Please ensure information is as accurate as possible and complete all fields.{"\n"}{"\n"}
            PS: Thanks [USER_NAME]; you are a star!
            </Text>

            <View style={{marginTop: Dimensions.get('window').height*0.04}}>
            </View>

            <TwoWayToggle />


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
            underlineColorAndroid='transparent'
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
        fullStarColor={'#0DC6B5'}
        containerStyle={{marginBottom: Dimensions.get('window').height*0.04}}
      />

      <GlobalButton
         buttonTitle="Add Image"
         onPress={() => this.pickImage()}
      />

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
    marginBottom: Platform.OS === 'ios' ? Dimensions.get('window').height*0.28 : Dimensions.get('window').height*0.28
  },
  header: {
    fontSize: 24,
    color: 'green',
    textAlign: 'center',
    marginTop:  Constants.statusBarHeight+10,
    marginBottom: Dimensions.get('window').height*0.01
  },
});
