import { NextApiResponse, NextApiRequest } from "next";
import { getContactPages } from "@/lib/data";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { query = "", currentPage = 1 } = req.body;
    
    try {
      const result = await getContactPages(query);
      
      res.status(200).json({
        status: true, 
        message: "Berhasil ambil data halaman kontak", 
        data: result
      });        
    } catch (err) {
      console.error("Error in contact-pages API:", err);
      
      res.status(500).json({ 
        status: false, 
        message: "Gagal mengambil data halaman kontak" 
      });        
    }
  } else {
    // Handle metode request yang tidak didukung
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}