import React from 'react';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import Home from '../Screens/Home';
import CreatePoll from '../Screens/CreatePoll';
import Map from '../Screens/Map';
import { Region } from 'react-native-maps';

export type RootStackParamList = {
    home: undefined,
    map: {
        region: Region | undefined,
        updateRegion: (inRegion: Region) => void;
    },
    create: {
        region: Region | undefined,
    };
};

const Stack = createStackNavigator<RootStackParamList>();

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
            <Stack.Screen name="create" component={CreatePoll} />
        </Stack.Navigator>
    );
};

export default MyStack;
