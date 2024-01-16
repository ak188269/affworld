import axios from "axios";
import attachInterceptor from "./utils/attachInterceptor";
import fetchData from "./utils/fetchData";
import postData from "./utils/postData";
import URL from "./urlHelper";

//  this is only used when body is json not form-data
const userAxios = attachInterceptor( axios.create({
  baseURL: URL.USER_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials :true,
}));



const register = async (name , email , password)=>{
    const url = `${URL.USER_REGISTER_API}`;
    const body = {name , email , password };
    return await postData(userAxios , url , body);
}

const login = async (email , password)=>{
    const url = `${URL.USER_LOGIN_API}`;
    const body = {email , password };
    return await postData(userAxios , url , body);
}

const logout = async () =>{
    const url = `${URL.USER_LOGOUT_API}`;
    return await fetchData(userAxios , url);
}

const isUserLoggedIn = async () =>{
  const url = `${URL.IS_USER_LOGGED_IN_API}`;
  return await fetchData(userAxios , url );
}

export { register  , login , logout , isUserLoggedIn};