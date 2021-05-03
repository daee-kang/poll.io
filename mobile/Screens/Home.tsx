import React, { useContext, useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, SafeAreaView } from 'react-native';
import { Region } from 'react-native-maps';
import Header from '../Components/Header';
import { AuthContext } from '../Context/authContext';
import { StackProps } from '../Navigation/StackNavigation';
import * as Location from 'expo-location';

interface Props extends StackProps {

}

const Home = (props: Props) => {
    //const { signOut } = useContext(AuthContext);
    const [region, setRegion] = useState<Region | undefined>();

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
            console.log(location.coords);
        })();
    }, []);

    return (
        <View>
            <Header navigation={props.navigation} />

            <Text>
                {region?.latitude ?? 0}
            </Text>
        </ View>
    );
};



export default Home;
