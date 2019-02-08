import React from 'react';
import { StyleSheet, ScrollView, Platform, TouchableHighlight, Image, TextInput, Dimensions, Button, Text, View } from 'react-native';
import { Constants } from 'expo'
import GlobalButton from '../../components/GlobalButton.js';
import AddItemButton from '../../components/AddItemButton.js';
import FaveButton from '../../components/FaveButton.js';
import SmallTwoWayToggle from '../../components/SmallTwoWayToggle.js';
import AutoHeightImage from 'react-native-auto-height-image';
import Expo, { ImagePicker } from 'expo';
import {Permissions} from 'expo'
import axios from 'axios';
import moment from 'moment';
import * as TimeGreeting from '../../helper_functions/TimeGreeting.js';

export default class MediaList extends React.Component {
  static navigationOptions = {
    title: null,
    headerTitle:(
     <AutoHeightImage width={75} style={{position: 'absolute', right: Platform.OS === 'android' ? 0 : -65 }} source={require('../../assets/AppIcons/transparentlogo.png')}/>
 ),
}

    constructor(props) {
      super(props);
    }

    state = {
      items: [{title: 'Papa John’s Vegan Pizza Launching 28.1.19', description: 'After PETA’s successful online petition, which gained over 29,000 signatures requesting a vegan option, Papa John’s have announced that they are adding Sheese to its nationwide menu.'}]
    }

    componentDidMount(){
      var token = this.props.navigation.getParam('token', 'NO-ID');
      var self = this;

      axios.get('http://nuv-api.herokuapp.com/media',

   { headers: { Authorization: `${token}` }})

   .then(function(response){

     var mediaItems = JSON.parse(response.request['_response'])

     self.setState({
       mediaItems:  self.props.navigation.getParam('user', 'NO-ID') === true ? mediaItems.filter(mediaItem => mediaItem.user_id === self.props.navigation.getParam('id', 'NO-ID')) : mediaItems
     },
     function(){
       console.log("Media items", self.state.mediaItems);
     }
   )
 }).catch(function(error){
   console.log("Error: ", error);
 })
    }

    returnMessage(){
      if (this.props.navigation.getParam('user', 'NO-ID') === true ){
        return `Here are your media contributions.`
      }
      else {
        return "Here is the news."
      }
    }

    mapMediaItems(){
      const {navigate} = this.props.navigation;

      return this.state.mediaItems.map((item, i) =>

        <View style={mediaListStyle.mediaitem}   key={i}>
        <TouchableHighlight  key={i+6} onPress={() => navigate('MediaItemView', {token: this.props.navigation.getParam('token', 'NO-ID'), id: item.id, title: item.title, description: item.description})}  style={mediaListStyle.mediadescription} style={mediaListStyle.mediaimage}>
          <Image source={require('../../assets/AppIcons/newsdefault.png')} style={{height: 100, width: 100}}/>
        </TouchableHighlight>
            <View  key={i+2} style={mediaListStyle.mediatextcontainer}>
              <View  key={i+1}>
                <Text  key={i+3} onPress={() => navigate('MediaItemView', {token: this.props.navigation.getParam('token', 'NO-ID'), id: item.id, title: item.title, description: item.description})}  style={mediaListStyle.mediadescription}  style={mediaListStyle.mediatitle}>
                {item.title}
                </Text>
              </View>
              <View  key={i+4}>
                <Text  key={i+5} onPress={() => navigate('MediaItemView', {token: this.props.navigation.getParam('token', 'NO-ID'), id: item.id, title: item.title, description: item.description})}  style={mediaListStyle.mediadescription}>
                {item.description}
                </Text>
              </View>
              <View  key={i+7}>
                <Text  key={i+8} onPress={() => navigate('MediaItemView', {token: this.props.navigation.getParam('token', 'NO-ID'), id: item.id, title: item.title, description: item.description})}  style={mediaListStyle.mediadescription}  style={mediaListStyle.mediatitle}>
                {moment(new Date(item.created_at), 'MMMM Do YYYY, h:mm:ss a').calendar()}
                </Text>
              </View>
            </View>
          </View>
      )
    }

