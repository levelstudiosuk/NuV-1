import React from 'react';
import { StyleSheet, ScrollView, Platform, TouchableHighlight, Image, TextInput, Dimensions, Button, Text, View, TouchableOpacity } from 'react-native';
import { Constants } from 'expo'
import GlobalButton from '../../components/GlobalButton.js';
import AddItemButton from '../../components/AddItemButton.js';
import FaveButton from '../../components/FaveButton.js';
import ShareButton from '../../components/ShareButton.js';
import SmallTwoWayToggle from '../../components/SmallTwoWayToggle.js';
import AutoHeightImage from 'react-native-auto-height-image';
import Expo, { ImagePicker } from 'expo';
import {Permissions} from 'expo';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import Map from '../../containers/Global/Map.js';
import StarRating from 'react-native-star-rating';
import { AsyncStorage, Alert } from "react-native";
import FadingSlides from 'react-native-fading-slides';

export default class VenueView extends React.Component {
  static navigationOptions = {
    title: null,
    headerTitle:(
     <AutoHeightImage width={75} style={{position: 'absolute', right: Platform.OS === 'android' ? 0 : -65 }} source={require('../../assets/AppIcons/transparentlogo.png')}/>
 ),
}

  constructor(props) {
    super(props);
      this.onStarRatingPress = this.onStarRatingPress.bind(this);
      this.addVenueToFavourites = this.addVenueToFavourites.bind(this);
      this.checkFavouriteStatus = this.checkFavouriteStatus.bind(this);
      }
      state = {
      starRating: 3,
      starCount: 2
    };

  onStarRatingPress(rating) {
    this.setState({
    starCount: rating
    });
    }

  checkFavouriteStatus(viewedVenue) {
    try {
      AsyncStorage.getItem('venue_favourites').then((venues) => {
        const venuess = venues ? JSON.parse(venues) : [];
          if (venuess.length > 0){
            var names = venuess.map((venue) => venue.title);
          if (names.includes(viewedVenue)){
            this.setState({viewedVenueAlreadyFavourite: true}, function(){
              console.log("s");
             });
            }
          else {
            this.setState({viewedVenueAlreadyFavourite: false},
            function(){
            console.log("s");
           });
         }
       }
         else {
          this.setState({viewedVenueAlreadyFavourite: false}, function(){
          console.log("s");
          });
        }
      }
    )
  }
        catch (error) {
          console.log(error);
      }
      }

    addVenueToFavourites = async() => {

      console.log("ITEM", JSON.stringify(this.props.navigation.getParam('title', 'Does not exist')));

      var self = this;

      var venue = {title: JSON.stringify(this.props.navigation.getParam('title', 'Does not exist')), address: JSON.stringify(this.props.navigation.getParam('address', 'Does not exist')), description: JSON.stringify(this.props.navigation.getParam('description', 'Does not exist')), type: JSON.stringify(this.props.navigation.getParam('type', 'Does not exist')), image: JSON.stringify(this.props.navigation.getParam('image', 'Does not exist'))}

      try {
        AsyncStorage.getItem('venue_favourites').then((venues) => {
          const venuess = venues ? JSON.parse(venues) : [];
          if (venuess.length > 0){
            var names = venuess.map((venue) => venue.title);
            if (!names.includes(venue.title)){
            venuess.push(venue);
            AsyncStorage.setItem('venue_favourites', JSON.stringify(venuess));
            this.setState({newVenueAdded: true}, function(){
              Alert.alert(
                     `${venue.title} was added to your favourites!`
                  )
          })
        }
          else {
            Alert.alert(
                   `${venue.title} is already in your favourites!`
                )
          }
      }
          else {
            venuess.push(venue);
            AsyncStorage.setItem('venue_favourites', JSON.stringify(venuess));
            Alert.alert(
                   `${venue.title} was added to your favourites!`
                )
          }
          console.log("VENUES AFTER", venuess);
    })}
      catch (error) {
        console.log(error);
      }
  }

