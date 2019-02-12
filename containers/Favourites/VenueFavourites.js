import React, { Component } from 'react'
import { Alert, StatusBar, Modal,Dimensions, View, Text, ScrollView, Linking, TouchableHighlight, TouchableOpacity, Image } from 'react-native';
import { Font, LinearGradient  } from 'expo';
import { AsyncStorage } from "react-native"

export default class VenueFavourites extends Component {

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

  findVenueObject(venues, name){
    for (venue of venues){
      if (venue.title === name){
        return venue;
      }
    }
  }

  deleteFavourite(venueToDelete){
    AsyncStorage.getItem('venue_favourites').then((venues) => {
      var venues = JSON.parse(venues);
      var venueObjectToDelete = this.findVenueObject(venues, venueToDelete.title);
      var index = venues.indexOf(venueObjectToDelete);
      venues.splice(index, 1)
      console.log("Venue to delete", venueObjectToDelete);
      AsyncStorage.setItem('venue_favourites', JSON.stringify(venues)).then((venues) => {
        AsyncStorage.getItem('venue_favourites').then((venues) => {
          this.setState({
            favourites: venues
          }, function(){
            if (JSON.parse(venues).length === 0){
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
               `${venueToDelete.title} has been deleted from your favourites`
            )
    }).catch((error) => {
      console.log(error)
  }
)
}

  retrieveFavourites(){
      AsyncStorage.getItem('venue_favourites').then((venues) => {
        this.setState({
          favourites: venues
        }, function(){
          if (venues){
          if (JSON.parse(venues).length === 0){
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
        <Text style={{fontSize: Dimensions.get('window').width > 750 ? 22 : 14, marginTop: Dimensions.get('window').height*0.04, marginBottom: Dimensions.get('window').height*0.04}} key={i}> {favourite.title} </Text>
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

          <Text style={{marginTop: Dimensions.get('window').height*0.05, color: '#0dc6b5', textAlign: 'center', fontSize: Dimensions.get('window').width > 750 ? 26 : 18}}>Your Favourite Venues</Text>

            <ScrollView>


          {
            this.state.favourites ? (
              self.renderFavourites()
            ) : <Text style={{fontSize: Dimensions.get('window').width > 750 ? 22 : 16, textAlign: 'center', marginTop: Dimensions.get('window').height*0.04}}>Oh no! Your favourites are currently empty. Find venues in the app and click the ⭐️ to add them to this list. </Text>
        }

        </ScrollView>


            </View>

        </View>




    </View>
    )
  }
}
