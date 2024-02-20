import React, { useEffect, useState } from 'react'
import Search from '../Search/Search'
import fndRequestImage from '../../assets/Image/fndrequest.png'
import { getDatabase, ref, onValue, push, set, remove } from "firebase/database";
import { useSelector } from 'react-redux';
import { ImUserCheck } from "react-icons/im";
import { FaSkullCrossbones } from "react-icons/fa";


const FriendRequest = () => {
    const data = useSelector(state => state.userLoginInfo.userInfo);
    const db = getDatabase();
    const [friendRequestList, setFriendRequestDataList] = useState([])

    useEffect(() => {
        const friendrequestRef = ref(db, 'friendrequest/');
        onValue(friendrequestRef, (snapshot) => {
            let arr = []
            snapshot.forEach((item) => {
                if (item.val().receiverid == data.uid) {

                    arr.push({ ...item.val(), id: item.key });
                }

            })
            setFriendRequestDataList(arr)
        });

    }, [])

    const friendRequestAcceptBTN = (item) => {
        set(push(ref(db, 'friend/')), {
            ...item,
            

        }).then(() => {
            remove((ref(db, 'friendrequest/' + item.id)))
        })
    }
    const friendRequestDelateBTN = (item) =>{
        set(push(ref(db, 'users/')), {
            ...item,
            

        }).then(() => {
            remove((ref(db, 'friendrequest/' + item.id)))
        })
    }
    return (
        <>
            <div className='w-full h-[340px] overflow-y-scroll mt-[43px] drop-shadow-md border-2    bg-white rounded-[20px] '>
                <div className=' pt-[13px] pl-[20px] pr-[38px] pb-[21px]  '>
                    <div>
                        <Search></Search>
                    </div>
                    <h1 className='font-semibold text-[20px] mt-[15px] mb-[10px] '>Friend  Request</h1>
                    {
                        friendRequestList.map((item) => (

                            <div className='mt-[17px] flex justify-between items-center border-b-2 pb-[13.5px] '>
                                <div>
                                    <img className='rounded-full w-24 h-24 ' src={item.profile_picture} />
                                </div>
                                <div>
                                    <p className='font-semibold text-[18px]  '>{item.sendername} </p>
                                    <p className='font-medium text-[14px] opacity-75 '>Hi Guys, Wassup!</p>
                                </div>
                                <div className='text-center' >
                                    <p onClick={() => friendRequestAcceptBTN(item)} className='font-semibold text-white text-[20px] py-[5px] px-[12px] bg-positiveColor rounded-[5px] cursor-pointer'>
                                        <ImUserCheck />
                                    </p>
                                    <p onClick={() => friendRequestDelateBTN(item)} className='font-semibold text-white text-[20px] py-[5px] px-[12px] bg-nagitiveColor rounded-[5px] cursor-pointer mt-[10px]  '>
                                        <FaSkullCrossbones />
                                    </p>
                                </div>
                            </div>
                        ))
                    }

                </div>
            </div>
        </>
    )
}

export default FriendRequest