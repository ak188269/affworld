import React, { useState } from 'react'
import { useUser } from '../../provider/UserProvider';


import Navbar from '../../component/navbar/Navbar';
import Secret from '../../component/secret/Secret';
import UserSecret from '../../component/userSecret/UserSecret';
import DeleteSecret from '../../component/deleteSecret/DeleteSecret';
import Home from '../../component/home/Home';
import About from '../../component/about/About';
import { useSearchParams } from 'react-router-dom';
import { isUserLoggedIn } from '../../services/user';
import toast from 'react-hot-toast';

const LandingPage = () => {
    const {user , setUser} = useUser();
    const [tab , setTab] = useState(user?.secret?.secret ? 1 : 2);
    const Tabs = ["_",<Home/>,<UserSecret setTab={setTab}/>,<DeleteSecret setTab={setTab}/>,<About/>]

  return (
   <>
   <div className='flex gap-3 flex-col md:flex-row'>
    <Navbar tab={tab} setTab={setTab}/>
  {Tabs[tab]}
   </div>
   </>
  )
}

export default LandingPage;