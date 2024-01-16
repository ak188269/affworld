const attachInterceptor = (axiosInstance) =>{
//  request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
      return config;
    },
    (error) => {
      console.log("error: " + error);
      return Promise.reject(error);
  }
  );
  
  // response interceptor
  
  axiosInstance.interceptors.response.use(
      (data) => {
          return data;
      },
      (error) => {
        console.log("error: " , error.message);
        if (error?.response?.status === 404) error.message = "Api not found 😔";
      return Promise.reject(error);
    }
  );
  
  return axiosInstance ;
}

export default attachInterceptor;