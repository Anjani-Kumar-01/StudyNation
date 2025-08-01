import {createSlice} from '@reduxjs/toolkit';
import { setLoading } from './authSlice';

const initialState = {
   User:null,
   setLoading:false,
}


const profileSlice= createSlice({
    name:"profile",
    initialState:initialState,
    reducers:{
        setUser(state, value) {    
            state.User=value.payload;
        },
            setLoading(state, value) {
      state.loading = value.payload;
    },
    }
})
export const {setUser,setLoading}=profileSlice.actions;
export default profileSlice.reducer;