import { getContactById } from "@/lib/data";
import { NextApiResponse, NextApiRequest } from "next";


export default async function handler (req: NextApiRequest, res: NextApiResponse) {
    if(req.method === "GET") {
        const id = req.query.id;
        const response = await getContactById(id as string);
        if(response) {
            res.status(200).json({status: true, message: "berhasil mengambil contact dengan id", data: response})
        } else {
            res.status(500).json({status: false, message: "gagal mengambil contact dengan id"})
        }
    } else if (req.method === "POST") {
        const id = req.query.id
        console.log('lihat id: ', id)
        return res.status(200).json({status: true, message: "berhasil"})
    }
}