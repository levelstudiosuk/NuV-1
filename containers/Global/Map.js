import   React from 'react';
import { StyleSheet,
         Image,
         Dimensions,
         View, TextStyle,
         ViewStyle,
         Modal,
         TouchableOpacity,
         Alert,
         Text,
         ScrollView,
         Linking,
         TouchableHighlight } from 'react-native';
import { Constants } from 'expo'
import   NavBar from '../../components/NavBar.js';
import   GlobalButton from '../../components/GlobalButton.js';
import   LoadingCelery from '../../components/LoadingCelery.js';
import   AutoHeightImage from 'react-native-auto-height-image';
import   MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import   FlipComponent from 'react-native-flip-component';
import   VenueView from '../ItemViews/VenueView.js';
import * as ReverseArray from '../../helper_functions/ReverseArray.js';
import axios from 'axios';

export default class Map extends React.Component {
  static navigationOptions = {
      header: null,
  };

  constructor(props) {
    super(props);

    this.resetFlipped = this.resetFlipped.bind(this);

    this.state = {
      isFlipped: false,
      seeOnlyVegan: this.props.navigation.getParam('user_is_vegan', 'NO-ID') === "vegan" ? true : false,
      venuesLoading: true,
      clickedVenue: null,
      latitude: this.props.navigation.getParam('searchedLocation', 'NO-ID') === true ? this.props.navigation.getParam('latitude', 'NO-ID') : 55.9497,
      longitude: this.props.navigation.getParam('searchedLocation', 'NO-ID') === true ? this.props.navigation.getParam('longitude', 'NO-ID') : -3.1811
    }};

    componentDidMount(){
      const {navigate} = this.props.navigation;
      var token = this.props.navigation.getParam('token', 'NO-ID');
      var self = this;

      axios.get('http://nuv-api.herokuapp.com/venues',

   { headers: { Authorization: `${token}` }})

   .then(function(response){

     console.log("Response for map: ", response);

     var responseItems = JSON.parse(response.request['_response']);

     // var pointsArray = [{latitude: -3.1811, longitude: 55.9497}].concat(responseItems.filter(venueItem => venueItem.longitude && venueItem.latitude))
     // var location = self.getRegionForCoordinates(pointsArray)

     var region = self.regionFrom(self.props.navigation.getParam('latitude', 'NO-ID') ? self.props.navigation.getParam('latitude', 'NO-ID') : 55.9497, self.props.navigation.getParam('longitude', 'NO-ID') ? self.props.navigation.getParam('longitude', 'NO-ID') : -3.1811, self.props.navigation.getParam('distance', 'NO-ID')*1000)

     console.log("Location: ", region);


     var venueItems = responseItems
     .filter(venueItem => venueItem.longitude && venueItem.latitude && self.approxDistanceBetweenTwoPoints(
       venueItem.latitude,
       venueItem.longitude,
       self.props.navigation.getParam('latitude', 'NO-ID') ? self.props.navigation.getParam('latitude', 'NO-ID') : 55.9497,
       self.props.navigation.getParam('longitude', 'NO-ID') ? self.props.navigation.getParam('longitude', 'NO-ID') : -3.1811
     )
     <= self.props.navigation.getParam('distance', 'NO-ID'));

     self.setState({
       mapLocation: region,
       venueItems:  self.props.navigation.getParam('user', 'NO-ID') === true ? venueItems.filter(venueItem => venueItem.user_id === self.props.navigation.getParam('user_id', 'NO-ID')) : venueItems
     },
     function(){

       self.setState({
         venuesLoading: false
       })
     }
   )
  }).catch(function(error){
   console.log("Error: ", error);
  })
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

      return distance

    }

    plotVeganRestaurants(){

      return this.state.venueItems.filter(venue => venue.content_is_vegan === true).map( (venue, i) =>

          <MapView.Marker

              key={i}
              coordinate={{
                  latitude: parseFloat(venue.latitude),
                  longitude: parseFloat(venue.longitude)
                  }}

              title={this.props.navigation.getParam('searchedLocation', 'NO-ID') === true ? `${venue.title} (${parseFloat(this.approxDistanceBetweenTwoPoints(parseFloat(venue.latitude), parseFloat(venue.longitude), this.props.navigation.getParam('latitude', 'NO-ID'), this.props.navigation.getParam('longitude', 'NO-ID'))).toFixed(2)} km from you)` :
              `${venue.title} (${parseFloat(this.approxDistanceBetweenTwoPoints(parseFloat(venue.latitude), parseFloat(venue.longitude), this.props.navigation.getParam('latitude', 55.9497), this.props.navigation.getParam('longitude', -3.1811))).toFixed(2)} km from your searched location)`
            }
              pinColor={'blue'}
              description={"Click to view"}
              onCalloutPress={() => this.processMarkerClick(venue.id)}>
          </MapView.Marker>
        )
    }

    plotVeganAndVegetarianRestaurants(){

      return this.state.venueItems.map( (venue, i) =>

          <MapView.Marker
              key={i}
              coordinate={{
                  latitude: parseFloat(venue.latitude),
                  longitude: parseFloat(venue.longitude)
                  }}
              title={`${venue.title} (${parseFloat(this.approxDistanceBetweenTwoPoints(parseFloat(venue.latitude), parseFloat(venue.longitude), this.props.navigation.getParam('latitude', 'NO-ID'), this.props.navigation.getParam('longitude', 'NO-ID'))).toFixed(2)} km from you)`}
              pinColor={'blue'}
              description={"Click to view"}
              onCalloutPress={() => this.processMarkerClick(venue.id)}>
          </MapView.Marker>
        )
    }

