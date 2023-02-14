import MainContext from "../context";
import { useContext } from "react";

export const useCart = () => {


   const { cartProducts, setCartProducts, onRemoveProduct, setOrders } = useContext(MainContext)

   let totalPrice = cartProducts ? cartProducts.reduce((acc, cur) => acc + Number(cur.price), 0) : 0;

   return { totalPrice, cartProducts, onRemoveProduct, setCartProducts, setOrders }

}
