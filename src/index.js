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

// Adding styles to improve the visual appearance
const styles = `
  .loader {
    display: none;
    text-align: center;
    margin-top: 20px;
    font-style: italic;
  }

  .error {
    display: none;
    color: #ff0000;
    text-align: center;
    margin-top: 20px;
  }

  .cat-info {
    display: none;
    text-align: center;
    margin-top: 20px;
  }

  .cat-info img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    margin-bottom: 10px;
  }

  /* Custom styles for SlimSelect dropdown */
  .ss-main {
    font-size: 14px;
    padding: 8px;
  }

  .ss-arrow {
    font-size: 14px;
  }
`;

// Injecting the styles into the document head
const styleElement = document.createElement('style');
styleElement.textContent = styles;
document.head.appendChild(styleElement);

document.addEventListener('DOMContentLoaded', () => {
  const breedSelect = new SlimSelect({
    select: '.breed-select',
    placeholder: 'Select a breed'
  });

  const loaderElement = document.querySelector('.loader');
  const catInfoElement = document.querySelector('.cat-info');

  breedSelect.onChange((info) => {
    const selectedBreedId = info.value();
    loaderElement.style.display = 'block';
    catInfoElement.style.display = 'none';

    fetchCatByBreed(selectedBreedId)
      .then(catData => {
        displayCatInfo(catData);
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => {
        loaderElement.style.display = 'none';
        catInfoElement.style.display = 'block';
      });
  });

  fetchBreeds()
    .then(breeds => {
      populateBreedSelect(breeds);
    })
    .catch(error => {
      console.error(error);
    });
});

function populateBreedSelect(breeds) {
  const breedSelect = document.querySelector('.breed-select');

  breeds.forEach(breed => {
    breedSelect.options[breed.id] = new Option(breed.name, breed.id);
  });
}

function displayCatInfo(catData) {
  const catInfoElement = document.querySelector('.cat-info');
  catInfoElement.innerHTML = `
    <img src="${catData[0].url}" alt="Cat Image">
    <p>Name: ${catData[0].breeds[0].name}</p>
    <p>Description: ${catData[0].breeds[0].description}</p>
    <p>Temperament: ${catData[0].breeds[0].temperament}</p>
  `;
}