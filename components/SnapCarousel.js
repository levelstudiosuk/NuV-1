import  Carousel     from 'react-native-snap-carousel';
import { View,
         StyleSheet,
         Text,
         Image}      from 'react-native';
import   React,
       { Component } from 'react';

export default class SnapCarousel extends React.Component {



    _renderItem ({item, index}) {
        return (
          <View style={snapCarouselStyle.slide}>
            <Text style={snapCarouselStyle.title}>
                <Image
                  source={item.image}
                  style={{width: 400, height: 350}}
                />
              {item.title}{"\n"}{item.description}
            </Text>
          </View>
        );
      }

    render () {

      var slides = [
      {
        image: require('../assets/venue_images/hndrsn1.png'),
        title: 'Cafe Interior',
        description: 'OOh, what a lovely kale milkshake',
      },
      {
        image: require('../assets/venue_images/hndrsn2.png'),
        title: 'Some Food',
        description: 'OOh, some carrot lasagne',
      },
      {
        image: require('../assets/venue_images/hndrsn3.png'),
        title: 'A table shot',
        description: 'OOh, some nice plums',
      },
      {
        image: require('../assets/venue_images/hndrsn4.png'),
        title: 'Hendersons Vegan Cafe 4',
        description: 'External Shot',
      },
    ];

        return (
            <Carousel
              ref={(c) => { this._carousel = c; }}
              data={slides}
              renderItem={this._renderItem}
              sliderWidth={400}
              sliderHeight={400}
              itemWidth={300}
              itemHeight={300}
              layout={'default'}
              layoutCardOffset={9}
              vertical={false}

              activeSlideAlignment={'center'}
            />
          );
        }
      }

const snapCarouselStyle = StyleSheet.create({

slide:          {
  justifyContent:    'center',
  alignItems:        'center',
  },
title:          {
  color:            'black',
  fontSize:          18,
  textAlign:         'center',
  },
});
