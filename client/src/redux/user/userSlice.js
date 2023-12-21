import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    currentUser : null,
    error : null,
    loading : false,
};
console.log(initialState);

const userSlice = createSlice({
    name : 'user',
    initialState,
    reducers: {
        signInStart :( state ) =>{
            state.loading = true;
        },

        signInSuccess : (state, action ) =>{
            state.currentUser  = action.payload;
            state.loading = false;
            state.error = null;
        },

        signFailure : (state, action ) =>{
            console.log(action.payload)
            state.error = action.payload;
            state.loading = false;
        }
    }
});

export let { signInStart, signInSuccess, signFailure } = userSlice.actions;

export default userSlice.reducer;