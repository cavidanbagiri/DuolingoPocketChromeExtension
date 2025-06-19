

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';


import { FaArrowLeft } from "react-icons/fa6";


import CircularProgress from "@mui/material/CircularProgress";

import MessageBox from "../layouts/MessageBox";

import { setIsLoginErrorFalse } from "../store/auth-store";

import AuthService from "../service/auth-service";


function Login(props) {

    
  const dispatch = useDispatch();

  const { login_pending, is_login_error, login_message } = useSelector((state) => state.authSlice);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [password_error, setPasswordError] = useState(false);
  const [email_error, setEmailError] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password.length < 8) {
      setPasswordError(true);
      return;
    }
    else {

      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      if (!emailPattern.test(email)) {
        setEmailError(true);
        return;
      }
      else {
        setEmailError(false);
      }

      setPasswordError(false);

      if (password.length >= 8) {
        const login_data = {
          email: email,
          password: password,
        }
        dispatch(AuthService.login(login_data));
      }
    }

  }

  useEffect(() => {
    if (is_login_error) {
      setTimeout(() => {
        dispatch(setIsLoginErrorFalse());
      }, 2000);
    }
  }, [is_login_error]);



    return (
        <form onSubmit={handleSubmit} className="flex flex-col items-center p-2 w-84 justify-center">

            {
        is_login_error && <MessageBox message={login_message} color={'bg-red-500'} />
      }

            <div className="flex flex-row items-center justify-between px-2 rounded-t-lg w-full">
                <FaArrowLeft
                    onClick={() => props.setShowAuth(false)}
                    className="text-2xl cursor-pointer"
                />
                <div className="flex flex-row items-center w-full">
                    <h1 className="w-full text-center text-2xl font-bold text-blue-400">
                        Login
                    </h1>
                </div>
            </div>

            <div className="w-full">
                <input
                    onChange={handleEmailChange}
                    type="text"
                    placeholder="Email"
                    className="p-4 w-full rounded-lg border border-gray-200 outline-none mt-5"
                />
                <span className='text-sm text-right text-red-500 cursor-pointer mt-1'>{email_error ? 'Please enter a valid email' : ''}</span>
            </div>

            <div className="w-full">
                <input
                    onChange={handlePasswordChange}
                    type="password"
                    placeholder="Password"
                    className="p-4 w-full rounded-lg border border-gray-200 outline-none mt-5"
                />
                <span className='text-sm text-right text-red-500 cursor-pointer mt-1'>{password_error ? 'Password must be at least 8 characters' : ''}</span>
            </div>

             {
            login_pending ?
              <div className='flex items-center justify-center w-full mt-2'>
                <CircularProgress size="3rem" />
              </div>
              :
              <button type='submit'
                className='bg-blue-500 mt-2 w-full text-white rounded-lg py-3 outline-none text-lg font-medium cursor-pointer hover:bg-blue-400 duration-200'>Login</button>

          }

            <div className="flex flex-row w-full mt-2 items-center justify-center">
                <span className="text-sm">Don't have an account? </span>
                <span
                    onClick={() => props.setShowRegister(true)}
                    className="ml-4 text-blue-500 cursor-pointer"
                >
                    Sign up
                </span>
            </div>
        </form>
    );
}

export default Login;
