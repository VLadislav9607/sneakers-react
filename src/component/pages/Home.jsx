import { useState } from "react";

import Card from "../Card/Card";
import Skeleton from "../skeleton/Skeleton";

const Home = ({ products, loadedProducts }) => {


   const [search, setSearch] = useState('');


   const RenderItems = () => {
      return products.filter(obj => obj.name.toLowerCase().includes(search.toLowerCase())).map(item => {
         return <Card
            key={item.name}
            product={item}
            favorited={true}
            showFavorite={true}                   
            showCheck={true}                  

         />
      })
   }

   const items = RenderItems();

   return (
      <main className="main">
         <div className="main__top">
            <h1>{search ? `Пошук за запитом: "${search}"` : 'Всі кросівки'}</h1>
            <div className="search__block">
               <input onChange={(e) => setSearch(e.target.value)} value={search} type="text" placeholder="Пошук..." />
               <img height={14} width={14} src="img/search.svg" alt="" />
            </div>
         </div>
         <div className="main__content">
            {loadedProducts ? items : <Skeleton />}
         </div>
      </main>
   )
}

export default Home;