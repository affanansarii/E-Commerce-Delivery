import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
    productList: [],
    cartItem: [],
};

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setData: (state, action) => {
            state.productList = [...action.payload]
        },
        addCartItems: (state, action) => {
            const check = state.cartItem.some(el => el._id === action.payload._id);
            if (check) {
                toast("Item is already in the Cart");
            } else {
                toast("Successfully Added into Cart");
                const total = action.payload.price;
                state.cartItem = [...state.cartItem, { ...action.payload, qty: 1, total }];
            }
        },
        deleteCartItems: (state, action) => {
            toast("Item is deleted");
            const index = state.cartItem.findIndex((el) => el._id === action.payload);
            state.cartItem.splice(index, 1);
        },
        increaseQty: (state, action) => {
            const index = state.cartItem.findIndex((el) => el._id === action.payload);
            let qty = state.cartItem[index].qty;
            const qtyInc = ++qty;
            state.cartItem[index].qty = qtyInc;

            const price = state.cartItem[index].price;
            const total = price * qtyInc;

            state.cartItem[index].total = total;
        },
        decreaseQty: (state, action) => {
            const index = state.cartItem.findIndex((el) => el._id === action.payload);
            let qty = state.cartItem[index].qty;
            if (qty > 1) {
                const qtyDec = --qty
                state.cartItem[index].qty = qtyDec;

                const price = state.cartItem[index].price;
                const total = price * qtyDec;

                state.cartItem[index].total = total;
            }
        }
    }
})

export const { setData, addCartItems, deleteCartItems, increaseQty, decreaseQty } = productSlice.actions;
export default productSlice.reducer;