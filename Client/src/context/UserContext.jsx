import { createContext, useContext, useState } from "react";

const Context=createContext();

export default function UserContext(props){
    const [user,setUser]=useState(null);
    return (
        <Context.Provider value={{user,setUser}} >
            {props.children}
        </Context.Provider>
    )

}
export  const useUser=()=>{
    return useContext(Context)

}
