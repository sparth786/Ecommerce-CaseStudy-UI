import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const BaseURL = process.env.REACT_APP_API;

export const fetchCarts = createAsyncThunk(
    'viewCart/fetchCarts',
    async () => {
        const response = await fetch(`${BaseURL}/cart`);
        return response.json();
    }
);


const postsSlice = createSlice({
    name: "viewCart",
    initialState: {
        carts: [],
        status: 'idle',
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCarts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCarts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.carts = action.payload;
            })
            .addCase(fetchCarts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export default postsSlice.reducer;
