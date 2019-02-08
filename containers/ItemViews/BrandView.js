import React from 'react';
import { StyleSheet, Platform, TouchableHighlight, ScrollView, Dimensions, Button, Text, View } from 'react-native';
import { Constants } from 'expo'
import * as TimeGreeting from '../../helper_functions/TimeGreeting.js';
import NavBar from '../../components/NavBar.js';
import AutoHeightImage from 'react-native-auto-height-image';
import GlobalButton from '../../components/GlobalButton.js';
import ShareButton from '../../components/ShareButton.js';
import StickyHeaderFooterScrollView from 'react-native-sticky-header-footer-scroll-view';
import StarRating from 'react-native-star-rating';
import AddItemButton from '../../components/AddItemButton.js';
import FaveButton from '../../components/FaveButton.js';
import { AsyncStorage, Alert } from "react-native"
import moment from 'moment';
import axios from 'axios';

export default class BrandView extends React.Component {
  static navigationOptions = {
    title: null,
    headerTitle: (
      <AutoHeightImage width={75} style={{position: 'absolute', right: Platform.OS === 'android' ? 0 : -65 }} source={require('../../assets/AppIcons/transparentlogo.png')}/>
 ),
}

      constructor(props) {
      super(props);

      this.onStarRatingPress = this.onStarRatingPress.bind(this);
      this.addBrandToFavourites = this.addBrandToFavourites.bind(this);
      }

      state = {
          starRating: parseInt(this.props.navigation.getParam('rating', 'NO-ID')),
          starCount: 2
        };

      onStarRatingPress(rating) {
      this.setState({
        starCount: rating
      });
      }

      componentDidMount(){

        var id = this.props.navigation.getParam('id', 'NO-ID');
        var token = this.props.navigation.getParam('token', 'NO-ID');
        var self = this;

        axios.get(`http://nuv-api.herokuapp.com/brands/${id}`,

     { headers: { Authorization: `${token}` }})

     .then(function(response){

       var brandItem = JSON.parse(response.request['_response'])

       self.setState({
         brandItem: brandItem
       },
       function(){
         console.log("Brand item", self.state.brandItem);
       }
     )
     }).catch(function(error){
       console.log("Error: ", error);
     })

      }

  checkFavouriteStatus(viewedBrand) {
    try {
      AsyncStorage.getItem('brand_favourites').then((brands) => {
        const brandss = brands ? JSON.parse(brands) : [];

        if (brandss.length > 0){
          var names = brandss.map((brand) => brand.title);

          if (names.includes(viewedBrand)){
            this.setState({viewedBrandAlreadyFavourite: true}, function(){
              console.log("Already favourite");
            });
          }
          else {
            this.setState({viewedBrandAlreadyFavourite: false},
            function(){
              console.log("Not already favourite");
            });
          }
        }
        else {
          this.setState({viewedBrandAlreadyFavourite: false}, function(){
            console.log("NOT favourite");
          });
        }
      }
    )
    }
      catch (error) {
        console.log(error);
    }
    }

  addBrandToFavourites = async() => {

    console.log("ITEM", JSON.stringify(this.props.navigation.getParam('title', 'Does not exist')));

    var self = this;

    var brand = {title: JSON.stringify(this.props.navigation.getParam('title', 'Does not exist')), description: JSON.stringify(this.props.navigation.getParam('description', 'Does not exist')), type: JSON.stringify(this.props.navigation.getParam('type', 'Does not exist')), image: JSON.stringify(this.props.navigation.getParam('image', 'Does not exist'))}

    try {
      AsyncStorage.getItem('brand_favourites').then((brands) => {
        const brandss = brands ? JSON.parse(brands) : [];
        if (brandss.length > 0){
          var names = brandss.map((brand) => brand.title);
          if (!names.includes(brand.title)){
          brandss.push(brand);
          AsyncStorage.setItem('brand_favourites', JSON.stringify(brandss));
          this.setState({newBrandAdded: true}, function(){
            Alert.alert(
                   `${brand.title} was added to your favourites!`
                )
        })
      }
        else {
          Alert.alert(
                 `${brand.title} is already in your favourites!`
              )
        }
    }
        else {
          brandss.push(brand);
          AsyncStorage.setItem('brand_favourites', JSON.stringify(brandss));
          Alert.alert(
                 `${brand.title} was added to your favourites!`
              )
        }
        console.log("BRANDS AFTER", brandss);
  })}
    catch (error) {
      console.log(error);
    }
}

