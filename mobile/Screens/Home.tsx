import React, { useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { AuthContext } from '../context';

interface Props {

}

const Home = (props: Props) => {
    const { signOut } = useContext(AuthContext);

    useEffect(() => {

    }, []);

    return (
        <View>
            <View style={{ height: 50 }} />
            <Text>x</Text>

            <TouchableOpacity onPress={signOut}>
                <Text>logout</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Home;
