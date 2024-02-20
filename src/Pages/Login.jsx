import React, {useState} from 'react'
import LoginImage from '../assets/Image/login.png'
import { FcGoogle } from "react-icons/fc" 
import {IoIosEyeOff, IoMdEye} from 'react-icons/io'
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { userLoginInfo } from '../Slice/UserSlice';






const Login = () => {

    const dispatch =useDispatch();
    

    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    const naviget =useNavigate();


    const [email, setEmail] = useState();
    const [password, setPassword] =useState();

    const [emailError, setEmailError] =useState();
    const [passwordError, setPasswordError] =useState();
    const [success, setSuccess] =useState();

   const [passwordShow, setPasswordShow] = useState(false); 

   const inputEmail= (e)=> {
    setEmail(e.target.value)
    setEmailError('')
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

    if(!password){
        setPasswordError('Enter your password');
    } 
    
    if( email && password && (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) ){
        signInWithEmailAndPassword(auth, email, password)
        .then((user) => {
            console.log(user.user);
           toast.success('login success');
           dispatch(userLoginInfo(user.user));
           localStorage.setItem('userLoginInfo', JSON.stringify((user)) )
           setTimeout(() => {
            naviget('/')
           }, 1000);
           setEmail('');
           setPassword('');
          
        })
        .catch((error) => {
            const errorcode = error.code;
            if(errorcode.includes('auth/invalid-login-credentials')){

                setEmailError('Input data not match');
                
            }
        });
    }
    
    }
    const manageGoogle = ()=>{
        signInWithPopup(auth, provider)
        .then(() => {
            setTimeout(() => {
                naviget('/')
            }, 1000);
        }).catch((error) => {
           
            const errorCode = error.code;
            
        });
    }
  return (
    <>
        <div>
            <div className='flex   '>
                <div className='w-2/4 mt-[225px] pl-[192px]  font-openSans'>
                    <h1 className=' font-bold text-GlufBlue text-[33.344px]  '>Login to your account!</h1>

                    <ToastContainer position="top-center" autoClose={1000} theme="dark"/>

                    {
                        <h3 className='font-semibold  '>{success} </h3>
                    }
                    <div className=' '>
                        <a href="#">
                            <div  onClick={manageGoogle} className='mt-[29.78px] relative pt-[23.51px] pb-[21.3px] border inline-block rounded-[8.336px] border-NightBlue border-opacity-30 w-[220.904px] '>
                                {/* <input type="text" placeholder='Login with Google ' className='pl-[59.09px] outline-none ' /> */}
                                <p className='pl-[59.09px] font-semibold '>Login with Google</p>
                                <FcGoogle className='absolute top-[23.51px] left-[29.9px] text-[25px]  '/>
                            </div>
                        </a>

                        <div className=' mt-[53px]   '>
                            <p className='font-semibold text-[13.76px] text-opacity-70 text-GlufBlue bg-[#FFF] py-13px  pr-[14px]  '>Email Address</p>
                            <input onChange={inputEmail} value={email} type="text" placeholder='Email Address' className='w-[368.092px] border-b-[1.72px] border-GlufBlue border-opacity-30 outline-none py-[26px]   ' />
                            
                        </div>
                        {
                            emailError && 
                            <p className='text-[#eb2f06] font-semibold mt-[10px] py-[10px] px-[20px] bg-[#fff200] inline-block rounded-[4.6px] '>{emailError} </p>

                        }
                        

                        

                        <div className='relative mt-[47px] '>
                            <p className=' font-semibold text-[13.76px] text-opacity-70 text-GlufBlue bg-[#FFF] '>Password</p>
                            <input onChange={inputPassword} type={passwordShow ? 'text' : 'password'} value={password} placeholder='Password' className=' w-[368.092px] border-b-[1.72px] border-GlufBlue border-opacity-30 outline-none py-[26px]  ' />
                            
                            {
                             passwordShow ? 
                            <IoMdEye onClick={()=> setPasswordShow(!passwordShow)}  className='absolute top-[45px] right-[210px] text-[28px]  ' />
                             :
                            <IoIosEyeOff onClick={()=> setPasswordShow(!passwordShow)}  className='absolute top-[45px] right-[210px] text-[28px]  '/>
                             }
                        </div>
                        {
                            passwordError && 
                            <p className='text-[#eb2f06] font-semibold mt-[10px] py-[10px] px-[20px] bg-[#fff200] inline-block rounded-[4.6px] '>{passwordError} </p>

                        }
                            
                           
                            
                            
                  
                        
                       
                        <div className='mt-[51.86px]   '>
                            <p onClick={submitbtn}  className='cursor-pointer w-[424.902px] font-semibold text-[20.897px] text-[#fff] py-[26px] px-[122px] bg-PurpleBlue inline-block rounded-[8.707px] '>Login to Continue</p>
                        </div>
                        
                        <p className='mt-[35px] font-openSans text-[13.338px] text-NightBlue pl-[18px]  '>Don’t have an account ? <Link to='/registration' className='font-bold text-MangoTango '>Sign Up</Link></p>
                    </div>
                </div>
                <div className='w-2/4'>
                    <div >
                        <img src={LoginImage} className='w-full h-screen object-cover' />
                    </div>
                </div>
            </div>


        </div>
    </>
  )
}

export default Login