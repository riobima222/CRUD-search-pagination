import { prisma } from "@/lib/prisma";
// import {PrismaClient} from "@prisma/client"
// const prisma = new PrismaClient();

export const getContacts = async () => {
  try {
    const contacts = await prisma.contact.findMany();
    return contacts
  } catch (error) {
    throw new Error("Gagal mengambil contact");
  }
};
