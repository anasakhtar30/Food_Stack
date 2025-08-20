
import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItem, setCartItem] = useState({});//
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);

  const url = "https://food-app-clean.onrender.com";

  // Cart management
  const addToCart = async (itemId) => {
    if (!cartItem[itemId]) {
      setCartItem((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 })); 
    }
    if (token) {
      try {
        await axios.post(
          url + "/api/cart/add",
          { itemId },
          { headers: { token } }
        );
      } catch (error) {
        console.error("Error adding item to cart:", error);
      }
    }
  };

  const removeFromCart = async (itemId) => {
    if (cartItem[itemId] > 0) { // Ensure it doesn't go negative
      setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
      if (token) {
        try {
          await axios.post(
            url + "/api/cart/remove",
            { itemId },
            { headers: { token } }
          );
        } catch (error) {
          console.error("Error removing item from cart:", error);
        }
      }
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItem) {
      if (cartItem[item] > 0) {
        const itemInfo = food_list.find(
          (product) => product._id === String(item)
        );
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItem[item];
        }
      }
    }
    return totalAmount;
  };

  const fetchFoodList = async () => {
    try {
      const response = await axios.get(url + "/api/food/list");
      setFoodList(response.data.data);
    } catch (error) {
      console.error("Error fetching food list:", error);
    }
  };

  const loadCartData = async (token) => {
        const response = await axios.post(
          url + "/api/cart/get",{},{ headers: { token } }
        );
        setCartItem(response.data.cartData);
      };
    
      useEffect(() => {
        const loadData = async () => {
          await fetchFoodList();
          const storedToken = localStorage.getItem("token");
          if (storedToken) {
            setToken(storedToken);
            await loadCartData(localStorage.getItem("token"));
          }
        };
        loadData();
      }, []);

  const contextValue = { // To add the support of the context in our pojecy see main.jsx
    food_list,
    cartItem,
    setCartItem,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    token,
    setToken,
    url,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;

