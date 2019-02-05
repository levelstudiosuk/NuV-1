import React from 'react';
import { StyleSheet, ScrollView, Platform, TouchableHighlight, Image, TextInput, Dimensions, Button, Text, View, TouchableOpacity } from 'react-native';
import { Constants } from 'expo'
import GlobalButton from '../../components/GlobalButton.js';
import AddItemButton from '../../components/AddItemButton.js';
import FaveButton from '../../components/FaveButton.js';
import ShareButton from '../../components/ShareButton.js';
import SmallTwoWayToggle from '../../components/SmallTwoWayToggle.js';
import AutoHeightImage from 'react-native-auto-height-image';
import Expo, { ImagePicker } from 'expo';
import {Permissions} from 'expo'
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import Map from '../../containers/Global/Map.js';
import StarRating from 'react-native-star-rating';
import { AsyncStorage, Alert } from "react-native"

export default class RecipeView extends React.Component {
  static navigationOptions = {
    title: null,
    headerTitle:(
     <AutoHeightImage width={75} style={{position: 'absolute', right: Platform.OS === 'android' ? 0 : -65 }} source={require('../../assets/AppIcons/transparentlogo.png')}/>
 ),
}

  constructor(props) {
    super(props);
      this.onStarRatingPress = this.onStarRatingPress.bind(this);
      this.addRecipeToFavourites = this.addRecipeToFavourites.bind(this);
      this.checkFavouriteStatus = this.checkFavouriteStatus.bind(this);

      }
      state = {
      starRating: 3,
      starCount: 2
    };


    checkFavouriteStatus(viewedRecipe) {
      try {
        AsyncStorage.getItem('recipe_favourites').then((recipes) => {
          const recips = recipes ? JSON.parse(recipes) : [];

          if (recips.length > 0){
            var names = recips.map((recipe) => recipe.name);

            if (names.includes(viewedFavourite)){
              this.setState({viewedRecipeAlreadyFavourite: true}, function(){
                console.log("Already favourite");
              });
            }
            else {
              this.setState({viewedRecipeAlreadyFavourite: false},
              function(){
                console.log("Not already favourite");
              });
            }
          }
          else {
            this.setState({viewedRecipeAlreadyFavourite: false}, function(){
              console.log("Not already favourite");
            });
          }
        }
      )
      }
        catch (error) {
          console.log(error);
      }
      }

    addRecipeToFavourites = async() => {

      var self = this;

      var recipe = {name: JSON.stringify(this.props.navigation.getParam('name', 'Does not exist')), prep_time: JSON.stringify(this.props.navigation.getParam('prep_time', 'Does not exist')), cook_time: JSON.stringify(this.props.navigation.getParam('cook_time', 'Does not exist')), image: JSON.stringify(this.props.navigation.getParam('image', 'Does not exist'))}

      try {
        AsyncStorage.getItem('recipe_favourites').then((recipes) => {
          const recips = recipes ? JSON.parse(recipes) : [];
          if (recips.length > 0){
            var names = recips.map((recipe) => recipe.name);
            if (!names.includes(recipe.name)){
            recips.push(recipe);
            AsyncStorage.setItem('recipe_favourites', JSON.stringify(recips));
            this.setState({newFavouriteAdded: true}, function(){
              Alert.alert(
                     `${recipe.name} was added to your favourites!`
                  )
          })
        }
          else {
            Alert.alert(
                   `${recipe.name} is already in your favourites!`
                )
          }
      }
          else {
            recips.push(recipe);
            AsyncStorage.setItem('recipe_favourites', JSON.stringify(recips));
            Alert.alert(
                   `${recipe.name} was added to your favourites!`
                )
          }
          console.log("RECIPES AFTER", recips);
    })}
      catch (error) {
        console.log(error);
      }

}

  onStarRatingPress(rating) {
    this.setState({
    starCount: rating
    });
    }

