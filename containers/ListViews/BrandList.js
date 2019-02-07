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
import axios from 'axios';
import moment from 'moment';

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
      items: [{title: "Dr Martens", description: "The Dr. Martens website is extremely searchable for the vegan boot. Called “Vegan 1460” and marked with a bright green “V,” drmartenscanada.ca claims that the boot is “made with synthetic leather, 100% vegan friendly.”", type: "Fashion", image: require('../../assets/AppIcons/branddefault.png')}]
    }

    componentDidMount(){
      var token = this.props.navigation.getParam('token', 'NO-ID');
      var self = this;

      axios.get('http://nuv-api.herokuapp.com/brands',

   { headers: { Authorization: `${token}` }})

   .then(function(response){

     var brandItems = JSON.parse(response.request['_response'])

     self.setState({
       brandItems: brandItems
     },
     function(){
       console.log("Brand items", self.state.brandItems);
     }
   )
 }).catch(function(error){
   console.log("Error: ", error);
 })
    }

    mapBrandItems(){
      const {navigate} = this.props.navigation;

      return this.state.brandItems.map((item, i) =>

      <View key={i} style={brandListStyle.branditem}>
      <TouchableHighlight key={i+1} onPress={() => navigate('BrandView', {title: item.title, description: item.description, type: item.brand_type, image: item.brand_main_image, rating: item.rating, url: item.URL})} style={brandListStyle.brandimage}>
        <Image key={i+2} source={require('../../assets/AppIcons/branddefault.png')} style={{height: 100, width: 100}}/>
      </TouchableHighlight>
          <View key={i+3} style={brandListStyle.brandtextcontainer}>
            <View key={i+4}>
              <Text key={i+5} onPress={() => navigate('BrandView', {title: item.title, description: item.description, type: item.brand_type, image: item.brand_main_image, rating: item.rating, url: item.URL})} style={brandListStyle.brandtitle}>
              {item.title}
              </Text>
              <Text key={i+6} onPress={() => navigate('BrandView', {title: item.title, description: item.description, type: item.brand_type, image: item.brand_main_image, rating: item.rating, url: item.URL})} style={brandListStyle.brandtype}>
              {item.brand_type}
              </Text>
            </View>
            <View key={i+7}>
              <Text key={i+8} onPress={() => navigate('BrandView', {title: item.title, description: item.description, type: item.brand_type, image: item.brand_main_image, rating: item.rating, url: item.URL})} style={brandListStyle.branddescription}>
              {item.description}
              </Text>
            </View>
          </View>
        </View>

    )
    }

    render() {
      console.log("ITEM", this.state.items[0]);
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
        onPress={() => navigate('BrandForm', {avatar: this.props.navigation.getParam('avatar', 'NO-ID'), token: this.props.navigation.getParam('token', 'NO-ID'), id: this.props.navigation.getParam('id', 'NO-ID'), name: this.props.navigation.getParam('name', 'NO-ID'), bio: this.props.navigation.getParam('bio', 'NO-ID'), location: this.props.navigation.getParam('location', 'NO-ID'), user_is_vegan: this.props.navigation.getParam('user_is_vegan', 'NO-ID')})} />
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

      {this.state.brandItems ? (

        this.mapBrandItems()
      )
      : null
    }
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
