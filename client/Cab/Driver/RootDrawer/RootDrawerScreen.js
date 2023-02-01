import React, { } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerContent } from './DrawerContent';
import TabandStackScreen from './TabandStackScreen';
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
            <Drawer.Screen name="TabandStackScreen" component={TabandStackScreen} 
            options={{ headerShown: false }}/>
        </Drawer.Navigator>
    );
}
export default RootDrawerScreen;