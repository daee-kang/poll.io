import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { apiGet, updateVoted } from '../utils/api';
import PollListItem from './PollListItem';

interface Props {
    latitude: number | undefined,
    longitude: number | undefined,
    refreshCurrentLocation: () => Promise<void>;
}

export type pollItem = {
    _id: string,
    question: string,
    answers: [answerItem],
    longitude: number,
    latitude: number,
};

export type answerItem = {
    _id: string,
    pollid: string,
    title: string,
    voted: number[]; //this really holds the ids to voters, length is amount voted
};

const FeedFlatList = ({ latitude, longitude, refreshCurrentLocation }: Props) => {
    const [pollItems, setPollItems] = useState<pollItem[]>(Array<pollItem>());
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        getNearby();
    }, [latitude, longitude]);

    const getNearby = async () => {
        setRefreshing(true);

        await refreshCurrentLocation();

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
            updateVoted();
        });
    };

    const renderPoll = ({ item }: { item: pollItem; }) => {
        if (item === undefined) return null;

        return <PollListItem
            pollItem={item}
        />;
    };

    return (
        <View>
            {/* ---------------debug--------------- */}
            {/* <View style={{ padding: 10 }}>
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
            </View> */}
            {/* ---------------debug--------------- */}
            <FlatList
                data={pollItems}
                renderItem={renderPoll}
                keyExtractor={item => item._id}
                onRefresh={getNearby}
                refreshing={refreshing}
                style={{ height: '100%' }}
            />

            {/* this is just temp for now */}
            {refreshing &&
                <View style={{
                    position: 'absolute',
                    width: '100%',
                    alignContent: 'center',
                    justifyContent: 'center'
                }}>
                    <Text style={{
                        textAlign: 'center',
                        backgroundColor: 'yellow'
                    }}>
                        loading be patient my bruh xDDD
                    </Text>
                </View>
            }


        </View>
    );
};

export default FeedFlatList;
