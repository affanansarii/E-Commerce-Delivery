import React, { useState } from 'react'
import loginsignupimg from "../assest/login-animation.gif"
import { BiShow, BiHide } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';
import { imageToBase64 } from '../utility/imageToBase64';
import { toast } from 'react-hot-toast'

const Signup = () => {

    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        image: "",
    })
    console.log('data', data);

    const handleShowPassword = () => {
        setShowPassword(prev => !prev);
    }

    const handleShowConfirmPassword = () => {
        setShowConfirmPassword(prev => !prev);
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

    console.log(process.env.REACT_APP_SERVER_DOMAIN);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { firstName, email, password, confirmPassword } = data;

        if (firstName && email && password && confirmPassword) {
            if (password === confirmPassword) {
                const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/signup`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data)
                })

                const newData = await fetchData.json();
                console.log(newData);

                // alert(newData.message);

                toast(newData.message)
                if (newData.alert) {
                    navigate('/login');
                }
            } else {
                alert("your password and confirm password doesn't match");
            }
        } else {
            alert('please enter require fields');
        }
    }

    const handleUploadProfile = async (e) => {

        const data = await imageToBase64(e.target.files[0])
        console.log(data);

        setData((prev) => {
            return { ...prev, image: data }
        })

    }

    return (
        <div className='p-3 md:p-4'>
            <div className='w-full max-w-sm bg-white m-auto flex flex-col p-4'>
                {/* <h1 className='text-center text-2xl font-bold'>Signup</h1> */}
                <div className='w-20 h-20 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto relative'>
                    <img src={data.image ? data.image : loginsignupimg} className='w-full h-full' alt={data.firstName} />

                    <label htmlFor='profileImage'>
                        <div className='absolute bottom-0 h-1/3 bg-slate-500 bg-opacity-50 w-full text-center cursor-pointer'>
                            <p className='text-sm p-1 text-white'>Upload</p>
                        </div>

                        <input type='file' id='profileImage' accept='image/' className='hidden' onChange={handleUploadProfile} />
                    </label>
                </div>

                <form className='w-full py-3' onSubmit={handleSubmit}>
                    <label htmlFor='firstName'>First Name</label>
                    <input type='text' id='firstName' name='firstName' className='mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300' value={data.firstName} onChange={handleOnChange} required />

                    <label htmlFor='lastName'>Last Name</label>
                    <input type='text' id='lastName' name='lastName' className='mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300' value={data.lastName} onChange={handleOnChange} required />

                    <label htmlFor='email'>Email</label>
                    <input type='email' id='email' name='email' className='mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300' value={data.email} onChange={handleOnChange} required />

                    <label htmlFor='password'>Password</label>
                    <div className='flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2 outline-none focus-within:outline-blue-300'>
                        <input type={showPassword ? 'text' : 'password'} id='password' name='password' className='w-full bg-slate-200 border-none outline-none' value={data.password} onChange={handleOnChange} required />
                        <span className='flex text-xl cursor-pointer' onClick={handleShowPassword}>{showPassword ? <BiShow /> : <BiHide />}</span>
                    </div>

                    <label htmlFor='confirmPassword'>Confirm Password</label>
                    <div className='flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2 outline-none focus-within:outline-blue-300'>
                        <input type={showConfirmPassword ? 'text' : 'password'} id='confirmPassword' name='confirmPassword' className='w-full bg-slate-200 border-none outline-none' value={data.confirmPassword} onChange={handleOnChange} required />
                        <span className='flex text-xl cursor-pointer' onClick={handleShowConfirmPassword}>{showConfirmPassword ? <BiShow /> : <BiHide />}</span>
                    </div>

                    <button className='maax-w-[120px] w-full bg-red-500 hover:bg-red-600 cursor-pointer text-white text-xl font-medium text-center py-1 rounded-full mt-4'>Sign Up</button>
                </form>

                <p className='text-left text-sm mt-2'>Already have an account? <Link to={"/login"} className='text-red-500 underline'>Login</Link></p>
            </div>
        </div>
    )
}

export default Signup
