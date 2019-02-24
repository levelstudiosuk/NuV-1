import   React from 'react';
import { StyleSheet,
         ScrollView,
         Platform,
         TouchableHighlight,
         Image,
         TextInput,
         Dimensions,
         Button,
         Text,
         Linking,
         View,
         TouchableOpacity } from 'react-native';
import { Constants } from 'expo'
import   GlobalButton from '../../components/GlobalButton.js';
import   SnapCarousel       from '../../components/SnapCarousel.js';
import   LoadingCelery       from '../../components/LoadingCelery.js';
import   AddItemButton from '../../components/AddItemButton.js';
import   LikeButton from '../../components/LikeButton.js';
import   FaveButton from '../../components/FaveButton.js';
import   ShareButton from '../../components/ShareButton.js';
import   SmallTwoWayToggle from '../../components/SmallTwoWayToggle.js';
import   AutoHeightImage from 'react-native-auto-height-image';
import    LikersOverlay from '../../components/LikersOverlay.js';
import   Expo, {
         ImagePicker } from 'expo';
import { Permissions} from 'expo'
import   MapView, {
         PROVIDER_GOOGLE} from 'react-native-maps';
import   Map from '../../containers/Global/Map.js';
import   StarRating from 'react-native-star-rating';
import { AsyncStorage, Alert } from "react-native"
import axios from 'axios';
import moment from 'moment';

export default class RecipeView extends React.Component {
  static navigationOptions = {
    title: null,
    headerTitle:(
     <AutoHeightImage width={75} style={{position: 'absolute', right: Platform.OS === 'android' ? 0 : -65 }} source={require('../../assets/greenlogo.png')}/>
    ),
  }

  constructor(props) {
    super(props);
      this.onStarRatingPress = this.onStarRatingPress.bind(this);
      this.addRecipeToFavourites = this.addRecipeToFavourites.bind(this);
      this.checkFavouriteStatus = this.checkFavouriteStatus.bind(this);
      this.openLikersOverlay = this.openLikersOverlay.bind(this);
      this.closeLikersOverlay = this.closeLikersOverlay.bind(this);
      }
      state = {
      starRating: 3,
      starCount: 2,
      likersOverlayVisible: false
    };

