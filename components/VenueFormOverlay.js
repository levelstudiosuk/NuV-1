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

export default class VenueFormOverlay extends Component {

  constructor(props) {
  super(props);

  }

  state = {
    };


render() {
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: Dimensions.get('window').height*0.005 }}>

    <Overlay visible={this.props.overlayVisible} onClose={this.props.closeOverlay} closeOnTouchOutside
    animationType="fadeInUp" containerStyle={{backgroundColor: 'rgba(0,0,0,0.8)'}}
    childrenWrapperStyle={{backgroundColor: 'white', borderRadius: 15}}
    animationDuration={500}>
    {
      (hideModal, overlayState) => (
        <Fragment>
        <Text style={{textAlign: 'center', fontSize: Dimensions.get('window').width > 750 ? 20 : 16, marginBottom: Dimensions.get('window').height*0.02, marginTop: Dimensions.get('window').height*0.03 }}>Are you currently at this venue?</Text>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <GlobalButton onPress={() => this.props.userInVenueStateUpdate(true) } buttonTitle={"Yes"} />
          <GlobalButton onPress={() => this.props.userInVenueStateUpdate(false) } buttonTitle={"No"} />
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
    flexDirection: 'row',
    marginLeft: 10,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width*0.4,
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
