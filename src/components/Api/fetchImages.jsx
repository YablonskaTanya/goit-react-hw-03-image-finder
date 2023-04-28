import axios from 'axios';

const API_KEY = '34532945-6dd9e50d65c600f2d5972702b';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchImages(inputSearchForm, page = 1) {
  try {
    const response = await axios.get(
      `${BASE_URL}?q=${inputSearchForm}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
}
