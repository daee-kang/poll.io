import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Poll, { PollScreenNavigationProp } from '../Screens/Poll';
import { answerItem, pollItem } from './FeedFlatList';

interface Props {
    pollItem: pollItem;
}

const PollListItem = ({ pollItem }: Props) => {
    const navigation = useNavigation<PollScreenNavigationProp>();

    const goToPoll = () => {
        navigation.navigate('poll', { poll: pollItem });
    };

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={goToPoll}
        >
            <Text style={styles.questionText}>
                {pollItem.question}
            </Text>
            <View>
                <Text style={styles.subTitle}>
                    VOTES
                </Text>
                <Text style={styles.subText}>
                    {pollItem.answers.reduce((a: number, b: answerItem) => {
                        return a + b.voted.length;
                    }, 0)}
                </Text>
                <Text style={styles.subTitle}>
                    ACTIVE
                </Text>
                <Text style={styles.subText}>
                    YES
                </Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 10,
        padding: 20,
        height: 110,
        borderWidth: 1,
        flexDirection: 'row'
    },
    questionText: {
        fontFamily: 'roboto-slab',
        fontSize: 22,
        flex: 5
    },
    subTitle: {
        fontFamily: 'roboto-slab-bold',
        fontSize: 10,
        textAlign: 'right',
        color: 'gray'
    },
    subText: {
        fontFamily: 'roboto-slab',
        fontSize: 16,
        textAlign: 'right',
        color: 'red'
    }
});

export default PollListItem;
