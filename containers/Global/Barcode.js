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
import { Icon } from 'react-native-material-ui';

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
              Barcode Scanner
            </Text>
            <Text style={barcodeStyle.infoText}>
              Point your camera at the barcode for product information
            </Text>
          </View>

            <BarCodeScanner />

            <View style={barcodeStyle.iconContainer}>
               <Icon name="info-outline"/>
            </View>

          </View>
        )
      }
    }

    const barcodeStyle = StyleSheet.create({

      globalContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
      titleContainer: {
        alignItems: 'center',
        marginTop: Dimensions.get('window').height*0.03,
      },
      title: {
        textAlign: 'center',
        fontSize: Dimensions.get('window').width > 750 ? 22 : 17,
        paddingLeft: Dimensions.get('window').width*0.03,
        paddingRight: Dimensions.get('window').width*0.03,
        fontWeight: 'bold',
        paddingBottom: Dimensions.get('window').height*0.03,
      },
      infoText: {
        textAlign: 'center',
        fontSize: Dimensions.get('window').width > 750 ? 22 : 17,
        paddingLeft: Dimensions.get('window').width*0.03,
        paddingRight: Dimensions.get('window').width*0.03,
      },
      iconContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: Dimensions.get('window').height*0.03,
      },
    });
