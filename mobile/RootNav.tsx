import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SignIn from './AuthScreens/SignIn';
import SignUp from './AuthScreens/SignUp';
import { api, stringify, header } from './utils/api';

import { AuthContext } from './context';

const AuthStack = createStackNavigator();
const Tabs = createBottomTabNavigator();

//navigator type exports
export type AuthStackParamList = {
    SignIn: undefined,
    SignUp: undefined;
};

export default function RootNav() {
    //taken from https://reactnavigation.org/docs/auth-flow/
    const [state, dispatch] = React.useReducer(
        (prevState: any, action: any) => {
            switch (action.type) {
                case 'RESTORE_TOKEN':
                    return {
                        ...prevState,
                        userToken: action.token,
                        isLoading: false,
                    };
                case 'SIGN_IN':
                    return {
                        ...prevState,
                        isSignout: false,
                        userToken: action.token,
                    };
                case 'SIGN_OUT':
                    return {
                        ...prevState,
                        isSignout: true,
                        userToken: null,
                    };
            }
        },
        {
            isLoading: true,
            isSignout: false,
            userToken: null,
        }
    );

    React.useEffect(() => {
        // Fetch the token from storage then navigate to our appropriate place
        const bootstrapAsync = async () => {
            let userToken;

            try {
                userToken = await AsyncStorage.getItem('userToken');
            } catch (e) {
                // Restoring token failed
            }

            // After restoring token, we may need to validate it in production apps

            // This will switch to the App screen or Auth screen and this loading
            // screen will be unmounted and thrown away.
            dispatch({ type: 'RESTORE_TOKEN', token: userToken });
        };

        bootstrapAsync();
    }, []);

    const authContext = React.useMemo(
        () => ({
            signIn: async (data: any) => {
                // In a production app, we need to send some data (usually username, password) to server and get a token
                // We will also need to handle errors if sign in failed
                // After getting token, we need to persist the token using `AsyncStorage`
                // In the example, we'll use a dummy token

                dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
            },
            signUp: async (data: any) => {
                // In a production app, we need to send user data to server and get a token
                // We will also need to handle errors if sign up failed
                // After getting token, we need to persist the token using `AsyncStorage`
                // In the example, we'll use a dummy token
                console.log(data);
                api.post('/signup', stringify(data), header)
                    .then(response => {
                        if (response.status === 200) {
                            //success
                            console.log(response);
                            dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
                        }
                    })
                    .catch(err => console.log(err));
            },
            signOut: () => dispatch({ type: 'SIGN_OUT' })
        }),
        []
    );

    if (state.isLoading) {
        return <View>
            <Text>
                insert splash here
      </Text>
        </View>;
    }

    return (
        <AuthContext.Provider value={authContext}>
            < NavigationContainer >
                {state.userToken ?
                    <Tabs.Navigator >
                        {/* <Tabs.Screen name="home" component={Home} />
            <Tabs.Screen name="other" component={Other} /> */}
                    </Tabs.Navigator >

                    :

                    < AuthStack.Navigator
                        screenOptions={{
                            headerShown: false
                        }}>
                        <AuthStack.Screen
                            name="SignIn"
                            component={SignIn}
                        />
                        <AuthStack.Screen
                            name="SignUp"
                            component={SignUp}
                        />
                    </AuthStack.Navigator >
                }
            </NavigationContainer >
        </AuthContext.Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
