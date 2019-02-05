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

export default class MediaList extends React.Component {
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
      items: [{title: 'Papa John’s Vegan Pizza Launching 28.1.19', description: 'After PETA’s successful online petition, which gained over 29,000 signatures requesting a vegan option, Papa John’s have announced that they are adding Sheese to its nationwide menu.', image: require('../../assets/AppIcons/newsdefault.png')}]
    }

    render() {
      const {navigate} = this.props.navigation;
      return (

    <View style={mediaListStyle.container}>

    <ScrollView style={{width: Dimensions.get('window').width*0.95}} showsVerticalScrollIndicator={false}>
    <View style={mediaListStyle.container}>

    <View style={{marginTop: Dimensions.get('window').height*0.02}}>
    </View>

      <View style={{flex: 1, flexDirection: 'row'}}>
        <SmallTwoWayToggle/>
        <AddItemButton navigation={this.props.navigation}
        onPress={() => navigate('MediaForm', {avatar: this.props.navigation.getParam('avatar', 'NO-ID'), token: this.props.navigation.getParam('token', 'NO-ID'), id: this.props.navigation.getParam('id', 'NO-ID'), name: this.props.navigation.getParam('name', 'NO-ID'), bio: this.props.navigation.getParam('bio', 'NO-ID'), location: this.props.navigation.getParam('location', 'NO-ID'), user_is_vegan: this.props.navigation.getParam('user_is_vegan', 'NO-ID')})} />
        {/*<FaveButton navigation={this.props.navigation}/>*/}
      </View>

      <AutoHeightImage
          width={70}
          source={require('../../assets/AppIcons/newspaper.png')}
          style={{marginBottom: Dimensions.get('window').height*0.04, marginTop: 5}}
      />

      <Text style={{fontSize: 18, textAlign: 'center'}}>
          [Good morning] [User_name]{"\n"} Here is the news...
      </Text>

      <View style={{marginTop: Dimensions.get('window').height*0.04}}>
      </View>

      <View style={mediaListStyle.mediaitem}>
      <TouchableHighlight onPress={() => navigate('MediaItemView', {title: this.state.items[0].title, description: this.state.items[0].description, image: this.state.items[0].image})}  style={mediaListStyle.mediadescription} style={mediaListStyle.mediaimage}>
        <Image source={this.state.items[0].image} style={{height: 100, width: 100}}/>
      </TouchableHighlight>
          <View style={mediaListStyle.mediatextcontainer}>
            <View>
              <Text onPress={() => navigate('MediaItemView', {title: this.state.items[0].title, description: this.state.items[0].description, image: this.state.items[0].image})}  style={mediaListStyle.mediadescription}  style={mediaListStyle.mediatitle}>
              {this.state.items[0].title}
              </Text>
            </View>
            <View>
              <Text onPress={() => navigate('MediaItemView', {title: this.state.items[0].title, description: this.state.items[0].description, image: this.state.items[0].image})}  style={mediaListStyle.mediadescription}>
              {this.state.items[0].description}
              </Text>
            </View>
          </View>
        </View>

      <View>
        <GlobalButton
          buttonTitle="Home"
          onPress={() => navigate('Home', {avatar: this.props.navigation.getParam('avatar', 'NO-ID'), token: this.props.navigation.getParam('token', 'NO-ID'), id: this.props.navigation.getParam('id', 'NO-ID'), name: this.props.navigation.getParam('name', 'NO-ID'), bio: this.props.navigation.getParam('bio', 'NO-ID'), location: this.props.navigation.getParam('location', 'NO-ID'), user_is_vegan: this.props.navigation.getParam('user_is_vegan', 'NO-ID')})}/>
      </View>
    </View>
  </ScrollView>
</View>
);
}
}

const mediaListStyle = StyleSheet.create({
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


  mediaitem: {
    flex: 1,
    flexDirection: 'row',
    paddingBottom: 20,
  },
  mediatextcontainer: {
    flex: 1,
    flexDirection: 'column',
  },
  mediatitle: {
    color: '#0dc6b5',
    margin: 4,
    fontSize: 18,
    fontWeight: 'bold',
  },
  mediadescription: {
    margin: 4,
    fontSize: 15
  }
});
