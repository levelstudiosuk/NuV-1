import React from 'react';
import { StyleSheet, ScrollView, Platform, TouchableHighlight, Image, TextInput, Dimensions, Button, Text, View } from 'react-native';
import { Constants } from 'expo'
import GlobalButton from '../../components/GlobalButton.js';
import TwoWayToggle from '../../components/TwoWayToggle.js';
import AutoHeightImage from 'react-native-auto-height-image';
import Expo, { ImagePicker } from 'expo';
import { Dropdown } from 'react-native-material-dropdown';
import {Permissions} from 'expo'
import axios from 'axios';

export default class RecipeForm extends React.Component {
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
  this.changeWordsText = this.changeWordsText.bind(this);
  this.changeUrlText = this.changeUrlText.bind(this);
  this.pickImage = this.pickImage.bind(this);
  this.onChangedPrep = this.onChangedPrep.bind(this);
  this.changeIngredientText = this.changeIngredientText.bind(this);
  this.onChangedCook = this.onChangedCook.bind(this);
  this.changeMethodText = this.changeMethodText.bind(this);
}

  state = {
      name: "",
      description: "",
      location: "",
      url: "",
      image: null,
      type: "",
      prep: "",
      ingredients: "",
      method: "",
      cook: "",
      words: ""

    };

    changeNameText(name){
      this.setState({
        name: name
      })
    }

    changeWordsText(words){
      this.setState({
        words: words
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

    changeIngredientText(ingredients){
      this.setState({
        ingredients: ingredients
      })
    }

    changeMethodText(method){
      this.setState({
        method: method
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

   onChangedPrep(text){
    let newText = '';
    let numbers = '0123456789';

    for (var i=0; i < text.length; i++) {
        if(numbers.indexOf(text[i]) > -1 ) {
            newText = newText + text[i];
        }
        else {
            // your call back function
            alert("please enter numbers only");
        }
    }
    this.setState({ prep: newText});
}

  onChangedCook(text){
   let newText = '';
   let numbers = '0123456789';

   for (var i=0; i < text.length; i++) {
       if(numbers.indexOf(text[i]) > -1 ) {
           newText = newText + text[i];
       }
       else {
           // your call back function
           alert("please enter numbers only");
       }
   }
   this.setState({ cook: newText});
  }

  postData(){
    var {navigate} = this.props.navigation;
    var self = this;
    var token = this.props.navigation.getParam('token', 'NO-ID');
    if (this.state.image){
    var uriParts = this.state.image.split('.')
    var fileType = uriParts[uriParts.length - 1];

  };
    var wordsArray = this.state.words.split(",");

    const formData = new FormData();
    formData.append('recipe[title]', self.state.name);
    formData.append('recipe[description]', self.state.description);
    formData.append('recipe[content_is_vegan]', true);
    formData.append('recipe[venue_type]', self.state.type);

    formData.append('recipe[prep_time]', self.state.prep);
    formData.append('recipe[cooking_time]', self.state.cook);
    formData.append('recipe[ingredients]', self.state.ingredients);
    formData.append('recipe[method]', self.state.method);
    for (word of wordsArray){
      formData.append('recipe[keywords][]', word);
    }

    if (this.state.image){
    formData.append('recipe[recipe_main_image]', {
     uri: self.state.image,
     name: `${self.state.image}.${fileType}`,
     type: `image/${fileType}`,
   });
   formData.append('recipe[recipe_image_data][]', {
    uri: self.state.image,
    name: `${self.state.image}.${fileType}`,
    type: `image/${fileType}`,
  });
    formData.append('recipe[recipe_image_data][]', {
     uri: self.state.image,
     name: `${self.state.image}.${fileType}`,
     type: `image/${fileType}`,
   });
 }

      axios.post('http://nuv-api.herokuapp.com/recipes',
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
      value: 'Breakfast',
    },
     {
      value: 'Lunch',
    },
     {
      value: 'Dinner',
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
              source={require('../../assets/AppIcons/cooking.png')}
              style={{marginBottom: Dimensions.get('window').height*0.04}}
            />

            <Text style={{fontSize: 18, textAlign: 'center'}}>
            You are adding a RECIPE{"\n"}{"\n"}
            Please be as accurate as possible and complete all fields, it will make it easier to follow your instructions{"\n"}{"\n"}
            PS: Thanks [user name], you are a star :)
            </Text>

            <View style={{marginTop: Dimensions.get('window').height*0.04}}>
            </View>

            <TwoWayToggle />

            <TextInput
              style={{marginTop: Dimensions.get('window').height*0.02, borderBottomColor: 'grey', width: Dimensions.get('window').width*0.5, height: 40, marginBottom: Dimensions.get('window').height*0.05, borderColor: 'white', borderWidth: 1, textAlign: 'center', fontWeight: 'normal', fontSize: 15}}
              onChangeText={(name) => {this.changeNameText(name)}}
              value={this.state.name} placeholder='Recipe Title' placeholderTextColor='black'
              underlineColorAndroid='transparent'
            />

            <TextInput
              style={{borderBottomColor: 'grey', width: Dimensions.get('window').width*0.5, height: 40, marginBottom: Dimensions.get('window').height*0.04, borderColor: 'white', borderWidth: 1, textAlign: 'center', fontWeight: 'normal', fontSize: 15}}
              onChangeText={(description) => {this.changeDescriptionText(description)}}
              value={this.state.description} placeholder='Brief description' placeholderTextColor='black'
              underlineColorAndroid='transparent'
            />

            <TextInput
              style={{borderBottomColor: 'grey', width: Dimensions.get('window').width*0.5, height: 40, marginBottom: Dimensions.get('window').height*0.04, borderColor: 'white', borderWidth: 1, textAlign: 'center', fontWeight: 'normal', fontSize: 15}}
              onChangeText={(words) => {this.changeWordsText(words)}}
              value={this.state.words} placeholder='Key words (comma-separated)' placeholderTextColor='black'
              underlineColorAndroid='transparent' maxLength={500} multiline={true}
            />

            <Dropdown
              containerStyle={{justifyContent: 'center', height: Dimensions.get('window').height*0.04, width: Dimensions.get('window').width*0.5, marginBottom: Dimensions.get('window').height*0.04}}
              label='Mealtime?'
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
           placeholder='Preperation Time (mins)'
           placeholderTextColor='black'
           keyboardType='numeric'
           onChangeText={(text)=> this.onChangedPrep(text)}
           value={this.state.prep}
           maxLength={10}  //setting limit of input
          />

          <TextInput
           style={{borderBottomColor: 'grey', width: Dimensions.get('window').width*0.5, height: 40, marginBottom: Dimensions.get('window').height*0.04, borderColor: 'white', borderWidth: 1, textAlign: 'center', fontWeight: 'normal', fontSize: 15}}
           placeholder='Cooking Time (mins)'
           placeholderTextColor='black'
           keyboardType='numeric'
           onChangeText={(text)=> this.onChangedCook(text)}
           value={this.state.cook}
           maxLength={10}  //setting limit of input
          />


          <TextInput
            style={{marginTop: Dimensions.get('window').height*0.03, borderWidth: 1, borderColor: 'grey', width: Dimensions.get('window').width*0.75, height: 100, marginBottom: Dimensions.get('window').height*0.04, textAlign: 'center', fontWeight: 'normal', fontSize: 15}}
            onChangeText={(bio) => {this.changeIngredientText(bio)}}
            value={this.state.ingredients} placeholder='ingredients' placeholderTextColor='black'
            underlineColorAndroid='transparent' maxLength={10000} multiline={true}
          />

          <TextInput
            style={{marginTop: Dimensions.get('window').height*0.03, borderWidth: 1, borderColor: 'grey', width: Dimensions.get('window').width*0.75, height: 100, marginBottom: Dimensions.get('window').height*0.04, textAlign: 'center', fontWeight: 'normal', fontSize: 15}}
            onChangeText={(bio) => {this.changeMethodText(bio)}}
            value={this.state.method} placeholder='Method' placeholderTextColor='black'
            underlineColorAndroid='transparent' maxLength={10000} multiline={true}
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
             onPress={() => this.postData() }/>
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
