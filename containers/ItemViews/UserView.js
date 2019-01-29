import React from 'react';
import { StyleSheet, Platform, TouchableHighlight, ScrollView, Dimensions, Button, Text, View } from 'react-native';
import { Constants } from 'expo'
import * as TimeGreeting from '../../helper_functions/TimeGreeting.js';
import NavBar from '../../components/NavBar.js';
import AutoHeightImage from 'react-native-auto-height-image';
import GlobalButton from '../../components/GlobalButton.js';
import StickyHeaderFooterScrollView from 'react-native-sticky-header-footer-scroll-view';

export default class UserView extends React.Component {
  static navigationOptions = {
    title: null,
    headerTitle: (
      <AutoHeightImage width={75} style={{position: 'absolute', right: Platform.OS === 'android' ? 0 : -65 }} source={require('../../assets/AppIcons/transparentlogo.png')}/>
 ),
}

      constructor(props) {
      super(props);

      this.pickImage = this.pickImage.bind(this);

      }

      state = {
          image: null
        };


      pickImage = async () => {
      await Permissions.askAsync(Permissions.CAMERA_ROLL);

       let result = await ImagePicker.launchImageLibraryAsync({
         allowsEditing: true,
         mediaTypes: ImagePicker.MediaTypeOptions.All,
         quality: 1,
         exif: true,
         aspect: [4, 4]
       });

       console.log(result);

       if (!result.cancelled) {
         this.setState({ image: result.uri });
       }
      };

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
      <Text style={userViewStyle.profileItem}>Name: Fenella Rowley-Knight </Text>
    </View>

    <View style={{paddingLeft: Dimensions.get('window').width* 0.025}}>
      <Text style={userViewStyle.profileItem}>Hometown: Hastings </Text>
    </View>

    <View style={{paddingLeft: Dimensions.get('window').width* 0.025}}>
      <Text style={userViewStyle.profileItem}>NüV Status: V-curious </Text>
    </View>

    </View>

    <AutoHeightImage width={Dimensions.get('window').width*0.34} style={{marginTop: Dimensions.get('window').width*0.025, borderRadius: Dimensions.get('window').width*0.17 }} source={require('../../assets/vegan_woman.jpeg')}/>

    </View>

    <Text style={[userViewStyle.profileItem, {padding: Dimensions.get('window').width* 0.025, textAlign: 'center', marginTop: Dimensions.get('window').height*0.02, marginBottom: Dimensions.get('window').height*0.01}]}>Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?</Text>

    <View style={userViewStyle.editButtonContainer}>

    <GlobalButton onPress={() => navigate('EditUser')} buttonTitle={"Edit profile"} />

    </View>

    <Text style={{textAlign: 'center', fontSize: 26, fontWeight: 'bold', marginTop: Dimensions.get('window').height*0.06, marginBottom: Dimensions.get('window').height*0.03}}>My NüV Contributions</Text>

    <View style={userViewStyle.iconsContainer}>

    <GlobalButton marginLeft={Dimensions.get('window').width*0.12} onPress={() => navigate('RecipeForm')} buttonTitle={"Recipes"} />
    <GlobalButton marginRight={Dimensions.get('window').width*0.12} onPress={() => navigate('VenueForm')} buttonTitle={"Eateries"} />

    </View>

    <View style={userViewStyle.iconsContainer2}>

    <GlobalButton marginLeft={Dimensions.get('window').width*0.12} onPress={() => navigate('BrandForm')} buttonTitle={"Brands"} />
    <GlobalButton marginRight={Dimensions.get('window').width*0.12} onPress={() => navigate('MediaForm')} buttonTitle={"Media"} />

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
  iconsContainer: {
    width: Dimensions.get('window').width,
    marginLeft: 0,
    marginTop: Dimensions.get('window').height*0.035,
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  iconsContainer2: {
    width: Dimensions.get('window').width,
    marginLeft: 0,
    marginTop: Dimensions.get('window').height*0.035,
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
