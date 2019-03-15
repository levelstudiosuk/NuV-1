import    React from 'react';
import {  StyleSheet,
          Platform,
          TouchableHighlight,
          ScrollView,
          Dimensions,
          Button,
          Text,
          View,
          Alert,
          Image } from 'react-native';
import {  Constants } from 'expo'
import * as TimeGreeting from '../../helper_functions/TimeGreeting.js';
import    NavBar from '../../components/NavBar.js';
import    AutoHeightImage from 'react-native-auto-height-image';
import    GlobalButton from '../../components/GlobalButton.js';
import    GuestRegistrationOffer from '../../components/GuestRegistrationOffer.js';
import    LoadingCelery from '../../components/LoadingCelery.js';
import    MapSettingsOverlay from '../../components/MapSettingsOverlay.js';
import    VenueSettingsOverlay from '../../components/VenueSettingsOverlay.js';
import    StickyHeaderFooterScrollView from 'react-native-sticky-header-footer-scroll-view';
import * as Animatable from 'react-native-animatable';
import {  BallIndicator,
          BarIndicator,
          DotIndicator,
          WaveIndicator } from 'react-native-indicators';
import * as Badges from '../../helper_functions/Badges.js';
import   AddItemButton from '../../components/AddItemButton.js';
import    AddItemOverlay from '../../components/AddItemOverlay.js';

export default class Home extends React.Component {
  static navigationOptions = {
    title: null,
    headerTitle: (
      <AutoHeightImage
        width  = {75}
        style  = {{position: 'absolute', right: Platform.OS === 'android' ? 0 : -65 }}
        source={require('../../assets/greenlogo.png')}
      />
      ),
    }

  constructor(props) {
    super(props);
      this.setAvatarAsLoaded = this.setAvatarAsLoaded.bind(this);
      this.openOverlay       = this.openOverlay.bind(this);
      this.closeOverlay      = this.closeOverlay.bind(this);
      this.launchMap         = this.launchMap.bind(this);
      this.openVenueOverlay  = this.openVenueOverlay.bind(this);
      this.closeVenueOverlay = this.closeVenueOverlay.bind(this);
      this.launchVenueSearch = this.launchVenueSearch.bind(this);
      this.openAddItemOverlay = this.openAddItemOverlay.bind(this);
      this.closeAddItemOverlay = this.closeAddItemOverlay.bind(this);
      this.openRecipeForm = this.openRecipeForm.bind(this);
      this.openVenueForm = this.openVenueForm.bind(this);
      this.openBrandForm = this.openBrandForm.bind(this);
      this.openMediaForm = this.openMediaForm.bind(this);
      this.processLocationInfo = this.processLocationInfo.bind(this);
      this.openRegistrationOverlay = this.openRegistrationOverlay.bind(this);
      this.closeRegistrationOverlay = this.closeRegistrationOverlay.bind(this);
      this.handleRegistrationRequest = this.handleRegistrationRequest.bind(this);
     }

  state = {
    avatarLoading       : true,
    overlayVisible      : false,
    venueOverlayVisible : false,
    addItemOverlayVisible: false,
    registrationOverlayVisible: false,
  };

