import React from 'react'
import { TbPlus, TbMinus } from 'react-icons/tb'
import { AiFillDelete } from 'react-icons/ai'
import { useDispatch } from 'react-redux'
import { deleteCartItems, increaseQty, decreaseQty } from '../Redux/productSlice'

const CartProduct = ({ id, name, image, category, price, qty, total }) => {

    const dispatch = useDispatch();

    return (
        <div className='bg-slate-200 p-2 flex gap-4 rounded border border-slate-300'>
            <div className='bg-white p-3 rounded overflow-hidden'>
                <img src={image} className='h-28 w-40 object-cover' alt={name} />
            </div>

            <div className='flex flex-col gap-1 w-full'>
                <div className='flex justify-between'>
                    <h3 className='font-semibold text-slate-600 capitalize text-lg md:text-xl'>{name}</h3>
                    <div className='cursor-pointer text-slate-700 hover:text-red-500 text-2xl' onClick={() => dispatch(deleteCartItems(id))}><AiFillDelete /></div>
                </div>
                <p className='text-slate-500 font-medium'>{category}</p>
                <p className='font-bold text-base'><span className='text-red-500'>₹</span><span>{price}</span></p>

                <div className='flex justify-between'>
                    <div className='flex gap-3 items-center'>
                        <button className='bg-slate-300 py-1 my-2 rounded hover:bg-slate-400 p-1' onClick={() => dispatch(decreaseQty(id))}><TbMinus /></button>
                        <p className='font-semibold'>{qty}</p>
                        <button className='bg-slate-300 py-1 my-2 rounded hover:bg-slate-400 p-1' onClick={() => dispatch(increaseQty(id))}><TbPlus /></button>
                    </div>
                    <div className='flex items-center gap-2 font-bold text-slate-700'>
                        <p>Total:-</p>
                        <p><span className='text-red-500'>₹</span>{total}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartProduct;