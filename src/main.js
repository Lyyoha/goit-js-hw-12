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
  loadMoreBtn: document.querySelector('.load-more'),
};

const PER_PAGE = 15;
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
    if (page * PER_PAGE >= totalHits) {
      hideLoadMoreButton();
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    } else {
      showLoadMoreButton();
    }
  } catch (error) {
    iziToast.error({ message: error.message, position: 'topRight' });
  } finally {
    hideLoader();
  }
};

const onLoadMoreClick = async () => {
  try {
    page += 1;
    hideLoadMoreButton();
    showLoader();
    const data = await getImagesByQuery(query, page);
    createGallery(data.hits);
    const cardHeight = refs.gallery
      .querySelector('.gallery-item')
      .getBoundingClientRect().height;
    window.scrollBy({ top: cardHeight * 2, behavior: 'smooth' });
    if (page * PER_PAGE >= totalHits) {
      hideLoadMoreButton();
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    } else {
      showLoadMoreButton();
    }
  } catch (error) {
    iziToast.error({ message: error.message, position: 'topRight' });
  } finally {
    hideLoader();
  }
};

refs.form.addEventListener('submit', onFormSubmit);
refs.loadMoreBtn.addEventListener('click', onLoadMoreClick);