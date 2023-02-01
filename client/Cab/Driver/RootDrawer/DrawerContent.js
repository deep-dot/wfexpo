import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, } from 'react-native';
import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch,
    Alert,
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AuthContext } from '../../components/context';
import { useSelector, useDispatch } from 'react-redux';
import Constants from 'expo-constants';
import { setJobsDone } from '../slices/navSlice';
import axios from "axios";
const url = Constants.expoConfig.extra.env;

export function DrawerContent(props) {
    const { driver } = useSelector((state) => state.driver);
    const paperTheme = useTheme();
    const { logout, toggleTheme } = React.useContext(AuthContext);
    let jobsDone = [];
    const dispatch = useDispatch();
    useEffect(() => {
        try{
        let fetchdata = (async () => {
            const response = await axios.get( url + `/Job/getalljobsdonebydriver?driverid=${driver.driver.driverid}`);
            if(response.data.status === 'ok'){
                dispatch(setJobsDone(response.data.jobs));
                jobsDone = response.data.jobs;
            }
        });
        fetchdata();
    } catch (e) {
        console.log(e);
    }
    },[axios, url]);
    //console.log('driverid in drwaer screen===', driver.driver.driverid, jobsDone.length);      
    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}>
                {driver && jobsDone ?
                    <View style={styles.drawerContent}>
                        <View style={styles.userInfoSection}>
                            {/* <View style={{ flexDirection: 'row', marginTop: 15 }}>
                            <Avatar.Image
                                source={{
                                    uri: driver.image,
                                }}
                                size={50}
                            />
                            <View style={{ marginLeft: 15, flexDirection: 'column' }}>
                                <Title style={styles.title}>{user.firstName} {user.lastName}</Title>
                                <Caption style={styles.caption}>@d_dee</Caption>
                            </View>
                        </View> */}
                            <View style={{ flexDirection: 'row', marginTop: 15 }}>
                                <View style={{ marginLeft: 15, flexDirection: 'column' }}>
                                    <Title style={styles.title}>{driver.driver.drivencab.slice(-1)[0]}</Title>
                                    <Caption style={styles.caption}>@d_dee</Caption>
                                </View>
                            </View>

                            <View style={styles.row}>
                                <View style={styles.section}>
                                    <Paragraph style={[styles.paragraph, styles.caption]}></Paragraph>
                                    <Caption style={styles.caption}>Jobs done   {jobsDone.length}</Caption>
                                </View>
                                {/* <View style={styles.section}>
                                <Paragraph style={[styles.paragraph, styles.caption]}>100</Paragraph>
                                <Caption style={styles.caption}>Followers</Caption>
                            </View> */}
                            </View>
                        </View>

                        <Drawer.Section style={styles.drawerSection}>
                            <DrawerItem
                                icon={({ color, size }) => (
                                    <Icon
                                        name="home-outline"
                                        color={color}
                                        size={size}
                                    />
                                )}
                                label="Home"
                                onPress={() => { props.navigation.navigate('Home') }}
                            />
                            <DrawerItem
                                icon={({ color, size }) => (
                                    <Icon
                                        name="account-outline"
                                        color={color}
                                        size={size}
                                    />
                                )}
                                label="Profile"
                                onPress={() => { props.navigation.navigate('ProfileScreen') }}
                            />
                            {/* <DrawerItem
                                icon={({ color, size }) => (
                                    <Icon
                                        name="car"
                                        color={color}
                                        size={size}
                                    />
                                )}
                                label="Do a Job"
                                onPress={() => { props.navigation.navigate('RideandMapScreen') }}
                            /> */}
                            <DrawerItem
                                icon={({ color, size }) => (
                                    <Icon
                                        name="car"
                                        color={color}
                                        size={size}
                                    />
                                )}
                                label="Completed Jobs"
                                onPress={() => { props.navigation.navigate("CompletedJobsScreen", { title: 'Completed Jobs' }) }}
                            />
                            {/* <DrawerItem
                                icon={({ color, size }) => (
                                    <Icon
                                        name="car"
                                        color={color}
                                        size={size}
                                    />
                                )}
                                label="Zone"
                                onPress={() => { props.navigation.navigate("ZoneScreen", { title: 'Zones' }) }}
                            /> */}
                            {/* <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="car"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="jobdispatchscreen"
                            onPress={() => { props.navigation.navigate("JobDispatchScreen", { title: '' })}}
                        />   */}
                        </Drawer.Section>
                        <Drawer.Section title="">
                            <TouchableRipple onPress={() => { toggleTheme() }}>
                                <View style={styles.preference}>
                                    <Text>Dark Theme</Text>
                                    <View pointerEvents="none">
                                        <Switch value={paperTheme.dark} />
                                    </View>
                                </View>
                            </TouchableRipple>
                        </Drawer.Section>
                    </View>
                    : null
                }
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                {/* <DrawerItem
                    icon={({ color, size }) => (
                        <Icon
                            name="backspace-outline"
                            color={color}
                            size={size}
                        />
                    )}
                    label="Exit"
                    onPress={() => { 
                        props.navigation.navigate('SelectScreen');
                        //logout();
                     }}
                /> */}
                <DrawerItem
                    icon={({ color, size }) => (
                        <Icon
                            name="exit-to-app"
                            color={color}
                            size={size}
                        />
                    )}
                    label="Sign Out"
                    onPress={() => { logout(); }}
                />
            </Drawer.Section>
        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        paddingLeft: 20,
    },
    title: {
        fontSize: 26,
        marginTop: 3,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
});