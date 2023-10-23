import { BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";
import Carousel from "./Carousel";
import ProductCard from "./ProductCard";
import Section from "./Section";
import { useMyContext } from "./DataContext";

interface ProductsSectionProps {
  openModal: () => void;
}

export default function ProductsSection({ openModal }: ProductsSectionProps) {
  const { products, loading } = useMyContext();

  return loading ? (
    <Section section="popular">
      <div className="flex items-center text-center justify-between sm:justify-start sm:gap-8 mb-5 animate-pulse">
        <h2 className="text-2xl font-semibold text-black bg-gray-300 w-52 h-6 rounded-xl"></h2>
        <Link
          to="/products"
          className="flex items-center gap-2 text-pink-700 hover:underline group "
        >
          <span className="flex w-32 h-4 rounded-xl bg-gray-300"></span>
        </Link>
      </div>
      <Carousel options={{ align: "center" }}>
        {products?.slice(0, 4).map((product, i) => (
          <div key={i}>
            <ProductCard loading {...product} openModal={openModal} />
          </div>
        ))}
      </Carousel>
    </Section>
  ) : (
    <Section section="popular">
      <div className="flex items-center text-center justify-between sm:justify-start sm:gap-8 mb-5">
        <h2 className="text-2xl font-semibold text-black">Popular</h2>
        <Link
          to="/products"
          className="flex items-center gap-2 text-pink-700 hover:underline group"
        >
          Ver tudo{" "}
          <span className="group-hover:translate-x-1 transition-all">
            <BsArrowRight />
          </span>
        </Link>
      </div>
      <Carousel options={{ align: "center" }}>
        {products?.slice(0, 4).map((product, i) => (
          <div key={i} className="">
            <ProductCard {...product} openModal={openModal} />
          </div>
        ))}
      </Carousel>
    </Section>
  );
}
