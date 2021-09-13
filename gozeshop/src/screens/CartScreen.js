import React from "react";

const CartScreen = ({ match }) => {
  return <div>{match.params.id}</div>;
};

export default CartScreen;
