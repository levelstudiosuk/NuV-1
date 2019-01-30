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

export default class BrandList extends React.Component {
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
      items: [{title: 'Dr. Martens', description: 'The Dr. Martens website is extremely searchable for the vegan boot. Called “Vegan 1460” and marked with a bright green “V,” drmartenscanada.ca claims that the boot is “made with synthetic leather, 100% vegan friendly.” ...
', type: 'Fashion', image: require('../../assets/AppIcons/branddefault.png')}]
    }

    render() {
      const {navigate} = this.props.navigation;

      return (

    <View style={brandListStyle.container}>

    <ScrollView style={{width: Dimensions.get('window').width*0.95}} showsVerticalScrollIndicator={false}>
    <View style={brandListStyle.container}>

    <View style={{marginTop: Dimensions.get('window').height*0.02}}>
    </View>

      <View style={{flex: 1, flexDirection: 'row'}}>
        <SmallTwoWayToggle/>
        <AddItemButton navigation={this.props.navigation}
        onPress={() => navigate('BrandForm')} />
        {/*<FaveButton navigation={this.props.navigation}/>*/}
      </View>

      <AutoHeightImage
          width={70}
          source={require('../../assets/AppIcons/shopping.png')}
          style={{marginBottom: Dimensions.get('window').height*0.04, marginTop: 5}}
      />

      <Text style={{fontSize: 18, textAlign: 'center'}}>
          [Good morning] [User_name]{"\n"}click a brand for info{"\n"}{"\n"}
      </Text>

      <View style={{marginTop: Dimensions.get('window').height*0.04}}>
      </View>

      <View style={brandListStyle.branditem}>
      <TouchableHighlight onPress={() => navigate('BrandView')} style={brandListStyle.brandimage}>
        <Image source={require('../../assets/AppIcons/branddefault.png')} style={{height: 100, width: 100}}/>
      </TouchableHighlight>
          <View style={brandListStyle.brandtextcontainer}>
            <View>
              <Text onPress={() => navigate('BrandView', {title: this.state.items[0].title, description: this.state.items[0].description, type: this.state.items[0].type, title: this.state.items[0].image})} style={brandListStyle.brandtitle}>
              Dr. Martens
              </Text>
              <Text onPress={() => navigate('BrandView', {title: this.state.items[0].title, description: this.state.items[0].description, type: this.state.items[0].type, title: this.state.items[0].image})} style={brandListStyle.brandtype}>
              Fashion
              </Text>
            </View>
            <View>
              <Text onPress={() => navigate('BrandView', {title: this.state.items[0].title, description: this.state.items[0].description, type: this.state.items[0].type, title: this.state.items[0].image})} style={brandListStyle.branddescription}>
              The Dr. Martens website is extremely searchable for the vegan boot. Called “Vegan 1460” and marked with a bright green “V,” drmartenscanada.ca claims that the boot is “made with synthetic leather, 100% vegan friendly.” ...
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

const brandListStyle = StyleSheet.create({
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


  branditem: {
    flex: 1,
    flexDirection: 'row',
    paddingBottom: 20,
  },
  brandtextcontainer: {
    flex: 1,
    flexDirection: 'column',
  },
  brandtitle: {
    color: '#0dc6b5',
    margin: 4,
    fontSize: 18,
    fontWeight: 'bold',
  },
  brandtype: {
    color: '#92FE9D',
    margin: 4,
    fontSize: 18,
    fontWeight: 'bold',
  },
  branddescription: {
    margin: 4,
    fontSize: 15
  }
});
