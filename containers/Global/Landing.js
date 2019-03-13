import    React from 'react';
import {  ImageBackground,
          StyleSheet,
          Image,
          Alert,
          Dimensions,
          Text,
          View,
          TextStyle,
          ViewStyle,
          ScrollView, } from 'react-native';
import {  Constants,
          Font } from 'expo'
import    NavBar from '../../components/NavBar.js';
import    GlobalButton from '../../components/GlobalButton.js';
import    AutoHeightImage from 'react-native-auto-height-image';
import    axios from 'axios';
import    HeroImageCarousel from '../../components/HeroImageCarousel.js';
import    SubmittedFormSpinner from '../../components/SubmittedFormSpinner.js';

export default class Landing extends React.Component {
  static navigationOptions = {
      header: null,
  };

  constructor(props){
    super(props)
  }

  state = {
    spinner: false
  }


  componentDidMount(){
    this.nudgeHeroku('http://nuv-api.herokuapp.com/login')
  }

  nudgeHeroku(url){
    return axios.get(url)
      .then((response) => console.log(`${url} response: `, response.data)
    ).catch(err => { console.log('caught', err.message); });
  }

  guestSignIn(){
    var session_url = 'http://nuv-api.herokuapp.com/signup';
    var {navigate} = this.props.navigation;
    var self = this;

    var email = Date.now() + "@1.com"
    var password = "Password8"

    axios.post(session_url, {"user":
  {
    "email": email,
    "password": password
  }
  }
).then(function(response) {
      axios.post(`http://nuv-api.herokuapp.com/login`, {"user":
    {
      "email": email,
      "password": password
    }
    }).then(function(second_response) {
      var token = second_response.headers.authorization;
      const formData = new FormData();
     formData.append('profile[name]', "NüV Guest");
     formData.append('profile[bio]', "To add a biography, please create a NüV account and fill in the biography field.");
     formData.append('profile[user_is_vegan]', "vCurious");
     formData.append('profile[location]', "Undisclosed");

       axios.post('http://nuv-api.herokuapp.com/profiles',
      formData,
    { headers: { Authorization: `${token}`, 'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' }})
    .then(function(third_response){
      axios.get('http://nuv-api.herokuapp.com/this_users_profile',
     { headers: { Authorization: `${token}` }})
     .then(function(fourth_response){
       var responseForName = JSON.parse(fourth_response.request['_response'])
       var uri = responseForName.avatar.url

      self.setState({

        spinner: false

      }, function(){
        if (self.state.image && Platform.OS == 'ios'){
          navigate('Home', {guest: true, user_id: responseForName.user_id, avatar: uri, token: token, id: responseForName.id, name: responseForName.name, bio: responseForName.bio, user_is_vegan: responseForName.user_is_vegan, location: responseForName.location})
      }
      else {
        navigate('Home', {guest: true, user_id: responseForName.user_id, avatar: uri, token: token, id: responseForName.id, name: responseForName.name, bio: responseForName.bio, user_is_vegan: responseForName.user_is_vegan, location: responseForName.location})
      }
        })
        })
      })
    })
  }).catch(function(e){
        console.log(e);
      })
  }

render() {
  const {navigate} = this.props.navigation;
    return (

      <View style={landingStyle.container}>

      <SubmittedFormSpinner spinner={this.state.spinner} message="Signing you in as a NüV guest..." />

      <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{alignItems: 'center'}}>
        <AutoHeightImage
          source={require('../../assets/greenlogo.png')}
            style={{marginTop:Dimensions.get('window').height*0.07}}
            width={Dimensions.get('window').width < 750 ? Dimensions.get('window').width*0.75 : Dimensions.get('window').width*0.57} />
      </View>

      <View style={landingStyle.descriptionContainer}>
          <Text style={landingStyle.descriptionText1}>
              Life support for vegans {"\n"}
              vegetarians & the v.curious
          </Text>
      </View>

      <View>
      <HeroImageCarousel />
      </View>
      <View style={landingStyle.iconsContainer}>
        <GlobalButton
          marginLeft={Dimensions.get('window').width*0.16}
          onPress={() => navigate('SignIn', {name: 'Home'})}
          buttonTitle={"Sign in"}
        />
        <GlobalButton
          marginRight={Dimensions.get('window').width*0.16}
          onPress={() => navigate('RegisterUser', {name: 'Home'})} buttonTitle={"Register"}
        />
      </View>

      <Text
      style={{fontSize: Dimensions.get('window').width > 750 ? 20 : 16, color: '#2e8302', textAlign: 'center', paddingLeft: 20, paddingRight: 20,
      marginBottom: Dimensions.get('window').height*0.035
    }}
      onPress={() => this.setState({ spinner: true }, function() { this.guestSignIn() } ) }
      >
      Browse NüV as guest
     </Text>

    </ScrollView>
  </View>
    );
  }
}

const landingStyle = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  descriptionContainer: {
    marginTop: Dimensions.get('window').height*0.01,
    paddingLeft: Dimensions.get('window').width*0.0275,
    paddingRight: Dimensions.get('window').width*0.0275,
  },
  descriptionText1: {
    marginTop: Dimensions.get('window').height*0.03,
    marginBottom: Dimensions.get('window').height*0.03,
    paddingLeft: Dimensions.get('window').width*0.005,
    paddingRight: Dimensions.get('window').width*0.005,
    textAlign: 'center',
    fontSize: Dimensions.get('window').width < 750 ? 18 : 20,
    color: '#696969',
  },
  iconsContainer: {
    width: Dimensions.get('window').width,
    marginLeft: 0,
    marginTop: Dimensions.get('window').height*0.035,
    marginBottom: Dimensions.get('window').height*0.035,
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
