import React              from 'react';
import GlobalButton       from '../../components/GlobalButton.js';
import AddItemButton      from '../../components/AddItemButton.js';
import FaveButton         from '../../components/FaveButton.js';
import ShareButton        from '../../components/ShareButton.js';
import SnapCarousel       from '../../components/SnapCarousel.js';
import LoadingCelery       from '../../components/LoadingCelery.js';
import SmallTwoWayToggle  from '../../components/SmallTwoWayToggle.js';
import AutoHeightImage    from 'react-native-auto-height-image';
import Map                from '../../containers/Global/Map.js';
import StarRating         from 'react-native-star-rating';
import {
       Permissions,
       Constants }        from 'expo';
import {
        AsyncStorage,
        Alert }           from "react-native";
import Expo,
     { ImagePicker }      from 'expo';
import MapView,
      {PROVIDER_GOOGLE}   from 'react-native-maps';
import {
       StyleSheet,
       ScrollView,
       Platform,
       TouchableHighlight,
       Image,
       TextInput,
       Dimensions,
       Button,
       Text,
       View,
       Linking,
       TouchableOpacity}  from 'react-native';
import axios from 'axios';


export default class VenueView extends React.Component {
  static navigationOptions = {
    title: null,
      headerTitle:(
        <AutoHeightImage width={75} style={{position: 'absolute', right: Platform.OS === 'android' ? 0 : -65 }} source={require('../../assets/greenlogo.png')}/>
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


    componentDidMount(){

      if (this.props.fromMap === true){
        var id = this.props.venue;
        console.log("ID", id);
        var token = this.props.token;
      }
      else {
        var id = this.props.navigation.getParam('id', 'NO-ID');
        var token = this.props.navigation.getParam('token', 'NO-ID');
      }

      var self = this;

      axios.get(`http://nuv-api.herokuapp.com/venues/${id}`,

   { headers: { Authorization: `${token}` }})

   .then(function(response){

     var venueItem = JSON.parse(response.request['_response'])

     self.setState({
       venueItem: venueItem
     },
     function(){
       console.log("Venue item", self.state.venueItem);
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
    console.log("Distance between me and this venue: ", distance);

    return distance

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


    var self = this;

    var venue = {title: this.state.venueItem.title, id: this.state.venueItem.id}

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

      returnRestaurantName(){
        return this.state.venueItem.title
      }


      postRating(){

        const {navigate} = this.props.navigation;


        this.setState({
          ratingPending: true
        },
        function(){

          var token = this.props.navigation.getParam('token', 'NO-ID');
          var id = this.props.navigation.getParam('id', 'NO-ID');
          var self = this;

        axios.post(`http://nuv-api.herokuapp.com/venues/${id}/rating`, {"rating": `${self.state.starCount}`},

     { headers: { Authorization: `${token}` }})

     .then(function(response){

       self.setState({
         ratingPending: false
       },
       function(){
         navigate('Home', {avatar: self.props.navigation.getParam('avatar', 'NO-ID'), token: self.props.navigation.getParam('token', 'NO-ID'), id: self.props.navigation.getParam('id', 'NO-ID'), name: self.props.navigation.getParam('name', 'NO-ID'), bio: self.props.navigation.getParam('bio', 'NO-ID'), location: self.props.navigation.getParam('location', 'NO-ID'), user_is_vegan: self.props.navigation.getParam('user_is_vegan', 'NO-ID')})

       }
     )
     }).catch(function(error){
       console.log("Error: ", error);
     })
   })
      }

render() {

  const {navigate} = this.props.navigation;

  if (this.state.venueItem){
    var images = [];
    images.push(this.state.venueItem.venue_main_image ? this.state.venueItem.venue_main_image : 'https://cdn.samsung.com/etc/designs/smg/global/imgs/support/cont/NO_IMG_600x600.png');
    for (image of this.state.venueItem.venue_images){
      images.push(image.venue_image.url ? image.venue_image.url : 'https://cdn.samsung.com/etc/designs/smg/global/imgs/support/cont/NO_IMG_600x600.png')
    }
    var url = this.state.venueItem.url
    console.log("IMAGES", images);
  }

  return (

  <View style={venueViewStyle.container}>

  {this.state.venueItem ? (

  <ScrollView style={{width: Dimensions.get('window').width*1, paddingLeft: Dimensions.get('window').width*0.015, paddingRight: Dimensions.get('window').width*0.015}} showsVerticalScrollIndicator={false}>
    <View style={venueViewStyle.container}>

    <View style={{marginTop: Dimensions.get('window').height*0.02}}>
    </View>
      <View style={{flex: 1, flexDirection: 'row', marginTop: this.props.fromMap === true ? Dimensions.get('window').height*0.02 : 0}}>
        <FaveButton navigation={this.props.navigation} handleButtonClick={this.addVenueToFavourites}/>
        <AddItemButton navigation={this.props.navigation}
        onPress={() => navigate('VenueForm', {avatar: this.props.navigation.getParam('avatar', 'NO-ID'), token: this.props.navigation.getParam('token', 'NO-ID'), id: this.props.navigation.getParam('id', 'NO-ID'), name: this.props.navigation.getParam('name', 'NO-ID'), bio: this.props.navigation.getParam('bio', 'NO-ID'), location: this.props.navigation.getParam('location', 'NO-ID'), user_is_vegan: this.props.navigation.getParam('user_is_vegan', 'NO-ID')})} />
      </View>

      <Text style={venueViewStyle.venuename}>
          {this.state.venueItem.title} / {this.state.venueItem.postcode} / {this.state.venueItem.url}
      </Text>

      <View style={venueViewStyle.mapcontainer}>
        <MapView style={venueViewStyle.map}
          scrollEnabled={true}
          toolbarEnabled={true}
          zoomEnabled={true}
          zoomControlEnabled={true}
          region={{
            latitude: parseFloat(this.state.venueItem.latitude),
            longitude: parseFloat(this.state.venueItem.longitude),
            latitudeDelta: 0.003,
            longitudeDelta: 0.003
          }}
        >
      <MapView.Marker
          coordinate={{
            latitude: parseFloat(this.state.venueItem.latitude),
            longitude: parseFloat(this.state.venueItem.longitude)
            }}
            title={`${this.returnRestaurantName()} (${parseFloat(this.approxDistanceBetweenTwoPoints(this.state.venueItem.latitude, this.state.venueItem.longitude, 55.9497, -3.1811)).toFixed(2)} km from you)`}
            pinColor={'red'}
            description={"www link here"}
          />
      </MapView>
    </View>
  </View>

  <View style={{flexDirection: 'row', justifyContent: 'center'}}>
  <TouchableHighlight underlayColor="white" onPress={()=> url ? Linking.openURL(`${url}`) : console.log("No URL for this venue")}>
  <AutoHeightImage width={Dimensions.get('window').width*0.1} style={{ borderRadius: Dimensions.get('window').width*0.025, margin: Dimensions.get('window').width*0.025 }} source={require('../../assets/AppIcons/linkgreen.png')}/>
  </TouchableHighlight>
  <TouchableHighlight underlayColor='white' onPress={() => navigate('UserView', {notMyProfile: true, avatar: this.state.venueItem.user_image, token: this.props.navigation.getParam('token', 'NO-ID'), id: this.props.navigation.getParam('id', 'NO-ID'), name: this.state.venueItem.user.name, bio: this.state.venueItem.user.bio, location: this.state.venueItem.user.location, user_is_vegan: this.state.venueItem.user.user_is_vegan}) } >
    <AutoHeightImage width={Dimensions.get('window').width*0.1} style={{ borderRadius: Dimensions.get('window').width*0.025, margin: Dimensions.get('window').width*0.025 }} source={{uri: this.state.venueItem.user_image}}/>
  </TouchableHighlight>

    <ShareButton
      marginLeft={Dimensions.get('window').width*0.07}
      title="Shared from NüV"
      message="Message to share"
      url="www.level-apps.co.uk"
      subject="Hi, a NüV user though you would like to see this..."
       />
  </View>

  <View>
    <Text style={venueViewStyle.venuereviewtitle}>
      {this.state.venueItem.title} was described by {this.state.venueItem.user.name} as:{"\n"}
    </Text>
    <Text style={venueViewStyle.venuereviewbody}>
      {this.state.venueItem.description}
    </Text>
  </View>

  <View>
  <SnapCarousel venueItem={this.state.venueItem} images={images}/>
  </View>

  <View style={{alignItems: 'center', marginTop: Dimensions.get('window').height*0.005, width: Dimensions.get('window').width*1}}>
    <Text style={venueViewStyle.vibeHeading}>
      NuV user rating
    </Text>
    <StarRating
      disabled={false}
      maxStars={5}
      rating={this.state.venueItem.rating}
      fullStarColor={'#a2e444'}
      containerStyle={{marginBottom: Dimensions.get('window').height*0.02}}
      />
  </View>

  <View style={{alignItems: 'center', marginTop: Dimensions.get('window').height*0.005, width: Dimensions.get('window').width*1}}>
    <Text style={venueViewStyle.vibeHeading}>
      Rate this venue
    </Text>
      <StarRating
        disabled={false}
        maxStars={5}
        rating={this.state.starCount}
        selectedStar={(rating) => this.onStarRatingPress(rating)}
        fullStarColor={'#a2e444'}
        containerStyle={{marginTop: Dimensions.get('window').height*0.02, marginBottom: Dimensions.get('window').height*0.02}}
      />
  </View>

  <View style={venueViewStyle.submitContainer}>
    <GlobalButton
      marginLeft={Dimensions.get('window').width*0.03}
      buttonTitle="Rate & Home"
      onPress={() => this.postRating()}/>
    </View>
  </ScrollView>

) : <LoadingCelery />

}
</View>
  );
}
}

const venueViewStyle = StyleSheet.create({

  container: {
    backgroundColor:  'white',
    alignItems:       'center',
    justifyContent:   'center',
  },
  submitContainer: {
    alignItems:       'center',
    marginTop:        Dimensions.get('window').height*0.03,
    marginBottom:     Platform.OS === 'ios' ? Dimensions.get('window').height*0.05 : Dimensions.get('window').height*0.1
  },
  carouselcontainer: {
    backgroundColor:  'white',
    alignItems:       'center',
    justifyContent:   'center',
  },
  header: {
    textAlign:        'center',
    marginTop:        Constants.statusBarHeight+10,
    marginBottom:     Dimensions.get('window').height*0.01
  },
  venueitem: {
    flex:             1,
    flexDirection:    'row',
    paddingBottom:    20,
  },
  venuetextcontainer: {
    flex:             1,
    flexDirection:    'column',
  },
  venuename: {
    color:            '#a2e444',
    fontSize:          20,
    fontWeight:       'bold',
    marginTop:        20,
    marginBottom:     20,
  },
  venuereviewtitle: {
    color:            '#a2e444',
    margin:            4,
    fontSize:         18,
  },
  venuereviewbody: {
    margin:           4,
    fontSize:         15,
  },
  mapcontainer: {
    alignItems:     'center',
    justifyContent: 'center',
  },
  mapdescriptionContainer: {
    marginTop:        Dimensions.get('window').height*0.065
  },
  mapdescriptionText: {
    paddingLeft:      Dimensions.get('window').width*0.115,
    paddingRight:     Dimensions.get('window').width*0.115,
    textAlign:        'center',
    fontSize:         14
  },
  mapiconsContainer: {
    width:            Dimensions.get('window').width,
    marginLeft:       0,
    backgroundColor:  'transparent',
    justifyContent:   'space-between',
    alignItems:       'center',
    flexDirection:    'column',
  },
  mapcontainer:{
    width:             Dimensions.get('window').width,
    marginLeft:        0,
    backgroundColor:   'transparent',
    alignItems:        'center',
    flexDirection:     'column',
  },
  map: {
    borderColor:       'transparent',
    height:            Dimensions.get('window').height*0.20,
    width:             Dimensions.get('window').width,
    justifyContent:    'center',
    alignItems:        'center',
    top:               0,
  },
  mapDescription: {
    color:            'white',
    padding:          5,
    fontSize:         20,
    fontFamily:       'PoiretOne-Regular'
  },
  profileItem: {
    padding:          Dimensions.get('window').width* 0.025,
    fontSize:         Dimensions.get('window').width>750 ? 24 : 16 ,
    color:            'black'
  },
  vibeHeading: {
    fontSize:         Dimensions.get('window').width > 750 ? 27 : 20,
    textAlign:        'center',
    color:            '#a2e444',
    marginTop:        Dimensions.get('window').height*0.03
  },
  submitContainer: {
    alignItems:       'center',
    marginTop:        Dimensions.get('window').height*0.03,
    marginBottom:     Platform.OS === 'ios' ? Dimensions.get('window').height*0.15 : Dimensions.get('window').height*0.15
  },
});
