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

    const [error, dispatch] = React.useReducer(
        (prevState: any, action: any) => {
            switch (action.type) {
                case 'ERROR':
                    return {
                        ...prevState,
                        errorMessage: action.message,
                        isError: true
                    };
                case 'CLEAR':
                    return {
                        ...prevState,
                        errorMessage: '',
                        isError: false
                    };
            }
        },
        {
            isError: false,
            errorMessage: ''
        }
    );

    const validate = () => {
        let message = "";
        if (username === "") {
            message = "Username cannot be blank";
        } else if (email === "") {
            message = "Email cannot be blank";
        } else if (password === "") {
            message = "Password cannot be blank";
        } else if (password2 === "") {
            message = "Confirm password";
        } else if (!validateEmail()) {
            message = "Invalid email";
        } else if (!validatePassword()) {
            message = "Password should contain at least one digit, one upper case, and must be 8 characters long";
        } else if (password !== password2) {
            message = "Confirmed password doesn't match";
        }
        if (message === "") return true;

        dispatch({ type: 'ERROR', message });
        return false;
    };

    const validateEmail = () => {
        if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email))
            return true;
        return false;
    };

    const validatePassword = () => {
        if (/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password))
            return true;
        return false;
    };

    const validateAndSignup = () => {
        dispatch({ type: 'CLEAR' });
        validate();

        const data = {
            username,
            email,
            password
        };

        if (!validate()) return;

        //err will only be set if there is an error. Otherwise, rootnav will
        //transition into logged in state and forget about this here.
        signUp(data, validateCallback);
    };

    const validateCallback = (err: string) => {
        if (err === undefined) {
            dispatch({ type: 'ERROR', message: "Unknown error" });
        } else {
            dispatch({ type: 'ERROR', message: err });
        }
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

            <Text style={styles.error}>{error.errorMessage}</Text>

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
    },
    error: {
        textAlign: 'center',
        fontFamily: 'roboto-slab',
        color: '#d62828'

    }
});

export default SignUp;
