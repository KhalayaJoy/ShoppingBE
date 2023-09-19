import { createContext, ReactNode, useContext, useState } from "react";
import { useLocalStorage } from "../hook/useLocalStorage";
import { ShoppingCart } from "../components/ShoppingCart";

type ShoppingCartProviderProps = {
  children: ReactNode;
};

type CartItem = {
  id:number; 
  quantity: number;
};

type StockAll = {
  id: number;
  productCode: string;
  productName: string;
  unitPrice: number;
  imgUrl: string;
  stock: number;
};

//สิ่งที่เราอยากให้ข้อมูลลงรถเข็น
type ShoppingCartContext = {
  openCart: () => void;
  closeCart: () => void;
  getItemQuantity: (id: number) => number;
  increaseCartQuantity: (id: number) => void;
  decreaseCartQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  cartQuantity: number;
  cartItems: CartItem[];
  setCasrtAll: (data: any) => void;
  setStockFirst: (data: any) => void;
  StockAll: StockAll[];
  getStockItem: (id: number) => number;
  LoadNewData: () => void;
  isNewData: boolean;
  SetNewData: () => void;
};

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}
export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [isNewData, setIsNewData] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
    "shopping-cart",
    []
  );
  const [StockAll, setStockAll] = useLocalStorage<StockAll[]>("stock-all", []);

  const setStockFirst = (data: any) => setStockAll(data);
  function getStockItem(id: number) {
    return (
      StockAll.find((item) => item.id === id)?.stock ||
      0
    );
  }

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );
  const setCasrtAll = (data: any) => setCartItems(data);
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  const LoadNewData = () => setIsNewData(true);
  const SetNewData = () => setIsNewData(false);

  function getItemQuantity(id: number) {
    return (
      cartItems.find((item) => item.id === id)?.quantity || 0
    );
  }
  function increaseCartQuantity(id: number) {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id) == null) {
        return [...currItems, { id, quantity: 1 }];
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
    setStockAll((StockItem) => {
      return StockItem.map((item) => {
        if (item.id === id) {
          return { ...item, stock: item.stock - 1 };
        } else {
          return item;
        }
      });
    });
  }
  function decreaseCartQuantity(id: number) {
    setCartItems((currItems) => {
      if (
        currItems.find((item) => item.id === id)?.quantity ===
        1
      ) {
        return currItems.filter((item) => item.id !== id);
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
    setStockAll((StockItem) => {
      return StockItem.map((item) => {
        if (item.id === id) {
          return { ...item, stock: item.stock + 1 };
        } else {
          return item;
        }
      });
    });
  }
  function removeFromCart(id:number) {
    const QuantityInCart = getItemQuantity(id);
    const StockItem = getStockItem(id);
    const StockAll = QuantityInCart + StockItem;
    setCartItems((currItems) => {
      return currItems.filter((item) => item.id !== id);
    });
    setStockAll((StockItem) => {
      return StockItem.map((item) => {
        if (item.id === id) {
          return { ...item, stock: StockAll };
        } else {
          return item;
        }
      });
    });
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        openCart,
        closeCart,
        cartItems,
        cartQuantity,
        setCasrtAll,
        setStockFirst,
        StockAll,
        getStockItem,
        LoadNewData,
        isNewData,
        SetNewData,
      }}
    >
      {children}
      <ShoppingCart isOpen={isOpen} />
    </ShoppingCartContext.Provider>
  );
}
