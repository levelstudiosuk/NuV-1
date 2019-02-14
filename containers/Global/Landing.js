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
import {  Constants } from 'expo'
import    NavBar from '../../components/NavBar.js';
import    GlobalButton from '../../components/GlobalButton.js';
import    AutoHeightImage from 'react-native-auto-height-image';
import    axios from 'axios';
import    HeroImageCarousel from '../../components/HeroImageCarousel.js';


export default class Landing extends React.Component {
  static navigationOptions = {
      header: null,
  };

  componentDidMount(){
    this.nudgeHeroku('http://nuv-api.herokuapp.com/login');
  }

  nudgeHeroku(url){
    return axios.get(url)
      .then((response) => console.log(`${url} response: `, response.data)
    ).catch(err => { console.log('caught', err.message); });
  }

render() {
  const {navigate} = this.props.navigation;
    return (

      <View style={landingStyle.container}>
      <ScrollView>
        <AutoHeightImage
          source={require('../../assets/greenlogo.png')}
            style={{marginTop:Dimensions.get('window').height*0.095}}
            width={Dimensions.get('window').width*0.77} />

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

      <View style={landingStyle.descriptionContainer}>
          <Text style={landingStyle.descriptionText}>
              Lifestyle support system for vegans, vegetarians & the v.curious
          </Text>
      </View>

      <View>
      <HeroImageCarousel />
      </View>

      <View style={landingStyle.descriptionContainer}>
          <Text style={landingStyle.descriptionText}>
              Join our community; find & share well researched recipes, brilliant brands, awesome articles and ethical eateries.{"\n"}{"\n"}
              This is just the veganning
          </Text>
      </View>
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
  descriptionText: {
    marginTop: Dimensions.get('window').height*0.03,
    marginBottom: Dimensions.get('window').height*0.03,
    paddingLeft: Dimensions.get('window').width*0.005,
    paddingRight: Dimensions.get('window').width*0.005,
    textAlign: 'center',
    fontSize: 12,
    color: '#696969',

  },
  iconsContainer: {
    width: Dimensions.get('window').width,
    marginLeft: 0,
    marginTop: Dimensions.get('window').height*0.035,
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
