import React from 'react';
import { StyleSheet, Alert, ScrollView, Platform, TouchableHighlight, Image, TextInput, Dimensions, Button, Text, View } from 'react-native';
import { Constants } from 'expo'
import GlobalButton from '../../components/GlobalButton.js';
import AddItemButton from '../../components/AddItemButton.js';
import FaveButton from '../../components/FaveButton.js';
import SmallTwoWayToggle from '../../components/SmallTwoWayToggle.js';
import LoadingCelery from '../../components/LoadingCelery.js';
import AutoHeightImage from 'react-native-auto-height-image';
import Expo, { ImagePicker } from 'expo';
import {Permissions} from 'expo'
import axios from 'axios';
import moment from 'moment';
import    GuestRegistrationOffer from '../../components/GuestRegistrationOffer.js';
import * as TimeGreeting from '../../helper_functions/TimeGreeting.js';
import * as ReverseArray from '../../helper_functions/ReverseArray.js';
import key from '../../news_key.js';

export default class MediaList extends React.Component {
  static navigationOptions = {
    title: null,
    headerTitle:(
     <AutoHeightImage width={75} style={{position: 'absolute', right: Platform.OS === 'android' ? 0 : -65 }} source={require('../../assets/greenlogo.png')}/>
 ),
}

    constructor(props) {
      super(props);

      this.changeToggleSelection = this.changeToggleSelection.bind(this);
      this.openRegistrationOverlay = this.openRegistrationOverlay.bind(this);
      this.closeRegistrationOverlay = this.closeRegistrationOverlay.bind(this);
      this.handleRegistrationRequest = this.handleRegistrationRequest.bind(this);
    }

    state = {
      seeOnlyVegan: this.props.navigation.getParam('user_is_vegan', 'NO-ID') === "vegan" ? true : false,
      contentLoading: true,
      registrationOverlayVisible: false,
    }

    componentDidMount(){
      var token = this.props.navigation.getParam('token', 'NO-ID');
      var self = this;
      var request_keyword = this.props.navigation.getParam('user_is_vegan', 'NO-ID') === "vegan" ? "veganism" : "vegetarianism"
      console.log("Key", key);
      var url = `https://newsapi.org/v2/everything?q=veganism&apiKey=${key}`;

      axios.get(url)

   .then(function(response){


     var responseItems = response.data.articles
     var newsArray = []
     responseItems.forEach((item) => {
       mediaItem = {
         id: null,
         title: item.title,
         url: item.url,
         publishedAt: item.publishedAt,
         source: item.source.name,
         description: item.description,
         user_id: null,
         content_is_vegan: true
       }
       newsArray.push(mediaItem)
     })

     self.setState({
       mediaItems:  self.props.navigation.getParam('user', 'NO-ID') === true ? newsArray.filter(mediaItem => mediaItem.user_id === self.props.navigation.getParam('user_id', 'NO-ID')) : newsArray
     },
     function(){
       self.fetchVegetarianStories()
     }
   )
 }).catch(function(error){
   console.log("Error: ", error);
 })
    }

    openRegistrationOverlay(){
      this.setState({
        registrationOverlayVisible: true
      })
    }

    closeRegistrationOverlay(){
      this.setState({
        registrationOverlayVisible: false
      })
    }

  handleRegistrationRequest(navigation){
    const {navigate} = navigation;

    navigate('Landing')

  }

    fetchVegetarianStories(){

      var self = this;
      var url = `https://newsapi.org/v2/everything?q=vegetarianism&apiKey=${key}`;

      axios.get(url)

   .then(function(response){


     var responseItems = response.data.articles
     var newsArray = []
     responseItems.forEach((item) => {
       mediaItem = {
         id: null,
         title: item.title,
         url: item.url,
         publishedAt: item.publishedAt,
         source: item.source.name,
         description: item.description,
         user_id: null,
         content_is_vegan: false
       }
       newsArray.push(mediaItem)
     })

     var filteredNewsArray = self.props.navigation.getParam('user', 'NO-ID') === true ? newsArray.filter(mediaItem => mediaItem.user_id === self.props.navigation.getParam('user_id', 'NO-ID')) : newsArray
     var updatedState = filteredNewsArray.concat(self.state.mediaItems);

     self.setState({
       mediaItems: updatedState
     },
     function(){
       self.fetchNuvApiStories()
     }
   )
 }).catch(function(error){
   console.log("Error: ", error);
 })

    }