 venueResultsMarkers(){
    if (this.props.navigation.getParam('see_only_vegan', 'NO-ID') === true){
      return this.plotVeganRestaurants()
      }
      else {
        return this.plotVeganAndVegetarianRestaurants()
      }
    }

    processMarkerClick(id){
      const {navigate} = this.props.navigation;

      // this.setState({ isFlipped: !this.state.isFlipped })

      navigate('VenueView', {guest: this.props.navigation.getParam('guest', 'NO-ID'), current_user_id: navigation.getParam('user_id', 'NO-ID'),
              avatar: this.props.navigation.getParam('avatar', 'NO-ID'), profile_id: this.props.navigation.getParam('profile_id', 'NO-ID'), token: this.props.navigation.getParam('token', 'NO-ID'), id: id, name: this.props.navigation.getParam('name', 'NO-ID'), bio: this.props.navigation.getParam('bio', 'NO-ID'), location: this.props.navigation.getParam('location', 'NO-ID'), user_is_vegan: this.props.navigation.getParam('user_is_vegan', 'NO-ID')})
    }

    resetFlipped(){
     this.setState({
      isFlipped: !this.state.isFlipped,
        clickedVenue: null
       })
     }

    regionFrom(latitude, longitude, distanceInMetres) {
        // distance = distanceInMetres/2
        var circumference = 40075
        var oneDegreeOfLatitudeInMeters = 111.32 * 1000
        var angularDistance = distanceInMetres/circumference

        var latitudeDelta = distanceInMetres / oneDegreeOfLatitudeInMeters
        var longitudeDelta = Math.abs(Math.atan2(
                Math.sin(angularDistance)*Math.cos(latitude),
                Math.cos(angularDistance) - Math.sin(latitude) * Math.sin(latitude)))

        return result = {
            latitude: latitude,
            longitude: longitude,
            latitudeDelta,
            longitudeDelta,
        }
    }

render() {

  const {navigate} = this.props.navigation;

    return (

  <View>
  { this.state.venueItems ? (
    <ScrollView>

      <View style={mapStyle.container}>
          <MapView style={mapStyle.map}
            scrollEnabled={true}
            toolbarEnabled={true}
            zoomEnabled={true}
            zoomControlEnabled={true}
            region={{
              latitude: this.state.mapLocation.latitude,
              longitude: this.state.mapLocation.longitude,
              latitudeDelta: this.state.mapLocation.latitudeDelta,
              longitudeDelta: this.state.mapLocation.longitudeDelta
            }}
          >
        <MapView.Marker
            coordinate={{
              latitude: this.props.navigation.getParam('latitude', 'NO-ID') ? this.props.navigation.getParam('latitude', 'NO-ID') : 55.9497,
              longitude: this.props.navigation.getParam('longitude', 'NO-ID') ? this.props.navigation.getParam('longitude', 'NO-ID') : -3.1811
              }}
              title={this.props.navigation.getParam('searchedLocation', 'NO-ID') === true ? "Your searched location" : "Your location"}
              pinColor={'red'}
              description={this.props.navigation.getParam('searchedLocation', 'NO-ID') === true ? "The place you searched" : "Your current location"}
            />
          {this.venueResultsMarkers()}
        </MapView>
        <View style={{
          height: Dimensions.get('window').height * 0.125,
          backgroundColor: 'transparent',
        }}>
          <TouchableOpacity style={{
            marginTop: Dimensions.get('window').height * 0.05
            }}
            onPress={this.props.closeMap}>
          </TouchableOpacity>
        </View>
        <View style={mapStyle.iconsContainer}>
          <GlobalButton
          onPress={() => navigate('Home')}
          buttonTitle={"close"}
           />
        </View>
      </View>

      </ScrollView>

    ) :
      <LoadingCelery />

  }
    </View>
  )}
};


const mapStyle = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height,
    flexDirection:    'column',
    backgroundColor:  'white',
    alignItems:       'center',
    justifyContent:   'center',
  },
  descriptionContainer: {
    marginTop:         Dimensions.get('window').height*0.065
  },
  descriptionText: {
    paddingLeft:        Dimensions.get('window').width*0.115,
    paddingRight:       Dimensions.get('window').width*0.115,
    textAlign:          'center',
    fontSize:           14
  },
  iconsContainer: {
    width:              Dimensions.get('window').width,
    marginLeft:         0,
    marginTop:          Dimensions.get('window').height*0.78,
    backgroundColor:    'transparent',
    alignItems:         'center',
    flexDirection:      'column',
  },
  flipbutton: {
    width:              Dimensions.get('window').width,
    marginLeft:         0,
    marginTop:          Dimensions.get('window').height*0.5,
    backgroundColor:    'transparent',
    alignItems:         'center',
    flexDirection:      'column',
  },
  map: {
    borderColor:        'transparent',
    height:             Dimensions.get('window').height*1,
    width:              Dimensions.get('window').width,
    justifyContent:     'center',
    alignItems:         'center',
    position:           'absolute',
    top:                 0,
  },
  mapDescription: {
    color:              'white',
    padding:            5,
    fontSize:           20,
    fontFamily:         'PoiretOne-Regular'
  },
});
