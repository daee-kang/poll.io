import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, CSTYLE, STYLES } from '../Constants';
import Poll, { PollScreenNavigationProp } from '../Screens/Poll';
import { answerItem, pollItem } from './FeedFlatList';
import SpacedRow from './SpacedRow';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface Props {
    pollItem: pollItem;
}

const PollListItem = ({ pollItem }: Props) => {
    const navigation = useNavigation<PollScreenNavigationProp>();

    const goToPoll = () => {
        navigation.navigate('poll', { poll: pollItem });
    };

    //debug
    const getRandomPill = () => {
        let pills = [
            { color: '#F8BB22', text: 'Hotel' },
            { color: '#FFA6A6', text: 'Restaurants' },
            { color: '#CCB8FC', text: 'Tourist Attractions' }
        ];

        let pill = pills[Math.floor(Math.random() * pills.length)];

        return <View style={[styles.categoryPill, { backgroundColor: pill.color }]}>
            <Text style={[CSTYLE.regular, { fontSize: 12, paddingBottom: 0, marginTop: 2 }]}>
                {pill.text}
            </Text>
        </View>;
    };

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={goToPoll}
        >
            <SpacedRow
                Left={
                    getRandomPill()
                }
                Right={
                    <Text style={CSTYLE.bold}>
                        3 days
                    </Text>
                }
            />
            <Text style={styles.questionText}>
                {pollItem.question}
            </Text>
            <SpacedRow
                Left={
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <MaterialCommunityIcons name="ticket-outline" size={20} color={COLORS.TEXT} />
                        <Text style={styles.subText}>
                            {pollItem.answers.reduce((a: number, b: answerItem) => {
                                return a + b.voted.length;
                            }, 0)} Votes
                        </Text>
                    </View>
                }
                Right={
                    <Text style={[CSTYLE.bold, { color: '#0DCD94' }]}>
                        Active
                    </Text>
                }
            />
            <View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 5,
        paddingVertical: 15,
        paddingHorizontal: 18,
        marginHorizontal: STYLES.PAGEMARGIN,
        borderRadius: 8,
        minHeight: 120,
        backgroundColor: 'white',
        flexDirection: 'column'
    },
    categoryPill: {
        paddingHorizontal: 12,
        height: 25,
        borderRadius: 15,
        justifyContent: 'center',
    },
    questionText: {
        ...CSTYLE.bold,
        fontSize: 18,
        paddingVertical: 20
    },
    subText: {
        ...CSTYLE.regular,
        marginTop: 3,
        marginLeft: 5
    }
});

export default PollListItem;
