// import axios from "axios";
// import  { useEffect, useState } from "react";


// const useFetchData = () => {
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [data, setData] = useState(null);

//   const fetchData = async (url) => {
//     try {
//       setLoading(true);
//       setError(null);
//       const { data } = await axios.get(url);
//       setData(data);
//     } catch (err) {
//       if (err.response?.status === 404) {
//         setError("Api not found 😔");
//         return;
//       }
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // useEffect(()=>{
//   //   fetchData(url); 
    
//   // },[]);

//   return [fetchData, loading, data, error];
// };

// export default useFetchData;


const fetchData = async (axiosInsatance, url) => {
  let error = null;
  let response = null;
  try {
    error = null;
    const { data } = await axiosInsatance.get(url);
    response = data;
  } catch (e) {
    error = {message : e.response?.data.message || e.response?.data.error , statsCode : e.response?.status};
  }

  return [response, error];
};

export default fetchData;