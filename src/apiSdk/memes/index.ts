import axios from 'axios';
import queryString from 'query-string';
import { MemeInterface, MemeGetQueryInterface } from 'interfaces/meme';
import { GetQueryInterface } from '../../interfaces';

export const getMemes = async (query?: MemeGetQueryInterface) => {
  const response = await axios.get(`/api/memes${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createMeme = async (meme: MemeInterface) => {
  const response = await axios.post('/api/memes', meme);
  return response.data;
};

export const updateMemeById = async (id: string, meme: MemeInterface) => {
  const response = await axios.put(`/api/memes/${id}`, meme);
  return response.data;
};

export const getMemeById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/memes/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteMemeById = async (id: string) => {
  const response = await axios.delete(`/api/memes/${id}`);
  return response.data;
};
