import    React from 'react';
import {  Alert,
          StyleSheet,
          Platform,
          TextInput,
          Image,
          Dimensions,
          TouchableOpacity,
          Text,
          View } from 'react-native';
import {  Constants } from 'expo'
import    BarCodeScanner from '../../components/BarCodeScanner.js';
import    AutoHeightImage from 'react-native-auto-height-image';
import    axios from 'axios';
import { Icon } from 'react-native-material-ui';
import BarCodeInfoOverlay from '../../components/BarCodeInfoOverlay';

export default class Barcode extends React.Component {
  static navigationOptions = {
    title: null,
    headerTitle: (
     <AutoHeightImage width={75} style={{position: 'absolute', right: Platform.OS === 'android' ? 0 : -65 }} source={require('../../assets/greenlogo.png')}/>
   ),
 }

  constructor(props) {
    super(props);

    this.openInfoOverlay = this.openInfoOverlay.bind(this);
    this.closeInfoOverlay = this.openInfoOverlay.bind(this);
    }

    state = {
      infoOverlayVisible: false,
      };

      openInfoOverlay(){
            this.setState({
              infoOverlayVisible: true
            })
      }

      closeInfoOverlay(){
        this.setState({
          infoOverlayVisible: false
        })
      }

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

            <BarCodeScanner
             />

             <BarCodeInfoOverlay
               closeInfoOverlay={this.closeInfoOverlay}
               openInfoOverlay={this.openInfoOverlay}
               overlayVisible={this.state.infoOverlayVisible}
             />

            <View style={barcodeStyle.iconContainer}>
              <TouchableOpacity onPress={() => this.openInfoOverlay()}>
               <Icon name="info-outline"/>
             </TouchableOpacity>
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
