import React from 'react';
import { StyleSheet, Linking, Platform, TouchableHighlight, ScrollView, Dimensions, Button, Text, View } from 'react-native';
import { Constants } from 'expo'
import * as TimeGreeting from '../../helper_functions/TimeGreeting.js';
import NavBar from '../../components/NavBar.js';
import AddItemButton from '../../components/AddItemButton.js';
import LoadingCelery from '../../components/LoadingCelery.js';
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
      <AutoHeightImage width={75} style={{position: 'absolute', right: Platform.OS === 'android' ? 0 : -65 }} source={require('../../assets/greenlogo.png')}/>
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

      var mediaItem = this.props.navigation.getParam('mediaItem', 'NO-ID');
      console.log("Media item: ", this.state.mediaItem);
     this.setState({
       mediaItem: mediaItem
     })

    }

    retrieveUploaderProfile(){
      const {navigate} = this.props.navigation;

      var id = this.state.mediaItem.user_id;
      var token = this.props.navigation.getParam('token', 'NO-ID');
      var self = this;

      axios.get(`http://nuv-api.herokuapp.com/profiles/${id}`,

    { headers: { Authorization: `${token}` }})

    .then(function(response){

     var uploaderProfile = JSON.parse(response.request['_response'])

     navigate('UserView',
     {notMyProfile: true,
        uploader: uploaderProfile,
        token: self.props.navigation.getParam('token', 'NO-ID'),
        avatar:        self.props.navigation.getParam('avatar', 'NO-ID'),
        id:            self.props.navigation.getParam('id', 'NO-ID'),
        name:          self.props.navigation.getParam('name', 'NO-ID'),
        bio:           self.props.navigation.getParam('bio', 'NO-ID'),
        location:      self.props.navigation.getParam('location', 'NO-ID'),
        user_is_vegan: self.props.navigation.getParam('user_is_vegan', 'NO-ID')
      })

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

    var media_item = {title: this.state.mediaItem.title, url: this.state.mediaItem.url, user_image: this.state.mediaItem.user_image ? this.state.mediaItem.user_image : null, item_user_name: this.state.mediaItem.item_user_name, description: this.state.mediaItem.description}

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

    postLike(navigation){
      const {navigate} = navigation

        var token = navigation.getParam('token', 'NO-ID');
        var id = this.state.mediaItem.id
        var self = this;

      axios.post(`http://nuv-api.herokuapp.com/media/${id}/favourite`,

    { headers: { Authorization: `${token}` }})

    .then(function(response){

     console.log("Response from like post: ", response);

     self.addMediaItemToFavourites()

     }
    )
    .catch(function(error){
     console.log("Error: ", error);
    })
    }

  render() {
    const {navigate} = this.props.navigation;
    if (this.state.mediaItem){
      var url = this.state.mediaItem.url
    }
    return (

      <View style={mediaViewStyle.container}>

      { this.state.mediaItem ? (


      <ScrollView style={{width: Dimensions.get('window').width*1, paddingLeft: Dimensions.get('window').width*0.015, paddingRight: Dimensions.get('window').width*0.015}} showsVerticalScrollIndicator={false}>

      <View style={mediaViewStyle.container}>

      <View style={{marginTop: Dimensions.get('window').height*0.02}}>
      </View>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <FaveButton navigation={this.props.navigation} handleButtonClick={() => this.postLike(this.props.navigation)}/>
          <AddItemButton navigation={this.props.navigation}
          onPress={() => navigate('MediaForm', {avatar: this.props.navigation.getParam('avatar', 'NO-ID'), token: this.props.navigation.getParam('token', 'NO-ID'), id: this.props.navigation.getParam('id', 'NO-ID'), name: this.props.navigation.getParam('name', 'NO-ID'), bio: this.props.navigation.getParam('bio', 'NO-ID'), location: this.props.navigation.getParam('location', 'NO-ID'), user_is_vegan: this.props.navigation.getParam('user_is_vegan', 'NO-ID')})} />
        </View>

        <Text style={mediaViewStyle.medianame}>
           {this.state.mediaItem.title}{"\n"}
        </Text>

        <Text style={mediaViewStyle.mediareviewtitle}>
        This item was originally published by {this.state.mediaItem.source}
        </Text>
    </View>

    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <TouchableHighlight underlayColor="white" onPress={()=>Linking.openURL(this.props.navigation.getParam('url', 'NO-ID'))}>
        <AutoHeightImage width={Dimensions.get('window').width*0.1} style={{ borderRadius: Dimensions.get('window').width*0.025, margin: Dimensions.get('window').width*0.025 }} source={require('../../assets/AppIcons/linkgreen.png')}/>
        </TouchableHighlight>
        { this.state.mediaItem.user_image ? (
        <TouchableHighlight underlayColor='white' onPress={() => this.retrieveUploaderProfile() }>
        <AutoHeightImage width={Dimensions.get('window').width*0.1} style={{ borderRadius: Dimensions.get('window').width*0.025, margin: Dimensions.get('window').width*0.025 }} source={{uri: this.state.mediaItem.user_image}}/>
        </TouchableHighlight>
      ) : null
    }
        <ShareButton
        marginLeft={Dimensions.get('window').width*0.07}
        title="Shared from NüV"
        message="A NüV user has shared something with you"
        url="www.level-apps.co.uk"
        subject="Hi, a NüV user thought you would like to see this..."
         />
    </View>

    <View >
      <View>
      { this.props.navigation.getParam('item_user_name', 'NO-ID') ? (

        <Text style={mediaViewStyle.mediareviewtitle}>
        A brief description of this news item courtesy of NüV user {this.state.mediaItem.item_user_name}:{"\n"}
        </Text>

      ) : null

    }
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
      fullStarColor={'#a2e444'}
      containerStyle={{marginBottom: Dimensions.get('window').height*0.02}}
      />
    </View>

        <View style={mediaViewStyle.submitContainer}>
        <GlobalButton
           buttonTitle="Home"
           onPress={() => navigate('Home', {avatar: this.props.navigation.getParam('avatar', 'NO-ID'), token: this.props.navigation.getParam('token', 'NO-ID'), id: this.props.navigation.getParam('id', 'NO-ID'), name: this.props.navigation.getParam('name', 'NO-ID'), bio: this.props.navigation.getParam('bio', 'NO-ID'), location: this.props.navigation.getParam('location', 'NO-ID'), user_is_vegan: this.props.navigation.getParam('user_is_vegan', 'NO-ID')})}/>
        </View>

        </ScrollView>
      ) : null }

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
    color: '#a2e444',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
  },
  mediareviewtitle: {
    color: '#a2e444',
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
  color: '#a2e444',
  marginTop: Dimensions.get('window').height*0.03
  },
  submitContainer: {
    alignItems: 'center',
    marginTop: Dimensions.get('window').height*0.03,
    marginBottom: Platform.OS === 'ios' ? Dimensions.get('window').height*0.15 : Dimensions.get('window').height*0.15
  },
  });
