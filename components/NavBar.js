import   React from 'react';
import { StyleSheet,
         TextInput,
         Image,
         TouchableHighlight,
         Dimensions,
         Button,
         Text,
         View } from 'react-native';
import { Constants } from 'expo'

export default class NavBar extends React.Component {
  static navigationOptions = {
    title: 'Enter your NüV registration data below',
    header: null,
  };

  constructor(props) {
  super(props);
  }

  state = {
    };

  render() {

  const {navigate} = this.props.navigation;

  return (
    <View style={navStyle.iconsContainer}>

      {/*
      <TouchableHighlight underlayColor="white"
        onPress={() => navigate('Home', this.props.attributes)}>
          <Image source={require('../assets/NavBarIcons/Green/greenhome.png')} style={{height: Dimensions.get('window').width < 400 ? 28 : 34, marginLeft: Dimensions.get('window').width*0.08, marginRight: Dimensions.get('window').width*0.08, width: Dimensions.get('window').width < 400 ? 28 : 34, marginBottom: 20}}/>
      </TouchableHighlight>
      */}

      <TouchableHighlight underlayColor="white"
      onPress={() => navigate('NuVContributors', {
        guest:         this.props.navigation.getParam('guest', 'NO-ID'),
        current_user_id: this.props.navigation.getParam('user_id', 'NO-ID'),
        settings: true,
        avatar: this.props.navigation.getParam('avatar', 'NO-ID'),
        token: this.props.navigation.getParam('token', 'NO-ID'),
        id: this.props.navigation.getParam('id', 'NO-ID'),
        name: this.props.navigation.getParam('name', 'NO-ID'),
        bio: this.props.navigation.getParam('bio', 'NO-ID'),
        location: this.props.navigation.getParam('location', 'NO-ID'),
        user_is_vegan: this.props.navigation.getParam('user_is_vegan', 'NO-ID')})}>
          <Image source={require('../assets/NavBarIcons/multiple-users-silhouette.png')} style={{height: Dimensions.get('window').width < 400 ? 28 : 34, marginLeft: Dimensions.get('window').width*0.08, marginRight: Dimensions.get('window').width*0.08, width: Dimensions.get('window').width < 400 ? 28 : 34, marginBottom: 20}}/>
      </TouchableHighlight>

      <TouchableHighlight underlayColor="white"
      onPress={() => this.props.navigation.getParam('guest', 'NO-ID') === true ? this.props.openRegistrationOverlay() : this.props.openAddItemOverlay()}>
          <Image source={require('../assets/NavBarIcons/plus.png')} style={{height: Dimensions.get('window').width < 400 ? 28 : 34, marginRight: Dimensions.get('window').width*0.08, width: Dimensions.get('window').width < 400 ? 28 : 34, marginBottom: 20}}/>
      </TouchableHighlight>

      <TouchableHighlight underlayColor="white"
      onPress={() => this.props.navigation.getParam('guest', 'NO-ID') === true ? this.props.openRegistrationOverlay() :
      navigate('Conversations', {
      recipient:     this.props.navigation.getParam('uploader', 'NO-ID').id,
      token:         this.props.navigation.getParam('token', 'NO-ID'),
      id:            this.props.navigation.getParam('id', 'NO-ID'),
      name:          this.props.navigation.getParam('name', 'NO-ID'),
      bio:           this.props.navigation.getParam('bio', 'NO-ID'),
      location:      this.props.navigation.getParam('location', 'NO-ID'),
      user_is_vegan: this.props.navigation.getParam('user_is_vegan', 'NO-ID'),
      current_user_id: this.props.navigation.getParam('user_id', 'NO-ID') ? this.props.navigation.getParam('user_id', 'NO-ID') : this.props.navigation.getParam('current_user_id', 'NO-ID')})}>
          <Image source={require('../assets/speech-bubble.png')} style={{height: Dimensions.get('window').width < 400 ? 28 : 34, marginRight: Dimensions.get('window').width*0.08, width: Dimensions.get('window').width < 400 ? 28 : 34, marginBottom: 20}}/>
      </TouchableHighlight>

      <TouchableHighlight underlayColor="white"
      onPress={() => this.props.openOverlay() }>
          <Image source={require('../assets/NavBarIcons/worldwide.png')} style={{height: Dimensions.get('window').width < 400 ? 28 : 34, marginRight: Dimensions.get('window').width*0.08, width: Dimensions.get('window').width < 400 ? 28 : 34, marginBottom: 20}}/>
      </TouchableHighlight>

      <TouchableHighlight underlayColor="white"
      onPress={() => navigate('Favourites', {
        user_id: this.props.navigation.getParam('user_id', 'NO-ID'),
        settings: true,
        avatar: this.props.navigation.getParam('avatar', 'NO-ID'),
        token: this.props.navigation.getParam('token', 'NO-ID'),
        id: this.props.navigation.getParam('id', 'NO-ID'),
        name: this.props.navigation.getParam('name', 'NO-ID'),
        bio: this.props.navigation.getParam('bio', 'NO-ID'),
        location: this.props.navigation.getParam('location', 'NO-ID'),
        user_is_vegan: this.props.navigation.getParam('user_is_vegan', 'NO-ID')})}>
          <Image source={require('../assets/NavBarIcons/star.png')} style={{height: Dimensions.get('window').width < 400 ? 28 : 34, marginRight: Dimensions.get('window').width*0.08, width: Dimensions.get('window').width < 400 ? 28 : 34, marginBottom: 20}}/>
      </TouchableHighlight>

      <TouchableHighlight underlayColor="white"
        onPress={() => navigate('UserView', {
          guest:         this.props.navigation.getParam('guest', 'NO-ID'),
          user_id: this.props.navigation.getParam('user_id', 'NO-ID'),
          settings: true,
          avatar: this.props.navigation.getParam('avatar', 'NO-ID'),
          token: this.props.navigation.getParam('token', 'NO-ID'),
          id: this.props.navigation.getParam('id', 'NO-ID'),
          name: this.props.navigation.getParam('name', 'NO-ID'),
          bio: this.props.navigation.getParam('bio', 'NO-ID'),
          location: this.props.navigation.getParam('location', 'NO-ID'),
          user_is_vegan: this.props.navigation.getParam('user_is_vegan', 'NO-ID')})}>
          <Image source={require('../assets/NavBarIcons/new_settings.png')} style={{height: Dimensions.get('window').width < 400 ? 28 : 34, marginRight: Dimensions.get('window').width*0.08, width: Dimensions.get('window').width < 400 ? 28 : 34, marginBottom: 20}}/>
      </TouchableHighlight>
    </View>
    );
  }
}

const navStyle = StyleSheet.create({
  iconsContainer: {
    position:         'absolute',
    bottom:            0,
    backgroundColor:  'white',
    justifyContent:   'center',
    alignItems:       'center',
    flexDirection:    'row',
  },
});
