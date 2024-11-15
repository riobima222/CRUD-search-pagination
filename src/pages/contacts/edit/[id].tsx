import UpdateForm from "@/components/editForm";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const UpdateContactPage = () => {
  const router = useRouter();
  const { id } = router.query;

  // STATES :
  const [contact, setContact] = useState(false);

  // HOOKS :
  useEffect(() => {
    if (id) {
      const updateContact = async () => {
        const res = await fetch("/api/contact/" + id, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          cache: "no-store",
        });
        const response = await res.json();
        if (res.ok) {
          setContact(response.data);
        } else console.log("terjadi kesalahan: ", response);
      };
      updateContact();
    }
  }, [id]);

  // CONDITION :
  if (!contact) {
    <div className="max-w-md mx-auto mt-5">
      <h1 className="text-2xl text-center mb-2">Update Contact</h1>
      <h2 className="text-3xl font-bold text-center">Data tidak di temukan</h2>
    </div>;
  }
  return (
    <div className="max-w-md mx-auto mt-5">
      <h1 className="text-2xl text-center mb-2">Update Contact</h1>
      <UpdateForm contact={contact} />
    </div>
  );
};
export default UpdateContactPage;
