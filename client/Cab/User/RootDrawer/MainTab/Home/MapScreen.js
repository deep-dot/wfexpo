import React from "react";
import { TouchableOpacity, View } from "react-native";
import tw from "twrnc";
import { Icon } from "react-native-elements/dist/icons/Icon";
import NavigateCard from "./components/NavigateCard";
import { createStackNavigator } from "@react-navigation/stack";
import RideOptionsCard from "./components/RideOptionsCard";
import Map from "./components/Map";
import { useNavigation } from "@react-navigation/native";
// import { AuthContext } from '../../components/context';

const MapScreen = ({route}) => {
  // const { user } = React.useContext(AuthContext);
  const Stack = createStackNavigator();
  const navigation = useNavigation();
 console.log('in map screen ===', route.params.uri);

  return (
    <View>
      <View style={tw`h-1/2 `}>
        <Stack.Navigator>
          <Stack.Screen
            name='NavigateCard'            
            component={NavigateCard} 
            initialParams={{ uri: route.params.uri }} 
            options= {{
              headerShown: false,            
            }}
          />
          <Stack.Screen
            name="RideOptionsCard"            
            component={RideOptionsCard} 
            initialParams={{ uri: route.params.uri }} 
            options= {{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
        {/* <NavigateCard />
        <RideOptionsCard /> */}
      </View>
      <View style={tw`h-1/2`}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Ride",{uri: route.params.uri});
            // dispatch(setOrigin(null))
          }}
          style={[
            tw`bg-gray-100 absolute top-16 left-8 z-50 p-3 rounded-full shadow-lg`,
          ]}
        >
          <Icon name="arrow-left" />
        </TouchableOpacity>
        <Map />
      </View>
    </View>
  );
};

export default MapScreen;
