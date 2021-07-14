import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Touchable } from 'react-native';
import { COLORS } from '../Constants';
import { apiPost } from '../utils/api';
import { answerItem, pollItem } from './FeedFlatList';

interface Props {
    poll: pollItem;
}

const Vote = ({ poll }: Props) => {
    const [selected, setSelected] = useState<string | null>(null); //_id

    const vote = (answerid: string) => {
        apiPost('/poll/vote',
            {
                pollid: poll._id,
                answerid
            })
            .then((res) => {
                if (res.data != "Voted already") {
                    console.log("VOTED");
                } else {
                    console.log("ALREADY VOTED");
                }
            })
            .catch(err => {
                console.log(err);
            });
    };

    const renderAnswer = ({ item }: { item: answerItem; }) => {
        return <TouchableOpacity
            style={[styles.voteCard, selected === item._id ? styles.selected : null]}
            onPress={() => { setSelected(item._id); }}
        >
            <Text>
                {item.title}
            </Text>
        </TouchableOpacity>;

    };

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <FlatList
                    data={poll.answers}
                    renderItem={renderAnswer}
                    keyExtractor={(_, index) => `answer-${index}`}
                />
            </View>

            <TouchableOpacity
                style={
                    [styles.submit, selected === null ? styles.disabled : null]
                }
                disabled={selected === null}
                onPress={() => vote(selected!)}
            >
                <Text style={{ textAlign: 'center' }}>SUBMIT</Text>
            </TouchableOpacity>
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
    },
    selected: {
        borderColor: COLORS.PRIMARY,
    },
    submit: {
        backgroundColor: COLORS.RED,
        justifyContent: 'center',
        marginBottom: 20,
        marginHorizontal: 40,
        padding: 20,
        borderRadius: 20
    },
    disabled: {
        backgroundColor: 'gray'
    }
});

export default Vote;