    render() {

      const {navigate} = this.props.navigation;
      slides = [
    {
      image: require('../../assets/venue_images/hndrsn1.png'),
      imageWidth: 250,
      imageHeight: 250,
      title: 'Hendersons Vegan Cafe 1',
      subtitle: 'OOh, what a lovely kale milkshake',
      titleColor: '#0dc6b5',
      subtitleColor: '#fff',
    },
    {
      image: require('../../assets/venue_images/hndrsn2.png'),
      imageWidth: 250,
      imageHeight: 250,
      title: 'Hendersons Vegan Cafe 2',
      subtitle: 'OOh, some carrot lasagne',
      titleColor: '#0dc6b5',
      subtitleColor: '#92FE9D',
    },
    {
      image: require('../../assets/venue_images/hndrsn3.png'),
      imageWidth: 250,
      imageHeight: 250,
      title: 'Hendersons Vegan Cafe 3',
      subtitle: 'OOh, some nice plums',
      titleColor: '#0dc6b5',
      subtitleColor: '#92FE9D',
    },
    {
      image: require('../../assets/venue_images/hndrsn4.png'),
      imageWidth: 250,
      imageHeight: 250,
      title: 'Hendersons Vegan Cafe 4',
      subtitle: 'OOh, beetroot pie',
      titleColor: '#0dc6b5',
      subtitleColor: '#92FE9D',
    },
  ];
      return (

    <View style={venueViewStyle.container}>

    <ScrollView style={{width: Dimensions.get('window').width*1, paddingLeft: Dimensions.get('window').width*0.015, paddingRight: Dimensions.get('window').width*0.015}} showsVerticalScrollIndicator={false}>
    <View style={venueViewStyle.container}>

    <View style={{marginTop: Dimensions.get('window').height*0.02}}>
    </View>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <FaveButton navigation={this.props.navigation} handleButtonClick={this.addVenueToFavourites}/>
        <AddItemButton navigation={this.props.navigation}
        onPress={() => navigate('VenueForm', {avatar: this.props.navigation.getParam('avatar', 'NO-ID'), token: this.props.navigation.getParam('token', 'NO-ID'), id: this.props.navigation.getParam('id', 'NO-ID'), name: this.props.navigation.getParam('name', 'NO-ID'), bio: this.props.navigation.getParam('bio', 'NO-ID'), location: this.props.navigation.getParam('location', 'NO-ID'), user_is_vegan: this.props.navigation.getParam('user_is_vegan', 'NO-ID')})} />
      </View>



      <Text style={venueViewStyle.venuename}>
          Hendersons Vegan Restaurant
      </Text>

      <View style={venueViewStyle.mapcontainer}>
        <MapView style={venueViewStyle.map}
          scrollEnabled={true}
          toolbarEnabled={true}
          zoomEnabled={true}
          zoomControlEnabled={true}
          region={{
            latitude: 55.9497,
            longitude: -3.178770,
            latitudeDelta: 0.003,
            longitudeDelta: 0.003
          }}
        >
      <MapView.Marker
          coordinate={{
            latitude: 55.9497,
            longitude: -3.178770
            }}
            title={"Hendersons Vegan Restaurant"}
            pinColor={'red'}
            description={"www link here"}
          />
      </MapView>
    </View>
  </View>

    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <AutoHeightImage width={Dimensions.get('window').width*0.1} style={{ borderRadius: Dimensions.get('window').width*0.025, margin: Dimensions.get('window').width*0.025 }} source={require('../../assets/AppIcons/link.png')}/>
        <AutoHeightImage width={Dimensions.get('window').width*0.1} style={{ borderRadius: Dimensions.get('window').width*0.025, margin: Dimensions.get('window').width*0.025 }} source={require('../../assets/wil.jpg')}/>
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
        <Text style={venueViewStyle.venuereviewtitle}>
        This venue was described by [username] as:{"\n"}
        </Text>
        <Text style={venueViewStyle.venuereviewbody}>
        Great tasty healthy food for everyone
        Visited for lunch with Vegan partner and omnivore friends. Hot bowl of super tasty soup and the salad plates are stand out fantastic, these guys really know what they are doing with their veg. Treat yourself, feel a bit good about yourself and eat very well, all at a fair price, we'll be back.
        </Text>
      </View>
    </View>

    <View style={venueViewStyle.carouselcontainer}>
      <FadingSlides
        slides={slides}
        fadeDuration={250}
        stillDuration={1000}
        height={300}
        startAnimation={true}
        style={{fontSize: 5}}
      />
    </View>


    <View style={{alignItems: 'center', marginTop: Dimensions.get('window').height*0.005, width: Dimensions.get('window').width*1}}><Text style={venueViewStyle.vibeHeading}>NuV user rating</Text>
      <StarRating
        disabled={false}
        maxStars={5}
        rating={this.state.starRating}
        fullStarColor={'#0DC6B5'}
        containerStyle={{marginBottom: Dimensions.get('window').height*0.02}}
      />
    </View>

    <View style={{alignItems: 'center', marginTop: Dimensions.get('window').height*0.005, width: Dimensions.get('window').width*1}}>
      <Text style={venueViewStyle.vibeHeading}>Rate this venue</Text>
        <StarRating
          disabled={false}
          maxStars={5}
          rating={this.state.starCount}
          selectedStar={(rating) => this.onStarRatingPress(rating)}
          fullStarColor={'#0DC6B5'}
          containerStyle={{marginTop: Dimensions.get('window').height*0.02, marginBottom: Dimensions.get('window').height*0.02}}
        />
    </View>

    <View style={venueViewStyle.submitContainer}>
      <GlobalButton
      marginLeft={Dimensions.get('window').width*0.03}
         buttonTitle="Rate and go"
         onPress={() => navigate('Home', {avatar: this.props.navigation.getParam('avatar', 'NO-ID'), token: this.props.navigation.getParam('token', 'NO-ID'), id: this.props.navigation.getParam('id', 'NO-ID'), name: this.props.navigation.getParam('name', 'NO-ID'), bio: this.props.navigation.getParam('bio', 'NO-ID'), location: this.props.navigation.getParam('location', 'NO-ID'), user_is_vegan: this.props.navigation.getParam('user_is_vegan', 'NO-ID')})}/>
    </View>

  </ScrollView>
</View>
);
}
}

