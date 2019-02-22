import   React,
       { Component } from 'react'
import { Button } from 'react-native-elements';
import { StyleSheet,
         View,
         TouchableHighlight,
         Image,
         Dimensions } from 'react-native';

export default class LikeButton extends Component {

  render() {
    return (

      <TouchableHighlight
        style={faveButtonStyle.content}
        onPress={this.props.handleButtonClick}
        underlayColor="white"
        >
          <Image
            source={this.props.itemAlreadyLiked === true ? require('../assets/like.png') : require('../assets/like_grey.png')}
            style={{height:50, width:50, marginRight:20}}
          />
      </TouchableHighlight>
    )
  }
}

const faveButtonStyle = StyleSheet.create({
  content: {
  width:          50,
  height:         50,
  justifyContent: 'center',
  alignItems:     'center',
  },
});
