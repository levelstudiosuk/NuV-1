import    React from 'react';
import {  StyleSheet,
          ScrollView,
          Platform,
          TouchableHighlight,
          Image,
          TextInput,
          Dimensions,
          Button,
          Text,
          View } from 'react-native';
import {  Constants } from 'expo'
import    GlobalButton from '../../components/GlobalButton.js';
import    LoadingCelery from '../../components/LoadingCelery.js';
import    AddItemButton from '../../components/AddItemButton.js';
import    BarCodeScanner from '../../components/BarCodeScanner.js';
import    FaveButton from '../../components/FaveButton.js';
import    SmallTwoWayToggle from '../../components/SmallTwoWayToggle.js';
import    AutoHeightImage from 'react-native-auto-height-image';
import    Expo, { ImagePicker } from 'expo';
import {  Permissions} from 'expo'
import axios from 'axios';
import moment from 'moment';
import * as TimeGreeting from '../../helper_functions/TimeGreeting.js';
import * as ReverseArray from '../../helper_functions/ReverseArray.js';

export default class BrandList extends React.Component {
  static navigationOptions = {
    title: null,
    headerTitle:(
     <AutoHeightImage width={75} style={{position: 'absolute', right: Platform.OS === 'android' ? 0 : -65 }} source={require('../../assets/greenlogo.png')}/>
 ),
}
    constructor(props) {
      super(props);

      this.changeToggleSelection = this.changeToggleSelection.bind(this);
     }

    state = {
        seeOnlyVegan: this.props.navigation.getParam('user_is_vegan', 'NO-ID') === "vegan" ? true : false,
        contentLoading: true
      }

    componentDidMount(){
      var token = this.props.navigation.getParam('token', 'NO-ID');
      var self = this;

      axios.get('http://nuv-api.herokuapp.com/brands',

      { headers: { Authorization: `${token}` }})

   .then(function(response){
     var responseItems = JSON.parse(response.request['_response'])
     var brandItems = ReverseArray.reverseArray(responseItems);

     self.setState({
       brandItems:  self.props.navigation.getParam('user', 'NO-ID') === true ? brandItems.filter(brandItem => brandItem.user_id === self.props.navigation.getParam('user_id', 'NO-ID')) : brandItems,
       contentLoading: false
     },
     function(){
       console.log("Brand items", self.state.brandItems);
     }
   )
 }).catch(function(error){
   console.log("Error: ", error);
 })
    }

    getActiveToggleIndex(){
      return this.props.navigation.getParam('user_is_vegan', 'NO-ID') === "vegan" ? 0 : 1
    }

    changeToggleSelection(selection){

      this.setState({
        seeOnlyVegan: selection
      }, function(){
        console.log("See only vegan: ", this.state.seeOnlyVegan);
      })

    }

    returnMessage(){
      if (this.props.navigation.getParam('user', 'NO-ID') === true && this.props.navigation.getParam('viewingAnotherUser', 'NO-ID') != true){
        return `Here are your brand contributions.`
      }
      else if (this.props.navigation.getParam('viewingAnotherUser', 'NO-ID') === true && this.props.navigation.getParam('uploader', 'NO-ID')){
        return `Brand contributions made by ${this.props.navigation.getParam('uploader', 'NO-ID').name}`
      }
      else {
        return "Click item/scan barcode for info"
      }
    }

