import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api';
const API_KEY = '55642619-f9a4b7e30ea3503be8702d4a5';

export const getImagesByQuery = async (query, page) => {
  const { data } = await axios.get('/', {
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 15,
      page: page,
    },
  });
  return data;
};
