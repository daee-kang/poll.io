import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { Region } from 'react-native-maps';
import * as Location from 'expo-location';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../Navigation/StackNavigation';
import { updateVoted, } from '../utils/api';
import FeedFlatList from '../Components/FeedFlatList';
import { COLORS, CSTYLE, STYLES } from '../Constants';
import SpacedRow from '../Components/SpacedRow';
import { Feather } from '@expo/vector-icons';


export type HomeScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'home'
>;

interface Props {

}

const Home = (props: Props) => {
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
        <View style={{ backgroundColor: COLORS.LIGHTGRAY }}>
            <SpacedRow
                Left={
                    <Text style={CSTYLE.title}>
                        Home
                    </Text>
                }
                Right={
                    <Feather name="map" size={24} color={COLORS.TEXT} />
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
