const isDevMode = ()=>process.env.NODE_ENV !== 'production';

const URL = {
    // user apis
    USER_API_BASE_URL : isDevMode ?  'http://localhost:8080/api/v1/user' : "https://affworld-backend.vercel.app" ,
    USER_REGISTER_API :  '/register' ,
    USER_LOGIN_API :  '/login' ,
    USER_LOGOUT_API :  '/logout' ,
    IS_USER_LOGGED_IN_API :  '/login' ,
    SIGN_IN_WITH_GOOGLE_API : "/auth/google",

    //  secret apis
    SECRET_API_BASE_URL :  isDevMode ? 'http://localhost:8080/api/v1/secret' : "https://affworld-backend.vercel.app" ,
    ADD_SECRET_API :  '/add',
    EDIT_SECRET_API : '/edit',
    DELETE_SECRET_API : '/delete',
    GET_ALL_SECRET_API : '/getAll',
}

export default URL ; 