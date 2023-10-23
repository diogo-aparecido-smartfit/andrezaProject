/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext, useEffect, useState } from "react";
import { Product, Category, Style, Banner, SocialMedia } from "../App";
import api from "../services/api";
import toast from "react-hot-toast";

interface MyContextType {
  products: Product[];
  categories: Category[];
  styles: Style[];
  banner: Banner[];
  socialMedia: SocialMedia[];
  loading: boolean;
}

const DataContext = createContext<MyContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useMyContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useMyContext must be used within a MyContextProvider");
  }
  return context;
};

interface DataContextProviderProps {
  children: React.ReactNode;
}

export default function DataContextProvider({
  children,
}: DataContextProviderProps) {
  const [products, setProducts] = useState<Product[] | any>();
  const [categories, setCategories] = useState<Category[] | any>();
  const [styles, setStyles] = useState<Style[] | any>();
  const [banner, setBanner] = useState<Banner[] | any>();
  const [socialMedia, setSocialMedia] = useState<SocialMedia[] | any>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          productsResponse,
          categoriesResponse,
          stylesResponse,
          bannerResponse,
          socialMediaResponse,
        ] = await Promise.all([
          api.get("/products"),
          api.get("/categories"),
          api.get("/styles"),
          api.get("/banner"),
          api.get("/media"),
        ]);

        setProducts(productsResponse.data);
        setCategories(categoriesResponse.data);
        setStyles(stylesResponse.data);
        setBanner(bannerResponse.data);
        setSocialMedia(socialMediaResponse.data);

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
    <DataContext.Provider
      value={{ products, categories, styles, banner, loading, socialMedia }}
    >
      {children}
    </DataContext.Provider>
  );
}