    fetchNuvApiStories(){
      var token = this.props.navigation.getParam('token', 'NO-ID');
    var self = this;

    axios.get('http://nuv-api.herokuapp.com/media',

 { headers: { Authorization: `${token}` }})

 .then(function(response){

   var responseItems = JSON.parse(response.request['_response'])

   var newsArray = []
   responseItems.forEach((item) => {
     mediaItem = {
       id: item.id,
       title: item.title,
       url: item.url,
       publishedAt: item.created_at,
       source: `${item.user_name} (NüV)`,
       description: item.description,
       user_id: item.user_id,
       content_is_vegan: item.content_is_vegan,
       user_image: item.user_image,
       user_name: item.user_name
     }
     newsArray.push(mediaItem)
   })

   var mediaItems = ReverseArray.reverseArray(newsArray);
   var filteredMediaItems = self.props.navigation.getParam('user', 'NO-ID') === true ? mediaItems.filter(mediaItem => mediaItem.user_id === self.props.navigation.getParam('user_id', 'NO-ID')) : mediaItems

   var updatedState = self.state.mediaItems.concat(filteredMediaItems)

   const filteredUpdatedState = updatedState.sort((a, b) => {
      return moment(b.publishedAt).diff(a.publishedAt)
    })

   self.setState({
     mediaItems:  filteredUpdatedState
   },
   function(){
     self.setState({
       contentLoading: false
     })
   }
 )
}).catch(function(error){
 console.log("Error: ", error);
})
}

    getActiveToggleIndex(){
      return this.props.navigation.getParam('user_is_vegan', 'NO-ID') === "vegan" ? 0 : 1
    }

    changeToggleSelection(selection){

      this.setState({
        seeOnlyVegan: selection
      }, function(){
        console.log("See only vegan: ", this.state.seeOnlyVegan);
      })
    }

    returnMessage(){
      if (this.props.navigation.getParam('viewingAnotherUser', 'NO-ID') != true && this.props.navigation.getParam('user', 'NO-ID') === true ){
        return `Your media items, ${this.props.navigation.getParam('name', 'NO-ID')}`
      }
      else if (this.props.navigation.getParam('viewingAnotherUser', 'NO-ID') === true && this.props.navigation.getParam('uploader', 'NO-ID')){
        return `Media items posted by ${this.props.navigation.getParam('uploader', 'NO-ID').name}`
      }
      else {
        return "Here is the news."
      }
    }

    deleteMediaItem(media){
      const {navigate} = this.props.navigation;

      var self = this;
      var token = this.props.navigation.getParam('token', 'NO-ID');
      var media = media;

      axios.delete(`http://nuv-api.herokuapp.com/media/${media.id}`,

    { headers: { Authorization: `${token}` }})

    .then(function(response){

      var updatedMediaItems = self.state.mediaItems.filter(item => item.id != media.id)

      self.setState({
        mediaItems: updatedMediaItems,
      }, function(){
        Alert.alert(
               `${media.title} has been deleted`
            )

       console.log("Response from delete post: ", response);
      })
     }
    )
    .catch(function(error){
     console.log("Error: ", error);
    })
    }

