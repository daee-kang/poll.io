import React, { useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { AuthContext } from '../context';

interface Props {

}

const Home = (props: Props) => {
    const { signOut, getToken } = useContext(AuthContext);

    //temp for now probably will delete
    useEffect(() => {
        let getTok = async () => {
            const token = await getToken();
            console.log(token);
        };
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
