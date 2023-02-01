import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import tw from "twrnc";
//import RideScreen from '../RideandMap/RideScreen';
import { useNavigation,  useTheme } from "@react-navigation/native";
import Swiper from 'react-native-swiper';
import StarRating from './components/StarRating';

const HomeScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation();

  const data = [
    { 
      driverName: "Ahmad Mansoor",
       uri: 'https://i.ibb.co/cyvcpfF/uberx.png', 
       rating: 4,
       reviews: 99,
       discription:'Good service',
    },
    { 
      driverName: "Ahmad ",
      uri: 'https://i.ibb.co/cyvcpfF/uberx.png', 
      rating: 4,
      reviews: 99,
      discription:'Good service',
    },
    { 
      driverName: "Ahmad Akbar",
      uri: 'https://i.ibb.co/cyvcpfF/uberx.png', 
      rating: 4,
      reviews: 99,
      discription:'Good service',
    }
  ];
 

  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle={theme.dark ? 'light-content' : 'dark-content'} />
      <View style={styles.sliderContainer}>
        <Swiper
          autoplay
          //horizontal={false}
          height={200}
          activeDotColor="#FF6347">
          <View style={styles.slide}>
            <Image
              // source={require('../assets/banners/food-banner1.jpg')}
              source={{ uri: 'https://i.ibb.co/cyvcpfF/uberx.png' }}
              resizeMode="cover"
              style={styles.sliderImage}
            />
          </View>
          <View style={styles.slide}>
            <Image
              source={{ uri: 'https://i.ibb.co/YDYMKny/uberxl.png' }}
              resizeMode="cover"
              style={styles.sliderImage}
            />
          </View>
          <View style={styles.slide}>
            <Image
              source={{ uri: 'https://i.ibb.co/Xx4G91m/uberblack.png' }}
              resizeMode="cover"
              style={styles.sliderImage}
            />
          </View>
          <View style={styles.slide}>
            <Image
              source={{ uri: 'https://i.ibb.co/1nStPWT/uberblacksuv.png' }}
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
            navigation.navigate('Ride', 
            { title: ' ', uri: 'https://i.ibb.co/Xx4G91m/uberblack.png' }
            )
          }
          // disabled={true}
          >
          <View style={styles.categoryIcon}>
            <Image style={{ width: 50, height: 50 }} source={{ uri: 'https://i.ibb.co/Xx4G91m/uberblack.png' }}></Image>
          </View>         
          <Text style={styles.categoryBtnTxt}>Sedan</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            { navigation.navigate('Ride',{uri: 'https://i.ibb.co/1nStPWT/uberblacksuv.png'}) }
          }
         // disabled={true}
        >
          <View style={styles.categoryIcon}>
            <Image style={[{ width: 50, height: 50 },tw`bg-gray-200`]} source={{ uri: 'https://i.ibb.co/1nStPWT/uberblacksuv.png' }}></Image>
          </View>
          <Text style={styles.categoryBtnTxt}>WAT</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.categoryBtn} onPress={() => { 
          navigation.navigate('Ride', {uri: 'https://i.ibb.co/YDYMKny/uberxl.png'})
          }}>
          <View style={styles.categoryIcon}>
            <Image style={{ width: 50, height: 50 }} source={{ uri: 'https://i.ibb.co/YDYMKny/uberxl.png' }}></Image>
          </View>
          <Text style={styles.categoryBtnTxt}>10 Seater</Text>
        </TouchableOpacity>

      </View>

      <View style={styles.cardsWrapper}>
        <Text
          style={{
            alignSelf: 'center',
            fontSize: 18,
            fontWeight: 'bold',
            color: '#333',
          }}>
          {/* Recently Viewed */}
          Recently Travel with
        </Text>
        
        {data.map((data,i) => (
          <View key={i} style={styles.card}>
          <View style={styles.cardImgWrapper}>
            <Image
              // source={{ uri: 'https://i.ibb.co/cyvcpfF/uberx.png' }}
              source = {data}
              resizeMode="cover"
              style={styles.cardImg}
            />
          </View>
          <View style={styles.cardInfo}>
            <Text style={styles.cardTitle}>{data.driverName}</Text>
            <StarRating ratings={data.rating} reviews={data.reviews} />
            <Text style={styles.cardDetails}>
             {data.discription}
            </Text>
          </View>
        </View>
        ))}
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
    marginTop: 0,
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
    height: '80%',
    width: '60%',
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
    shadowOffset: { width: 0, height: 1 },
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
