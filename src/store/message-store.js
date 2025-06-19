
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    toggle_message: false,
}

export const messageBoxSlice = createSlice({

    name: 'createTableSlice',
    initialState,
    reducers: {

        setShowErrorTrue: (state) => { 
            state.toggle_message = true;
        },

        setShowErrorFalse: (state) => {
            state.toggle_message = false;
        },

    },
    
});


export const {setShowErrorTrue, setShowErrorFalse}  = messageBoxSlice.actions;

export default messageBoxSlice.reducer;