  mapBrandItems(){
    const {navigate} = this.props.navigation;

    var brandItems = this.state.seeOnlyVegan === true ? this.state.brandItems.filter(brandItem => brandItem.content_is_vegan === true) : this.state.brandItems

    return brandItems.map((item, i) =>

    <View key={i} style={brandListStyle.branditem}>
      <TouchableHighlight
      underlayColor={'white'}
      key={i+1}
      onPress={() => navigate('BrandView', {
        avatar:        this.props.navigation.getParam('avatar', 'NO-ID'),
        token:         this.props.navigation.getParam('token', 'NO-ID'),
        id:            this.props.navigation.getParam('id', 'NO-ID'),
        brand_id:      item.id,
        name:          this.props.navigation.getParam('name', 'NO-ID'),
        bio:           this.props.navigation.getParam('bio', 'NO-ID'),
        location:      this.props.navigation.getParam('location', 'NO-ID'),
        user_is_vegan: this.props.navigation.getParam('user_is_vegan', 'NO-ID')})}
      style={brandListStyle.brandimage}>
        <Image key={i+2}
          source={require('../../assets/AppIcons/greenprice.png')}
          style={{height: 100, width: 100}}/>

      </TouchableHighlight>
          <View key={i+3} style={brandListStyle.brandtextcontainer}>
            <View key={i+4}>
              <Text
                key={i+5}
                onPress={() => navigate('BrandView', {
                  avatar:        this.props.navigation.getParam('avatar', 'NO-ID'),
                  token:         this.props.navigation.getParam('token', 'NO-ID'),
                  id:            this.props.navigation.getParam('id', 'NO-ID'),
                  brand_id:      item.id,
                  name:          this.props.navigation.getParam('name', 'NO-ID'),
                  bio:           this.props.navigation.getParam('bio', 'NO-ID'),
                  location:      this.props.navigation.getParam('location', 'NO-ID'),
                  user_is_vegan: this.props.navigation.getParam('user_is_vegan', 'NO-ID')})}
                style={brandListStyle.brandtitle}>
                {item.title}
              </Text>
              <Text
                key={i+6}
                onPress={() => navigate('BrandView', {
                  avatar:        this.props.navigation.getParam('avatar', 'NO-ID'),
                  token:         this.props.navigation.getParam('token', 'NO-ID'),
                  id:            this.props.navigation.getParam('id', 'NO-ID'),
                  brand_id:      item.id,
                  name:          this.props.navigation.getParam('name', 'NO-ID'),
                  bio:           this.props.navigation.getParam('bio', 'NO-ID'),
                  location:      this.props.navigation.getParam('location', 'NO-ID'),
                  user_is_vegan: this.props.navigation.getParam('user_is_vegan', 'NO-ID')})}
                style={brandListStyle.brandtype}>
                {item.brand_type}
              </Text>
            </View>
            <View key={i+7}>
              <Text
                key={i+8}
                onPress={() => navigate('BrandView', {
                  avatar:        this.props.navigation.getParam('avatar', 'NO-ID'),
                  token:         this.props.navigation.getParam('token', 'NO-ID'),
                  id:            this.props.navigation.getParam('id', 'NO-ID'),
                  brand_id:      item.id,
                  name:          this.props.navigation.getParam('name', 'NO-ID'),
                  bio:           this.props.navigation.getParam('bio', 'NO-ID'),
                  location:      this.props.navigation.getParam('location', 'NO-ID'),
                  user_is_vegan: this.props.navigation.getParam('user_is_vegan', 'NO-ID')})}
                style={brandListStyle.branddescription}>
               {item.description}
              </Text>
            </View>
          </View>
        </View>

    )
    }

    returnBrandMessage(){
      return this.props.navigation.getParam('uploader', 'NO-ID') ? this.props.navigation.getParam('uploader', 'NO-ID').name + 'has not made any brand contributions yet.' : 'You have not made any brand contributions yet.'
    }

