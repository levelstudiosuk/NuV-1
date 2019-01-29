import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import Home from './containers/Global/Home.js';
import Register from './containers/Forms/RegisterUser.js';
import SignIn from './containers/Global/SignIn.js';
import Landing from './containers/Global/Landing.js';
import Map from './containers/Global/Map.js';
import BrandForm from './containers/Forms/BrandForm.js';
import RecipeForm from './containers/Forms/RecipeForm.js';
import UserView from './containers/ItemViews/UserView.js';
import BrandView from './containers/ItemViews/BrandView.js';
import MediaItemView from './containers/ItemViews/MediaItemView.js';
import MediaForm from './containers/Forms/MediaForm.js';
import VenueForm from './containers/Forms/VenueForm.js';
import EditUser from './containers/Forms/EditUser.js';
import RecipeList from './containers/ListViews/RecipeList.js';
import VenueList from './containers/ListViews/VenueList.js';
import AddItemButton from './components/AddItemButton.js';
import FaveButton from './components/FaveButton.js';
import NavBar from './components/NavBar.js';
import MediaList from './containers/ListViews/MediaList.js';
import BrandList from './containers/ListViews/BrandList.js';
import { Constants } from 'expo'

const navigationVariable = createStackNavigator({
  Landing: {screen: Landing},
  Register: {screen: Register},
  SignIn: {screen: SignIn},
  Home: {screen: Home},
  UserView: {screen: UserView},
  NavBar: {screen: NavBar},
  BrandForm: {screen: BrandForm},
  RecipeForm: {screen: RecipeForm},
  MediaForm: {screen: MediaForm},
  VenueForm: {screen: VenueForm},
  Map: {screen: Map},
  EditUser: {screen: EditUser},
  RecipeList: {screen: RecipeList},
  MediaList: {screen: MediaList},
  BrandList: {screen: BrandList},
  VenueList: {screen: VenueList},
  AddItemButton: {screen: AddItemButton},
  FaveButton: {screen: FaveButton},
  BrandView: {screen: BrandView},
  MediaItemView: {screen: MediaItemView}

});

const App = createAppContainer(navigationVariable)

export default App;
