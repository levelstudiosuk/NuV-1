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

  findDinosaurObject(dinosaurs, name){
    for (dinosaur of dinosaurs){
      if (dinosaur.name === name){
        return dinosaur;
      }
    }
  }

  deleteFavourite(dinoToDelete){
    AsyncStorage.getItem('dinosaur_favourites').then((dinos) => {
      var dinos = JSON.parse(dinos);
      var dinoObjectToDelete = this.findDinosaurObject(dinos, dinoToDelete.name);
      var index = dinos.indexOf(dinoObjectToDelete);
      dinos.splice(index, 1)
      console.log("Dino to delete", dinoObjectToDelete);
      AsyncStorage.setItem('dinosaur_favourites', JSON.stringify(dinos)).then((dinos) => {
        AsyncStorage.getItem('dinosaur_favourites').then((dinos) => {
          this.setState({
            favourites: dinos
          }, function(){
            if (JSON.parse(dinos).length === 0){
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
               `${dinoToDelete.name} has been deleted from your favourites`
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
      <View key={i}>
      <TouchableOpacity onPress={() => this.setState({clickedFavourite: favourites[i]}, function(){ this.toggleFavouriteModal() })} key={i}>
        <Text key={i}> {favourite.name} </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => this.setState({deletedFavourite: favourites[i]}, function(){ this.deleteFavourite(this.state.deletedFavourite) })} key={Date.now()}>
      <Image source={require('../../assets/AppIcons/trash.png')} style={{width: 15, height: 15}} />
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

          <Text>Your Favourite Dinosaurs</Text>

            <ScrollView>


          {
            this.state.favourites ? (
              self.renderFavourites()
            ) : <Text>Oh no! Your favourites are currently empty. Find dinosaurs in the app and click the ⭐️ to add them to this list. </Text>
        }

        </ScrollView>


            </View>

        </View>




    </View>
    )
  }
}
