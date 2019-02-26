import   React,
       { Component } from 'react'
import { Button } from 'react-native-elements';
import { StyleSheet,
         View,
         TouchableHighlight,
         Image,
         Dimensions } from 'react-native';

export default class AddItemButton extends Component {

  render() {
    return (

      <TouchableHighlight
        style={addItemButtonStyle.content}
        onPress={this.props.onPress}
        underlayColor="white">
        {
          <Image
            source={require('../assets/AppIcons/lightgreenplus.png')}
            style={{height: !this.props.height ? 25 : this.props.height, width:!this.props.width ? 25 : this.props.width, marginLeft: this.props.noMargin != true ? 20 : 0, marginRight: this.props.noMargin != true ? 20 : 0}}
          />
        }
      </TouchableHighlight>

    )
  }
}

const addItemButtonStyle = StyleSheet.create({
  content: {
  width:          50,
  height:         50,
  justifyContent: 'center',
  alignItems:     'center',
  },
});
