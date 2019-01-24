import React, { Component } from 'react'
import { Button } from 'react-native-elements';
import { View } from 'react-native';


export default class Button extends Component {

  render() {
    return (

      <View style={buttonContainerStyle.content}>

              <Button
                onPress={this.props.onPress}
                textStyle={{fontSize: 25, color: 'black'}}
                title=`${this.props.buttonTitle}`
                titleStyle={{  }}
                buttonStyle={{
                  backgroundColor: "pink",
                  width: 175,
                  height: 55,
                  borderRadius: 20
                }}
                containerStyle={{ marginTop: 20 }}
              />


      </View>

    )
  }
}

const buttonContainerStyle = StyleSheet.create({
  content: {
    width: '100%',
    backgroundColor: 'transparent',
    height: 100,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
