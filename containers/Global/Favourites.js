import React from 'react';
import { StyleSheet, Platform, TextInput, Image, Dimensions, Text, View } from 'react-native';
import { Constants } from 'expo'
import GlobalButton from '../../components/GlobalButton.js';
import AutoHeightImage from 'react-native-auto-height-image';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import RecipeFavourites from '../Favourites/RecipeFavourites.js';
import MediaItemFavourites from '../Favourites/MediaItemFavourites.js';
import BrandFavourites from '../Favourites/BrandFavourites.js';
import VenueFavourites from '../Favourites/VenueFavourites.js';

const FirstRoute = () => (
  <RecipeFavourites />
);
const SecondRoute = () => (
  <VenueFavourites />
);
const ThirdRoute = () => (
  <BrandFavourites />
);
const FourthRoute = () => (
  <MediaItemFavourites />
);

export default class Favourites extends React.Component {
  static navigationOptions = {
    title: null,
    headerTitle: (
     <AutoHeightImage width={75} style={{position: 'absolute', right: Platform.OS === 'android' ? 0 : -65 }} source={require('../../assets/AppIcons/transparentlogo.png')}/>
 ),
}

    constructor(props) {
    super(props);
    }

    state = {
      index: 0,
      routes: [
        { key: 'first', title: 'Recipes' },
        { key: 'second', title: 'Venues' },
        { key: 'third', title: 'Brands' },
        { key: 'fourth', title: 'Media' },
      ],
    };

  renderTabBar = props => (

    <TabBar
      {...props}
      style={{backgroundColor: '#0dc6b5'}}
      tabStyle={{backgroundColor: '#0dc6b5'}}
      indicatorStyle={{backgroundColor: '#0dc6b5'}}
    />

  )

  render() {
    const {navigate} = this.props.navigation;

    return (
      <TabView
        navigationState={this.state}
        renderScene={SceneMap({
          first: FirstRoute,
          second: SecondRoute,
          third: ThirdRoute,
          fourth: FourthRoute,
        })}
        renderTabBar={this.renderTabBar}
        onIndexChange={index => this.setState({ index })}
        initialLayout={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height }}
      />
    );
  }
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
});
