import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import AllProducts from '../components/AllProducts';
import { addCartItems } from '../Redux/productSlice';

const Menu = () => {

    const { filterby } = useParams();
    const navigate = useNavigate();
    const productData = useSelector(state => state.product.productList);

    const productDisplay = productData.filter(el => el._id === filterby)[0];
    console.log(productDisplay);

    const dispatch = useDispatch();
    const handleAddtoCart = (e) => {
        dispatch(addCartItems(productDisplay));
    }

    const handleBuy = () => {
        dispatch(addCartItems(productDisplay));
        navigate('/cart');
    }

    return (
        <div className='p-2 md:p-4'>
            <div className='w-full max-w-4xl m-auto md:flex bg-white'>
                <div className='max-w-md overflow-hidden w-full p-5'>
                    <img src={productDisplay.image} className='hover:scale-105 transition-all h-full' alt={productDisplay.name} />
                </div>

                <div className='flex flex-col gap-1'>
                    <h3 className='font-semibold text-slate-600 capitalize text-2xl md:text-4xl'>{productDisplay.name}</h3>
                    <p className='text-slate-500 font-medium text-2xl'>{productDisplay.category}</p>
                    <p className='font-bold md:text-2xl'><span className='text-red-500'>₹</span><span>{productDisplay.price}</span></p>

                    <div className='flex gap-3'>
                        <button className='bg-yellow-500 py-1 my-2 rounded hover:bg-yellow-600 min-w-[100px]' onClick={handleBuy}>Buy Now</button>
                        <button className='bg-yellow-500 py-1 my-2 rounded hover:bg-yellow-600 min-w-[100px]' onClick={handleAddtoCart}>Add to Cart</button>
                    </div>
                    <div>
                        <p className='text-slate-600 font-medium'>Description: </p>
                        <p>{productDisplay.description}</p>
                    </div>
                </div>
            </div>

            <AllProducts heading={"Related Products"} />
        </div>
    )
}

export default Menu