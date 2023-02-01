import React, {useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useTheme} from '@react-navigation/native';

import Swiper from 'react-native-swiper';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import Fontisto from 'react-native-vector-icons/Fontisto';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import StarRating from '../components/StarRating';

import { useDispatch} from "react-redux";
GOOGLE_MAPS_APIKEY = "AIzaSyCfacCZ8-nf1bwKN96-6u0KUCFre34dm9A";

const HomeScreen = ({navigation}) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle={theme.dark ? 'light-content' : 'dark-content'} />
      <View style={styles.sliderContainer}>
        <Swiper
          autoplay
          horizontal={false}
          height={200}
          activeDotColor="#FF6347">
          <View style={styles.slide}>
            <Image
              // source={require('../assets/banners/food-banner1.jpg')}
              source={{uri: 'https://i.ibb.co/cyvcpfF/uberx.png'}}
              resizeMode="cover"
              style={styles.sliderImage}
            />
          </View>
          <View style={styles.slide}>
            <Image
              source={{uri: 'https://i.ibb.co/YDYMKny/uberxl.png'}}
              resizeMode="cover"
              style={styles.sliderImage}
            />
          </View>
          <View style={styles.slide}>
            <Image
              source={{uri: 'https://i.ibb.co/Xx4G91m/uberblack.png'}}
              resizeMode="cover"
              style={styles.sliderImage}
            />
          </View>
          <View style={styles.slide}>
            <Image
              source={{uri: 'https://i.ibb.co/1nStPWT/uberblacksuv.png'}}
              resizeMode="cover"
              style={styles.sliderImage}
            />
          </View>
        </Swiper>
      </View>

      <View style={styles.categoryContainer}>
        <TouchableOpacity
          style={styles.categoryBtn}
          onPress={() =>
            navigation.navigate('CardListScreen', {title: 'Restaurant'})
          }>
          <View style={styles.categoryIcon}>
            {/* <Ionicons name="ios-restaurant" size={35} color="#FF6347" /> */}
            <Image style={{width:50, height:50}} source={{uri: 'https://i.ibb.co/Xx4G91m/uberblack.png'}}></Image>
          </View>
          {/* <Text style={styles.categoryBtnTxt}>Restaurant</Text> */}
          <Text style={styles.categoryBtnTxt}>Standard Car</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.categoryBtn}
          onPress={() =>
            navigation.navigate('CardListScreen', {title: 'Fastfood Center'})
          }>
          <View style={styles.categoryIcon}>
            {/* <MaterialCommunityIcons
              name="food-fork-drink"
              size={35}
              color="#FF6347"
            /> */}
             <Image style={{width:50, height:50}} source={{uri: 'https://i.ibb.co/1nStPWT/uberblacksuv.png'}}></Image>
          </View>
          {/* <Text style={styles.categoryBtnTxt}>Fastfood Center</Text> */}
          <Text style={styles.categoryBtnTxt}>SUV</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryBtn} onPress={() => {}}>
          <View style={styles.categoryIcon}>
            {/* <MaterialCommunityIcons name="food" size={35} color="#FF6347" /> */}
            <Image style={{width:50, height:50}} source={{uri: 'https://i.ibb.co/YDYMKny/uberxl.png'}}></Image>            
          </View>
          {/* <Text style={styles.categoryBtnTxt}>Snacks Corner</Text> */}
          <Text style={styles.categoryBtnTxt}>10 Seater</Text>
        </TouchableOpacity>
      </View>
      {/* <View style={[styles.categoryContainer, {marginTop: 10}]}>
        <TouchableOpacity style={styles.categoryBtn} onPress={() => {}}>
          <View style={styles.categoryIcon}>
            <Fontisto name="hotel" size={35} color="#FF6347" />
          </View>
          <Text style={styles.categoryBtnTxt}>Hotels</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryBtn} onPress={() => {}}>
          <View style={styles.categoryIcon}>
            <Ionicons name="md-restaurant" size={35} color="#FF6347" />
          </View>
          <Text style={styles.categoryBtnTxt}>Dineouts</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryBtn} onPress={() => {}}>
          <View style={styles.categoryIcon}>
            <MaterialIcons name="expand-more" size={35} color="#FF6347" />
          </View>
          <Text style={styles.categoryBtnTxt}>Show More</Text>
        </TouchableOpacity>
      </View> */}

      <View style={styles.cardsWrapper}>
        <Text
          style={{
            alignSelf: 'center',
            fontSize: 18,
            fontWeight: 'bold',
            color: '#333',
          }}>
          {/* Recently Viewed */}
          Recently Travel
        </Text>
        <View style={styles.card}>
          <View style={styles.cardImgWrapper}>
            {/* <Image
              source={require('../assets/banners/food-banner2.jpg')}
              resizeMode="cover"
              style={styles.cardImg}
            /> */}
            <Image          
              source={{uri: 'https://i.ibb.co/cyvcpfF/uberx.png'}}
              resizeMode="cover"
              style={styles.cardImg}
            />
          </View>
          <View style={styles.cardInfo}>
            <Text style={styles.cardTitle}>Awesome ride</Text>
            <StarRating ratings={4} reviews={99} />
            <Text style={styles.cardDetails}>
              Amazing description for this amazing service
            </Text>
          </View>
        </View>
        <View style={styles.card}>
          <View style={styles.cardImgWrapper}>
            {/* <Image
              source={require('../assets/banners/food-banner3.jpg')}
              resizeMode="cover"
              style={styles.cardImg}
            /> */}
             <Image
              source={{uri: 'https://i.ibb.co/1nStPWT/uberblacksuv.png'}}
              resizeMode="cover"
              style={styles.cardImg}
            />
          </View>
          <View style={styles.cardInfo}>
            <Text style={styles.cardTitle}>Awesome ride</Text>
            <StarRating ratings={4} reviews={99} />
            <Text style={styles.cardDetails}>
              Amazing description for this amazing service
            </Text>
          </View>
        </View>
        <View style={styles.card}>
          <View style={styles.cardImgWrapper}>
            {/* <Image
              source={require('../assets/banners/food-banner4.jpg')}
              resizeMode="cover"
              style={styles.cardImg}
            /> */}
             <Image
              source={{uri: 'https://i.ibb.co/Xx4G91m/uberblack.png'}}
              resizeMode="cover"
              style={styles.cardImg}
            />
          </View>
          <View style={styles.cardInfo}>
            <Text style={styles.cardTitle}>Awesome ride</Text>
            <StarRating ratings={4} reviews={99} />
            <Text style={styles.cardDetails}>
              Amazing description for this amazing ride
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sliderContainer: {
    height: 200,
    width: '90%',
    marginTop: 10,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 8,
  },

  wrapper: {},

  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderRadius: 8,
  },
  sliderImage: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    borderRadius: 8,
  },
  categoryContainer: {
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    marginTop: 25,
    marginBottom: 10,
  },
  categoryBtn: {
    flex: 1,
    width: '30%',
    marginHorizontal: 0,
    alignSelf: 'center',
  },
  categoryIcon: {
    borderWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: 70,
    height: 70,
    backgroundColor: '#fdeae7' /* '#FF6347' */,
    borderRadius: 50,
  },
  categoryBtnTxt: {
    alignSelf: 'center',
    marginTop: 5,
    color: '#de4f35',
  },
  cardsWrapper: {
    marginTop: 20,
    width: '90%',
    alignSelf: 'center',
  },
  card: {
    height: 100,
    marginVertical: 10,
    flexDirection: 'row',
    shadowColor: '#999',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  cardImgWrapper: {
    flex: 1,
  },
  cardImg: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    borderRadius: 8,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
  },
  cardInfo: {
    flex: 2,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: '#fff',
  },
  cardTitle: {
    fontWeight: 'bold',
  },
  cardDetails: {
    fontSize: 12,
    color: '#444',
  },
});
