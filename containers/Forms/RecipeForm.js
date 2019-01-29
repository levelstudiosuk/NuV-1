import React from 'react';
import { StyleSheet, ScrollView, Platform, TouchableHighlight, Image, TextInput, Dimensions, Button, Text, View } from 'react-native';
import { Constants } from 'expo'
import GlobalButton from '../../components/GlobalButton.js';
import TwoWayToggle from '../../components/TwoWayToggle.js';
import AutoHeightImage from 'react-native-auto-height-image';
import Expo, { ImagePicker } from 'expo';
import { Dropdown } from 'react-native-material-dropdown';
import {Permissions} from 'expo'

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
      ingredient: "",
      method: "",
      cook: ""

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

    changeIngredientText(bio){
      this.setState({
        ingredient: ingredient
      })
    }

    changeMethodText(bio){
      this.setState({
        ingredient: ingredient
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
    this.setState({ prepTime: newText});
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
 this.setState({ cookTime: newText});
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
              onChangeText={(words) => {this.changeWordsText(url)}}
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


            <GlobalButton
               buttonTitle="Add Image"
               onPress={() => this.pickImage()}
            />

        {image &&
          <Image source={{ uri: image }} style={{ width: 200, height: 200, marginTop: Dimensions.get('window').height*0.05, marginBottom: Dimensions.get('window').height*0.05 }} />}


          <TextInput
           style={{borderBottomColor: 'grey', width: Dimensions.get('window').width*0.5, height: 40, marginBottom: Dimensions.get('window').height*0.04, borderColor: 'white', borderWidth: 1, textAlign: 'center', fontWeight: 'normal', fontSize: 15}}
           placeholder='Preperation Time (mins)'
           placeholderTextColor='black'
           keyboardType='numeric'
           onChangeText={(text)=> this.onChangedPrep(text)}
           value={this.state.myNumber}
           maxLength={10}  //setting limit of input
          />

          <TextInput
           style={{borderBottomColor: 'grey', width: Dimensions.get('window').width*0.5, height: 40, marginBottom: Dimensions.get('window').height*0.04, borderColor: 'white', borderWidth: 1, textAlign: 'center', fontWeight: 'normal', fontSize: 15}}
           placeholder='Cooking Time (mins)'
           placeholderTextColor='black'
           keyboardType='numeric'
           onChangeText={(text)=> this.onChangedCook(text)}
           value={this.state.myNumber}
           maxLength={10}  //setting limit of input
          />


          <TextInput
            style={{marginTop: Dimensions.get('window').height*0.03, borderWidth: 1, borderColor: 'grey', width: Dimensions.get('window').width*0.75, height: 100, marginBottom: Dimensions.get('window').height*0.04, textAlign: 'center', fontWeight: 'normal', fontSize: 15}}
            onChangeText={(bio) => {this.changeIngredientText(bio)}}
            value={this.state.bio} placeholder='ingredients' placeholderTextColor='black'
            underlineColorAndroid='transparent' maxLength={10000} multiline={true}
          />

          <TextInput
            style={{marginTop: Dimensions.get('window').height*0.03, borderWidth: 1, borderColor: 'grey', width: Dimensions.get('window').width*0.75, height: 100, marginBottom: Dimensions.get('window').height*0.04, textAlign: 'center', fontWeight: 'normal', fontSize: 15}}
            onChangeText={(bio) => {this.changeMethodText(bio)}}
            value={this.state.bio} placeholder='Method' placeholderTextColor='black'
            underlineColorAndroid='transparent' maxLength={10000} multiline={true}
          />


          <View style={registerUserStyle.submitContainer}>
          <GlobalButton
             buttonTitle="Submit"
             onPress={() => navigate('Home', {name: 'SignIn'})}/>
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
