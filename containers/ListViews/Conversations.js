import    React from 'react';
import {  Alert,
          StyleSheet,
          Platform,
          TextInput,
          Image,
          Dimensions,
          Text,
          TouchableHighlight,
          View } from 'react-native';
import {  Constants } from 'expo'
import    AutoHeightImage from 'react-native-auto-height-image';
import    axios from 'axios';

const cable = ActionCable.createConsumer('https://nuv-api.herokuapp.com/cable')

// ... Other code
cable.subscriptions.create('ChatChannel', {
    received(data) {
        console.log('Received data:', data)
    }
})

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

      var conversations = JSON.parse(response.request['_response']).filter(item => item.sender_id === self.props.navigation.getParam('current_user_id', 'NO-ID') | item.recipient_id === self.props.navigation.getParam('current_user_id', 'NO-ID'))

      self.setState({
        conversations: conversations
       },
      function(){
        console.log("conversations from API: ", self.state.conversations);
       }
    )
    })
  }

  goToMessages(conversation, navigation){
    const {navigate} = navigation;

    navigate('Conversation', {
      recipient:     this.props.navigation.getParam('uploader', 'NO-ID').id,
      token:         this.props.navigation.getParam('token', 'NO-ID'),
      id:            this.props.navigation.getParam('id', 'NO-ID'),
      name:          this.props.navigation.getParam('name', 'NO-ID'),
      bio:           this.props.navigation.getParam('bio', 'NO-ID'),
      location:      this.props.navigation.getParam('location', 'NO-ID'),
      user_is_vegan: this.props.navigation.getParam('user_is_vegan', 'NO-ID'),
      current_user_id: navigation.getParam('current_user_id', 'NO-ID'),
      conversation:   conversation
    })
  }

  mapConversations(navigation){

    return this.state.conversations.map((item, i) =>

    <View key={i+10} style={convoStyle.commentContentContainer}>

    <View style={{marginRight: Dimensions.get('window').width*0.025}}>
     <TouchableHighlight underlayColor={'white'}
       key={i+1}
       onPress={() => this.setState({loadingProfile: true}, function(){ this.goToMessages(item, navigation)})}>
       <AutoHeightImage
       key={i+2}
        width={50} style={{borderRadius: 25}}
        source={item.sender_id === navigation.getParam('current_user_id', 'NO-ID') ? {uri: item.recipient_avatar} : {uri: item.sender_avatar}}
        />
     </TouchableHighlight>
     </View>

     <View key={i} style={convoStyle.commentItem}>
     <View>
     <Text style={convoStyle.commentPosterName} onPress={() => this.goToMessages(item, navigation)}>
      {item.sender_id === navigation.getParam('current_user_id', 'NO-ID') ? item.recipient_name : item.sender_name}
     </Text>
     </View>
     </View>
     </View>

   )

  }

    render() {
      const {navigate} = this.props.navigation;
        return (
          <View style={convoStyle.globalContainer}>

          <Text style={convoStyle.bigTitle}>
            Your Conversations
          </Text>

          { this.state.conversations && this.state.conversations.length > 0 ? (

          <View style={convoStyle.titleContainer}>
            {this.mapConversations(this.props.navigation)}
          </View>

        ) :

        <View style={convoStyle.titleContainer}>
          <Text style={convoStyle.title}>
            You do not have any conversations yet. Add them by visiting profiles.
          </Text>
        </View>

      }



          </View>
        )
      }
    }

    const convoStyle = StyleSheet.create({

      globalContainer: {
        alignItems: 'center',
        justifyContent: 'center',
      },
      titleContainer: {
        alignItems: 'center',
        marginTop: Dimensions.get('window').height*0.03
      },
      bigTitle: {
        textAlign: 'center',
        fontSize: Dimensions.get('window').width > 750 ? 24 : 18
      },
      title: {
        textAlign: 'center',
        fontSize: Dimensions.get('window').width > 750 ? 18 : 14
      },

      commentPosterName: {
      fontSize: Dimensions.get('window').width > 750 ? 22 : 19,
      textAlign: 'center',
      color: '#a2e444',
      marginTop: Dimensions.get('window').height*0.0025,
      marginBottom: 10
      },
      commentItem: {
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: '#F3F2F2',
        borderRadius: Dimensions.get('window').height*0.02,
        width: Dimensions.get('window').width*0.71
      },
      commentContentContainer: {
        flexDirection: 'row',
      },

    });
