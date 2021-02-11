import { StackNavigationProp } from '@react-navigation/stack';
import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { AuthStackParamList } from '../App';

import { AuthContext } from '../context';

interface Props {
    navigation: StackNavigationProp<AuthStackParamList, 'SignIn'>;
}

const SignIn = ({ navigation }: Props) => {
    const { signIn } = useContext(AuthContext);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
        <View style={styles.page}>
            <Text style={{ textAlign: 'center' }}>
                pollio
            </Text>
            <View style={styles.centerRow}>
                <TextInput
                    style={styles.loginInputs}
                    value={username}
                    onChangeText={(val) => setUsername(val)}
                />
            </View>
            <View style={styles.centerRow}>
                <TextInput
                    style={styles.loginInputs}
                    value={password}
                    onChangeText={(val) => setPassword(val)}
                />
            </View>

            <TouchableOpacity onPress={() => signIn()}>
                <View>
                    <Text>sign in</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                <View>
                    <Text>sign up</Text>
                </View>
            </TouchableOpacity>

        </View>
    );
};

const styles = StyleSheet.create({
    page: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center'
    },
    loginInputs: {
        backgroundColor: 'gray',
        width: 200,
        margin: 10,
    },
    centerRow: {
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center'
    }
});

export default SignIn;
