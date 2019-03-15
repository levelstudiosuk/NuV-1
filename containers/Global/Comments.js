import    React from 'react';
import {  Alert,
          StyleSheet,
          Platform,
          TextInput,
          Image,
          Dimensions,
          Text,
          ScrollView,
          TouchableHighlight,
          View } from 'react-native';
import {  Constants } from 'expo'
import    BarCodeScanner from '../../components/BarCodeScanner.js';
import    AutoHeightImage from 'react-native-auto-height-image';
import    axios from 'axios';
import    moment from 'moment';

export default class Comments extends React.Component {
  static navigationOptions = {
    title: null,
    headerTitle: (
     <AutoHeightImage width={75} style={{position: 'absolute', right: Platform.OS === 'android' ? 0 : -65 }} source={require('../../assets/greenlogo.png')}/>
   ),
 }

 constructor(props) {
   super(props);
    this.state = {
     comments: [],
     loadingComments: true,
     lastCommentUpdate: null,
     login: null,
   }
   this.scrollIndex = 0

 }

 componentDidMount(){
   this.retrieveComments()

 }

 retrieveUploaderProfile(contributor, navigation){

   const {navigate} = navigation;
   var navigation = navigation;

   var id = contributor.profile.id;
   var token = this.props.navigation.getParam('token', 'NO-ID');
   var self = this;

   axios.get(`http://nuv-api.herokuapp.com/profiles/${id}`,

{ headers: { Authorization: `${token}` }})

.then(function(response){

  var uploaderProfile = JSON.parse(response.request['_response'])

  self.setState({ loadingProfile: false},
    function(){
  navigate('UserView',
  {notMyProfile: true,
     uploader: uploaderProfile,
     guest: this.props.navigation.getParam('guest', 'NO-ID'),
     token: self.props.navigation.getParam('token', 'NO-ID'),
     avatar:        self.props.navigation.getParam('avatar', 'NO-ID'),
     id:            self.props.navigation.getParam('id', 'NO-ID'),
     name:          self.props.navigation.getParam('name', 'NO-ID'),
     bio:           self.props.navigation.getParam('bio', 'NO-ID'),
     location:      self.props.navigation.getParam('location', 'NO-ID'),
     user_is_vegan: self.props.navigation.getParam('user_is_vegan', 'NO-ID')
   })
 }
 )
}).catch(function(error){
  console.log("Error: ", error);
})
 }

   retrieveComments(){
     var self = this;
     var token = this.props.token;
     var endpoint = `http://nuv-api.herokuapp.com/${this.props.item_type}/${this.props.item_id}/comments`

     axios.get(endpoint,

       { headers: { Authorization: `${token}` }})

     .then(function(response){

       var comments = JSON.parse(response.request['_response'])
       console.log("Comments: ", comments);

       self.setState({
         comments: comments
        },
       function(){
         console.log("Comments: ", self.state.comments);
       }
     )
     })
   }

   postComment(){
     var self = this;
     var token = this.props.token;
     var endpoint = `http://nuv-api.herokuapp.com/${this.props.item_type}/${this.props.item_id}/comments`

     axios.post(endpoint, {"body":"Another comment right here", "brand_id": `${this.props.item_id}` },

       { headers: { Authorization: `${token}` }})

     .then(function(response){

       var comments = JSON.parse(response.request['_response'])

       self.setState({
         postedComment: true
       },
       function(){
         console.log("Comments: ", self.state.comments);
       }
     )
     })
   }

   renderPostComments(){
       const {navigate} = this.props.navigation;
       var navigation = this.props.navigation;

       return this.state.comments.map((item, i) =>

       <View key={i} style={{marginTop: Dimensions.get('window').height*0.02}}>

      <View key={i+10} style={commentsStyle.commentContentContainer}>

      <View style={{marginRight: Dimensions.get('window').width*0.025}}>
       <TouchableHighlight underlayColor={'white'}
         key={i+1}
         onPress={() => this.setState({loadingProfile: true}, function(){ this.retrieveUploaderProfile(item, navigation)})}>
         <AutoHeightImage key={i+2} source={{uri: item.profile.avatar.url}} width={50} style={{borderRadius: 25}}/>
       </TouchableHighlight>
       </View>

       <View key={i} style={commentsStyle.commentItem}>
       <View>
       <Text style={commentsStyle.commentPosterName}>
        {item.profile.name}
       </Text>
       </View>

       <View key={i+2} style={{marginBottom: 10, textAlign: 'center'}}>
       <Text>{item.body}</Text>
       </View>

       <View>
       <Text style={{textAlign: 'center', fontSize: Dimensions.get('window').width > 750 ? 18 : 14, color: '#a2e444', marginBottom: 3}}>
        {moment(new Date(item.created_at), 'MMMM Do YYYY, h:mm:ss a').fromNow()}
       </Text>
       </View>
       </View>

       </View>

       </View>
     )
   }

    render() {

      const data = this.state.comments
        return (
          <View style={commentsStyle.globalContainer}>

          <ScrollView
            contentContainerStyle={commentsStyle.globalContainer}
            onScroll={(event) => {
                this.scrollIndex = event.nativeEvent.contentOffset.y
            }}
            ref={'scrollView'}>

        {this.state.comments.length > 0 ? (


          <View style={commentsStyle.commentsContainer}>
          <Text style={commentsStyle.commentsSectionHeading}>
          Comments ({this.state.comments.length})
          </Text>

          {this.renderPostComments()}
          </View>


           ) : null}

      </ScrollView>

          </View>
        )
      }
    }

    const commentsStyle = StyleSheet.create({

      globalContainer: {
        alignItems: 'center',
        justifyContent: 'center',
      },
      commentsContainer: {
        marginTop: Dimensions.get('window').height*0.025,
        alignItems: 'center',
      },
      commentsSectionHeading: {
      fontSize: Dimensions.get('window').width > 750 ? 27 : 25,
      textAlign: 'center',
      color: '#a2e444',
      marginTop: Dimensions.get('window').height*0.01
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
        borderRadius: Dimensions.get('window').height*0.005,
        width: Dimensions.get('window').width*0.74
      },
      commentText: {
        fontSize: Dimensions.get('window').width > 750 ? 18 : 14
      },
      commentContentContainer: {
        flex: 1,
        flexDirection: 'row',
      },

    })