    render() {
      const {navigate} = this.props.navigation;
      return (

    <View style={recipeViewStyle.container}>

    <ScrollView style={{width: Dimensions.get('window').width*1}} showsVerticalScrollIndicator={false}>
    <View style={recipeViewStyle.container}>

  <View style={{marginTop: Dimensions.get('window').height*0.02}}>
    </View>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <FaveButton
        navigation={this.props.navigation} handleButtonClick={this.addRecipeToFavourites}/>
        <AddItemButton
        navigation={this.props.navigation}
        onPress={() => navigate('RecipeForm', {avatar: this.props.navigation.getParam('avatar', 'NO-ID'), token: this.props.navigation.getParam('token', 'NO-ID'), id: this.props.navigation.getParam('id', 'NO-ID'), name: this.props.navigation.getParam('name', 'NO-ID'), bio: this.props.navigation.getParam('bio', 'NO-ID'), location: this.props.navigation.getParam('location', 'NO-ID'), user_is_vegan: this.props.navigation.getParam('user_is_vegan', 'NO-ID')})} />
      </View>
        <Text style={recipeViewStyle.recipename}>
            Vegan Potato Curry
        </Text>
      <AutoHeightImage width={Dimensions.get('window').width*1} style={{marginTop: Dimensions.get('window').width*0.025}} source={require('../../assets/recipe_images/spudcurry.png')}/>
  </View>

    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <AutoHeightImage width={Dimensions.get('window').width*0.1} style={{ borderRadius: Dimensions.get('window').width*0.025, margin: Dimensions.get('window').width*0.025 }} source={require('../../assets/vegan_woman.jpeg')}/>
          <Text style={recipeViewStyle.recipetype}>
            Dinner
          </Text>
        <ShareButton
        marginLeft={Dimensions.get('window').width*0.07}
        title="Shared from NüV"
        message="Message to share"
        url="www.level-apps.co.uk"
        subject="Hi, a NüV user though you would like to see this..."
         />
    </View>

    <View>
    <Text style={{marginLeft:Dimensions.get('window').width*0.2,marginTop: Dimensions.get('window').height*0.01, fontSize: Dimensions.get('window').width > 750 ? 25 : 16, textAlign: 'center', flex: 1, flexDirection: 'row'}}><AutoHeightImage source={require('../../assets/AppIcons/cooktime.png')} width={Dimensions.get('window').width*0.05} /> Prep: 15 mins <AutoHeightImage source={require('../../assets/AppIcons/preptime.png')} width={Dimensions.get('window').width*0.05} /> Cook: 45 mins </Text>
    </View>


    <View >
      <View>
        <Text style={recipeViewStyle.recipeingredients}>
        Ingredients:{"\n"}
        </Text>
        <Text style={recipeViewStyle.recipeingredientsbody}>
        3 Tbsp Olive Oil{"\n"}
        1 Onion (Chopped){"\n"}
        1 Tbsp Crushed Garlic{"\n"}
        1 Tbsp Minced Ginger{"\n"}
        4 tsp Garam Masala (or Curry Powder){"\n"}
        1 tsp Paprika{"\n"}
        1/2 tsp Cayenne Pepper{"\n"}
        1 tsp Cumin{"\n"}
        1/2 tsp Coriander Powder{"\n"}
        1 tsp Turmeric{"\n"}
        6 Medium Potatoes (Peeled and Chopped, about 1kg/2.2lb){"\n"}
        1 15oz (425g) Can Chickpeas (Drained){"\n"}
        1 14oz (400g) Can Chopped Tomatoes{"\n"}
        1 cup (240ml) Vegetable Stock{"\n"}
        1 14oz (400ml) Can Coconut Milk (Full Fat){"\n"}
        2 Tbsp Coconut Sugar (or Brown Sugar){"\n"}
        Sea Salt and Black Pepper (To Taste){"\n"}
        1/2 cup Cilantro (Chopped, For Serving){"\n"}
        </Text>
      </View>
    </View>

    <View >
      <View>
        <Text style={recipeViewStyle.recipemethod}>
        Method:{"\n"}
        </Text>
        <Text style={recipeViewStyle.recipemethodbody}>
        Add the olive oil to a pot with the chopped onion, crushed garlic, minced ginger, garam masala, paprika, cayenne pepper, cumin, coriander powder and turmeric and sauté until the onions are slightly softened.
        Add the chopped potatoes and chickpeas and toss in the spices until well mixed.{"\n"}{"\n"}
        Add the chopped tomatoes, vegetable stock and coconut milk and stir in.
        Bring to the boil and then reduce heat, cover the pot and simmer until the potatoes are cooked. Test if they’re ready by bringing out a piece of potato and sticking a fork into it to test if it’s fork tender.{"\n"}{"\n"}
        Add coconut sugar, sea salt and black pepper (to taste).{"\n"}{"\n"}
        Serve with chopped cilantro on top and with basmati rice and/or vegan naan bread.{"\n"}{"\n"}
        NOTES{"\n"}
        *Leftovers are delicious reheated the next day, so don’t worry if this is a bigger amount than you need for one meal, it’s even more delicious the next day!
        </Text>
      </View>
    </View>


    <View style={{alignItems: 'center', marginTop: Dimensions.get('window').height*0.005, width: Dimensions.get('window').width*1}}>
    <Text style={recipeViewStyle.vibeHeading}>NüV User Rating</Text>
      <StarRating
        disabled={false}
        maxStars={5}
        rating={this.state.starRating}
        fullStarColor={'#0DC6B5'}
        containerStyle={{marginTop: Dimensions.get('window').height*0.02, marginBottom: Dimensions.get('window').height*0.02}}
      />
    </View>

    <View style={{alignItems: 'center', marginTop: Dimensions.get('window').height*0.005, width: Dimensions.get('window').width*1}}>
      <Text style={recipeViewStyle.vibeHeading}>Rate this recipe</Text>
        <StarRating
          disabled={false}
          maxStars={5}
          rating={this.state.starCount}
          selectedStar={(rating) => this.onStarRatingPress(rating)}
          fullStarColor={'#0DC6B5'}
          containerStyle={{marginTop: Dimensions.get('window').height*0.02, marginBottom: Dimensions.get('window').height*0.02}}
        />
    </View>

    <View style={recipeViewStyle.submitContainer}>
      <GlobalButton
        marginLeft={Dimensions.get('window').width*0.05}
        buttonTitle="Rate and go"
        onPress={() => navigate('Home', {avatar: this.props.navigation.getParam('avatar', 'NO-ID'), token: this.props.navigation.getParam('token', 'NO-ID'), id: this.props.navigation.getParam('id', 'NO-ID'), name: this.props.navigation.getParam('name', 'NO-ID'), bio: this.props.navigation.getParam('bio', 'NO-ID'), location: this.props.navigation.getParam('location', 'NO-ID'), user_is_vegan: this.props.navigation.getParam('user_is_vegan', 'NO-ID')})}/>
    </View>

  </ScrollView>
</View>
);
}
}

