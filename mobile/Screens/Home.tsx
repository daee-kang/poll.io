import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Region } from 'react-native-maps';
import Header from '../Components/Header';
import { AuthContext } from '../Context/authContext';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../Navigation/StackNavigation';
import { apiGet, updateVoted, } from '../utils/api';
import FeedFlatList from '../Components/FeedFlatList';

export type HomeScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'home'
>;

interface Props {

}

const Home = (props: Props) => {
    const { signOut } = useContext(AuthContext);
    const navigation = useNavigation<HomeScreenNavigationProp>();

    const [region, setRegion] = useState<Region | undefined>();

    useEffect(() => {
        updateVoted();
    }, []);

    const updateRegion = (inRegion: Region) => {
        setRegion(inRegion);
    };

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
        <View>
            <Header
                navigation={navigation}
                region={region}
                grabCurrentLocation={grabCurrentLocation}
                updateRegion={updateRegion}
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
