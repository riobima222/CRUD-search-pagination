import { prisma } from "@/lib/prisma";

const ITEMS_PER_PAGE = 5;

export const getContacts = async (query: string, currentPage: number) => {
  const offset = (currentPage-1) * ITEMS_PER_PAGE;
  try {
    if (!query || query.trim() === "") {
      const contacts = await prisma.contact.findMany();
      return contacts;
    }
    const contacts = await prisma.contact.findMany({
      skip: offset,
      take: ITEMS_PER_PAGE,
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


export const getContactPages = async (query: string) => {
  try {
    // Pastikan query adalah string dan hapus whitespace di awal dan akhir
    const trimmedQuery = query ? query.trim() : "";

    // Jika query kosong, hitung total kontak
    if (!trimmedQuery) {
      const contacts = await prisma.contact.count();
      return Math.ceil(contacts / ITEMS_PER_PAGE);
    }

    // Hitung kontak yang sesuai dengan query
    const contacts = await prisma.contact.count({
      where: {
        OR: [
          {
            name: {
              contains: trimmedQuery,
              mode: "insensitive",
            },
          },
          {
            phone: {
              contains: trimmedQuery,
              mode: "insensitive",
            },
          },
        ],
      },
    });

    // Hitung total halaman
    const totalPages = Math.ceil(contacts / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error("Error in getContactPages:", error);
    throw new Error("Gagal mengambil contact");
  }
};