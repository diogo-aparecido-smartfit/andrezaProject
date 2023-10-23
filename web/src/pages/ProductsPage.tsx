import { useEffect, useState } from "react";
import { Product } from "../App";
import CategoryHeader from "../components/CategoryHeader";
import ProductCard from "../components/ProductCard";
import ContactModal from "../components/ContactModal";
import toast from "react-hot-toast";
import api from "../services/api";

export default function ProductsPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [products, setProducts] = useState<Product[]>();
  const [loading, setLoading] = useState(true);

  // disable background scroll when modal is active
  const setHidden = () => {
    if (document.body.style.overflow !== "hidden") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  };

  useEffect(() => {
    try {
      api
        .get("/products")
        .then((response) => {
          setProducts(response.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("ops! ocorreu um erro" + err);
          setLoading(false);
        });
    } catch {
      const notify = () => toast.error("Erro ao carregar elementos.");
      notify();
    }
  }, []);

  const openModal = () => {
    setIsVisible(true);
    setHidden();
  };

  const closeModal = () => {
    setIsVisible(false);
    setHidden();
  };

  return (
    <div className="flex flex-col p-4 sm:px-32">
      <CategoryHeader imageUrl="https://source.unsplash.com/random">
        Nome do estilo
      </CategoryHeader>

      <div className="flex">
        <ul className="flex flex-wrap justify-center gap-4 mt-8 sm:mt-12">
          {loading ? (
            <h1>Carregando</h1>
          ) : products ? (
            products.map((item, i) => (
              <li key={i}>
                <ProductCard openModal={openModal} {...item} />
              </li>
            ))
          ) : null}
        </ul>
      </div>
      {isVisible && <ContactModal onRequestClose={closeModal} />}
    </div>
  );
}
