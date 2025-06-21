import  {combineReducers } from '@reduxjs/toolkit';
import authReducers from "../slices/authSlice";
import profileReducers from "../slices/profileSlice";
import cartReducers from "../slices/cartSlice";


const rootReducer = combineReducers({
      auth:authReducers,
      profile:profileReducers,
      cart:cartReducers,
    });

    export default rootReducer;