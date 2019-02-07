import React from 'react';
import { StyleSheet, Linking, Platform, TouchableHighlight, ScrollView, Dimensions, Button, Text, View } from 'react-native';
import { Constants } from 'expo'
import * as TimeGreeting from '../../helper_functions/TimeGreeting.js';
import NavBar from '../../components/NavBar.js';
import AddItemButton from '../../components/AddItemButton.js';
import FaveButton from '../../components/FaveButton.js';
import ShareButton from '../../components/ShareButton.js';
import AutoHeightImage from 'react-native-auto-height-image';
import GlobalButton from '../../components/GlobalButton.js';
import StickyHeaderFooterScrollView from 'react-native-sticky-header-footer-scroll-view';
import StarRating from 'react-native-star-rating';
import { AsyncStorage, Alert } from "react-native"
import axios from 'axios';

export default class MediaView extends React.Component {
  static navigationOptions = {
    title: null,
    headerTitle: (
      <AutoHeightImage width={75} style={{position: 'absolute', right: Platform.OS === 'android' ? 0 : -65 }} source={require('../../assets/AppIcons/transparentlogo.png')}/>
 ),
}

      constructor(props) {
      super(props);

      this.onStarRatingPress = this.onStarRatingPress.bind(this);
      this.addMediaItemToFavourites = this.addMediaItemToFavourites.bind(this);
      this.checkFavouriteStatus = this.checkFavouriteStatus.bind(this);
      }

      state = {
          starRating: 3,
          starCount: 2
        };

    componentDidMount(){

      var id = this.props.navigation.getParam('id', 'NO-ID');
      var token = this.props.navigation.getParam('token', 'NO-ID');
      var self = this;

      axios.get(`http://nuv-api.herokuapp.com/media/${id}`,

   { headers: { Authorization: `${token}` }})

   .then(function(response){

     var mediaItem = JSON.parse(response.request['_response'])

     self.setState({
       mediaItem: mediaItem
     },
     function(){
       console.log("Media item", self.state.mediaItem);
     }
   )
   }).catch(function(error){
     console.log("Error: ", error);
   })

    }

  onStarRatingPress(rating) {
  this.setState({
    starCount: rating
  });
  }

