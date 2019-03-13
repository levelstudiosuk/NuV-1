import    React, {
          Component,
          Fragment } from 'react'
import {  StyleSheet,
          Platform,
          Alert,
          TouchableHighlight,
          ScrollView,
          Dimensions,
          Button,
          Text,
          View,
          Image} from 'react-native';
import {  Constants } from 'expo'
import * as TimeGreeting from '../../helper_functions/TimeGreeting.js';
import    NavBar from '../../components/NavBar.js';
import    AutoHeightImage from 'react-native-auto-height-image';
import    GlobalButton from '../../components/GlobalButton.js';
import    LogOut from '../../components/LogOut.js';
import    axios from 'axios';
import * as Badges from '../../helper_functions/Badges.js';
import    StickyHeaderFooterScrollView from 'react-native-sticky-header-footer-scroll-view';
import    MapSettingsOverlay from '../../components/MapSettingsOverlay.js';

export default class UserView extends React.Component {
  static navigationOptions = {
    title: null,
    headerTitle: (
      <AutoHeightImage
        width={75}
        style={{
          position: 'absolute',
          right: Platform.OS === 'android' ? 0 : -65 }}
          source={require('../../assets/greenlogo.png')}
      />
    ),
}

  constructor(props) {
    super(props);
      this.openOverlay = this.openOverlay.bind(this);
      this.closeOverlay = this.closeOverlay.bind(this);
      this.openMapOverlay = this.openMapOverlay.bind(this);
      this.closeMapOverlay = this.closeMapOverlay.bind(this);
      this.launchMap = this.launchMap.bind(this);
      }

    state = {
      image: null,
      overlayVisible: false,
      mapOverlayVisible: false
      };

    returnStatus(status){
      if (status === "vegan"){
       return "Vegan";
      }
      else if (status === "vegetarian"){
       return "Vegetarian";
      }
      else {
       return "vCurious";
        }
      }

      openMapOverlay(){
        this.setState({
          mapOverlayVisible: true
        })
      }

      closeMapOverlay(){
        this.setState({
          mapOverlayVisible: false
        })
      }

    getLocation(location){
      if (Dimensions.get('window').width < 500 && location.length > 14){
        return location.substring(0, 14) + '...'
      }
      else if (Dimensions.get('window').width > 750 && location.length > 23){
        return location.substring(0, 23) + '...'
      }
      else {
        return location;
      }
    }

    openOverlay(){
      this.setState({
        overlayVisible: true
      })
    }

    closeOverlay(loggingOut){
      this.setState({
        overlayVisible: false
      }, function(){
        if (loggingOut === true){
          const {navigate} = this.props.navigation;

          this.deleteUser()
        }
      })
    }

    deleteUser(){
      const {navigate} = this.props.navigation;

      var self = this;
      var token = this.props.navigation.getParam('token', 'NO-ID');
      var id = this.props.navigation.getParam('id', 'NO-ID');
      var user_id = this.props.navigation.getParam('user_id', 'NO-ID');

      axios.delete(`http://nuv-api.herokuapp.com/profiles/${id}`,

    { headers: { Authorization: `${token}` }})

    .then(function(response){

       console.log("Response from delete profile: ", response);

       navigate('Landing', {
         token:         self.props.navigation.getParam('token', 'NO-ID'),
         id:            self.props.navigation.getParam('id', 'NO-ID'),
         name:          self.props.navigation.getParam('name', 'NO-ID'),
         bio:           self.props.navigation.getParam('bio', 'NO-ID'),
         location:      self.props.navigation.getParam('location', 'NO-ID'),
         user_is_vegan: self.props.navigation.getParam('user_is_vegan', 'NO-ID')})
      })
    .catch(function(error){
     console.log("Error: ", error);
    })
    }

    handleLogOut(){
      this.closeOverlay(true)
    }

