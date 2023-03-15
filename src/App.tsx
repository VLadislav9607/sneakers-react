import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';

import Header from './component/Header/Header';
import { Cart } from './component/СartComponents/Cart';
import Home from './component/pages/Home';
import Favorites from './component/pages/Favorites';
import MainContext from './context';
import Orders from './component/pages/Orders';

import './index.scss';
import { Sneaker } from './types/types.js';

function App() {
  const [products, setProducts] = useState<Sneaker[]>([])
  const [favoriteProducts, setFavoriteProducts] = useState<Sneaker[]>([]);
  const [cartProducts, setCartProducts] = useState<Sneaker[]>([]);
  const [orders, setOrders] = useState<Sneaker[]>([]);
  const [loadedProducts, setLoadedProducts] = useState(false)
  const [toggleCart, setToggleCart] = useState(false);

  useEffect(() => {
    (async function () {
      try {
        const productsResponse = await axios.get<Sneaker[]>('https://63d8f12f74f386d4efe13610.mockapi.io/products');
        const cartResponse = await axios.get<Sneaker[]>('https://63d8f12f74f386d4efe13610.mockapi.io/cart');

        setProducts(productsResponse.data);
        setCartProducts(cartResponse.data);
        setLoadedProducts(true);

      } catch (error) {
        alert('Помилка сервера');
        console.error(error)
      }
    })();
  }, [])

  const onAddProductInCart = async (obj: Sneaker) => {
    try {
      const { data } = await axios.post('https://63d8f12f74f386d4efe13610.mockapi.io/cart/', obj);
      setCartProducts(prev => [...prev, data]);
    } catch (error) {
      alert('Помилка при додаванні товару');
      console.error(error)
    }
  }

  const onAddFavorite = (obj: Sneaker) => {
    if (favoriteProducts.find(item => item.id === obj.id)) {
      setFavoriteProducts(prev => prev.filter(item => item.id !== obj.id));
    } else {
      setFavoriteProducts(prev => [...prev, obj]);
    }
  }

  const onRemoveProduct = (id: number) => {

    try {
      setCartProducts(prev => prev.filter(item => item.id !== id));
      axios.delete(`https://63d8f12f74f386d4efe13610.mockapi.io/cart/${id}`);
    } catch (error) {
      alert('Помилка при видаленні товару');
      console.error(error)
    }
  }

  const onToggleCart = () => {
    setToggleCart(!toggleCart);
  }

  return (
    <>
      <MainContext.Provider value={{
        products,
        favoriteProducts,
        cartProducts,
        onRemoveProduct,
        onAddFavorite,
        onAddProductInCart,
        setCartProducts,
        setOrders
      }}>
        <div className="wrapper">
          <Header
            onToggleCart={onToggleCart}
            favoriteProducts={favoriteProducts}
          />
          <Routes>
            <Route path='/' element={
              <Home
                products={products}
                loadedProducts={loadedProducts}

              />}
            />
            <Route path='/favorites' element={<Favorites favoriteProducts={favoriteProducts} />} />
            <Route path='/orders' element={<Orders orders={orders} />} />

          </Routes >
        </div>
        {<Cart
          toggleCart={toggleCart}
          onToggleCart={onToggleCart}
          cartProducts={cartProducts}
        />
        }
      </MainContext.Provider>
    </>
  );
}

export default App;
