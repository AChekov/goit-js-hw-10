import './css/styles.css';
// import { fetchCountries } from './js/fetchCountries';
import { getRefs } from './js/refs.js';
import debounce from 'lodash.debounce';
// import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

const refs = getRefs();

refs.input.addEventListener('input', debounce(onInputSearch, DEBOUNCE_DELAY));
