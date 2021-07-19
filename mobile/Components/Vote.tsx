import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Touchable } from 'react-native';
import { COLORS } from '../Constants';
import { apiPost, updateVoted, votesCached } from '../utils/api';
import { answerItem, pollItem } from './FeedFlatList';

interface Props {
    poll: pollItem;
}

const Vote = ({ poll }: Props) => {
    const [prevVoted, setPrevVoted] = useState<string | null>(null);
    const [selected, setSelected] = useState<string | null>(null); //_id
    const [disabled, setDisbled] = useState(false);

    useEffect(() => {
        for (let vote of votesCached) {
            if (vote.pollid === poll._id) {
                setPrevVoted(vote.answerid);
                setSelected(vote.answerid);
                setDisbled(true);
            }
        }
    }, []);

    useEffect(() => {
        setDisbled(prevVoted == selected);
    }, [selected, prevVoted]);

    const vote = (answerid: string) => {
        apiPost('/poll/vote',
            {
                pollid: poll._id,
                answerid
            })
            .then((res) => {
                if (res.data != "Voted already") {
                    updateVoted();
                    setPrevVoted(answerid);
                    console.log("VOTED");
                } else {
                    //this really shouldn't hit
                    console.log("ALREADY VOTED");
                }
            })
            .catch(err => {
                console.log(err);
            });
    };

    const renderAnswer = ({ item }: { item: answerItem; }) => {
        return <TouchableOpacity
            style={[
                styles.voteCard,
                selected === item._id ? styles.selected : null,
                (prevVoted === item._id && prevVoted === selected) ? styles.voted : null,
            ]}
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
                style={[
                    styles.submit,
                    (disabled || selected === null) ? styles.disabled : null
                ]}
                disabled={(disabled || selected === null)}
                onPress={() => vote(selected!)}
            >
                <Text style={{ textAlign: 'center' }}>
                    {prevVoted !== null ? `RESUBMIT` : `SUBMIT`}
                </Text>
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
        marginHorizontal: 15,
        justifyContent: 'center',
        padding: 20,
        borderRadius: 5,
    },
    selected: {
        borderColor: COLORS.PRIMARY,
        marginLeft: 20,
        marginRight: 10
    },
    voted: {
        borderColor: COLORS.GREEN,
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
