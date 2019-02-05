import React from 'react';
import { StyleSheet, Platform, TouchableHighlight, ScrollView, Dimensions, Button, Text, View } from 'react-native';
import { Constants } from 'expo'
import * as TimeGreeting from '../../helper_functions/TimeGreeting.js';
import NavBar from '../../components/NavBar.js';
import AutoHeightImage from 'react-native-auto-height-image';
import GlobalButton from '../../components/GlobalButton.js';
import StickyHeaderFooterScrollView from 'react-native-sticky-header-footer-scroll-view';
import { BallIndicator, BarIndicator, DotIndicator, MaterialIndicator, PacmanIndicator, PulseIndicator, SkypeIndicator, UIActivityIndicator, WaveIndicator } from 'react-native-indicators';

export default class Home extends React.Component {
  static navigationOptions = {
    title: null,
    headerTitle: (
      <AutoHeightImage width={75} style={{position: 'absolute', right: Platform.OS === 'android' ? 0 : -65 }} source={require('../../assets/AppIcons/transparentlogo.png')}/>
 ),
}

  constructor(props) {
  super(props);

  this.setAvatarAsLoaded = this.setAvatarAsLoaded.bind(this);

  }

  state = {
      avatarLoading: true
    };

  profileAvatarUri(){
    return this.state.imageSource;
  }

  setAvatarAsLoaded(){
    this.setState({
      avatarLoading: false
    })
  }

