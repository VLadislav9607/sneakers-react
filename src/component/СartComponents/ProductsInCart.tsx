import axios from "axios";
import { useCart } from '../../hooks/useCart';
import { Sneaker } from "../../types/types";

interface ProductsInCartReady {
   orderReady: () => void
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const ProductsInCart: React.FC<ProductsInCartReady> = ({ orderReady }) => {
   const { cartProducts, onRemoveProduct, setCartProducts, setOrders, totalPrice } = useCart()

   let totalTax = Math.round(Number(totalPrice) * 0.07);

   const onClickOrder = async () => {

      try {
         setOrders((prev: Sneaker[]) => [...prev, ...cartProducts])
         for (let i = 0; i < cartProducts.length; i++) {
            await axios.delete('https://63d8f12f74f386d4efe13610.mockapi.io/cart/' + cartProducts[i].id);
            await delay(100);
         }
         orderReady();
         setCartProducts([]);
      } catch (error) {
         alert('Помилка при створенні замовлення');
         console.error(error)
      }
   }

   return (
      <>
         <div className="product__list">
            {cartProducts?.map((product: Sneaker) => {
               return <div key={product.id} className="product">
                  <img className="product__img" src={product.img} alt="" />
                  <div className="product__info">
                     <h4 className="product__info__name">{product.name}</h4>
                     <h5 className="product__info__price">{product.price} грн</h5>
                  </div>
                  <button onClick={() => onRemoveProduct(product.id)} className="deleteProduct"><img src="img/btn-remove.svg" alt="" /></button>
               </div>
            })}
         </div>
         <div className="cart__product__bottom">
            <div className="cart__info">
               <h5>Податок 7%: </h5>
               <div></div>
               <p>{totalTax} грн</p>
            </div>
            <div className="cart__info">
               <h5>Всього: </h5>
               <div></div>
               <p>{totalPrice} грн</p>
            </div>
            <button onClick={() => onClickOrder()} className="green__button">
               <img src="img/arrow.svg" alt="create__order" />
               Оформити замовлення
            </button>
         </div>
      </>
   )
}
