import MainContext from "../context";
import { useContext } from "react";
import { IMainContext, Sneaker } from "../types/types";

export const useCart = () => {
   const { cartProducts, setCartProducts, onRemoveProduct, setOrders } = useContext(MainContext) as IMainContext
   let totalPrice = cartProducts ? cartProducts.reduce((acc: number, cur: Sneaker) => acc + Number(cur.price), 0) : 0;

   return { totalPrice, cartProducts, onRemoveProduct, setCartProducts, setOrders }
}
