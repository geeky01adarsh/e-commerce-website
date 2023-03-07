// import { useSelector } from "react-redux";
// export const cartItems = useSelector((state) => state.cart?.value);

export const getItemCount=(cartItems) => {
    return cartItems.reduce((count, cartItem) => cartItem.quantity+count, 0)
}


export const getSubtotal = (cartItems) => {
    return cartItems.reduce((sum, { product, quantity }) => 
    product.price*quantity+sum , 0)
}