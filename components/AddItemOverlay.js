
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

export default class AddItemOverlay extends Component {

  constructor(props) {
  super(props);

  }

  state = {
    };


render() {
  const {navigate} = this.props.navigation;

  return (
    <View style={{  alignItems: 'center', justifyContent: 'center', marginTop: Dimensions.get('window').height*0.001 }}>

    <Overlay visible={this.props.overlayVisible} onClose={this.props.closeOverlay} closeOnTouchOutside
    animationType="fadeInUp" containerStyle={{backgroundColor: 'rgba(0,0,0,0.8)'}}
    childrenWrapperStyle={{backgroundColor: 'white', borderRadius: 15}}
    animationDuration={500}>
    {
      (hideModal, overlayState) => (
        <Fragment>

        <Text style={{
          textAlign: 'center',
          fontSize: Dimensions.get('window').width > 750 ? 22 : 16,
          fontWeight: 'bold',
          color: '#696969',
          marginTop: Dimensions.get('window').height*0.03,
          marginBottom: Dimensions.get('window').height*0.015}}
        >
          What kind of item would you like to add to NüV?
        </Text>

        <View style={addItemOverlayStyle.iconsContainer}>

          <GlobalButton
            marginLeft={Dimensions.get('window').width*0.12}
            onPress={() => this.props.openRecipeForm() }
              buttonTitle={"Recipe"}
            />
          <GlobalButton
            marginRight={Dimensions.get('window').width*0.12}
            onPress={() => this.props.openVenueForm() }
            buttonTitle={"Eatery"}
            />
          </View>

        <View style={addItemOverlayStyle.iconsContainer2}>

        <GlobalButton
          marginLeft={Dimensions.get('window').width*0.12}
          onPress={() => this.props.openBrandForm() }
          buttonTitle={"Brand"}
        />
        <GlobalButton
          marginRight={Dimensions.get('window').width*0.12}
          onPress={() => this.props.openMediaForm() }
          buttonTitle={"Media Item"}
        />
      </View>


        </Fragment>
      )
    }
  </Overlay>

        </View>
    )
  }
}

const addItemOverlayStyle = StyleSheet.create({
  iconsContainer: {
    width: Dimensions.get('window').width,
    marginLeft: 0,
    marginTop: Dimensions.get('window').height*0.025,
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  iconsContainer2: {
    width: Dimensions.get('window').width,
    marginLeft: 0,
    marginTop: Dimensions.get('window').height*0.025,
    marginBottom: Dimensions.get('window').height*0.025,
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
