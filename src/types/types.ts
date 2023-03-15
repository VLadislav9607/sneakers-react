export type Sneaker = {
  name: string, 
  price: number, 
  img: string, 
  id: number
}

export type IMainContext = {
  products: Sneaker[],
  favoriteProducts: Sneaker[],
  cartProducts: Sneaker[],
  setCartProducts: (arr: Sneaker[]) => void,
  onRemoveProduct: (id: number) => void,
  onAddFavorite: (obj: Sneaker) => void,
  onAddProductInCart: (obj: Sneaker) => void,
  setOrders: (arr: any) => void
}
