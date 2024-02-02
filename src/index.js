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

// Executing code after the DOM has loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initializing SlimSelect for the breed dropdown
  const breedSelect = new SlimSelect({
    select: '.breed-select',
    placeholder: 'Select a breed'
  });

  // Getting reference to loader and cat info elements
  const loaderElement = document.querySelector('.loader');
  const catInfoElement = document.querySelector('.cat-info');

  // Handling breed selection change
  breedSelect.onChange((info) => {
    const selectedBreedId = info.value();
    
    // Showing loader and hiding cat info while fetching data
    loaderElement.style.display = 'block';
    catInfoElement.style.display = 'none';

    // Fetching cat information based on selected breed
    fetchCatByBreed(selectedBreedId)
      .then(catData => {
        // Displaying cat information
        displayCatInfo(catData);
      })
      .catch(error => {
        // Handling errors and logging them
        console.error(error);
      })
      .finally(() => {
        // Hiding loader and showing cat info after fetch completes
        loaderElement.style.display = 'none';
        catInfoElement.style.display = 'block';
      });
  });

  // Fetching list of cat breeds on page load
  fetchBreeds()
    .then(breeds => {
      // Populating the breed dropdown with fetched data
      populateBreedSelect(breeds);
    })
    .catch(error => {
      // Handling errors during breed fetch and logging them
      console.error(error);
    });
});

// Function to populate the breed dropdown
function populateBreedSelect(breeds) {
  const breedSelect = document.querySelector('.breed-select');

  breeds.forEach(breed => {
    breedSelect.options[breed.id] = new Option(breed.name, breed.id);
  });
}

// Function to display cat information in the cat info element
function displayCatInfo(catData) {
  const catInfoElement = document.querySelector('.cat-info');
  catInfoElement.innerHTML = `
    <img src="${catData[0].url}" alt="Cat Image">
    <p>Name: ${catData[0].breeds[0].name}</p>
    <p>Description: ${catData[0].breeds[0].description}</p>
    <p>Temperament: ${catData[0].breeds[0].temperament}</p>
  `;
}