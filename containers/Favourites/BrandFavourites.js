import React, { Component } from 'react'
import { Alert, StatusBar, Modal,Dimensions, View, Text, ScrollView, Linking, TouchableHighlight, TouchableOpacity, Image } from 'react-native';
import { Font, LinearGradient  } from 'expo';
import { AsyncStorage } from "react-native"

export default class BrandFavourites extends Component {

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

  findBrandObject(brands, name){
    for (brand of brands){
      if (brand.title === name){
        return brand;
      }
    }
  }

  deleteFavourite(brandToDelete){
    AsyncStorage.getItem('brand_favourites').then((brands) => {
      var brands = JSON.parse(brands);
      var brandObjectToDelete = this.findBrandObject(brands, brandToDelete.title);
      var index = brands.indexOf(brandObjectToDelete);
      brands.splice(index, 1)
      console.log("Brand to delete", brandObjectToDelete);
      AsyncStorage.setItem('brand_favourites', JSON.stringify(brands)).then((brands) => {
        AsyncStorage.getItem('brand_favourites').then((brands) => {
          this.setState({
            favourites: brands
          }, function(){
            if (JSON.parse(brands).length === 0){
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
               `${brandToDelete.title} has been deleted from your favourites`
            )
    }).catch((error) => {
      console.log(error)
  }
)
}

  retrieveFavourites(){
      AsyncStorage.getItem('brand_favourites').then((brands) => {
        this.setState({
          favourites: brands
        }, function(){
          if (brands){
          if (JSON.parse(brands).length === 0){
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
        <Text style={{fontSize: 22, marginTop: Dimensions.get('window').height*0.04, marginBottom: Dimensions.get('window').height*0.04}} key={i}> {favourite.title} </Text>
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

          <Text style={{marginTop: Dimensions.get('window').height*0.05, color: '#0dc6b5', textAlign: 'center', fontSize: 30}}>Your Favourite Brands</Text>

            <ScrollView>


          {
            this.state.favourites ? (
              self.renderFavourites()
            ) : <Text style={{fontSize: 24, textAlign: 'center', marginTop: Dimensions.get('window').height*0.04}}>Oh no! Your favourites are currently empty. Find brands in the app and click the ⭐️ to add them to this list. </Text>
        }

        </ScrollView>


            </View>

        </View>




    </View>
    )
  }
}
