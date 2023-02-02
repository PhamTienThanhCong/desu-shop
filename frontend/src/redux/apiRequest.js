import axios from "axios";
import {
    loginFailed,
    loginStart,
    loginSuccess,
    logoutStart,
    logoutSuccess,
    logoutFailed,
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
        alert("Invalid username or password")
        dispatch(loginFailed());
    }
}
export const registerUser = async (user, dispatch, navigate) => {
    dispatch(loginStart());
    try {
        const res = await axios.post("http://localhost:8000/v1/auth/register", user);
        return res.data;
        // navigate("/login");
    } catch (err) {
        dispatch(loginFailed());
        return err.response.data;
    }
}

export const logoutUser = async (dispatch, navigate) => {
    dispatch(logoutStart());
    try {
        dispatch(logoutSuccess());
        dispatch(clearProduct());
        navigate("/login");
    } catch (err) {
        dispatch(logoutFailed());
    }
}

export const addProductToCart = async (props) => {
    const res = await axios.post(`http://localhost:8000/v1/cart/${props.userId}/${props.productId}`, {quantity:props.quantity});
    // props.dispatch(addProduct(res.data));
}
export const removeProductFromCart = async (productId, user, dispatch) => {
    const res = await axios.delete(`http://localhost:8000/v1/cart/${user}/${productId}`);
    dispatch(removeProduct(productId));
}

export const clearCart = async ( user, dispatch) => {
    //clear cart in redux
    const res = await axios.delete(`http://localhost:8000/v1/cart/${user}`);
    dispatch(clearProduct());
}

export const removeProductOfCart = async (product, dispatch) => {
    //remove product from cart in redux
    dispatch(removeProduct(product));
}