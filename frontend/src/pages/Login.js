import React, { useState } from 'react'
import loginsignupimg from "../assest/login-animation.gif"
import { BiShow, BiHide } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { loginRedux } from '../Redux/userSlice';

const Login = () => {

    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [data, setData] = useState({
        email: "",
        password: "",
    })

    const userData = useSelector((state) => state);

    const dispatch = useDispatch();

    const handleShowPassword = () => {
        setShowPassword(prev => !prev);
    }

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { email, password } = data;

        if (email && password) {
            const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            })

            const newData = await fetchData.json();
            console.log(newData);
            toast(newData.message);

            if (newData.alert) {
                dispatch(loginRedux(newData))
                setTimeout(() => {
                    navigate('/');
                }, 1000)
            }
            console.log(userData);

        } else {
            alert('please enter require fields');
        }
    }

    return (
        <div className='p-3 md:p-4'>
            <div className='w-full max-w-sm bg-white m-auto flex flex-col p-4'>
                {/* <h1 className='text-center text-2xl font-bold'>Signup</h1> */}
                <div className='w-20 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto'>
                    <img src={loginsignupimg} alt='' className='w-full' />
                </div>

                <form className='w-full py-3' onSubmit={handleSubmit}>

                    <label htmlFor='email'>Email</label>
                    <input type='email' id='email' name='email' className='mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300' value={data.email} onChange={handleOnChange} required />

                    <label htmlFor='password'>Password</label>
                    <div className='flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2 outline-none focus-within:outline-blue-300'>
                        <input type={showPassword ? 'text' : 'password'} id='password' name='password' className='w-full bg-slate-200 border-none outline-none' value={data.password} onChange={handleOnChange} required />
                        <span className='flex text-xl cursor-pointer' onClick={handleShowPassword}>{showPassword ? <BiShow /> : <BiHide />}</span>
                    </div>

                    <button className='maax-w-[120px] w-full bg-red-500 hover:bg-red-600 cursor-pointer text-white text-xl font-medium text-center py-1 rounded-full mt-4'>Login</button>
                </form>

                <p className='text-left text-sm mt-2'>Don't have an account? <Link to={"/signup"} className='text-red-500 underline'>Signup</Link></p>
            </div>
        </div>
    )
}

export default Login;
