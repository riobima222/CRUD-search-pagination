import { useContext, useEffect, useState } from "react";
import { formatDate } from "@/lib/utils";

// COMPONENTS :
import { DeleteButton, EditButton } from "@/components/buttons";
import { ContactContext } from "@/context/contacts";

// LIBRARY :
import { useDebouncedCallback } from "use-debounce";

const ContactTable = ({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) => {
  // STATE :
  const { contacts, setContacts }: any = useContext(ContactContext);

  // FUNGSI :
  const fetchContacts = async (query: string) => {
    const res = await fetch(
      `/api/contact?${query ? `query=${query}` : ""}&page=${currentPage}`
    );
    const response = await res.json();
    if (res.ok) {
      setContacts(response.data);
    } else console.log("terjadi kesalahan: ", response);
  };

  const debounceFetchContacts = useDebouncedCallback((query) => {
    fetchContacts(query);
  }, 2000);

  // HOOKS
  useEffect(() => {
    if (query === undefined) {
      fetchContacts(query);
    } else {
      debounceFetchContacts(query);
    }
  }, [query, currentPage, debounceFetchContacts]);
  return (
    <table className="w-full text-sm text-left text-gray-500">
      <thead className="text-sm text-gray-700 uppercase bg-gray-50">
        <tr>
          <th className="py-3 px-6">No</th>
          <th className="py-3 px-6">Name</th>
          <th className="py-3 px-6">Phone Number</th>
          <th className="py-3 px-6">Created At</th>
          <th className="py-3 px-6 text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        {contacts.length > 0 &&
          contacts.map((contact: any, index: number) => (
            <tr key={index} className="bg-white border-b">
              <td className="py-3 px-6">{index + 1}</td>
              <td className="py-3 px-6">{contact.name}</td>
              <td className="py-3 px-6">{contact.phone}</td>
              <td className="py-3 px-6">
                {formatDate(contact.createdAt.toString())}
              </td>
              <td className="flex justify-center gap-1 py-3">
                <EditButton id={contact.id} />
                <DeleteButton id={contact.id as string} />
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};
export default ContactTable;
