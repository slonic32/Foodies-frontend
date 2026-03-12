import axios from 'axios';

import { BACKEND_HOST } from './backend';

axios.defaults.baseURL = BACKEND_HOST + '/api/';
const refreshAxios = axios.create();
refreshAxios.defaults.baseURL = BACKEND_HOST + '/api/';
