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
        style={{width:  this.props.commentSection ? 25 : 50, height: this.props.commentSection ? 25 : 50, justifyContent: 'center', alignItems: 'center'}}
        onPress={this.props.handleButtonClick}
        underlayColor={this.props.commentSection ? '#F3F2F2' : "white"}
        >
          <Image
            source={this.props.itemAlreadyLiked === true ? require('../assets/like.png') : require('../assets/like_grey.png')}
            style={{height:this.props.commentSection ? 17 : 25, width: this.props.commentSection ? 17 : 25}}
          />
      </TouchableHighlight>
    )
  }
}