  render() {
    const {navigate} = this.props.navigation;
    return (

      <View style={brandViewStyle.container}>

      { this.state.brandItem ? (

      <ScrollView style={{width: Dimensions.get('window').width*1, paddingLeft: Dimensions.get('window').width*0.015, paddingRight: Dimensions.get('window').width*0.015}} showsVerticalScrollIndicator={false}>
      <View style={brandViewStyle.container}>

      <View style={{marginTop: Dimensions.get('window').height*0.02}}>
      </View>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <FaveButton navigation={this.props.navigation} handleButtonClick={this.addBrandToFavourites}/>
          <AddItemButton navigation={this.props.navigation}
          onPress={() => navigate('BrandForm', {avatar: this.props.navigation.getParam('avatar', 'NO-ID'), token: this.props.navigation.getParam('token', 'NO-ID'), id: this.props.navigation.getParam('id', 'NO-ID'), name: this.props.navigation.getParam('name', 'NO-ID'), bio: this.props.navigation.getParam('bio', 'NO-ID'), location: this.props.navigation.getParam('location', 'NO-ID'), user_is_vegan: this.props.navigation.getParam('user_is_vegan', 'NO-ID')})} />
        </View>

        <Text style={brandViewStyle.brandname}>
            {this.state.brandItem.title} / Type: {this.state.brandItem.brand_type} / {this.state.brandItem.URL}
        </Text>

        <View style={brandViewStyle.mapcontainer}>
        <AutoHeightImage width={Dimensions.get('window').width*1} style={{marginTop: Dimensions.get('window').width*0.02}} source={{uri: this.state.brandItem.brand_main_image_location}}/>
        </View>
    </View>

    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <AutoHeightImage width={Dimensions.get('window').width*0.1} style={{ borderRadius: Dimensions.get('window').width*0.025, margin: Dimensions.get('window').width*0.025 }} source={require('../../assets/AppIcons/link.png')}/>
        <AutoHeightImage width={Dimensions.get('window').width*0.1} style={{ borderRadius: Dimensions.get('window').width*0.025, margin: Dimensions.get('window').width*0.025 }} source={{uri: this.state.brandItem.user_image}}/>
        <AutoHeightImage width={Dimensions.get('window').width*0.1} style={{ borderRadius: Dimensions.get('window').width*0.025, margin: Dimensions.get('window').width*0.025 }} source={require('../../assets/VenueTypeIcons/cafe.png')}/>
        <ShareButton
        marginLeft={Dimensions.get('window').width*0.07}
        title="Shared from NüV"
        message="Message to share"
        url="www.level-apps.co.uk"
        subject="Hi, a NüV user though you would like to see this..."
         />
    </View>

    <View style={{alignItems: 'center'}}>
    <Text style={brandViewStyle.brandreviewbody}>
    Uploaded {moment(new Date(this.state.brandItem.created_at), 'MMMM Do YYYY, h:mm:ss a').fromNow()} by {this.state.brandItem.user_name}

    </Text>
    </View>

    <View >
      <View>
        <Text style={brandViewStyle.brandreviewtitle}>
        This brand was described by {this.state.brandItem.user_name} as:{"\n"}
        </Text>
        <Text style={brandViewStyle.brandreviewbody}>
        {this.state.brandItem.description}
        </Text>
      </View>
    </View>


    <View style={{alignItems: 'center', width: Dimensions.get('window').width*1}}>
    <Text style={brandViewStyle.vibeHeading}>NuV user rating</Text>
    <StarRating
      disabled={false}
      maxStars={5}
      rating={this.state.brandItem.rating}
      fullStarColor={'#0DC6B5'}
      containerStyle={{marginBottom: Dimensions.get('window').height*0.02}}
      />
    </View>

      <View style={{alignItems: 'center', marginTop: Dimensions.get('window').height*0.005, width: Dimensions.get('window').width*1}}>
      <Text style={brandViewStyle.vibeHeading}>Rate this brand</Text>
      <StarRating
        disabled={false}
        maxStars={5}
        rating={this.state.starCount}
        selectedStar={(rating) => this.onStarRatingPress(rating)}
        fullStarColor={'#0DC6B5'}
        containerStyle={{marginTop: Dimensions.get('window').height*0.02, marginBottom: Dimensions.get('window').height*0.02}}
        />
        </View>

        <View style={brandViewStyle.submitContainer}>
        <GlobalButton
           buttonTitle="Rate and go"
           onPress={() => navigate('Home', {avatar: this.props.navigation.getParam('avatar', 'NO-ID'), token: this.props.navigation.getParam('token', 'NO-ID'), id: this.props.navigation.getParam('id', 'NO-ID'), name: this.props.navigation.getParam('name', 'NO-ID'), bio: this.props.navigation.getParam('bio', 'NO-ID'), location: this.props.navigation.getParam('location', 'NO-ID'), user_is_vegan: this.props.navigation.getParam('user_is_vegan', 'NO-ID')})}/>
        </View>

        </ScrollView>

      ) : null

    }

      </View>
      );
      }
      }

const brandViewStyle = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitContainer: {
    alignItems: 'center',
    marginTop: Dimensions.get('window').height*0.03,
    marginBottom: Platform.OS === 'ios' ? Dimensions.get('window').height*0.05 : Dimensions.get('window').height*0.1
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
  brandname: {
    color: '#0dc6b5',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
  },
  brandreviewtitle: {
    color: '#0dc6b5',
    margin: 4,
    fontSize: 18,
  },
  brandreviewbody: {
    margin: 4,
    fontSize: 15,
  },

    profileItem: {
    padding: Dimensions.get('window').width* 0.025,
    fontSize: Dimensions.get('window').width>750 ? 24 : 16 ,
    color: 'black'
  },
  vibeHeading: {
  fontSize: Dimensions.get('window').width > 750 ? 27 : 20,
  textAlign: 'center',
  color: '#0DC6B5',
  marginTop: Dimensions.get('window').height*0.03
  },
  submitContainer: {
    alignItems: 'center',
    marginTop: Dimensions.get('window').height*0.03,
    marginBottom: Platform.OS === 'ios' ? Dimensions.get('window').height*0.15 : Dimensions.get('window').height*0.15
  },
  });
