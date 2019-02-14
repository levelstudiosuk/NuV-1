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

export default class Favourites extends React.Component {
  static navigationOptions = {
    title: null,
    headerTitle: (
     <AutoHeightImage width={75} style={{position: 'absolute', right: Platform.OS === 'android' ? 0 : -65 }} source={require('../../assets/greenlogo.png')}/>
 ),
}

    constructor(props) {
    super(props);
    }

    state = {
      index: 0,
      routes: [
        { key: 'first',   title: 'Recipes' },
        { key: 'second',  title: 'Venues' },
        { key: 'third',   title: 'Brands' },
        { key: 'fourth',  title: 'Media' },
      ],
    };

  renderTabBar = props => (

    <TabBar
      {...props}
      style          = {{backgroundColor: '#a2e444'}}
      tabStyle       = {{backgroundColor: '#2e8302'}}
      indicatorStyle = {{backgroundColor: '#a2e444'}}
    />

  )

  render() {
    const {navigate} = this.props.navigation;

    const FirstRoute = () => (
      <RecipeFavourites navigation={this.props.navigation} />
    );
    const SecondRoute = () => (
      <VenueFavourites navigation={this.props.navigation} />
    );
    const ThirdRoute = () => (
      <BrandFavourites navigation={this.props.navigation} />
    );
    const FourthRoute = () => (
      <MediaItemFavourites navigation={this.props.navigation} />
    );

    return (
      <TabView
        navigationState={this.state}
        renderScene={SceneMap({
          first:  FirstRoute,
          second: SecondRoute,
          third:  ThirdRoute,
          fourth: FourthRoute,
        })}
        renderTabBar  ={this.renderTabBar}
        onIndexChange ={index => this.setState({ index })}
        initialLayout ={{
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height
            }}
      />
    );
  }
}

const styles = StyleSheet.create({
  scene: {
  flex: 1,
  },
});
