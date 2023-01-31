import axios from 'axios';

// const BASE_URL = 'https://api.lsevina126.asia';
const BASE_URL = 'http://localhost:8800';
// const USER = JSON.parse(localStorage?.getItem('persist:root') as string)?.user;
// const TOKEN = USER
//   ? JSON.parse(USER).currentUser?.accessToken?.toString()
//   : null;

let Origin =
  'http://localhost:3000' ||
  'https://www.lsevina126.asia' ||
  'https://07dc-113-131-240-155.jp.ngrok.io';

export const publicRequest = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    Origin,
    'Content-Securitiy-Policy':
      'img-src *;media-src https://res.cloudinary.com https://www.youtube.com/embed/;child-src https://res.cloudinary.com https://www.youtube.com/embed/;frame-src https://www.youtube.com/embed/;',
  },
});

// export const userRequest = axios.create({
//   baseURL: BASE_URL,
//   withCredentials: true,
//   headers: {
//     mode: 'cors',
//     token: `Bearer ${TOKEN}`,
//     origin: `http://${HOST}`,
//   },
// });