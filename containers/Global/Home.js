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
import    LoadingCelery from '../../components/LoadingCelery.js';
import    MapSettingsOverlay from '../../components/MapSettingsOverlay.js';
import    VenueSettingsOverlay from '../../components/VenueSettingsOverlay.js';
import    StickyHeaderFooterScrollView from 'react-native-sticky-header-footer-scroll-view';
import * as Animatable from 'react-native-animatable';
import {  BallIndicator,
          BarIndicator,
          DotIndicator,
          WaveIndicator } from 'react-native-indicators';

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
     }

  state = {
    avatarLoading       : true,
    overlayVisible      : false,
    venueOverlayVisible : false,
  };

  componentDidMount(){
    navigator.geolocation.getCurrentPosition(
    position => {
      const myLocation = JSON.stringify(position);

      this.setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
        }, function(){
          console.log("My position", this.state.latitude, this.state.longitude)});
        },
          error => Alert.alert(error.message),
          { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 }
        );
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

  launchMap(navigation, distance, vegan){
    var self = this;
    const {navigate} = navigation

    this.setState({
      overlayVisible: false
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
        latitude: this.state.latitude,
        longitude: this.state.longitude,
        see_only_vegan: vegan
    }
  )
  }
)
}

  launchVenueSearch(navigation, distance){
    var self         = this;
    const {navigate} = navigation
    var distance     = distance;

    this.setState({
      venueOverlayVisible: false
    }, function(){

      navigate('VenueList', {
        user_id:       navigation.getParam('user_id', 'NO-ID'),
        settings:       true,
        avatar:        navigation.getParam('avatar', 'NO-ID'),
        token:         navigation.getParam('token', 'NO-ID'),
        id:            navigation.getParam('id', 'NO-ID'),
        name:          navigation.getParam('name', 'NO-ID'),
        bio:           navigation.getParam('bio', 'NO-ID'),
        location:      navigation.getParam('location', 'NO-ID'),
        user_is_vegan: navigation.getParam('user_is_vegan', 'NO-ID'),
        distance:      distance,
        latitude:      this.state.latitude,
        longitude:     this.state.longitude
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
    return Dimensions.get('window').width < 750 ? Dimensions.get('window').width*0.8 : Dimensions.get('window').width*0.55
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
          user_id:       this.props.navigation.getParam('user_id', 'NO-ID'),
          avatar:        this.props.navigation.getParam('avatar', 'NO-ID'),
          token:         this.props.navigation.getParam('token', 'NO-ID'),
          id:            this.props.navigation.getParam('id', 'NO-ID'),
          name:          this.props.navigation.getParam('name', 'NO-ID'),
          bio:           this.props.navigation.getParam('bio', 'NO-ID'),
          location:      this.props.navigation.getParam('location', 'NO-ID'),
          user_is_vegan: this.props.navigation.getParam('user_is_vegan', 'NO-ID')})
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
              borderRadius: Dimensions.get('window').width < 750 ? Dimensions.get('window').width*0.4 : Dimensions.get('window').width*0.275,
              marginTop: Dimensions.get('window').height*0.05
              }}
            source={{uri: this.props.navigation.getParam('avatar', 'NO-ID') ? this.props.navigation.getParam('avatar', 'NO-ID') : 'http://khoshamoz.ir/img/SiteGeneralImg/unknown_user_comments.png'}}
          />
        </Animatable.View>
    </TouchableHighlight>

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
              fontSize: 18,
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
          marginLeft={Dimensions.get('window').width*0.12}
          onPress={() => navigate('RecipeList', {
            avatar:        this.props.navigation.getParam('avatar', 'NO-ID'),
            token:         this.props.navigation.getParam('token', 'NO-ID'),
            id:            this.props.navigation.getParam('id', 'NO-ID'),
            name:          this.props.navigation.getParam('name', 'NO-ID'),
            bio:           this.props.navigation.getParam('bio', 'NO-ID'),
            location:      this.props.navigation.getParam('location', 'NO-ID'),
            user_is_vegan: this.props.navigation.getParam('user_is_vegan', 'NO-ID')})}
          buttonTitle={"Recipes"}
        />
        <GlobalButton
          marginRight={Dimensions.get('window').width*0.12}
          onPress={() => this.openVenueOverlay()}
          buttonTitle={"Eateries"} />
        </View>
    ) :
      null
    }

    {
      this.state.avatarLoading === false ? (
        <View style={homeStyle.iconsContainer}>

        <GlobalButton
          marginLeft={Dimensions.get('window').width*0.12}
          onPress={() => navigate('BrandList', {
            avatar:        this.props.navigation.getParam('avatar', 'NO-ID'),
            token:         this.props.navigation.getParam('token', 'NO-ID'),
            id:            this.props.navigation.getParam('id', 'NO-ID'),
            name:          this.props.navigation.getParam('name', 'NO-ID'),
            bio:           this.props.navigation.getParam('bio', 'NO-ID'),
            location:      this.props.navigation.getParam('location', 'NO-ID'),
            user_is_vegan: this.props.navigation.getParam('user_is_vegan', 'NO-ID')})}
          buttonTitle={"Shopping"} />
        <GlobalButton
          marginRight={Dimensions.get('window').width*0.12}
          onPress={() => navigate('MediaList', {
            avatar:        this.props.navigation.getParam('avatar', 'NO-ID'),
            token:         this.props.navigation.getParam('token', 'NO-ID'),
            id:            this.props.navigation.getParam('id', 'NO-ID'),
            name:          this.props.navigation.getParam('name', 'NO-ID'),
            bio:           this.props.navigation.getParam('bio', 'NO-ID'),
            location:      this.props.navigation.getParam('location', 'NO-ID'),
            user_is_vegan: this.props.navigation.getParam('user_is_vegan', 'NO-ID')})}
          buttonTitle={"News"} />
        </View>
    ) :
      null
    }
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
            user_id:       this.props.navigation.getParam('user_id', 'NO-ID'),
            avatar:        this.props.navigation.getParam('avatar', 'NO-ID'),
            token:         this.props.navigation.getParam('token', 'NO-ID'),
            id:            this.props.navigation.getParam('id', 'NO-ID'),
            name:          this.props.navigation.getParam('name', 'NO-ID'),
            bio:           this.props.navigation.getParam('bio', 'NO-ID'),
            location:      this.props.navigation.getParam('location', 'NO-ID'),
            user_is_vegan: this.props.navigation.getParam('user_is_vegan', 'NO-ID')})}
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
              borderRadius: Dimensions.get('window').width < 750 ? Dimensions.get('window').width*0.4 : Dimensions.get('window').width*0.275,
              marginTop: Dimensions.get('window').height*0.02
              }}
            source={{uri: this.props.navigation.getParam('avatar', 'NO-ID') ? this.props.navigation.getParam('avatar', 'NO-ID') : 'http://khoshamoz.ir/img/SiteGeneralImg/unknown_user_comments.png'}}
          />
          </Animatable.View>
        </TouchableHighlight>
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
        </View>

  {
    this.state.avatarLoading === false ? (
      <View style={homeStyle.greetingContainer}>
        <Text
          style={{
            fontSize: 20,
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
        marginLeft={Dimensions.get('window').width*0.2}
        onPress={() => navigate('RecipeList', {
          avatar:        this.props.navigation.getParam('avatar', 'NO-ID'),
          token:         this.props.navigation.getParam('token', 'NO-ID'),
          id:            this.props.navigation.getParam('id', 'NO-ID'),
          name:          this.props.navigation.getParam('name', 'NO-ID'),
          bio:           this.props.navigation.getParam('bio', 'NO-ID'),
          location:      this.props.navigation.getParam('location', 'NO-ID'),
          user_is_vegan: this.props.navigation.getParam('user_is_vegan', 'NO-ID')})}
        buttonTitle={"Recipes"}
        />
      <GlobalButton
        marginRight = {Dimensions.get('window').width*0.2}
        onPress     = {() => this.openVenueOverlay() }
        buttonTitle = {"Eateries"}
      />
    </View>
  ) :
    null
  }

  {
    this.state.avatarLoading === false ? (
      <View style={homeStyle.iconsContainer2}>

      <GlobalButton
        marginLeft={Dimensions.get('window').width*0.2}
        onPress={() => navigate('BrandList', {
          avatar:        this.props.navigation.getParam('avatar', 'NO-ID'),
          token:         this.props.navigation.getParam('token', 'NO-ID'),
          id:            this.props.navigation.getParam('id', 'NO-ID'),
          name:          this.props.navigation.getParam('name', 'NO-ID'),
          bio:           this.props.navigation.getParam('bio', 'NO-ID'),
          location:      this.props.navigation.getParam('location', 'NO-ID'),
          user_is_vegan: this.props.navigation.getParam('user_is_vegan', 'NO-ID')})}
        buttonTitle={"Shopping"}
      />
      <GlobalButton
        marginRight={Dimensions.get('window').width*0.2}
        onPress={() => navigate('MediaList', {
          avatar:        this.props.navigation.getParam('avatar', 'NO-ID'),
          token:         this.props.navigation.getParam('token', 'NO-ID'),
          id:            this.props.navigation.getParam('id', 'NO-ID'),
          name:          this.props.navigation.getParam('name', 'NO-ID'),
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
    marginBottom:     Platform.OS === 'ios' ? Dimensions.get('window').height*0.015 : Dimensions.get('window').height*0.045,
    marginTop:        Dimensions.get('window').height*0.005,
    alignItems:       'center',
    backgroundColor:  'white',
    height:           Dimensions.get('window').height*0.03
  }
});
