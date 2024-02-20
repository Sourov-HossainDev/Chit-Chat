import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import SideBar from '../Component/Sidebar/SideBar';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import GroupList from '../Component/GroupList/GroupList';
import FriendRequest from '../Component/FriendRequest/FriendRequest';
import Friend from '../Component/Friend/Friend';
import UserList from '../Component/UserList/UserList';
import BlockedUser from '../Component/BlockUser/BlockedUser';
import { userLoginInfo } from '../Slice/UserSlice';
import MyGroup from '../Component/MyGroup/MyGroup';


const Home = () => {
  const auth = getAuth();
  const naviget = useNavigate();
  const dispatch =useDispatch();
  const data = useSelector(state => state.userLoginInfo.userInfo);
  console.log(data);
  const [verify, setVerify] = useState(false);
  

  const backToLogin = ()=>{
    naviget('/login')
  }

  useEffect(() => {
    if (!data) {
      console.log('ok');
      naviget('/login')

    }
  })

 

  onAuthStateChanged(auth, (user)=>{
    console.log(user);
    if(user.emailVerified){
      dispatch(userLoginInfo(user));
      localStorage.setItem('userLoginInfo', JSON.stringify((user)) )
      setVerify(true)
    }
  })
  return (
    <>
      <div className='font-popins'>
        {
          verify ? 
          
            <div className='flex gap-x-[40px] ml-[32px]   '>
              <div className='w-[186px] ' >
                <SideBar></SideBar>
              </div>


              <div className='w-[427px] ' >
                <GroupList></GroupList>
                <FriendRequest></FriendRequest>
              </div>


              <div className='w-[380px]' >
                <Friend></Friend>
                <MyGroup></MyGroup>
              </div>
              <div className='w-[380px] ' >
                <UserList></UserList>
                <BlockedUser></BlockedUser>

              </div>


            </div>
            :
            <div className='bg-red-50  w-full h-screen pt-[315px] text-center '>
              <h1 className='text-center text-8xl font-nunito font-bold text-[#eb2f06] '>Please verify your email</h1>
              <p onClick={backToLogin} className='font-semibold mt-[30px] p-[20px] bg-PurpleBlue inline-block text-white rounded-[8.6px] cursor-pointer '>Back to Login</p>
            </div>
            
        }
      </div>

    </>
  )
}

export default Home