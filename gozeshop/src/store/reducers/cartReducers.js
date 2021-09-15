import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../../constants/cartConstants";

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;

      const existItem = state.cartItems.find((x) => x.product === item.product);

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((cartItem) =>
            cartItem.product === item.product ? item : cartItem
          ),
        };
      }
      if (!existItem) {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
      break;

    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (cartItem) => cartItem.product !== action.payload
        ),
      };

    default:
      return state;
  }
};
