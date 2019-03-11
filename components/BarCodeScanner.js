import React, { Component } from 'react';
import { Text, Dimensions, View, StyleSheet, Alert } from 'react-native';
import { Constants, BarCodeScanner, Permissions } from 'expo';

export default class App extends Component {
  state = {
    hasCameraPermission: null
  };

  constructor(props) {
    super(props);
      this._handleBarCodeRead = this._handleBarCodeRead.bind(this);
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
    console.log("Product/BarCode Data:", data);
    Alert.alert(
      'Results to go here...',
    );
    this.setState({
      barcode: data.data.slice(1, data.length)
    },
    function(){
    console.log("State data: ", this.state.barcode);
  }
  )
  };

  isProductVegan(){

  }

  fetchProductDetails(){
    
  }


  render() {
    return (
      <View style={barCodeStyles.container}>
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
    paddingTop: Constants.statusBarHeight + (Dimensions.get('window').height/2) - 100,
    backgroundColor: 'white',
  }
});
