import { configureStore } from "@reduxjs/toolkit";
import roles from './slices/roles.slice'
import comprobador from './slices/comprobador.slice'


export default configureStore({
    reducer:{
        roles,
        comprobador,

    }
})