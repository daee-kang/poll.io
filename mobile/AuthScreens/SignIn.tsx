import React, { useContext } from 'react';
import { View, Text } from 'react-native';

import { AuthContext } from '../context';

interface Props {

}

const SignIn = (props: Props) => {
    const { signIn } = useContext(AuthContext);

    return (
        <View>
            <Text>sign in</Text>
        </View>
    );
};

export default SignIn;
