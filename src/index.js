import './css/styles.css';

import getRefs from './js/refs';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import fetchCountries from './js/fetchCountries';

const DEBOUNCE_DELAY = 300;

const refs = getRefs();

refs.input.addEventListener('input', debounce(onInputSearch, DEBOUNCE_DELAY));

function onInputSearch(e) {
  const formValue = e.target.value.trim();

  if (formValue === '') {
    clearList();
    clearCard();
    return;
  }

  fetchCountries(formValue)
    .then(r => {
      if (r.length > 10) {
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if (r.length >= 2 && r.length <= 10) {
        clearCard();
        renderCountryList(r);
      } else if (r.length === 1) {
        clearList();
        renderCountryCard(r);
      }
    })

    .catch(error => {
      console.log(error);
      Notify.failure('Oops, there is no country with that name');
      clearCard();
      clearList();
    });
}

function renderCountryList(countries) {
  const listItem = countries
    .map(
      country =>
        `<li class='country-list__item'><img src="${country.flags.svg}" alt="${country.name.official}" width="30"/> ${country.name.official}</li>`
    )
    .join('');
  refs.countryList.innerHTML = listItem;
}

function renderCountryCard(countries) {
  const cardItem = countries
    .map(
      country =>
        `<img src="${country.flags.svg}" alt="${
          country.name.official
        }" width="30"/>
        <h2 class='card-title'>${country.name.official}</h2>
        <ul class='country-list'>
          <li>Capital: ${country.capital}</li>
          <li>Population: ${country.population}</li>
          <li>Languages: ${Object.values(country.languages)}</li>
        </ul>`
    )
    .join('');
  refs.countryInfo.innerHTML = cardItem;
}

function clearList() {
  return (refs.countryList.innerHTML = '');
}

function clearCard() {
  return (refs.countryInfo.innerHTML = '');
}
