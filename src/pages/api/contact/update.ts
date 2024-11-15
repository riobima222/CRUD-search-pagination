import { NextApiResponse, NextApiRequest } from "next";
import {prisma} from "@/lib/prisma" 


export default async function handler (req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const {data, id} = req.body
        try {
            await prisma.contact.update({
                data: {
                    name: data.name,
                    phone: data.phone
                },
                where: {id}
            })
            return res.status(200).json({status: true, message: "berhasil membuat contact"})    
        } catch (error) {
            return res.status(500).json({status: false, message: "gagal terkoneksi ke database"})
        }
    }
}