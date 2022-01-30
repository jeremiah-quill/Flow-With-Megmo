// Axios is a popular NPM package used for preforming API requests
import axios from 'axios';

const { REACT_APP_BASEURL, REACT_APP_APIKEY } = process.env;


const headers = { 
    'Authorization': 'Bearer my-token',
};

const zoom = (data) => {
    return axios.post(`/api/zoom/join-class`, data, {headers});

}

// Export an object with a "search" method that searches the Giphy API for the passed query
export default zoom;