const venueViewStyle = StyleSheet.create({
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
  carouselcontainer: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
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
  venuename: {
    color: '#0dc6b5',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
  },
  venuereviewtitle: {
    color: '#0dc6b5',
    margin: 4,
    fontSize: 18,
  },
  venuereviewbody: {
    margin: 4,
    fontSize: 15,
  },
    mapcontainer: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    mapdescriptionContainer: {
      marginTop: Dimensions.get('window').height*0.065
    },
    mapdescriptionText: {
      paddingLeft: Dimensions.get('window').width*0.115,
      paddingRight: Dimensions.get('window').width*0.115,
      textAlign: 'center',
      fontSize: 14
    },
    mapiconsContainer: {
      width: Dimensions.get('window').width,
      marginLeft: 0,
      backgroundColor: 'transparent',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'column',
    },
    mapcontainer:{
      width: Dimensions.get('window').width,
      marginLeft: 0,
      backgroundColor: 'transparent',
      alignItems: 'center',
      flexDirection: 'column',
    },
    map: {
      borderColor: 'transparent',
      height: Dimensions.get('window').height*0.20,
      width: Dimensions.get('window').width,
      justifyContent: 'center',
      alignItems: 'center',

      top: 0,
    },
    mapDescription: {
      color: 'white',
      padding: 5,
      fontSize: 20,
      fontFamily: 'PoiretOne-Regular'
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
