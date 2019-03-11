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

      <TouchableHighlight underlayColor="white"
        onPress={() => navigate('Home', this.props.attributes)}>
          <Image source={require('../assets/NavBarIcons/Green/greenhome.png')} style={{height: Dimensions.get('window').width < 400 ? 28 : 34, marginLeft: Dimensions.get('window').width*0.08, marginRight: Dimensions.get('window').width*0.08, width: Dimensions.get('window').width < 400 ? 28 : 34, marginBottom: 20}}/>
      </TouchableHighlight>

      <TouchableHighlight underlayColor="white"
      onPress={() => navigate('NuVContributors', {
        user_id: this.props.navigation.getParam('user_id', 'NO-ID'),
        settings: true,
        avatar: this.props.navigation.getParam('avatar', 'NO-ID'),
        token: this.props.navigation.getParam('token', 'NO-ID'),
        id: this.props.navigation.getParam('id', 'NO-ID'),
        name: this.props.navigation.getParam('name', 'NO-ID'),
        bio: this.props.navigation.getParam('bio', 'NO-ID'),
        location: this.props.navigation.getParam('location', 'NO-ID'),
        user_is_vegan: this.props.navigation.getParam('user_is_vegan', 'NO-ID')})}>
          <Image source={require('../assets/NavBarIcons/Green/users.png')} style={{height: Dimensions.get('window').width < 400 ? 28 : 34, marginRight: Dimensions.get('window').width*0.08, width: Dimensions.get('window').width < 400 ? 28 : 34, marginBottom: 20}}/>
      </TouchableHighlight>

      <TouchableHighlight underlayColor="white"
      onPress={() => this.props.openOverlay() }>
          <Image source={require('../assets/NavBarIcons/Green/greenworld.png')} style={{height: Dimensions.get('window').width < 400 ? 28 : 34, marginRight: Dimensions.get('window').width*0.08, width: Dimensions.get('window').width < 400 ? 28 : 34, marginBottom: 20}}/>
      </TouchableHighlight>

      <TouchableHighlight underlayColor="white"
      onPress={() => navigate('Barcode', {
        user_id: this.props.navigation.getParam('user_id', 'NO-ID'),
        settings: true,
        avatar: this.props.navigation.getParam('avatar', 'NO-ID'),
        token: this.props.navigation.getParam('token', 'NO-ID'),
        id: this.props.navigation.getParam('id', 'NO-ID'),
        name: this.props.navigation.getParam('name', 'NO-ID'),
        bio: this.props.navigation.getParam('bio', 'NO-ID'),
        location: this.props.navigation.getParam('location', 'NO-ID'),
        user_is_vegan: this.props.navigation.getParam('user_is_vegan', 'NO-ID')})}>
          <Image source={require('../assets/NavBarIcons/barcode.png')} style={{height: Dimensions.get('window').width < 400 ? 28 : 34, marginRight: Dimensions.get('window').width*0.08, width: Dimensions.get('window').width < 400 ? 28 : 34, marginBottom: 20}}/>
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
          <Image source={require('../assets/NavBarIcons/Green/lightstar.png')} style={{height: Dimensions.get('window').width < 400 ? 28 : 34, marginRight: Dimensions.get('window').width*0.08, width: Dimensions.get('window').width < 400 ? 28 : 34, marginBottom: 20}}/>
      </TouchableHighlight>

      <TouchableHighlight underlayColor="white"
        onPress={() => navigate('UserView', {
          user_id: this.props.navigation.getParam('user_id', 'NO-ID'),
          settings: true,
          avatar: this.props.navigation.getParam('avatar', 'NO-ID'),
          token: this.props.navigation.getParam('token', 'NO-ID'),
          id: this.props.navigation.getParam('id', 'NO-ID'),
          name: this.props.navigation.getParam('name', 'NO-ID'),
          bio: this.props.navigation.getParam('bio', 'NO-ID'),
          location: this.props.navigation.getParam('location', 'NO-ID'),
          user_is_vegan: this.props.navigation.getParam('user_is_vegan', 'NO-ID')})}>
          <Image source={require('../assets/NavBarIcons/Green/lightsettings.png')} style={{height: Dimensions.get('window').width < 400 ? 28 : 34, marginRight: Dimensions.get('window').width*0.08, width: Dimensions.get('window').width < 400 ? 28 : 34, marginBottom: 20}}/>
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
