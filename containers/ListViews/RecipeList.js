import React from 'react';
import { FlatList, StyleSheet, ScrollView, Platform, TouchableHighlight, Image, TextInput, Dimensions, Button, Text, View } from 'react-native';
import { Constants } from 'expo'
import GlobalButton from '../../components/GlobalButton.js';
import TwoWayToggle from '../../components/TwoWayToggle.js';
import AutoHeightImage from 'react-native-auto-height-image';
import Expo, { ImagePicker } from 'expo';
import {Permissions} from 'expo'
const { width, height } = Dimensions.get('window');
import Pagination from 'react-native-pagination';

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
    items: [{name: 'Spaghetti Marinara', prep_time: '15 minutes'}, {name: 'Iberian Pepper Risotto', prep_time: '20 minutes'}, {name: 'Asparagus and Beetroot Vegetarian Pizza', prep_time: '45 minutes'}]
  }

  async componentDidMount() {

  await Font.loadAsync({
     'PoiretOne-Regular': require('../../assets/fonts/PoiretOne-Regular.ttf'),
   });

    this.setState({ fontLoaded: true });

   }

  getFlatListItems = () => {
    this.setState({ isLoading: true });
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
  };

  setItemAsActive(activeItem) {
      if (this._isMounted) {
    this.setState({ scrollToItemRef: activeItem });
  }
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
            s.renderItem,
            this.state.activeId === _.get(o, 'item.id', false)
              ? { postcodegroundColor: 'black', borderRadius: 10, marginBottom: 0 }
              : { backgroundColor: 'black', marginBottom: 0 }
          ]}
        >
        <AutoHeightImage width={Dimensions.get('window').width*0.25} source={require('../../assets/AppIcons/book.png')}/>

          <Text
            style={[
              s.name2,
              this.state.activeId === o.item.id
                ? { color: 'limegreen', fontSize: 16 }
                : { color: 'white', fontSize: 16 }
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
            </View>
          )}

         <View style={{alignItems: 'center', marginTop: Dimensions.get('window').height*0.20, height: Dimensions.get('window').height*0.6, width: Dimensions.get('window').width, borderWidth: 1, borderTopRightRadius: 20, borderBottomLeftRadius: 20, borderBottomRightRadius: 20, borderTopLeftRadius: 20}}>


         <Image
           style={{width: this.state.addressBookImageWidth, height: this.state.addressBookImageHeight, borderRadius: 10}}
           source={{uri: `${this.state.addressBookImage}`}}
           onLoad={this.onAddressBookImageLoad}
           />
           <Text onPress={() => this.setState({clickedDinosaur: this.state.activeItem.name}, function(){ this.toggleDinosaurView() })} style={{marginTop: Dimensions.get('window').height*0.02, textAlign: 'center', color: 'white', fontSize: 20, paddingLeft: 0}} >
            Click image to view
           </Text>
          </View>
          )}

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
            dotIconColorActive={'limegreen'}
            dotIconNameNotActive={'checkbox-blank-circle-outline'}
            dotIconColorNotActive={'limegreen'}
            dotIconNameEmpty={'close'}
            dotTextHide={true}
            dotTextColor={'limegreen'}
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

        <View style={{flexDirection: 'row', position: 'absolute', top: height*0.065}}>
    <TouchableHighlight
      onPress={() => {
        this.props.returnToErasPage();
      }}>
    <Image source={require('../../assets/AppIcons/book.png')} style={{height: 25, width: 25, marginBottom: 17, marginRight: Dimensions.get('window').width*0.06}}/>
    </TouchableHighlight>

    <TouchableHighlight
      onPress={() => {
        this.props.toggleLayout();
      }}>
    <Image source={require('../../assets/AppIcons/book.png')} style={{height: 25, width: 25, marginBottom: 17, marginLeft: Dimensions.get('window').width*0.06}}/>
    </TouchableHighlight>

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
    backgroundColor: 'black'
  },
  innerContainer: {
    flex: 1.17,
    position: 'relative',
    top: height*0.15,
    height,
    width,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
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
    color: 'limegreen',
  },
});
