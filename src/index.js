import './css/styles.css';
import fetchCountries from './fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';
import markupCountryFn from  './markupCountry'
import markupListFn from './markupList';

const DEBOUNCE_DELAY = 300;

const inputEl = document.getElementById('search-box')
const countryListEl = document.querySelector('.country-list')
const countryInfoEl = document.querySelector('.country-info')

inputEl.addEventListener('input', debounce(onInputEnter, DEBOUNCE_DELAY))

function onInputEnter(event) {
  const name = event.target.value.trim();
  if (name.length === 0) {
      countryInfoEl.innerHTML = "";
      countryListEl.innerHTML = "";
      return
  }
  fetchCountries(inputEl.value)
    .then(countries => {
      if (countries.length === 1){
        const country = countries[0]
        const markup = markupCountryFn(country)
        countryInfoEl.innerHTML = markup
        countryListEl.innerHTML = ''
      } else if(countries.length > 10) {
        Notify.info('Too many matches found. Please enter a more specific name.')
        countryInfoEl.innerHTML = "";
        countryListEl.innerHTML = "";
      } else {
        const markupList = markupListFn(countries)
        countryListEl.innerHTML = markupList
        countryInfoEl.innerHTML = ''
      }
    })
    .catch(error => {
      Notify.failure('Oops, there is no country with that name')
      countryInfoEl.innerHTML = "";
      countryListEl.innerHTML = "";
    })
}