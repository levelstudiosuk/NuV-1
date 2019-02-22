import React from 'react';
import { StyleSheet, ScrollView, Platform, TouchableHighlight, Image, TextInput, Dimensions, Button, Text, View } from 'react-native';
import { Constants } from 'expo'
import GlobalButton from '../../components/GlobalButton.js';
import AddItemButton from '../../components/AddItemButton.js';
import FaveButton from '../../components/FaveButton.js';
import SmallTwoWayToggle from '../../components/SmallTwoWayToggle.js';
import LoadingCelery from '../../components/LoadingCelery.js';
import AutoHeightImage from 'react-native-auto-height-image';
import Expo, { ImagePicker } from 'expo';
import {Permissions} from 'expo';
import axios from 'axios';
import moment from 'moment';
import * as TimeGreeting from '../../helper_functions/TimeGreeting.js';
import * as ReverseArray from '../../helper_functions/ReverseArray.js';

export default class VenueList extends React.Component {
  static navigationOptions = {
    title: null,
    headerTitle:(
     <AutoHeightImage width={75} style={{position: 'absolute', right: Platform.OS === 'android' ? 0 : -65 }} source={require('../../assets/greenlogo.png')}/>
 ),
}

    constructor(props) {
      super(props);

      this.changeToggleSelection = this.changeToggleSelection.bind(this);
    }

    state = {
      seeOnlyVegan: this.props.navigation.getParam('user_is_vegan', 'NO-ID') === "vegan" ? true : false,
      venuesLoading: true
    }

