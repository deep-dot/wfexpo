import React, { useEffect, useRef, useState } from "react";
import {
  Keyboard, StyleSheet,
  View, TouchableOpacity, PermissionsAndroid,
  Image, Dimensions, Platform, Text, Alert,
} from "react-native";
//import Geolocation from 'react-native-geolocation-service';
import MapView, { Marker, Polygon } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentLocation,
  selectDestination,
  selectOrigin,
  setTravelTimeInformation,
} from "../../slices/navSlice";
import tw from "twrnc";
//import { GOOGLE_MAPS_APIKEY } from "@env";
GOOGLE_MAPS_APIKEY = "AIzaSyCfacCZ8-nf1bwKN96-6u0KUCFre34dm9A";

const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.04;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const Map = () => {
  const mapRef = useRef(null);
  const currentlocation = useSelector(selectCurrentLocation);
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const dispatch = useDispatch();
  //console.log('current===', currentlocation);
  useEffect(() => {
    if (!origin || !destination) return;
    // Zoom & fit to markers
    mapRef.current.fitToSuppliedMarkers(["origin", "destination"], {
      edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
    });
  }, [origin, destination]);

  useEffect(() => {
    const getTravelTime = async () => {
      if (!origin || !destination) return;
      fetch(
        `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin.description}&destinations=${destination.description}&key=${GOOGLE_MAPS_APIKEY}`
      )
        .then((res) => res.json())
        .then((data) => {
          dispatch(setTravelTimeInformation(data.rows[0].elements[0]));
        });
    };

    getTravelTime();
  }, [origin, destination, GOOGLE_MAPS_APIKEY]);
  return (
    <MapView
      onPress={Keyboard.dismiss}
      onPanDrag={Keyboard.dismiss}
      initialRegion={{
        latitude: origin.location.lat,
        longitude: origin.location.lng,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }}
      ref={mapRef}
      onRegionChangeComplete={async (val) => {
        console.log('region boundries', await mapRef.current.getMapBoundaries())
      }}
      style={tw`flex-1`}
      mapType="mutedStandard"
    >
      {origin && destination && (
        <MapViewDirections
          origin={origin.description}
          destination={destination.description}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={3}
          strokeColor="black"
        />
      )}

      {origin?.location && (
        <Marker
          coordinate={{
            latitude: origin.location.lat,
            longitude: origin.location.lng,
          }}
          title="Origin"
          description={origin.description}
          identifier="origin"
        />
      )}

      {destination?.location && (
        <Marker
          coordinate={{
            latitude: destination.location.lat,
            longitude: destination.location.lng,
          }}
          title="Destination"
          description={destination.description}
          identifier="destination"
        />
      )}
    </MapView>
  );
};

export default Map;

const styles = StyleSheet.create({});








// const Map = () => {
//     const mapRef = useRef()
//     const markerRef = useRef()
//     const navigation = useNavigation();

//     const [state, setState] = useState({
//         curLoc: {
//             latitude: 30.7046,
//             longitude: 77.1025,
//         },
//         destinationCords: {},
//         isLoading: false,
//         coordinate: new AnimatedRegion({
//             latitude: 30.7046,
//             longitude: 77.1025,
//             latitudeDelta: LATITUDE_DELTA,
//             longitudeDelta: LONGITUDE_DELTA
//         }),
//         time: 0,
//         distance: 0,
//         heading: 0

//     })

//     const { curLoc, time, distance, destinationCords, isLoading, coordinate,heading } = state
//     const updateState = (data) => setState((state) => ({ ...state, ...data }));

//     const getLiveLocation = async () => {
//         const locPermission = await locationPermission()
//         console.log('locpermission====',locPermission)
//         if (locPermission) {
//             const { latitude, longitude, heading } = await getorigin()
//             console.log("get live location after 4 second",heading)
//             animate(latitude, longitude);
//             updateState({
//                 heading: heading,
//                 curLoc: { latitude, longitude },
//                 coordinate: new AnimatedRegion({
//                     latitude: latitude,
//                     longitude: longitude,
//                     latitudeDelta: LATITUDE_DELTA,
//                     longitudeDelta: LONGITUDE_DELTA
//                 })
//             })
//         }
//     }

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         getLiveLocation()
    //     }, 6000);
    //     return () => clearInterval(interval)
    // }, [])

//     const onPressLocation = () => {
//         navigation.navigate('chooseLocation', { getCordinates: fetchValue })
//     }
//     const fetchValue = (data) => {
//         console.log("this is data", data)
//         updateState({
//             destinationCords: {
//                 latitude: data.destinationCords.latitude,
//                 longitude: data.destinationCords.longitude,
//             }
//         })
//     }

