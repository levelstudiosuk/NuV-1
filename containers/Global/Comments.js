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
import    GlobalButton from '../../components/GlobalButton.js';
import    AutoHeightImage from 'react-native-auto-height-image';
import    axios from 'axios';
import    moment from 'moment';
import    LikeButton from '../../components/LikeButton.js';

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
     commentBody: ""
   }
   this.scrollIndex = 0
   this.changeCommentBody = this.changeCommentBody.bind(this);

 }

 componentDidMount(){
   this.retrieveComments()

 }

 changeCommentBody(comment){
   this.setState({
     commentBody: comment
   })
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

       self.setState({
         comments: comments
        },
       function(){
         console.log("Finished getting comments from API");
        }
     )
     })
   }

   getRequestBody(){
     switch(this.props.item_type){
       case("media"):
          return {"body": this.state.commentBody, "medium_id": `${this.props.item_id}` }
       case("brands"):
          return {"body": this.state.commentBody, "brand_id": `${this.props.item_id}` }
       case("recipes"):
          return {"body": this.state.commentBody, "recipe_id": `${this.props.item_id}` }
       case("venues"):
          return {"body": this.state.commentBody, "venue_id": `${this.props.item_id}` }
     }
   }

   postComment(){

     var self = this;
     var token = this.props.token;
     var endpoint = `http://nuv-api.herokuapp.com/${this.props.item_type}/${this.props.item_id}/comments`
     var requestBody = this.getRequestBody()

     axios.post(endpoint, requestBody,

       { headers: { Authorization: `${token}` }})

     .then(function(response){

       self.setState({
         postedComment: true,
         commentBody: "",
         postingComment: false
       },
       function(){
         // Retrieve comments from the API once more so that the newly added comment is included in the list
         self.retrieveComments()
       }
     )
     })
   }

   deleteComment(comment){
     const {navigate} = this.props.navigation;

     var self = this;
     var token = this.props.navigation.getParam('token', 'NO-ID');
     var comment = comment;
     console.log("Comment: ", comment);

     axios.delete(`http://nuv-api.herokuapp.com/comments/${comment.id}`,

   { headers: { Authorization: `${token}` }})

   .then(function(response){


     self.setState({
       deletingComment: false,
     }, function(){
       Alert.alert(
            "You deleted that comment"
           )
    // Retrieve comments from the API once more so that the deleted comment is not included in the list
      self.retrieveComments()
     })
    }
   )
   .catch(function(error){
    console.log("Error: ", error);
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
       <Text style={commentsStyle.commentPosterName} onPress={() => this.retrieveUploaderProfile(item, navigation)}>
        {item.profile.name}
       </Text>
       </View>

       <View key={i+2} style={{paddingLeft: 5, paddingRight: 5, marginBottom: 10, textAlign: 'center'}}>
       <Text>{item.body}</Text>
       </View>

       <View>
       <Text style={{textAlign: 'center', fontSize: Dimensions.get('window').width > 750 ? 18 : 14, color: '#a2e444', marginBottom: 3}}>
        {moment(new Date(item.created_at), 'MMMM Do YYYY, h:mm:ss a').fromNow()}
       </Text>
       </View>

       <View
         style={{
           flex: 1,
           flexDirection: 'row'}}>

           {
             this.props.navigation.getParam('admin', 'NO-ID') === true || this.props.navigation.getParam('id', 'NO-ID') === item.profile.id ? (
           <View key={i+18}>
           <TouchableHighlight
           onPress={() => this.deleteComment(item)}
           style={{justifyContent: 'center', alignItems: 'center', marginRight: Dimensions.get('window').width*0.05, height: 25, width: 25}}
           underlayColor={'#F3F2F2'}
           key={i+22}>
           <Image key={i+2}
             source={require('../../assets/AppIcons/trash.png')}
             style={{width: 17, height: 17}}/>
           </TouchableHighlight>
           </View>
         ) : null
       }

               <LikeButton
               navigation={this.props.navigation}
               itemAlreadyLiked={item.already_liked ? true : false}
               commentSection={true}
               handleButtonClick={() => console.log("Hi")}
               />
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
            showsVerticalScrollIndicator={false}
            >

            <View style={{alignItems: 'center', marginTop: 10}}>

            { this.props.navigation.getParam('guest', 'NO-ID') != true ? (

            <TextInput
              style={{borderWidth: 2, borderBottomColor: 'grey', borderTopColor: 'grey', borderRightColor: 'grey', borderLeftColor: 'grey', width: Dimensions.get('window').width*0.8, height: Dimensions.get('window').height*0.07, marginTop: Dimensions.get('window').height*0.02, marginBottom: Dimensions.get('window').height*0.02, borderColor: 'white', borderWidth: 1, textAlign: 'center', fontWeight: 'normal', fontSize: 15}}
              onChangeText={(commentBody) => {this.changeCommentBody(commentBody)}}
              value={this.state.commentBody} placeholder='Add a public comment...' placeholderTextColor='black'
              underlineColorAndroid='transparent'
            />

          ) : null

        }

            {this.state.commentBody != "" && this.props.navigation.getParam('guest', 'NO-ID') != true ? (

              <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <GlobalButton
              onPress={() => this.state.postingComment != true ? this.changeCommentBody("") : null}
              buttonTitle={"Cancel"}
              />
              <GlobalButton
              onPress={() => this.state.postingComment != true ? this.setState({ postingComment: true },
              function() {this.postComment()}) : null}
              buttonTitle={this.state.postingComment != true ? "Publish" : "Publishing..."}
              />
              </View>

            ) : null
          }
          </View>

        {this.state.comments.length > 0 ? (


          <View style={commentsStyle.commentsContainer}>
          <Text style={commentsStyle.commentsSectionHeading}>
          Comments ({this.state.comments.length})
          </Text>

          {this.renderPostComments()}
          </View>


           ) :

           <View style={commentsStyle.commentsContainer}>
           <Text style={commentsStyle.commentsSectionHeading}>
           Comments ({this.state.comments.length})
           </Text>
           </View>

         }

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
        marginTop: Dimensions.get('window').height*0.015,
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
        borderRadius: Dimensions.get('window').height*0.02,
        width: Dimensions.get('window').width*0.74
      },
      commentText: {
        fontSize: Dimensions.get('window').width > 750 ? 18 : 14
      },
      commentContentContainer: {
        flexDirection: 'row',
      },

    })