const recipeViewStyle = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitContainer: {
    alignItems: 'center',
    marginTop: Dimensions.get('window').height*0.03,
    marginBottom: Platform.OS === 'ios' ? Dimensions.get('window').height*0.05 : Dimensions.get('window').height*0.1
  },
  header: {
    textAlign: 'center',
    marginTop:  Constants.statusBarHeight+10,
    marginBottom: Dimensions.get('window').height*0.01
  },
  recipeitem: {
    flex: 1,
    flexDirection: 'row',
    paddingBottom: 20,
  },
  recipetextcontainer: {
    flex: 1,
    flexDirection: 'column',
  },
  recipename: {
    color: '#0dc6b5',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 15,
  },
  recipetype: {
    color: '#0dc6b5',
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
  },
  recipeingredients: {
    color: '#0dc6b5',
    margin: 4,
    fontSize: 18,
    marginLeft: 15,
  },
  recipeingredientsbody: {
    margin: 4,
    fontSize: 15,
    marginBottom: 40,
    marginLeft: 15,
  },
  recipemethod: {
    color: '#0dc6b5',
    margin: 4,
    fontSize: 18,
    marginLeft: 15,
  },
  recipemethodbody: {
    margin: 4,
    fontSize: 15,
    marginLeft: 15,
  },
    profileItem: {
    padding: Dimensions.get('window').width* 0.025,
    fontSize: Dimensions.get('window').width>750 ? 24 : 16 ,
    color: 'black'
  },
  vibeHeading: {
  fontSize: Dimensions.get('window').width > 750 ? 27 : 20,
  textAlign: 'center',
  color: '#0DC6B5',
  marginTop: Dimensions.get('window').height*0.03
},
  submitContainer: {
    alignItems: 'center',
    marginTop: Dimensions.get('window').height*0.03,
    marginBottom: Platform.OS === 'ios' ? Dimensions.get('window').height*0.15 : Dimensions.get('window').height*0.15
  },

  shareContainer: {
      alignItems: 'center',
      marginTop: Dimensions.get('window').height*0.03,
      marginBottom: Platform.OS === 'ios' ? Dimensions.get('window').height*0.05 : Dimensions.get('window').height*0.05
    },
});
