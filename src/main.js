import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  form: document.querySelector('.form'),
  gallery: document.querySelector('.gallery'),
  preloader: document.querySelector('.loader'),
  loadMoreBtn: document.querySelector('.load-more'),
};

let query = '';
let page = 1;
let totalHits = 0;

const onFormSubmit = async e => {
  try {
    e.preventDefault();
    query = e.target.elements['search-text'].value.trim();
    if (!query) return;
    page = 1;
    clearGallery();
    hideLoadMoreButton();
    showLoader();
    const data = await getImagesByQuery(query, page);
    totalHits = data.totalHits;
    if (data.hits.length === 0) {
      iziToast.error({ message: 'No images found!', position: 'topRight' });
      return;
    }
    createGallery(data.hits);
    if (data.hits.length < totalHits) showLoadMoreButton();
  } catch (error) {
    console.log(error);
  } finally {
    hideLoader();
  }
};

const onLoadMoreClick = async () => {
  try {
    page += 1;
    showLoader();
    const data = await getImagesByQuery(query, page);
    createGallery(data.hits);
    const cardHeight = refs.gallery
      .querySelector('.gallery-item')
      .getBoundingClientRect().height;
    window.scrollBy({ top: cardHeight * 2, behavior: 'smooth' });
    const loadedSoFar = page * 15;
    if (loadedSoFar >= totalHits) {
      hideLoadMoreButton();
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }
  } catch (error) {
    console.log(error);
  } finally {
    hideLoader();
  }
};

refs.form.addEventListener('submit', onFormSubmit);
refs.loadMoreBtn.addEventListener('click', onLoadMoreClick);
