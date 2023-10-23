import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api";
import toast from "react-hot-toast";

const AppContext = createContext({
  products: [],
  categories: [],
  styles: [],
  banner: [],
  loading: true,
});

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => useContext(AppContext);

interface AppContextProviderProps {
  children: React.ReactNode;
}

export function AppContextProvider({ children }: AppContextProviderProps) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [styles, setStyles] = useState([]);
  const [banner, setBanner] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          productsResponse,
          categoriesResponse,
          stylesResponse,
          bannerResponse,
        ] = await Promise.all([
          api.get("/products"),
          api.get("/categories"),
          api.get("/styles"),
          api.get("/banner"),
        ]);

        setProducts(productsResponse.data);
        setCategories(categoriesResponse.data);
        setStyles(stylesResponse.data);
        setBanner(bannerResponse.data);

        setLoading(false);
      } catch (error) {
        console.error("Erro ao carregar elementos: ", error);
        setLoading(false);
        const notify = () => toast.error("Erro ao carregar elementos.");
        notify();
      }
    };

    fetchData();
  }, []);

  return (
    <AppContext.Provider
      value={{ products, categories, styles, banner, loading }}
    >
      {children}
    </AppContext.Provider>
  );
}
