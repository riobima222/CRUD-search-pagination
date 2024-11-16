import { prisma } from "@/lib/prisma";
// import {PrismaClient} from "@prisma/client"
// const prisma = new PrismaClient();

export const getContacts = async (query: string, page: number) => {
  try {
    if (!query || query.trim() === "") {
      const contacts = await prisma.contact.findMany();
      return contacts;
    }
    const contacts = await prisma.contact.findMany({
      where: {
        OR: [
          {
            name: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            phone: {
              contains: query,
              mode: "insensitive",
            },
          },
        ],
      },
    });
    return contacts;
  } catch (error) {
    throw new Error("Gagal mengambil contact");
  }
};

export const getContactById = async (id: string) => {
  try {
    const contact = await prisma.contact.findUnique({
      where: { id },
    });
    return contact;
  } catch (err) {
    return false;
  }
};
