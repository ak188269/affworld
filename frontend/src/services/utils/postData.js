const postData = async (axiosInsatance, url , body) => {
    let error = null;
    let response = null;
    try {
      error = null;
      const { data } = await axiosInsatance.post(url,body);
      response = data;
    } catch (e) {
      console.log("error: " , e.response);
      error = {message : e.response?.data.message || e.response?.data.error, statusCode : e.response?.status || 400};
    }
  
    return [response, error];
  };
  
  export default postData;