import axios from "axios";
import attachInterceptor from "./utils/attachInterceptor";
import fetchData from "./utils/fetchData";
import postData from "./utils/postData";
import URL from "./urlHelper";
import updateData from "./utils/updateData";
import deleteData from "./utils/deleteData";

//  this is only used when body is json not form-data
const secretAxios = attachInterceptor( axios.create({
  baseURL: URL.SECRET_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials :true,
}));

const addSecret = async (secret)=>{
    const url = `${URL.ADD_SECRET_API}`;
    const body = {secret };
    return await postData(secretAxios , url , body);
}
const editSecret = async (id ,secret)=>{
    const url = `${URL.EDIT_SECRET_API}/${id}`;
    const body = { secret };
    return await updateData(secretAxios , url , body);
}
const deleteSecret = async (id)=>{
    const url = `${URL.DELETE_SECRET_API}/${id}`;
    return await deleteData(secretAxios , url);
}

const getAllSecret = async ()=>{
  const url = `${URL.GET_ALL_SECRET_API}`;
  return await fetchData(secretAxios , url);
}

export  {addSecret ,editSecret ,deleteSecret ,getAllSecret};