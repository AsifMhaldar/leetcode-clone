import axios from "axios"

const axiosClient =  axios.create({
    baseURL: ['http://localhost:3000', "https://leetcode-clone-git-main-asif-mhaldars-projects.vercel.app/"],
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});


export default axiosClient;
