import { createContext, useState } from "react";

export const ContactContext = createContext({});

const ContactContextProvider = ({ children }: {children: React.ReactNode}) => {
    const [contacts, setContacts] = useState([]);
    
    return (
        <ContactContext.Provider value={{contacts, setContacts}}>
            {children}
        </ContactContext.Provider>
    )
}
export default ContactContextProvider;
