import React, { useState } from 'react';
import { login } from '../../services/user';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../provider/UserProvider';
import toast from 'react-hot-toast';

const Login = () => {
    const [loading , setLoading] = useState(false);
    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');
    const navigate = useNavigate();

    const { setUser} = useUser();

    const handleLogin = async (e)=>{
        e.preventDefault();
        setLoading(true);
        const [response , error] = await login( email  , password);
        setLoading(false);
        if(error){
            toast.error(error.message);
            return ;
        }
        toast.success(response.message);
        setUser(response.data);
        navigate("/")
    }
  return (
    <div className='mt-[20vh] flex justify-center items-center'>
    <div className="login-container border-2 rounded-sm px-5 py-6 sm:min-w-[320px] md:w-[50%] lg:w-[30%] max-w-[400px]">
      <h1 className="text-3xl font-bold mb-4 text-center">Affworld</h1>
      <form onSubmit={handleLogin}>
      
          <label className="block mb-2">
            Email 
            <input
              className="border border-gray-400 p-2 w-full rounded"
              type="text"
              name="email"
              onChange={(e)=>setEmail(e.target.value)}
              value={email}
            />
          </label>
          <label className="block mb-2">
            Password
            <input
              className="border border-gray-400 p-2 w-full rounded"
              type="password"
              name="password"
              onChange={(e)=>setPassword(e.target.value)}
              value={password}
            />
          </label>
          <button className="bg-[#2E8BC0] text-white p-2 w-full rounded" type="submit">
         {loading ? 'processing ..' : 'Login'}
          </button>
      </form>
      <p className="mt-4">
        Don't have an account?{' '}
        <a className="text-blue-500 hover:underline" href="/register">
          Register here
        </a>
        .
      </p>
    </div>
    </div>
  );
};




export default Login;
