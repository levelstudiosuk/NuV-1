import React, { Component, Fragment } from 'react'
import { Button }    from 'react-native-elements';
import { View,
         Dimensions,
         StyleSheet, Text } from 'react-native';
import GradientButton from './GradientButton.js';
import GlobalButton from './GlobalButton.js';
import Overlay from 'react-native-modal-overlay'
import Slider from 'react-native-slider';
import MapSettingsTwoWayToggle from './MapSettingsTwoWayToggle.js';

export default class MapSettingsOverlay extends Component {

  constructor(props) {
  super(props);

    this.changeToggleSelection = this.changeToggleSelection.bind(this);
  }

  state = {
      distance: 10,
      seeOnlyVegan: this.props.navigation.getParam('user_is_vegan', 'NO-ID') === "vegan" ? true : false
    };


    getActiveToggleIndex(){
      return this.props.navigation.getParam('user_is_vegan', 'NO-ID') === "vegan" ? 0 : 1
    }

    changeToggleSelection(selection){

      this.setState({
        seeOnlyVegan: selection
      })

    }

render() {
  return (
    <View style={{  alignItems: 'center', justifyContent: 'center', marginTop: Dimensions.get('window').height*0.025 }}>

    <Overlay visible={this.props.overlayVisible} onClose={this.props.closeOverlay} closeOnTouchOutside
    animationType="fadeInUp" containerStyle={{backgroundColor: 'rgba(0,0,0,0.8)'}}
    childrenWrapperStyle={{backgroundColor: 'white', borderRadius: 15}}
    animationDuration={500}>
    {
      (hideModal, overlayState) => (
        <Fragment>
        <Text style={{textAlign: 'center', fontSize: Dimensions.get('window').width > 750 ? 20 : 16, marginBottom: Dimensions.get('window').height*0.07, marginTop: Dimensions.get('window').height*0.03 }}>Eatery search radius</Text>

          <View style={buttonContainerStyle.container}>
          <Slider
          animateTransitions={true}
          minimumValue={5}
          maximumValue={25}
          step={5}
          minimumTrackTintColor={'#0DC6B5'}
          maximumTrackTintColor={'#92FE9D'}
          thumbTintColor={'grey'}
          value={this.state.distance}
          style={{width: Dimensions.get('window').width*0.70}}
          thumbStyle={buttonContainerStyle.thumb}
          onValueChange={(distance) => this.setState({distance})} />
          </View>

          <View style={{alignItems: 'center', marginTop: Dimensions.get('window').height*0.04}}>
          <Text style={{marginBottom: Dimensions.get('window').width*0.135, marginTop: Dimensions.get('window').width*0.02, color: 'black', fontSize: Dimensions.get('window').width > 750 ? 18 : 14}}>{this.state.distance}km</Text>
          </View>

          <MapSettingsTwoWayToggle changeToggleSelection={this.changeToggleSelection} activeIndex={this.getActiveToggleIndex()}  />

          <View style={{alignItems: 'center', marginTop: Dimensions.get('window').height*0.1}}>
          <GlobalButton onPress={() => this.props.launchMap(this.props.navigation, this.state.distance)} buttonTitle={"Go"} />
          </View>

        </Fragment>
      )
    }
  </Overlay>

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
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width*0.4
  },
  thumb: {
   width: Dimensions.get('window').width*0.05,
   height: Dimensions.get('window').width*0.05,
   shadowColor: '#92FE9D',
   shadowOffset: {width: 0, height: 1},
   shadowOpacity: 0.5,
   shadowRadius: 1,

 }
});
