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

  findMediaItemObject(mediaItems, name){
    for (mediaItem of mediaItems){
      if (mediaItem.title === name){
        return mediaItem;
      }
    }
  }

  deleteFavourite(mediaItemToDelete){
    AsyncStorage.getItem('media_item_favourites').then((mediaItems) => {
      var mediaItems = JSON.parse(mediaItems);
      var mediaItemObjectToDelete = this.findMediaItemObject(mediaItems, mediaItemToDelete.title);
      var index = mediaItems.indexOf(mediaItemObjectToDelete);
      mediaItems.splice(index, 1)
      console.log("Media item to delete", mediaItemObjectToDelete);
      AsyncStorage.setItem('media_item_favourites', JSON.stringify(mediaItems)).then((mediaItems) => {
        AsyncStorage.getItem('media_item_favourites').then((mediaItems) => {
          this.setState({
            favourites: mediaItems
          }, function(){
            if (JSON.parse(mediaItems).length === 0){
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
               `${mediaItemToDelete.title} has been deleted from your favourites`
            )
    }).catch((error) => {
      console.log(error)
  }
)
}

  retrieveFavourites(){
      AsyncStorage.getItem('media_item_favourites').then((mediaItems) => {
        this.setState({
          favourites: mediaItems
        }, function(){
          if (mediaItems){
          if (JSON.parse(mediaItems).length === 0){
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
      <TouchableOpacity onPress={() => navigate('MediaItemView', {
        user_id: this.props.navigation.getParam('user_id', 'NO-ID'),
        settings: true,
        avatar: this.props.navigation.getParam('avatar', 'NO-ID'),
        token: this.props.navigation.getParam('token', 'NO-ID'),
        id: favourite.id,
        name: this.props.navigation.getParam('name', 'NO-ID'),
        bio: this.props.navigation.getParam('bio', 'NO-ID'),
        location: this.props.navigation.getParam('location', 'NO-ID'),
        user_is_vegan: this.props.navigation.getParam('user_is_vegan', 'NO-ID')})} key={i}>
        <Text style={{fontSize: Dimensions.get('window').width > 750 ? 22 : 14, marginTop: Dimensions.get('window').width < 750 ? Dimensions.get('window').height*0.02 : Dimensions.get('window').width*0.02, marginBottom: Dimensions.get('window').width < 750 ? Dimensions.get('window').height*0.02 : Dimensions.get('window').width*0.02}} key={i}> {favourite.title} </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => this.setState({deletedFavourite: favourites[i]}, function(){ this.deleteFavourite(this.state.deletedFavourite) })} key={Date.now()}>
      <Image source={require('../../assets/AppIcons/trash.png')} style={{width: Dimensions.get('window').height*0.02, height: Dimensions.get('window').height*0.02, marginTop: Dimensions.get('window').width < 750 ? Dimensions.get('window').height*0.02 : Dimensions.get('window').width*0.02, marginBottom: Dimensions.get('window').width < 750 ? Dimensions.get('window').height*0.02 : Dimensions.get('window').width*0.02}} />
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

          <Text style={{marginTop: Dimensions.get('window').height*0.05, color: '#2e8302', textAlign: 'center', fontSize: Dimensions.get('window').width > 750 ? 26 : 18}}>Your Favourite Media Items</Text>

            <ScrollView style={{marginBottom: Dimensions.get('window').height*0.3}}>


          {
            this.state.favourites ? (
              self.renderFavourites()
            ) : <Text style={{fontSize: Dimensions.get('window').width > 750 ? 22 : 14, textAlign: 'center', marginTop: Dimensions.get('window').height*0.04}}>Oh no! Your favourites are currently empty. Find media items in the app and click the ⭐️ to add them to this list. </Text>
        }

        </ScrollView>


            </View>

        </View>




    </View>
    )
  }
}