    render() {
      const {navigate} = this.props.navigation;
      return (

    <View style={mediaListStyle.container}>

    <ScrollView style={{width: Dimensions.get('window').width*0.95}} showsVerticalScrollIndicator={false}>
    <View style={mediaListStyle.container}>

    <View style={{marginTop: Dimensions.get('window').height*0.02}}>
    </View>

      <View style={{flex: 1, flexDirection: 'row'}}>
        <SmallTwoWayToggle/>
        <AddItemButton navigation={this.props.navigation}
        onPress={() => navigate('MediaForm', {avatar: this.props.navigation.getParam('avatar', 'NO-ID'), token: this.props.navigation.getParam('token', 'NO-ID'), id: this.props.navigation.getParam('id', 'NO-ID'), name: this.props.navigation.getParam('name', 'NO-ID'), bio: this.props.navigation.getParam('bio', 'NO-ID'), location: this.props.navigation.getParam('location', 'NO-ID'), user_is_vegan: this.props.navigation.getParam('user_is_vegan', 'NO-ID')})} />
        {/*<FaveButton navigation={this.props.navigation}/>*/}
      </View>

      <AutoHeightImage
          width={70}
          source={require('../../assets/AppIcons/newspaper.png')}
          style={{marginBottom: Dimensions.get('window').height*0.04, marginTop: 5}}
      />

      <Text style={{fontSize: 18, textAlign: 'center'}}>
          {TimeGreeting.getTimeBasedGreeting(this.props.navigation.getParam('name', 'NO-ID'))}{"\n"} {this.returnMessage()}
      </Text>

      <View style={{marginTop: Dimensions.get('window').height*0.04}}>
      </View>

      {
        this.state.mediaItems && this.state.mediaItems.length > 0 ? (

      this.mapMediaItems()

    ) :   null
  }

  {
    this.state.mediaItems && this.state.mediaItems.length === 0 && this.props.navigation.getParam('user', 'NO-ID') === true ? (

      <Text style={{fontSize: Dimensions.get('window').width > 750 ? 24 : 20, marginBottom: Dimensions.get('window').height*0.02}}> You have not uploaded any media items yet. </Text>


) :   null
}


      <View>
        <GlobalButton
          buttonTitle="Home"
          onPress={() => navigate('Home', {avatar: this.props.navigation.getParam('avatar', 'NO-ID'), token: this.props.navigation.getParam('token', 'NO-ID'), id: this.props.navigation.getParam('id', 'NO-ID'), name: this.props.navigation.getParam('name', 'NO-ID'), bio: this.props.navigation.getParam('bio', 'NO-ID'), location: this.props.navigation.getParam('location', 'NO-ID'), user_is_vegan: this.props.navigation.getParam('user_is_vegan', 'NO-ID')})}/>
      </View>
    </View>
  </ScrollView>

</View>

)

}
}

const mediaListStyle = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitContainer: {
    alignItems: 'center',
    marginTop: Dimensions.get('window').height*0.03,
    marginBottom: Platform.OS === 'ios' ? Dimensions.get('window').height*0.05 : Dimensions.get('window').height*0.05
  },
  header: {
    textAlign: 'center',
    marginTop:  Constants.statusBarHeight+10,
    marginBottom: Dimensions.get('window').height*0.01
  },


  mediaitem: {
    flex: 1,
    flexDirection: 'row',
    paddingBottom: 20,
  },
  mediatextcontainer: {
    flex: 1,
    flexDirection: 'column',
  },
  mediatitle: {
    color: '#0dc6b5',
    margin: 4,
    fontSize: 18,
    fontWeight: 'bold',
  },
  mediadescription: {
    margin: 4,
    fontSize: 15
  }
});
