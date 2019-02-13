import React, { Component } from 'react'
import { Alert, StatusBar, Modal,Dimensions, View, Text, ScrollView, Linking, TouchableHighlight, TouchableOpacity, Image } from 'react-native';
import { Font, LinearGradient  } from 'expo';
import { AsyncStorage } from "react-native"

export default class RecipeFavourites extends Component {

  constructor(props) {
    super(props);
    this.state = {
      favouriteModalVisible: false
    };
    this.toggleFavouriteModal = this.toggleFavouriteModal.bind(this);
  }

  componentDidMount(){
    this.retrieveFavourites()
  }

  toggleFavouriteModal(){
    this.setState({
      favouriteModalVisible: !this.state.favouriteModalVisible
    })
  }

  findRecipeObject(recipes, name){
    for (recipe of recipes){
      if (recipe.name === name){
        return recipe;
      }
    }
  }

  deleteFavourite(recipeToDelete){
    AsyncStorage.getItem('recipe_favourites').then((recipes) => {
      var recipes = JSON.parse(recipes);
      var recipeObjectToDelete = this.findRecipeObject(recipes, recipeToDelete.name);
      var index = recipes.indexOf(recipeObjectToDelete);
      recipes.splice(index, 1)
      console.log("Recipe to delete", recipeObjectToDelete);
      AsyncStorage.setItem('recipe_favourites', JSON.stringify(recipes)).then((recipes) => {
        AsyncStorage.getItem('recipe_favourites').then((recipes) => {
          this.setState({
            favourites: recipes
          }, function(){
            if (JSON.parse(recipes).length === 0){
              this.setState({
                favourites: null
              })
            }
          })
        }).catch((error) => {
          console.log(error)
         }
        )
      }).catch((error) => {
        console.log(error)
       }
      )
        Alert.alert(
               `${recipeToDelete.name} has been deleted from your favourites`
            )
    }).catch((error) => {
      console.log(error)
  }
)
}

  retrieveFavourites(){
      AsyncStorage.getItem('recipe_favourites').then((recipes) => {
        this.setState({
          favourites: recipes
        }, function(){
          if (recipes){
          if (JSON.parse(recipes).length === 0){
            this.setState({
              favourites: null
            })
          }
          }
        })
      }).catch((error) => {
        console.log(error)
       }
     )
      }

  renderFavourites(){

    const {navigate} = this.props.navigation;

    var favourites = JSON.parse(this.state.favourites);

    return favourites.map((favourite, i) =>
      <View key={i} style={{flexDirection: 'row'}}>
      <TouchableOpacity onPress={() => navigate('RecipeView', {
        user_id: this.props.navigation.getParam('user_id', 'NO-ID'),
        settings: true,
        avatar: this.props.navigation.getParam('avatar', 'NO-ID'),
        token: this.props.navigation.getParam('token', 'NO-ID'),
        id: favourite.id,
        name: this.props.navigation.getParam('name', 'NO-ID'),
        bio: this.props.navigation.getParam('bio', 'NO-ID'),
        location: this.props.navigation.getParam('location', 'NO-ID'),
        user_is_vegan: this.props.navigation.getParam('user_is_vegan', 'NO-ID')})}
         key={i}>
        <Text style={{fontSize: Dimensions.get('window').width > 750 ? 22 : 14, marginTop: Dimensions.get('window').height*0.04, marginBottom: Dimensions.get('window').height*0.04}} key={i}> {favourite.name} </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => this.setState({deletedFavourite: favourites[i]}, function(){ this.deleteFavourite(this.state.deletedFavourite) })} key={Date.now()}>
      <Image source={require('../../assets/AppIcons/trash.png')} style={{width: Dimensions.get('window').height*0.02, height: Dimensions.get('window').height*0.02,  marginTop: Dimensions.get('window').height*0.04, marginBottom: Dimensions.get('window').height*0.04}} />
      </TouchableOpacity>
      </View>
    )
  }

  render() {

    var self = this;

    return (
      <View>


          <View style={{marginBottom: 20}}>

          <View>

          <Text style={{marginTop: Dimensions.get('window').height*0.05, color: '#2e8302', textAlign: 'center', fontSize: Dimensions.get('window').width > 750 ? 26 : 18}}>Your Favourite Recipes</Text>

            <ScrollView style={{marginBottom: Dimensions.get('window').height*0.3}}>


          {
            this.state.favourites ? (
              self.renderFavourites()
            ) : <Text style={{fontSize: Dimensions.get('window').width > 750 ? 22 : 16, textAlign: 'center', marginTop: Dimensions.get('window').height*0.04}}>Oh no! Your favourites are currently empty. Find recipes in the app and click the ⭐️ to add them to this list. </Text>
        }

        </ScrollView>


            </View>

        </View>




    </View>
    )
  }
}
