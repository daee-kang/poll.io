import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import MapView, { Region, Marker, Circle } from 'react-native-maps';
import * as Location from 'expo-location';
import { SafeAreaView } from 'react-native-safe-area-context';


interface Props {

}

const Map = (props: Props) => {
    const [region, setRegion] = useState<Region | undefined>();
    const [radius, setRadius] = useState(4000);

    useEffect(() => {
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
