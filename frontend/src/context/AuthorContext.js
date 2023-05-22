import { createContext, useContext, useState } from "react";

const AuthorContext = createContext();

export const AuthorContextProvider = ({children})=>{
    const[authors,setAuthors] = useState([]);

    return(
        <AuthorContext.Provider value={[authors,setAuthors]}>
            {children}
        </AuthorContext.Provider>
    )
}

export const useAuthorContext = ()=> useContext(AuthorContext);