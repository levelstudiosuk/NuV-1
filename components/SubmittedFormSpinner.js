import   React,
       { Component } from 'react'
import { Button } from 'react-native-elements';
import { StyleSheet,
         View,
         TouchableHighlight,
         Image,
         Dimensions } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

export default class SubmittedFormSpinner extends Component {

  render() {
    return (

      <Spinner
         visible={this.props.spinner}
         textContent={this.props.message ? this.props.message : 'NüV is processing your data...'}
         textStyle={{color: 'white'}}
         overlayColor={'rgba(0,0,0,0.8)'}
       />
    )
  }
}
