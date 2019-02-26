import   React,
       { Component } from 'react'
import { Button } from 'react-native-elements';
import { StyleSheet,
         View,
         TouchableHighlight,
         Image,
         Dimensions } from 'react-native';

export default class FaveButton extends Component {

  render() {
    return (

      <TouchableHighlight
        style={faveButtonStyle.content}
        onPress={this.props.handleButtonClick}
        underlayColor="white"
        >
          <Image
            source={require('../assets/NavBarIcons/Green/lightstar.png')}
            style={{height:25, width:25, marginRight:20}}
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
