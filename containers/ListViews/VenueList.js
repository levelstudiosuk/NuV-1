import React from 'react';
import { StyleSheet, ScrollView, Platform, TouchableHighlight, Image, TextInput, Dimensions, Button, Text, View } from 'react-native';
import { Constants } from 'expo'
import GlobalButton from '../../components/GlobalButton.js';
import AddItemButton from '../../components/AddItemButton.js';
import FaveButton from '../../components/FaveButton.js';
import SmallTwoWayToggle from '../../components/SmallTwoWayToggle.js';
import AutoHeightImage from 'react-native-auto-height-image';
import Expo, { ImagePicker } from 'expo';
import {Permissions} from 'expo'

export default class VenueList extends React.Component {
  static navigationOptions = {
    title: null,
    headerTitle:(
     <AutoHeightImage width={75} style={{position: 'absolute', right: Platform.OS === 'android' ? 0 : -65 }} source={require('../../assets/AppIcons/transparentlogo.png')}/>
 ),
}

    constructor(props) {
      super(props);
    }

    state = {
      items: [{title: "Hendersons Vegan Restaurant", address: "25c Thistle St, Edinburgh EH2 1DX", description: "Long-running vegetarian deli/eatery showcasing local and organic produce, plus regular live music.", type: "Cafe", image: require('../../assets/AppIcons/venuedefault.png')}]
    }

    render() {
      const {navigate} = this.props.navigation;
      return (

    <View style={venueListStyle.container}>

    <ScrollView style={{width: Dimensions.get('window').width*0.95}} showsVerticalScrollIndicator={false}>
    <View style={venueListStyle.container}>

    <View style={{marginTop: Dimensions.get('window').height*0.02}}>
    </View>

      <View style={{flex: 1, flexDirection: 'row'}}>
        <SmallTwoWayToggle/>
        <AddItemButton navigation={this.props.navigation}
        onPress={() => navigate('VenueForm')} />
        {/*<FaveButton navigation={this.props.navigation}/>*/}
      </View>

      <AutoHeightImage
          width={70}
          source={require('../../assets/AppIcons/dining.png')}
          style={{marginBottom: Dimensions.get('window').height*0.04, marginTop: 5}}
      />

      <Text style={{fontSize: 18, textAlign: 'center'}}>
          [Good morning] [User_name]{"\n"}Search the ethical eateries here:
      </Text>

      <View style={{marginTop: Dimensions.get('window').height*0.04}}>
      </View>

      <View style={venueListStyle.venueitem}>
      <TouchableHighlight
        style={venueListStyle.venueimage}
        onPress={() => navigate('VenueView', {title: this.state.items[0].title, address: this.state.items[0].address, description: this.state.items[0].description, type: this.state.items[0].type, image: this.state.items[0].image})}>
        <Image source={require('../../assets/AppIcons/venuedefault.png')} style={{height: 75, width: 75}}/>
      </TouchableHighlight>
          <View style={venueListStyle.venuetextcontainer}>
            <View>
              <Text
              style={venueListStyle.venuetitle}
              onPress={() => navigate('VenueView', {title: this.state.items[0].title, address: this.state.items[0].address, description: this.state.items[0].description, type: this.state.items[0].type, image: this.state.items[0].image})}>
              Hendersons Vegan Restaurant
              </Text>
              <Text
              style={venueListStyle.venuetype}
              onPress={() => navigate('VenueView', {title: this.state.items[0].title, address: this.state.items[0].address, description: this.state.items[0].description, type: this.state.items[0].type, image: this.state.items[0].image})}>
              Cafe
              </Text>
            </View>
            <View>
              <Text
              style={venueListStyle.venuedescription}
              onPress={() => navigate('VenueView', {title: this.state.items[0].title, address: this.state.items[0].address, description: this.state.items[0].description, type: this.state.items[0].type, image: this.state.items[0].image})}>
              Long-running vegetarian deli/eatery showcasing local and organic produce, plus regular live music.
              </Text>
              <Text
              style={venueListStyle.venueaddress}
              onPress={() => navigate('VenueView', {title: this.state.items[0].title, address: this.state.items[0].address, description: this.state.items[0].description, type: this.state.items[0].type, image: this.state.items[0].image})}>
              25c Thistle St, Edinburgh EH2 1DX
              </Text>
            </View>
          </View>
        </View>

      <View >
        <GlobalButton
          buttonTitle="Home"
          onPress={() => navigate('Home', {avatar: this.props.navigation.getParam('avatar', 'NO-ID'), token: this.props.navigation.getParam('token', 'NO-ID'), id: this.props.navigation.getParam('id', 'NO-ID'), name: this.props.navigation.getParam('name', 'NO-ID'), bio: this.props.navigation.getParam('bio', 'NO-ID'), location: this.props.navigation.getParam('location', 'NO-ID'), user_is_vegan: this.props.navigation.getParam('user_is_vegan', 'NO-ID'))}/>
      </View>
    </View>
  </ScrollView>
</View>
);
}
}

const venueListStyle = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitContainer: {
    alignItems: 'center',
    marginTop: Dimensions.get('window').height*0.03,
    marginBottom: Platform.OS === 'ios' ? Dimensions.get('window').height*0.05 : Dimensions.get('window').height*0.05
  },
  header: {
    textAlign: 'center',
    marginTop:  Constants.statusBarHeight+10,
    marginBottom: Dimensions.get('window').height*0.01
  },


  venueitem: {
    flex: 1,
    flexDirection: 'row',
    paddingBottom: 20,
  },
  venuetextcontainer: {
    flex: 1,
    flexDirection: 'column',
  },
  venuetitle: {
    color: '#0dc6b5',
    margin: 4,
    fontSize: 18,
    fontWeight: 'bold',
  },
  venuetype: {
    color: '#92FE9D',
    margin: 4,
    fontSize: 18,
    fontWeight: 'bold',
  },
  venueaddress: {
    color: '#0dc6b5',
    margin: 4,
    fontSize: 12,
    fontWeight: 'bold',
  },
  venuedescription: {
    margin: 4,
    fontSize: 15
  }
});
