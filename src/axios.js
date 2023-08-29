import axios from 'axios';const instance = axios.create({
    baseURL: 'https://api.vela.exchange/graph/open_positions/42161/'
});export default instance;