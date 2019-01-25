import React from 'react';
import { StyleSheet, Platform, TouchableHighlight, ScrollView, Dimensions, Button, Text, View } from 'react-native';
import { Constants } from 'expo'
import * as TimeGreeting from '../../helper_functions/TimeGreeting.js';
import NavBar from '../../components/NavBar.js';
import AutoHeightImage from 'react-native-auto-height-image';
import GlobalButton from '../../components/GlobalButton.js';
import StickyHeaderFooterScrollView from 'react-native-sticky-header-footer-scroll-view';

export default class UserView extends React.Component {
  static navigationOptions = {
    title: null,
    headerTitle: (
      <AutoHeightImage width={75} style={{position: 'absolute', right: Platform.OS === 'android' ? 0 : -65 }} source={require('../../assets/AppIcons/transparentlogo.png')}/>
 ),
}

  render() {
    const {navigate} = this.props.navigation;

    return (
      <View style={userViewStyle.container}>

      <StickyHeaderFooterScrollView
      makeScrollable={true}
      renderStickyHeader={() => ( <View></View> )}
      renderStickyFooter={() => (
        <View style={{alignItems: 'center'}}>
          <NavBar navigation={this.props.navigation} />
        </View>
      )}
    >
    <View style={userViewStyle.buttonContainer}>
    <TouchableHighlight underlayColor="white" onPress={() => navigate('UserView')} style={{width: Dimensions.get('window').width*0.5}}>
    <AutoHeightImage width={Dimensions.get('window').width*0.5} style={{borderRadius: Dimensions.get('window').width*0.25 }} source={require('../../assets/wil.jpg')}/>
    </TouchableHighlight>
    </View>

    <View style={userViewStyle.greetingContainer}>
      <Text style={{fontSize: 20, color: 'black'}}>{TimeGreeting.getTimeBasedGreeting("Wil Cornish")} </Text>
    </View>

    <View style={userViewStyle.iconsContainer}>

    <GlobalButton marginLeft={Dimensions.get('window').width*0.12} onPress={() => navigate('RecipeForm')} buttonTitle={"Recipes"} />
    <GlobalButton marginRight={Dimensions.get('window').width*0.12} onPress={() => navigate('VenueForm')} buttonTitle={"Eateries"} />

    </View>

    <View style={userViewStyle.iconsContainer}>

    <GlobalButton marginLeft={Dimensions.get('window').width*0.12} onPress={() => navigate('BrandForm')} buttonTitle={"Brands"} />
    <GlobalButton marginRight={Dimensions.get('window').width*0.12} onPress={() => navigate('MediaForm')} buttonTitle={"Media"} />

    </View>
    </StickyHeaderFooterScrollView>

      </View>
    );
  }
}

const userViewStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconsContainer: {
    width: Dimensions.get('window').width,
    marginLeft: 0,
    marginTop: Dimensions.get('window').height*0.035,
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttonContainer: {
    marginBottom: Dimensions.get('window').height*0.01,
    marginTop: Dimensions.get('window').height*0.05,
    alignItems: 'center',
  },
  greetingContainer: {
    marginBottom: Dimensions.get('window').height*0.01,
    marginTop: Dimensions.get('window').height*0.02,
    alignItems: 'center',
    backgroundColor: 'white',
    height: Dimensions.get('window').height*0.03
      }
});
