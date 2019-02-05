import React from 'react';
import { FlatList, TouchableOpacity, StyleSheet, ScrollView, Platform, TouchableHighlight, Image, TextInput, Dimensions, Button, Text, View } from 'react-native';
import { Constants, Font } from 'expo'
import GlobalButton from '../../components/GlobalButton.js';
import TwoWayToggle from '../../components/TwoWayToggle.js';
import AutoHeightImage from 'react-native-auto-height-image';
import Expo, { ImagePicker } from 'expo';
import AddItemButton from '../../components/AddItemButton.js';
import FaveButton from '../../components/FaveButton.js';
import SmallTwoWayToggle from '../../components/SmallTwoWayToggle.js';
import _ from 'lodash';
const ITEM_HEIGHT = 100;
import {Permissions} from 'expo'
const { width, height } = Dimensions.get('window');
import Pagination from 'react-native-pagination';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Autocomplete from 'react-native-autocomplete-input';


export default class RecipeList extends React.Component {
  static navigationOptions = {
    title: null,
    headerTitle: (
     <AutoHeightImage width={75} style={{position: 'absolute', right: Platform.OS === 'android' ? 0 : -65 }} source={require('../../assets/AppIcons/transparentlogo.png')}/>
 ),
}

  constructor(props) {
  super(props);

}

  state = {
    isLoading: false,
    items: [
    {key: 0, id: 0, name: 'Spaghetti Marinara', prep_time: '15 minutes', cook_time: '1 hour', image: require('../../assets/recipe_images/marinara.png')},
    {key: 1, id: 1, name: 'Iberian Pepper Risotto', prep_time: '20 minutes', cook_time: '5 minutes', image: require('../../assets/recipe_images/pepper_risotto.png')},
    {key: 2, id: 2, name: 'Asparagus and Beetroot Pizza', prep_time: '45 minutes', cook_time: '35 minutes', image: require('../../assets/recipe_images/asparagus.png')},
    {key: 3, id: 3, name: 'Basil and Pesto Baguette', prep_time: '15 minutes', cook_time: '10 minutes', image: require('../../assets/recipe_images/basil_baguette.png')},
    {key: 4, id: 4, name: 'Vegan Potato Curry', prep_time: '15 minutes', cook_time: '40 minutes', image: require('../../assets/recipe_images/spudcurry.png')}
  ],
  recipeTyped: ""
  }

  async componentDidMount() {

  await Font.loadAsync({
     'PoiretOne-Regular': require('../../assets/fonts/PoiretOne-Regular.ttf'),
   });

    this.setState({ fontLoaded: true });

    this.setState({
      names: this.state.items.map((recipe) => recipe.name)
    })

   }

  getFlatListItems = () => {
    this.setState({ isLoading: true });
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
  };

  setItemAsActive(activeItem) {
    this.setState({ scrollToItemRef: activeItem });
    this.setState({
      activeId: activeItem.item.id,
      activeItem: activeItem
  })
}

  searchBarPlaceholderText(){
    return `Enter recipe key word`;
  }

  removeNonAlphanumeric(string){
    return string.replace(/\W/g, '');
  }

  findRecipe(query, diet) {

  var sanitizedQuery = this.removeNonAlphanumeric(query);

   if (sanitizedQuery === '') {
     return [];
   }

   if (diet){
     var recipes = this.state.names;
   }
   else {
     var recipes = this.state.names;
   }

   const regex = new RegExp(`${sanitizedQuery.trim()}`, 'i');
   return recipes.filter(recipe => recipe.search(regex) >= 0);
  }

