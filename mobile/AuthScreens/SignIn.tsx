import { StackNavigationProp } from '@react-navigation/stack';
import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, Button, KeyboardAvoidingView, Platform, Touchable } from 'react-native';
import { AuthStackParamList } from '../App';
import { COLORS, CSTYLE, STYLES } from '../Constants';
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { AntDesign, FontAwesome } from '@expo/vector-icons';


import { AuthContext } from '../Context/authContext';
import SpacedRow from '../Components/SpacedRow';
import TouchButton from '../Components/TouchButton';
import { ErrorMessage } from '@hookform/error-message';

interface Props {
    navigation: StackNavigationProp<AuthStackParamList, 'SignIn'>;
}

const SignIn = ({ navigation }: Props) => {


    const { signIn } = useContext(AuthContext);
    const { control, handleSubmit, formState: { errors, isValid }, getValues } = useForm({ criteriaMode: 'all' });
    const [passwordHidden, setPasswordHidden] = useState(true);

    const onSubmit = () => {
        const data = {
            username: getValues('emailusername'),
            password: getValues('password')
        };
        signIn(data, signinCallback);
    };

    const signinCallback = (err: string) => {
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
                    <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                        <View style={{ height: 22 }}>
                            <View style={{ flex: 1 }} />
                            <Text style={CSTYLE.bold}>
                                Create an account
                            </Text>
                        </View>
                    </TouchableOpacity>
                }
                style={{ padding: STYLES.PAGEMARGIN }}
            />

            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.authPage}
            >
                <Text style={CSTYLE.title}>
                    Login
                </Text>
                <ErrorMessage
                    name="emailusername"
                    errors={errors}
                    render={
                        ({ message }) => <Text>
                            {message}
                        </Text>
                    }
                />

                <View style={styles.formContainer}>
                    <Text style={styles.label}>
                        Email or Username
                    </Text>
                    <Controller
                        control={control}
                        name="emailusername"
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
                                message: 'Please enter your username or email'
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
                                    style={styles.eyeInput}
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
                                message: 'Please enter your password'
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

export default SignIn;
