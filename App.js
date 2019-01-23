import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import Home from './containers/Home.js';
import Register from './containers/Register.js';
import { Constants } from 'expo'

const navigationVariable = createStackNavigator({
  Home: {screen: Home},
  Register: {screen: Register},
});

const App = createAppContainer(navigationVariable)

export default App;
