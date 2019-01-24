import React from 'react'
import { View, Text, Platform, Image, Dimensions } from 'react-native'

import MultiSwitch from "react-native-multi-switch";
import { Icon } from "native-base"

import _ from 'lodash';

export default class VWayToggle extends React.Component {

    render() {
        return (
          <View style={{flex: 1, flexDirection: 'column', justifyContent: "space-between", alignItems: 'center'}}>

            <View style={{width: Dimensions.get('window').width*0.3, justifyContent: 'center', alignItems: 'center'}}>
              <MultiSwitch choiceSize={Dimensions.get('window').width*0.2}
                            activeItemStyle={[{color: 'white'}, {color: 'black'}, {color: 'white'}, ]}
                            layout={{vertical: 0, horizontal: -1}}
                            containerStyles={_.times(3, () => ({
                              backgroundColor: 'white',
                              borderRadius: 40,
                              borderWidth: 1,
                              borderColor: "lightgrey",
                              justifyContent: 'space-between',
                            }))}
                            active={1}>
                  <Text>Vegan</Text>
                  <Text>Vegetarian</Text>
                  <Text>Visiting</Text>

              </MultiSwitch>
            </View>
          </View>
        )
    }
}
