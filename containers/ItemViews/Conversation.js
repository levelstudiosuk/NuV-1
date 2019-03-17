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
import    GlobalButton from '../../components/GlobalButton.js';


export default class Conversation extends React.Component {
  static navigationOptions = {
    title: null,
    headerTitle: (
     <AutoHeightImage width={75} style={{position: 'absolute', right: Platform.OS === 'android' ? 0 : -65 }} source={require('../../assets/greenlogo.png')}/>
   ),
 }

  constructor(props) {
    super(props);

    this.state = {
      messageBody: ""
      };


    this.changeMessageBody = this.changeMessageBody.bind(this);
    this.createSocket = this.createSocket.bind(this);


    }

  componentDidMount(){

    this.retrieveMessages()
    this.createSocket()

  }

  createSocket(){
    const cable = ActionCable.createConsumer('https://nuv-api.herokuapp.com/cable')

    this.messages = cable.subscriptions.create({
     channel: 'MessagesChannel',
     conversation: this.props.navigation.getParam('conversation', 'NO-ID').id
   }, {
     connected: () => {},
     received: (data) => {
       console.log("Data received via socket: ", data);
       var newMessage = data.message
       var messages = this.state.messages
       console.log("MESSAGES: ", messages);
       console.log("New message: ", newMessage);
       console.log("After push: ", messages.concat([data.message]));

        this.setState({messages: messages.concat([data.message])})
     }
   })
  }

  postMessage(){

    var self = this;
    var token = this.props.token;
    var endpoint = `http://nuv-api.herokuapp.com/messages`
    var requestBody = {"user_id": this.props.navigation.getParam('current_user_id', 'NO-ID'),
                      "conversation_id": this.props.navigation.getParam('conversation', 'NO-ID').id,
                      "body": this.state.messageBody
                    }

    axios.post(endpoint, requestBody,

      { headers: { Authorization: `${token}` }})

    .then(function(response){

      self.setState({
        messageBody: "",
        postingMessage: false
      },
      function(){
        // Retrieve comments from the API once more so that the newly added comment is included in the list
        console.log("Done");
        }
    )
    })
  }

  changeMessageBody(message){
    this.setState({
      messageBody: message
    })
  }

  retrieveMessages(){
    var self = this;
    var token = this.props.token;
    var endpoint = `http://nuv-api.herokuapp.com/conversations/${this.props.navigation.getParam('conversation', 'NO-ID').id}`;

    axios.get(endpoint,

      { headers: { Authorization: `${token}` }})

    .then(function(response){

      var messages = JSON.parse(response.request['_response']).messages

      self.setState({
        messages: messages
       },
      function(){
        console.log("conversations from API: ", self.state.messages);
       }
    )
    })
  }

  mapMessages(navigation){

    return this.state.messages.map((item, i) =>

    <View key={i+10} style={convoStyle.commentContentContainer}>

    <View style={{marginRight: Dimensions.get('window').width*0.025}}>
     <TouchableHighlight underlayColor={'white'}
       key={i+1}
      >
       <AutoHeightImage
       key={i+2}
        width={50} style={{borderRadius: 25}}
        source={item.user_id === navigation.getParam('conversation', 'NO-ID').sender_id ? {uri: navigation.getParam('conversation', 'NO-ID').sender_avatar} : {uri: navigation.getParam('conversation', 'NO-ID').recipient_avatar}}
        />
     </TouchableHighlight>
     </View>

     <View>
     <Text style={convoStyle.commentPosterName} onPress={() => this.goToMessages(item, navigation)}>
      {item.user_id === navigation.getParam('conversation', 'NO-ID').sender_id ? navigation.getParam('conversation', 'NO-ID').sender_name :  navigation.getParam('conversation', 'NO-ID').recipient_name}
     </Text>
     </View>

     <View key={i} style={convoStyle.commentItem}>
     <View>
     <Text style={convoStyle.commentPosterName} onPress={() => this.goToMessages(item, navigation)}>
      {item.body}
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

          <TextInput
            style={{borderWidth: 2, borderBottomColor: 'grey', borderTopColor: 'grey', borderRightColor: 'grey', borderLeftColor: 'grey', width: Dimensions.get('window').width*0.8, height: Dimensions.get('window').height*0.07, marginTop: Dimensions.get('window').height*0.02, marginBottom: Dimensions.get('window').height*0.02, borderColor: 'white', borderWidth: 1, textAlign: 'center', fontWeight: 'normal', fontSize: 15}}
            onChangeText={(messageBody) => {this.changeMessageBody(messageBody)}}
            value={this.state.messageBody} placeholder='Say something to this user...' placeholderTextColor='black'
            underlineColorAndroid='transparent'
          />

          {this.state.messageBody != "" ? (

            <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <GlobalButton
            onPress={() => this.state.postingMessage != true ? this.changeMessageBody("") : null}
            buttonTitle={"Cancel"}
            />
            <GlobalButton
            onPress={() => this.state.postingMessage != true ? this.setState({ postingMessage: true },
            function() {this.postMessage()}) : null}
            buttonTitle={this.state.postingMessage != true ? "Post" : "Posting..."}
            />
            </View>

          ) : null
        }

          { this.state.messages && this.state.messages.length > 0 ? (

          <View style={convoStyle.titleContainer}>
            {this.mapMessages(this.props.navigation)}
          </View>

        ) :

        <View style={convoStyle.titleContainer}>
          <Text style={convoStyle.title}>
            This is the start of your conversation with this user.
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
      title: {
        textAlign: 'center',
        fontSize: Dimensions.get('window').width > 750 ? 22 : 17
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
