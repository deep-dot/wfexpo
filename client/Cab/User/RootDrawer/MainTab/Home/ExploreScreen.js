import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Image,
  Dimensions,
  Platform,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { mapDarkStyle, mapStandardStyle } from '../../../../assets/model/mapData';
import { useTheme } from '@react-navigation/native';
import axios from 'axios';

const { width} = Dimensions.get("window");
const CARD_HEIGHT = 220;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

const ExploreScreen = () => {
  const theme = useTheme();
  const [markers, setMarkers] = useState([]);
  
  useEffect(() => {
     const interval = setInterval(async () => {
      const  response  = await axios.get('http://192.168.43.36:4000/Cab/getAllCabs');
      setMarkers(response.data.cabs);
      map();
     }, 1000 * 8);
    return () => clearInterval(interval);
   }, [])

    let state = {
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

  let mapIndex = 0;
  let mapAnimation = new Animated.Value(0);
  
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
          //console.log('marker.location==', (marker.location.latitude))
          return (
            (marker.availability === 'Avail') ?
              <Marker pinColor={pinColor} key={index} coordinate={{
                latitude: parseFloat(marker.location.latitude),
                longitude: parseFloat(marker.location.longitude),
              }} onPress={(e) => onMarkerPress(e)}>
                <Animated.View style={[styles.markerWrap]}>
                  <Animated.Image
                    source={{ uri: 'https://i.ibb.co/YDYMKny/uberxl.png' }}
                    style={[styles.marker, scaleStyle]}
                    resizeMode="cover"
                  />
                </Animated.View>
              </Marker>
              : null
          );
        })}
      </MapView>
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
          (marker.availability === 'Avail') ?
          <View style={styles.card} key={index}>
            {/* <Image
              // source={marker.image}
              source={{ uri: (marker.image) }}
              style={styles.cardImage}
              resizeMode="cover"
            /> */}
            <View style={styles.textContent}>
              <Text numberOfLines={1} style={styles.cardtitle}>{marker.rego}           {marker.description.city}</Text>
            </View>
          </View>
          : null
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
    height: CARD_HEIGHT / 5,
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
