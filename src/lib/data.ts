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

export const getContactById = async (id: string) => {
   try {
    const contact = await prisma.contact.findUnique({
      where: {id}
    })
    return contact
   } catch(err) {
    return false;
   }
}
