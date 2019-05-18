import React, { Component } from 'react';
import ScannedCodePopUp from './ScannedCodePopUp.js';
import { Text, Dimensions, View, StyleSheet, Alert } from 'react-native';
import { Constants, BarCodeScanner, Permissions } from 'expo';
import axios from 'axios';
import key from '../barcode_key.js';
import BarCodeInfoOverlay from './BarCodeInfoOverlay';

export default class App extends Component {
  state = {
    hasCameraPermission: null,
  };

  constructor(props) {
    super(props);
      this._handleBarCodeRead = this._handleBarCodeRead.bind(this);
      this.fetchProductDetails = this.fetchProductDetails.bind(this);
      this.toggleOverlay = this.toggleOverlay.bind(this);
      this.closeOverlay = this.closeOverlay.bind(this);
    }

  componentDidMount() {
    this._requestCameraPermission();
  }

  _requestCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === 'granted',
    });
  };

  _handleBarCodeRead = data => {
    console.log("Data: ", data);
    this.setState({
      barcode: data.data.slice(1, data.length)
    },
    function(){
    this.fetchProductDetails()
  }
  )
  };

  isProductVegan(){

    // Alert.alert(
    //   `${this.state.productDetails.title}`,
    //   `Vegetarian: ${this.state.productDetails.vegetarian}; vegan: ${this.state.productDetails.vegan}`
    // );

    this.toggleOverlay()

  }

  fetchProductDetails(){
    console.log("State barcode: ", this.state.barcode);
    var self = this;
    var api_key = key;
    var barcode_url = `http://supermarketownbrandguide.co.uk/api/newfeed.php?json=barcode&q=${this.state.barcode}&apikey=${api_key}`
    axios.get(barcode_url)
    .then(function(response) {
      var responseData = JSON.parse(response.request['_response']);
      console.log("Response data: ", responseData);
      if (responseData.error){
      Alert.alert(
        "Product not recognised. Please try again"
      );
    }
      else {
      var productDetails =
      {
      title: responseData.title ? responseData.title: "Name not specified",
      vegetarian: responseData.properties.vegetarian ? responseData.properties.vegetarian : "Not specified",
      vegan: responseData.properties.vegan ? responseData.properties.vegan : "Not specified",
      eco: responseData.properties.eco ? responseData.properties.eco : null,
      fairtrade: responseData.properties.fairtrade ? responseData.properties.fairtrade : null,
      organic: responseData.properties.organic ? responseData.properties.organic : null,
      healthNotes: responseData.properties.healthnotes ? responseData.properties.healthnotes : null
    }
      self.setState({

        productDetails: productDetails

      }, function(){
        console.log("Product details: ", self.state.productDetails);
        self.isProductVegan()
      })
    }
    }).catch(function(error){
      console.log("Error: ", error);
    })
  }

  toggleOverlay(){
        this.setState({
          overlayVisible: true
        })
  }

  closeOverlay(){
    this.setState({
      overlayVisible: false
    })
  }


  render() {
    return (
      <View style={barCodeStyles.container}>
      {
        this.state.productDetails ? (
      <ScannedCodePopUp productDetails={this.state.productDetails} overlayVisible={this.state.overlayVisible} closeOverlay={this.closeOverlay} />
    ) : null
  }

        {this.state.hasCameraPermission === null ?
          <Text>Requesting for camera permission</Text> :
          this.state.hasCameraPermission === false ?
            <Text>Camera permission is not granted</Text> :
            <BarCodeScanner
              onBarCodeRead={this._handleBarCodeRead}
              style={{ height: 200, width: 200 }}
            />
        }
      </View>
    );
  }
}

const barCodeStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight + Dimensions.get('window').height*0.17,
    backgroundColor: 'white',
  }
});
