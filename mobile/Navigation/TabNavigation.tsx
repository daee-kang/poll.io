import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { CardStyleInterpolators, createStackNavigator } from "@react-navigation/stack";
import Home from "../Screens/Home";
import Poll from '../Screens/Poll';
import Map from '../Screens/Map';
import { Region } from 'react-native-maps';
import { pollItem } from '../Components/FeedFlatList';
import { COLORS, STYLES } from '../Constants';
import { Feather, Entypo } from '@expo/vector-icons';

export type HomeStackParamList = {
    home: undefined;
    map: {
        region: Region | undefined,
        updateRegion: (inRegion: Region) => void;
    },
    poll: {
        poll: pollItem;
    };
};

const homeStack = createStackNavigator<HomeStackParamList>();
const HomeStack = () => {
    return (
        <homeStack.Navigator
            screenOptions={{
                headerShown: false,
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
        >
            <homeStack.Screen name="home" component={Home} />
            <homeStack.Screen name="map" component={Map} />
            <homeStack.Screen name="poll" component={Poll} />
        </homeStack.Navigator>
    );
};


//---------------OUR MAIN ROOT NAVIGATION
export type TabParamList = {
    home: HomeStackParamList;
    create: undefined;
    profile: undefined;
};
const CreatePlaceholder = () => (
    <View style={{ flex: 1, backgroundColor: 'blue' }} />
);
const Tab = createBottomTabNavigator<TabParamList>();
const MyTab = () => {
    return (
        <Tab.Navigator
            tabBarOptions={{
                showLabel: false,
                style: styles.tabBar
            }}
        >
            <Tab.Screen
                name="home"
                component={HomeStack}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={[styles.tabButton, { left: 20 }]}>
                            <Feather name="home" size={30} color={focused ? COLORS.TEXT : '#B8B8B8'} />
                        </View>
                    )
                }}
            />
            <Tab.Screen
                name="create"
                component={CreatePlaceholder}
                options={{
                    tabBarIcon: (props) => (
                        <View style={styles.plusButton}>
                            <Entypo name="plus" size={35} color="white" />
                        </View>
                    ),
                }}
                listeners={({ navigation }) => ({
                    tabPress: (e) => {
                        e.preventDefault();
                        navigation.navigate('CreateNew');
                    },
                })}
            />
            <Tab.Screen
                name="profile"
                component={HomeStack}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={[styles.tabButton, { right: 20 }]}>
                            <Feather name="user" size={30} color={focused ? COLORS.TEXT : '#B8B8B8'} />
                        </View>
                    )
                }}
            />
        </Tab.Navigator >
    );
};

//replace this later lol
const CreateNew = () => {
    return <View style={{ height: '80%' }}><Text>dab</Text></View>;
};

const RootStack = createStackNavigator();
const TabRoot = () => {
    return (<RootStack.Navigator
        headerMode="none"
        screenOptions={{ animationEnabled: false }}
        mode="modal"
    >
        <RootStack.Screen name="main" component={MyTab} />
        <RootStack.Screen
            name="CreateNew"
            component={CreateNew}
            options={{ animationEnabled: true }}
        />
    </RootStack.Navigator>);
};

const styles = StyleSheet.create({
    tabBar: {
        position: 'absolute',
        height: 61,
        bottom: 40,
        marginHorizontal: 40,
        backgroundColor: '#FFF',
        borderRadius: 39,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.10,
        shadowRadius: 1.41,
        elevation: 1,
    },
    tabButton: {
        width: '100%',
        alignItems: 'center',
        top: 14,
    },
    plusButton: {
        position: 'absolute',
        width: 50,
        height: 50,
        backgroundColor: COLORS.PRIMARY,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 14,
    }
});

export default TabRoot;