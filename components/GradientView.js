import React, { Component }  from 'react'
import { AppRegistry, StyleSheet, Dimensions, View } from 'react-native'

import TimerMixin from 'react-timer-mixin'
import LinearGradient from 'expo'
import Chroma from 'chroma-js'
var reactMixin = require('react-mixin');

var screenWidth = Dimensions.get('window').width
var screenHeight = Dimensions.get('window').height

const TOP_COLORS = ['#EF2A2A', '#EF6A2A', '#1BD170', '#22D2E6', '#2A3BEF', '#EF2AD2', '#EF2AD2']
const BOTTOM_COLORS = ['#EF6A2A', '#EFD82A', '#61E822', '#26F084', '#2ADCEF', '#2A3BEF', '#EF2A2A']
const GRADIENT_COLOR_LENGTH = 700
const TOP_COLORS_SPECTRUM = Chroma.scale(TOP_COLORS).colors(GRADIENT_COLOR_LENGTH)
const BOTTOM_COLORS_SPECTRUM = Chroma.scale(BOTTOM_COLORS).colors(GRADIENT_COLOR_LENGTH)
const INTERVAL = 2

export default class GradientView extends Component{

  constructor(props) {
  super(props);

}

  state = {
    topIndex: 0,
    bottomIndex: 0,
    colorTop: TOP_COLORS_SPECTRUM[0],
    colorBottom: BOTTOM_COLORS_SPECTRUM[0]
    };



  componentDidMount () {
    this.setInterval(() => {
      let { topIndex, bottomIndex } = this.state

      topIndex++
      if (topIndex === TOP_COLORS_SPECTRUM.length) {
        topIndex = 0
      }

      bottomIndex++
      if (bottomIndex === BOTTOM_COLORS_SPECTRUM.length) {
        bottomIndex = 0
      }

      this.setState({
        topIndex: topIndex,
        bottomIndex: bottomIndex,
        colorTop: TOP_COLORS_SPECTRUM[topIndex],
        colorBottom: BOTTOM_COLORS_SPECTRUM[bottomIndex]
      })
    }, INTERVAL)
  }

  render () {
    return (
      <LinearGradient colors={[this.state.colorTop, this.state.colorBottom]}>
        <View style={styles.translucentContainer} />
      </LinearGradient>
    )
  }
}

reactMixin(GradientView.prototype, TimerMixin);

const styles = StyleSheet.create({
  translucentContainer: {
    width: screenWidth,
    height: screenHeight,
    backgroundColor: 'white',
    opacity: 0.3
  }
})
