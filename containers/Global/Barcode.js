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

          <View style={barcodeStyle.titleContainer}>
            <Text style={barcodeStyle.title}>
              Scan barcode with camera
            </Text>
          </View>

            <BarCodeScanner />

          </View>
        )
      }
    }

    const barcodeStyle = StyleSheet.create({

      globalContainer: {
        alignItems: 'center',
        justifyContent: 'center',
      },
      titleContainer: {
        alignItems: 'center',
        marginTop: Dimensions.get('window').height*0.03
      },
      title: {
        textAlign: 'center',
        fontSize: Dimensions.get('window').width > 750 ? 22 : 17
      },

    });
