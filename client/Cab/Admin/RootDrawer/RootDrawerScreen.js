import React, { } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerContent } from './DrawerContent';
import MainTabScreen from './MainTabScreen';
const Drawer = createDrawerNavigator();

const RootDrawerScreen = () => {
    return (        
        <Drawer.Navigator
            screenOptions={{
                headerShown: true,
            }}
            drawerContent={
                props => <DrawerContent {...props} />
            }
        >
            <Drawer.Screen name="HomeDrawer" component={MainTabScreen} 
            options={{ headerShown: false }}/>
        
        </Drawer.Navigator>
    );
}
export default RootDrawerScreen;