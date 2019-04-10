import  React,
      { Component } from 'react';
import {Share,
        Text,
        TouchableOpacity,
        Image,
        Dimensions} from 'react-native';


const shareOptions = {
  title:    'Check out the cool content I saw on NüV!',
  message:  'Look what I found on NüV! https://www.level-apps.co.uk',
  url:      'www.level-apps.co.uk',
  subject:  'Check out the cool content I saw on NüV!'
  // NB documentation specifies either "message" or "url" fields is required
};

export default class ShareExample extends React.Component {

  onSharePress = () => Share.share(this.props.shareOptions);

  render(){
    return(
      <TouchableOpacity onPress={this.onSharePress} >
        <Image
          source={require('../assets/AppIcons/sharenew.png')}
          style={{
            height:Dimensions.get('window').width*0.1, width:Dimensions.get('window').width*0.1,
            marginLeft: 10,
            marginTop: 15}}
        />
      </TouchableOpacity>
    );
  }
}
