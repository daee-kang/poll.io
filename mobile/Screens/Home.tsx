import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Region } from 'react-native-maps';
import Header from '../Components/Header';
import { AuthContext } from '../Context/authContext';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../Navigation/StackNavigation';
import { apiGet } from '../utils/api';

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

    const updateRegion = (inRegion: Region) => {
        setRegion(inRegion);
    };

    useEffect(() => {
        //on initial load, just set location to current location
        (async () => {
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
        })();
    }, []);

    const getNearby = () => {
        apiGet("/poll/get", {
            latitude: region?.latitude ?? 0,
            longitude: region?.longitude ?? 0,
            range: 5000,
        }).then((res: any) => {
            console.log(res.data);
        });
    };

    return (
        <View>
            <Header navigation={navigation} region={region} updateRegion={updateRegion} />

            {/* debug */}
            <Text>
                latitude: {region?.latitude ?? 0}
            </Text>
            <Text>
                longitude: {region?.longitude ?? 0}
            </Text>
            {/* debug */}

            <TouchableOpacity
                onPress={signOut}
            >
                <Text>
                    logout
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={getNearby}
            >
                <Text style={{ backgroundColor: 'green' }}>
                    fetch nearby
                </Text>
            </TouchableOpacity>

        </ View>
    );
};



export default Home;
