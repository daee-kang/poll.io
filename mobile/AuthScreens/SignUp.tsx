import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { AuthStackParamList } from '../App';
import { AntDesign, FontAwesome } from '@expo/vector-icons';

import { AuthContext } from '../Context/authContext';
import SpacedRow from '../Components/SpacedRow';
import { COLORS, CSTYLE, STYLES } from '../Constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Controller, useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import TouchButton from '../Components/TouchButton';

interface Props {
    navigation: StackNavigationProp<AuthStackParamList, 'SignUp'>;
}

const SignUp = ({ navigation }: Props) => {
    const { signUp } = useContext(AuthContext);
    const { control, handleSubmit, formState: { errors, isValid }, getValues } = useForm({ criteriaMode: 'all' });
    const [passwordHidden, setPasswordHidden] = useState(true);

    const onSubmit = () => {
        const data = {
            username: getValues('username'),
            email: getValues('email'),
            password: getValues('password')
        };
        signUp(data, signupCallback);
    };

    const signupCallback = (err: string) => {
        console.log(err);
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <SpacedRow
                Left={
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <AntDesign name="left" size={24} color="black" />
                    </TouchableOpacity>
                }
                Right={
                    <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                        <View style={{ height: 22 }}>
                            <View style={{ flex: 1 }} />
                            <Text style={CSTYLE.bold}>
                                Login
                            </Text>
                        </View>
                    </TouchableOpacity>
                }
                style={{ padding: STYLES.PAGEMARGIN }}
            />

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.authPage}
            >
                <Text style={CSTYLE.title}>
                    Sign Up
                </Text>
                <ErrorMessage
                    name="lol"
                    errors={errors}
                    render={
                        ({ message }) => <Text>
                            {message}
                        </Text>
                    }
                />

                <View style={styles.formContainer}>
                    <Text style={styles.label}>
                        Email Address
                    </Text>
                    <Controller
                        control={control}
                        name="email"
                        render={({ field: { onChange, value, onBlur } }) => (
                            <TextInput
                                value={value}
                                onBlur={onBlur}
                                onChangeText={value => onChange(value)}
                                style={CSTYLE.textInput}
                            />
                        )}
                        rules={{
                            required: {
                                value: true,
                                message: 'Please enter an email address'
                            }
                        }}
                    />

                    <Text style={styles.label}>
                        Username
                    </Text>
                    <Controller
                        control={control}
                        name="username"
                        render={({ field: { onChange, value, onBlur } }) => (
                            <TextInput
                                value={value}
                                onBlur={onBlur}
                                onChangeText={value => onChange(value)}
                                style={CSTYLE.textInput}
                            />
                        )}
                        rules={{
                            required: {
                                value: true,
                                message: 'Please enter a username'
                            }
                        }}
                    />

                    <Text style={styles.label}>
                        Password
                    </Text>
                    <Controller
                        control={control}
                        name="password"
                        render={({ field: { onChange, value, onBlur } }) => (
                            <View style={styles.eyeWrapper}>
                                <TextInput
                                    value={value}
                                    onBlur={onBlur}
                                    onChangeText={value => onChange(value)}
                                    style={CSTYLE.textInput}
                                    secureTextEntry={passwordHidden}
                                />

                                <FontAwesome name={`${passwordHidden ? 'eye-slash' : 'eye'}`} size={24} color={COLORS.TEXT} style={styles.eye} onPress={() => {
                                    setPasswordHidden(!passwordHidden);
                                }} />
                            </View>
                        )}
                        rules={{
                            required: {
                                value: true,
                                message: 'Please enter a password'
                            }
                        }}
                    />

                    <Text style={styles.label}>
                        Confirm Password
                    </Text>
                    <Controller
                        control={control}
                        name="confirmpassword"
                        render={({ field: { onChange, value, onBlur } }) => (
                            <View style={styles.eyeWrapper}>
                                <TextInput
                                    value={value}
                                    onBlur={onBlur}
                                    onChangeText={value => onChange(value)}
                                    style={CSTYLE.textInput}
                                    secureTextEntry={passwordHidden}
                                />

                                <FontAwesome name={`${passwordHidden ? 'eye-slash' : 'eye'}`} size={24} color={COLORS.TEXT} style={styles.eye} onPress={() => {
                                    setPasswordHidden(!passwordHidden);
                                }} />
                            </View>
                        )}
                        rules={{
                            required: {
                                value: true,
                                message: 'Please confirm your password'
                            }
                        }}
                    />

                    <View style={{ height: 50, marginTop: 30 }}>
                        <TouchButton onPress={handleSubmit(onSubmit)} label="Login" />
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    authPage: {
        ...CSTYLE.page,
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        padding: 40,
    },
    formContainer: {
        marginTop: 42,
    },
    label: {
        ...CSTYLE.normal,
        paddingHorizontal: 5
    },
    eyeWrapper: {
        position: 'relative'
    },
    eye: {
        position: 'absolute',
        top: 22,
        right: 12,
    },
    eyeInput: {
        ...CSTYLE.textInput,
        paddingRight: 50
    }
});

export default SignUp;;
