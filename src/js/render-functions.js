import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export const createGallery = images => {
  const html = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
      <li class="gallery-item">
        <a href="${largeImageURL}">
          <img src="${webformatURL}" alt="${tags}" />
        </a>
        <div class="info">
          <p><span>Likes</span><span>${likes}</span></p>
          <p><span>Views</span><span>${views}</span></p>
          <p><span>Comments</span><span>${comments}</span></p>
          <p><span>Downloads</span><span>${downloads}</span></p>
        </div>
      </li>`
    )
    .join('');

  document.querySelector('.gallery').insertAdjacentHTML('beforeend', html);
  lightbox.refresh();
};

export const clearGallery = () => {
  document.querySelector('.gallery').innerHTML = '';
};
export const showLoader = () => {
  document.querySelector('.loader').classList.add('visible');
};
export const hideLoader = () => {
  document.querySelector('.loader').classList.remove('visible');
};
export const showLoadMoreButton = () => {
  document.querySelector('.load-more').classList.remove('is-hidden');
};
export const hideLoadMoreButton = () => {
  document.querySelector('.load-more').classList.add('is-hidden');
};
