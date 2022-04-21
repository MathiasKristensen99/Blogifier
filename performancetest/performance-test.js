import { sleep } from 'k6';
import http from 'k6/http';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";


export const options = {
    duration: '10s',
    vus: 50,
    thresholds: {
        http_req_duration: ['p(100)<200']
    },
};

export default function () {
    http.get('http://185.51.76.36:9888/api/post/list/All/Post');
    sleep(3);
}

export function handleSummary(data) {
    return {
        "summary.html": htmlReport(data),
    };
}

