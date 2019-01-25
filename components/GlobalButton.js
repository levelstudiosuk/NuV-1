import React, { Component } from 'react'
import { Button } from 'react-native-elements';
import { View, Dimensions, StyleSheet } from 'react-native';
import GradientButton from './GradientButton/index.js';


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
              <GradientButton
                onPressAction={this.props.onPress}
                textStyle={{fontSize: 10, color: 'black'}}
                text={this.props.buttonTitle}
                radius={10}
                height={45}
                width={Dimensions.get('window').width*0.3}
                impact='True'
                impactStyle='Light'
                gradientBegin="#0dc6b5"
                gradientEnd="#92FE9D"
                gradientDirection="horizontal"
                containerStyle={{ marginTop: 20 }}
              />
              </View>

    )
  }
}

const buttonContainerStyle = StyleSheet.create({
  content: {
    width: '100%',
    backgroundColor: 'purple',
    height: 100,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
