// COMPONENTS :
import { CreateButton } from "@/components/buttons";
import ContactTable from "@/components/contact-table";
import Search from "@/components/search";
import { useRouter } from "next/router";

// FUNGSI :
import { useEffect, useState } from "react";
import Pagination from "@/components/pagination";

const ContactPage = () => {
  const router = useRouter();
  const [totalPages, setTotalPage] = useState(0);

  // Gunakan default value dan konversi ke string
  const query = (router.query.query as string) || "";

  // Gunakan default value dan konversi ke number
  const currentPage = Number(router.query.page) || 1;

  const retriveContactPage = async () => {
    try {
      const res = await fetch("/api/contact-pages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query,
          currentPage,
        }),
      });

      const response = await res.json();
      console.log("response: ", response);

      if (res.ok) {
        // Pastikan mengambil totalPages dari respons yang benar
        setTotalPage(response.data.totalPages || 0);
      } else {
        console.error("GAGAL FETCHING DATA", response);
      }
    } catch (error) {
      console.error("Error fetching contact pages:", error);
    }
  };

  useEffect(() => {
    // Panggil fungsi hanya jika ada query atau currentPage berubah
    retriveContactPage();
  }, [query, currentPage]);

  return (
    <div className="max-w-screen-md mx-auto mt-5">
      <div className="flex items-center justify-between gap-1 mb-5">
        <Search />
        <CreateButton />
      </div>
      <ContactTable query={query} currentPage={currentPage} />
      <div className="flex justify-center mt-3">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
};

export default ContactPage;
