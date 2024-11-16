// COMPONENTS :
import { CreateButton } from "@/components/buttons";
import ContactTable from "@/components/contact-table";
import Search from "@/components/search";
import { useRouter } from "next/router";

// FUNGSI :

const ContactPage = () => {
  const router = useRouter();
  const {query}: any = router.query || ""
  const {currentPage}: any = router.query || 1
  return (
    <div className="max-w-screen-md mx-auto mt-5">
      <div className="flex items-center justify-between gap-1 mb-5">
        <Search />
        <CreateButton />
      </div>
      <ContactTable query={query} currentPage={Number(currentPage)}/>
    </div>
  );
};

export default ContactPage;
