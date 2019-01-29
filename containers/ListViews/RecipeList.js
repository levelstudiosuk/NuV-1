import React from 'react';
import { StyleSheet, ScrollView, Platform, TouchableHighlight, Image, TextInput, Dimensions, Button, Text, View } from 'react-native';
import { Constants } from 'expo'
import GlobalButton from '../../components/GlobalButton.js';
import TwoWayToggle from '../../components/TwoWayToggle.js';
import AutoHeightImage from 'react-native-auto-height-image';
import Expo, { ImagePicker } from 'expo';
import {Permissions} from 'expo'

export default class RecipeList extends React.Component {
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

    return (

      <View style={registerUserStyle.container}>
        <View style={{marginTop: Dimensions.get('window').height*0.05}}>
          <GlobalButton marginLeft={Dimensions.get('window').width*0.12} onPress={() => navigate('RecipeForm')} buttonTitle={"Add recipe"} />
        </View>
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
