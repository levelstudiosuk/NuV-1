import    React from 'react';
import {  Alert,
          StyleSheet,
          Platform,
          TextInput,
          Image,
          Dimensions,
          Text,
          ScrollView,
          View } from 'react-native';
import {  Constants } from 'expo'
import    BarCodeScanner from '../../components/BarCodeScanner.js';
import    AutoHeightImage from 'react-native-auto-height-image';
import    axios from 'axios';

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

        {this.state.comments.length ? (

          <Comments

          data={data}
          viewingUserName={this.props.active_user}
          initialDisplayCount={10}
          editMinuteLimit={900}
          childrenPerPage={5}
          lastCommentUpdate={this.state.lastCommentUpdate}

          childPropName={'children'}
          isChild={() =>this.isCommentChild(item)}
          keyExtractor={item => item.comment_id}
          usernameExtractor={item => this.extractUsername(item)}
          editTimeExtractor={item => this.extractEditTime(item)}
          createdTimeExtractor={item => this.extractCreatedTime(item)}
          bodyExtractor={item => this.extractBody(item)}
          imageExtractor={item => this.extractImage(item)}
          likeExtractor={item => this.likeExtractor(item)}
          reportedExtractor={item => this.reportedExtractor(item)}
          likesExtractor={item => this.likesExtractor(item)}
          childrenCountExtractor={item => this.extractChildrenCount(item)}
          timestampExtractor={item => item.updated_at}


        /> ) : null}

      </ScrollView>

          </View>
        )
      }
    }

    const commentsStyle = StyleSheet.create({

      globalContainer: {
        alignItems: 'center',
        justifyContent: 'center',
      }
