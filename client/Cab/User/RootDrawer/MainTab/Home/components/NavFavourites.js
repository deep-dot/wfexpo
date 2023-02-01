import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import tw from "twrnc";
import { Icon } from "react-native-elements";
import { setDestination, setOrigin} from "../../../../slices/navSlice";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
const data = [
  {
    id: "123",
    icon: "home",
    location: "Home",
    place: "Fyansford, VIC",
  },
  {
    id: "456",
    icon: "briefcase",
    location: "Work",
    place: "North Geelong, VIC",    
  },
];
 function NavFavourites(props) {
  const dispatch = useDispatch();
  const navigation = useNavigation();
 // console.log('disable in NavFavourites', props);
  return (
    <FlatList
      data={data}
      automaticallyAdjustContentInsets={false}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => (
        <View
          style={[
            tw`bg-gray-200`,
            {
              height: 0.5,
            },
          ]}
        />
      )}
      renderItem={({ item: { location, place, icon } }) => (
        <TouchableOpacity style={tw`flex-row items-center p-5`}
          onPress={() => {       
            props.selected();
            navigation.navigate("NavigateCard");
            dispatch(
              setDestination({
               // location: details.geometry.location,
                description: place,
               // selectDestination: false,
              })
            );           
           // setSelectDestination(false);
            // navigation.navigate("RideOptionsCard");
          }}
        >
          <Icon
            style={tw`mr-4 rounded-full bg-gray-300 p-3`}
            name={icon}
            type="ionicon"
            color="white"
            size={18}
          />
          <View>
            <Text style={tw`font-semibold text-sm`}>{location}</Text>
            <Text style={tw`text-gray-500`}>{place}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
}

// function NavFavouritesOrigin() {
//   const dispatch = useDispatch();
//   const navigation = useNavigation();
//   return (
//     <FlatList
//       data={data}
//       automaticallyAdjustContentInsets={false}
//       keyExtractor={(item) => item.id}
//       ItemSeparatorComponent={() => (
//         <View
//           style={[
//             tw`bg-gray-200`,
//             {
//               height: 0.5,
//             },
//           ]}
//         />
//       )}
//       renderItem={({ item: { location, origin, icon } }) => (
//         <TouchableOpacity style={tw`flex-row items-center p-5`}
//           onPress={() => {                     
//             dispatch(
//               setOrigin({
//                // location: details.geometry.location,
//                 description: origin,
//                 selectDestination: true,
//               })
//             );   
//             navigation.navigate("MapScreen");          
//            // setSelectDestination(false);
//             // navigation.navigate("RideOptionsCard");
//           }}
//         >
//           <Icon
//             style={tw`mr-4 rounded-full bg-gray-300 p-3`}
//             name={icon}
//             type="ionicon"
//             color="white"
//             size={18}
//           />
//           <View>
//             <Text style={tw`font-semibold text-lg`}>{location}</Text>
//             <Text style={tw`text-gray-500`}>{origin}</Text>
//           </View>
//         </TouchableOpacity>
//       )}
//     />
//   );
// }
// export default ( NavFavouritesOrigin, NavFavourites );
export default NavFavourites;


// const styles = StyleSheet.create({});
