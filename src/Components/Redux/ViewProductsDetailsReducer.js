import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const BaseURL = process.env.REACT_APP_API;

export const viewProductDetails = createAsyncThunk(
    'viewProductDetails/fetchCarts',
    async (id) => {
        const response = await fetch(`${BaseURL}/product/${id}`);
        return response.json();
    }
);


const postsSlice = createSlice({
    name: "viewProductDetails",
    initialState: {
        productsDetails: [],
        status: 'idle',
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(viewProductDetails.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(viewProductDetails.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.productsDetails = action.payload;
            })
            .addCase(viewProductDetails.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export default postsSlice.reducer;
