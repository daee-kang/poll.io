import React from 'react';
import { CardStyleInterpolators, createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import Home from '../Screens/Home';
import CreatePoll from '../Screens/CreatePoll';
import Map from '../Screens/Map';

const Stack = createStackNavigator();

export interface StackProps {
    navigation: StackNavigationProp<any, any>;
}

const MyStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
            }}
        >
            <Stack.Screen name="home" component={Home} />
            <Stack.Screen name="map" component={Map} />
        </Stack.Navigator>
    );
};

export default MyStack;
