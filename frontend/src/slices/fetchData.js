import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { apiRoutes } from '../routes/routes.js';

const fetchData = createAsyncThunk(
  'data/fetchData',
  async (token) => {
    const { data } = await axios.get(apiRoutes.dataPath(), { headers: { Authorization: `Bearer ${token}` } });
    // Bearer-токен - токен на предъявителя

    return data;
  },
);

export default fetchData;
