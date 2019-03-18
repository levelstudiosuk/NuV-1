import    React from 'react';
import {  Alert,
          StyleSheet,
          Platform,
          TextInput,
          Image,
          Dimensions,
          Text,
          FlatList,
          ScrollView,
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

  getPlaceholderText(){
    return `Say something to ${this.props.navigation.getParam('current_user_id', 'NO-ID') === this.props.navigation.getParam('conversation', 'NO-ID').sender_id ? this.props.navigation.getParam('conversation', 'NO-ID').sender_name :  this.props.navigation.getParam('conversation', 'NO-ID').recipient_name}...`
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

     <View key={i} style={convoStyle.commentItem}>
     <Text style={convoStyle.commentPosterName} onPress={() => console.log("hi")}>
      {item.body}
     </Text>
     </View>
     </View>

   )

  }

  _renderItem = ({item}) => (
    <View key={item.id+10} style={convoStyle.commentContentContainer}>

    <View key={item.id+13} style={{marginRight: Dimensions.get('window').width*0.025}}>
     <TouchableHighlight underlayColor={'white'}
       key={item.id+1}
      >
       <AutoHeightImage
       key={item.id+2}
        width={30} style={{borderRadius: 15}}
        source={item.user_id === this.props.navigation.getParam('conversation', 'NO-ID').sender_id ? {uri: this.props.navigation.getParam('conversation', 'NO-ID').sender_avatar} : {uri: this.props.navigation.getParam('conversation', 'NO-ID').recipient_avatar}}
        />
     </TouchableHighlight>
     </View>

     <View key={item.id+3} style={convoStyle.commentItem}>
     <View key={item.id+5}>
     <Text style={convoStyle.commentPosterName} onPress={() => console.log("Clicked text")}>
      {item.body}
     </Text>
     </View>
     </View>
     </View>
  );

  _keyExtractor = (item, index) => item.id;

    render() {
      const {navigate} = this.props.navigation;
        return (
          <View style={convoStyle.globalContainer}>

          { this.state.messages && this.state.messages.length > 0 ? (

          <View style={convoStyle.titleContainer}>
          <Text style={convoStyle.title}>
            Messages with {this.props.navigation.getParam('current_user_id', 'NO-ID') === this.props.navigation.getParam('conversation', 'NO-ID').sender_id ? this.props.navigation.getParam('conversation', 'NO-ID').sender_name :  this.props.navigation.getParam('conversation', 'NO-ID').recipient_name}
          </Text>
            <FlatList
              data={this.state.messages}
              keyExtractor={this._keyExtractor}
              renderItem={this._renderItem}
              showsVerticalScrollIndicator={false}
            />
          </View>

        ) :

        <View style={convoStyle.titleContainer}>
          <Text style={convoStyle.title}>
            This is the start of your conversation with this user.
          </Text>
        </View>

      }

      <TextInput
        style={{marginTop: Dimensions.get('window').height*0.02, borderWidth: 2, borderBottomColor: 'grey',
        borderTopColor: 'grey', borderRightColor: 'grey', borderLeftColor: 'grey',
        width: Dimensions.get('window').width*0.8, height: Dimensions.get('window').height*0.07,
        marginTop: Dimensions.get('window').height*0.02, marginBottom: Dimensions.get('window').height*0.01,
        borderColor: 'white', borderWidth: 1, textAlign: 'center', fontWeight: 'normal', fontSize: 15}}

        onChangeText={(messageBody) => {this.changeMessageBody(messageBody)}}
        value={this.state.messageBody} placeholder={this.getPlaceholderText()} placeholderTextColor='black'
        underlineColorAndroid='transparent'
      />

      {this.state.messageBody != "" ? (

        <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
        <View style={{backgroundColor: '#F3F2F2', width: Dimensions.get('window').width*0.06, borderRadius: 5}}>
        <Text
        style={{marginLeft: Dimensions.get('window').width*0.05, color: '#a2e444'}}
        onPress={() => this.state.postingMessage != true ? this.changeMessageBody("") : null}
        >Cancel
        </Text>
        </View>
        <View style={{backgroundColor: '#F3F2F2', width: Dimensions.get('window').width*0.06, borderRadius: 5}}>
        <Text
        style={{marginRight: Dimensions.get('window').width*0.05, color: '#a2e444'}}
        onPress={() => this.state.postingMessage != true ? this.setState({ postingMessage: true },
        function() {this.postMessage()}) : null}
        >{this.state.postingMessage != true ? "Send" : "Sending..."}
        </Text>
        </View>
        </View>

      ) : null
    }

          </View>
        )
      }
    }

    const convoStyle = StyleSheet.create({

      globalContainer: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'column'
      },
      titleContainer: {
        alignItems: 'center',
        marginTop: Dimensions.get('window').height*0.01,
        height: Dimensions.get('window').height*0.75,
      },
      title: {
        textAlign: 'center',
        fontSize: Dimensions.get('window').width > 750 ? 22 : 17
      },

      commentPosterName: {
      fontSize: Dimensions.get('window').width > 750 ? 17 : 14,
      textAlign: 'center',
      color: '#a2e444',
      marginTop: Dimensions.get('window').height*0.0025,
      marginBottom: 10
      },
      commentItem: {
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: '#F3F2F2',
        paddingTop: 5,
        paddingBottom: 5,
        marginTop: 5,
        marginBottom: 5,
        borderRadius: Dimensions.get('window').height*0.02,
        width: Dimensions.get('window').width*0.7
      },
      commentContentContainer: {
        flexDirection: 'row',
      },

    });
