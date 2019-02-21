import React, { Component, Fragment } from 'react'
import { Button }    from 'react-native-elements';
import { View, Alert,
         Dimensions,
         StyleSheet, TextInput, Text } from 'react-native';
import GradientButton from './GradientButton.js';
import GlobalButton from './GlobalButton.js';
import Overlay from 'react-native-modal-overlay'
import Slider from 'react-native-slider';
import MapSettingsTwoWayToggle from './MapSettingsTwoWayToggle.js';
import * as ProblematicPlaceNameHandler from '../helper_functions/ProblematicPlaceNameHandler.js';
import axios from 'axios';

export default class MapSettingsOverlay extends Component {

  constructor(props) {
  super(props);

    this.changeToggleSelection = this.changeToggleSelection.bind(this);
    this.chooseSearchLocation = this.chooseSearchLocation.bind(this);
    this.chooseCurrentLocation = this.chooseCurrentLocation.bind(this);
    this.changeSearchText = this.changeSearchText.bind(this);
    this.getPlaceCoordinates = this.getPlaceCoordinates.bind(this);
  }

  state = {
      distance: 50,
      seeOnlyVegan: this.props.navigation.getParam('user_is_vegan', 'NO-ID') === "vegan" ? true : false,
      selectedOption: null,
      place: ""
    };


    getActiveToggleIndex(){
      return this.props.navigation.getParam('user_is_vegan', 'NO-ID') === "vegan" ? 0 : 1
    }

    changeToggleSelection(selection){

      this.setState({
        seeOnlyVegan: selection
      })

    }

    chooseSearchLocation(){
      this.setState({
        selectedOption: "searchLocation"
      })
    }

    chooseCurrentLocation(){
      this.setState({
        selectedOption: "currentLocation"
      })
    }

    getPlaceCoordinates(location){

      if (this.state.place === ""){
        Alert.alert(
              "Please enter a place name"
            )
        return;
      }

      else {

      var updatedLocation = ProblematicPlaceNameHandler.problematicPlaceNameHandler(location);
      var url = `http://api.geograph.org.uk/syndicator.php?key=[1d6edee685]&text=${updatedLocation}&format=JSON`
      var self = this;

        axios.get(url).then( (response) => {

          var position = [parseFloat(response.data.items[0].lat), parseFloat(response.data.items[0].long)]
          this.setState({
            coordinatesDataLoaded: true
          }, function(){
            this.props.launchVenueSearch(this.props.navigation, this.state.distance, position[0], position[1], true)
          })
    }).catch(function(error){
      console.log(error);
      console.log("Error fetching coordinates data.");
      Alert.alert(
 'Could not find weather for your location',
 "Try to be more specific e.g. type 'Bath Somerset' rather than 'Bath' or 'Bangor Wales' instead of 'Bangor'."
)
  self.setState({
    loadingInProcess: false
  })
    })
    }
  }

