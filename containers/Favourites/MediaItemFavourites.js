import React, { Component } from 'react'
import { Alert, StatusBar, Modal,Dimensions, View, Text, ScrollView, Linking, TouchableHighlight, TouchableOpacity, Image } from 'react-native';
import { Font, LinearGradient  } from 'expo';
import { AsyncStorage } from "react-native"

export default class MediaItemFavourites extends Component {

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
    for (recipe of recipe){
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

    var favourites = JSON.parse(this.state.favourites);

    return favourites.map((favourite, i) =>
      <View key={i} style={{flexDirection: 'row'}}>
      <TouchableOpacity onPress={() => this.setState({clickedFavourite: favourites[i]}, function(){ this.toggleFavouriteModal() })} key={i}>
        <Text style={{fontSize: 22, marginTop: Dimensions.get('window').height*0.04, marginBottom: Dimensions.get('window').height*0.04}} key={i}> {favourite.name} </Text>
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

          <Text style={{marginTop: Dimensions.get('window').height*0.05, color: '#0dc6b5', textAlign: 'center', fontSize: 30}}>Your Favourite Media Items</Text>

            <ScrollView>


          {
            this.state.favourites ? (
              self.renderFavourites()
            ) : <Text style={{fontSize: 24, textAlign: 'center', marginTop: Dimensions.get('window').height*0.04}}>Oh no! Your favourites are currently empty. Find media items in the app and click the ⭐️ to add them to this list. </Text>
        }

        </ScrollView>


            </View>

        </View>




    </View>
    )
  }
}
