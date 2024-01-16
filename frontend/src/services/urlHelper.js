const isDevMode = ()=>process.env.NODE_ENV !== 'production';

const URL = {
    USER_API_BASE_URL : isDevMode ? 'http://localhost:8080/api/v1/user' : "something" ,
    USER_REGISTER_API : isDevMode ? '/register' : 'something',
    USER_LOGIN_API : isDevMode ? '/login' : 'something',
    USER_LOGOUT_API : isDevMode ? '/logout' : 'something',
    IS_USER_LOGGED_IN_API : isDevMode ? '/login' : 'something',
}

export default URL ; 