    changeSearchText(place){
      this.setState({
        place: place
      })

    }


render() {
  return (
    <View style={{
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: this.props.overlayVisible === true ? Dimensions.get('window').height*0.0001 : Dimensions.get('window').height*0.0001
      }}>

      { !this.state.selectedOption ? (

            <Overlay
              visible={this.props.overlayVisible}
              onClose={() => this.props.closeOverlay()}
              closeOnTouchOutside
              animationType="fadeInUp"
              containerStyle={{backgroundColor: 'rgba(0,0,0,0.8)'}}
              childrenWrapperStyle={{backgroundColor: 'white', borderRadius: 15}}
              animationDuration={500}
            >
            {
              (hideModal, overlayState) => (


        <Fragment>

        <Text style={{
          textAlign: 'center',
          fontSize: Dimensions.get('window').width > 750 ? 20 : 16,
          marginBottom: Dimensions.get('window').height*0.03,
          marginTop: Dimensions.get('window').height*0.03 }}>
            How would you like to find restaurants?
        </Text>

        <View style={{
          alignItems: 'center',
          marginTop: Dimensions.get('window').height*0.02}}
          >
          <GlobalButton
            onPress={() => this.chooseCurrentLocation()}
            buttonTitle={"My Location"}
          />

        </View>

        <View style={{
          alignItems: 'center',
          marginTop: Dimensions.get('window').height*0.02}}
          >
          <GlobalButton
            onPress={() => this.chooseSearchLocation()}
            buttonTitle={"Search Location"}
          />

        </View>

        </Fragment>

        )
      }

        </Overlay>


    ) :

    <View>

      {this.state.selectedOption === "currentLocation" ? (


        <Overlay
          visible={this.props.overlayVisible}
          onClose={() => this.props.closeOverlay() }
          closeOnTouchOutside
          animationType="fadeInUp"
          containerStyle={{backgroundColor: 'rgba(0,0,0,0.8)'}}
          childrenWrapperStyle={{backgroundColor: 'white', borderRadius: 15}}
          animationDuration={500}
        >
        {
          (hideModal, overlayState) => (

              <Fragment>


              <Text style={{textAlign: 'center', fontSize: Dimensions.get('window').width > 750 ? 20 : 16, marginBottom: Dimensions.get('window').height*0.07, marginTop: Dimensions.get('window').height*0.03 }}>Search radius:</Text>

                <View style={buttonContainerStyle.container}>
                <Slider
                animateTransitions={true}
                minimumValue={5}
                maximumValue={100}
                step={5}
                minimumTrackTintColor={'#2e8302'}
                maximumTrackTintColor={'#a2e444'}
                thumbTintColor={'white'}
                value={this.state.distance}
                style={{width: Dimensions.get('window').width*0.70}}
                thumbStyle={buttonContainerStyle.thumb}
                onValueChange={(distance) => this.setState({distance})} />
                </View>

                <View style={{alignItems: 'center', marginTop: Dimensions.get('window').height*0.02}}>
                <Text style={{marginBottom: Dimensions.get('window').width*0.02, marginTop: Dimensions.get('window').width*0.02, color: 'black', fontSize: Dimensions.get('window').width > 750 ? 18 : 14}}>{this.state.distance}km</Text>
                </View>

                <View style={{
                  alignItems: 'center',
                  marginTop: Dimensions.get('window').height*0.1,
                  flexDirection: 'row'
                }}
                  >
                  <GlobalButton
                    onPress={() => this.setState({ selectedOption: "searchLocation" })}
                    buttonTitle={"Search Location"}
                  />

                  <GlobalButton
                    onPress={() => this.props.launchVenueSearch(this.props.navigation, this.state.distance)}
                    buttonTitle={"Go"}
                  />

                </View>

              </Fragment>

            )
          }

                </Overlay>



    ) :

          <Overlay
            visible={this.props.overlayVisible}
            onClose={() => this.props.closeOverlay() }
            closeOnTouchOutside
            animationType="fadeInUp"
            containerStyle={{backgroundColor: 'rgba(0,0,0,0.8)'}}
            childrenWrapperStyle={{backgroundColor: 'white', borderRadius: 15}}
            animationDuration={500}
          >
          {
            (hideModal, overlayState) => (


      <Fragment>

      <TextInput
        style={{borderBottomColor: 'grey', width: Dimensions.get('window').width*0.5, height: 40, marginBottom: Dimensions.get('window').height*0.04, borderColor: 'white', borderWidth: 1, textAlign: 'center', fontWeight: 'normal', fontSize: 15}}
        onChangeText={(place) => {this.changeSearchText(place)}}
        value={this.state.place} placeholder='Enter a place (GB/Ireland)' placeholderTextColor='black'
        underlineColorAndroid='transparent' maxLength={500} multiline={true}
      />

      <Text style={{
        textAlign: 'center',
        fontSize: Dimensions.get('window').width > 750 ? 20 : 16,
        marginBottom: Dimensions.get('window').height*0.05,
        marginTop: Dimensions.get('window').height*0.03 }}>
          Search for eats within:
      </Text>

      <View style={buttonContainerStyle.container}>
        <Slider
          animateTransitions={true}
          minimumValue={5}
          maximumValue={100}
          step={5}
          minimumTrackTintColor={'#a2e444'}
          maximumTrackTintColor={'#2e8302'}
          thumbTintColor={'white'}
          value={this.state.distance}
          style={{width: Dimensions.get('window').width*0.70}}
          thumbStyle={buttonContainerStyle.thumb}
          onValueChange={(distance) => this.setState({distance})}
        />
      </View>

      <View style={{
        alignItems: 'center',
        marginTop: Dimensions.get('window').height*0.04}}
      >
        <Text style={{
          marginBottom: Dimensions.get('window').width*0.02,
          marginTop: Dimensions.get('window').width*0.02,
          color: 'black',
          fontSize: Dimensions.get('window').width > 750 ? 18 : 14}}>{this.state.distance}km
        </Text>
      </View>

      <View style={{
        alignItems: 'center',
        marginTop: Dimensions.get('window').height*0.03,
        flexDirection: 'row'
      }}
        >
        <GlobalButton
          onPress={() => this.setState({ selectedOption: "currentLocation" })}
          buttonTitle={"By My Location"}
        />

        <GlobalButton
          onPress={() => this.getPlaceCoordinates(this.state.place)}
          buttonTitle={"Go"}
        />

      </View>

      </Fragment>

      )
      }

      </Overlay>

    }

      </View>

    }

        </View>
    )
  }
}

const buttonContainerStyle = StyleSheet.create({
  content: {
    width:           '100%',
    backgroundColor: 'purple',
    height:           100,
    marginBottom:     20,
    justifyContent:  'center',
    alignItems:      'center',
  },
  container: {
    flex:            1,
    marginLeft:      10,
    marginRight:     10,
    alignItems:      'center',
    justifyContent:  'center',
    width:           Dimensions.get('window').width*0.4
  },
  thumb: {
   width:            Dimensions.get('window').width*0.04,
   height:           Dimensions.get('window').width*0.04,
   borderRadius:     Dimensions.get('window').width*0.02,
   borderColor:      '#2e8302',
   borderWidth:      2,
   shadowColor:      '#2e8302',
   shadowOffset:     {width: 0, height: 1},
   shadowOpacity:    0.5,
   shadowRadius:     1,

 }
});
