import    React from 'react';
import {  StyleSheet,
          Platform,
          TouchableHighlight,
          ScrollView,
          Dimensions,
          Linking,
          Button,
          Text,
          View } from 'react-native';
import {  Constants } from 'expo'
import    GuestRegistrationOffer from '../../components/GuestRegistrationOffer.js';
import * as TimeGreeting from '../../helper_functions/TimeGreeting.js';
import    NavBar from '../../components/NavBar.js';
import    AutoHeightImage from 'react-native-auto-height-image';
import    GlobalButton from '../../components/GlobalButton.js';
import    ShareButton from '../../components/ShareButton.js';
import    StickyHeaderFooterScrollView from 'react-native-sticky-header-footer-scroll-view';
import    StarRating from 'react-native-star-rating';
import    AddItemButton from '../../components/AddItemButton.js';
import    LoadingCelery from '../../components/LoadingCelery.js';
import    FaveButton from '../../components/FaveButton.js';
import    LikeButton from '../../components/LikeButton.js';
import    Comments from '../Global/Comments.js';
import    LikersOverlay from '../../components/LikersOverlay.js';
import {  AsyncStorage, Alert } from "react-native"
import moment from 'moment';
import axios from 'axios';

export default class BrandView extends React.Component {
  static navigationOptions = {
    title: null,
    headerTitle: (
      <AutoHeightImage width={75} style={{position: 'absolute', right: Platform.OS === 'android' ? 0 : -65 }} source={require('../../assets/greenlogo.png')}/>
 ),
}

      constructor(props) {
      super(props);

      this.onStarRatingPress = this.onStarRatingPress.bind(this);
      this.addBrandToFavourites = this.addBrandToFavourites.bind(this);
      this.openLikersOverlay = this.openLikersOverlay.bind(this);
      this.closeLikersOverlay = this.closeLikersOverlay.bind(this);
      this.openRegistrationOverlay = this.openRegistrationOverlay.bind(this);
      this.closeRegistrationOverlay = this.closeRegistrationOverlay.bind(this);
      this.handleRegistrationRequest = this.handleRegistrationRequest.bind(this);
      }

      state = {
          starRating: parseInt(this.props.navigation.getParam('rating', 'NO-ID')),
          starCount: 2,
          likersOverlayVisible: false,
          registrationOverlayVisible: false,
        };

      onStarRatingPress(rating) {
      this.setState({
        starCount: rating
      });
      }

      openRegistrationOverlay(){
        this.setState({
          registrationOverlayVisible: true
        })
      }

      closeRegistrationOverlay(){
        this.setState({
          registrationOverlayVisible: false
        })
      }

    handleRegistrationRequest(navigation){
      const {navigate} = navigation;

      navigate('Landing')

    }

      componentDidMount(){
        var id = this.props.navigation.getParam('brand_id', 'NO-ID');
        var token = this.props.navigation.getParam('token', 'NO-ID');
        var self = this;

        axios.get(`http://nuv-api.herokuapp.com/brands/${id}`,

     { headers: { Authorization: `${token}` }})

     .then(function(response){

       var brandItem = JSON.parse(response.request['_response'])

       self.setState({
         brandItem: brandItem,
         likedItem: brandItem.user_liked,
         likes: brandItem.likes,
         likers: brandItem.likers
       },
       function(){
         console.log("Brand item", self.state.brandItem);
       }
     )
     }).catch(function(error){
       console.log("Error: ", error);
     })
      }

      openLikersOverlay(){
        this.setState({
          likersOverlayVisible: true
        })
      }

      closeLikersOverlay(){
        this.setState({
          likersOverlayVisible: false
        })
      }

