import  React,
      { Component } from 'react';
import {Share,
        Text,
        TouchableOpacity,
        Image,
        Dimensions} from 'react-native';


const shareOptions = {
  title:    'Title',
  message:  'Message to share',
  url:      'www.example.com',
  subject:  'Subject'
  // NB documentation specifies either "message" or "url" fields is required
};

export default class ShareExample extends React.Component {

  onSharePress = () => Share.share(shareOptions);

  render(){
    return(
      <TouchableOpacity onPress={this.onSharePress} >
        <Image
          source={require('../assets/AppIcons/share.png')}
          style={{
            height:Dimensions.get('window').width*0.1, width:Dimensions.get('window').width*0.1,
            marginLeft: 10,
            marginTop: 15}}
        />
      </TouchableOpacity>
    );
  }
}
