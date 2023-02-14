import Card from "../Card/Card";
import { Link } from "react-router-dom";

const Favorites = ({ favoriteProducts }) => {

   return (
      <>
         {
            favoriteProducts.length ?
               <>
                  <div className="favorites__top" >
                     <img src="img/arrow.svg" alt="" />
                     <h2>Мої закладки</h2>
                  </div >
                  <div className="favorites__products">
                     {favoriteProducts.map(item => {
                        return <Card
                           key={item.name}
                           product={item}
                           showFavorite={true}
                           showCheck={true}
                        />
                     })}
                  </div>
               </>
               :
               < div className="page__wrapper" >
                  <div className="page__empty">
                     <img src="img/smail__favorites.png" alt="" />
                     <h3>Закладок немає :(</h3>
                     <p>Ви нічього не добавляли в закладки</p>
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

export default Favorites;