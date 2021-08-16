import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { View, Text } from 'react-native';
import { AuthStackParamList } from '../RootNav';

interface Props {
    navigation: StackNavigationProp<AuthStackParamList, 'Entry'>;
}

const AuthEntry = ({ navigation }: Props) => {

    return (
        <View>
            <Text></Text>
        </View>
    );
};

export default AuthEntry;
