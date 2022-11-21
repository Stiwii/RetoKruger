import { createSlice } from "@reduxjs/toolkit";

const rolesSlice = createSlice({
    name: 'roles',
    initialState: '',
    reducers:{
        setRolesGlobal: (state,action) => action.payload 
    }
})

export const {setRolesGlobal} = rolesSlice.actions
export default rolesSlice.reducer