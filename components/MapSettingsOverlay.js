import React, { Component, Fragment } from 'react'
import { Button }    from 'react-native-elements';
import { View,
         Dimensions,
         StyleSheet, Text } from 'react-native';
import GradientButton from './GradientButton.js';
import GlobalButton from './GlobalButton.js';
import Overlay from 'react-native-modal-overlay'
import Slider from 'react-native-slider';

export default class MapSettingsOverlay extends Component {

  constructor(props) {
  super(props);

  }

  state = {
      distance: 10
    };

render() {
  console.log("dist", this.state.distance);
  return (
    <View style={{  alignItems: 'center', marginTop: Dimensions.get('window').height*0.025 }}>

    <Overlay visible={this.props.overlayVisible} onClose={this.props.closeOverlay} closeOnTouchOutside
    animationType="fadeInUp" containerStyle={{backgroundColor: 'rgba(0,0,0,0.8)'}}
    childrenWrapperStyle={{backgroundColor: 'white', borderRadius: 15}}
    animationDuration={500}>
    {
      (hideModal, overlayState) => (
        <Fragment>
        <Text style={{textAlign: 'center', fontSize: Dimensions.get('window').width > 750 ? 20 : 16, marginBottom: Dimensions.get('window').height*0.07, marginTop: Dimensions.get('window').height*0.03 }}>Search radius</Text>

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
          <Text style={{marginTop: Dimensions.get('window').width*0.02, color: 'black', fontSize: Dimensions.get('window').width > 750 ? 18 : 14}}>{this.state.distance}km</Text>
          </View>


          <View style={{alignItems: 'center', marginTop: Dimensions.get('window').height*0.05}}>
          <GlobalButton onPress={() => this.props.launchMap(this.props.navigation)} buttonTitle={"Go"} />
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
