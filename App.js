import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import Home from './containers/Home.js';
import Register from './containers/Register.js';

const navigationVariable = createStackNavigator({
  Home: {screen: Home},
  Profile: {screen: Register},
});

const App = createAppContainer(navigationVariable)

export default App;
