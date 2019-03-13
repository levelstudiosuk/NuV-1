import React, { Component, Fragment } from 'react'
import { Button }    from 'react-native-elements';
import { View,
         Dimensions,
         StyleSheet, Text } from 'react-native';
import GradientButton from './GradientButton.js';
import GlobalButton from './GlobalButton.js';
import Overlay from 'react-native-modal-overlay'

export default class GuestRegistrationOffer extends Component {

returnButtonTitle(){
  return this.props.buttonTitle
}

render() {
  return (
    <View style={{  alignItems: 'center', marginTop: Dimensions.get('window').height*0.025 }}>

    <Overlay visible={this.props.overlayVisible} onClose={this.props.closeOverlay} closeOnTouchOutside
    animationType="fadeInUp" containerStyle={{backgroundColor: 'rgba(0,0,0,0.8)'}}
    childrenWrapperStyle={{backgroundColor: 'white', borderRadius: 15}}
    animationDuration={500}>
    {
      (hideModal, overlayState) => (
        <Fragment>
        <Text style={{fontSize: Dimensions.get('window').width < 750 ? 17 : 21, marginBottom: Dimensions.get('window').height*0.03, marginTop: Dimensions.get('window').height*0.03 }}>If you want to access this feature you will need to register and create a NüV account.</Text>

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <GlobalButton onPress={() => this.props.handleLogOut()} buttonTitle={"Register"} />
          <GlobalButton onPress={() => this.props.closeOverlay()} buttonTitle={"No Thanks"} />
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
});
