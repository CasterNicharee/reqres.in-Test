import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === 'DELETE') {
        const { id } = req.query;

        try {
            const response = await axios.delete(`https://reqres.in/api/user/${id}`);

            console.log('204 User Delete')
            res.status(204).end()

        } catch (error) {
            console.error(error);
        }
    } else {

    }

}