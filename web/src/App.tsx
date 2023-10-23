import Footer from "./components/Footer";
import Banner from "./components/Banner";
import { useState } from "react";
import ContactModal from "./components/ContactModal";
import CategorySection from "./components/CategorySection";
import StylesSection from "./components/StylesSection";
import ProductsSection from "./components/ProductsSection.";
import { Toaster } from "react-hot-toast";
import DataContextProvider from "./components/DataContext";

export interface Product {
  id: string;
  name: string;
  category: string;
  style: string;
  price: string;
  image: string;
  idCategory: string;
  idStyle: string;
}

export interface Category {
  id: string;
  name: string;
  image: string;
}

export interface Style {
  id: string;
  name: string;
  image: string;
}

export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  image: string;
}

export interface SocialMedia {
  name: string;
  address: string;
  whatsapp: string;
  instagram: string;
}

export default function App() {
  const [isVisible, setIsVisible] = useState(false);

  // disable background scroll when modal is active
  const setHidden = () => {
    if (document.body.style.overflow !== "hidden") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  };

  const openModal = () => {
    setIsVisible(true);
    setHidden();
  };

  // Function to close modal
  const closeModal = () => {
    setIsVisible(false);
    setHidden();
  };

  return (
    <DataContextProvider>
      <div
        className={`flex flex-col justify-center items-center px-4 sm:px-40 xl:px-48 2xl:px-64 mt-12`}
      >
        <header>
          <h1 className="text-left sm:text-center text-black font-bold text-2xl sm:text-5xl break-words max-w-4xl mb-8 sm:mb-12">
            Aqui você encontra o look perfeito para o seu verão!
          </h1>
        </header>
        <Banner />

        <CategorySection />

        <ProductsSection openModal={openModal} />

        <StylesSection />

        <Footer />
        {isVisible && <ContactModal onRequestClose={closeModal} />}
        <Toaster />
      </div>
    </DataContextProvider>
  );
}
