import    React, {
          Component,
          Fragment } from 'react'
import {  StyleSheet,
          Platform,
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
import * as Badges from '../../helper_functions/Badges.js';
import    StickyHeaderFooterScrollView from 'react-native-sticky-header-footer-scroll-view';

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
      }

    state = {
      image: null,
      overlayVisible: false
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

          navigate('Landing', {
            token:         this.props.navigation.getParam('token', 'NO-ID'),
            id:            this.props.navigation.getParam('id', 'NO-ID'),
            name:          this.props.navigation.getParam('name', 'NO-ID'),
            bio:           this.props.navigation.getParam('bio', 'NO-ID'),
            location:      this.props.navigation.getParam('location', 'NO-ID'),
            user_is_vegan: this.props.navigation.getParam('user_is_vegan', 'NO-ID')})
        }
      })
    }

    handleLogOut(){
      this.closeOverlay(true)
    }

  render() {
    const {navigate} = this.props.navigation;

    return (
      <View style={userViewStyle.container}>

      <StickyHeaderFooterScrollView
        makeScrollable={true}
        showVerticalScrollIndicator={false}
        renderStickyHeader={() => ( <View></View> )}
        renderStickyFooter={() => (
          <View style={{alignItems: 'center'}}>
          {  this.props.navigation.getParam('notMyProfile', 'NO-ID') != true ? (

            <NavBar navigation={this.props.navigation} />

          ) : null }
          </View>
        )}
        >
    <View style={userViewStyle.flexRowContainer}>
      <View style={{flexDirection: 'column'}}>
      <View style={{paddingLeft: Dimensions.get('window').width* 0.025}}>
        <Text style={userViewStyle.profileItemName}>
          {this.props.navigation.getParam('notMyProfile', 'NO-ID') != true ?  this.props.navigation.getParam('name', 'NO-ID') : this.props.navigation.getParam('uploader', 'NO-ID').name}
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
      <Text style={userViewStyle.profileItemBio}>
        Bio: {this.props.navigation.getParam('bio', 'NO-ID')}
      </Text>

      {  this.props.navigation.getParam('notMyProfile', 'NO-ID') != true ? (

  <View style={userViewStyle.editButtonContainer}>
    <GlobalButton
      onPress={() => navigate('EditUser', {
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

    { this.props.navigation.getParam('settings', 'NO-ID') && this.props.navigation.getParam('settings', 'NO-ID') === true && this.props.navigation.getParam('notMyProfile', 'NO-ID') != true ? (

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
        onPress={() => navigate('RecipeList', {
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
        onPress={() => navigate('VenueList', {
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
      onPress={() => navigate('BrandList', {
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
      onPress={() => navigate('MediaList', {
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
