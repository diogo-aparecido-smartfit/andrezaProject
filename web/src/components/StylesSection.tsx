import { Link } from "react-router-dom";
import Carousel from "./Carousel";
import Section from "./Section";
import StylesCard from "./StylesCard";
import { useMyContext } from "./DataContext";

export default function StylesSection() {
  const { loading, styles } = useMyContext();

  return loading ? (
    <Section section="styles">
      <div className="flex flex-col justify-start mb-5 animate-pulse">
        <h2 className="text-2xl font-semibold text-black bg-gray-300 h-4 w-32 rounded-xl"></h2>
        <p className="font-normal text-base text-gray-400 bg-gray-300 h-4 w-72 rounded-xl mt-1"></p>
      </div>
      <Carousel options={{ align: "center" }}>
        {styles?.map((item, i) => (
          <Link to={`/styles/${item.id}`} key={i}>
            <StylesCard
              loading={loading}
              imageUrl={item.image}
              {...item}
            ></StylesCard>
          </Link>
        ))}
      </Carousel>
    </Section>
  ) : (
    <Section section="styles">
      <div className="flex flex-col justify-start mb-5">
        <h2 className="text-2xl font-semibold text-black">Outros estilos</h2>
        <p className="font-normal text-base text-gray-400">
          Aqui temos estilos para todos os gostos!
        </p>
      </div>
      <Carousel options={{ align: "center" }}>
        {styles?.map((item, i) => (
          <Link to={`/styles/${item.id}`} key={i}>
            <StylesCard
              loading={loading}
              imageUrl={item.image}
              {...item}
            ></StylesCard>
          </Link>
        ))}
      </Carousel>
    </Section>
  );
}