    componentDidMount(){

      var id = this.props.navigation.getParam('id', 'NO-ID');
      var token = this.props.navigation.getParam('token', 'NO-ID');
      var self = this;

      axios.get(`http://nuv-api.herokuapp.com/recipes/${id}`,

   { headers: { Authorization: `${token}` }})

   .then(function(response){

     var recipeItem = JSON.parse(response.request['_response'])

     self.setState({
       recipeItem: recipeItem,
       likedItem: recipeItem.user_liked,
       likes: recipeItem.likes,
       likers: recipeItem.likers
     },
     function(){
       console.log("Recipe item", self.state.recipeItem);
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
        var id = this.props.navigation.getParam('id', 'NO-ID');
        var self = this;

      axios.post(`http://nuv-api.herokuapp.com/recipes/${id}/rating`, {"rating": `${self.state.starCount}`},

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

      var id = this.state.recipeItem.profile_id;
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

  checkFavouriteStatus(viewedRecipe) {
    try {
      AsyncStorage.getItem('recipe_favourites').then((recipes) => {
        const recips = recipes ? JSON.parse(recipes) : [];

      if (recips.length > 0){
        var names = recips.map((recipe) => recipe.name);

          if (names.includes(viewedFavourite)){
            this.setState({viewedRecipeAlreadyFavourite: true}, function(){
              console.log("Already favourite");
            });
          }
            else {
              this.setState({viewedRecipeAlreadyFavourite: false},
              function(){
                console.log("Not already favourite");
              });
            }
          }
          else {
            this.setState({viewedRecipeAlreadyFavourite: false}, function(){
              console.log("Not already favourite");
            });
           }
         }
        )
        }
          catch (error) {
            console.log(error);
            }
          }

  addRecipeToFavourites = async() => {

    var self = this;

    var recipe = {name: this.state.recipeItem.title, id: this.state.recipeItem.id}

    try {
      AsyncStorage.getItem('recipe_favourites').then((recipes) => {
        const recips = recipes ? JSON.parse(recipes) : [];
          if (recips.length > 0){
            var names = recips.map((recipe) => recipe.id);
          if (!names.includes(recipe.id)){
            recips.push(recipe);
            AsyncStorage.setItem('recipe_favourites', JSON.stringify(recips));
            this.setState({newFavouriteAdded: true}, function(){
              Alert.alert(
                   `${recipe.name} was added to your favourites!`
                  )
                })
              }
          else {
            Alert.alert(
               `${recipe.name} is already in your favourites!`
                )
              }
            }
          else {
            recips.push(recipe);
            AsyncStorage.setItem('recipe_favourites', JSON.stringify(recips));
            Alert.alert(
               `${recipe.name} was added to your favourites!`
                )
              }
            })}
          catch (error) {
            console.log(error);
          }
        }

        postLike(navigation){
          var self = this;

          if (self.state.recipeItem.user_id){
          const {navigate} = navigation

            var token = navigation.getParam('token', 'NO-ID');
            var id = this.state.recipeItem.id
            var self = this;

          axios.post(`http://nuv-api.herokuapp.com/recipes/${id}/like`,  {"data": ""},

        { headers: { Authorization: `${token}` }})

        .then(function(response){

          var likes = self.state.recipeItem.likes += 1;
          var currentUser = [{
                      name: navigation.getParam('name', 'NO-ID'),
                      thumbnail: navigation.getParam('avatar', 'NO-ID'),
                      profile_id: navigation.getParam('profile_id', 'NO-ID')
                    }]
          var likers = self.state.likers.concat(currentUser)

          self.setState({
            likedItem: true,
            likes: likes,
            likers: likers
          }, function(){
            Alert.alert(
                   `You now like '${this.state.recipeItem.title}'!`
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

        deleteLike(navigation){
          var self = this;

          if (self.state.recipeItem.user_id){
          const {navigate} = navigation

            var token = navigation.getParam('token', 'NO-ID');
            var id = this.state.recipeItem.id
            var self = this;

          axios.delete(`http://nuv-api.herokuapp.com/recipes/${id}/remove_like`,

        { headers: { Authorization: `${token}` }})

        .then(function(response){

          var likes = self.state.recipeItem.likes -= 1;
          var likers = self.state.likers.filter(liker => liker.profile_id != navigation.getParam('profile_id', 'NO-ID'))

          self.setState({
            likedItem: false,
            likes: likes,
            likers: likers
          }, function(){
            Alert.alert(
                   `You no longer like '${this.state.recipeItem.title}'!`
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

  onStarRatingPress(rating) {
    this.setState({
      starCount: rating
      });
    }

render() {
  const {navigate} = this.props.navigation;

  if (this.state.recipeItem){
    var images = [];
    images.push(this.state.recipeItem.recipe_main_image ? this.state.recipeItem.recipe_main_image : 'https://cdn.samsung.com/etc/designs/smg/global/imgs/support/cont/NO_IMG_600x600.png');
    for (image of this.state.recipeItem.recipe_images){
      images.push(image.recipe_image.url ? image.recipe_image.url : 'https://cdn.samsung.com/etc/designs/smg/global/imgs/support/cont/NO_IMG_600x600.png')
    }
    var url = this.state.recipeItem.url
  }

    return (

    <View style={recipeViewStyle.container}>

    { this.state.recipeItem ? (

    <ScrollView style={{width: Dimensions.get('window').width*1}} showsVerticalScrollIndicator={false}>
      <View style={recipeViewStyle.container}>
        <View style={{marginTop: Dimensions.get('window').height*0.02}}>
          </View>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <FaveButton
              navigation={this.props.navigation} handleButtonClick={() => this.addRecipeToFavourites()}/>
              { this.state.recipeItem.id ? (

              <LikeButton
              navigation={this.props.navigation}
              itemAlreadyLiked={this.state.recipeItem.id
              && this.state.likedItem === true ? true : false}
              handleButtonClick={() => this.state.likedItem === true ?
              this.deleteLike(this.props.navigation)
              : this.postLike(this.props.navigation)}
              />

            ) : null }
              <AddItemButton
              navigation={this.props.navigation}
              onPress={() => navigate('RecipeForm', {avatar: this.props.navigation.getParam('avatar', 'NO-ID'), token: this.props.navigation.getParam('token', 'NO-ID'), id: this.props.navigation.getParam('id', 'NO-ID'), name: this.props.navigation.getParam('name', 'NO-ID'), bio: this.props.navigation.getParam('bio', 'NO-ID'), location: this.props.navigation.getParam('location', 'NO-ID'), user_is_vegan: this.props.navigation.getParam('user_is_vegan', 'NO-ID')})} />
            </View>
              <Text style={recipeViewStyle.recipename}>
                  {this.state.recipeItem.title}
              </Text>
              <Text onPress={() => this.state.likers.length === 0 ? null : this.openLikersOverlay()} style={recipeViewStyle.recipeLikes}>
              {this.state.likes} NüV {this.state.likes === 1 ? "user" : "users"} {this.state.likes === 1 ? "likes" : "like"} this ℹ︎
              </Text>
            <AutoHeightImage width={Dimensions.get('window').width*1} style={{marginTop: Dimensions.get('window').width*0.025}} source={{uri: this.state.recipeItem.method}}/>
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'center'}}>

          <TouchableHighlight underlayColor='white' onPress={() => this.retrieveUploaderProfile() }>
            <AutoHeightImage width={Dimensions.get('window').width*0.1} style={{ borderRadius: Dimensions.get('window').width*0.025, margin: Dimensions.get('window').width*0.025 }} source={{uri: this.state.recipeItem.user_image}}/>
          </TouchableHighlight>
              <Text style={recipeViewStyle.recipetype}>
                {this.state.recipeItem.category}
              </Text>
            <ShareButton
            marginLeft={Dimensions.get('window').width*0.07}
            title="Shared from NüV"
            message="Message to share"
            url="www.level-apps.co.uk"
            subject="Hi, a NüV user though you would like to see this..."
             />
        </View>

        <View style={{alignItems: 'center'}}>
          <Text style={{marginTop: Dimensions.get('window').height*0.01, fontSize: Dimensions.get('window').width > 750 ? 25 : 16, textAlign: 'center', flex: 1, flexDirection: 'row'}}>
            <AutoHeightImage source={require('../../assets/AppIcons/clock.png')} width={Dimensions.get('window').width*0.05} /> Prep + Cook: {this.state.recipeItem.cooking_time} minutes
          </Text>
        </View>

        <View style={{alignItems: 'center'}}>
        <Text style={recipeViewStyle.recipetype}>
          Uploaded {moment(new Date(this.state.recipeItem.created_at), 'MMMM Do YYYY, h:mm:ss a').fromNow()} by {this.state.recipeItem.user}
        </Text>
        </View>

        <View >
          <View>
            <Text style={recipeViewStyle.recipeingredients}>
            Ingredients:{"\n"}
            </Text>
            <Text style={recipeViewStyle.recipeingredientsbody}>
          {this.state.recipeItem.ingredients}
            </Text>
          </View>
        </View>

        <View >
          <View>
            <Text style={recipeViewStyle.recipemethod}>
            Method:{"\n"}
            </Text>
            <Text onPress={() => Linking.openURL(this.state.recipeItem.description)} style={recipeViewStyle.recipemethodbody}>
            {this.state.recipeItem.description}
            </Text>
          </View>
        </View>

        <View>
        <SnapCarousel venueItem={this.state.recipeItem} images={images}/>
        </View>


        <View style={{alignItems: 'center', marginTop: Dimensions.get('window').height*0.005, width: Dimensions.get('window').width*1}}>
        <Text style={recipeViewStyle.vibeHeading}>NüV User Rating</Text>
          <StarRating
            disabled={false}
            maxStars={5}
            rating={this.state.starRating}
            fullStarColor={'#a2e444'}
            containerStyle={{marginTop: Dimensions.get('window').height*0.02, marginBottom: Dimensions.get('window').height*0.02}}
          />
        </View>

        <View style={{alignItems: 'center', marginTop: Dimensions.get('window').height*0.005, width: Dimensions.get('window').width*1}}>
          <Text style={recipeViewStyle.vibeHeading}>Rate this recipe</Text>
            <StarRating
              disabled={false}
              maxStars={5}
              rating={this.state.starCount}
              selectedStar={(rating) => this.onStarRatingPress(rating)}
              fullStarColor={'#a2e444'}
              containerStyle={{marginTop: Dimensions.get('window').height*0.02, marginBottom: Dimensions.get('window').height*0.02}}
            />
        </View>

        <View style={recipeViewStyle.submitContainer}>
          <GlobalButton
            marginLeft={Dimensions.get('window').width*0.05}
            buttonTitle="Rate and go"
            onPress={() => this.postRating()}/>
        </View>

        <LikersOverlay
              likers={this.state.likers}
              overlayVisible={this.state.likersOverlayVisible}
              closeOverlay={this.closeLikersOverlay}
              currentUser={this.props.navigation.getParam('profile_id', 'NO-ID')}
              navigation={this.props.navigation}
        />
      </ScrollView>

    ) :

    <LoadingCelery />

  }
    </View>
  );
 }
}

const recipeViewStyle = StyleSheet.create({
  container: {
    backgroundColor:  'white',
    alignItems:       'center',
    justifyContent:   'center',
  },
  submitContainer: {
    alignItems:       'center',
    marginTop:        Dimensions.get('window').height*0.03,
    marginBottom:     Platform.OS === 'ios' ? Dimensions.get('window').height*0.05 : Dimensions.get('window').height*0.1
  },
  header: {
    textAlign:        'center',
    marginTop:        Constants.statusBarHeight+10,
    marginBottom:     Dimensions.get('window').height*0.01
  },
  recipeitem: {
    flex:             1,
    flexDirection:    'row',
    paddingBottom:    20,
  },
  recipetextcontainer: {
    flex:             1,
    flexDirection:    'column',
  },
  recipename: {
    color:            '#a2e444',
    fontSize:         Dimensions.get('window').width < 750 ? 20 : 26,
    fontWeight:       'bold',
    marginTop:        Dimensions.get('window').height*0.025,
    marginBottom:     Dimensions.get('window').height*0.025,
    marginLeft:       Dimensions.get('window').width*0.02,
    marginRight:      Dimensions.get('window').width*0.02,
    textAlign: 'center'
  },
  recipeLikes: {
    color:            '#a2e444',
    fontSize:         Dimensions.get('window').width > 750 ? 22 : 18,
    fontWeight:       'bold',
    marginTop:        20,
    marginBottom:     20,
  },
  recipetype: {
    color:            '#a2e444',
    fontSize:         15,
    fontWeight:       'bold',
    marginTop:        20,
    marginBottom:     20,
  },
  recipeingredients: {
    color:            '#a2e444',
    margin:           4,
    fontSize:         18,
    marginLeft:       15,
  },
  recipeingredientsbody: {
    margin:           4,
    fontSize:         15,
    marginBottom:     40,
    marginLeft:       15,
  },
  recipemethod: {
    color:            '#a2e444',
    margin:           4,
    fontSize:         18,
    marginLeft:       15,
  },
  recipemethodbody: {
    margin:           4,
    fontSize:         15,
    marginLeft:       15,
  },
    profileItem: {
    padding:          Dimensions.get('window').width* 0.025,
    fontSize:         Dimensions.get('window').width>750 ? 24 : 16 ,
    color:            'black'
  },
  vibeHeading: {
  fontSize:           Dimensions.get('window').width > 750 ? 27 : 20,
  textAlign:          'center',
  color:              '#a2e444',
  marginTop:          Dimensions.get('window').height*0.03
},
  submitContainer: {
    alignItems:       'center',
    marginTop:        Dimensions.get('window').height*0.03,
    marginBottom:     Platform.OS === 'ios' ? Dimensions.get('window').height*0.15 : Dimensions.get('window').height*0.15
  },

  shareContainer: {
      alignItems:     'center',
      marginTop:      Dimensions.get('window').height*0.03,
      marginBottom:   Platform.OS === 'ios' ? Dimensions.get('window').height*0.05 : Dimensions.get('window').height*0.05
    },
});