    render() {
      const {navigate} = this.props.navigation;

      if (this.state.contentLoading === false){
      return (

    <View style={brandListStyle.container}>

     <ScrollView style={{width: Dimensions.get('window').width*0.95}} showsVerticalScrollIndicator={false}>
      <View style={brandListStyle.container}>

      <View style={{marginTop: Dimensions.get('window').height*0.02}}>
      </View>

      <View style={{flex: 1, flexDirection: 'row'}}>
        <SmallTwoWayToggle changeToggleSelection={this.changeToggleSelection} activeIndex={this.getActiveToggleIndex()}  />
        <AddItemButton navigation={this.props.navigation}
           onPress={() => navigate('BrandForm', {
              avatar: this.props.navigation.getParam('avatar', 'NO-ID'),
              token: this.props.navigation.getParam('token', 'NO-ID'),
              id: this.props.navigation.getParam('id', 'NO-ID'),
              name: this.props.navigation.getParam('name', 'NO-ID'),
              bio: this.props.navigation.getParam('bio', 'NO-ID'),
              location: this.props.navigation.getParam('location', 'NO-ID'),
              user_is_vegan: this.props.navigation.getParam('user_is_vegan', 'NO-ID')})} />
        {/*<FaveButton navigation={this.props.navigation}/>*/}
      </View>

      <AutoHeightImage
        width={70}
        source={require('../../assets/AppIcons/shopping.png')}
        style={{marginBottom: Dimensions.get('window').height*0.04, marginTop: 5}}
       />

       {
         this.props.navigation.getParam('uploader', 'NO-ID') ? (

           <Text style={{fontSize: Dimensions.get('window').width > 750 ? 24 : 18, textAlign: 'center', marginBottom: Dimensions.get('window').height*0.03}}>
               {this.returnMessage()}{"\n"}{"\n"}

           </Text>

    ) :

    <Text style={{fontSize: Dimensions.get('window').width > 750 ? 24 : 18, textAlign: 'center', marginBottom: Dimensions.get('window').height*0.03}}>
        {TimeGreeting.getTimeBasedGreeting(this.props.navigation.getParam('name', 'NO-ID'))}{"\n"}{this.returnMessage()}{"\n"}{"\n"}

    </Text>
  }

       </View>
       </ScrollView>

       <ScrollView style={{width: Dimensions.get('window').width*0.95, marginTop: Dimensions.get('window').height*0.03}} showsVerticalScrollIndicator={false}>
        <View style={brandListStyle.container}>

      <BarCodeScanner/>
      <AutoHeightImage
        width={150}
        source={require('../../assets/brand_images/tesco.png')}
        style={{marginBottom: Dimensions.get('window').height*0.03, marginTop: 2}}
       />

      <View style={{marginTop: Dimensions.get('window').height*0.04}}>
      </View>

      {this.state.brandItems && this.state.brandItems.length > 0 ? (

        this.mapBrandItems()
      )
      :


      <Text style={{fontSize: Dimensions.get('window').width > 750 ? 24 : 20, marginBottom: Dimensions.get('window').height*0.02}}> {this.returnBrandMessage()} </Text>
    }
      <View style={{ marginBottom: Dimensions.get('window').height*0.5}}>
        <GlobalButton
          buttonTitle="Home"
          onPress={() => navigate('Home', {
             avatar: this.props.navigation.getParam('avatar', 'NO-ID'),
             token: this.props.navigation.getParam('token', 'NO-ID'),
             id: this.props.navigation.getParam('id', 'NO-ID'),
             name: this.props.navigation.getParam('name', 'NO-ID'),
             bio: this.props.navigation.getParam('bio', 'NO-ID'),
             location: this.props.navigation.getParam('location', 'NO-ID'),
             user_is_vegan: this.props.navigation.getParam('user_is_vegan', 'NO-ID')})}/>
    </View>
    </View>
  </ScrollView>
  </View>
)
}

else {
  return (

    <View style={{backgroundColor: '#FBFEFC'}}>
    <LoadingCelery />
    </View>

  )
}
}
}

const brandListStyle = StyleSheet.create({
  container: {
    backgroundColor:  'white',
    alignItems:       'center',
    justifyContent:   'center',
  },
  submitContainer: {
    alignItems:       'center',
    marginTop:        Dimensions.get('window').height*0.03,
    marginBottom:     Platform.OS === 'ios' ? Dimensions.get('window').height*0.05 : Dimensions.get('window').height*0.05
  },
  header: {
    textAlign:        'center',
    marginTop:        Constants.statusBarHeight+10,
    marginBottom:     Dimensions.get('window').height*0.01
  },
  branditem: {
    flex:             1,
    flexDirection:    'row',
    paddingBottom:    20,
  },
  brandtextcontainer: {
    flex:             1,
    flexDirection:    'column',
  },
  brandtitle: {
    color:            '#a2e444',
    margin:           4,
    fontSize:         18,
    fontWeight:       'bold',
  },
  brandtype: {
    color:            '#696969',
    margin:           4,
    fontSize:         18,
    fontWeight:       'bold',
  },
  branddescription: {
    margin:           4,
    fontSize:         15
  }
});
