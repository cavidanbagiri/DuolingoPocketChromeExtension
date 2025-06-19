import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";

import CircularProgress from "@mui/material/CircularProgress";

import MessageBox from "../layouts/MessageBox";

import { setIsLoginErrorFalse } from "../store/auth-store";

import AuthService from "../service/auth-service";

import { FaArrowLeft } from "react-icons/fa6";

function Register(props) {
    const dispatch = useDispatch();

    const { login_pending, is_login_error, login_message } = useSelector(
        (state) => state.authSlice
    );

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm_password, setConfirmPassword] = useState("");

    const [password_error, setPasswordError] = useState(false);
    const [confirm_password_error, setConfirmPasswordError] = useState(false);
    const [email_error, setEmailError] = useState(false);


    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (password.length < 8) {
            setPasswordError(true);
            return;
        } else if (password !== confirm_password) {
            setConfirmPasswordError(true);
            return;
        } else {
            const emailPattern =
                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

            if (!emailPattern.test(email)) {
                setEmailError(true);
                return;
            } else {
                setEmailError(false);
            }

            setPasswordError(false);
            setConfirmPasswordError(false);

            if (password === confirm_password && password.length >= 8) {
                const register_data = {
                    email: email,
                    password: password,
                };
                dispatch(AuthService.register(register_data));
            }
        }
    };

    useEffect(() => {
        if (is_login_error) {
            setTimeout(() => {
                dispatch(setIsLoginErrorFalse());
            }, 2000);
        }
    }, [is_login_error]);

    return (
        <form onSubmit={handleSubmit} className="flex flex-col items-center p-2 w-84 justify-center">
            {is_login_error && (
                <MessageBox message={login_message} color={"bg-red-500"} />
            )}

            <div className="flex flex-row items-center justify-between px-2 rounded-t-lg w-full">
                <FaArrowLeft
                    onClick={() => props.setShowAuth(false)}
                    className="text-2xl cursor-pointer"
                />
                <div className="flex flex-row items-center w-full">
                    <h1 className="w-full text-center text-2xl font-bold text-blue-400">
                        Register
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
            <div className="w-full">
                <input
                    onChange={handleConfirmPasswordChange}
                    type="password"
                    placeholder="Confirm Password"
                    className="p-4 w-full rounded-lg border border-gray-200 outline-none mt-5"
                />
                <span className='text-sm text-right text-red-500 cursor-pointer mt-1'>{confirm_password_error ? 'Passwords do not match' : ''}</span>
            </div>

            {/* <div className="w-full">
                <button className="w-full py-2 px-4 font-bold text-white bg-blue-400 rounded-lg mt-5">
                    Register
                </button>
            </div>

            <div className="flex flex-row w-full mt-2 items-center justify-center">
                <span className="text-sm">Have an account? </span>
                <span
                    onClick={() => props.setShowRegister(false)}
                    className="ml-4 text-blue-500 cursor-pointer"
                >
                    Login
                </span>
            </div> */}

            <div className="w-full mt-2">
                {login_pending ? (
                    <div className="flex items-center justify-center w-full">
                        <CircularProgress size="3rem" />
                    </div>
                ) : (
                    <button
                        type="submit"
                        className="bg-blue-500 w-full text-white rounded-lg py-3 outline-none text-lg font-medium cursor-pointer hover:bg-blue-400 duration-200"
                    >
                        Register
                    </button>
                )}

                <div className="flex flex-row w-full mt-2 items-center justify-center">
                    <span className="text-sm">Have an account? </span>
                    <span
                        onClick={() => props.setShowRegister(false)}
                        className="ml-4 text-blue-500 cursor-pointer"
                    >
                        Login
                    </span>
                </div>
            </div>
        </form>
    );
}

export default Register;
