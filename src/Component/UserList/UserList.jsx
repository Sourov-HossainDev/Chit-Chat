import React, { useEffect, useState } from 'react'
import Search from '../Search/Search'
import fndRequestImage from '../../assets/Image/fndrequest.png'
import { getDatabase, ref, onValue, push, set } from "firebase/database";
import { useSelector } from 'react-redux';


const UserList = () => {
    const db = getDatabase();
    const [userData, setUserData] = useState([])
    const data = useSelector(state => state.userLoginInfo.userInfo)
    const [friendRequest, setFriendRequestData] = useState([])
    const [friendList, setFriendList] = useState([])
    const [showBlock, setshowBlock] = useState([])

    useEffect(() => {
        const userRef = ref(db, 'users/');

        onValue(userRef, (snapshot) => {

            let arr = []
            snapshot.forEach((item) => {
                if (data.uid != item.key) {

                    arr.push({ ...item.val(), userid: item.key });
                    // arr.push(item.val())
                }
            })
            setUserData(arr)
        });
    }, [])

    useEffect(() => {
        const blockRef = ref(db, 'block/');

        onValue(blockRef, (snapshot) => {

            let arr = []
            snapshot.forEach((item) => {
                arr.push(item.val().blockid + item.val().blockbyid)
            })
            setshowBlock(arr)
        });
    }, [])


    const frindRequestBTN = (item) => {
        set(push(ref(db, 'friendrequest/')), {
            sendername: data.displayName,
            senderid: data.uid,
            receivername: item.username,
            receiverid: item.userid,
            profile_picture: data.photoURL,
            
        });
        
    }

    useEffect(() => {
        const friendrequest = ref(db, 'friendrequest/');
        onValue(friendrequest, (snapshot) => {
            let arr = []
            snapshot.forEach((item) => {
                arr.push(item.val().receiverid + item.val().senderid);
            })
            setFriendRequestData(arr)
        });
    }, [])


    useEffect(() => {
        const friendlist = ref(db, 'friend/');
        onValue(friendlist, (snapshot) => {
            let arr = []
            snapshot.forEach((item) => {
                arr.push(item.val().receiverid + item.val().senderid);
            })
            setFriendList(arr)
        });
    }, [])


    return (
        <>
            <div className='w-full h-[340px] overflow-y-scroll drop-shadow-md border-2    bg-white rounded-[20px]'>
                <div className='pt-[13px] pl-[20px] pr-[38px] pb-[21px] '>
                    <div>
                        <Search></Search>
                    </div>
                    <h1 className='font-semibold text-[20px] mt-[15px] mb-[10px] '>User List</h1>
                    {
                        userData.map((item) => (

                            <div className='mt-[17px] flex justify-between items-center border-b-2 pb-[13.5px] '>
                                
                                <div>
                                    <img className='rounded-full w-24 h-24 ' src={item.profile_picture} />


                                </div>
                                <div>
                                    <p className='font-semibold text-[14px]  '>{item.username} </p>

                                </div>
                                {
                                    friendList.includes(item.userid + data.uid) ||
                                        friendList.includes(data.uid + item.userid)
                                        ?

                                        <p className='font-semibold text-white text-[16px] py-[5px] px-[22px] bg-PurpleBlue rounded-[5px]'>Friend</p>

                                        :
                                        friendRequest.includes(item.userid + data.uid) ||
                                            friendRequest.includes(data.uid + item.userid)
                                            ?


                                            <p className='font-semibold text-white text-[16px] py-[5px] px-[12px] bg-[#fed330] rounded-[5px]'>pending</p>


                                            :

                                            showBlock.includes(item.userid + data.uid) ||
                                                showBlock.includes(data.uid + item.userid)
                                                ?
                                                <div>
                                                    <p className='font-semibold text-white text-[16px] py-[5px] px-[12px] bg-nagitiveColor rounded-[5px]'>Block</p>
                                                </div>
                                                :
                                                <div onClick={() => frindRequestBTN(item)}>
                                                    <p className='font-semibold text-white text-[16px] py-[5px] px-[22px] bg-PurpleBlue rounded-[5px] cursor-pointer'>+</p>
                                                </div>


                                }


                                {/* 1st part ata cilo 
                                     {friendRequest.includes(item.userid + data.uid) ||
                                        friendRequest.includes(data.uid + item.userid)
                                        ?

                                        <div>
                                            <p className='font-semibold text-white text-[16px] py-[5px] px-[22px] bg-PurpleBlue rounded-[5px] cursor-pointer'>pending</p>
                                        </div>
                                        :
                                        <div onClick={() => frindRequestBTN(item)}>
                                            <p className='font-semibold text-white text-[16px] py-[5px] px-[22px] bg-PurpleBlue rounded-[5px] cursor-pointer'>+</p>
                                        </div>} */}

                            </div>

                        ))
                    }

                </div>
            </div>
        </>
    )
}

export default UserList