  checkFavouriteStatus(viewedMediaItem) {
    try {
      AsyncStorage.getItem('media_item_favourites').then((media) => {
        const items = media ? JSON.parse(media) : [];

        if (items.length > 0){
          var names = items.map((item) => items.name);

          if (names.includes(viewedFavourite)){
            this.setState({viewedItemAlreadyFavourite: true}, function(){
              console.log("Already favourite");
            });
          }
          else {
            this.setState({viewedItemAlreadyFavourite: false},
            function(){
              console.log("Not already favourite");
            });
          }
        }
        else {
          this.setState({viewedItemAlreadyFavourite: false}, function(){
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

  addMediaItemToFavourites = async() => {

    console.log("ITEM", JSON.stringify(this.props.navigation.getParam('title', 'Does not exist')));

    var self = this;

    var media_item = {title: JSON.stringify(this.props.navigation.getParam('title', 'Does not exist')), description: JSON.stringify(this.props.navigation.getParam('description', 'Does not exist')), image: JSON.stringify(this.props.navigation.getParam('image', 'Does not exist'))}

    try {
      AsyncStorage.getItem('media_item_favourites').then((media_items) => {
        const items = media_items ? JSON.parse(media_items) : [];
        if (items.length > 0){
          var names = items.map((item) => item.title);
          if (!names.includes(media_item.title)){
          items.push(media_item);
          AsyncStorage.setItem('media_item_favourites', JSON.stringify(items));
          this.setState({newFavouriteAdded: true}, function(){
            Alert.alert(
                   `${media_item.title} was added to your favourites!`
                )
        })
      }
        else {
          Alert.alert(
                 `${media_item.title} is already in your favourites!`
              )
        }
    }
        else {
          items.push(media_item);
          AsyncStorage.setItem('media_item_favourites', JSON.stringify(items));
          Alert.alert(
                 `${media_item.title} was added to your favourites!`
              )
        }
        console.log("ITEMS AFTER", items);
  })}
    catch (error) {
      console.log(error);
    }

}

  render() {
    const {navigate} = this.props.navigation;
    if (this.state.mediaItem){
      var url = this.state.mediaItem.url
      console.log("URL", url);
    }
    return (

      <View style={mediaViewStyle.container}>

      {this.state.mediaItem ? (

      <ScrollView style={{width: Dimensions.get('window').width*1, paddingLeft: Dimensions.get('window').width*0.015, paddingRight: Dimensions.get('window').width*0.015}} showsVerticalScrollIndicator={false}>
      <View style={mediaViewStyle.container}>

      <View style={{marginTop: Dimensions.get('window').height*0.02}}>
      </View>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <FaveButton navigation={this.props.navigation} handleButtonClick={this.addMediaItemToFavourites}/>
          <AddItemButton navigation={this.props.navigation}
          onPress={() => navigate('MediaForm', {avatar: this.props.navigation.getParam('avatar', 'NO-ID'), token: this.props.navigation.getParam('token', 'NO-ID'), id: this.props.navigation.getParam('id', 'NO-ID'), name: this.props.navigation.getParam('name', 'NO-ID'), bio: this.props.navigation.getParam('bio', 'NO-ID'), location: this.props.navigation.getParam('location', 'NO-ID'), user_is_vegan: this.props.navigation.getParam('user_is_vegan', 'NO-ID')})} />
        </View>

        <Text style={mediaViewStyle.medianame}>
           {this.state.mediaItem.title} / {this.state.mediaItem.url}
        </Text>

        <View style={mediaViewStyle.mapcontainer}>
        <AutoHeightImage width={Dimensions.get('window').width*1} style={{marginTop: Dimensions.get('window').width*0.02}} source={{uri: this.state.mediaItem.medium_images[0].medium_image.url}}/>
        </View>
    </View>

    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <TouchableHighlight underlayColor="white" onPress={()=>Linking.openURL(url)}>
        <AutoHeightImage width={Dimensions.get('window').width*0.1} style={{ borderRadius: Dimensions.get('window').width*0.025, margin: Dimensions.get('window').width*0.025 }} source={require('../../assets/AppIcons/link.png')}/>
        </TouchableHighlight>
        <AutoHeightImage width={Dimensions.get('window').width*0.1} style={{ borderRadius: Dimensions.get('window').width*0.025, margin: Dimensions.get('window').width*0.025 }} source={{uri: this.state.mediaItem.user_image}}/>
        <AutoHeightImage width={Dimensions.get('window').width*0.1} style={{ borderRadius: Dimensions.get('window').width*0.025, margin: Dimensions.get('window').width*0.025 }} source={require('../../assets/VenueTypeIcons/cafe.png')}/>
        <ShareButton
        marginLeft={Dimensions.get('window').width*0.07}
        title="Shared from NüV"
        message="Message to share"
        url="www.level-apps.co.uk"
        subject="Hi, a NüV user though you would like to see this..."
         />
    </View>

    <View >
      <View>
        <Text style={mediaViewStyle.mediareviewtitle}>
        This article was described by [username] as:{"\n"}
        </Text>
        <Text style={mediaViewStyle.mediareviewbody}>
          {this.state.mediaItem.description}
        </Text>
      </View>
    </View>



    <View style={{alignItems: 'center', width: Dimensions.get('window').width*1}}>
    <Text style={mediaViewStyle.vibeHeading}>NuV user rating</Text>
    <StarRating
      disabled={false}
      maxStars={5}
      rating={this.state.starRating}
      fullStarColor={'#0DC6B5'}
      containerStyle={{marginBottom: Dimensions.get('window').height*0.02}}
      />
    </View>

      <View style={{alignItems: 'center', marginTop: Dimensions.get('window').height*0.005, width: Dimensions.get('window').width*1}}>
      <Text style={mediaViewStyle.vibeHeading}>Rate this brand</Text>
      <StarRating
        disabled={false}
        maxStars={5}
        rating={this.state.starCount}
        selectedStar={(rating) => this.onStarRatingPress(rating)}
        fullStarColor={'#0DC6B5'}
        containerStyle={{marginTop: Dimensions.get('window').height*0.02, marginBottom: Dimensions.get('window').height*0.02}}
        />
        </View>

        <View style={mediaViewStyle.submitContainer}>
        <GlobalButton
           buttonTitle="Rate and go"
           onPress={() => navigate('Home', {avatar: this.props.navigation.getParam('avatar', 'NO-ID'), token: this.props.navigation.getParam('token', 'NO-ID'), id: this.props.navigation.getParam('id', 'NO-ID'), name: this.props.navigation.getParam('name', 'NO-ID'), bio: this.props.navigation.getParam('bio', 'NO-ID'), location: this.props.navigation.getParam('location', 'NO-ID'), user_is_vegan: this.props.navigation.getParam('user_is_vegan', 'NO-ID')})}/>
        </View>

        </ScrollView>
      ) : <AutoHeightImage
        source={require('../../assets/celery.gif')}
        style={{
          backgroundColor: 'transparent', position: 'absolute', top: Dimensions.get('window').height*0.26}} width={Dimensions.get('window').width*0.77}
       />
    }
      </View>
      );
      }
      }

const mediaViewStyle = StyleSheet.create({
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
  mediaitem: {
    flex: 1,
    flexDirection: 'row',
    paddingBottom: 20,
  },
  mediatextcontainer: {
    flex: 1,
    flexDirection: 'column',
  },
  medianame: {
    color: '#0dc6b5',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
  },
  mediareviewtitle: {
    color: '#0dc6b5',
    margin: 4,
    fontSize: 18,
  },
  mediareviewbody: {
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
