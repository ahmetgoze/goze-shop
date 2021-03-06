import axios from "axios";
import {
  CART_ADD_ITEM,
  CART_CLEAR_SHIPPING_ADDRESS,
  CART_REMOVE_ALL_ITEMS,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
} from "../../constants/cartConstants";

export const addToCart = (id, qty) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(`/api/products/${id}`);
    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        product: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        qty,
      },
    });
    const { cart } = getState();
    localStorage.setItem("cartItems", JSON.stringify(cart.cartItems));
  } catch (error) {}
};

export const removeFromCart = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CART_REMOVE_ITEM,
      payload: id,
    });
    const { cart } = getState();
    localStorage.setItem("cartItems", JSON.stringify(cart.cartItems));
  } catch (error) {}
};

export const removeAllFromCart = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: CART_REMOVE_ALL_ITEMS,
    });
    localStorage.removeItem("cartItems");
  } catch (error) {}
};

export const saveShippingAddress = (data) => async (dispatch) => {
  try {
    dispatch({
      type: CART_SAVE_SHIPPING_ADDRESS,
      payload: data,
    });

    localStorage.setItem("shippingAddress", JSON.stringify(data));
  } catch (error) {}
};

export const clearShippingAddress = () => async (dispatch) => {
  try {
    dispatch({
      type: CART_CLEAR_SHIPPING_ADDRESS,
    });

    localStorage.removeItem("shippingAddress");
  } catch (error) {}
};

export const savePaymentMethod = (data) => async (dispatch) => {
  try {
    dispatch({
      type: CART_SAVE_PAYMENT_METHOD,
      payload: data,
    });

    localStorage.setItem("paymentMethod", JSON.stringify(data));
  } catch (error) {}
};
