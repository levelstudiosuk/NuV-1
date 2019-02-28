import    React from 'react'
import {  View,
          Text,
          Platform,
          Image,
          TouchableHighlight,
          Dimensions } from 'react-native'
import    MultiSwitch from "./MultiSwitch.js";
import {  Icon } from "native-base"
import _ from 'lodash';
export default class VWayToggle extends React.Component {

    constructor(props) {
    super(props);

    this.setActiveItem = this.setActiveItem.bind(this);
    this.changeToggleSelection = this.changeToggleSelection.bind(this);
    }

    state = {
      activeIndex: this.props.editingUser === true ? this.props.activeIndex : 1,
      vegan: this.determineWhetherVegan(),
      vegetarian: this.determineWhetherVegetarian(),
      vCurious: this.determineWhetherVCurious()
    };

  determineWhetherVegan(){
    if (this.props.editingUser){
      if (this.props.user_is_vegan === "vegan"){
        return true;
        }
      else {
        return false;
        }
      }
      else {
        return false;
      }
    }

  determineWhetherVegetarian(){
    if (this.props.editingUser){
      if (this.props.user_is_vegan === "vegetarian"){
        return true;
        }
      else {
        return false;
        }
      }
      else {
        return true;
      }
    }

  determineWhetherVCurious(){
    if (this.props.editingUser){
      if (this.props.user_is_vegan === null){
        return true;
        }
      else {
        return false;
        }
      }
      else {
        return false;
      }
    }

  changeToggleSelection(number){
      if (number === 0 ) {
      this.setState({
        vegan: true,
        vegetarian: false,
        vCurious: false
      }, function(){
        this.props.returnVToggleSelection("vegan")
      })
    }

      else if (number === 1){
      this.setState({
        vegan: false,
        vegetarian: true,
        vCurious: false
      }, function(){
        this.props.returnVToggleSelection("vegetarian")
      })
    }

    else {
      this.setState({
        vegan: false,
        vegetarian: false,
        vCurious: true
      }, function(){
        this.props.returnVToggleSelection("vCurious")
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

    <View style={{
      flex: 1,
      flexDirection: 'column',
      justifyContent: "space-between",
      alignItems: 'center'}}>

      <View style={{
        width: Dimensions.get('window').width*0.3,
        justifyContent: 'center',
        alignItems: 'center'}}>

        <MultiSwitch
        choiceSize={Dimensions.get('window').width > 500 ? Dimensions.get('window').width*0.13 : Dimensions.get('window').width*0.21}
        activeItemStyle={[{color: 'white'}, {color: 'white'}, {color: 'white'}, ]}
        layout={{vertical: 0, horizontal: -1}}
        onActivate={(number) => this.setActiveItem(number)}
        containerStyles={_.times(3, () => ({
            backgroundColor: '#a2e444',
            borderRadius: 40,
            borderWidth: 1,
            borderColor: "white",
            justifyContent: 'space-between'
            }))}
        active={this.props.editingUser === true ? this.props.activeIndex : 1}>

        <View>
          <Text style={{color: this.state.activeIndex === 0 ? 'black' : 'white'}}>
            Vegan
          </Text>
        </View>

        <View>
          <Text style={{color: this.state.activeIndex === 1 ? 'black' : 'white', fontSize: 12}}>
            Vegetarian
          </Text>
        </View>

        <View>
          <Text style={{color: this.state.activeIndex === 2 ? 'black' : 'white'}}>
            V-curious
          </Text>
        </View>
      </MultiSwitch>
    </View>
  </View>
  )
  }
}
