import { getContacts } from "@/lib/data";
import { NextApiResponse, NextApiRequest } from "next";
import { prisma } from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { query, page = 1 }: any = req.query; // Default page to 1 if not provided
    const contact = await getContacts(query, page);
    return res
      .status(200)
      .json({ status: true, message: "berhasil ambil contact", data: contact });
  } else if (req.method === "POST") {
    const data = req.body;
    try {
      await prisma.contact.create({
        data: {
          name: data.name,
          phone: data.phone,
        },
      });
      return res
        .status(200)
        .json({ status: true, message: "berhasil membuat contact" });
    } catch (error) {
      return res
        .status(500)
        .json({ status: false, message: "gagal terkoneksi ke database" });
    }
  }
}
