import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import MapView, { Region, Circle } from 'react-native-maps';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../Navigation/StackNavigation';

export type MapScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'map'
>;

export type MapProps = {
    region: Region | undefined,
    updateRegion: (inRegion: Region) => void;
};

interface Props {

}

const defaultRegion: Region = {
    //TO-DO: change this to someething fun hehe
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
};


const Map = (props: Props) => {
    const [radius, setRadius] = useState(4000);
    //const route = useRoute<RouteProp<MapProps, 'map'>>();

    const navigation = useNavigation<MapScreenNavigationProp>();
    const route = useRoute<RouteProp<RootStackParamList, 'map'>>();

    const [region, setRegion] = useState<Region | undefined>();

    useEffect(() => {
        setRegion(route.params.region ?? defaultRegion);
    }, []);

    console.log(region);

    const goBack = () => {
        route.params.updateRegion(region ?? defaultRegion);
        navigation.goBack();
    };

    return (
        <View>
            <TouchableOpacity onPress={goBack}>
                <Text style={{ backgroundColor: 'green', padding: 20 }}>
                    go back
                </Text>
            </TouchableOpacity>

            <MapView
                style={styles.map}
                initialRegion={region}
                region={region}
                showsUserLocation={true}
                onLongPress={(event) => {
                    setRegion({
                        latitude: event.nativeEvent.coordinate.latitude,
                        longitude: event.nativeEvent.coordinate.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421
                    });
                }}
            >
                {region && <Circle
                    //the key has to be changed with state update or it won't show
                    key={(region.latitude + region.longitude + radius).toString()}
                    center={{ latitude: region.latitude, longitude: region.longitude }}
                    radius={radius}
                    strokeWidth={5}
                    strokeColor={'#FF5733'}
                    fillColor="rgba(255, 0, 0, 0.5)"
                />}
            </MapView>
        </View>
    );
};

const styles = StyleSheet.create({
    map: {
        width: Dimensions.get("screen").width,
        height: Dimensions.get("screen").height
    }
});

export default Map;
