import React, { useEffect } from 'react'
import Search from '../Search/Search'
import fndRequestImage from '../../assets/Image/fndrequest.png'
import { getDatabase, onValue, push, ref, set } from 'firebase/database';
import { useSelector } from 'react-redux';

const UserGroup = () => {
    const db = getDatabase();
    // const data = useSelector(state => state.userLoginInfo.userInfo)
    const [groupSerial, setGroupSerial] = ([]);

    useEffect(() => {
        const groupRef = ref(db, 'group/');
        onValue(groupRef, (snapshot) => {
            let arr = []
            snapshot.forEach((item) => {
                console.log(item.val(), 'hhh');
                arr.push(...item.val())
            })
            setGroupSerial(arr)
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
                        {/* {
                            groupSerial.map((item) => (
                                <div className='mt-[17px] flex justify-between items-center border-b-2 pb-[13.5px] '>
                                    <div>
                                        <img src={fndRequestImage} />
                                    </div>
                                    <div>
                                        <p className='font-semibold text-[14px] '>Raghav</p>
                                        <p className='font-medium text-[12px] opacity-75 '>Dinner?</p>
                                    </div>
                                    <div className=' '>
                                        <p className='font-semibold text-[10px] '>Today, 8:56pm</p>
                                    </div>
                                </div>
                            ))
                        } */}
                        <div className='mt-[17px] flex justify-between items-center border-b-2 pb-[13.5px] '>
                            <div>
                                <img src={fndRequestImage} />
                            </div>
                            <div>
                                <p className='font-semibold text-[14px] '>Raghav</p>
                                <p className='font-medium text-[12px] opacity-75 '>Dinner?</p>
                            </div>
                            <div className=' '>
                                <p className='font-semibold text-[10px] '>Today, 8:56pm</p>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </>
    )
}

export default UserGroup