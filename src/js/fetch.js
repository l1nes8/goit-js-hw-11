import axios from 'axios';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { createImageCard } from './createMarkup.js';
import { refs } from './refs.js';

let lightbox = new SimpleLightbox('.gallery a', {
  captions: true,
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
});

export async function getImage({ searchQuery, page, perPage }) {
  const BASE_URL = 'https://pixabay.com/api/';
  const API_KEY = '38965444-221e39e59f698a8ee4d2c4c8b';
  const URL = `${BASE_URL}?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`;

  try {
    refs.loader.classList.add('visible');
    const response = await axios.get(URL);
    const data = response.data;

    if (data.hits.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      refs.loaderMore.classList.remove('visible');
      return;
    }

    const totalHits = data.totalHits;
    const imagesHTML = data.hits.map(image => createImageCard(image)).join('');
    refs.gallery.innerHTML += imagesHTML;

    if (refs.gallery.children.length >= totalHits) {
      refs.loaderMore.classList.remove('visible');
      refs.gallery.innerHTML +=
        '<p class="end-results">We\'re sorry, but you\'ve reached the end of search results.</p>';
    } else {
      Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
      refs.loaderMore.classList.add('visible');
    }

    lightbox.refresh();
  } catch (err) {
    console.error('Error fetching images:', err);
  } finally {
    refs.loader.classList.remove('visible');
  }
}