  renderMatches(recipes){
    return recipes.map((recipe, i) =>
      <TouchableOpacity key={i} style={{flexDirection: 'row'}}>
      <Text style={{flex: 1, flexWrap: 'wrap', textAlign: 'center', color: 'black', fontSize: 16, paddingTop: 10, paddingBottom: 10}} key={i}>{recipe}</Text>
      </TouchableOpacity>
    )
  }
  renderItem = (o, i) => {
    return (
      <View
        style={{
          flex: 1,
          margin: 5,
          marginTop: 25,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <TouchableOpacity
          onPress={() => this.setItemAsActive(o)}
          style={[
            registerUserStyle.renderItem,
            this.state.activeId === _.get(o, 'item.id', false)
              ? { postcodegroundColor: 'white', borderRadius: 10, marginBottom: 0 }
              : { backgroundColor: 'white', marginBottom: 0 }
          ]}
        >
        <AutoHeightImage width={Dimensions.get('window').width*0.20} source={require('../../assets/AppIcons/plate.png')}/>
          <Text
            style={[
              registerUserStyle.name2,
              this.state.activeId === o.item.id
                ? { color: '#0dc6b5', fontSize: Dimensions.get('window').width > 750 ? 20 : 16, flexWrap: 'wrap', textAlign: 'center', width: Dimensions.get('window').width*0.25 }
                : { color: 'black', fontSize: Dimensions.get('window').width > 750 ? 20 : 16, flexWrap: 'wrap', textAlign: 'center', width: Dimensions.get('window').width*0.25 }
            ]}
          >
            {o.item.name ? o.item.name : 'Unknown'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  clearList() {
    this.setState({ items: [] });
  }
  onEndReached(o) {
    console.log(' reached end: ', o);
  }

  onViewableItemsChanged = ({ viewableItems }) =>
    this.setState({ viewableItems });

  render() {

    const {navigate} = this.props.navigation;

    const query = this.state.recipeTyped;
    const recipes = this.findRecipe(query, false);
    const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();

    const self = this;

    const ListEmptyComponent = () => (
      <View
        style={{
          flex: 1,
          height,
          width,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <TouchableOpacity onPress={() => this.getFlatListItems()}>
          <Text
            style={{
              color: 'rgba(0,0,0,0.5)',
              fontSize: 20,
              textAlign: 'center',
              margin: 10
            }}
          >
        Nothing is Here!
          </Text>
          <Text
            style={{
              color: 'rgba(0,0,0,0.5)',
              fontSize: 15,
              textAlign: 'center'
            }}
          >
            Try Again?
          </Text>
        </TouchableOpacity>
      </View>
    );
    return (
      <View style={[registerUserStyle.firstContainer]}>

        <View style={registerUserStyle.innerContainer}>

          {!this.state.activeItem && (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1
              }}
            >
            <Text
              style={{
                textAlignVertical: 'center',
                color: 'black',
                textAlign: 'center',
                fontWeight: '400',
                fontSize: 21,
                margin: 30
              }}
            >
              Scroll through our recipes and click on any that catch your eye!
            </Text>
            <AutoHeightImage source={require('../../assets/AppIcons/transparentlogo.png')} width={Dimensions.get('window').width*0.5} />
            </View>

          )}

          { this.state.activeItem ? (

          <View style={{alignItems: 'center', marginTop: Dimensions.get('window').height*0.20, height: Dimensions.get('window').height*0.6, width: Dimensions.get('window').width}}>

          <TouchableHighlight
          onPress={() => navigate('RecipeView', {name: this.state.activeItem.item.name, prep_time: this.state.activeItem.item.prep_time, cook_time: this.state.activeItem.item.cook_time, image: this.state.activeItem.item.image})}
          style={underlayColor="white"}
          >
          <AutoHeightImage
            style={{marginTop: Dimensions.get('window').height*0.05}}
            width={Dimensions.get('window').width*0.5}
            source={this.state.activeItem.item.image}
            />
          </TouchableHighlight>

          <Text style={{color: '#0dc6b5', marginTop: Dimensions.get('window').height*0.02, fontSize: Dimensions.get('window').width > 750 ? 30 : 20, textAlign: 'center'}}>{this.state.activeItem.item.name}</Text>

          <Text style={{marginTop: Dimensions.get('window').height*0.01, fontSize: Dimensions.get('window').width > 750 ? 25 : 16, textAlign: 'center'}}><AutoHeightImage source={require('../../assets/AppIcons/cooktime.png')} width={Dimensions.get('window').width*0.05} /> Prep: {this.state.activeItem.item.prep_time}</Text>

          <Text style={{marginTop: Dimensions.get('window').height*0.01, fontSize: Dimensions.get('window').width > 750 ? 25 : 16, textAlign: 'center'}}><AutoHeightImage source={require('../../assets/AppIcons/preptime.png')} width={Dimensions.get('window').width*0.05} /> Cook: {this.state.activeItem.item.cook_time}</Text>

           </View>

         ) : null

       }


        </View>

        <View style={{ flex: 1, height: height, width}}>
          <FlatList
          style={{marginBottom: -(height*0.08)}}
            ListEmptyComponent={ListEmptyComponent}
            horizontal
            ref={r => (this.refs = r)}
            getItemLayout={(data, index) => ({
              length: ITEM_HEIGHT,
              offset: ITEM_HEIGHT * index,
              index
            })}
            onRefresh={o => console.log(o)}
            initialScrollIndex={0}
            refreshing={this.state.isLoading}
            onEndReached={o => this.onEndReached}
            keyExtractor={(o, i) => o.key.toString()}
            data={this.state.items}
            scrollRenderAheadDistance={width * 2}
            renderItem={this.renderItem}
            onViewableItemsChanged={this.onViewableItemsChanged}
          />

        {
          this.state.items ? (
          <Pagination
            horizontal
            debugMode={true}
            listRef={this.refs}
            endDotIconFamily={'MaterialIcons'}
            dotIconNameActive={'checkbox-blank-circle'}
            dotIconColorActive={'#0DC6B5'}
            dotIconNameNotActive={'checkbox-blank-circle-outline'}
            dotIconColorNotActive={'#92FE9D'}
            dotIconNameEmpty={'close'}
            dotTextHide={true}
            dotTextColor={'#92FE9D'}
            dotIconSizeNotActive={15}
            dotIconSizeActive={15}
            dotIconSizeEmpty={15}
            dotColorhasNotSeen={"red"}
            paginationVisibleItems={this.state.viewableItems}
            paginationItems={this.state.items}
            paginationItemPadSize={3}
          />
        ) : null
      }
        </View>

        <View style={{flex: 1, flexDirection: 'row', position: 'absolute', top: height*0.012}}>
          <SmallTwoWayToggle marginLeft={5}/>
          <AddItemButton navigation={this.props.navigation}
          onPress={() => navigate('RecipeForm', {avatar: this.props.navigation.getParam('avatar', 'NO-ID'), token: this.props.navigation.getParam('token', 'NO-ID'), id: this.props.navigation.getParam('id', 'NO-ID'), name: this.props.navigation.getParam('name', 'NO-ID'), bio: this.props.navigation.getParam('bio', 'NO-ID'), location: this.props.navigation.getParam('location', 'NO-ID'), user_is_vegan: this.props.navigation.getParam('user_is_vegan', 'NO-ID'))} />
          {/*<FaveButton navigation={this.props.navigation}/>*/}
        </View>

    <View style={{flexDirection: 'column', position: 'absolute', borderRightWidth: 0.5, borderColor: 'black', top: height*0.025}}>

    <Autocomplete
      autoCapitalize="none"
      autoCorrect={false}
      containerStyle={{width: Dimensions.get('window').width*0.43}}
      data={this.state.names === 1 && comp(query, this.state.names[0]) ? [] : recipes}
      defaultValue={query}
      inputContainerStyle={{flex: 1}}
      onChangeText={recipe => this.setState({ recipeTyped: recipe })}
      placeholder={this.searchBarPlaceholderText()}
      placeholderTextColor="black"
      renderItem={({ recipe }) => (
        <TouchableOpacity onPress={() => this.setState({ recipeTyped: this.props`${dinosaur}` })}>
        </TouchableOpacity>
      )}
    />

      {this.findRecipe(query).length > 0 ? (
        <View style={{backgroundColor: 'white', borderBottomWidth: 0.5, borderRightWidth: 0.5, borderLeftWidth: 0.5, borderColor: 'black', height: height*0.55}}>
        <ScrollView style={{flex: 1, flexWrap: 'wrap'}}>
        {this.renderMatches(recipes)}
        </ScrollView>
        </View>
      ) : (
        <View style={{backgroundColor: 'white', borderBottomWidth: 0.5, borderRightWidth: 0.5, borderLeftWidth: 0.5, borderColor: 'black'}}>
        <ScrollView>
        {this.renderMatches(recipes)}
        </ScrollView>
        </View>
      )}

    </View>

    {this.state.activeItem ? (
    <View style={{flexDirection: 'column', position: 'absolute', top: Dimensions.get('window').height*0.14}}>
    <Text style={[registerUserStyle.galleryNameHeader, { textAlign: 'center'}]}>{this.state.activeItem.name}</Text>
    </View>
  ) : null
}

    </View>
)

}
}

const registerUserStyle = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitContainer: {
    alignItems: 'center',
    marginTop: Dimensions.get('window').height*0.03,
    marginBottom: Platform.OS === 'ios' ? Dimensions.get('window').height*0.05 : Dimensions.get('window').height*0.05
  },
  header: {
    fontSize: 24,
    color: 'green',
    textAlign: 'center',
    marginTop:  Constants.statusBarHeight+10,
    marginBottom: Dimensions.get('window').height*0.01
  },
  firstContainer: {
    flex: 1,
    height,
    width,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  innerContainer: {
    flex: 1,
    position: 'relative',
    top: height*0.04,
    height,
    width,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },
  galleryNameHeader: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    fontSize: 26,
    color: 'black',
  },
});
