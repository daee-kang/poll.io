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

    const submitSignin = () => {
        dispatch({ type: 'CLEAR' });

        if (username === "") {
            dispatch({ type: 'ERROR', message: "Username field empty" });
            return;
        } else if (password === "") {
            dispatch({ type: 'ERROR', message: "Password field empty" });
            return;
        }

        const data = {
            username,
            password
        };

        signIn(data, signinCallback);
    };

    const signinCallback = (err: string) => {
        if (err === undefined) {
            dispatch({ type: 'ERROR', message: "Unknown error" });
        } else {
            dispatch({ type: 'ERROR', message: err });
        }
    };

    return (
        <View style={styles.page}>
            <View style={{ flex: 3 }}>
                <Text style={styles.title}>
                    poll now,
            </Text>
                <Text style={styles.title}>
                    login.
                </Text>

                <View style={{ marginTop: 10, marginBottom: 30, flexDirection: 'row' }}>
                    <Text style={styles.subtitle}>
                        If you are a new /
                </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('SignUp')} style={{ flex: 1 }}>
                        <Text style={styles.signupLink}>sign up</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.inputHeader}>
                    username
                </Text>
                <View style={styles.centerRow}>
                    <TextInput
                        style={styles.loginInputs}
                        value={username}
                        onChangeText={(val) => setUsername(val)}
                        autoCorrect={false}
                        autoCapitalize="none"
                        autoCompleteType="username"
                    />
                </View>

                <Text style={styles.inputHeader}>
                    password
                </Text>
                <View style={styles.centerRow}>
                    <TextInput
                        style={styles.loginInputs}
                        value={password}
                        onChangeText={(val) => setPassword(val)}
                        autoCorrect={false}
                        autoCapitalize="none"
                        autoCompleteType="password"
                        secureTextEntry={true}
                        textContentType={'oneTimeCode'}
                    />
                </View>
            </View>

            <Text style={styles.error}>{error.errorMessage}</Text>

            <View>
                <View style={{ flex: 1 }} />
                <TouchableOpacity onPress={submitSignin}>
                    <View style={styles.loginButton}>
                        <Text style={styles.loginText}>login</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <View style={{ flex: 1 }} />
        </View >
    );
};

const styles = StyleSheet.create({
    page: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        padding: 40,
        marginTop: 80,
    },
    loginInputs: {
        backgroundColor: 'lightgray',
        width: "100%",
        height: 55,
        margin: 10,
        paddingHorizontal: 15,
        borderRadius: 10,
        fontFamily: 'roboto-slab',
        fontSize: 18
    },
    centerRow: {
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center'
    },
    title: {
        fontFamily: 'roboto-slab-bold',
        fontSize: 65,
        textAlign: 'left',
        color: '#0496FF'
    },
    subtitle: {
        fontFamily: 'roboto-slab',
        color: '#C0C0C0',
        fontSize: 16,
    },
    inputHeader: {
        fontFamily: 'roboto-slab-bold',
    },
    signupLink: {
        fontFamily: 'roboto-slab',
        paddingLeft: 10,
        fontSize: 16,
    },
    loginButton: {
        backgroundColor: "#FFBC42",
        height: 55,
        borderRadius: 10,
        justifyContent: 'center',
        marginBottom: 20,
    },
    loginText: {
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

export default SignIn;
