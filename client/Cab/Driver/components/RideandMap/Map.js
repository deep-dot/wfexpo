import React, { useEffect, useRef} from "react";
import {
  Keyboard, StyleSheet,
   Dimensions
} from "react-native";
//import Geolocation from 'react-native-geolocation-service';
import MapView, { PROVIDER_GOOGLE, Marker, Polygon } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { useDispatch, useSelector } from "react-redux";
import {
  //selectCurrentLocation,
  selectDestination,
  selectOrigin,
  setTravelTimeInformation,
} from "../../slices/navSlice";
import tw from "twrnc";
//import { GOOGLE_MAPS_APIKEY } from "@env";
const GOOGLE_MAPS_APIKEY = "AIzaSyCfacCZ8-nf1bwKN96-6u0KUCFre34dm9A";

const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.04;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const Map = () => {
  const mapRef = useRef(null);
  //const currentlocation = useSelector(selectCurrentLocation);
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
      provider={PROVIDER_GOOGLE}
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


