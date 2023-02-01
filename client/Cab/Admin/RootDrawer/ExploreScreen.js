import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Animated,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform,
  ActivityIndicator,
  Alert,
} from "react-native";
import tw from "twrnc";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

import Ionicons from 'react-native-vector-icons/Ionicons';
//import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import Fontisto from 'react-native-vector-icons/Fontisto';
//import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { mapDarkStyle, mapStandardStyle } from '../model/mapData';
//import StarRating from '../../components/StarRating';
//const GOOGLE_MAPS_APIKEY = "AIzaSyCfacCZ8-nf1bwKN96-6u0KUCFre34dm9A";
//import { AuthContext } from '../../components/context';
import { useTheme } from '@react-navigation/native';
// import {
//   setCurrentLocation,
//   selectLoading,
//   setLoading,
//   selectCurrentLocation,
// } from "../../slices/navSlice";
import { useSelector, useDispatch } from "react-redux";
//import * as Location from 'expo-location';
import axios from 'axios';

const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = 220;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

const ExploreScreen = ({ navigation }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  // const { user } = React.useContext(AuthContext);
  // var currentLocation = useSelector(selectCurrentLocation);
  // const loading = useSelector(selectLoading);
  //console.log(user);

  const [markers, setMarkers] = useState([]);
  //const markers = [];

  useEffect(() => {
    // (async() => {
    const interval = setInterval(async () => {
      await axios.get(
        `http://192.168.43.36:4000/Cab/getAllCabs`
      ).then((response) => {
        console.log(response.data.cabs.length);
        // markers = response.data.cabs
        setMarkers(response.data.cabs);
        map();
      }).catch((err) => { console.log(err) });
    }, 1000 * 8);
    return () => clearInterval(interval)
    // })();
  }, [])
  //  console.log('cab===',markers[1])
  if (!markers) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const initialMapState = {
    markers,
    categories: [
      // {
      //   name: 'Fastfood Center', 
      //   icon: <MaterialCommunityIcons style={styles.chipsIcon} name="food-fork-drink" size={18} />,
      // },
      {
        // name: 'Restaurant',
        // icon: <Ionicons name="ios-restaurant" style={styles.chipsIcon} size={18} />,
        icon: <Image style={{ width: 30, height: 30 }} source={{ uri: 'https://i.ibb.co/YDYMKny/uberxl.png' }}></Image>,
      },
      // {
      //   name: 'Dineouts',
      //   icon: <Ionicons name="md-restaurant" style={styles.chipsIcon} size={18} />,       
      // },
      {
        // name: 'Snacks Corner',
        // icon: <MaterialCommunityIcons name="food" style={styles.chipsIcon} size={18} />,
        icon: <Image style={{ width: 30, height: 30 }} source={{ uri: 'https://i.ibb.co/Xx4G91m/uberblack.png' }}></Image>,
      },
      // {
      //   name: 'Hotel',
      //    icon: <Fontisto name="hotel" style={styles.chipsIcon} size={15} />,
      // },
    ],
    region: {
      latitude: -38.131364,
      longitude: 144.313702,
      latitudeDelta: 0.04864195044303443,
      longitudeDelta: 0.040142817690068,
    },
  };

  const [state, setState] = React.useState(initialMapState);

  let mapIndex = 0;
  let mapAnimation = new Animated.Value(0);

  // useEffect(() => {
  const map = () => {
    mapAnimation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
      if (index >= markers.length) {
        index = markers.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }
      clearTimeout(regionTimeout);
      const regionTimeout = setTimeout(() => {
        if (mapIndex !== index) {
          mapIndex = index;
          const { location } = markers[index];
          _map.current.animateToRegion(
            {
              ...location,
              latitudeDelta: state.region.latitudeDelta,
              longitudeDelta: state.region.longitudeDelta,
            },
            350
          );
        }
      }, 10);
    });
  }
  // });

  const interpolations = markers.map((marker, index) => {
    const inputRange = [
      (index - 1) * CARD_WIDTH,
      index * CARD_WIDTH,
      ((index + 1) * CARD_WIDTH),
    ];

    const scale = mapAnimation.interpolate({
      inputRange,
      outputRange: [1, 1.5, 1],
      extrapolate: "clamp"
    });

    return { scale };
  });

  const onMarkerPress = (mapEventData) => {
    const markerID = mapEventData._targetInst.return.key;

    let x = (markerID * CARD_WIDTH) + (markerID * 20);
    if (Platform.OS === 'ios') {
      x = x - SPACING_FOR_CARD_INSET;
    }

    _scrollView.current.scrollTo({ x: x, y: 0, animated: true });
  }

  const _map = React.useRef(null);
  const _scrollView = React.useRef(null);

  const LiftPenalty = (rego) => {
    console.log(rego);
    axios.post(
      `http://192.168.43.36:4000/appAuth/cabstatus`,
      // `https://apponpress.herokuapp.com/appAuth/cabstatus`,
      { availability: 'Avail', rego }
    ).then((response) => {
      console.log(response.data);
      if (response.data.status === 'ok') {
        Alert.alert('Penalty has been lifted up')
      }
    })
  };
  return (
    <View style={styles.container}>
      <MapView
        ref={_map}
        initialRegion={state.region}
        style={styles.container}
        provider={PROVIDER_GOOGLE}
        customMapStyle={theme.dark ? mapDarkStyle : mapStandardStyle}
      >
        {markers.map((marker, index) => {
          const scaleStyle = {
            transform: [
              {
                scale: interpolations[index].scale,
              },
            ],
          };
          const pinColor = '#000000'
          console.log('marker.location==', (marker.location.latitude))
          return (
            (marker.availability === 'Avail') ?
              <Marker pinColor={pinColor} key={index} coordinate={{
                latitude: parseFloat(marker.location.latitude),
                longitude: parseFloat(marker.location.longitude),
              }} onPress={(e) => onMarkerPress(e)}>
                <Animated.View style={[styles.markerWrap]}>
                  <Animated.Image
                    source={require('../../assets/map_marker.png')}
                    style={[styles.marker, scaleStyle]}
                    resizeMode="cover"
                  />
                </Animated.View>
              </Marker>
              : (marker.availability === 'Penalty') ?
                <Marker pinColor={pinColor} key={index} coordinate={{
                  latitude: parseFloat(marker.location.latitude),
                  longitude: parseFloat(marker.location.longitude),
                }} onPress={(e) => onMarkerPress(e)}>
                  <Animated.View style={[styles.markerWrap]}>
                    <Animated.Image
                      source={require('../../assets/favicon.png')}
                      style={[styles.marker, scaleStyle]}
                      resizeMode="cover"
                    />
                  </Animated.View>
                </Marker>
                :
                <Marker pinColor={pinColor} key={index} coordinate={{
                  latitude: parseFloat(marker.location.latitude),
                  longitude: parseFloat(marker.location.longitude),
                }} onPress={(e) => onMarkerPress(e)}>
                  <Animated.View style={[styles.markerWrap]}>
                    <Animated.Image
                      source={require('../../assets/logo.png')}
                      style={[styles.marker, scaleStyle]}
                      resizeMode="cover"
                    />
                  </Animated.View>
                </Marker>
          );
        })}
      </MapView>
      <View style={styles.searchBox}>
        <TextInput
          placeholder="Search here"
          placeholderTextColor="#000"
          autoCapitalize="none"
          style={{ flex: 1, padding: 0 }}
        />
        <Ionicons name="ios-search" size={20} />
      </View>
      <ScrollView
        horizontal
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        height={50}
        style={styles.chipsScrollView}
        contentInset={{ // iOS only
          top: 0,
          left: 0,
          bottom: 0,
          right: 20
        }}
        contentContainerStyle={{
          paddingRight: Platform.OS === 'android' ? 20 : 0
        }}
      >
        {state.categories.map((category, index) => (
          <TouchableOpacity key={index} style={styles.chipsItem}
            onPress={() =>
              navigation.navigate('CardListScreen', { title: 'Restaurant' })
            }
          >
            {category.icon}
            <Text>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Animated.ScrollView
        ref={_scrollView}
        horizontal
        pagingEnabled
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH + 20}
        snapToAlignment="center"
        style={styles.scrollView}
        contentInset={{
          top: 0,
          left: SPACING_FOR_CARD_INSET,
          bottom: 0,
          right: SPACING_FOR_CARD_INSET
        }}
        contentContainerStyle={{
          paddingHorizontal: Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0
        }}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: mapAnimation,
                }
              },
            },
          ],
          { useNativeDriver: true }
        )}
      >
        {markers.map((marker, index) => (
          <View style={styles.card} key={index}>
            {/* <Image
              // source={marker.image}
              source={{ uri: (marker.image) }}
              style={styles.cardImage}
              resizeMode="cover"
            /> */}


            <View style={styles.textContent}>
              <Text numberOfLines={1} style={styles.cardtitle}>{marker.rego}</Text>
              <Text numberOfLines={1} style={styles.cardtitle}>Driver:  { }</Text>
              <Text numberOfLines={1} style={styles.cardtitle}>{marker.description.city}</Text>

              {/* <StarRating ratings={marker.rating} reviews={marker.reviews} /> */}
              {/* <StarRating ratings={marker.ratings} reviews={99} /> */}
              {/* <Text numberOfLines={1} style={styles.cardDescription}>{marker.description}</Text> */}
              {/* <View style={styles.button}>                 */}

              <View style={tw`${(marker.availability === 'Avail') && "opacity-20"}`}>
                <TouchableOpacity
                  onPress={() => {
                    LiftPenalty(marker.rego)
                  }}
                  style={[styles.signIn, {
                    borderColor: '#FF6347',
                    borderWidth: 1
                  }]}
                  disabled={marker.availability === 'Avail'}
                >
                  <Text style={[styles.textSign, {
                    color: '#FF6347'
                  }]}>Lift panalty</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </Animated.ScrollView>
    </View>
  );
};

export default ExploreScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBox: {
    position: 'absolute',
    marginTop: Platform.OS === 'ios' ? 40 : 20,
    flexDirection: "row",
    backgroundColor: '#fff',
    width: '90%',
    alignSelf: 'center',
    borderRadius: 5,
    padding: 10,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  chipsScrollView: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 90 : 80,
    paddingHorizontal: 10
  },
  chipsIcon: {
    marginRight: 5,
  },
  chipsItem: {
    flexDirection: "row",
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 8,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    height: 35,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  scrollView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH,
  },
  card: {
    // padding: 10,
    elevation: 2,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT / 2,
    width: CARD_WIDTH,
    overflow: "hidden",
  },
  cardImage: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  textContent: {
    flex: 2,
    padding: 10,
  },
  cardtitle: {
    fontSize: 12,
    // marginTop: 5,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 12,
    color: "#444",
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
  },
  marker: {
    width: 30,
    height: 30,

  },
  button: {
    alignItems: 'center',
    marginTop: 5
  },
  signIn: {
    width: '100%',
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3
  },
  textSign: {
    fontSize: 14,
    fontWeight: 'bold'
  }
});
