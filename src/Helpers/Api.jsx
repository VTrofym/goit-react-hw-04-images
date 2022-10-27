import axios from 'axios';

const galleryApi = axios.create({
  baseURL: 'https://pixabay.com/api/',
  params: {
    key: '30101900-ea341d140d323a7caf8313ccb',
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 12,
  },
});

export const getGalleryService = async (query, page = 1) => {
  const { data } = await galleryApi.get('', {
    params: {
      q: query,
      page,
    },
  });
  return data;
};

// альтернативная запись
// export const getMyImgs = async (query, page=1,per_page = 12,orientation= 'horizontal', image_type='photo',key= '30101900-ea341d140d323a7caf8313ccb') => {
//   const {data} =await axios.get(`https://pixabay.com/api/?page=${page}per_page=${per_page}orientation=${orientation}image_type=${image_type}key=${key}q=${query}`)
// }
