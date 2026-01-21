import axios from "axios";
import {toast} from 'react-hot-toast'

export default async function getuserDetails(setUser){
   
  
    const token =localStorage.getItem('token');

    try{
        const res=await axios.get('http://localhost:3000/api/v1/user/',{
            headers: {
                Authorization:  `Bearer ${token}`
            }
        });
        setUser(res.data.users);
    }
    catch(error){
        localStorage.removeItem('token')
        return toast.error(error?.response?.data?.message)

    }
    
}