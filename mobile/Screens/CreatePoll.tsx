import AsyncStorage from '@react-native-async-storage/async-storage';
import { stringify } from 'querystring';
import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, FlatList } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import cstyles from '../Components/StyleGuide';
import { COLORS } from '../Constants';
import { api } from '../utils/api';

interface Props {

}

const CreatePoll = (props: Props) => {
    const [question, setQuestion] = useState("");
    const [questionHeight, setQuestionHeight] = useState(35);
    //poll questions
    const [answers, setAnswers] = useState([
        { text: "" },
        { text: "" }
    ]);

    const addAnswer = () => {
        let a = answers;
        a.push({ text: "" });
        setAnswers([...a]);
    };

    const updateAnswer = (index: number, text: string) => {
        let a = answers;
        if (index > a.length) throw new Error("Out of bounds error.");
        a[index].text = text;
        setAnswers([...a]);
    };

    const createPoll = async () => {
        const userToken = await AsyncStorage.getItem('userToken');

        api.post('/poll/create', {
            question,
            answers
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${userToken}`
            }
        }).then((res) => {
            console.log(res);
        });
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAvoidingView
                behavior={"padding"}
                style={{ flex: 1 }}
            >
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                >
                    <View style={cstyles.page}>
                        <Text style={cstyles.h1}>
                            Create a poll:
                        </Text>
                        <View style={{
                            width: '100%',
                            backgroundColor: COLORS.PRIMARY,
                        }}>
                            <Text>Poll question</Text>
                        </View>
                        <TextInput
                            multiline={true}
                            placeholder={"Enter your question here"}
                            onChangeText={(text) => {
                                setQuestion(text);
                            }}
                            onContentSizeChange={(event) => {
                                setQuestionHeight(event.nativeEvent.contentSize.height);
                            }}
                            style={[styles.questionInput, { height: Math.max(35, questionHeight) }]}
                            value={question}
                        />

                        <View style={styles.answers}>
                            {answers.map((item, index) => {
                                return (
                                    <View key={`answer${index}`}>
                                        <View style={{
                                            width: '100%',
                                            backgroundColor: COLORS.SECONDARY,
                                        }}>
                                            <Text>Poll option</Text>
                                        </View>
                                        <TextInput
                                            placeholder={`Option ${index + 1}`}
                                            onChangeText={(text) => {
                                                updateAnswer(index, text);
                                                console.log(answers);
                                            }}
                                            style={styles.answerTextField}
                                        />
                                    </View>
                                );
                            })}
                        </View>

                        <TouchableOpacity onPress={addAnswer}>
                            <View style={{ flexDirection: 'row', alignContent: 'center', justifyContent: 'center' }}>
                                <Text style={styles.addAnswerButton}>add another option</Text>
                            </View>
                        </TouchableOpacity>

                        <Text>
                            poll options:
                        </Text>

                        <TouchableOpacity onPress={createPoll}>
                            <View style={{ flexDirection: 'row', alignContent: 'center', justifyContent: 'center' }}>
                                <Text style={styles.createPollButton}>create poll</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    questionInput: {
        width: "100%",
        height: 50,
        backgroundColor: "white",
        //borderRadius: STYLES.BORDERRADIUS,
        borderColor: "black",
        borderTopWidth: 0,
    },
    answers: {
        marginTop: 20,
    },
    answerTextField: {
        height: 35,
        borderWidth: 1,
        paddingHorizontal: 10,
        backgroundColor: 'white'
    },
    addAnswerButton: {
        textAlign: 'center',
        width: 200,
        backgroundColor: 'green',
        height: 30,
    },
    createPollButton: {
        textAlign: 'center',
        width: 200,
        backgroundColor: COLORS.PRIMARY,
        height: 30,
    }
});

export default CreatePoll;
