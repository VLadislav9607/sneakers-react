import Card from "../Card/Card";
import { Link } from "react-router-dom";
import { Sneaker } from "../../types/types";

interface OrdersProps {
   orders: Sneaker[]
}

const Orders: React.FC<OrdersProps> = ({ orders }) => {
   return (
      <>
         {
            orders.length ?
               <>
                  <div className="favorites__top" >
                     <img src="img/arrow.svg" alt="arrow" />
                     <h2>Мої покупки</h2>
                  </div >
                  <div className="favorites__products">
                     {orders.map(item => {
                        return <Card
                           key={item.id}
                           product={item}
                           showFavorite={false}
                           showCheck={false}
                        />
                     })}
                  </div>
               </>
               :
               < div className="page__wrapper" >
                  <div className="page__empty">
                     <img src="img/smail__orders.png" alt="smail" />
                     <h3>У вас немає покупок</h3>
                     <p>Оформіть хоча б одне замовлення</p>
                     <Link to="/" className="green__button">
                        <img src="img/arrow.svg" alt="" />
                        Назад
                     </Link>
                  </div>
               </ div>
         }
      </>
   )

}

export default Orders;
