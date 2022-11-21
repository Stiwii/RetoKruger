import { createSlice } from "@reduxjs/toolkit";

const comprobadorSlide = createSlice({
    name:'comprobador',
    initialState: false,
    reducers:{
        setComprobador: (state,action)=> action.payload
    }
})
export const {setComprobador} = comprobadorSlide.actions 
export default comprobadorSlide.reducer