import   React,
       { Component } from 'react'
import { View,
         Dimensions,
         StyleSheet } from 'react-native';
import GradientButton from './GradientButton.js';
import { Button } from 'react-native-material-ui';

export default class GlobalButton extends Component {

returnButtonTitle(){
  return this.props.buttonTitle
}

render() {
  return (
    <View style={{
      marginLeft: this.props.marginLeft ? this.props.marginLeft : 0,
      marginRight: this.props.marginRight ? this.props.marginRight : 0,
        }}>

      <Button
        onPress={this.props.onPress}
        text={this.props.buttonTitle}
        style={{fontSize: Dimensions.get('window').width < 750 ? 15 : 19, color: 'white', fontWeight: 'normal'}}
        raised={true}
      />
    </View>
    )
  }
}

const buttonContainerStyle = StyleSheet.create({
  content: {
    width:           '100%',
    backgroundColor: 'purple',
    height:           100,
    marginBottom:     20,
    justifyContent:  'center',
    alignItems:      'center',
  },
});
