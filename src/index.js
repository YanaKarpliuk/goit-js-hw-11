import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import fetchImg from './fetchImages';
import galleryRender from './markup';
import SimpleLightbox from "simplelightbox"
import "simplelightbox/dist/simple-lightbox.min.css"

const formEl = document.querySelector('.search-form')
const galleryEl = document.querySelector('.gallery')
const loadBtnEl = document.querySelector('.load-more')
let galleryLightbox = new SimpleLightbox('.gallery a');

let query = '';
let currentPage = 1;
const perPage = 40;

formEl.addEventListener('submit', onFormSearch);
loadBtnEl.addEventListener('click', onLoadMore)

function onFormSearch(e) {
  e.preventDefault();
  galleryEl.innerHTML = '';
  query = e.currentTarget.elements.searchQuery.value.trim();
  if (!query) {
    return Notify.failure('Please specify your search query.')
  }

  fetchImg(query, currentPage, perPage).then(({data}) => {
  if (data.totalHits === 0) {
    loadBtnEl.classList.add("is-hidden")
      Notify.failure('Sorry, there are no images matching your search query. Please try again.')
      return
  } 
  galleryRender(data.hits)
    if (data.totalHits < perPage && data.totalHits === "") {
      return loadBtnEl.classList.add("is-hidden");
    }
    Notify.success(`Hooray! We found ${data.totalHits} images.`)
    galleryLightbox.refresh()
    return loadBtnEl.classList.remove("is-hidden");
  }).catch(error => console.log(error));
}

function onLoadMore () {
  currentPage += 1
  
  fetchImg(query, currentPage, perPage).then(({data}) => {
    const totalPages = Math.ceil(data.totalHits / perPage);
    galleryRender(data.hits)
    galleryLightbox.refresh()
    if(currentPage < totalPages) {
      return loadBtnEl.classList.remove("is-hidden")
    } else {
      loadBtnEl.classList.add("is-hidden");
      Notify.info("We're sorry, but you've reached the end of search results.")
      return
    }
  }).catch(error => console.log(error))
}

