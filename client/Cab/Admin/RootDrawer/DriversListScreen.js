import React from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import {data} from '../model/data';
import Card from '../components/Card';

const DriversListScreen = ({navigation}) => {
    const renderItem = ({item}) => {   
      console.log('renderItem in driverlist screen==', item)
        return (          
            <Card 
            itemData={item}
             onPress={()=> navigation.navigate('DriverDetail', {item, title: 'Driver detail'})}
        />                 
        );
    };

    return (
      <View style={styles.container}>
        <FlatList 
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.id}
        />
      </View>
    );
};

export default DriversListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    width: '90%',
    alignSelf: 'center'
  },
});
