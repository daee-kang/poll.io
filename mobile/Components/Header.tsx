import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Svg, { Path, Circle, G } from 'react-native-svg';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../Constants';
import { useNavigation } from '@react-navigation/core';
import { HomeScreenNavigationProp } from '../Screens/Home';
import { MapProps } from '../Screens/Map';


interface Props extends MapProps {
    navigation: HomeScreenNavigationProp,
}

const Header = (props: Props) => {
    const navigation = useNavigation();

    return (
        <View style={styles.header}>

            <View style={styles.left}>
                <TouchableOpacity style={styles.button}
                    onPress={
                        () =>
                            navigation.navigate('map', {
                                region: props.region,
                                updateRegion: props.updateRegion
                            })
                    }
                >
                    <View style={styles.buttonContainer}>
                        <Svg viewBox="0 0 293.334 293.334"><G fill={COLORS.RED}><Path d="M146.667 0C94.903 0 52.946 41.957 52.946 93.721c0 22.322 7.849 42.789 20.891 58.878 4.204 5.178 11.237 13.331 14.903 18.906 21.109 32.069 48.19 78.643 56.082 116.864 1.354 6.527 2.986 6.641 4.743.212 5.629-20.609 20.228-65.639 50.377-112.757 3.595-5.619 10.884-13.483 15.409-18.379a94.561 94.561 0 0016.154-24.084c5.651-12.086 8.882-25.466 8.882-39.629C240.387 41.962 198.43 0 146.667 0zm0 144.358c-28.892 0-52.313-23.421-52.313-52.313 0-28.887 23.421-52.307 52.313-52.307s52.313 23.421 52.313 52.307c0 28.893-23.421 52.313-52.313 52.313z" /><Circle cx="146.667" cy="90.196" r="21.756" /></G></Svg>
                    </View>
                    <Text>
                        hello
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={styles.right}>
                <TouchableOpacity style={styles.button}
                    onPress={() => navigation.navigate('create', {
                        region: props.region
                    })}
                >
                    <View style={styles.buttonContainer}>
                        <Ionicons name="person" size={25} color={COLORS.SECONDARY} />
                    </View>
                </TouchableOpacity>
            </View>

        </View >
    );
};

const styles = StyleSheet.create({
    header: {
        height: 60,
        flexDirection: 'row',
        paddingHorizontal: 20,
        marginTop: 55,
    },
    left: {
        flex: 1,
        justifyContent: 'center'
    },
    right: {
        flex: 1,
        flexDirection: 'row-reverse'
    },
    button: {
        height: 50,
        width: 150,
        backgroundColor: 'white',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2.62,
        elevation: 4,
    },
    buttonContainer: {
        height: '60%',
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default Header;
