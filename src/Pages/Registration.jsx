import React, {useState} from 'react'
import RegiImage from '../assets/Image/Registration.png'
import {IoIosEyeOff, IoMdEye} from 'react-icons/io'
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile  } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { Database, getDatabase, ref, set } from "firebase/database";



const Registration = () => {
    const auth = getAuth();
    const naviget =useNavigate();
    const Database = getDatabase();

    const [email, setEmail] = useState();
    const [fullName, setFullname] =useState();
    const [password, setPassword] =useState();

    const [emailError, setEmailError] =useState();
    const [fullNameError, setFullnameError] =useState();
    const [passwordError, setPasswordError] =useState();
    const [success, setSuccess] =useState();

   const [passwordShow, setPasswordShow] = useState(false); 

   const inputEmail= (e)=> {
    setEmail(e.target.value)
    setEmailError('')
   }
   const inputFullName= (f)=> {
    setFullname(f.target.value)
    setFullnameError('')
   }
   const inputPassword= (p)=> {
    setPassword(p.target.value)
    setPasswordError('')
   }

   const submitbtn= ()=>{
    if(!email){
        setEmailError('Enter your Email')
    }else if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
        setEmailError('Enter your valid Email')
    }


    if(!fullName){
        setFullnameError('Enter your full name')
    }



    if(!password){
        setPasswordError('Enter your password');
    }else if(!/^(?=.{8,})/.test(password)){
        setPasswordError('string must be eight characters ')
    } 
    
    if( email &&  fullName && password && (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) && (/^(?=.{8,})/.test(password))){
        createUserWithEmailAndPassword(auth, email, password).then((user)=>{
           
            updateProfile(auth.currentUser, {
                displayName: fullName, 
                photoURL: "./src/assets/Image/sidebarImage.png"
              }).then(() => {
                toast.success('Registration done');
                setEmail('');
                setFullname('');
                setPassword('');
                sendEmailVerification(auth.currentUser)
                setTimeout(() => {
                    naviget('/login')
                }, 2000);
                
              }).then(()=>{
                
               set(ref(Database, 'users/' + user.user.uid), {
                username: user.user.displayName,
                email: user.user.email,
                profile_picture : user.user.photoURL
                
              });
                  
              })
              .catch((error) => {
               
              });

        }).catch((error)=>{
            if(error.code.includes('auth/email-already-in-use')){

                setEmailError('This email already used');
                
            }
        })
    }


   }
  return (
    <>
        <div>
            <div className='flex'>
                <div className='w-2/4  font-nunito'>
                    <h1 className=' font-bold text-[34.401px] text-GlufBlue flex justify-end pr-[69px] mt-[225px] '>Get started with easily register</h1>

                    <ToastContainer position="top-center" autoClose={1000} theme="dark"/>

                    {
                        <h3 className='font-semibold  '>{success} </h3>
                    }
                    <div className='pl-[192px] '>
                        <p className=' text-[20.641px] opacity-50  '>Free register and you can enjoy it</p>

                        <div className='relative  mt-[53px]   '>
                            <input onChange={inputEmail} value={email} type="text" placeholder='Email Address' className='w-[368.092px] border-[1.72px] border-GlufBlue border-opacity-30 outline-none rounded-[8.6px]  py-[26px] pl-[52.86px]    ' />
                            <p className='absolute top-[-11px] left-[35px] font-semibold text-[13.76px] text-opacity-70 text-GlufBlue bg-[#FFF] py-13px pl-[18px] pr-[14px]  '>Email Address</p>
                        </div>
                        {
                            emailError && 
                            <p className='text-[#eb2f06] font-semibold mt-[10px] py-[10px] px-[20px] bg-[#fff200] inline-block rounded-[4.6px] '>{emailError} </p>

                        }
                        

                        <div className='relative  mt-[46px] '>
                            <input onChange={inputFullName} value={fullName} type="text" placeholder='Full Name' className='w-[368.092px] border-[1.72px] border-GlufBlue border-opacity-30 outline-none rounded-[8.6px]  py-[26px] pl-[52.86px]    ' />
                            <p className='absolute top-[-11px] left-[35px] font-semibold text-[13.76px] text-opacity-70 text-GlufBlue bg-[#FFF] py-13px pl-[18px] pr-[14px]  '>Full Name</p>
                        </div>
                        {
                            fullNameError && 
                            <p className='text-[#eb2f06] font-semibold mt-[10px] py-[10px] px-[20px] bg-[#fff200] inline-block rounded-[4.6px] '>{fullNameError} </p>

                        }

                        <div className='relative  mt-[47px] '>
                            <input onChange={inputPassword} type={passwordShow ? 'text' : 'password'} value={password} placeholder='Password' className=' w-[368.092px] border-[1.72px] border-GlufBlue border-opacity-30 outline-none rounded-[8.6px]  py-[26px] pl-[52.86px]    ' />
                            <p className='absolute top-[-11px] left-[35px] font-semibold text-[13.76px] text-opacity-70 text-GlufBlue bg-[#FFF] py-13px pl-[18px] pr-[14px]  '>Password</p>
                            {
                             passwordShow ? 
                            <IoMdEye onClick={()=> setPasswordShow(!passwordShow)}  className='absolute top-[26px] right-[210px] text-[28px]  ' />
                             :
                            <IoIosEyeOff onClick={()=> setPasswordShow(!passwordShow)}  className='absolute top-[26px] right-[210px] text-[28px]  '/>
                             }
                        </div>
                        {
                            passwordError && 
                            <p className='text-[#eb2f06] font-semibold mt-[10px] py-[10px] px-[20px] bg-[#fff200] inline-block rounded-[4.6px] '>{passwordError} </p>

                        }
                            
                           
                            
                            
                  
                        
                        
                            <div className='mt-[51.86px] '>
                                <p onClick={submitbtn} className='cursor-pointer font-semibold text-[20.641px] text-[#fff] pt-[19px] pb-[20.94px] pl-[158px] pr-[132px] bg-PurpleBlue inline-block rounded-[86.003px] '>Sign up</p>
                            </div>
                        
                        <p className='mt-[35px] font-openSans text-[13.338px] text-NightBlue pl-[72px]  '>Already  have an account ? <Link to='/login' className='font-bold text-MangoTango '>Sign In</Link></p>
                    </div>
                </div>
                <div className='w-2/4'>
                    <div >
                        <img src={RegiImage} className='w-full h-full object-cover' />
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Registration