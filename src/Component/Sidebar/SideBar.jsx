import React, { createRef, useState } from 'react'
import SidebarImage from '../../assets/Image/sidebarImage.png'
import { SlHome } from "react-icons/sl"
import { AiFillMessage } from "react-icons/ai"
import { IoMdNotificationsOutline } from "react-icons/io"
import { CiSettings } from "react-icons/ci"
import { FiLogOut } from "react-icons/fi"
import { getAuth, signOut, updateProfile } from "firebase/auth"
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userLoginInfo } from '../../Slice/UserSlice'
import { FaCloudUploadAlt } from "react-icons/fa"
import "cropperjs/dist/cropper.css";
import Cropper from "react-cropper";
import { getDownloadURL, getStorage, ref, uploadString } from "firebase/storage"
import { ToastContainer, toast } from 'react-toastify';
import { getDatabase, ref as realRef, set } from "firebase/database";

const SideBar = () => {
  const auth = getAuth();
  const storage = getStorage();
  const db = getDatabase();
//  const uploadData =useSelector(state=> state);
 

  const dispatch = useDispatch();
  const naviget = useNavigate();
  const Data = useSelector(state => state.userLoginInfo.userInfo)
  console.log(Data.displayName);

  const [profilImaageUploadUI, setProfilImaageUploadUI] = useState(false);
  const [image, setImage] = useState('');
  const [cropData, setCropData] = useState('');
  const cropperRef = createRef();


  const handelLogOut = () => {
    console.log('yes');
    signOut(auth).then(() => {
      dispatch(userLoginInfo(null))
      localStorage.removeItem('userLoginInfo')
      naviget('/login')
    }).catch((error) => {

    });

  }


  const uploadImage = () => {
    setProfilImaageUploadUI(true);
  }
  const imageUploadButton = () => {

  }
  const imageChancelButton = () => {
    setProfilImaageUploadUI(false);
    setImage('');
    setCropData('')

  }


  const SelectImage = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    console.log(files, 'sourov');
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };
  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());


      const storageRef = ref(storage, auth.currentUser.uid);
      const message4 = cropperRef.current?.cropper.getCroppedCanvas().toDataURL();
      uploadString(storageRef, message4, 'data_url').then((snapshot) => {
        console.log('Uploaded a data_url string!');
        getDownloadURL(storageRef).then((downloadURL) => {
          console.log('File available at', downloadURL);
          updateProfile(auth.currentUser, {
            photoURL: downloadURL
          }).then(() => {
            set(realRef(db, 'users/' + Data.uid), {
              username: Data.displayName,
              email: Data.email,
              profile_picture: downloadURL
            });
            
          }).then(() => {
            toast.success('Profile Picture Upload Successfull');
            setTimeout(() => {
              naviget('/')
            }, 1000);
            setProfilImaageUploadUI(false);
            setImage('');
            cropData('')
            
          })
        });
      });
    }
  };

  return (
    <>
      <div>
        <div className='bg-PurpleBlue h-screen rounded-[20px]  '>
          <div className='pt-[38px] '>
            <div className='relative group w-28 h-28 mx-auto '>

              <ToastContainer position="top-center" autoClose={1000} theme="dark" />
              <img className='rounded-full mx-auto w-full h-full' src={Data.photoURL} />

              <div className='p-[5px] m-auto bg-white mt-[10px] rounded text-center '>
                <h1 className=' font-semibold text-[12px] text-GlufBlue   '>{Data.displayName} </h1>

              </div>
              <div className='absolute  top-0 left-0 w-full h-full rounded-full group-hover:bg-overlay opacity-0 group-hover:opacity-100  flex justify-center items-center cursor-pointer    '>
                <FaCloudUploadAlt onClick={uploadImage} className=' text-white text-3xl' />
              </div>
            </div>

          </div>


          <div className='relative flex justify-center  pt-[20px] pb-[25px]  after:absolute after:content[""] after:top-0 after:right-0 after:w-[161px] after:h-full after:bg-white after:z-[-1] z-[1] mt-[78px] after:rounded-l-[20px]  
              
              before:absolute before:content[""] before:top-0 before:right-0 before:w-[12px] before:h-full before:bg-PurpleBlue before:rounded-l-[8px] '>
            <SlHome className=' text-PurpleBlue  text-4xl' />
          </div>

          <div className='flex justify-center mt-[57px] '>
            <AiFillMessage className='text-white text-4xl ' />
          </div>
          <div className='flex justify-center mt-[57px] '>
            <IoMdNotificationsOutline className='text-white text-4xl ' />
          </div>
          <div className='flex justify-center mt-[57px] '>
            <CiSettings className='text-white text-4xl ' />
          </div>
          <div className='flex justify-center mt-[57px] '>
            <FiLogOut onClick={handelLogOut} className='text-white text-4xl ' />
          </div>
        </div>
      </div>
      {
        profilImaageUploadUI &&
        <div className='absolute top-0 left-0 w-full h-screen z-50 bg-PurpleBlue items-center flex'>
          <div className='w-1/2 py-[20px] px-[15px] bg-white m-auto rounded-[20px]  '>
            <h1 className='font-nunito font-bold text-[28px] text-center border-b-4 border-GlufBlue  pb-[10px] text-GlufBlue mb-[10px] '>Upload Profile Picture</h1>
            <div className='text-center'>
              <div className='group relative group w-28 h-28 mx-auto overflow-hidden rounded-full mb-[10px] '>
                {
                  image ?
                    <div
                      className="img-preview w-[50%] h-[50%] "
                      style={{ width: "100%", float: "left", height: "300px" }}
                    />
                    :
                    <img className='mx-auto w-full h-full ' src={Data.photoURL} />
                }


              </div>





              <div className='pl-[10px] '>
                <input className='pl-[100px] mb-[10px] ' onChange={SelectImage} type="file" />
                {
                  image &&
                  <Cropper
                    ref={cropperRef}
                    style={{ height: 400, width: "100%" }}
                    zoomTo={0.5}
                    initialAspectRatio={1}
                    preview=".img-preview"
                    src={image}
                    viewMode={1}
                    minCropBoxHeight={10}
                    minCropBoxWidth={10}
                    background={false}
                    responsive={true}
                    autoCropArea={1}
                    checkOrientation={false}
                    guides={true}
                  />
                }

              </div>
              <div className='mt-[10px] '>
                <button onClick={getCropData} className='py-[10px] px-[20px] bg-[#2ecc71] rounded-[20px] text-white font-semibold mr-[30px] '>Upload</button>
                <button onClick={imageChancelButton} className='py-[10px] px-[20px] bg-[#e74c3c] rounded-[20px] text-white font-semibold  '>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      }

    </>
  )
}

export default SideBar