    componentDidMount(){
      const {navigate} = this.props.navigation;
      var token = this.props.navigation.getParam('token', 'NO-ID');
      var self = this;

      axios.get('http://nuv-api.herokuapp.com/venues',

   { headers: { Authorization: `${token}` }})

   .then(function(response){

     var responseItems = JSON.parse(response.request['_response']);
     var venueItems = responseItems.
     filter(venueItem => venueItem.longitude && venueItem.latitude &&
       self.approxDistanceBetweenTwoPoints(
       venueItem.latitude,
       venueItem.longitude,
       self.props.navigation.getParam('searchedLocation', 'NO-ID') === true ?
       self.props.navigation.getParam('latitude', 'NO-ID') : 55.9497,
     self.props.navigation.getParam('searchedLocation', 'NO-ID') === true ?
     self.props.navigation.getParam('longitude', 'NO-ID') : -3.1811)
     <= self.props.navigation.getParam('distance', 'NO-ID'));

     self.setState({
       venueItems:  self.props.navigation.getParam('user', 'NO-ID') === true ? venueItems.filter(venueItem => venueItem.user_id === self.props.navigation.getParam('user_id', 'NO-ID')) : venueItems
     },
     function(){
       console.log("Venue items here");
       self.setState({
         venuesLoading: false
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

    approxDistanceBetweenTwoPoints(lat1, long1, lat2, long2){

      var R = 6371.0

      var lat1_rad = lat1 * (Math.PI / 180)
      var long1_rad = long1 * (Math.PI / 180)
      var lat2_rad = lat2 * (Math.PI / 180)
      var long2_rad = long2 * (Math.PI / 180)

      var dlong = long2_rad - long1_rad
      var dlat = lat2_rad - lat1_rad

      var a = Math.sin(dlat / 2)**2 + Math.cos(lat1_rad) * Math.cos(lat2_rad) * Math.sin(dlong / 2)**2
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

      var distance = R * c
      // console.log("Distance between me and this venue: ", distance);

      return distance

    }

    changeToggleSelection(selection){

      this.setState({
        seeOnlyVegan: selection
      }, function(){
        console.log("See only vegan: ", this.state.seeOnlyVegan);
      })

    }

    returnMessage(){
      if (this.props.navigation.getParam('user', 'NO-ID') === true && !this.props.navigation.getParam('uploader', 'NO-ID')){
        return `Here are your venue contributions.`
      }
      else if (this.props.navigation.getParam('viewingAnotherUser', 'NO-ID') === true && this.props.navigation.getParam('uploader', 'NO-ID')){
        return `Here are all venue contributions made by ${this.props.navigation.getParam('uploader', 'NO-ID').name}`
      }
      else {
        return "Search the ethical eateries here"
      }
    }

    getExtraMessage(){
      if (this.props.navigation.getParam('uploader', 'NO-ID')){
        return `${this.props.navigation.getParam('uploader', 'NO-ID').name} has not uploaded any venues yet`
      }
      else {
        return "You have not uploaded any venues yet"
      }
    }

    mapVenueItems(){
      const {navigate} = this.props.navigation;
      var navigation = this.props.navigation;

      var venueItems = this.state.seeOnlyVegan === true ? this.state.venueItems.filter(venueItem => venueItem.content_is_vegan === true) : this.state.venueItems

      return venueItems.map((item, i) =>

      <View key={i} style={venueListStyle.venueitem}>
      <TouchableHighlight
        key={i+1}
        style={venueListStyle.venueimage}
        onPress={() => navigate('VenueView', {user_id: navigation.getParam('user_id', 'NO-ID'),
        avatar: navigation.getParam('avatar', 'NO-ID'),
        token: navigation.getParam('token', 'NO-ID'),
        id: navigation.getParam('id', 'NO-ID'),
        name: navigation.getParam('name', 'NO-ID'),
        bio: navigation.getParam('bio', 'NO-ID'),
        location: navigation.getParam('location', 'NO-ID'),
        user_is_vegan: navigation.getParam('user_is_vegan', 'NO-ID'), id: item.id})}>
        <Image key={i+2} source={require('../../assets/AppIcons/lightgreenpin.png')} style={{height: 50, width: 50}}/>
      </TouchableHighlight>
          <View key={i+3} style={venueListStyle.venuetextcontainer}>
            <View key={i+4}>
              <Text
              key={i+5}
              style={venueListStyle.venuetitle}
              onPress={() => navigate('VenueView', {user_id: navigation.getParam('user_id', 'NO-ID'),
              avatar: navigation.getParam('avatar', 'NO-ID'),
              token: navigation.getParam('token', 'NO-ID'),
              id: navigation.getParam('id', 'NO-ID'),
              name: navigation.getParam('name', 'NO-ID'),
              bio: navigation.getParam('bio', 'NO-ID'),
              location: navigation.getParam('location', 'NO-ID'),
              user_is_vegan: navigation.getParam('user_is_vegan', 'NO-ID'), id: item.id})}>
              {item.title} ({item.postcode})
              </Text>
              <Text
              key={i+6}
              style={venueListStyle.venuetype}
              onPress={() => navigate('VenueView', {user_id: navigation.getParam('user_id', 'NO-ID'),
              avatar: navigation.getParam('avatar', 'NO-ID'),
              token: navigation.getParam('token', 'NO-ID'),
              id: navigation.getParam('id', 'NO-ID'),
              name: navigation.getParam('name', 'NO-ID'),
              bio: navigation.getParam('bio', 'NO-ID'),
              location: navigation.getParam('location', 'NO-ID'),
              user_is_vegan: navigation.getParam('user_is_vegan', 'NO-ID'), id: item.id})}>
              {item.venue_type}
              </Text>
            </View>
            <View key={i+7}>
              <Text
              key={i+8}
              style={venueListStyle.venuedescription}
              onPress={() => navigate('VenueView', {user_id: navigation.getParam('user_id', 'NO-ID'),
              settings: true,
              avatar: navigation.getParam('avatar', 'NO-ID'),
              token: navigation.getParam('token', 'NO-ID'),
              id: navigation.getParam('id', 'NO-ID'),
              name: navigation.getParam('name', 'NO-ID'),
              bio: navigation.getParam('bio', 'NO-ID'),
              location: navigation.getParam('location', 'NO-ID'),
              user_is_vegan: navigation.getParam('user_is_vegan', 'NO-ID'), id: item.id})}>
              {item.description}
              </Text>
            </View>
          </View>
        </View>

      )

    }

    render() {
      const {navigate} = this.props.navigation;

      if (this.state.venuesLoading === false){
      return (

    <View style={venueListStyle.container}>

    <ScrollView style={{width: Dimensions.get('window').width*0.95}} showsVerticalScrollIndicator={false}>
    <View style={[venueListStyle.container, {marginBottom: Dimensions.get('window').height*0.04}]}>


    <View style={{marginTop: Dimensions.get('window').height*0.02}}>
    </View>

      <View style={{flex: 1, flexDirection: 'row'}}>
        <SmallTwoWayToggle changeToggleSelection={this.changeToggleSelection} activeIndex={this.getActiveToggleIndex()} />
        <AddItemButton navigation={this.props.navigation}
        onPress={() => navigate('VenueForm', {avatar: this.props.navigation.getParam('avatar', 'NO-ID'), token: this.props.navigation.getParam('token', 'NO-ID'), id: this.props.navigation.getParam('id', 'NO-ID'), name: this.props.navigation.getParam('name', 'NO-ID'), bio: this.props.navigation.getParam('bio', 'NO-ID'), location: this.props.navigation.getParam('location', 'NO-ID'), user_is_vegan: this.props.navigation.getParam('user_is_vegan', 'NO-ID')})} />
        {/*<FaveButton navigation={this.props.navigation}/>*/}
      </View>

      <AutoHeightImage
          width={70}
          source={require('../../assets/AppIcons/dining.png')}
          style={{marginBottom: Dimensions.get('window').height*0.04, marginTop: 5}}
      />

      {
        this.props.navigation.getParam('uploader', 'NO-ID') ? (

          <Text style={{fontSize: Dimensions.get('window').width > 750 ? 24 : 18, textAlign: 'center'}}>
              {this.returnMessage()}{"\n"}{"\n"}

          </Text>

   ) :

         <Text style={{fontSize: Dimensions.get('window').width > 750 ? 24 : 18, textAlign: 'center'}}>
             {this.returnMessage()}{"\n"}{"\n"}

         </Text>
        }

      </View>
      </ScrollView>

    <ScrollView style={{width: Dimensions.get('window').width*0.95, marginTop: Dimensions.get('window').height*0.05}} showsVerticalScrollIndicator={false}>
    <View style={venueListStyle.container}>

      <View style={{marginTop: Dimensions.get('window').height*0.04}}>
      </View>

      {this.state.venueItems && this.state.venueItems.length > 0 ? (
        this.mapVenueItems()
      ): null
    }

    {this.state.venueItems && this.state.venueItems.length == 0 && this.props.navigation.getParam('user', 'NO-ID') === true ? (
      <Text style={{fontSize: Dimensions.get('window').width > 750 ? 24 : 18, textAlign: 'center', marginBottom: Dimensions.get('window').height*0.02}}> {this.getExtraMessage()} </Text>

    ): null
  }

      <View style={{marginBottom: Dimensions.get('window').height*0.15}}>
        <GlobalButton
          buttonTitle="Home"
          onPress={() => navigate('Home', {avatar: this.props.navigation.getParam('avatar', 'NO-ID'), token: this.props.navigation.getParam('token', 'NO-ID'), id: this.props.navigation.getParam('id', 'NO-ID'), name: this.props.navigation.getParam('name', 'NO-ID'), bio: this.props.navigation.getParam('bio', 'NO-ID'), location: this.props.navigation.getParam('location', 'NO-ID'), user_is_vegan: this.props.navigation.getParam('user_is_vegan', 'NO-ID')})}/>
      </View>
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

const venueListStyle = StyleSheet.create({
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

  venueitem: {
    flex: 1,
    flexDirection: 'row',
    paddingBottom: 20,
  },
  venuetextcontainer: {
    flex: 1,
    flexDirection: 'column',
  },
  venuetitle: {
    color: '#a2e444',
    margin: 4,
    fontSize: 18,
    fontWeight: 'bold',
  },
  venuetype: {
    color: '#696969',
    margin: 4,
    fontSize: 18,
    fontWeight: 'bold',
  },
  venueaddress: {
    color: '#a2e444',
    margin: 4,
    fontSize: 12,
    fontWeight: 'bold',
  },
  venuedescription: {
    margin: 4,
    fontSize: 15
  }
});
