import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req : NextApiRequest, res : NextApiResponse) {
  if (req.method === 'PUT') {
    const { id } = req.query;
    const { name, job } = req.body; 
    try {
      const response = await axios.put(`https://reqres.in/api/users/${id}`, {
        name,
        job
      });
      res.status(200).json(response.data);
      console.log('data',response.data);
      
      return response.data;
    } catch (error) {
      console.error(error);
      
    }
  } else {

  }
  console.log('req',req);
}