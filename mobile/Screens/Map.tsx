import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import MapView, { Region, PROVIDER_GOOGLE } from 'react-native-maps';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeStackParamList } from '../Navigation/TabNavigation';
import { Feather } from '@expo/vector-icons'; 
import { COLORS } from '../Constants';
import mapStyle from '../Constants/mapstyle';

export type MapScreenNavigationProp = StackNavigationProp<
    HomeStackParamList,
    'map'
>;

export type MapProps = {
    region: Region | undefined,
};

export const defaultRegion: Region = {
    //TO-DO: change this to someething fun hehe
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
};


const Map = () => {
    const navigation = useNavigation<MapScreenNavigationProp>();
    const route = useRoute<RouteProp<HomeStackParamList, 'map'>>();

    const [region, setRegion] = useState<Region | undefined>();

    useEffect(() => {
        setRegion(route.params.region ?? defaultRegion);
    }, []);

    const goBack = () => {
        navigation.goBack();
    };

    return (
        <View>
            <MapView
                style={styles.map}
                initialRegion={region}
                region={region}
                showsUserLocation={true}
                provider={PROVIDER_GOOGLE}
                customMapStyle={mapStyle}
                onLongPress={(event) => {
                    setRegion({
                        latitude: event.nativeEvent.coordinate.latitude,
                        longitude: event.nativeEvent.coordinate.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421
                    });
                }}
            >
            </MapView>

            <TouchableOpacity onPress={goBack} style={styles.backButton}>
                <Feather name="list" size={30} color={COLORS.TEXT} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    map: {
        width: Dimensions.get("screen").width,
        height: Dimensions.get("screen").height
    },
    backButton: {
        position: 'absolute',
        top: 80,
        right: 15,
        width: 40,
        height: 40,
        borderRadius: 25,
        backgroundColor: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default Map;
