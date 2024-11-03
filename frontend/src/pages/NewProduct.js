import React, { useState } from 'react'
import { BsCloudUpload } from "react-icons/bs";
import { imageToBase64 } from '../utility/imageToBase64';
import toast from 'react-hot-toast';

const NewProduct = () => {

    const [data, setData] = useState({
        name: "",
        category: "",
        image: "",
        price: "",
        description: "",
    });

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const uploadImage = async (e) => {
        const data = await imageToBase64(e.target.files[0]);
        // console.log(data);
        setData((prev) => {
            return {
                ...prev,
                image: data,
            }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(data);
        const { name, image, category, price } = data;
        if (name && image && category && price) {


            const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/uploadProduct`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data),
            });

            const res = await fetchData.json();
            console.log(res);
            toast(res.message);
            setData(() => {
                return {
                    name: "",
                    category: "",
                    image: "",
                    price: "",
                    description: "",
                }
            })
        } else {
            toast("Enter required fields");
        }
    }

    return (
        <div className='p-4'>
            <form className='m-auto w-full max-w-md shadow flex flex-col p-3 bg-white' onSubmit={handleSubmit}>
                <label htmlFor='name'>Name</label>
                <input type='text' name='name' className='bg-slate-200 p-1 my-1' onChange={handleOnChange} value={data.name} />

                <label htmlFor='category'>Category</label>
                <select id='category' name='category' className='bg-slate-200 p-1 my-1' onChange={handleOnChange} value={data.category}>
                    <option value="other">Select Category</option>
                    <option value="fruit">Fruits</option>
                    <option value="vegetable">Vegetables</option>
                    <option value="ice-cream">Ice-cream</option>
                    <option value="dosa">Dosa</option>
                    <option value="pizza">Pizza</option>
                    <option value="rice">Rice</option>
                    <option value="cake">Cake</option>
                    <option value="burger">Burger</option>
                    <option value="paneer">Paneer</option>
                    <option value="sandwich">Sandwich</option>
                    <option value="chicken">Chicken</option>
                </select>

                <label htmlFor='image'>Image
                    <div className='h-40 w-full bg-slate-200 rounded flex items-center justify-center cursor-pointer'>
                        {
                            data.image ? <img src={data.image} className='h-full' alt={data.name} /> : <span className='text-5xl'><BsCloudUpload /></span>
                        }
                        <input type='file' accept='image/*' id='image' onChange={uploadImage} className='hidden' />
                    </div>
                </label>

                <label htmlFor='price' className='my-1'>Price</label>
                <input type='number' name='price' className='bg-slate-200 p-1 my-1' onChange={handleOnChange} value={data.price} />

                <label htmlFor='description'>Description</label>
                <textarea rows={2} name='description' className='bg-slate-200 p-1 my-1 resize-none' onChange={handleOnChange} value={data.description}></textarea>

                <button className='bg-red-500 hover:bg-red-600 text-white text-lg font-md my-2 drop-shadow'>Save</button>
            </form>
        </div>
    )
}

export default NewProduct
