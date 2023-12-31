
import { useSelector } from 'react-redux';
import { useRef, useState } from 'react';
import { useEffect } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import { updateUserStart, updateUserSuccess, updateUserFailure, deleteUserFailure, deleteUserStart, deleteUserSuccess, signInStart, signFailure, } from '../redux/user/userSlice'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import axios from 'axios';
axios.defaults.withCredentials = true


const Profile = () => {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const [showListingsError, setShowListingsError] = useState(false);


  const dispatch = useDispatch();

  console.log(formData);
  console.log(currentUser);

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }

  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred /
          snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress))

      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        )
      }
    );

  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      dispatch(updateUserStart());

      const res = await axios.post(`http://localhost:3000/api/user/update/${currentUser._id}`, formData, {
        withCredentials: true
      })
      const data = await res.data;

      if (data.success === false) {
        dispatch(updateUserFailure(data.message))
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);

    } catch (error) {
      dispatch(updateUserFailure(error.message))
    }

  };

  const handleDeleteUser = async () => {

    try {

      dispatch(deleteUserStart());



      const res = await axios.delete(`http://localhost:3000/api/user/delete/${currentUser._id}`, {
        withCredentials: true
      })
      const data = res.data;

      if (data.success === false) {
        dispatch(deleteUserFailure(data.message))
        return;
      }

      dispatch(deleteUserSuccess(data));

    } catch (error) {
      dispatch(deleteUserFailure(error.message))
    }
  };

  const handleSignOut = async () => {

    try {

      dispatch(signInStart());

      const res = await axios.get('http://localhost:3000/api/auth/signout', {
        withCredentials: true
      })

      const data = await res.data;

      if (data.success === false) {
        dispatch(signFailure(data.message));
        return;

      }

      dispatch(deleteUserSuccess(data));

    } catch (error) {
      dispatch(deleteUserFailure(error.message))
    }




  }

  const handleShowListings = async () => {
    try {
      setShowListingsError(false);
      const res = await axios.get(`http://localhost:3000/api/user/listing/${currentUser._id}`, {
        withCredentials: true
      });
      const data = res.data;

      if (data.success === false) {
        setShowListingsError(true);
        return;
      }

      setUserListings(data);

    } catch (error) {
      setShowListingsError(true);
    }

  }

  const handleListingDelete = async (listingId) => {
    try {
      const res = await axios.delete(`http://localhost:3000/api/listing/delete/${listingId}`, {
        withCredentials: true
      });
      const data =  res.data;

      console.log(data);
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      setUserListings((prev) =>
        prev.filter((listing) => listing._id !== listingId)
      );
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>

      <input onChange={(e) => setFile(e.target.files[0])} type="file" ref={fileRef} hidden accept='image/*' />


      <form onSubmit={handleSubmit} className='flex flex-col gap-4' >
        <img onClick={() => fileRef.current.click()} src={formData.avatar || currentUser.avatar} alt="profile" className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2' />

        <p className='text-sm self-center'>
          {fileUploadError ? (
            <span className='text-red-700'>
              Error Image upload( image must be less than 2 mb)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className='text-green-700'>Image successFully uploaded</span>
          ) : (
            ''
          )
          }
        </p>

        <input type="text"
          placeholder='username'
          id='username'
          className='border p-3 rounded-lg'
          defaultValue={currentUser.username}
          onChange={handleChange}
        />

        <input type="email"
          placeholder='email'
          id='email'
          className='border p-3 rounded-lg'
          defaultValue={currentUser.email}
          onChange={handleChange}
        />

        <input type="password"
          placeholder='password'
          id='password'
          className='border p-3 rounded-lg'
          onChange={handleChange}
        />

        <button disabled={loading} className='bg-blue-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'>{loading ? 'Loading...' : 'Update'}</button>
        <Link to='/create-listing' className='bg-green-600 rounded-lg p-3 text-white uppercase text-center hover:opacity-95' >
          Create Listing
        </Link>
      </form>

      <div className="flex justify-between mt-5">
        <span className='text-red-600 cursor-pointer' onClick={handleDeleteUser}>Delete account</span>
        <span className='text-red-600 cursor-pointer' onClick={handleSignOut}>Sign out</span>
      </div>
      <p className='text-red-600 mt-5 text-center'>{error ? error : ''}</p>

      <p className='text-green-600 mt-5 text-center'>
        {updateSuccess ? 'User is updated successfully!' : ''}
      </p>
      <button onClick={handleShowListings} className='text-green-600 w-full'>
        Show Listings
      </button>
      <p>{showListingsError ? 'Error showing listings' : ''}</p>

      {userListings && userListings.length !== 0 &&
        <div className="flex flex-col gap-4">
          <h1 className='text-center mt-7 text-2xl font-semibold'>Your Listings</h1>
          {userListings.map((listing) => (
            <div
              key={listing._id}
              className='border rounded-lg p-3 flex justify-between items-center gap-4'
            >
              <Link to={`/listing/${listing._id}`}>
                <img
                  src={listing.imageUrls[0]}
                  alt='listing cover'
                  className='h-16 w-16 object-contain'
                />
              </Link>
              <Link
                className='text-slate-700 font-semibold  hover:underline truncate flex-1'
                to={`/listing/${listing._id}`}
              >
                <p>{listing.name}</p>
              </Link>

              <div className='flex flex-col item-center'>
                <button onClick={() => handleListingDelete(listing._id)} className='text-red-600 uppercase'>Delete</button>
                <Link to={`/update-listing/${listing._id}`}>
                <button className='text-green-600 uppercase'>Edit</button>
                </Link>
              </div>
            </div>
          ))}
        </div>}
    </div>
  )
}

export default Profile;
