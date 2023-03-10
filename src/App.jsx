import './styles/App.css'
import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import router from './Routes/Routes';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import 'react-loading-skeleton/dist/skeleton.css'
import Cookies from 'universal-cookie';
import { useVerifyUserMutation } from './features/auth/authApi';
import { useEffect } from 'react';
import { setLoading, setToken, setUser } from './features/auth/authSlice';
import { useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch();

  // auth/user
  // auth/user
  // auth/user

  const [verifyUser, { data }] = useVerifyUserMutation();
  const cookies = new Cookies();
  const token = cookies.get('auth_token');

  useEffect(() => {
    dispatch(setToken(token));
    if (token) verifyUser({ token })
  }, [token])

  useEffect(() => {
    dispatch(setLoading(true));
    if (data?.status === "success") {
      dispatch(setUser(data.user));
    }
    dispatch(setLoading(false));
  }, [data])

  // auth/user
  // auth/user
  // auth/user


  return (
    <>
      <RouterProvider router={router} />
      <Toaster
        toastOptions={{
          className: '',
          style: {
            background: '#666666',
            color: 'white',
            borderRadius: '50px',
          },
          duration: 1000,
        }}
      />
    </>
  )
}

export default App
