import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import qs from 'querystring';

const api = axios.create({
    baseURL: "http://daee-mb.local:8000/",
    responseType: "json"
});

const stringify = (params: qs.ParsedUrlQueryInput | undefined) => {
    return qs.stringify(params);
};

const header = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
};

const apiPost = async (path: string, body: any) => {
    const userToken = await AsyncStorage.getItem('userToken');

    return api.post(
        path,
        body,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${userToken}`
            }
        });
};

const apiGet = async (path: string, params?: any) => {
    const userToken = await AsyncStorage.getItem('userToken');

    return api.get(
        path,
        {
            params: params ?? null,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${userToken}`
            }
        }
    );
};

const updateVoted = () => {
    apiGet('/poll/getUserVotes')
        .then((data) => {
            if (data.data === `Error: no votes`) {
                votesCached = [];
            } else {
                votesCached = data.data;
                console.log('voted upated: ', votesCached);
            }
        });
};

let votesCached: Array<{
    _id: string,
    answerid: string,
    pollid: string;
}>;

export {
    api,
    apiPost,
    apiGet,
    stringify,
    header,
    updateVoted,
    votesCached
};