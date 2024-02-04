///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Libraries Import
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// npm install axios
// https://www.npmjs.com/package//axios 
import axios from "axios";
axios.defaults.headers.common["x-api-key"] = "live_ADqsGzTvb6PyclE1aYg8OCPkJVDbdqK1XOASXD96ZLUbPuFmcaiILK7S7HwfWlG8";
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const fetchBreeds = () => {
    return axios.get("https://api.thecatapi.com/v1/breeds")
        .then(response => response.data)
        .catch(error => Promise.reject(error));
};

export const fetchCatByBreed = (breedId) => {
    return axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
        .then(response => response.data)
        .catch(error => Promise.reject(error));
};