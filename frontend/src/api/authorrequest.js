import { BASE_URL } from "./baseURL";
import axios from "axios";

//get all
export const getAllAuthors = async(name)=>{
    let Authors;
    let URL;
    if (!name) {
        URL = BASE_URL+'/authors';
    }
    else{
        URL = BASE_URL+`/authors/?name=${name}`
    }
    await axios.get(URL)
    .then(res =>{ 
        Authors = res.data;
    })

    return Authors
}
//get by id
export const getAuthorByID = async(id)=>{
    let Author;
    await axios.get(`${BASE_URL}/authors/${id}`)
    .then(res =>{ 
        Author = res.data;
    })

    return Author
}
//delete
export const deleteAuthorByID = async(id)=>{
    let message;
    await axios.delete(`${BASE_URL}/authors/${id}`).then(res=>{
        message = res.data
    })
    return message
}
//post
export const postAuthors = (payload)=>{
    axios.post(`${BASE_URL}/authors`,payload)
}
//edit
export const editAuthorByID = (id,payload)=>{
    axios.put(`${BASE_URL}/authors/${id}`,payload)
}