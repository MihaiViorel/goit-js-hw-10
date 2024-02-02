///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Libraries Import
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// npm i notiflix
// Main Notiflix Repo: https://github.com/notiflix/Notiflix#readme
// Notify guide: https://notiflix.github.io/notify
import { Notify } from 'notiflix/build/notiflix-notify-aio';
// npm install slim-select
// https://slimselectjs.com/install#npm
import SlimSelect from 'slim-select'
// npm install axios
// https://www.npmjs.com/package//axios 
import axios from "axios";
axios.defaults.headers.common["x-api-key"] = "cheia ta";

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// API-uri folosite
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Cat API: https://developers.thecatapi.com/view-account/ylX4blBYT9FaoVd6OhvR
// Cheie: live_ADqsGzTvb6PyclE1aYg8OCPkJVDbdqK1XOASXD96ZLUbPuFmcaiILK7S7HwfWlG8
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Setting the unique API key for authentication in the HTTP header
axios.defaults.headers.common["x-api-key"] = "live_ADqsGzTvb6PyclE1aYg8OCPkJVDbdqK1XOASXD96ZLUbPuFmcaiILK7S7HwfWlG8";

// Function to fetch the list of cat breeds
export function fetchBreeds() {
  // API endpoint for getting the list of cat breeds
  const url = "https://api.thecatapi.com/v1/breeds";

  // Making a GET request to the API
  return axios.get(url)
    .then(response => response.data) // Extracting data from the response
    .catch(error => {
      handleRequestError(error); // Handling and logging errors
      throw error; // Rethrowing the error for further handling
    });
}

// Function to fetch cat information based on the provided breed ID
export function fetchCatByBreed(breedId) {
  // API endpoint for getting cat information by breed ID
  const url = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;

  // Making a GET request to the API
  return axios.get(url)
    .then(response => response.data) // Extracting data from the response
    .catch(error => {
      handleRequestError(error); // Handling and logging errors
      throw error; // Rethrowing the error for further handling
    });
}

// Function to handle and display errors in the UI
function handleRequestError(error) {
  const errorElement = document.querySelector('.error');
  errorElement.style.display = 'block'; // Displaying the error element

  // Hiding the error element after a delay
  setTimeout(() => {
    errorElement.style.display = 'none';
  }, 3000);
}