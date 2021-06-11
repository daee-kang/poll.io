import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { answerResult } from '../Screens/Poll';
import { apiPost } from '../utils/api';

interface Props {
    pollid: string,
    answers: answerResult[];
}

const Vote = ({ pollid, answers }: Props) => {
    const vote = (answerid: string) => {
        apiPost('/poll/vote',
            {
                pollid,
                answerid
            })
            .then((res) => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            });
    };

    const renderAnswer = ({ item }: { item: answerResult; }) => {
        return <TouchableOpacity
            style={styles.voteCard}
            onPress={() => { vote(item.id); }}
        >
            <Text>
                {item.answer}
            </Text>
        </TouchableOpacity>;

    };

    return (
        <View>
            <FlatList
                data={answers}
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
