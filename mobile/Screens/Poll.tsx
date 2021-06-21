import { useNavigation, useRoute, RouteProp } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { pollItem } from '../Components/FeedFlatList';
import Vote from '../Components/Vote';
import { STYLES } from '../Constants';
import { preStyles } from '../Constants/cstyle';
import { RootStackParamList } from '../Navigation/StackNavigation';

export type PollScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'poll'
>;

const Poll = () => {
    const navigation = useNavigation<PollScreenNavigationProp>();
    const route = useRoute<RouteProp<RootStackParamList, 'poll'>>();

    const [isVote, setIsVote] = useState(true);
    const [poll, setPoll] = useState<pollItem>();

    useEffect(() => {
        //set the param poll to a local variable to make it more readable
        //not really necessary but it's nicer like this and we like nice things
        setPoll(route.params.poll);
    }, []);


    return (
        <SafeAreaView style={styles.page}>
            <View style={styles.header}>
                <TouchableOpacity style={{ flex: 1 }}
                    onPress={() => navigation.goBack()}
                >
                    <Text>go back idot</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={{ textAlign: 'right' }}>vote</Text>
                </TouchableOpacity>
            </View>

            <Text style={preStyles.bigTitle}>
                {poll?.question}
            </Text>

            {
                poll && isVote ?
                    <Vote poll={poll!} /> :
                    null//<Vote />
            }

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    page: {
        margin: STYLES.PAGEPADDING,
    },
    header: {
        flexDirection: 'row',
    }

});

export default Poll;
