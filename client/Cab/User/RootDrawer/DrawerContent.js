import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
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
    ActivityIndicator
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AuthContext } from '../../components/context';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Constants from 'expo-constants';
const url = Constants.expoConfig.extra.env;

export function DrawerContent(props) {
    // const { user } = React.useContext(AuthContext);
    const { user, isLoading } = useSelector(state => state.user);
    const [orders, setOrders] = useState([]);
    const [spent, setSpent] = useState('');
    const paperTheme = useTheme();
    const { logoutUser, toggleTheme } = React.useContext(AuthContext);

    const fetchdata = (async () => {
        try {
            let res = await axios.get(`${url}/User/totalOrdersMade`);
            // console.log('in drawer screen orders==', res)
            if (res.data.success) {
                //console.log('in drawer screen orders==', res.data.orders.length);
                setOrders(res.data.orders)
                let totalFare = res.data.orders.map((order, i) => order.fare).reduce((sum , a) => sum + a, 0);
                //console.log(totalFare);
                setSpent(totalFare);
            }
        } catch (e) {
            console.log(e.message);
        }
    });
    useEffect(() => {
        const interval = setInterval(() => {
            fetchdata();
        }, 1000 * 8)
        return () => clearInterval(interval)
    }, []);

    if (orders === undefined) {
        console.log('drawer=====', user.username, isLoading, orders.length);
    }

    return (
        <View style={{ flex: 1 }}>
            {
                isLoading ?
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator size="large" color="#00ff00" />
                    </View>
                    :
                    <DrawerContentScrollView {...props}>
                        <View style={styles.drawerContent}>
                            <View style={styles.userInfoSection}>
                                <View style={{ flexDirection: 'row', marginTop: 15 }}>
                                    {/* <Avatar.Image
                                source={{
                                    uri: user.image,
                                }}
                                size={50}
                            /> */}
                                    <View style={{ marginLeft: 15, flexDirection: 'column' }}>
                                        <Title style={styles.title}>{user.username}</Title>
                                        <Caption style={styles.caption}>{user.email}</Caption>
                                    </View>
                                </View>

                                <View style={styles.row}>
                                    <View style={styles.section}>
                                        <Paragraph style={[styles.paragraph, styles.caption]}>{orders.length}</Paragraph>
                                        <Caption style={styles.caption}>Orders made</Caption>
                                    </View>
                                    <View style={styles.section}>
                                        <Paragraph style={[styles.paragraph, styles.caption]}>$ {spent}</Paragraph>
                                        <Caption style={styles.caption}>Spent</Caption>
                                    </View>
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
                                    onPress={() => { props.navigation.navigate('HomeDrawer') }}
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
                                    name="bookmark-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Job Dispatcher"
                            onPress={() => { props.navigation.navigate('JobDispatchScreen') }}
                        /> */}
                                <DrawerItem
                                    icon={({ color, size }) => (
                                        <Icon
                                            name="car"
                                            color={color}
                                            size={size}
                                        />
                                    )}
                                    label="Get a ride"
                                    onPress={() => { props.navigation.navigate('RideScreen') }}
                                />
                                {/* <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="car"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="jobdispatchscreen"
                            onPress={() => { props.navigation.navigate("JobDispatchScreen", { title: '' }) }}
                        /> */}
                            </Drawer.Section>
                            <Drawer.Section title="Preferences">
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
                                    // logout(); 
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
                                onPress={() => { logoutUser() }}
                            // onPress={() => { }}
                            />
                        </Drawer.Section>
                    </DrawerContentScrollView>
            }
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
        fontSize: 16,
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