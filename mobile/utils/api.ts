import axios from 'axios';
import qs from 'querystring';

const api = axios.create({
    baseURL: "http://localhost:8000/",
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
export { api, stringify, header };