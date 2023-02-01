import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, StyleSheet, ScrollView, Linking } from 'react-native';
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
  ActivityIndicator
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';
import { useNavigation } from "@react-navigation/native";
import axios from 'axios';

const ProfileScreen = () => {
  const { user } = useSelector((state) => state.user);
  const navigation = useNavigation();
  // console.log('Profile screen driver===', user.username);

  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    const fetchdata = async () => {
      await axios.get(`http://192.168.43.36:4000/Job/getalljobsbyuser?id=${user._id}`
      ).then((response) => {
        if (response.data.status === 'ok') {
          console.log('total jobs in notification screen==', response.data.jobs.length);
          setJobs(response.data.jobs);
        }
      });
    }
    fetchdata().catch((err) => { console.log(err) })
  }, []);
  // if (driver === undefined ) {
  //   return (
  //     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
  //       <ActivityIndicator size="large" color="#fff" />
  //     </View>
  //   );
  // }  

  const myCustomShare = async () => {
    const shareOptions = {
      message: 'Order your next meal from FoodFinder App. I\'ve already ordered more than 10 meals on it.',
      //url: files.appLogo,
      // urls: [files.image1, files.image2]
    }
    try {
      const ShareResponse = await Share.open(shareOptions);
      // console.log(JSON.stringify(ShareResponse));
    } catch (error) {
      console.log('Error => ', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.userInfoSection}>
          <View style={{ flexDirection: 'row', marginTop: 15 }}>
            {/* <Avatar.Image 
            source={{
               uri: user.image,
            }}
            size={80}
          />           */}
            <View style={{ marginLeft: 20 }}>
              <Title style={[styles.title, {
                marginTop: 15,
                marginBottom: 5,
              }]}>{user.username}</Title>
              <Caption style={styles.caption}>@D_dee</Caption>
            </View>
          </View>
        </View>

        <View style={styles.userInfoSection}>
          <View style={styles.row}>
            <Icon name="map-marker-radius" color="#777777" size={20} />
            <Text style={{ color: "#777777", marginLeft: 20 }}> {user.address.city} </Text>
          </View>
          <View style={styles.row}>
            <Icon name="phone" color="#777777" size={20} />
            <Text style={{ color: "#777777", marginLeft: 20 }}>{user.phone}</Text>
          </View>
          <View style={styles.row}>
            <Icon name="email" color="#777777" size={20} />
            <Text style={{ color: "#777777", marginLeft: 20 }}> {user.email} </Text>
          </View>
        </View>

        <View style={styles.infoBoxWrapper}>
          <View style={[styles.infoBox, {
            borderRightColor: '#dddddd',
            borderRightWidth: 1
          }]}>
            <Title>$140.50</Title>
            <Caption>Wallet</Caption>
          </View>
          <TouchableRipple
            onPress={() => { navigation.navigate('Notification') }}
            style={styles.infoBox}
          >
            <View >
              <Title style={{alignSelf:'center'}}>{jobs.length}</Title>
              <Caption>Orders</Caption>
            </View>
          </TouchableRipple>
        </View>

        <View style={styles.menuWrapper}>
          <TouchableRipple onPress={() => { }}>
            <View style={styles.menuItem}>
              <Icon name="heart-outline" color="#FF6347" size={25} />
              <Text style={styles.menuItemText}>Your Favorites</Text>
            </View>
          </TouchableRipple>
          <TouchableRipple onPress={() => { }}>
            <View style={styles.menuItem}>
              <Icon name="credit-card" color="#FF6347" size={25} />
              <Text style={styles.menuItemText}>Payment</Text>
            </View>
          </TouchableRipple>
          <TouchableRipple onPress={myCustomShare}>
            <View style={styles.menuItem}>
              <Icon name="share-outline" color="#FF6347" size={25} />
              <Text style={styles.menuItemText}>Tell Your Friends</Text>
            </View>
          </TouchableRipple>
          <TouchableRipple onPress={() => { }}>
            <View style={styles.menuItem}>
              <Icon name="account-check-outline" color="#FF6347" size={25} />
              <Text style={styles.menuItemText}>Support</Text>
            </View>
          </TouchableRipple>
          <TouchableRipple onPress={() => { Linking.openSettings() }}>
            <View style={styles.menuItem}>
              <Icon name="cog-outline" color="#FF6347" size={25} />
              <Text style={styles.menuItemText}>Settings</Text>
            </View>
          </TouchableRipple>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 100,
  },
  infoBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: '#777777',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
  },
});
