import React from 'react';
import { StyleSheet, ScrollView, Platform, TouchableHighlight, Image, TextInput, Dimensions, Button, Text, View, TouchableOpacity } from 'react-native';
import { Constants } from 'expo'
import GlobalButton from '../../components/GlobalButton.js';
import AddItemButton from '../../components/AddItemButton.js';
import FaveButton from '../../components/FaveButton.js';
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

    <ScrollView style={{width: Dimensions.get('window').width*0.95}} showsVerticalScrollIndicator={false}>
    <View style={recipeViewStyle.container}>

    <View style={{marginTop: Dimensions.get('window').height*0.02}}>
    </View>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <FaveButton navigation={this.props.navigation} handleButtonClick={this.addRecipeToFavourites}/>
        <AddItemButton navigation={this.props.navigation}
        onPress={() => navigate('RecipeForm')} />
      </View>

      <Text style={recipeViewStyle.recipename}>
          Spaghetti Marinara
      </Text>

      <AutoHeightImage width={Dimensions.get('window').width*0.9} style={{marginTop: Dimensions.get('window').width*0.025}} source={require('../../assets/recipe_images/marinara.png')}/>

  </View>

    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <AutoHeightImage width={Dimensions.get('window').width*0.1} style={{ borderRadius: Dimensions.get('window').width*0.025, margin: Dimensions.get('window').width*0.025 }} source={require('../../assets/vegan_woman.jpeg')}/>
        <Text style={recipeViewStyle.recipetype}>
        Breakfast
        </Text>
    </View>

    <Text style={{marginTop: Dimensions.get('window').height*0.01, fontSize: Dimensions.get('window').width > 750 ? 25 : 16, textAlign: 'center'}}>Prep time: 25m </Text>
    <Text style={{marginTop: Dimensions.get('window').height*0.01, fontSize: Dimensions.get('window').width > 750 ? 25 : 16, textAlign: 'center'}}>Cook time: 30m </Text>


    <View >
      <View>
        <Text style={recipeViewStyle.recipeingredients}>
        Ingredients:{"\n"}
        </Text>
        <Text style={recipeViewStyle.recipeingredientsbody}>
        100ml/3½fl oz olive oil{"\n"}
        1 onion, diced{"\n"}
        1 garlic clove, crushed{"\n"}
        300g/10½oz fresh ripe tomatoes, chopped{"\n"}
        50ml/2fl oz white wine{"\n"}
        100g/3½oz mussels, cleaned and debearded, discarding any mussels with broken shells and any that refuse to close when tapped{"\n"}
        200g/7oz clams, cleaned{"\n"}
        8 whole large prawns, heads and shells removed but reserved
        50ml/2fl oz vegetable oil{"\n"}
        80g/2¾oz butter{"\n"}
        400g/14oz spaghetti{"\n"}
        6 scallops, shelled and sliced in half{"\n"}
        150g/5½oz white fish, such as pollock, skinned and cubed{"\n"}
        2 long red chillies, chopped{"\n"}
        1 handful fresh parsley, chopped{"\n"}
        salt and freshly ground black pepper
        </Text>
      </View>
    </View>

    <View >
      <View>
        <Text style={recipeViewStyle.recipemethod}>
        Method:{"\n"}
        </Text>
        <Text style={recipeViewStyle.recipemethodbody}>
        In a heavy based lidded pan heat half the olive oil over a moderate heat. Add the onion and cook for a few minutes, stirring constantly. Add the garlic, season with salt and pepper and cook for a further 2 minutes.{"\n"}{"\n"}

        Add the tomatoes and bring to the boil, reduce the heat to a simmer and cook with the lid on for 2 minutes, add the wine and then the mussels and clams. Cover and cook until the shellfish opens, this is the base of the sauce. Discard any mussels and clams that remain closed.{"\n"}{"\n"}

        Meanwhile, in a frying pan put the heads and shells of the prawns and crush them with the back of a spoon, turn up the heat and let them roast a little moving once or twice, they will go pink and start to smell like barbeque prawns. When they have some colour add the vegetable oil and let it sizzle, move the pan off the heat and add half of the butter, again it should sizzle. Season with salt and pepper.{"\n"}{"\n"}

        Strain off the liquid from the prawn shells and squeeze out all of the juice, this is your prawn flavoured butter.{"\n"}{"\n"}

        For the spaghetti, bring a large saucepan of salted water to the boil and cook for 10-12 minutes, or until al dente.{"\n"}{"\n"}

        In a separate pan put the remaining olive oil and butter. Add the prawns, scallops and white fish. Cook on one side and turn carefully then add the chillies and cook for 2 minutes. Add the prawn flavoured butter and then pour over the tomato sauce and let it bubble. Season with salt and pepper.{"\n"}{"\n"}

        Drain the spaghetti and drop into the pan with the seafood and sauce. Add the parsley, give it a good mix and let it bubble. Divide between four bowls and serve.{"\n"}{"\n"}
        </Text>
      </View>
    </View>


    <View style={{alignItems: 'center', marginTop: Dimensions.get('window').height*0.005, width: Dimensions.get('window').width*1}}>
    <Text style={recipeViewStyle.vibeHeading}>NüV Rating</Text>
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
         onPress={() => navigate('Home', {name: 'SignIn'})}/>
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
  },
  recipeingredientsbody: {
    margin: 4,
    fontSize: 15,
    marginBottom: 40,
  },
  recipemethod: {
    color: '#0dc6b5',
    margin: 4,
    fontSize: 18,
  },
  recipemethodbody: {
    margin: 4,
    fontSize: 15,
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
});
