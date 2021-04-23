import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../Screens/Home';
import CreatePoll from '../Screens/CreatePoll';

const Tabs = createBottomTabNavigator();

const TabNavigation = () => {
    return (
        <Tabs.Navigator >
            <Tabs.Screen name="home" component={Home} />
            <Tabs.Screen name="home2" component={Home} />
            <Tabs.Screen name="create" component={CreatePoll} />
            <Tabs.Screen name="home4" component={Home} />
            <Tabs.Screen name="home5" component={Home} />
        </Tabs.Navigator >
    );
};

export default TabNavigation;
