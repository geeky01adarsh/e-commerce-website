import { createSlice } from "@reduxjs/toolkit"
const cartSlice = createSlice({
    name: "cart", 
    initialState: {
        value:[]
    }, 
    reducers: {
        addToCart(state, action) {
            // console.log(action)
            const { product, quantity } = action.payload;
            const existingProduct = state.value.find(({ product: prod }) => prod.id === product.id);
            if (existingProduct) {
                existingProduct.quantity += 1;
            }
            else
                state.value.push(action.payload);
        },


        removeFromCart(state, action){
            const { product, quantity = 1 } = action.payload;
            const existingProductIdx = state.value.findIndex(
              ({ product: prod }) => prod.id === product.id
            );
            
            if (existingProductIdx > -1) {
                const existingItem = state.value[existingProductIdx];
                if (existingItem.quantity === 1) {
                    state.value.splice(existingProductIdx, 1)
                }

                else {
                    existingItem.quantity -= 1;
                }
            }
        }
    }
})

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;