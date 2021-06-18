import React from 'react';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import Home from '../Screens/Home';
import CreatePoll from '../Screens/CreatePoll';
import Map from '../Screens/Map';
import { Region } from 'react-native-maps';
import Poll from '../Screens/Poll';

export type RootStackParamList = {
    home: undefined,
    map: {
        region: Region | undefined,
        updateRegion: (inRegion: Region) => void;
    },
    create: {
        region: Region | undefined,
    };
    poll: {
        id: string,
        //we want to display these while we reload the results
        question: string,
        answers: { answer: string, id: string; }[],
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
            <Stack.Screen name="poll" component={Poll} />
        </Stack.Navigator>
    );
};

export default MyStack;