import { create } from "zustand";

const useCartStore = create((set) => ({
  cartItems: JSON.parse(sessionStorage.getItem("cartItems")) || [],
  itemsCount: JSON.parse(sessionStorage.getItem("cartItems"))?.length || 0,

  addToCart: (product) =>
    set((state) => {


      const updatedCart = [...state.cartItems, product];
      sessionStorage.setItem("cartItems", JSON.stringify(updatedCart));
      const updatedItemCount = updatedCart.length;
      sessionStorage.setItem("itemCount", JSON.stringify(updatedItemCount));
      set({ itemsCount: updatedItemCount });
      return { cartItems: updatedCart };
    }),
}));

export default useCartStore;