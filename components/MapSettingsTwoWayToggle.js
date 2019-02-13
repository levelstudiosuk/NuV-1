import   React from 'react'
import { View,
         Text,
         Platform,
         Image,
         TouchableHighlight,
         Dimensions } from 'react-native'
import   MultiSwitch from "./MultiSwitch.js";
import { Icon } from "native-base"
import _ from 'lodash';

export default class MapSettingsTwoWayToggle extends React.Component {

    constructor(props) {
    super(props);

    this.setActiveItem = this.setActiveItem.bind(this);
    this.changeToggleSelection = this.changeToggleSelection.bind(this);

  }

    state = {
        activeIndex: this.props.activeIndex ? this.props.activeIndex : 0,
        vegan: false,
        vegetarian: true
      };

  changeToggleSelection(number){

      if (number === 0 ) {
      this.setState({
        vegan: true,
        vegetarian: false
      }, function(){
        this.props.changeToggleSelection ? this.props.changeToggleSelection(true) : console.log("Not in RecipeList.js");
      })
    }

      else if (number === 1){
      this.setState({
        vegan: false,
        vegetarian: true
      }, function(){
        this.props.changeToggleSelection ? this.props.changeToggleSelection(false) : console.log("Not in RecipeList.js");
      })
    }

    else {
      this.setState({
        vegan: false,
        vegetarian: false
      }, function(){
        this.props.changeToggleSelection ? this.props.changeToggleSelection(false) : console.log("Not in RecipeList.js");
      })
    }

  }

  setActiveItem(number){

    this.setState({
      activeIndex: number
    }, function(){

      this.changeToggleSelection(number)

    }
  )

  }

    render() {

        return (
          <View style={{flex: 1, flexDirection: 'row', justifyContent: "space-between", alignItems: 'center'}}>

            <View style={{alignItems: 'center', marginLeft: 5}}>
              <MultiSwitch choiceSize={Dimensions.get('window').width > 500 && this.props.marginLeft ? Dimensions.get('window').width*0.075 : Dimensions.get('window').width*0.1}
                            activeItemStyle={[{color: 'white'}, {color: 'white'}, {color: 'white'}, ]}
                            layout={{vertical: 0, horizontal: -1}}
                            onActivate={(number) => this.setActiveItem(number)}
                            containerStyles={_.times(3, () => ({
                              backgroundColor: '#2e8302',
                              borderRadius: 40,
                              borderWidth: 1,
                              borderColor: "white",
                              justifyContent: 'space-between'

                            }))}
                            active={this.props.activeIndex ? this.props.activeIndex : 0}>
                            <View>
                            <Text style={{color: this.state.activeIndex === 0 ? 'black' : 'white'}}>Vgn</Text>
                            </View>
                            <View>
                            <Text style={{color: this.state.activeIndex === 1 ? 'black' : 'white'}}>Vgtrn</Text>
                            </View>
              </MultiSwitch>
            </View>
          </View>
        )
    }
}
