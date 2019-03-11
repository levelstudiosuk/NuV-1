import    React from 'react';
import {  Alert,
          StyleSheet,
          Platform,
          TextInput,
          Image,
          Dimensions,
          Text,
          View } from 'react-native';
import {  Constants } from 'expo'
import    BarCodeScanner from '../../components/BarCodeScanner.js';
import    AutoHeightImage from 'react-native-auto-height-image';
import    axios from 'axios';

export default class Barcode extends React.Component {
  static navigationOptions = {
    title: null,
    headerTitle: (
     <AutoHeightImage width={75} style={{position: 'absolute', right: Platform.OS === 'android' ? 0 : -65 }} source={require('../../assets/greenlogo.png')}/>
   ),
 }

  constructor(props) {
    super(props);

    }

    state = {

      };

    render() {
      const {navigate} = this.props.navigation;
        return (
          <View style={barcodeStyle.globalContainer}>

            <BarCodeScanner />

          </View>
        )
      }
    }

    const barcodeStyle = StyleSheet.create({

      globalContainer: {
        alignItems: 'center',
        justifyContent: 'center',
      }

    });
