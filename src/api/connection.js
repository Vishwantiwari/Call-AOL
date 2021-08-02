import axios from 'axios';


const instance = axios.create({
    baseURL: 'https://deployaol.herokuapp.com',
});

export default instance;
