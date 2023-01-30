import axios from "axios";
import {
    loginFailed,
    loginStart,
    loginSuccess,
    logoutStart,
  } from "./authSlice"
import {
    addProduct,
    removeProduct,
    clearProduct,

} from "./cartRedux"



export const loginUser = async (user, dispatch, navigate) => {

    dispatch(loginStart());
    try {
        const res = await axios.post("http://localhost:8000/v1/auth/login", user);
        dispatch(loginSuccess(res.data));
        navigate("/");
    } catch (err) {
        dispatch(loginFailed());
    }
}
export const registerUser = async (user, dispatch, navigate) => {
    dispatch(loginStart());
    try {
        const res = await axios.post("http://localhost:8000/v1/auth/register", user);
        dispatch(loginSuccess(res.data));
        navigate("/login");
    } catch (err) {
        dispatch(loginFailed());
    }
}

export const logoutUser = async (dispatch, navigate) => {
    dispatch(logoutStart());
    try {
        await axios.get("http://localhost:8000/v1/auth/logout");
        dispatch(loginSuccess(null));
        navigate("/login");
    } catch (err) {
        dispatch(loginFailed());
    }
}

export const addProductToCart = async (props) => {
    // console.log(props.userId, props.productId);
    // const res = await axios.post(`http://localhost:8000/v1/cart/${props.userId}/${props.productId}`, {quantity:props.quantity});
    // props.dispatch(addProduct(res.data));
    //add product to cart
    const res = await axios.post(`http://localhost:8000/v1/cart/${props.userId}/${props.productId}`, {quantity:props.quantity});
    props.dispatch(addProduct(res.data));



}
export const removeProductFromCart = async (product, user, dispatch) => {
    const res = await axios.delete(`http://localhost:8000/v1/cart/${user.id}/${product.id}`);
    dispatch(removeProduct(res.data));
}

export const clearCart = async ( dispatch) => {
    //clear cart in redux
    dispatch(clearProduct());
}

export const removeProductOfCart = async (product, dispatch) => {
    //remove product from cart in redux
    dispatch(removeProduct(product));
}