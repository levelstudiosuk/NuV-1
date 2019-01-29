import React from 'react';
import { FlatList, TouchableOpacity, StyleSheet, ScrollView, Platform, TouchableHighlight, Image, TextInput, Dimensions, Button, Text, View } from 'react-native';
import { Constants, Font } from 'expo'
import GlobalButton from '../../components/GlobalButton.js';
import TwoWayToggle from '../../components/TwoWayToggle.js';
import AutoHeightImage from 'react-native-auto-height-image';
import Expo, { ImagePicker } from 'expo';
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
    {key: 0, id: 0, name: 'Spaghetti Marinara', prep_time: '15 minutes', image: require('../../assets/recipe_images/marinara.png')},
    {key: 1, id: 1, name: 'Iberian Pepper Risotto', prep_time: '20 minutes', image: require('../../assets/recipe_images/pepper_risotto.png')},
    {key: 2, id: 2, name: 'Asparagus and Beetroot Pizza', prep_time: '45 minutes', image: require('../../assets/recipe_images/asparagus.png')},
    {key: 3, id: 3, name: 'Basil and Pesto Baguette', prep_time: '15 minutes', image: require('../../assets/recipe_images/basil_baguette.png')}
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
    console.log("ACTIVE", this.state.activeItem);
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
      <TouchableOpacity>
      <Text style={{textAlign: 'center', color: 'black', fontSize: 16, paddingTop: 10, paddingBottom: 10}} key={i}>{recipe}</Text>
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
        <AutoHeightImage width={Dimensions.get('window').width*0.25} source={require('../../assets/AppIcons/book.png')}/>
          <Text
            style={[
              registerUserStyle.name2,
              this.state.activeId === o.item.id
                ? { color: 'green', fontSize: 16 }
                : { color: 'black', fontSize: 16 }
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
              Scroll through the NüV recipe base and check out any that catch your eye!
            </Text>
            </View>
          )}

          { this.state.activeItem ? (

          <View style={{alignItems: 'center', marginTop: Dimensions.get('window').height*0.20, height: Dimensions.get('window').height*0.6, width: Dimensions.get('window').width}}>

          <AutoHeightImage
            style={{marginTop: Dimensions.get('window').height*0.05}}
            width={Dimensions.get('window').width*0.5}
            source={this.state.activeItem.item.image}
            />

          <Text style={{marginTop: Dimensions.get('window').height*0.04, fontSize: 30, textAlign: 'center'}}>Preparation time: {this.state.activeItem.item.prep_time}</Text>

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
            dotIconColorActive={'black'}
            dotIconNameNotActive={'checkbox-blank-circle-outline'}
            dotIconColorNotActive={'black'}
            dotIconNameEmpty={'close'}
            dotTextHide={true}
            dotTextColor={'black'}
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

    <View style={{flexDirection: 'column', position: 'absolute', top: height*0.065}}>

    <Autocomplete
      autoCapitalize="none"
      autoCorrect={false}
      containerStyle={{width: Dimensions.get('window').width*0.71}}
      data={this.state.names === 1 && comp(query, this.state.names[0]) ? [] : recipes}
      defaultValue={query}
      inputContainerStyle={{flex: 1}}
      onChangeText={recipe => this.setState({ recipeTyped: recipe })}
      placeholder={this.searchBarPlaceholderText()}
      placeholderTextColor="white"

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
    top: height*0.10,
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
