import axios from "axios"

const axiosClient =  axios.create({
    baseURL: ['http://localhost:3000', process.env.REACT_APP_URL],
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});


export default axiosClient;
