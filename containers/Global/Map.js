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
      latitude: 55.9497,
      longitude: -3.1811
    }};

    componentDidMount(){
      const {navigate} = this.props.navigation;
      var token = this.props.navigation.getParam('token', 'NO-ID');
      var self = this;

      axios.get('http://nuv-api.herokuapp.com/venues',

   { headers: { Authorization: `${token}` }})

   .then(function(response){

     var responseItems = JSON.parse(response.request['_response']);

     var venueItems = ReverseArray.reverseArray(responseItems).filter(venueItem => venueItem.longitude && venueItem.latitude && self.approxDistanceBetweenTwoPoints(venueItem.latitude, venueItem.longitude, 55.9497, -3.1811) <= self.props.navigation.getParam('distance', 'NO-ID'));

     self.setState({
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
      console.log();

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
              onPress={() => this.setState({
                  clickedVenue: venue.id},
                  function(){ console.log("clicked", this.state.clickedVenue)}) }
              title={`${venue.title} (${parseFloat(this.approxDistanceBetweenTwoPoints(parseFloat(venue.latitude), parseFloat(venue.longitude), 55.9497, -3.1811)).toFixed(2)} km from you)`}
              pinColor={'blue'}
              description={"Click to view"}
              onCalloutPress={() => this.state.clickedVenue ? this.processMarkerClick(venue.id) : console.log("No clicked venue currently")}>
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
              onPress={() => this.setState({clickedVenue: venue.id, latitude: parseFloat(venue.latitude), longitude: parseFloat(venue.longitude) }, function(){ console.log("clicked", this.state.clickedVenue)}) }
              title={`${venue.title} (${parseFloat(this.approxDistanceBetweenTwoPoints(parseFloat(venue.latitude), parseFloat(venue.longitude), 55.9497, -3.1811)).toFixed(2)} km from you)`}
              pinColor={'blue'}
              description={"Click to view"}
              onCalloutPress={() => this.state.clickedVenue ? this.processMarkerClick(venue.id) : console.log("No clicked venue currently")}>
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

    processMarkerClick(){
      console.log("clickedVenue", this.state.clickedVenue);
      this.setState({ isFlipped: !this.state.isFlipped })
    }

    resetFlipped(){
     this.setState({
      isFlipped: !this.state.isFlipped,
        clickedVenue: null
       })
     }

render() {

  const {navigate} = this.props.navigation;

    return (

  <View>
  { this.state.venueItems ? (
    <ScrollView>
    <FlipComponent
        isFlipped={this.state.isFlipped}
        frontView={

      <View style={mapStyle.container}>
          <MapView style={mapStyle.map}
            scrollEnabled={true}
            toolbarEnabled={true}
            zoomEnabled={true}
            zoomControlEnabled={true}
            region={{
              latitude: this.state.latitude,
              longitude: this.state.longitude,
              latitudeDelta: 0.03,
              longitudeDelta: 0.03
            }}
          >
        <MapView.Marker
            coordinate={{
              latitude: 55.9497,
              longitude: -3.1811,
              }}
              title={"Your location"}
              pinColor={'red'}
              description={"Your current location"}
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
          }

        backView={

          <View>

          { this.state.clickedVenue ? (

          <VenueView
            fromMap={true}
            venue={this.state.clickedVenue}   id={this.props.navigation.getParam('id', 'NO-ID')}  token={this.props.navigation.getParam('token', 'NO-ID')}  navigation={this.props.navigation}
          />

        ) : null

      }
      </View>
          }
          />

        {
          this.state.isFlipped === true ? (
            <View style={mapStyle.flipbutton}>
            <GlobalButton
              buttonTitle="Flip"
              onPress={() => {
                this.resetFlipped()
              }}
              />
            </View>
          ) : null
        }
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
