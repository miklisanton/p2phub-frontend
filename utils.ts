import axios from 'axios';
import { toast } from 'react-toastify';

axios.defaults.withCredentials = true;

export const publicFetch = axios.create({
  baseURL: 'https://p2phub.top/api/v1/public',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const privateFetch = axios.create({
  baseURL: 'https://p2phub.top/api/v1/private',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const displayErrors = (error:any) => {
      for (const [key, value] of Object.entries(error.response.data.errors)) {
        console.error(`${key}: ${value}`);
        //toast.error(`${value}`);
      }
}

type csrfResponse = {
  csrf: string;
}

export const fetchCsrf = async () => {
    publicFetch.get<csrfResponse>('/csrf', {
      withCredentials: true,
    }).then(response => {
      localStorage.setItem('csrf', response.data.csrf);
      console.log('CSRF fetched');
    }).catch(error => {
      console.error('Error fetching csrf', error);
    }
    );
}
