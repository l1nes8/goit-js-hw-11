import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '38965444-221e39e59f698a8ee4d2c4c8b';

export async function getImage({ searchQuery, page, perPage }) {
  const URL = `${BASE_URL}?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`;
  const response = await axios.get(URL);
  const data = response.data;
  return data;
}
