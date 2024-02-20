import React, { useEffect, useState } from 'react'
import Search from '../Search/Search'
import fndRequestImage from '../../assets/Image/fndrequest.png'
import { getDatabase, onValue, push, ref, set } from 'firebase/database';
import { useSelector } from 'react-redux';


const MyGroup = () => {
    const db = getDatabase();
    const data = useSelector(state => state.userLoginInfo.userInfo)
    const [myGroupList, setmyGroupList] =useState ([]);


    useEffect(() => {
        const groupRef = ref(db, 'group/');
        onValue(groupRef, (snapshot) => {
            let arr = []
            snapshot.forEach((item) => {
                console.log(item.val(), 'hhh');
                if(data.uid == item.val().adminid){
                    arr.push({...item.val(), key: item.key} )
                }
            })
            setmyGroupList(arr)
        });
    }, [])


    return (
        <>
            <div>
                <div className='w-full h-[340px] overflow-y-scroll mt-[43px] drop-shadow-md border-2 bg-white rounded-[20px] '>
                    <div className=' pt-[13px] pl-[20px] pr-[38px] pb-[21px]  '>
                        <div>
                            <Search></Search>
                        </div>
                        <h1 className='font-semibold text-[20px] mt-[15px] mb-[10px] '>My Groups</h1>
                        {
                            myGroupList.map((item) => (
                                <div className='mt-[17px] flex justify-between items-center border-b-2 pb-[13.5px] '>
                                    <div>
                                        <img src={fndRequestImage} />
                                    </div>
                                    <div>
                                        <p className='font-semibold text-[14px] '>{item.groupname}</p>
                                        <p className='font-medium text-[14px] opacity-75 '>{item.adminname}</p>
                                    </div>
                                    <div className=' '>
                                        <p className='font-semibold text-[10px] '>Today, 8:56pm</p>
                                    </div>
                                </div>
                            ))
                        }
                        


                    </div>
                </div>
            </div>
        </>
    )
}

export default MyGroup