    launchMap(navigation, distance, vegan){
      var self = this;
      const {navigate} = navigation

      this.setState({
        mapOverlayVisible: false
      }, function(){

        navigate('Map', {
          user_id: navigation.getParam('user_id', 'NO-ID'),
          settings: true,
          avatar: navigation.getParam('avatar', 'NO-ID'),
          token: navigation.getParam('token', 'NO-ID'),
          id: navigation.getParam('id', 'NO-ID'),
          name: navigation.getParam('name', 'NO-ID'),
          bio: navigation.getParam('bio', 'NO-ID'),
          location: navigation.getParam('location', 'NO-ID'),
          user_is_vegan: navigation.getParam('user_is_vegan', 'NO-ID'),
          distance: distance,
          latitude: navigation.getParam('latitude', 'NO-ID'),
          longitude: navigation.getParam('longitude', 'NO-ID'),
          see_only_vegan: vegan
      }
    )
    }
  )
  }

  treatShortNames(name){
    var length = name.length
    switch(length) {
      case 1: return  `${name}          `
      case 2: return  `${name}         `
      case 3: return  `${name}        `
      case 4: return  `${name}       `
      case 5: return  `${name}      `
      case 6: return  `${name}     `
      case 7: return  `${name}    `
      case 8: return  `${name}   `
      case 9: return  `${name}  `
      default: return name
      }
  }

