import React, { useState } from 'react'
import { useUser } from '../../provider/UserProvider';


import Navbar from '../../component/navbar/Navbar';
import Secret from '../../component/secret/Secret';
import UserSecret from '../../component/userSecret/UserSecret';
import DeleteSecret from '../../component/deleteSecret/DeleteSecret';
import Home from '../../component/home/Home';

const LandingPage = () => {
    const {user} = useUser();
    const [tab , setTab] = useState(user?.secret ? 1 : 2);
    const Tabs = ["_",<Home/>,<UserSecret/>,<DeleteSecret/>,<Home/>]
  return (
   <>
   <div className='flex gap-3'>
    <Navbar tab={tab} setTab={setTab}/>
  {Tabs[tab]}
   </div>
   </>
  )
}

export default LandingPage;