//     const animate = (latitude, longitude) => {
//         const newCoordinate = { latitude, longitude };
//         if (Platform.OS == 'android') {
//             if (markerRef.current) {
//                 markerRef.current.animateMarkerToCoordinate(newCoordinate, 7000);
//             }
//         } else {
//             coordinate.timing(newCoordinate).start();
//         }
//     }

//     const onCenter = () => {
//         mapRef.current.animateToRegion({
//             latitude: curLoc.latitude,
//             longitude: curLoc.longitude,
//             latitudeDelta: LATITUDE_DELTA,
//             longitudeDelta: LONGITUDE_DELTA
//         })
//     }

//     const fetchTime = (d, t) => {
//         updateState({
//             distance: d,
//             time: t
//         })
//     }

//     return (
//         <View style={styles.container}>

//             {distance !== 0 && time !== 0 && (<View style={{ alignItems: 'center', marginVertical: 16 }}>
//                 <Text>Time left: {time.toFixed(0)} </Text>
//                 <Text>Distance left: {distance.toFixed(0)}</Text>
//             </View>)}
//             <View style={{ flex: 1 }}>
//                 <MapView
//                     ref={mapRef}
//                     style={StyleSheet.absoluteFill}
//                     initialRegion={{
//                         ...curLoc,
//                         latitudeDelta: LATITUDE_DELTA,
//                         longitudeDelta: LONGITUDE_DELTA,
//                     }}
//                 >

//                     <Marker.Animated
//                         ref={markerRef}
//                         coordinate={coordinate}
//                     >
//                         <Image
//                             source={imagePath.icBike}
//                             style={{
//                                 width: 40,
//                                 height: 40,
//                                 transform: [{rotate: `${heading}deg`}]
//                             }}
//                             resizeMode="contain"
//                         />
//                     </Marker.Animated>

//                     {Object.keys(destinationCords).length > 0 && (<Marker
//                         coordinate={destinationCords}
//                         image={imagePath.icGreenMarker}
//                     />)}

//                     {Object.keys(destinationCords).length > 0 && (<MapViewDirections
//                         origin={curLoc}
//                         destination={destinationCords}
//                         apikey={GOOGLE_MAP_KEY}
//                         strokeWidth={6}
//                         strokeColor="red"
//                         optimizeWaypoints={true}
//                         onStart={(params) => {
//                             console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
//                         }}
//                         onReady={result => {
//                             console.log(`Distance: ${result.distance} km`)
//                             console.log(`Duration: ${result.duration} min.`)
//                             fetchTime(result.distance, result.duration),
//                                 mapRef.current.fitToCoordinates(result.coordinates, {
//                                     edgePadding: {
//                                         // right: 30,
//                                         // bottom: 300,
//                                         // left: 30,
//                                         // top: 100,
//                                     },
//                                 });
//                         }}
//                         onError={(errorMessage) => {
//                             // console.log('GOT AN ERROR');
//                         }}
//                     />)}
//                 </MapView>
//                 <TouchableOpacity
//                     style={{
//                         position: 'absolute',
//                         bottom: 0,
//                         right: 0
//                     }}
//                     onPress={onCenter}
//                 >
//                     <Image source={imagePath.greenIndicator} />
//                 </TouchableOpacity>
//             </View>
//             <View style={styles.bottomCard}>
//                 <Text>Where are you going..?</Text>
//                 <TouchableOpacity
//                     onPress={onPressLocation}
//                     style={styles.inpuStyle}
//                 >
//                     <Text>Choose your location</Text>
//                 </TouchableOpacity>
//             </View>
//             {/* <Loader isLoading={isLoading} /> */}
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//     },
//     bottomCard: {
//         backgroundColor: 'white',
//         width: '100%',
//         padding: 30,
//         borderTopEndRadius: 24,
//         borderTopStartRadius: 24
//     },
//     inpuStyle: {
//         backgroundColor: 'white',
//         borderRadius: 4,
//         borderWidth: 1,
//         alignItems: 'center',
//         height: 48,
//         justifyContent: 'center',
//         marginTop: 16
//     }
// });

// export default Map;






// import * as Location from 'expo-location';

// export default function Map() {
//   const [location, setLocation] = useState(null);
//   const [errorMsg, setErrorMsg] = useState(null);

//   useEffect(() => {
//     (async () => {
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== 'granted') {
//         setErrorMsg('Permission to access location was denied');
//         return;
//       }

//       let location = await Location.getCurrentPositionAsync({});
//       setLocation(location);
//     })();
//   }, []);

//   let text = 'Waiting..';
//   if (errorMsg) {
//     text = errorMsg;
//   } else if (location) {
//     text = JSON.stringify(location);
//   }

//   return (
//     <View >
//       <Text>{text}</Text>
//     </View>
//   );
// }
