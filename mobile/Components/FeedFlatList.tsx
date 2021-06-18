import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { apiGet } from '../utils/api';
import PollListItem from './PollListItem';

interface Props {
    latitude: number | undefined,
    longitude: number | undefined;
}

export type pollItem = {
    _id: string,
    question: string,
    answers: [{
        _id: string,
        answer: string,
        count: number;
    }],
    longitude: number,
    latitude: number,
};

const FeedFlatList = ({ latitude, longitude }: Props) => {
    const [pollItems, setPollItems] = useState<pollItem[]>(Array<pollItem>());
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        getNearby();
    }, []);

    const getNearby = () => {
        apiGet("/poll/get", {
            latitude: latitude ?? 0,
            longitude: longitude ?? 0,
            range: 5000,
        }).then((res: any) => {
            let newData: pollItem[] = [];
            //conform the data into our type
            res.data.forEach((poll: any) => {
                let newPoll: pollItem = {
                    _id: poll._id,
                    question: poll.question,
                    answers: poll.answers,
                    longitude: poll.location.coordinates[0],
                    latitude: poll.location.coordinates[1],
                };
                newData.push(newPoll);
            });
            setPollItems(newData);
            setRefreshing(false);
        });
    };

    const renderPoll = ({ item }: { item: pollItem; }) => {
        console.log(item);
        if (item === undefined) return null;

        return <PollListItem
            pollItem={item}
        />;
    };

    const onRefresh = () => {
        setRefreshing(true);
        getNearby();
    };

    return (
        <View>
            {/* ---------------debug--------------- */}
            <View style={{ padding: 10 }}>
                <Text style={{ textAlign: 'center' }}>
                    latitude: {latitude ?? 0}
                </Text>
                <Text style={{ textAlign: 'center' }}>
                    longitude: {longitude ?? 0}
                </Text>
                <TouchableOpacity
                    onPress={getNearby}
                >
                    <Text style={{ backgroundColor: 'green' }}>
                        fetch nearby
                </Text>
                </TouchableOpacity>
            </View>
            {/* ---------------debug--------------- */}
            <FlatList
                data={pollItems}
                renderItem={renderPoll}
                keyExtractor={item => item._id}
                onRefresh={onRefresh}
                refreshing={refreshing}
                style={{ height: '100%' }}
            />

        </View>
    );
};

export default FeedFlatList;