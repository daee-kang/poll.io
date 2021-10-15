import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Region } from 'react-native-maps';
import * as Location from 'expo-location';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../Navigation/StackNavigation';
import { updateVoted, } from '../utils/api';
import FeedFlatList from '../Components/FeedFlatList';
import { COLORS, CSTYLE, STYLES } from '../Constants';
import SpacedRow from '../Components/SpacedRow';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import { HomeStackParamList } from '../Navigation/TabNavigation';


export type HomeScreenNavigationProp = StackNavigationProp<
    HomeStackParamList,
    'home'
>;

interface Props {

}

const Home = (props: Props) => {
    const navigation = useNavigation<HomeScreenNavigationProp>();
    const [region, setRegion] = useState<Region | undefined>();

    useEffect(() => {
        updateVoted();
    }, []);

    const grabCurrentLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            //TO-DO: add error messaging for this
            console.log("no access granted");
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setRegion({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
        });
    };

    return (
        <View style={{ backgroundColor: COLORS.LIGHTGRAY }}>
            <SpacedRow
                Left={
                    <Text style={CSTYLE.title}>
                        Home
                    </Text>
                }
                Right={
                    <TouchableOpacity onPress={() => navigation.navigate('map', {region})}>
                        <Feather name="map" size={24} color={COLORS.TEXT} />
                    </TouchableOpacity>
                }
                style={{ marginTop: 70, padding: STYLES.PAGEMARGIN }}
            />

            {/* <TouchableOpacity onPress={signOut}>
                <Text> logout </Text>
            </TouchableOpacity> */}

            <FeedFlatList
                latitude={region?.latitude}
                longitude={region?.longitude}
                refreshCurrentLocation={grabCurrentLocation}
            />

        </ View>
    );
};



export default Home;
