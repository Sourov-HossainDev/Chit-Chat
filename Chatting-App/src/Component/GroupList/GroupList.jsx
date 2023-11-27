import React, { useState } from 'react'
import groupImage from '../../assets/Image/group.png'
import Search from '../Search/Search'
import { MdCreate } from "react-icons/md";
import {getDatabase, push, ref, set } from 'firebase/database';
import { useSelector } from 'react-redux';

const GroupList = () => {
  const db = getDatabase();
  const data = useSelector(state => state.userLoginInfo.userInfo)
  const [show, setShow] = useState(false)
  const [groupName, setgroupName] = useState('');
  const [groupTag, setGroupTag] = useState('');

  const [groupNameError, setgroupNameError] = useState();
  const [groupTagError, setGroupTagError] = useState();



  const changeNameData = (name) => {
    setgroupName(name.target.value)
    setgroupNameError('')
  }
  const changeGroupTagData = (tag) => {
    setGroupTag(tag.target.value)
    setGroupTagError('')
  }


  const createBTN = () => {
    set(push(ref(db, 'group/')), {
      groupname: groupName,
      groupTag: groupTag,
      adminname: data.displayName,
      adminid: data.uid
    });
    if (!groupName) {
      setgroupNameError('Group name please')
    }
    if (!groupTag) {
      setGroupTagError('Group tag name please')
    }
    if(groupName && groupTag){
      setgroupName('')
      setGroupTag('')
    }
    
  }


  const groupCreateChancelBTN = () => {
    setShow(false);
  }

  const createGroupBTN = () => {
    setShow(true);
  }
  return (
    <>
      <div className=' w-full h-[340px] overflow-y-scroll drop-shadow-md border-2 bg-white rounded-[20px]   '>
        <div className=' pt-[13px] pl-[20px] pr-[38px] pb-[21px] '>
          <div>
            <Search></Search>
          </div>
          <div className='relative '>
            <h1 className='font-semibold text-[20px] mt-[15px] mb-[10px] '>Groups List</h1>
            < MdCreate onClick={createGroupBTN} className='absolute top-0 right-0 text-3xl cursor-pointer' />
          </div>

          <div className='mt-[17px] flex justify-between items-center border-b-2 pb-[13.5px] '>
            <div>
              <img src={groupImage} />
            </div>
            <div>
              <p className='font-semibold text-[18px]  '>Friends Reunion</p>
              <p className='font-medium text-[14px] opacity-75 '>Hi Guys, Wassup!</p>
            </div>
            <div className=' '>
              <p className='font-semibold text-white text-[16px] py-[5px] px-[22px] bg-PurpleBlue rounded-[5px] cursor-pointer'>Join</p>
            </div>
          </div>

        </div>
      </div>
      {
        show &&
        <div className='font-openSans absolute top-0 left-0 w-full h-screen z-50 bg-PurpleBlue items-center flex'>
          <div className='w-1/2 h-[370px] py-[20px] px-[50px] bg-white m-auto rounded-[20px]  '>
            <div className='relative border-b-4 border-dashed border-GlufBlue'>
              <h1 className=' font-bold text-[28px]   pb-[10px] text-GlufBlue mb-[10px] '>Create Group</h1>

              <button onClick={groupCreateChancelBTN} className='  absolute top-0 right-0 py-[10px] px-[20px] bg-[#e74c3c] rounded-[20px] text-white font-semibold  '>Cancel</button>
            </div>
            <div className='flex justify-between mt-[30px] '>
              <div className='relative'>
                <p className='font-semibold text-[16px] text-opacity-70 text-GlufBlue bg-[#FFF] py-13px  pr-[14px]  '>Group Name</p>
                <input onChange={changeNameData} value={groupName} type="text" placeholder='Group Name' className='w-[250px] border-b-[1.72px] border-GlufBlue border-opacity-30 outline-none py-[16px]   ' />

                {
                  groupNameError &&
                  <p className='absolute bottom-[-55px] left-0 text-[#eb2f06] font-semibold  py-[10px] px-[20px] bg-[#fff200] inline-block rounded-[4.6px] '>{groupNameError} </p>
                }
                

              </div>

              <div className='relative'>
                <p className='font-semibold text-[16px] text-opacity-70 text-GlufBlue bg-[#FFF] py-13px  pr-[14px]  '>Grooup Tag Line</p>
                <input onChange={changeGroupTagData} value={groupTag} type="text" placeholder='Grooup Tag Line' className='w-[250px] border-b-[1.72px] border-GlufBlue border-opacity-30 outline-none py-[16px]   ' />

                {
                  groupTagError &&
                  <p className='absolute bottom-[-55px] left-0 text-[#eb2f06] font-semibold  py-[10px] px-[20px] bg-[#fff200] inline-block rounded-[4.6px] '>{groupTagError} </p>

                }

              </div>
            </div>
            <div className='pt-[70px] text-center '>
              <button onClick={createBTN} className='py-[10px] px-[50px] bg-PurpleBlue rounded-[8.6px] text-white font-semibold  '>Create Group</button>
            </div>


          </div>
        </div>


      }
    </>
  )
}

export default GroupList