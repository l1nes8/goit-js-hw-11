import { getImage } from './fetch.js';
import { refs } from './refs.js';

let page = 1;
let searchQuery = '';
const perPage = 40;

refs.form.addEventListener('submit', onSubmit);

async function onSubmit(e) {
  e.preventDefault();

  searchQuery = e.target.elements.searchQuery.value;
  page = 1;
  refs.gallery.innerHTML = '';
  await getImage({ searchQuery, page, perPage });
}

refs.loaderMore.addEventListener('click', loadMore);

async function loadMore() {
  page += 1;
  await getImage({ searchQuery, page, perPage });
}
