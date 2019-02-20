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
            style={{height:50, width:50, marginRight: this.props.noMargin != true ? Dimensions.get('window').width*0.01 : 0}}
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