  componentDidMount(){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.processLocationInfo, this.handleLocationError);
      }
    }

  processLocationInfo(position) {
      const myLocation = JSON.stringify(position);

      this.setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
        }, function(){
          console.log("My position: ", this.state.latitude, this.state.longitude)
        });
    }

    handleLocationError(error) {
      Alert.alert(error.message),
    { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 }
    }

  openOverlay(){
    this.setState({
      overlayVisible: true
    })
  }

  closeOverlay(){
    this.setState({
      overlayVisible: false
    })
  }

  openAddItemOverlay(){
    this.setState({
      addItemOverlayVisible: true
    })
  }

  closeAddItemOverlay(){
    this.setState({
      addItemOverlayVisible: false
    })
  }

  openVenueOverlay(){
    this.setState({
      venueOverlayVisible: true
    })
  }

  closeVenueOverlay(){
    this.setState({
      venueOverlayVisible: false
    })
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

  openRecipeForm(){
    const {navigate} = this.props.navigation;

    this.setState({
      addItemOverlayVisible: false
    }, function(){
      navigate('RecipeForm', {
         avatar: this.props.navigation.getParam('avatar', 'NO-ID'),
         token: this.props.navigation.getParam('token', 'NO-ID'),
         id: this.props.navigation.getParam('id', 'NO-ID'),
         name: this.props.navigation.getParam('name', 'NO-ID'),
         bio: this.props.navigation.getParam('bio', 'NO-ID'),
         location: this.props.navigation.getParam('location', 'NO-ID'),
         admin: this.props.navigation.getParam('admin', 'NO-ID'),
         user_is_vegan: this.props.navigation.getParam('user_is_vegan', 'NO-ID')})
    })
  }

  openVenueForm(){
    const {navigate} = this.props.navigation;

    this.setState({
      addItemOverlayVisible: false
    }, function(){
      navigate('VenueForm', {
         avatar: this.props.navigation.getParam('avatar', 'NO-ID'),
         token: this.props.navigation.getParam('token', 'NO-ID'),
         id: this.props.navigation.getParam('id', 'NO-ID'),
         name: this.props.navigation.getParam('name', 'NO-ID'),
         bio: this.props.navigation.getParam('bio', 'NO-ID'),
         location: this.props.navigation.getParam('location', 'NO-ID'),
         admin: this.props.navigation.getParam('admin', 'NO-ID'),
         user_is_vegan: this.props.navigation.getParam('user_is_vegan', 'NO-ID')})
    })
  }

  openBrandForm(){
    const {navigate} = this.props.navigation;

    this.setState({
      addItemOverlayVisible: false
    }, function(){
      navigate('BrandForm', {
         avatar: this.props.navigation.getParam('avatar', 'NO-ID'),
         token: this.props.navigation.getParam('token', 'NO-ID'),
         id: this.props.navigation.getParam('id', 'NO-ID'),
         name: this.props.navigation.getParam('name', 'NO-ID'),
         bio: this.props.navigation.getParam('bio', 'NO-ID'),
         location: this.props.navigation.getParam('location', 'NO-ID'),
         admin: this.props.navigation.getParam('admin', 'NO-ID'),
         user_is_vegan: this.props.navigation.getParam('user_is_vegan', 'NO-ID')})
    })
  }

  openMediaForm(){
    const {navigate} = this.props.navigation;

    this.setState({
      addItemOverlayVisible: false
    }, function(){
      navigate('MediaForm', {
         avatar: this.props.navigation.getParam('avatar', 'NO-ID'),
         token: this.props.navigation.getParam('token', 'NO-ID'),
         id: this.props.navigation.getParam('id', 'NO-ID'),
         name: this.props.navigation.getParam('name', 'NO-ID'),
         bio: this.props.navigation.getParam('bio', 'NO-ID'),
         location: this.props.navigation.getParam('location', 'NO-ID'),
         admin: this.props.navigation.getParam('admin', 'NO-ID'),
         user_is_vegan: this.props.navigation.getParam('user_is_vegan', 'NO-ID')})
    })
  }

  returnStatus(){
    if (this.props.navigation.getParam('user_is_vegan', 'NO-ID') === "vegan"){
     return "Vegan";
    }
    else if (this.props.navigation.getParam('user_is_vegan', 'NO-ID') === "vegetarian"){
     return "Vegetarian";
    }
    else {
     return "vCurious";
      }
    }

  launchMap(navigation, distance, vegan, latitude, longitude, searchedLocation){
    var self = this;
    const {navigate} = navigation

    this.setState({
      overlayVisible: false
    }, function(){
      console.log("Latitude: ", latitude ? latitude : this.state.latitude);
      console.log("Longitude: ", longitude ? longitude : this.state.longitude);
      navigate('Map', {
        guest: this.props.navigation.getParam('guest', 'NO-ID'),
        user_id: navigation.getParam('user_id', 'NO-ID'),
        settings: true,
        avatar: navigation.getParam('avatar', 'NO-ID'),
        token: navigation.getParam('token', 'NO-ID'),
        profile_id: navigation.getParam('id', 'NO-ID'),
        name: navigation.getParam('name', 'NO-ID'),
        bio: navigation.getParam('bio', 'NO-ID'),
        location: navigation.getParam('location', 'NO-ID'),
        user_is_vegan: navigation.getParam('user_is_vegan', 'NO-ID'),
        admin: navigation.getParam('admin', 'NO-ID'),
        distance: distance,
        latitude: latitude ? latitude : this.state.latitude,
        longitude: longitude ? longitude : this.state.longitude,
        see_only_vegan: vegan,
        searchedLocation: searchedLocation === true ? true : false
    }
  )
  }
)
}

  launchVenueSearch(navigation, distance, latitude, longitude, searchedLocation){
    var self         = this;
    const {navigate} = navigation
    var distance     = distance;

    this.setState({
      venueOverlayVisible: false
    }, function(){

      navigate('VenueList', {
        guest:         this.props.navigation.getParam('guest', 'NO-ID'),
        user_id:       navigation.getParam('user_id', 'NO-ID'),
        settings:       true,
        avatar:        navigation.getParam('avatar', 'NO-ID'),
        token:         navigation.getParam('token', 'NO-ID'),
        id:            navigation.getParam('id', 'NO-ID'),
        name:          navigation.getParam('name', 'NO-ID'),
        bio:           navigation.getParam('bio', 'NO-ID'),
        location:      navigation.getParam('location', 'NO-ID'),
        admin:         navigation.getParam('admin', 'NO-ID'),
        user_is_vegan: navigation.getParam('user_is_vegan', 'NO-ID'),
        distance:      distance,
        latitude: latitude ? latitude : this.state.latitude,
        longitude: longitude ? longitude : this.state.longitude,
        searchedLocation: searchedLocation === true ? true : false
      })
    }
   )
  }

  profileAvatarUri(){
    return this.state.imageSource;
  }

  setAvatarAsLoaded(){
    this.setState({
      avatarLoading: false
    })
  }

  getPortraitSize(){
    return Dimensions.get('window').width < 750 ? Dimensions.get('window').width*0.45 : Dimensions.get('window').width*0.4
  }

render() {
  const {navigate} = this.props.navigation;

  return (

      <View style={homeStyle.container}>

       { Platform.OS === 'ios' ? (

      <StickyHeaderFooterScrollView
        makeScrollable={true}
        showsVerticalScrollIndicator={false}
        renderStickyHeader={() => ( <View></View> )}
        renderStickyFooter={() => (

      <TouchableHighlight style={{alignItems: 'center'}}>
        { this.state.avatarLoading === false ? (
          <NavBar
            navigation={     this.props.navigation}
            openOverlay={    this.openOverlay}
            attributes={{
              guest:         this.props.navigation.getParam('guest', 'NO-ID'),
              token:         this.props.navigation.getParam('token', 'NO-ID'),
              id:            this.props.navigation.getParam('id', 'NO-ID'),
              name:          this.props.navigation.getParam('name', 'NO-ID'),
              bio:           this.props.navigation.getParam('bio', 'NO-ID'),
              location:      this.props.navigation.getParam('location', 'NO-ID'),
              user_is_vegan: this.props.navigation.getParam('user_is_vegan', 'NO-ID')}}
           />
        ) : <View></View>
      }
        </TouchableHighlight>
      )}
    >

    <View style={homeStyle.button2Container}>
      <TouchableHighlight
        underlayColor="white"
        onPress={() => navigate('UserView', {
          guest:         this.props.navigation.getParam('guest', 'NO-ID'),
          user_id:       this.props.navigation.getParam('user_id', 'NO-ID'),
          avatar:        this.props.navigation.getParam('avatar', 'NO-ID'),
          token:         this.props.navigation.getParam('token', 'NO-ID'),
          id:            this.props.navigation.getParam('id', 'NO-ID'),
          name:          this.props.navigation.getParam('name', 'NO-ID'),
          bio:           this.props.navigation.getParam('bio', 'NO-ID'),
          location:      this.props.navigation.getParam('location', 'NO-ID'),
          user_is_vegan: this.props.navigation.getParam('user_is_vegan', 'NO-ID'),
          latitude: this.state.latitude ? this.state.latitude : 55.9497,
          longitude: this.state.longitude ? this.state.longitude : -3.1811
        })
          }
        style={{width: Dimensions.get('window').width}}>


      <Animatable.View
        animation="pulse"
        iterationDelay={2000}
        duration={1000}
        iterationCount="infinite"
        direction="alternate"
        style={{flex: 1, flexDirection: 'column', alignItems: 'center'}}
      >
          <AutoHeightImage
            onLoad={this.setAvatarAsLoaded}
            width={this.state.avatarLoading === false ? this.getPortraitSize() : 1}
            style={{
              borderWidth: 3,
              borderColor: '#a2e444',
              borderRadius: Dimensions.get('window').width < 750 ? Dimensions.get('window').width*0.225 : Dimensions.get('window').width*0.2,
              marginTop: Dimensions.get('window').height*0.02
              }}
            source={{uri: this.props.navigation.getParam('avatar', 'NO-ID') ? this.props.navigation.getParam('avatar', 'NO-ID') : 'http://khoshamoz.ir/img/SiteGeneralImg/unknown_user_comments.png'}}
          />
        </Animatable.View>
    </TouchableHighlight>

    { this.state.avatarLoading === false ? (

    <View
      style={{
        marginTop:Dimensions.get('window').height* 0.02}}>
      <Image
        style={{width: 60, height: 60}}
        source= {Badges.getDietBadge (this.returnStatus())}
      />
    </View>

  ) : null

}

    <MapSettingsOverlay
      navigation    = {this.props.navigation}
      launchMap     = {this.launchMap}
      openOverlay   = {this.openOverlay}
      closeOverlay  = {this.closeOverlay}
      overlayVisible= {this.state.overlayVisible}
    />
    <VenueSettingsOverlay
      navigation        = {this.props.navigation}
      launchVenueSearch = {this.launchVenueSearch}
      openOverlay       = {this.openVenueOverlay}
      closeOverlay      = {this.closeVenueOverlay}
      overlayVisible    = {this.state.venueOverlayVisible}
    />
    <AddItemOverlay
     navigation={this.props.navigation}
     openOverlay={this.openAddItemOverlay}
     closeOverlay={this.closeAddItemOverlay}
     overlayVisible={this.state.addItemOverlayVisible}
     openRecipeForm={this.openRecipeForm}
     openVenueForm={this.openVenueForm}
     openBrandForm={this.openBrandForm}
     openMediaForm={this.openMediaForm}
    />

    {
      this.state.avatarLoading === false ? (
        null
  ) :
    <LoadingCelery/>
    }
    </View>

    {
      this.state.avatarLoading === false ? (
        <View style={homeStyle.greetingContainer}>
          <Text style={{
              fontSize: Dimensions.get('window').width < 750 ? 18 : 24,
              color: 'black',
              marginLeft:30,
              marginRight:30,
              flex: 1
            }}>
            {TimeGreeting.getTimeBasedGreeting(this.props.navigation.getParam('name', 'NO-ID'))}
          </Text>
        </View>
    ) :
      null
    }

    {
      this.state.avatarLoading === false ? (
        <View style={homeStyle.iconsContainer}>

        <GlobalButton
          marginLeft={Dimensions.get('window').width*0.1}
          onPress={() => navigate('RecipeList', {
            guest:         this.props.navigation.getParam('guest', 'NO-ID'),
            avatar:        this.props.navigation.getParam('avatar', 'NO-ID'),
            token:         this.props.navigation.getParam('token', 'NO-ID'),
            id:            this.props.navigation.getParam('id', 'NO-ID'),
            name:          this.props.navigation.getParam('name', 'NO-ID'),
            bio:           this.props.navigation.getParam('bio', 'NO-ID'),
            location:      this.props.navigation.getParam('location', 'NO-ID'),
            admin:         this.props.navigation.getParam('admin', 'NO-ID'),
            user_is_vegan: this.props.navigation.getParam('user_is_vegan', 'NO-ID')})}
          buttonTitle={"Recipes"}
        />

        <GlobalButton
          marginRight={Dimensions.get('window').width*0.1}
          onPress={() => this.openVenueOverlay()}
          buttonTitle={"Eateries"} />
        </View>
    ) :
      null
    }

    {
      this.state.avatarLoading === false ? (
        <View style={{alignItems: 'center', height: 10, overflow: 'visible'}}>

      <AddItemButton onPress={() => this.props.navigation.getParam('guest', 'NO-ID') === true ?
           this.openRegistrationOverlay()
          : this.openAddItemOverlay()} noMargin={true} height={Dimensions.get('window').width*0.1} width={Dimensions.get('window').width*0.1} />
    </View>

  ) : null}


    {
      this.state.avatarLoading === false ? (
        <View style={homeStyle.iconsContainer}>

        <GlobalButton
          marginLeft={Dimensions.get('window').width*0.1}
          onPress={() => navigate('BrandList', {
            guest:         this.props.navigation.getParam('guest', 'NO-ID'),
            avatar:        this.props.navigation.getParam('avatar', 'NO-ID'),
            token:         this.props.navigation.getParam('token', 'NO-ID'),
            id:            this.props.navigation.getParam('id', 'NO-ID'),
            name:          this.props.navigation.getParam('name', 'NO-ID'),
            bio:           this.props.navigation.getParam('bio', 'NO-ID'),
            location:      this.props.navigation.getParam('location', 'NO-ID'),
            admin:         this.props.navigation.getParam('admin', 'NO-ID'),
            user_is_vegan: this.props.navigation.getParam('user_is_vegan', 'NO-ID')})}
          buttonTitle={"Shopping"} />
        <GlobalButton
          marginRight={Dimensions.get('window').width*0.1}
          onPress={() => navigate('MediaList', {
            guest:         this.props.navigation.getParam('guest', 'NO-ID'),
            avatar:        this.props.navigation.getParam('avatar', 'NO-ID'),
            token:         this.props.navigation.getParam('token', 'NO-ID'),
            id:            this.props.navigation.getParam('id', 'NO-ID'),
            name:          this.props.navigation.getParam('name', 'NO-ID'),
            bio:           this.props.navigation.getParam('bio', 'NO-ID'),
            admin:         this.props.navigation.getParam('admin', 'NO-ID'),
            location:      this.props.navigation.getParam('location', 'NO-ID'),
            user_is_vegan: this.props.navigation.getParam('user_is_vegan', 'NO-ID')})}
          buttonTitle={"News"} />
        </View>
    ) :
      null
    }
    { this.state.registrationOverlayVisible === true ? (

      <GuestRegistrationOffer
        openOverlay    = {this.openRegistrationOverlay}
        handleRegistrationRequest   = {this.handleRegistrationRequest}
        navigation =                  {this.props.navigation}
        closeRegistrationOverlay   = {this.closeRegistrationOverlay}
        overlayVisible = {this.state.registrationOverlayVisible}
      />

    ) : null }
    </StickyHeaderFooterScrollView>
  ) :

  <View style={homeStyle.container2}>
    {
      this.state.avatarLoading === false ? (
        null
      ) :

      <LoadingCelery />
  }

  <ScrollView showsVerticalScrollIndicator={false}>

    <View style={homeStyle.button2Container}>
      <TouchableHighlight
        underlayColor="white"
          onPress={() => navigate('UserView', {
            guest:         this.props.navigation.getParam('guest', 'NO-ID'),
            user_id:       this.props.navigation.getParam('user_id', 'NO-ID'),
            avatar:        this.props.navigation.getParam('avatar', 'NO-ID'),
            token:         this.props.navigation.getParam('token', 'NO-ID'),
            id:            this.props.navigation.getParam('id', 'NO-ID'),
            name:          this.props.navigation.getParam('name', 'NO-ID'),
            bio:           this.props.navigation.getParam('bio', 'NO-ID'),
            location:      this.props.navigation.getParam('location', 'NO-ID'),
            admin:         this.props.navigation.getParam('admin', 'NO-ID'),
            user_is_vegan: this.props.navigation.getParam('user_is_vegan', 'NO-ID'),
            latitude:      this.state.latitude ? this.state.latitude : 55.9497,
            longitude:     this.state.longitude ? this.state.longitude : -3.1811
          })}
          style={{width: this.state.avatarLoading === false ? this.getPortraitSize() : 1}}>

          <Animatable.View
            animation      = "pulse"
            iterationDelay = {2000}
            duration       = {1000}
            iterationCount = "infinite"
            direction      = "alternate"
          >

          <AutoHeightImage
            onLoad={this.setAvatarAsLoaded}
            width={this.state.avatarLoading === false ? this.getPortraitSize() : 1}
            style={{
              borderRadius: 4,
              borderWidth: 3,
              borderColor: '#a2e444',
              borderRadius: Dimensions.get('window').width < 750 ? Dimensions.get('window').width*0.225 : Dimensions.get('window').width*0.2,
              marginTop: Dimensions.get('window').height*0.02
              }}
            source={{uri: this.props.navigation.getParam('avatar', 'NO-ID') ? this.props.navigation.getParam('avatar', 'NO-ID') : 'http://khoshamoz.ir/img/SiteGeneralImg/unknown_user_comments.png'}}
          />
          </Animatable.View>

        </TouchableHighlight>

        { this.state.avatarLoading === false ? (

        <View
          style={{
            marginTop:Dimensions.get('window').height* 0.025}}>
          <Image
            style={{width: 60, height: 60}}
            source= {Badges.getDietBadge (this.returnStatus())}
          />
        </View>

      ) : null

    }

         <MapSettingsOverlay
          navigation     = {this.props.navigation}
          launchMap      = {this.launchMap}
          openOverlay    = {this.openOverlay}
          closeOverlay   = {this.closeOverlay}
          overlayVisible = {this.state.overlayVisible}
          />
          <VenueSettingsOverlay
          navigation        = {this.props.navigation}
          launchVenueSearch = {this.launchVenueSearch}
          openOverlay       = {this.openVenueOverlay}
          closeOverlay      = {this.closeVenueOverlay}
          overlayVisible    = {this.state.venueOverlayVisible}
          />
          <AddItemOverlay
           navigation={this.props.navigation}
           openOverlay={this.openAddItemOverlay}
           closeOverlay={this.closeAddItemOverlay}
           overlayVisible={this.state.addItemOverlayVisible}
           openRecipeForm={this.openRecipeForm}
           openVenueForm={this.openVenueForm}
           openBrandForm={this.openBrandForm}
           openMediaForm={this.openMediaForm}
          />
        </View>

  {
    this.state.avatarLoading === false ? (
      <View style={homeStyle.greetingContainer}>
        <Text
          style={{
            fontSize: Dimensions.get('window').width < 750 ? 18 : 24,
            color:'black',
            textAlign: 'center',
            marginBottom: Dimensions.get('window').height*0.04
          }}>
          {TimeGreeting.getTimeBasedGreeting(this.props.navigation.getParam('name', 'NO-ID'))}
        </Text>
      </View>
  ) :
    null
  }

  {
    this.state.avatarLoading === false ? (
      <View style={homeStyle.iconsContainer}>

      <GlobalButton
        marginLeft={Dimensions.get('window').width*0.1}
        onPress={() => navigate('RecipeList', {
          guest:         this.props.navigation.getParam('guest', 'NO-ID'),
          avatar:        this.props.navigation.getParam('avatar', 'NO-ID'),
          token:         this.props.navigation.getParam('token', 'NO-ID'),
          id:            this.props.navigation.getParam('id', 'NO-ID'),
          name:          this.props.navigation.getParam('name', 'NO-ID'),
          admin:         this.props.navigation.getParam('admin', 'NO-ID'),
          bio:           this.props.navigation.getParam('bio', 'NO-ID'),
          location:      this.props.navigation.getParam('location', 'NO-ID'),
          user_is_vegan: this.props.navigation.getParam('user_is_vegan', 'NO-ID')})}
        buttonTitle={"Recipes"}
        />
      <GlobalButton
        marginRight = {Dimensions.get('window').width*0.1}
        onPress     = {() => this.openVenueOverlay() }
        buttonTitle = {"Eateries"}
      />
    </View>
  ) :
    null
  }

  {
    this.state.avatarLoading === false ? (
      <View style={{alignItems: 'center', height: 10, overflow: 'visible'}}>

    <AddItemButton onPress={() => this.props.navigation.getParam('guest', 'NO-ID') === true ?
         this.openRegistrationOverlay()
        : this.openAddItemOverlay()
      } noMargin={true} height={Dimensions.get('window').width*0.1} width={Dimensions.get('window').width*0.1} />
  </View>

) : null}

  {
    this.state.avatarLoading === false ? (
      <View style={homeStyle.iconsContainer2}>

      <GlobalButton
        marginLeft={Dimensions.get('window').width*0.1}
        onPress={() => navigate('BrandList', {
          guest:         this.props.navigation.getParam('guest', 'NO-ID'),
          avatar:        this.props.navigation.getParam('avatar', 'NO-ID'),
          token:         this.props.navigation.getParam('token', 'NO-ID'),
          id:            this.props.navigation.getParam('id', 'NO-ID'),
          name:          this.props.navigation.getParam('name', 'NO-ID'),
          admin:         this.props.navigation.getParam('admin', 'NO-ID'),
          bio:           this.props.navigation.getParam('bio', 'NO-ID'),
          location:      this.props.navigation.getParam('location', 'NO-ID'),
          user_is_vegan: this.props.navigation.getParam('user_is_vegan', 'NO-ID')})}
        buttonTitle={"Shopping"}
      />
      <GlobalButton
        marginRight={Dimensions.get('window').width*0.1}
        onPress={() => navigate('MediaList', {
          guest:         this.props.navigation.getParam('guest', 'NO-ID'),
          avatar:        this.props.navigation.getParam('avatar', 'NO-ID'),
          token:         this.props.navigation.getParam('token', 'NO-ID'),
          id:            this.props.navigation.getParam('id', 'NO-ID'),
          name:          this.props.navigation.getParam('name', 'NO-ID'),
          admin:         this.props.navigation.getParam('admin', 'NO-ID'),
          bio:           this.props.navigation.getParam('bio', 'NO-ID'),
          location:      this.props.navigation.getParam('location', 'NO-ID'),
          user_is_vegan: this.props.navigation.getParam('user_is_vegan', 'NO-ID')})}
        buttonTitle={"News"}
      />
    </View>
  ) :
    null
  }
  </ScrollView>
  {
    this.state.avatarLoading === false ? (
      <NavBar
        navigation={this.props.navigation}
        openOverlay={this.openOverlay}
        attributes={{
          guest:         this.props.navigation.getParam('guest', 'NO-ID'),
          token:         this.props.navigation.getParam('token', 'NO-ID'),
          id:            this.props.navigation.getParam('id', 'NO-ID'),
          name:          this.props.navigation.getParam('name', 'NO-ID'),
          bio:           this.props.navigation.getParam('bio', 'NO-ID'),
          admin:         this.props.navigation.getParam('admin', 'NO-ID'),
          location:      this.props.navigation.getParam('location', 'NO-ID'),
          user_is_vegan: this.props.navigation.getParam('user_is_vegan', 'NO-ID')}}
      />
  ) :
    null
  }
  { this.state.registrationOverlayVisible === true ? (

    <GuestRegistrationOffer
      openOverlay    = {this.openRegistrationOverlay}
      handleRegistrationRequest   = {this.handleRegistrationRequest}
      navigation =                  {this.props.navigation}
      closeRegistrationOverlay   = {this.closeRegistrationOverlay}
      overlayVisible = {this.state.registrationOverlayVisible}
    />

  ) : null }
  </View>
}
      </View>
    );
  }
}

