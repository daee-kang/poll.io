import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AuthStackParamList } from '../App';

interface Props {
    navigation: StackNavigationProp<AuthStackParamList, 'SignUp'>;
}

const SignUp = ({ navigation }: Props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");

    return (
        <View style={styles.page}>
            <Text style={styles.title}>Sign up</Text>

            <Text>username</Text>
            <TextInput
                style={styles.textInput}
                value={username}
                onChangeText={(text) => setUsername(text)}
                autoCorrect={false}
            />

            <View style={{ height: 20 }} />

            <Text>password</Text>
            <TextInput
                style={styles.textInput}
                value={password}
                onChangeText={(text) => setPassword(text)}
                autoCorrect={false}
            />

            <TouchableOpacity>
                <Text>create account</Text>
            </TouchableOpacity>

            <View style={{ flex: 1 }} />
        </View>
    );
};

const styles = StyleSheet.create({
    page: {
        marginTop: 50,
        paddingHorizontal: 30,
        alignContent: 'center',
        justifyContent: 'center',
        flex: 1
    },
    title: {
        fontSize: 40,
        marginBottom: 20,
        fontFamily: 'roboto-slab'
    },
    textInput: {
        height: 50,
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 20
    }
});

export default SignUp;
