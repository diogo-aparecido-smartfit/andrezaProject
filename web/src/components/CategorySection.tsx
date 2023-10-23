import { Link } from "react-router-dom";
import Carousel from "./Carousel";
import CategoryCard from "./CategoryCard";
import Section from "./Section";
import { useMyContext } from "./DataContext";

export default function CategorySection() {
  const { loading, categories } = useMyContext();

  return loading ? (
    <Section section="categories">
      <div className="animate-pulse">
        <h2 className="text-2xl font-semibold text-black mb-5">Categorias</h2>
        <Carousel options={{ align: "center" }}>
          {categories?.map((item, i) => (
            <Link to={`/categories/${item.id}`} key={i}>
              <CategoryCard loading={loading} imageUrl={item.image} {...item} />
            </Link>
          ))}
        </Carousel>
      </div>
    </Section>
  ) : (
    <Section section="categories">
      <h2 className="text-2xl font-semibold text-black mb-5">Categorias</h2>
      <Carousel options={{ align: "center" }}>
        {categories?.map((item, i) => (
          <Link to={`/categories/${item.id}`} key={i}>
            <CategoryCard imageUrl={item.image} {...item} />
          </Link>
        ))}
      </Carousel>
    </Section>
  );
}
