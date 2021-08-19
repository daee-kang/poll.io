import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { View, Text, TouchableOpacity, Button, SafeAreaView } from 'react-native';
import TouchButton from '../Components/TouchButton';
import { CSTYLE } from '../Constants';
import { AuthStackParamList } from '../RootNav';

interface Props {
    navigation: StackNavigationProp<AuthStackParamList, 'Entry'>;
}

const AuthEntry = ({ navigation }: Props) => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={CSTYLE.page}>
                <View style={{ flex: 1 }}>
                    <Text style={CSTYLE.bigTitle}>Poll now</Text>
                    <Text>add some bull shit here</Text>
                </View>
                <View
                    style={{
                        width: '100%',
                        flexDirection: 'row'
                    }}
                >
                    <TouchButton onPress={() => navigation.navigate('SignIn')} label={"Login"} />
                    <View style={{ width: 10 }} />
                    <TouchButton onPress={() => navigation.navigate('SignUp')} label={"Sign Up"} invert />
                </View>
            </View>
        </SafeAreaView>
    );
};

export default AuthEntry;
