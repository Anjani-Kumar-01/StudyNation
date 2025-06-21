import { createSlice } from "@reduxjs/toolkit";
import {Toaster} from 'react-hot-toast';

const initialState = {
  TotalItems:localStorage.getItem('TotalItems')?JSON.parse(localStorage.getItem('TotalItems')):0,
}


const cartSlice = createSlice({
    name:"cart",
    initialState:initialState,
    reducers:{
       setTotalItems(state, value) {    
            state.TotalItems=value.payload;
        },
        //add to cart
        //remove from cart
        //clear cart
    }
})
export const { setTotalItems}=cartSlice.actions;
export default cartSlice.reducer;