  render() {
    const {navigate} = this.props.navigation;

    return (
      <View style={homeStyle.container}>

      { Platform.OS === 'ios' ? (

      <StickyHeaderFooterScrollView
      makeScrollable={true}
      renderStickyHeader={() => ( <View></View> )}
      renderStickyFooter={() => (
        <TouchableHighlight style={{alignItems: 'center'}}>
          <NavBar navigation={this.props.navigation} />
        </TouchableHighlight>
      )}
    >

    <View style={homeStyle.buttonContainer}>
    <TouchableHighlight underlayColor="white" onPress={() => navigate('UserView', {avatar: this.props.navigation.getParam('avatar', 'NO-ID'), token: this.props.navigation.getParam('token', 'NO-ID'), id: this.props.navigation.getParam('id', 'NO-ID'), name: this.props.navigation.getParam('name', 'NO-ID'), bio: this.props.navigation.getParam('bio', 'NO-ID'), location: this.props.navigation.getParam('location', 'NO-ID'), user_is_vegan: this.props.navigation.getParam('user_is_vegan', 'NO-ID')})} style={{width: Dimensions.get('window').width*0.5}}>
    <AutoHeightImage onLoad={this.setAvatarAsLoaded} width={Dimensions.get('window').width*0.5} style={{borderRadius: Dimensions.get('window').width*0.01}} source={{uri: this.props.navigation.getParam('avatar', 'NO-ID')}}/>
    </TouchableHighlight>
    {
      this.state.avatarLoading === false ? (
        null
  ) :
    < BallIndicator size={50} color={'black'}/>

  }

    {
      this.state.avatarLoading === false ? (
        null
    ) :
    <Text style={{marginTop: Dimensions.get('window').height*0.05, textAlign: 'center', fontSize: Dimensions.get('window').width > 750 ? 22 : 16}}>Loading profile picture...</Text>

    }

    </View>

    <View style={homeStyle.greetingContainer}>
      <Text style={{fontSize: 20, color: 'black'}}>{TimeGreeting.getTimeBasedGreeting(this.props.navigation.getParam('name', 'NO-ID'))} </Text>
    </View>

    <View style={homeStyle.iconsContainer}>

    <GlobalButton marginLeft={Dimensions.get('window').width*0.12}
    onPress={() => navigate('RecipeList', {avatar: this.props.navigation.getParam('avatar', 'NO-ID'), token: this.props.navigation.getParam('token', 'NO-ID'), id: this.props.navigation.getParam('id', 'NO-ID'), name: this.props.navigation.getParam('name', 'NO-ID'), bio: this.props.navigation.getParam('bio', 'NO-ID'), location: this.props.navigation.getParam('location', 'NO-ID'), user_is_vegan: this.props.navigation.getParam('user_is_vegan', 'NO-ID')})} buttonTitle={"Recipes"} />
    <GlobalButton marginRight={Dimensions.get('window').width*0.12} onPress={() => navigate('VenueList', {avatar: this.props.navigation.getParam('avatar', 'NO-ID'), token: this.props.navigation.getParam('token', 'NO-ID'), id: this.props.navigation.getParam('id', 'NO-ID'), name: this.props.navigation.getParam('name', 'NO-ID'), bio: this.props.navigation.getParam('bio', 'NO-ID'), location: this.props.navigation.getParam('location', 'NO-ID'), user_is_vegan: this.props.navigation.getParam('user_is_vegan', 'NO-ID')})} buttonTitle={"Eateries"} />

    </View>

    <View style={homeStyle.iconsContainer}>

    <GlobalButton marginLeft={Dimensions.get('window').width*0.12} onPress={() => navigate('BrandList', {avatar: this.props.navigation.getParam('avatar', 'NO-ID'), token: this.props.navigation.getParam('token', 'NO-ID'), id: this.props.navigation.getParam('id', 'NO-ID'), name: this.props.navigation.getParam('name', 'NO-ID'), bio: this.props.navigation.getParam('bio', 'NO-ID'), location: this.props.navigation.getParam('location', 'NO-ID'), user_is_vegan: this.props.navigation.getParam('user_is_vegan', 'NO-ID')})} buttonTitle={"Shopping"} />
    <GlobalButton marginRight={Dimensions.get('window').width*0.12} onPress={() => navigate('MediaList', {avatar: this.props.navigation.getParam('avatar', 'NO-ID'), token: this.props.navigation.getParam('token', 'NO-ID'), id: this.props.navigation.getParam('id', 'NO-ID'), name: this.props.navigation.getParam('name', 'NO-ID'), bio: this.props.navigation.getParam('bio', 'NO-ID'), location: this.props.navigation.getParam('location', 'NO-ID'), user_is_vegan: this.props.navigation.getParam('user_is_vegan', 'NO-ID')})} buttonTitle={"News"} />

    </View>
    </StickyHeaderFooterScrollView>

  ) :

  <View style={homeStyle.container}>

  <ScrollView>

  <View style={homeStyle.buttonContainer}>
  <TouchableHighlight underlayColor="white" onPress={() => navigate('UserView', {token: this.props.navigation.getParam('token', 'NO-ID'), id: this.props.navigation.getParam('id', 'NO-ID'), name: this.props.navigation.getParam('name', 'NO-ID'), bio: this.props.navigation.getParam('bio', 'NO-ID'), location: this.props.navigation.getParam('location', 'NO-ID'), user_is_vegan: this.props.navigation.getParam('user_is_vegan', 'NO-ID')})} style={{width: Dimensions.get('window').width*0.5}}>
  <AutoHeightImage width={Dimensions.get('window').width*0.5} style={{borderRadius: Dimensions.get('window').width*0.25 }} source={require('../../assets/vegan_woman.jpeg')}/>
  </TouchableHighlight>
  </View>

  <View style={homeStyle.greetingContainer}>
    <Text style={{fontSize: 20, color: 'black'}}>{TimeGreeting.getTimeBasedGreeting(JSON.stringify(this.props.navigation.getParam('name', 'NO-ID')))} </Text>
  </View>

  <View style={homeStyle.iconsContainer}>

  <GlobalButton marginLeft={Dimensions.get('window').width*0.12} onPress={() => navigate('RecipeList', {avatar: this.props.navigation.getParam('avatar', 'NO-ID'), token: this.props.navigation.getParam('token', 'NO-ID'), id: this.props.navigation.getParam('id', 'NO-ID'), name: this.props.navigation.getParam('name', 'NO-ID'), bio: this.props.navigation.getParam('bio', 'NO-ID'), location: this.props.navigation.getParam('location', 'NO-ID'), user_is_vegan: this.props.navigation.getParam('user_is_vegan', 'NO-ID')})} buttonTitle={"Recipes"} />
  <GlobalButton marginRight={Dimensions.get('window').width*0.12} onPress={() => navigate('VenueList', {avatar: this.props.navigation.getParam('avatar', 'NO-ID'), token: this.props.navigation.getParam('token', 'NO-ID'), id: this.props.navigation.getParam('id', 'NO-ID'), name: this.props.navigation.getParam('name', 'NO-ID'), bio: this.props.navigation.getParam('bio', 'NO-ID'), location: this.props.navigation.getParam('location', 'NO-ID'), user_is_vegan: this.props.navigation.getParam('user_is_vegan', 'NO-ID')})} buttonTitle={"Eateries"} />

  </View>

  <View style={homeStyle.iconsContainer2}>

  <GlobalButton marginLeft={Dimensions.get('window').width*0.12} onPress={() => navigate('BrandList', {avatar: this.props.navigation.getParam('avatar', 'NO-ID'), token: this.props.navigation.getParam('token', 'NO-ID'), id: this.props.navigation.getParam('id', 'NO-ID'), name: this.props.navigation.getParam('name', 'NO-ID'), bio: this.props.navigation.getParam('bio', 'NO-ID'), location: this.props.navigation.getParam('location', 'NO-ID'), user_is_vegan: this.props.navigation.getParam('user_is_vegan', 'NO-ID')})} buttonTitle={"Shopping"} />
  <GlobalButton marginRight={Dimensions.get('window').width*0.12} onPress={() => navigate('MediaList', {avatar: this.props.navigation.getParam('avatar', 'NO-ID'), token: this.props.navigation.getParam('token', 'NO-ID'), id: this.props.navigation.getParam('id', 'NO-ID'), name: this.props.navigation.getParam('name', 'NO-ID'), bio: this.props.navigation.getParam('bio', 'NO-ID'), location: this.props.navigation.getParam('location', 'NO-ID'), user_is_vegan: this.props.navigation.getParam('user_is_vegan', 'NO-ID')})} buttonTitle={"News"} />

  </View>

  </ScrollView>

  <NavBar navigation={this.props.navigation} attributes={{token: this.props.navigation.getParam('token', 'NO-ID'), id: this.props.navigation.getParam('id', 'NO-ID'), name: this.props.navigation.getParam('name', 'NO-ID'), bio: this.props.navigation.getParam('bio', 'NO-ID'), location: this.props.navigation.getParam('location', 'NO-ID'), user_is_vegan: this.props.navigation.getParam('user_is_vegan', 'NO-ID')}} />
  </View>

}

      </View>
    );
  }
}

const homeStyle = StyleSheet.create({
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
  iconsContainer2: {
    width: Dimensions.get('window').width,
    marginLeft: 0,
    marginTop: Dimensions.get('window').height*0.035,
    marginBottom: Dimensions.get('window').height*0.14,
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