    mapMediaItems(){
      const {navigate} = this.props.navigation;

      var mediaItems = this.state.seeOnlyVegan === true ? this.state.mediaItems.filter(mediaItem => mediaItem.content_is_vegan === true) : this.state.mediaItems

      return mediaItems.map((item, i) =>

        <View style={mediaListStyle.mediaitem}   key={i}>
        <TouchableHighlight  key={i+6} onPress={() => navigate('MediaItemView',
        {
        guest: this.props.navigation.getParam('guest', 'NO-ID'),
        token: this.props.navigation.getParam('token', 'NO-ID'), mediaItem: item,
        avatar:        this.props.navigation.getParam('avatar', 'NO-ID'),
        token:         this.props.navigation.getParam('token', 'NO-ID'),
        id:            this.props.navigation.getParam('id', 'NO-ID'),
        name:          this.props.navigation.getParam('name', 'NO-ID'),
        bio:           this.props.navigation.getParam('bio', 'NO-ID'),
        location:      this.props.navigation.getParam('location', 'NO-ID'),
        user_is_vegan: this.props.navigation.getParam('user_is_vegan', 'NO-ID'),
        user_id:       item.user_id
      })}
        style={mediaListStyle.mediadescription} style={mediaListStyle.mediaimage}>
          <Image source={require('../../assets/AppIcons/greennews.png')} style={{height: 80, width: 80}}/>
        </TouchableHighlight>
            <View  key={i+2} style={mediaListStyle.mediatextcontainer}>
              <View  key={i+1}>
                <Text  key={i+3} onPress={() => navigate('MediaItemView', {token: this.props.navigation.getParam('token', 'NO-ID'), mediaItem: item,
                guest: this.props.navigation.getParam('guest', 'NO-ID'),
                avatar:        this.props.navigation.getParam('avatar', 'NO-ID'),
                token:         this.props.navigation.getParam('token', 'NO-ID'),
                id:            this.props.navigation.getParam('id', 'NO-ID'),
                name:          this.props.navigation.getParam('name', 'NO-ID'),
                bio:           this.props.navigation.getParam('bio', 'NO-ID'),
                location:      this.props.navigation.getParam('location', 'NO-ID'),
                user_is_vegan: this.props.navigation.getParam('user_is_vegan', 'NO-ID'),
                user_id:       item.user_id
              })}
               style={mediaListStyle.mediadescription}  style={mediaListStyle.mediatitle}>
                {item.title}
                </Text>
              </View>
              <View  key={i+4}>
                <Text  key={i+5} onPress={() => navigate('MediaItemView', {token: this.props.navigation.getParam('token', 'NO-ID'), mediaItem: item,
                guest: this.props.navigation.getParam('guest', 'NO-ID'),
                avatar:        this.props.navigation.getParam('avatar', 'NO-ID'),
                token:         this.props.navigation.getParam('token', 'NO-ID'),
                id:            this.props.navigation.getParam('id', 'NO-ID'),
                name:          this.props.navigation.getParam('name', 'NO-ID'),
                bio:           this.props.navigation.getParam('bio', 'NO-ID'),
                location:      this.props.navigation.getParam('location', 'NO-ID'),
                user_is_vegan: this.props.navigation.getParam('user_is_vegan', 'NO-ID'),
                user_id:       item.user_id
              })}
                style={mediaListStyle.mediadescription}>
                {item.description}
                </Text>
              </View>
              <View  key={i+7}>
                <Text  key={i+8} onPress={() => navigate('MediaItemView', {token: this.props.navigation.getParam('token', 'NO-ID'), mediaItem: item,
                guest: this.props.navigation.getParam('guest', 'NO-ID'),
                avatar:        this.props.navigation.getParam('avatar', 'NO-ID'),
                token:         this.props.navigation.getParam('token', 'NO-ID'),
                id:            this.props.navigation.getParam('id', 'NO-ID'),
                name:          this.props.navigation.getParam('name', 'NO-ID'),
                bio:           this.props.navigation.getParam('bio', 'NO-ID'),
                location:      this.props.navigation.getParam('location', 'NO-ID'),
                user_is_vegan: this.props.navigation.getParam('user_is_vegan', 'NO-ID'),
              user_id:       item.user_id
            })}
                style={mediaListStyle.mediadescription}  style={mediaListStyle.mediatitle}>
                {moment(new Date(item.publishedAt), 'MMMM Do YYYY, h:mm:ss a').calendar()} - {item.source}
                </Text>
              </View>
              {
                this.props.navigation.getParam('admin', 'NO-ID') === true && item.user_name ? (
              <View style={{alignItems: 'center'}} key={i+18}>
              <TouchableHighlight
              onPress={() => this.deleteMediaItem(item)}
              style={{marginTop: Dimensions.get('window').height*0.008}}
              underlayColor={'white'}
              key={i+22}>
              <Image key={i+2}
                source={require('../../assets/AppIcons/trash.png')}
                style={{marginRight: 80, width: Dimensions.get('window').height*0.03, height: Dimensions.get('window').height*0.03}}/>
              </TouchableHighlight>
              </View>
            ) : null
          }
            </View>
          </View>
      )
    }

