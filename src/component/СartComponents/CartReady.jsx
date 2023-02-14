export const CartReady = ({ onToggleCart, orderReady }) => {
   return (
      <div className="cart__empty">
         <img width={83} height={120} src="img/complete-order.jpg" alt="" />
         <h4>Замовлення оформлене</h4>
         <p>Ваше замовлення скоро передадуть в службу доставки</p>
         <button onClick={() => {
            onToggleCart();
            orderReady();
         }} className="green__button">
            <img src="img/arrow.svg" alt="" />
            Повернутись назад
         </button>
      </div>
   )
}

