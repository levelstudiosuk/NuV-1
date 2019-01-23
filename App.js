import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import Home from './containers/Global/Home.js';
import Register from './containers/Forms/RegisterUser.js';
import SignIn from './containers/Global/SignIn.js';
import Landing from './containers/Global/Landing.js';
import MyProfile from './containers/ItemViews/UserView.js';
import { Constants } from 'expo'

const navigationVariable = createStackNavigator({
  Landing: {screen: Landing},
  Register: {screen: Register},
  SignIn: {screen: SignIn},
  Home: {screen: Home},
  MyProfile: {screen: MyProfile},
});

const App = createAppContainer(navigationVariable)

export default App;
