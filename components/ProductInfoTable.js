import React, { Component, Fragment } from 'react'
import { View,
         Dimensions,
         StyleSheet, Text } from 'react-native';
import Table from 'react-native-simple-table'
import { Icon } from 'react-native-material-ui';

export default class ProductInfoTable extends Component {

  constructor(props) {
   super(props);
   this.state = {
      columns: [
  {
    dataIndex: 'detail',
    width: 105
  },
  {
    dataIndex: 'status',
    width: 105
  },
]
   }
 }

 render() {
   const state = this.state;
   return (
        <Table
          height={Dimensions.get('window').height*0.4}
          columnWidth={40}
          columns={this.state.columns}
          dataSource={
            [
          {detail: 'Vegan', status: this.props.productDetails.vegan === true ? <Icon name="info-outline"/>
 :                <Icon name="info-outline"/>
},
          {detail: 'Vegetarian', status: this.props.productDetails.vegetarian === true ? 'Yes' : 'No'},
          {detail: 'Eco', status: this.props.productDetails.eco === true ? 'Yes' : 'No'},
          {detail: 'Fairtrade', status: this.props.productDetails.fairtrade === true ? 'Yes' : 'No'},
          {detail: 'Organic', status: this.props.productDetails.organic === true ? 'Yes' : 'No'}
        ]
        }
        />
   )
 }
}

const styles = StyleSheet.create({
  title: {
     fontSize: 18,
     padding: 10,
     textAlign: 'center'
   }
});
