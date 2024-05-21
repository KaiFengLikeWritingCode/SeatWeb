import axios from 'axios';

const API_URL = 'http://localhost:8081/api/seats'; // 根据你的实际情况调整

export default {
    getAllSeats() {
        return axios.get(API_URL, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });
    },
    initializeSeats(rows, columns) {
        return axios.post(`${API_URL}/initialize`, { rows, columns }, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });
    },
    addPoints(id) {
        return axios.post(`${API_URL}/addPoints`, { id }, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });
    }
};
