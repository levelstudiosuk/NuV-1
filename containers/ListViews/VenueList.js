import React from 'react';
import { StyleSheet, ScrollView, Platform, TouchableHighlight, Image, TextInput, Dimensions, Button, Text, View } from 'react-native';
import { Constants } from 'expo'
import GlobalButton from '../../components/GlobalButton.js';
import AddItemButton from '../../components/AddItemButton.js';
import FaveButton from '../../components/FaveButton.js';
import SmallTwoWayToggle from '../../components/SmallTwoWayToggle.js';
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
     <AutoHeightImage width={75} style={{position: 'absolute', right: Platform.OS === 'android' ? 0 : -65 }} source={require('../../assets/AppIcons/transparentlogo.png')}/>
 ),
}

    constructor(props) {
      super(props);

      this.changeToggleSelection = this.changeToggleSelection.bind(this);
    }

    state = {
      items: [{title: "Hendersons Vegan Restaurant", address: "25c Thistle St, Edinburgh EH2 1DX", description: "Long-running vegetarian deli/eatery showcasing local and organic produce, plus regular live music.", type: "Cafe", image: require('../../assets/AppIcons/venuedefault.png')}],
      seeOnlyVegan: this.props.navigation.getParam('user_is_vegan', 'NO-ID') === "vegan" ? true : false
    }

    componentDidMount(){
      var token = this.props.navigation.getParam('token', 'NO-ID');
      var self = this;

      axios.get('http://nuv-api.herokuapp.com/venues',

   { headers: { Authorization: `${token}` }})

   .then(function(response){

     var responseItems = JSON.parse(response.request['_response']);
     var venueItems = ReverseArray.reverseArray(responseItems);

     self.setState({
       venueItems:  self.props.navigation.getParam('user', 'NO-ID') === true ? venueItems.filter(venueItem => venueItem.user_id === self.props.navigation.getParam('user_id', 'NO-ID')) : venueItems
     },
     function(){
       console.log("Venue items here");
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
      if (this.props.navigation.getParam('user', 'NO-ID') === true){
        return `Here are your venue contributions.`
      }
      else {
        return "Search the ethical eateries here"
      }
    }

    mapVenueItems(){
      const {navigate} = this.props.navigation;

      var venueItems = this.state.seeOnlyVegan === true ? this.state.venueItems.filter(venueItem => venueItem.content_is_vegan === true) : this.state.venueItems

      return venueItems.map((item, i) =>

      <View key={i} style={venueListStyle.venueitem}>
      <TouchableHighlight
        key={i+1}
        style={venueListStyle.venueimage}
        onPress={() => navigate('VenueView', {token: this.props.navigation.getParam('token', 'NO-ID'), id: item.id})}>
        <Image key={i+2} source={require('../../assets/AppIcons/venuedefault.png')} style={{height: 75, width: 75}}/>
      </TouchableHighlight>
          <View key={i+3} style={venueListStyle.venuetextcontainer}>
            <View key={i+4}>
              <Text
              key={i+5}
              style={venueListStyle.venuetitle}
              onPress={() => navigate('VenueView', {token: this.props.navigation.getParam('token', 'NO-ID'), id: item.id})}>
              {item.title}
              </Text>
              <Text
              key={i+6}
              style={venueListStyle.venuetype}
              onPress={() => navigate('VenueView', {token: this.props.navigation.getParam('token', 'NO-ID'), id: item.id})}>
              {item.venue_type}
              </Text>
            </View>
            <View key={i+7}>
              <Text
              key={i+8}
              style={venueListStyle.venuedescription}
              onPress={() => navigate('VenueView', {token: this.props.navigation.getParam('token', 'NO-ID'), id: item.id})}>
              {item.description}
              </Text>
              <Text
              key={i+9}
              style={venueListStyle.venueaddress}
              onPress={() => navigate('VenueView', {token: this.props.navigation.getParam('token', 'NO-ID'), id: item.id})}>
              {item.postcode}
              </Text>
            </View>
          </View>
        </View>

      )

    }

    render() {
      const {navigate} = this.props.navigation;
      return (

    <View style={venueListStyle.container}>

    <ScrollView style={{width: Dimensions.get('window').width*0.95}} showsVerticalScrollIndicator={false}>
    <View style={venueListStyle.container}>


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

      </View>
      </ScrollView>

    <ScrollView style={{width: Dimensions.get('window').width*0.95, marginTop: Dimensions.get('window').height*0.03}} showsVerticalScrollIndicator={false}>
    <View style={venueListStyle.container}>

      <Text style={{fontSize: 18, textAlign: 'center'}}>
          {TimeGreeting.getTimeBasedGreeting(this.props.navigation.getParam('name', 'NO-ID'))}{"\n"}Search the ethical eateries here:
      </Text>

      <View style={{marginTop: Dimensions.get('window').height*0.04}}>
      </View>

      {this.state.venueItems && this.state.venueItems.length > 0 ? (
        this.mapVenueItems()
      ): null
    }

    {this.state.venueItems && this.state.venueItems.length == 0 && this.props.navigation.getParam('user', 'NO-ID') === true ? (
      <Text> You have not added any venues to NüV yet. </Text>

    ): null
  }

      <View >
        <GlobalButton
          buttonTitle="Home"
          onPress={() => navigate('Home', {avatar: this.props.navigation.getParam('avatar', 'NO-ID'), token: this.props.navigation.getParam('token', 'NO-ID'), id: this.props.navigation.getParam('id', 'NO-ID'), name: this.props.navigation.getParam('name', 'NO-ID'), bio: this.props.navigation.getParam('bio', 'NO-ID'), location: this.props.navigation.getParam('location', 'NO-ID'), user_is_vegan: this.props.navigation.getParam('user_is_vegan', 'NO-ID')})}/>
      </View>
    </View>
  </ScrollView>
</View>
);
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
    color: '#0dc6b5',
    margin: 4,
    fontSize: 18,
    fontWeight: 'bold',
  },
  venuetype: {
    color: '#92FE9D',
    margin: 4,
    fontSize: 18,
    fontWeight: 'bold',
  },
  venueaddress: {
    color: '#0dc6b5',
    margin: 4,
    fontSize: 12,
    fontWeight: 'bold',
  },
  venuedescription: {
    margin: 4,
    fontSize: 15
  }
});
