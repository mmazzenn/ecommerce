import axios from "axios";
import { createContext } from "react";

export const WishlistContext = createContext();

export default function WishlistContextProvider({ children }) {
  const api = "https://ecommerce.routemisr.com/api/v1/wishlist";
  async function addWishlist(productId) {
    const token = localStorage.getItem("userToken");
    try {
      const data = await axios.post(
        api,
        {
          productId,
        },
        {
          headers: { token },
        }
      );
      return data;
    } catch (error) {
      return error;
    }
  }
  async function removeWishlist(productId) {
    const token = localStorage.getItem("userToken");
    try {
      const data = await axios.delete(`${api}/${productId}`, {
        headers: { token },
      });
      return data;
    } catch (error) {
      return error;
    }
  }

  async function getWishlist() {
    const token = localStorage.getItem("userToken");
    try {
      const data = await axios.get(api, {
        headers: { token },
      });
      return data;
    } catch (error) {
      return error;
    }
  }
  return (
    <WishlistContext.Provider
      value={{ addWishlist, getWishlist, removeWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
