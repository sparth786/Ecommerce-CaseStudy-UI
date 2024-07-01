import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const BaseURL = process.env.REACT_APP_API;

export const deleteCarts = createAsyncThunk(
    'deleteCarts/deleteCarts',
    async (id) => {
        try {
            const response = await fetch(`${BaseURL}/delete/cart/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (!response.ok) {
                throw new Error(`Failed to delete cart: ${response.statusText}`);
            }
            return await response.json();
        } catch (error) {
            return error.message;
        }
    }
);

const deleteSlice = createSlice({
    name: "deleteCarts",
    initialState: {
        deleteCart: [],
        status: 'idle',
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(deleteCarts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteCarts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.deleteCart = action.payload;
            })
            .addCase(deleteCarts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export default deleteSlice.reducer;
