import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { apiPost } from '../utils/api';
import { answerItem, pollItem } from './FeedFlatList';

interface Props {
    poll: pollItem;
}

const Vote = ({ poll }: Props) => {
    const vote = (answerid: string) => {
        apiPost('/poll/vote',
            {
                pollid: poll._id,
                answerid
            })
            .then((res) => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            });
    };

    const renderAnswer = ({ item }: { item: answerItem; }) => {
        return <TouchableOpacity
            style={styles.voteCard}
            onPress={() => { vote(item._id); }}
        >
            <Text>
                {item.title}
            </Text>
        </TouchableOpacity>;

    };

    return (
        <View>
            <FlatList
                data={poll.answers}
                renderItem={renderAnswer}
                keyExtractor={(_, index) => `answer-${index}`}
                style={{ height: '100%' }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    voteCard: {
        borderStyle: 'solid',
        borderWidth: 2,
        height: 80,
        marginVertical: 10,
        justifyContent: 'center',
        padding: 20,
        borderRadius: 5,
    }
});

export default Vote;
