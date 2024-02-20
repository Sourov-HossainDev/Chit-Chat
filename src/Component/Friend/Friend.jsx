import React, { useEffect, useState } from 'react'
import Search from '../Search/Search'
import fndRequestImage from '../../assets/Image/fndrequest.png'
import { getDatabase, ref, onValue, push, set, remove } from "firebase/database";
import { useSelector } from 'react-redux';


const Friend = () => {
    const db = getDatabase();
    const data = useSelector(state => state.userLoginInfo.userInfo)
    const [friend, setFriend] = useState([])

    useEffect(() => {
        const friendRef = ref(db, 'friend/');

        onValue(friendRef, (snapshot) => {

            let arr = []
            snapshot.forEach((item) => {
               
                if (data.uid == item.val().senderid || data.uid == item.val().receiverid) {

                    arr.push({ ...item.val(), key: item.key })
                }
            })
            setFriend(arr)
        });
    }, [])
    const friendBlockBTN = (item) => {
       
        if (data.uid == item.senderid) {
            set(push(ref(db, 'block/')), {
                block: item.receivername,
                blockid: item.receiverid,
                blockby: item.sendername,
                blockbyid: item.senderid,
                profile_picture: data.photoURL
               
            }).then(() => {
                remove(ref(db, 'friend/' + item.key))
            })
        } else {
            set(push(ref(db, 'block/')), {
                block: item.sendername,
                blockid: item.senderid,
                blockby: item.receivername,
                blockbyid: item.receiverid,
                profile_picture: data.photoURL
                
            }).then(() => {
                remove(ref(db, 'friend/' + item.key))
            })
        }
        // if(data.blockid){
        //     profile_picture: data.photoURL
        // }




    }
    return (
        <>
            <div className='w-full h-[340px] overflow-y-scroll drop-shadow-md border-2    bg-white rounded-[20px]'>
                <div className='font-popins   pt-[13px] pl-[20px] pr-[38px] pb-[21px]  h-[340px] '>
                    <div>
                        <Search></Search>
                    </div>
                    <h1 className='font-semibold text-[20px] mt-[15px] mb-[10px] '>Friends</h1>
                    {
                        friend.map((item) => (
                            
                            <div className='mt-[17px] flex justify-between items-center border-b-2 pb-[13.5px] '>
                                {/* {console.log(item)} */}
                                <div className=''>
                                    <img className='rounded-full w-24 h-24 ' src={item.profile_picture} />

                                </div>
                                <div>
                                    <div className='relative '>
                                        <p className='font-semibold text-[16px] mr-[20px]  '>
                                            {
                                                data.uid == item.senderid ? item.receivername : item.sendername
                                            }
                                            {/* {
                                                data.uid == item.senderid ? item.receivername : item.sendername
                                            } */}
                                        </p>
                                        <div className='absolute top-[6px] right-0  p-[5px] bg-positiveColor rounded-full '></div>

                                    </div>
                                    <div >
                                        {/* <p className='font-nunito font-semibold text-[12px] p-[5px] bg-positiveColor mr-[5px] rounded'>On-line</p>
                                        <p className='font-nunito font-semibold text-[12px] p-[5px] bg-nagitiveColor rounded '>Of-line</p> */}

                                    </div>
                                </div>

                                <div >
                                    <p onClick={() => friendBlockBTN(item)} className='font-semibold text-white text-[16px] py-[5px] px-[12px] bg-nagitiveColor rounded-[5px] cursor-pointer'>Block</p>
                                </div>
                            </div>
                        ))
                    }



                </div>
            </div>
        </>
    )
}

export default Friend