const homeStyle = StyleSheet.create({
  container: {
    flex:             1,
    backgroundColor:  'white',
    alignItems:       'center',
    justifyContent:   'center',
  },
  container2: {
    flex:             1,
    backgroundColor:  'transparent',
    alignItems:       'center',
    justifyContent:   'center',
  },
  iconsContainer: {
    width:            Dimensions.get('window').width,
    marginLeft:       0,
    marginTop:        Dimensions.get('window').height*0.035,
    backgroundColor:  'transparent',
    justifyContent:   'space-between',
    alignItems:       'center',
    flexDirection:    'row',
  },
  iconsContainer2: {
    width:            Dimensions.get('window').width,
    marginLeft:       0,
    marginTop:        Dimensions.get('window').height*0.035,
    marginBottom:     Dimensions.get('window').height*0.14,
    backgroundColor:  'transparent',
    justifyContent:   'space-between',
    alignItems:       'center',
    flexDirection:    'row',
  },
  buttonContainer: {
    marginBottom:     Dimensions.get('window').height*0.01,
    marginTop:        Dimensions.get('window').height*0.05,
    alignItems:       'center',
  },
  button2Container: {
    marginBottom:     Dimensions.get('window').height*0.01,
    alignItems:       'center',
  },
  greetingContainer: {
    flex: 1,
    marginBottom:     Platform.OS === 'ios' ? Dimensions.get('window').height*0.015 : Dimensions.get('window').height*0.015,
    marginTop:        Dimensions.get('window').height*0.005,
    alignItems:       'center',
    backgroundColor:  'white',
    height:           Dimensions.get('window').height*0.05
  }
});
