import { useNavigation, useRoute, RouteProp } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
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

export type answerResult = {
    id: string,
    answer: string;
};

const Poll = () => {
    const navigation = useNavigation<PollScreenNavigationProp>();
    const route = useRoute<RouteProp<RootStackParamList, 'poll'>>();

    const [isVote, setIsVote] = useState(true);
    const [answers, setAnswers] = useState<answerResult[]>(Array<answerResult>());

    useEffect(() => {
        //we have titles and id's as route params
        let formedAnswers: answerResult[] = [];

        route.params.answers.map((answer) => {
            console.log(answer);
            formedAnswers.push({
                answer: answer.answer,
                id: answer.id
            });
        });

        setAnswers(formedAnswers);
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
                {route.params.question}
            </Text>

            {
                isVote ?
                    <Vote pollid={route.params.id} answers={answers} /> :
                    <Vote />
            }

            {/* 


             */}

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
