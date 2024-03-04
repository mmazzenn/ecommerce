import axios from "axios";
import { createContext, useState } from "react";

export const CartContext = createContext();

export default function CartContextProvider({ children }) {
  const api = "https://ecommerce.routemisr.com/api/v1/cart";
  const token = localStorage.getItem("userToken");
  const [cartItemsNumber, setCartItemsNumber] = useState(null);
  const [cartId, setCartId] = useState(null);
  const [isCleared, setIsCleared] = useState(false);
  async function addToCart(productId) {
    try {
      const { data } = await axios.post(
        api,
        { productId },
        {
          headers: { token },
        }
      );
      data.numOfCartItems !== 0
        ? setCartItemsNumber(data.numOfCartItems)
        : setCartItemsNumber(null);
      setIsCleared(false);
      return data;
    } catch (error) {
      return error;
    }
  }

  async function removeFromCart(id) {
    try {
      const { data } = await axios.delete(`${api}/${id}`, {
        headers: { token },
      });
      data.numOfCartItems !== 0
        ? setCartItemsNumber(data.numOfCartItems)
        : setCartItemsNumber(null);
      return data;
    } catch (error) {
      return error;
    }
  }

  async function clearCart() {
    try {
      const { data } = await axios.delete(api, {
        headers: { token },
      });
      setCartItemsNumber(null);
      setIsCleared(true);
      return data;
    } catch (error) {
      return error;
    }
  }

  async function updateProductQty(id, count) {
    try {
      const { data } = await axios.put(
        `${api}/${id}`,
        {
          count,
        },
        {
          headers: { token },
        }
      );
      data.numOfCartItems !== 0
        ? setCartItemsNumber(data.numOfCartItems)
        : setCartItemsNumber(null);
      return data;
    } catch (error) {
      return error;
    }
  }

  async function getCart() {
    if (!isCleared) {
      const token = localStorage.getItem("userToken");
      try {
        const { data } = await axios.get(api, {
          headers: { token },
        });
        data.numOfCartItems !== 0
          ? setCartItemsNumber(data.numOfCartItems)
          : setCartItemsNumber(null);
        setCartId(data.data._id);
        return data;
      } catch (error) {
        setIsCleared(true);
        return error;
      }
    }
  }

  return (
    <CartContext.Provider
      value={{
        addToCart,
        cartItemsNumber,
        getCart,
        removeFromCart,
        clearCart,
        updateProductQty,
        cartId,
        setCartItemsNumber
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
