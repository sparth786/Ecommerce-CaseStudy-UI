import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const BaseURL = process.env.REACT_APP_API;

export const addCarts = createAsyncThunk(
    'addcart/addCart',
    (cartDetails) => {
        const response = fetch(`${BaseURL}/cart/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(cartDetails),
        });

        if (!response.ok) {
            throw new Error('Failed to add cart');
        }

        return response.json();
    }
);


const postsSlice = createSlice({
    name: "addcart",
    initialState: {
        addCart: [],
        status: 'idle',
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(addCarts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addCarts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.addCart = action.payload;
            })
            .addCase(addCarts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export default postsSlice.reducer;