    render() {
      const {navigate} = this.props.navigation;

      if (this.state.contentLoading === false){
      return (

    <View style={mediaListStyle.container}>

    <ScrollView style={{width: Dimensions.get('window').width*0.95}} showsVerticalScrollIndicator={false}>
    <View style={[mediaListStyle.container, {marginBottom: Dimensions.get('window').height*0.04}]}>

    <View style={{marginTop: Dimensions.get('window').height*0.02}}>
    </View>

      <View style={{flex: 1, flexDirection: 'row'}}>
        <SmallTwoWayToggle changeToggleSelection={this.changeToggleSelection} activeIndex={this.getActiveToggleIndex()} />
        <AddItemButton navigation={this.props.navigation}
        onPress={() => this.props.navigation.getParam('guest', 'NO-ID') === true ? this.openRegistrationOverlay() : navigate('MediaForm', {avatar: this.props.navigation.getParam('avatar', 'NO-ID'), token: this.props.navigation.getParam('token', 'NO-ID'), id: this.props.navigation.getParam('id', 'NO-ID'), name: this.props.navigation.getParam('name', 'NO-ID'), bio: this.props.navigation.getParam('bio', 'NO-ID'), location: this.props.navigation.getParam('location', 'NO-ID'), user_is_vegan: this.props.navigation.getParam('user_is_vegan', 'NO-ID')})} />
        {/*<FaveButton navigation={this.props.navigation}/>*/}
      </View>

      <AutoHeightImage
          width={70}
          source={require('../../assets/AppIcons/newspaper.png')}
          style={{marginBottom: Dimensions.get('window').height*0.01, marginTop: 5}}
      />

      {
        this.props.navigation.getParam('uploader', 'NO-ID') ? (

          <View style={{alignItems:'center', marginBottom: Dimensions.get('window').height*0.03}}>
          <Text style={{marginTop: Dimensions.get('window').height*0.03, marginBottom: Dimensions.get('window').height*0.03, fontSize: Dimensions.get('window').width > 750 ? 24 : 18, textAlign: 'center'}}>
              {this.returnMessage()}{"\n"}

          </Text>
          </View>

   ) :

   <View style={{alignItems:'center', marginBottom: Dimensions.get('window').height*0.03}}>
   <Text style={{marginTop: Dimensions.get('window').height*0.03, marginBottom: Dimensions.get('window').height*0.03, fontSize: Dimensions.get('window').width > 750 ? 24 : 18, textAlign: 'center'}}>
       {this.returnMessage()}{"\n"}

   </Text>
   </View>
 }

      </View>
      </ScrollView>

      <ScrollView style={{width: Dimensions.get('window').width*0.95, marginTop: Dimensions.get('window').height*0.01}} showsVerticalScrollIndicator={false}>
      <View style={mediaListStyle.container}>

      <View style={{marginTop: Dimensions.get('window').height*0.01}}>
      </View>

      {
        this.state.mediaItems && this.state.mediaItems.length > 0 ? (

      this.mapMediaItems()

    ) :   null
  }

  {
    this.state.mediaItems && this.state.mediaItems.length === 0 && this.props.navigation.getParam('user', 'NO-ID') === true ? (

      <Text style={{fontSize: Dimensions.get('window').width > 750 ? 24 : 20, marginBottom: Dimensions.get('window').height*0.02}}> You have not uploaded any media items yet. </Text>


) :   null
}

      <View style={{ marginBottom: Dimensions.get('window').height*0.5}}>
      <GlobalButton
          buttonTitle="Home"
          onPress={() => navigate('Home', {avatar: this.props.navigation.getParam('avatar', 'NO-ID'), token: this.props.navigation.getParam('token', 'NO-ID'), id: this.props.navigation.getParam('id', 'NO-ID'), name: this.props.navigation.getParam('name', 'NO-ID'), bio: this.props.navigation.getParam('bio', 'NO-ID'), location: this.props.navigation.getParam('location', 'NO-ID'), user_is_vegan: this.props.navigation.getParam('user_is_vegan', 'NO-ID')})}/>
      </View>

      {this.state.registrationOverlayVisible ? (
      <GuestRegistrationOffer
      openOverlay    = {this.openRegistrationOverlay}
      handleRegistrationRequest   = {this.handleRegistrationRequest}
      navigation =                  {this.props.navigation}
      closeRegistrationOverlay   = {this.closeRegistrationOverlay}
      overlayVisible = {this.state.registrationOverlayVisible}
    />
    ) : null}

    </View>
  </ScrollView>
</View>

)
}

else {
  return (

    <View style={{backgroundColor: '#FBFEFC'}}>
    <LoadingCelery />
    </View>

  )
}


}
}

const mediaListStyle = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitContainer: {
    alignItems: 'center',
    marginTop: Dimensions.get('window').height*0.03,
    marginBottom: Platform.OS === 'ios' ? Dimensions.get('window').height*0.05 : Dimensions.get('window').height*0.05
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
  mediatitle: {
    color: '#a2e444',
    margin: 4,
    fontSize: 18,
    fontWeight: 'bold',
  },
  mediadescription: {
    margin: 4,
    fontSize: 15
  }
});
