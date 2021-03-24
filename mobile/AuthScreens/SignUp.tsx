import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity } from 'react-native';
import { AuthStackParamList } from '../App';
import { Ionicons } from '@expo/vector-icons';

interface Props {
    navigation: StackNavigationProp<AuthStackParamList, 'SignUp'>;
}

const SignUp = ({ navigation }: Props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");

    return (
        <View style={styles.page}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={styles.back}>
                    <Ionicons name="arrow-back-outline" size={20} />goback
                </Text>
            </TouchableOpacity>
            <Text style={styles.title}>sign up:</Text>

            <View style={{ height: 30 }} />

            <Text style={styles.inputHeader}>
                username
                </Text>
            <TextInput
                style={styles.textInput}
                value={username}
                onChangeText={(text) => setUsername(text)}
                autoCorrect={false}
                placeholder="username"
            />


            <Text style={styles.inputHeader}>
                password
                </Text>
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
                <TouchableOpacity>
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