      postRating(){

        const {navigate} = this.props.navigation;


        this.setState({
          ratingPending: true
        },
        function(){

          var token = this.props.navigation.getParam('token', 'NO-ID');
          var id = this.state.brandItem.id
          console.log("Brand ID", id);
          var self = this;

        axios.post(`http://nuv-api.herokuapp.com/brands/${id}/rating`, {"rating": `${self.state.starCount}`},

     { headers: { Authorization: `${token}` }})

     .then(function(response){

       self.setState({
         ratingPending: false
       },
       function(){
         navigate('Home', {avatar: self.props.navigation.getParam('avatar', 'NO-ID'), token: self.props.navigation.getParam('token', 'NO-ID'), id: self.props.navigation.getParam('id', 'NO-ID'), name: self.props.navigation.getParam('name', 'NO-ID'), bio: self.props.navigation.getParam('bio', 'NO-ID'), location: self.props.navigation.getParam('location', 'NO-ID'), user_is_vegan: self.props.navigation.getParam('user_is_vegan', 'NO-ID')})

       }
     )
     }).catch(function(error){
       console.log("Error: ", error);
     })
   })
      }

      retrieveUploaderProfile(){
        const {navigate} = this.props.navigation;

        var id = this.state.brandItem.profile_id;
        var token = this.props.navigation.getParam('token', 'NO-ID');
        var self = this;

        axios.get(`http://nuv-api.herokuapp.com/profiles/${id}`,

     { headers: { Authorization: `${token}` }})

     .then(function(response){

       var uploaderProfile = JSON.parse(response.request['_response'])

       navigate('UserView',
       {notMyProfile: true,
          uploader: uploaderProfile,
          token: self.props.navigation.getParam('token', 'NO-ID'),
          avatar:        self.props.navigation.getParam('avatar', 'NO-ID'),
          id:            self.props.navigation.getParam('id', 'NO-ID'),
          name:          self.props.navigation.getParam('name', 'NO-ID'),
          bio:           self.props.navigation.getParam('bio', 'NO-ID'),
          location:      self.props.navigation.getParam('location', 'NO-ID'),
          user_is_vegan: self.props.navigation.getParam('user_is_vegan', 'NO-ID')
        })

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
    postLike(navigation){
      var self = this;

      if (self.state.brandItem.user_id){
      const {navigate} = navigation

        var token = navigation.getParam('token', 'NO-ID');
        var id = this.state.brandItem.id
        var self = this;

      axios.post(`http://nuv-api.herokuapp.com/brands/${id}/like`,  {"data": ""},

    { headers: { Authorization: `${token}` }})

    .then(function(response){

      var likes = self.state.likes += 1
      var currentUser = [{
                  name: navigation.getParam('name', 'NO-ID'),
                  thumbnail: navigation.getParam('avatar', 'NO-ID'),
                  profile_id: navigation.getParam('id', 'NO-ID')
                }]
      var likers = self.state.likers.concat(currentUser)

      self.setState({
        likedItem: true,
        likes: likes,
        likers: likers
      }, function(){
        Alert.alert(
               `You now like '${this.state.brandItem.title}'!`
            )
            console.log("Likers state", self.state.likers);

       console.log("Response from like post: ", response);
      })
     }
    )
    .catch(function(error){
     console.log("Error: ", error);
    })
    }
    else {
    Alert.alert(
           `This is not NüV proprietary content! You cannot like it.`
        )
    console.log("This item is not NüV proprietary content. Therefore we cannot save a like to the back end.");
    }
    }


    deleteLike(navigation){
      var self = this;

      if (self.state.brandItem.user_id){
      const {navigate} = navigation

        var token = navigation.getParam('token', 'NO-ID');
        var id = this.state.brandItem.id
        var self = this;

      axios.delete(`http://nuv-api.herokuapp.com/brands/${id}/remove_like`,

    { headers: { Authorization: `${token}` }})

    .then(function(response){

      var likes = self.state.likes -= 1
      var likers = self.state.likers.filter(liker => liker.profile_id != navigation.getParam('id', 'NO-ID'))

      self.setState({
        likedItem: false,
        likes: likes,
        likers: likers
      }, function(){
        Alert.alert(
               `You no longer like '${this.state.brandItem.title}'!`
            )

       console.log("Response from like post: ", response);
      })
     }
    )
    .catch(function(error){
     console.log("Error: ", error);
    })
    }
    else {
    Alert.alert(
           `This is not NüV proprietary content! You cannot like it.`
        )
    console.log("This item is not NüV proprietary content. Therefore we cannot save a like to the back end.");
    }
    }

  addBrandToFavourites = async() => {

    console.log("ITEM", JSON.stringify(this.props.navigation.getParam('title', 'Does not exist')));

    var self = this;

    var brand = {title: this.state.brandItem.title, id: this.state.brandItem.id}

    try {
      AsyncStorage.getItem('brand_favourites').then((brands) => {
        const brandss = brands ? JSON.parse(brands) : [];
        if (brandss.length > 0){
          var names = brandss.map((brand) => brand.id);
          if (!names.includes(brand.id)){
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

      <ScrollView
        style={{
          width: Dimensions.get('window').width*1,
          paddingLeft: Dimensions.get('window').width*0.015,
          paddingRight: Dimensions.get('window').width*0.015}}
        showsVerticalScrollIndicator={false}>

          <View style={brandViewStyle.container}>

            <View style={{marginTop: Dimensions.get('window').height*0.02}}>
            </View>

        <View
          style={{
            flex: 1,
            flexDirection: 'row'}}>
              <FaveButton
                navigation={this.props.navigation}
                handleButtonClick={() => this.props.navigation.getParam('guest', 'NO-ID') === true ? this.openRegistrationOverlay() : this.addBrandToFavourites()}/>
                { this.state.brandItem.id ? (

                <LikeButton
                navigation={this.props.navigation}
                itemAlreadyLiked={this.state.brandItem.id
                && this.state.likedItem === true ? true : false}
                handleButtonClick={() => this.props.navigation.getParam('guest', 'NO-ID') === true ? this.openRegistrationOverlay() : this.state.likedItem === true ?
                this.deleteLike(this.props.navigation)
                : this.postLike(this.props.navigation)}
                />

              ) : null }
              <AddItemButton
                navigation={this.props.navigation}
                onPress={() => this.props.navigation.getParam('guest', 'NO-ID') === true ? this.openRegistrationOverlay() : navigate('BrandForm', {
                    avatar: this.props.navigation.getParam('avatar', 'NO-ID'),
                    token: this.props.navigation.getParam('token', 'NO-ID'),
                    id: this.props.navigation.getParam('id', 'NO-ID'),
                    name: this.props.navigation.getParam('name', 'NO-ID'),
                    bio: this.props.navigation.getParam('bio', 'NO-ID'),
                    location: this.props.navigation.getParam('location', 'NO-ID'),
                    user_is_vegan: this.props.navigation.getParam('user_is_vegan', 'NO-ID')})}/>
        </View>

        <Text style={brandViewStyle.brandname}>
            {this.state.brandItem.title} ({this.state.brandItem.brand_type})
        </Text>

        <View style={{alignItems: 'center'}}>
          <Text onPress={() => this.state.likers.length === 0 ? null : this.openLikersOverlay()} style={brandViewStyle.brandreviewtitle}>
          {this.state.likes} NüV {this.state.likes === 1 ? "user" : "users"} {this.state.likes === 1 ? "likes" : "like"} this ℹ︎
          </Text>
        </View>

        <View style={brandViewStyle.mapcontainer}>
          <AutoHeightImage
            width={Dimensions.get('window').width*1}
            style={{marginTop: Dimensions.get('window').width*0.02}}
            source={{uri: this.state.brandItem.brand_main_image_location}}/>
        </View>
      </View>

    <View
      style={{
          flexDirection: 'row',
          justifyContent: 'center'}}>

          <TouchableHighlight underlayColor='white' onPress={ () => this.state.brandItem.URL ? Linking.openURL(this.state.brandItem.URL) : null }>
        <AutoHeightImage
          width={Dimensions.get('window').width*0.1}
          style={{ borderRadius: Dimensions.get('window').width*0.025, margin: Dimensions.get('window').width*0.025 }} source={require('../../assets/AppIcons/linkgreen.png')}
          />

          </TouchableHighlight>

        <TouchableHighlight underlayColor='white' onPress={() => this.retrieveUploaderProfile() }>
        <AutoHeightImage
          width={Dimensions.get('window').width*0.1}
          style={{ borderRadius: Dimensions.get('window').width*0.025, margin: Dimensions.get('window').width*0.025 }}
          source={{uri: this.state.brandItem.user_image}}/>
        </TouchableHighlight>

        <ShareButton
          marginLeft={Dimensions.get('window').width*0.07}
          shareOptions={{
          title: "Shared from NüV",
          message: `Hi, NüV user ${this.props.navigation.getParam('name', 'NO-ID')} thought you would like ${this.state.brandItem.title}, a brand uploaded by ${this.state.brandItem.user_name}. Download NüV now to see more killer posts just like this!`,
          url: this.state.brandItem.description,
          subject: "Message from NüV"
        }}
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
      <Text style={brandViewStyle.vibeHeading}>
        NuV user rating
      </Text>
      <StarRating
        disabled={false}
        maxStars={5}
        rating={parseInt(this.state.brandItem.rating)}
        fullStarColor={'#a2e444'}
        containerStyle={{marginBottom: Dimensions.get('window').height*0.02}}
        />
    </View>

    <Comments

   item_id={this.state.brandItem.id}
   item_type="brands"
   token={this.props.navigation.getParam('token', 'NO-ID')}
   active_user={this.props.navigation.getParam('name', 'NO-ID')}
    />

      <View style={{
        alignItems: 'center',
        marginTop: Dimensions.get('window').height*0.005,
        width: Dimensions.get('window').width*1}}>
          <Text style={brandViewStyle.vibeHeading}>
            Rate this brand
          </Text>
      <StarRating
        disabled={false}
        maxStars={5}
        rating={this.state.starCount}
        selectedStar={(rating) => this.onStarRatingPress(rating)}
        fullStarColor={'#a2e444'}
        containerStyle={{marginTop: Dimensions.get('window').height*0.02, marginBottom: Dimensions.get('window').height*0.02}}
        />
      </View>

      <View style={brandViewStyle.submitContainer}>
        <GlobalButton
           buttonTitle="Rate & Home"
           onPress={ () => this.props.navigation.getParam('guest', 'NO-ID') === true ? this.openRegistrationOverlay() : this.postRating() }/>
        </View>

        <LikersOverlay
              likers={this.state.likers}
              overlayVisible={this.state.likersOverlayVisible}
              closeOverlay={this.closeLikersOverlay}
              currentUser={this.props.navigation.getParam('id', 'NO-ID')}
              navigation={this.props.navigation}
        />

        {this.state.registrationOverlayVisible ? (
        <GuestRegistrationOffer
        openOverlay    = {this.openRegistrationOverlay}
        handleRegistrationRequest   = {this.handleRegistrationRequest}
        navigation =                  {this.props.navigation}
        closeRegistrationOverlay   = {this.closeRegistrationOverlay}
        overlayVisible = {this.state.registrationOverlayVisible}
      />
      ) : null}

    </ScrollView>

  ) : <LoadingCelery />

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
    color: '#a2e444',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
  },
  brandreviewtitle: {
    color: '#a2e444',
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
  color: '#a2e444',
  marginTop: Dimensions.get('window').height*0.03
  },
  submitContainer: {
    alignItems: 'center',
    marginTop: Dimensions.get('window').height*0.03,
    marginBottom: Platform.OS === 'ios' ? Dimensions.get('window').height*0.15 : Dimensions.get('window').height*0.15
  },
  });
