import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import SignIn from './AuthScreens/SignIn';
import SignUp from './AuthScreens/SignUp';

import { AuthContext } from './context';

const AuthStack = createStackNavigator();
const Tabs = createBottomTabNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);

  const authContext = useMemo(() => {
    return {
      signIn: () => { },
      signUp: () => { },
      signOut: () => { }
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return <View>insert splash here</View>;
  }

  return (
    <AuthContext.Provider value={authContext}>
      < NavigationContainer >
        {userToken ?
          <Tabs.Navigator >
            <Tabs.Screen name="home" component={Home} />
            <Tabs.Screen name="other" component={Other} />
          </Tabs.Navigator >

          :

          < AuthStack.Navigator >
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
