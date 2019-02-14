import    React, {
          Component } from 'react';
import {  View,
          Image,
          Dimensions,
          TouchableHighlight,
          Text,
          StyleSheet } from 'react-native';
import    ImageSlider from 'react-native-image-slider';


  const images = [
    'https://livekindlyproduction-8u6efaq1lwo6x9a.stackpathdns.com/wp-content/uploads/2017/07/smoothie.jpg',
    'http://eatwildgreens.com/wp-content/uploads/2017/09/AcaiBowl-1024x723.jpg',
    'https://amp.businessinsider.com/images/57ce9591dd08957e2d8b4af4-750-562.jpg',
    'https://swirled.com/wp-content/uploads/2017/04/best-vegan-instagram-accounts-1-750x549.jpg',
    'https://images.happycow.net/venues/1024/12/19/hcmp121998_461296.jpeg',
    'https://www.saveur.com/sites/saveur.com/files/styles/1000_1x_/public/edgar-raw_594x745.jpg?itok=eSXeJMTy&fc=50,50',
    'https://s3-us-west-2.amazonaws.com/beachbody-blog/uploads/2017/04/20-of-the-Best-Healthy-Food-Instagrammers-thedelicious.png',
    'http://coveteur.com/wp-content/uploads/2017/03/best-food-instagram-accounts-17.jpg',
    'https://www.saveur.com/sites/saveur.com/files/styles/1000_1x_/public/the-sunkissed-kitchen_619x748.jpg?itok=NdwcI6uH&fc=50,50',
    'https://www.livekindly.co/wp-content/uploads/2017/07/vegan-richa-e1500398339476.png',
    'https://london.carpe-diem.events/data/afisha/o/b6/ec/b6ec612156.jpg?1539780381',
    'https://static.boredpanda.com/blog/wp-content/uploads/2017/09/vegan-colorful-food-arrangements-jose-naturallyjo-7-59b0ee2425e1d__700.jpg',
    'https://i.pinimg.com/736x/90/40/e1/9040e11548badaa2f2f82769e5a86cde--b-foods-fruit-bowls.jpg',
    'https://i.pinimg.com/originals/3b/5f/3f/3b5f3fe6d684d7cb19baa41820a66981.jpg',
  ];

const HeroImageCarousel = () => (

  <View style={styles.container}>

        <ImageSlider
          loop
          autoPlayWithInterval={2000}
          images={images}
          customSlide={({ index, item, style, width }) => (
            <View
              key={index}
              style={[
                style,
                styles.customSlide
              ]}>
              <Image source={{ uri: item }} style={styles.customImage} />
            </View>
          )}
        />
      </View>
    );


const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get('window').width*1,
    height: Dimensions.get('window').height*0.38,
  },
  customSlide: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  customImage: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height*0.4
  },
});


 export default HeroImageCarousel;
