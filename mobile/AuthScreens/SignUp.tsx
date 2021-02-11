import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { View, Text } from 'react-native';
import { AuthStackParamList } from '../App';

interface Props {
    navigation: StackNavigationProp<AuthStackParamList, 'SignUp'>;
}

const SignUp = ({ navigation }: Props) => {
    return (
        <View>
            <Text>sign up</Text>
        </View>
    );
};

export default SignUp;
