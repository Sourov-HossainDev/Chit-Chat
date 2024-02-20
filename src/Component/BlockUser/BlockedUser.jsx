import React, { useEffect, useState } from 'react'
import Search from '../Search/Search'
import fndRequestImage from '../../assets/Image/fndrequest.png'
import { getDatabase, ref, onValue, push, set, remove } from "firebase/database";
import { useSelector } from 'react-redux';

const BlockedUser = () => {
    const db = getDatabase();
    const data = useSelector(state => state.userLoginInfo.userInfo);
    const [blockList, setblockList] = useState([])

    useEffect(() => {
        const blockRef = ref(db, 'block/');
        onValue(blockRef, (snapshot) => {
            let arr = []
            snapshot.forEach((item) => {
                    console.log(item.val(), 'problemunblock');
                if (item.val().blockbyid == data.uid) {
                    arr.push({
                        id: item.key,
                        block: item.val().block,
                        blockid: item.val().blockid,
                        // profile_picture: data.photoURL
                    })
                } else {
                    arr.push({
                        id: item.key,
                        blockby: item.val().blockby,
                        blockbyid: item.val().blockbyid,
                        // profile_picture: data.photoURL
                        
                    })
                }
            })
            setblockList(arr)
            console.log(blockList , 'state');
        });
    }, [])
    const UnBlockBTN = (item) => {
        console.log(item);
        set(push(ref(db, 'friend/')), {
            sendername: item.block,
            senderid: item.blockid,
            receivername: data.displayName,
            receiverid: data.uid,
            

        }).then(() => {
            remove((ref(db, 'block/' + item.id)))
        })
    }
    return (
        <>
            <div className='w-full h-[340px] overflow-y-scroll mt-[43px] drop-shadow-md border-2    bg-white rounded-[20px] '>
                <div className=' pt-[13px] pl-[20px] pr-[20px] pb-[21px] '>
                    <div>
                        <Search></Search>
                    </div>
                    <h1 className='font-semibold text-[20px] mt-[15px] mb-[10px] '>Blocked Users</h1>
                    {
                        blockList.map((item) => (
                            <div className='mt-[17px] flex  items-center border-b-2 pb-[13.5px] '>
                                <div>
                                    <img className='rounded-full w-24 h-24 ' src={item.profile_picture} />
                                </div>
                                
                                <div className='ml-[20px] '>
                                    <p className='font-semibold text-[14px]  '>{item.block} </p>
                                    <p className='font-semibold text-[14px]  '>{item.blockby} </p>
                                    <p className='font-semibold text-[14px]  '> </p>
                                    <p className='font-medium text-[10px] opacity-75 '></p>
                                </div>

                                {
                                    !item.blockbyid &&
                                    <div className=' ml-[25px] '>
                                        <p onClick={() => UnBlockBTN(item)} className='font-semibold text-white text-[16px] py-[5px] px-[12px] bg-PurpleBlue rounded-[5px] cursor-pointer text-left'>unblock</p>
                                    </div>
                                }

                            </div>
                        ))
                    }


                </div>
            </div>
        </>
    )
}

export default BlockedUser