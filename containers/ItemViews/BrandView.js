import React from 'react';
import { StyleSheet, Platform, TouchableHighlight, ScrollView, Dimensions, Button, Text, View } from 'react-native';
import { Constants } from 'expo'
import * as TimeGreeting from '../../helper_functions/TimeGreeting.js';
import NavBar from '../../components/NavBar.js';
import AutoHeightImage from 'react-native-auto-height-image';
import GlobalButton from '../../components/GlobalButton.js';
import StickyHeaderFooterScrollView from 'react-native-sticky-header-footer-scroll-view';
import StarRating from 'react-native-star-rating';


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

      }

      state = {
          starRating: 3,
          starCount: 2
        };


  onStarRatingPress(rating) {
  this.setState({
    starCount: rating
  });
  }

  render() {
    const {navigate} = this.props.navigation;

    return (
      <View style={userViewStyle.container}>

      <StickyHeaderFooterScrollView
      makeScrollable={true}
      renderStickyHeader={() => ( <View></View> )}
      renderStickyFooter={() => (
        <View style={{alignItems: 'center'}}>
          <NavBar navigation={this.props.navigation} />
        </View>
      )}
    >
    
    <View style={userViewStyle.flexRowContainer}>
    <View style={{flexDirection: 'column'}}>

    <View style={{paddingLeft: Dimensions.get('window').width* 0.025}}>
      <Text style={userViewStyle.profileItem}>Name: Dr Martens</Text>
    </View>

    <View style={{paddingLeft: Dimensions.get('window').width* 0.025}}>
      <Text style={userViewStyle.profileItem}>Type: Outfitter</Text>
    </View>

    <View style={{paddingLeft: Dimensions.get('window').width* 0.025}}>
      <Text style={userViewStyle.profileItem}>NüV Status: Hyper-compliant</Text>
    </View>

    </View>

    <AutoHeightImage width={Dimensions.get('window').width*0.3} style={{marginTop: Dimensions.get('window').width*0.025, borderRadius: Dimensions.get('window').width*0.17 }} source={require('../../assets/AppIcons/branddefault.png')}/>

    </View>

    <Text style={userViewStyle.vibeHeading}>Vibe</Text>

    <Text style={[userViewStyle.profileItem, {padding: Dimensions.get('window').width* 0.025, textAlign: 'center', marginTop: Dimensions.get('window').height*0.02, marginBottom: Dimensions.get('window').height*0.01}]}>The Dr. Martens website is extremely searchable for the vegan boot. Called “Vegan 1460” and marked with a bright green “V,” drmartenscanada.ca claims that the boot is “made with synthetic leather, 100% vegan friendly.” ...</Text>

    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginLeft: Dimensions.get('window').width*0.1, marginRight: Dimensions.get('window').width*0.1}}>
    <Text style={[userViewStyle.profileItem, {marginTop: Dimensions.get('window').height*0.02, marginBottom: Dimensions.get('window').height*0.01}]}>Posted by</Text>
    <AutoHeightImage width={Dimensions.get('window').width*0.09} style={{marginTop: Dimensions.get('window').width*0.045, borderRadius: Dimensions.get('window').width*0.025 }} source={require('../../assets/wil.jpg')}/>
    <AutoHeightImage width={Dimensions.get('window').width*0.09} style={{marginTop: Dimensions.get('window').width*0.045, borderRadius: Dimensions.get('window').width*0.025 }} source={require('../../assets/AppIcons/book.png')}/>

    <Text style={[userViewStyle.profileItem, {marginTop: Dimensions.get('window').height*0.02, marginBottom: Dimensions.get('window').height*0.01}]}>Website</Text>

    </View>

    <Text style={userViewStyle.vibeHeading}>Verdict</Text>
    <Text style={[userViewStyle.profileItem, {padding: Dimensions.get('window').width* 0.025, textAlign: 'center', marginTop: Dimensions.get('window').height*0.01, marginBottom: Dimensions.get('window').height*0.01}]}>NüV users awarded this brand the following average rating:</Text>

    <View style={{alignItems: 'center', width: Dimensions.get('window').width*1}}>
    <StarRating
      disabled={false}
      maxStars={5}
      rating={this.state.starRating}
      fullStarColor={'#0DC6B5'}
      containerStyle={{marginBottom: Dimensions.get('window').height*0.02}}
      />
    </View>

      <View style={{alignItems: 'center', marginTop: Dimensions.get('window').height*0.005, width: Dimensions.get('window').width*1}}>
      <Text style={userViewStyle.vibeHeading}>Rate this brand</Text>
      <StarRating
        disabled={false}
        maxStars={5}
        rating={this.state.starCount}
        selectedStar={(rating) => this.onStarRatingPress(rating)}
        fullStarColor={'#0DC6B5'}
        containerStyle={{marginTop: Dimensions.get('window').height*0.02, marginBottom: Dimensions.get('window').height*0.02}}
        />
        </View>

        <View style={userViewStyle.submitContainer}>
        <GlobalButton
           buttonTitle="Rate and go"
           onPress={() => navigate('Home', {name: 'SignIn'})}/>
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
  profileItem: {
    padding: Dimensions.get('window').width* 0.025,
    fontSize: Dimensions.get('window').width>750 ? 24 : 16 ,
    color: 'black'
  },
  submitContainer: {
    alignItems: 'center',
    marginTop: Dimensions.get('window').height*0.03,
    marginBottom: Platform.OS === 'ios' ? Dimensions.get('window').height*0.15 : Dimensions.get('window').height*0.15
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
  flexRowContainer: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  editButtonContainer: {
    alignItems: 'center'
  },
  vibeHeading: {
    fontSize: Dimensions.get('window').width > 750 ? 27 : 20,
    textAlign: 'center',
    color: '#0DC6B5',
    marginTop: Dimensions.get('window').height*0.03
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
