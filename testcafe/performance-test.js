import { sleep } from 'k6';
import http from 'k6/http';

export const options = {
    duration: '1m',
    vus: 50,
    thresholds: {
        http_req_duration: ['p(100)<200']
    },
};

export default function () {
    http.get('http://185.51.76.36:9888/api/post/list/All/Post');
    sleep(3);
}

