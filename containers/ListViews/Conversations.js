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

export default class Conversations extends React.Component {
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

    this.retrieveConversations()

  }

  retrieveConversations(){
    var self = this;
    var token = this.props.token;
    var endpoint = "http://nuv-api.herokuapp.com/conversations"

    axios.get(endpoint,

      { headers: { Authorization: `${token}` }})

    .then(function(response){

      var conversations = JSON.parse(response.request['_response'])

      self.setState({
        conversations: conversations
       },
      function(){
        console.log("conversations from API: ", self.state.conversations);
       }
    )
    })
  }

  mapConversations(){

  }

    render() {
      const {navigate} = this.props.navigation;
        return (
          <View style={barcodeStyle.globalContainer}>

          { this.state.conversations.length > 0 ? (

          <View style={barcodeStyle.titleContainer}>
            {this.mapConversations()}
          </View>

        ) :

        <View style={barcodeStyle.titleContainer}>
          <Text style={barcodeStyle.title}>
            You do not have any conversations yet. Add them by visiting profiles.
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
