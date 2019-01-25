import React from 'react';
import { StyleSheet, Image, Dimensions, View, TextStyle, ViewStyle, Modal, TouchableOpacity, Alert, Text, ScrollView, Linking, TouchableHighlight } from 'react-native';
import { Constants } from 'expo'
import NavBar from '../../components/NavBar.js';
import GlobalButton from '../../components/GlobalButton.js';
import AutoHeightImage from 'react-native-auto-height-image';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

export default class Map extends React.Component {
  static navigationOptions = {
      header: null,
  };

  // returnVenue(){
  //   return this.props.mappedVenue.name
  // }
  //
  // locationsForAllVenues(){
  //   return this.props.allVenues.map((venue) =>
  //   this.pinsToMap(venue))
  // }
  //
  // pinsToMap(mappedVenue){
  //   if (mappedVenue.coords[0][0]){
  //     return mappedVenue.coords.map( (coord, i) =>

    // <MapView.Marker
    //     key={i}
    //     coordinate={{
    //           latitude: coord[0],
    //           longitude: coord[1]
    //           }}
    //     title={`${mappedDinosaur.name}`}
    //     pinColor={'#0dc6b5'}
    //     description={"Recommended by [USER_NAME]"}
    //     onCalloutPress={() => this.props.setClickedVenue(mappedVenue.name)}
    //     >
    //     </MapView.Marker>
    //     )
    //   }
    //   else if (!mappedVenue.coords[0][0]) {
    //     return
    // <MapView.Marker
    //     coordinate={{
    //         latitude: mappedVenue.coords[0],
    //         longitude: mappedVenue.coords[1]
    //         }}
    //     title={`${mappedVenue.name}`}
    //     pinColor={'#0dc6b5'}
    //     description={"Recommended by [USER_NAME]"}
    //     onCalloutPress={() => this.props.setClickedDinosaur(mappedDinosaur.name)}
    //     >
    //     </MapView.Marker>

      // returnDefaultLatitude(){
      //     if (this.props.mappedVenue.coords[0][0]){
      //       return this.props.mappedVenue.coords[0][0]
      //     }
      //
      //     else if (!this.props.mappedVenue.coords[0][0]){
      //       return this.props.mappedVenue.coords[0]
      //     }
      //   }
      //
      // returnDefaultLongitude(){
      //     if (this.props.mappedVenue.coords[0][0]){
      //       return this.props.mappedVenue.coords[0][1]
      //   }
      //
      //     else if (!this.props.mappedVenue.coords[0][0]){
      //       return this.props.mappedVenue.coords[1]
      //   }
      //
      //     else {
      //       return Alert.alert(
      //         'No information on this venue'
      //     )
      //   }
      // }


  render() {

    const {navigate} = this.props.navigation;

    return (
      <View style={mapStyle.container}>

        <MapView style={mapStyle.map}
          scrollEnabled={true}
          toolbarEnabled={true}
          zoomEnabled={true}
          zoomControlEnabled={true}
          region={{
            latitude: 55.9497,
            longitude: -3.1811,
            latitudeDelta: 0.003,
            longitudeDelta: 0.003
          }}
        >
      <MapView.Marker
          coordinate={{
            latitude: 55.9497,
            longitude: -3.1811
            }}
            title={"Default location"}
            pinColor={'#0dc6b5'}
            description={"www.level-apps.co.uk"}
          />

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
        <GlobalButton onPress={() => navigate('Home')} buttonTitle={"close"} />
      </View>

    </View>
    );
  }
}

const mapStyle = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  descriptionContainer: {
    marginTop: Dimensions.get('window').height*0.065
  },
  descriptionText: {
    paddingLeft: Dimensions.get('window').width*0.115,
    paddingRight: Dimensions.get('window').width*0.115,
    textAlign: 'center',
    fontSize: 14
  },
  iconsContainer: {
    width: Dimensions.get('window').width,
    marginLeft: 0,
    marginTop: Dimensions.get('window').height*0.78,
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'column',
  },
  map: {
    borderColor: 'transparent',
    height: Dimensions.get('window').height*1,
    width: Dimensions.get('window').width,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
  },
  mapDescription: {
    color: 'white',
    padding: 5,
    fontSize: 20,
    fontFamily: 'PoiretOne-Regular'
  },
});
