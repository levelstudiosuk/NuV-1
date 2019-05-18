import React, { Component, Fragment } from 'react'
import { Button }    from 'react-native-elements';
import { View,
         Dimensions,
         StyleSheet, Text } from 'react-native';
import GradientButton from './GradientButton.js';
import GlobalButton from './GlobalButton.js';
import Overlay from 'react-native-modal-overlay'
import Slider from 'react-native-slider';
import AutoHeightImage from 'react-native-auto-height-image';

export default class ScannedCodePopUp extends Component {

  constructor(props) {
  super(props);

  }

  state = {
    };

  returnVegetarianStatus(status){
    switch(status) {
  case true:
  return "NüV records indicate that this is vegetarian"

    break;
  case false:
  return "NüV records indicate that this is not vegetarian"
    break;
  case "Not specified":
  return "NüV cannot say if this is vegetarian"
  break;
}
  }

  returnVeganStatus(status){
    switch(status) {
  case true:
  return "NüV records indicate that this is vegan"

    break;
  case false:
    return "NüV records indicate that this is not vegan"
    break;
  case "Not specified":
  return "NüV cannot say if this is vegan"
  break;
  }
}


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
        <Text style={scannedPopUpStyle.productHeading}>{this.props.productDetails.title}</Text>
        { this.props.productDetails.healthNotes ? (
          <Text style={scannedPopUpStyle.productHealthNotes}>{this.props.productDetails.healthNotes.replace('?', '')}</Text>
        ) : null
      }
        <Text style={scannedPopUpStyle.productDetailItem}>{this.returnVeganStatus(this.props.productDetails.vegan)}</Text>
        <Text style={{textAlign: 'center', fontSize: Dimensions.get('window').width > 750 ? 20 : 16, marginBottom: Dimensions.get('window').height*0.02, marginTop: Dimensions.get('window').height*0.03 }}>{this.returnVegetarianStatus(this.props.productDetails.vegetarian)}</Text>
        { this.props.productDetails.eco ? (
        <Text style={scannedPopUpStyle.productDetailItem}>This product is eco</Text>
      ) : null
      }
      { this.props.productDetails.fairtrade ? (
      <Text style={scannedPopUpStyle.productDetailItem}>This is a Fairtrade product</Text>
      ) : null
      }
      { this.props.productDetails.organic ? (
      <Text style={scannedPopUpStyle.productDetailItem}>This product is organic</Text>
      ) : null
      }
        <View style={{alignItems: 'center'}}>

        {  this.props.productDetails.vegan === true ? (
        <AutoHeightImage
          width={Dimensions.get('window').width < 750 ? Dimensions.get('window').width*0.4 : Dimensions.get('window').width*0.3}
          style={scannedPopUpStyle.imageStyle}
          source={require('../assets/badges/Vegan.png')}
        />
      ) :

      null
    }

        {  this.props.productDetails.vegetarian === true && this.props.productDetails.vegan != true ? (
        <AutoHeightImage
          width={Dimensions.get('window').width < 750 ? Dimensions.get('window').width*0.4 : Dimensions.get('window').width*0.3}
          style={scannedPopUpStyle.imageStyle}
          source={require('../assets/badges/Veggie.png')}
        />
      ) :

      null
    }

    {  this.props.productDetails.vegetarian != true && this.props.productDetails.vegan != true ? (
    <AutoHeightImage
      width={Dimensions.get('window').width < 750 ? Dimensions.get('window').width*0.4 : Dimensions.get('window').width*0.3}
      style={scannedPopUpStyle.imageStyle}
      source={require('../assets/badges/warning-sign.png')}
    />
    ) :

    null
    }
        </View>
        </Fragment>
      )
    }
  </Overlay>

        </View>
    )
  }
}

const scannedPopUpStyle = StyleSheet.create({
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
 },
 productHeading: {
   fontWeight: 'bold',
   textAlign: 'center',
   fontSize: Dimensions.get('window').width > 750 ? 20 : 16,
   marginBottom: Dimensions.get('window').height*0.02,
   marginTop: Dimensions.get('window').height*0.03,
 },
 productHealthNotes: {
   color: '#a2e444',
   fontWeight: 'bold',
   textAlign: 'center',
   fontSize: Dimensions.get('window').width > 750 ? 20 : 16,
   marginBottom: Dimensions.get('window').height*0.02,
   marginTop: Dimensions.get('window').height*0.03,
 },
  productDetailItem: {
    textAlign: 'center',
    fontSize: Dimensions.get('window').width > 750 ? 20 : 16,
    marginBottom: Dimensions.get('window').height*0.02,
    marginTop: Dimensions.get('window').height*0.03
  },
  imageStyle: {
    borderWidth: 3,
    marginTop: Dimensions.get('window').height*0.05,
    }
});
