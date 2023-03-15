import { useState } from 'react';
import { ProductsInCart } from './ProductsInCart';
import { CartReady } from './CartReady';
import './cart.scss';
import { Sneaker } from '../../types/types';

interface CartProps {
   onToggleCart: () => void,
   cartProducts: Sneaker[],
   toggleCart: boolean
}

export const Cart: React.FC<CartProps> = ({ onToggleCart, cartProducts, toggleCart }) => {
   const [createOrder, setCreateOrder] = useState(false);

   const orderReady = () => {
      setCreateOrder(!createOrder);
   }

   function renderProductsInCart() {
      return cartProducts.length !== 0
         ? <ProductsInCart
            orderReady={orderReady}
         />
         : <div className="cart__empty">
            <img width={120} height={120} className="cart__empty__img" src="img/empty-cart.jpg" alt="empty-cart-img" />
            <h4>Кошик порожній</h4>
            <p>Додайте хоча б один товар, щоб зробити замовлення</p>
            <button onClick={() => onToggleCart()} className="green__button">
               <img src="img/arrow.svg" alt="" />
               Вернутись назад
            </button>
         </div>
   }

   const items = renderProductsInCart();

   return (
      <div className={`cart__wrapper ${toggleCart && 'visible'}`}>
         <div className={`cart__wrapper__opacity ${toggleCart && 'cart__visible'}`}></div>
         <div className={`cart__block ${toggleCart && 'cart__active'}`}>
            <div className="cart__top">
               <h2>Кошик</h2>
               <button onClick={() => onToggleCart()} className="deleteProduct">
                  <img width={40} height={40} src="img/btn-remove.svg" alt="" />
               </button>
            </div>
            {createOrder ? <CartReady onToggleCart={onToggleCart} orderReady={orderReady} /> : items}
         </div>
      </div>
   )
}