  render() {
    const {navigate} = this.props.navigation;

    return (
      <View style={userViewStyle.container}>

      <StickyHeaderFooterScrollView
        makeScrollable={true}
        showsVerticalScrollIndicator={false}
        renderStickyHeader={() => ( <View></View> )}
        renderStickyFooter={() => (
          <View style={{alignItems: 'center'}}>
          {  this.props.navigation.getParam('notMyProfile', 'NO-ID') != true && Platform.OS === "ios" ? (

            <NavBar navigation={this.props.navigation} openOverlay={this.openMapOverlay} />

          ) : null }
          </View>
        )}
        >
    <View style={userViewStyle.flexRowContainer}>
      <View style={{flexDirection: 'column'}}>
      <View style={{paddingLeft: Dimensions.get('window').width* 0.025}}>
        <Text style={userViewStyle.profileItemName}>
          {this.props.navigation.getParam('notMyProfile', 'NO-ID') != true ?  this.treatShortNames(this.props.navigation.getParam('name', 'NO-ID')) : this.treatShortNames(this.props.navigation.getParam('uploader', 'NO-ID').name)}
        </Text>
      </View>

      <View style={{paddingLeft: Dimensions.get('window').width* 0.025}}>
        <Text style={userViewStyle.profileItemHomeTown}>
          {this.props.navigation.getParam('notMyProfile', 'NO-ID') != true ? this.getLocation(this.props.navigation.getParam('location', 'NO-ID')) : this.getLocation(this.props.navigation.getParam('uploader', 'NO-ID').location)}
        </Text>
      </View>
      <View style={{paddingLeft: Dimensions.get('window').width* 0.025}}>
        <Image
          style={{width: 90, height: 90}}
          source= {
          this.props.navigation.getParam('notMyProfile', 'NO-ID') != true ?
          Badges.getDietBadge (this.returnStatus(this.props.navigation.getParam('user_is_vegan', 'NO-ID')))
          : Badges.getDietBadge (this.returnStatus(this.props.navigation.getParam('uploader', 'NO-ID').user_is_vegan))
      }
        />
        </View>
    </View>

    {  this.props.navigation.getParam('notMyProfile', 'NO-ID') != true ? (

    <AutoHeightImage
      onLoad={this.setAvatarAsLoaded}
      width={Dimensions.get('window').width*0.5}
      style={{
        borderRadius:   4,
        borderWidth:    3,
        borderColor:    '#a2e444',
        borderRadius:   Dimensions.get('window').width*0.25,
        marginTop:      Dimensions.get('window').height*0.05
        }}
      source={{
        uri: this.props.navigation.getParam('avatar', 'NO-ID') ? this.props.navigation.getParam('avatar', 'NO-ID') : 'http://khoshamoz.ir/img/SiteGeneralImg/unknown_user_comments.png'}}
    />

  ) :

  <AutoHeightImage
    onLoad={this.setAvatarAsLoaded}
    width={Dimensions.get('window').width*0.5}
    style={{
      borderRadius:   4,
      borderWidth:    3,
      borderColor:    '#a2e444',
      borderRadius:   Dimensions.get('window').width*0.25,
      marginTop:      Dimensions.get('window').height*0.05
      }}
    source={{
      uri: this.props.navigation.getParam('uploader', 'NO-ID').avatar.url ? this.props.navigation.getParam('uploader', 'NO-ID').avatar.url : 'http://khoshamoz.ir/img/SiteGeneralImg/unknown_user_comments.png'}}
  />

}

    </View>

    <MapSettingsOverlay
     navigation     = {this.props.navigation}
     launchMap      = {this.launchMap}
     openOverlay    = {this.openMapOverlay}
     closeOverlay   = {this.closeMapOverlay}
     overlayVisible = {this.state.mapOverlayVisible}
     />

    {  this.props.navigation.getParam('notMyProfile', 'NO-ID') != true ? (

      <Text style={userViewStyle.profileItemBio}>
        Bio: {this.props.navigation.getParam('bio', 'NO-ID')}
      </Text>

    ) :

    <Text style={userViewStyle.profileItemBio}>
      Bio: {this.props.navigation.getParam('uploader', 'NO-ID').bio}
    </Text>

  }

      {  this.props.navigation.getParam('notMyProfile', 'NO-ID') != true ? (

  <View style={userViewStyle.editButtonContainer}>
    <GlobalButton
      onPress={() => this.props.navigation.getParam('guest', 'NO-ID') === true ?
           Alert.alert(
                 "You cannot edit your NüV profile if you are not registered"
              )
          : navigate('EditUser', {
        token:         this.props.navigation.getParam('token', 'NO-ID'),
        id:            this.props.navigation.getParam('id', 'NO-ID'),
        name:          this.props.navigation.getParam('name', 'NO-ID'),
        bio:           this.props.navigation.getParam('bio', 'NO-ID'),
        location:      this.props.navigation.getParam('location', 'NO-ID'),
        user_is_vegan: this.props.navigation.getParam('user_is_vegan', 'NO-ID')})}
      buttonTitle={"Edit profile"}
    />
  </View>

) : null

}

    { this.props.navigation.getParam('notMyProfile', 'NO-ID') != true ? (

      <LogOut
        openOverlay    = {this.openOverlay}
        handleLogOut   = {this.handleLogOut}
        closeOverlay   = {this.closeOverlay}
        overlayVisible = {this.state.overlayVisible}
      />

  ) : null }


      {  this.props.navigation.getParam('notMyProfile', 'NO-ID') != true ? (

    <Text style={{
      textAlign: 'center',
      fontSize: 20,
      fontWeight: 'bold',
      color: '#696969',
      marginTop: Dimensions.get('window').height*0.03,
      marginBottom: Dimensions.get('window').height*0.015}}
    >
      Your NüV Contributions
    </Text>

  ) :

  <Text style={{
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#696969',
    marginTop: Dimensions.get('window').height*0.03,
    marginBottom: Dimensions.get('window').height*0.015}}
  >
    NüV Contributions from {`${this.props.navigation.getParam('uploader', 'NO-ID').name}`}
  </Text>

}

    <View style={userViewStyle.iconsContainer}>

      <GlobalButton
        marginLeft={Dimensions.get('window').width*0.12}
        onPress={() => this.props.navigation.getParam('recipes', 'NO-ID') === 0 ? Alert.alert(
               `${this.props.navigation.getParam('uploader', 'NO-ID').name} has not posted any recipes yet`
            ) : navigate('RecipeList', {
          user_id: this.props.navigation.getParam('notMyProfile', 'NO-ID') != true ? this.props.navigation.getParam('user_id', 'NO-ID') : this.props.navigation.getParam('uploader', 'NO_ID').id,
            user: true,
            viewingAnotherUser: this.props.navigation.getParam('notMyProfile', 'NO-ID') != true ? false : true,
            uploader: this.props.navigation.getParam('notMyProfile', 'NO-ID') != true ? null : this.props.navigation.getParam('uploader', 'NO-ID'),
            avatar: this.props.navigation.getParam('avatar', 'NO-ID'),
            token: this.props.navigation.getParam('token', 'NO-ID'),
            id: this.props.navigation.getParam('id', 'NO-ID'),
            name: this.props.navigation.getParam('name', 'NO-ID'),
            bio: this.props.navigation.getParam('bio', 'NO-ID'),
            location: this.props.navigation.getParam('location', 'NO-ID'),
            user_is_vegan: this.props.navigation.getParam('user_is_vegan', 'NO-ID')})}
          buttonTitle={"Recipes"}
        />
      <GlobalButton
        marginRight={Dimensions.get('window').width*0.12}
        onPress={() => this.props.navigation.getParam('venues', 'NO-ID') === 0 ? Alert.alert(
               `${this.props.navigation.getParam('uploader', 'NO-ID').name} has not posted any venues yet`
            ) : navigate('VenueList', {
          user_id: this.props.navigation.getParam('notMyProfile', 'NO-ID') != true ? this.props.navigation.getParam('user_id', 'NO-ID') : this.props.navigation.getParam('uploader', 'NO_ID').id,
          user: true, avatar: this.props.navigation.getParam('avatar', 'NO-ID'),
          viewingAnotherUser: this.props.navigation.getParam('notMyProfile', 'NO-ID') != true ? false : true,
          uploader: this.props.navigation.getParam('notMyProfile', 'NO-ID') != true ? null : this.props.navigation.getParam('uploader', 'NO-ID'),
          token: this.props.navigation.getParam('token', 'NO-ID'),
          id: this.props.navigation.getParam('id', 'NO-ID'),
          name: this.props.navigation.getParam('name', 'NO-ID'),
          bio: this.props.navigation.getParam('bio', 'NO-ID'),
          location: this.props.navigation.getParam('location', 'NO-ID'),
          user_is_vegan: this.props.navigation.getParam('user_is_vegan', 'NO-ID')})}
        buttonTitle={"Eateries"}
        />
      </View>

    <View style={userViewStyle.iconsContainer2}>

    <GlobalButton
      marginLeft={Dimensions.get('window').width*0.12}
      onPress={() => this.props.navigation.getParam('brands', 'NO-ID') === 0 ? Alert.alert(
             `${this.props.navigation.getParam('uploader', 'NO-ID').name} has not posted any brands yet`
          ) : navigate('BrandList', {
        user_id: this.props.navigation.getParam('notMyProfile', 'NO-ID') != true ? this.props.navigation.getParam('user_id', 'NO-ID') : this.props.navigation.getParam('uploader', 'NO_ID').id,
        user: true,
        viewingAnotherUser: this.props.navigation.getParam('notMyProfile', 'NO-ID') != true ? false : true,
        uploader: this.props.navigation.getParam('notMyProfile', 'NO-ID') != true ? null : this.props.navigation.getParam('uploader', 'NO-ID'),
        avatar: this.props.navigation.getParam('avatar', 'NO-ID'),
        token: this.props.navigation.getParam('token', 'NO-ID'),
        id: this.props.navigation.getParam('id', 'NO-ID'),
        name: this.props.navigation.getParam('name', 'NO-ID'),
        bio: this.props.navigation.getParam('bio', 'NO-ID'),
        location: this.props.navigation.getParam('location', 'NO-ID'),
        user_is_vegan: this.props.navigation.getParam('user_is_vegan', 'NO-ID')})}
      buttonTitle={"Brands"}
    />
    <GlobalButton
      marginRight={Dimensions.get('window').width*0.12}
      onPress={() => this.props.navigation.getParam('media', 'NO-ID') === 0 ? Alert.alert(
             `${this.props.navigation.getParam('uploader', 'NO-ID').name} has not posted any media items yet`
          ) : navigate('MediaList', {
        user_id: this.props.navigation.getParam('notMyProfile', 'NO-ID') != true ? this.props.navigation.getParam('user_id', 'NO-ID') : this.props.navigation.getParam('uploader', 'NO_ID').id,
        user: true,
        viewingAnotherUser: this.props.navigation.getParam('notMyProfile', 'NO-ID') != true ? false : true,
        uploader: this.props.navigation.getParam('notMyProfile', 'NO-ID') != true ? null : this.props.navigation.getParam('uploader', 'NO-ID'),
        avatar: this.props.navigation.getParam('avatar', 'NO-ID'),
        token: this.props.navigation.getParam('token', 'NO-ID'),
        id: this.props.navigation.getParam('id', 'NO-ID'),
        name: this.props.navigation.getParam('name', 'NO-ID'),
        bio: this.props.navigation.getParam('bio', 'NO-ID'),
        location: this.props.navigation.getParam('location', 'NO-ID'),
        user_is_vegan: this.props.navigation.getParam('user_is_vegan', 'NO-ID')})}
      buttonTitle={"Media"}
    />
  </View>
</StickyHeaderFooterScrollView>
{
  Platform.OS === "android" ? (
    <NavBar
      navigation={this.props.navigation}
      openOverlay={this.openMapOverlay}
      attributes={{
        token:         this.props.navigation.getParam('token', 'NO-ID'),
        id:            this.props.navigation.getParam('id', 'NO-ID'),
        name:          this.props.navigation.getParam('name', 'NO-ID'),
        bio:           this.props.navigation.getParam('bio', 'NO-ID'),
        location:      this.props.navigation.getParam('location', 'NO-ID'),
        user_is_vegan: this.props.navigation.getParam('user_is_vegan', 'NO-ID')}}
    />
) :
  null
}
</View>
    );
  }
}

const userViewStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileItemName: {
    fontSize: Dimensions.get('window').width>750 ? 28 : 20 ,
    color: '#696969',
    fontWeight: 'bold',
  },
  profileItemHomeTown: {
    fontSize: Dimensions.get('window').width>750 ? 28 : 20 ,
    color: '#696969'
  },
  profileItemBadge: {
    fontSize: Dimensions.get('window').width>750 ? 24 : 16 ,
    color: '#696969'
  },
  profileItemBio: {
    fontSize: Dimensions.get('window').width>750 ? 24 : 16 ,
    color: '#696969',
    padding: Dimensions.get('window').width* 0.025,
    textAlign: 'center',
    marginTop: Dimensions.get('window').height*0.02,
    marginBottom: Dimensions.get('window').height*0.01
  },
  iconsContainer: {
    width: Dimensions.get('window').width,
    marginLeft: 0,
    marginTop: Dimensions.get('window').height*0.025,
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  iconsContainer2: {
    width: Dimensions.get('window').width,
    marginLeft: 0,
    marginTop: Dimensions.get('window').height*0.025,
    marginBottom: Dimensions.get('window').height*0.25,
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  flexRowContainer: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  editButtonContainer: {
    alignItems: 'center'
  },
  buttonContainer: {
    marginBottom: Dimensions.get('window').height*0.01,
    marginTop: Dimensions.get('window').height*0.05,
    alignItems: 'center',
  },
  greetingContainer: {
    marginBottom: Dimensions.get('window').height*0.01,
    marginTop: Dimensions.get('window').height*0.02,
    alignItems: 'center',
    backgroundColor: 'white',
    height: Dimensions.get('window').height*0.03
  }
});
