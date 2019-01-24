import React, { Component } from 'react'
import { Button } from 'react-native-elements';
import { View, Dimensions, StyleSheet } from 'react-native';


export default class GlobalButton extends Component {

  returnButtonTitle(){
    return this.props.buttonTitle
  }

  render() {
    return (



              <Button
                onPress={this.props.onPress}
                textStyle={{fontSize: 19, color: 'black'}}
                title={this.props.buttonTitle}
                titleStyle={{  }}
                buttonStyle={{
                  backgroundColor: "#78ffd6",
                  marginLeft: this.props.marginLeft ? this.props.marginLeft : 0,
                  marginRight: this.props.marginRight ? this.props.marginRight : 0,
                  width: Dimensions.get('window').width*0.3,
                  height: 55,
                  borderRadius: 10,

                }}
                containerStyle={{ marginTop: 20 }}
              />




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
