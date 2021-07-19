import { useNavigation, useRoute, RouteProp } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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

    const { poll } = route.params;

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

            <Vote poll={poll!} />

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    page: {
        margin: STYLES.PAGEPADDING,
        height: '100%'
    },
    header: {
        flexDirection: 'row',
    }

});

export default Poll;
