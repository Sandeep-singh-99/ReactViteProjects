import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import ProductSlice from "./ProductSlice";

const store = configureStore({
    reducer: {
        cart: cartSlice,
        product: ProductSlice,
    }
});

export default store;