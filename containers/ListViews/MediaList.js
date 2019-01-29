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
        onPress={() => navigate('MediaForm')} />
        {/*<FaveButton navigation={this.props.navigation}/>*/}
      </View>

      <AutoHeightImage
          width={70}
          source={require('../../assets/AppIcons/newspaper.png')}
          style={{marginBottom: Dimensions.get('window').height*0.04, marginTop: 5}}
      />

      <Text style={{fontSize: 18, textAlign: 'center'}}>
          [Good morning] [User_name]; here is the news{"\n"}{"\n"}
      </Text>

      <View style={{marginTop: Dimensions.get('window').height*0.04}}>
      </View>

      <View style={mediaListStyle.mediaitem}>
      <TouchableHighlight style={mediaListStyle.mediaimage}>
        <Image source={require('../../assets/AppIcons/newsdefault.png')} style={{height: 100, width: 100}}/>
      </TouchableHighlight>
          <View style={mediaListStyle.mediatextcontainer}>
            <View>
              <Text style={mediaListStyle.mediatitle}>
              Papa John’s Vegan Pizza Launching 28.1.19
              </Text>
            </View>
            <View>
              <Text style={mediaListStyle.mediadescription}>
              After PETA’s successful online petition, which gained over 29,000 signatures requesting a vegan option, Papa John’s have announced that they are adding Sheese to its nationwide menu.
              </Text>
            </View>
          </View>
        </View>

      <View >
        <GlobalButton
          buttonTitle="Home"
          onPress={() => navigate('Home', {name: 'Home'})}/>
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
