import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity } from 'react-native';
import { AuthStackParamList } from '../App';
import { Ionicons } from '@expo/vector-icons';

import { AuthContext } from '../context';

interface Props {
    navigation: StackNavigationProp<AuthStackParamList, 'SignUp'>;
}

const SignUp = ({ navigation }: Props) => {
    const { signUp } = useContext(AuthContext);

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");

    const validateAndSignup = () => {
        //TO-DO: validate some shit


        const data = {
            username,
            email,
            password
        };
        signUp(data);
    };

    return (
        <View style={styles.page}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={styles.back}>
                    <Ionicons name="arrow-back-outline" size={20} />goback
                </Text>
            </TouchableOpacity>
            <Text style={styles.title}>sign up:</Text>

            <View style={{ height: 15 }} />

            <TextInput
                style={styles.textInput}
                value={username}
                onChangeText={(text) => setUsername(text)}
                autoCorrect={false}
                placeholder="username"
            />

            <TextInput
                style={styles.textInput}
                value={email}
                onChangeText={(text) => setEmail(text)}
                autoCorrect={false}
                placeholder="email address"
                autoCompleteType="email"
            />

            <View style={{ height: 15 }} />

            <TextInput
                style={styles.textInput}
                value={password}
                onChangeText={(text) => setPassword(text)}
                autoCorrect={false}
                autoCapitalize="none"
                autoCompleteType="password"
                secureTextEntry={true}
                placeholder="password"
                textContentType={'oneTimeCode'}
            />
            <TextInput
                style={styles.textInput}
                value={password2}
                onChangeText={(text) => setPassword2(text)}
                autoCorrect={false}
                autoCapitalize="none"
                autoCompleteType="password"
                secureTextEntry={true}
                placeholder="confirm password"
                textContentType={'oneTimeCode'}
            />

            <View style={{ marginTop: 50 }}>
                <TouchableOpacity onPress={validateAndSignup}>
                    <View style={styles.signupButton}>
                        <Text style={styles.signupText}>sign up</Text>
                    </View>
                </TouchableOpacity>
            </View>


            <View style={{ flex: 1 }} />
        </View>
    );
};

const styles = StyleSheet.create({
    page: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        padding: 40,
        marginTop: 50,
    },
    title: {
        fontFamily: 'roboto-slab-bold',
        fontSize: 65,
        textAlign: 'left',
        color: '#FFBC42'
    },
    textInput: {
        backgroundColor: 'lightgray',
        width: "100%",
        height: 55,
        marginVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 10,
        fontFamily: 'roboto-slab',
        fontSize: 18
    },
    inputHeader: {
        fontFamily: 'roboto-slab-bold',
    },
    back: {
        fontSize: 20,
        fontFamily: 'roboto-slab-bold',
        color: "#0496FF"
    },
    signupButton: {
        backgroundColor: "#0496FF",
        height: 55,
        borderRadius: 10,
        justifyContent: 'center',
        marginBottom: 20,
    },
    signupText: {
        fontFamily: 'roboto-slab-bold',
        fontSize: 20,
        textAlign: 'center'
    }
});

export default SignUp;
