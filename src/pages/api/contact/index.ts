import { getContacts } from "@/lib/data";
import { NextApiResponse, NextApiRequest } from "next";


export default async function handler (req: NextApiRequest, res: NextApiResponse) {
    if(req.method === "GET") {
        const contact = await getContacts();
        return res.status(200).json({status: true, message: "berhasil ambil contact", data: contact});
    }
}