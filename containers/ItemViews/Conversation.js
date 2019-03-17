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
import    AutoHeightImage from 'react-native-auto-height-image';
import    axios from 'axios';

export default class Conversation extends React.Component {
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

  componentDidMount(){



  }

  retrieveMessages(){
    var self = this;
    var token = this.props.token;
    var endpoint = `http://nuv-api.herokuapp.com/conversations/${this.props.navigation('conversation', 'NO-ID').id}`;

    axios.get(endpoint,

      { headers: { Authorization: `${token}` }})

    .then(function(response){

      var messages = JSON.parse(response.request['_response']).messages

      self.setState({
        messages: messages
       },
      function(){
        console.log("conversations from API: ", self.state.conversations);
       }
    )
    })
  }

  mapMessages(){

  }

    render() {
      const {navigate} = this.props.navigation;
        return (
          <View style={barcodeStyle.globalContainer}>

          { this.state.messages && this.state.messages.length > 0 ? (

          <View style={barcodeStyle.titleContainer}>
            {this.mapMessages()}
          </View>

        ) :

        <View style={barcodeStyle.titleContainer}>
          <Text style={barcodeStyle.title}>
            This is the start of your conversation with this user.
          </Text>
        </View>

      }



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
