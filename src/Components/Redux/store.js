import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./ProductReducer";
import viewcartReducer from "./ViewCartReducer";
import AddCartReducer from "./AddCartReducer";
import DeleteCartReducer from "./DeleteCartReducer";
import ViewProductsDetailsReducer from "./ViewProductsDetailsReducer";

const store = configureStore({
    reducer: {
        products: postReducer,
        viewCart: viewcartReducer,
        addcart: AddCartReducer,
        deleteCarts: DeleteCartReducer,
        viewProductDetails: ViewProductsDetailsReducer,
    }
});

export default store;