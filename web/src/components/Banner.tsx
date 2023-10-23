import { BsArrowRight } from "react-icons/bs";
import { Banner, SocialMedia } from "../App";
import { useState, useEffect } from "react";
import api from "../services/api";
import { useMyContext } from "./DataContext";

export default function Banner() {
  const { banner, loading } = useMyContext();
  const [socialMedia, setSocialMedia] = useState<SocialMedia[]>();

  const whatsappNumber = socialMedia?.map((item) => item.whatsapp);
  useEffect(() => {
    api
      .get("/media")
      .then((response) => {
        setSocialMedia(response.data);
      })
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  }, []);

  return loading ? (
    <div className="flex relative items-center w-full h-48 max-h-48 sm:h-96 sm:max-h-96 rounded-2xl overflow-hidden text-white bg-gray-300 animate-pulse">
      <>
        <div
          className={`absolute w-full h-full bg-center bg-cover bg-no-repeat group-hover:scale-150 group-hover:saturate-0 transition-all ease-in-out duration-500 `}
        ></div>
        <div className="flex absolute flex-col pl-6 gap-1">
          <h1 className="font-semibold text-base sm:text-xl md:text-4xl drop-shadow-lg h-4 w-96 bg-gray-400 rounded-xl"></h1>
          <h2 className="font-semibold text-2xl md:text-4xl text-pink-700 drop-shadow-lg"></h2>
          <a
            className="flex flex-row items-center gap-2 group transition-all text-base sm:text-xl md:text-2xl drop-shadow-lg hover:text-pink-400  h-4 w-72 bg-gray-400 rounded-xl "
            href={`https://wa.me/${whatsappNumber}?text=Ola!%20Vim%20Atraves%20do%20seu%20site%20e%20gostaria%20de%20mais%20informacoes%20sobre%20seus%20produtos.`}
            target="_blank"
          ></a>
          <span className="group-hover:translate-x-1 transition-all  h-4 w-32  bg-gray-400 rounded-xl"></span>
        </div>
      </>
    </div>
  ) : (
    <div className="flex relative items-center w-full h-48 max-h-48 sm:h-96 sm:max-h-96 rounded-2xl overflow-hidden text-white">
      {banner?.map((item, i) => (
        <div key={i} className="flex h-full items-center">
          <div
            className={`absolute w-full h-full bg-center bg-cover bg-no-repeat group-hover:scale-150 group-hover:saturate-0 transition-all ease-in-out duration-500 `}
          >
            <img
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover"
              src={item.image}
              alt="Banner"
            />
          </div>
          <div className="flex absolute flex-col pl-6">
            <h1 className="font-semibold text-base sm:text-xl md:text-4xl drop-shadow-lg">
              {item.title}
            </h1>
            <h2 className="font-semibold text-2xl md:text-4xl text-pink-700 drop-shadow-lg">
              {item.subtitle}
            </h2>
            <a
              className="flex flex-row items-center gap-2 group transition-all text-base sm:text-xl md:text-2xl drop-shadow-lg hover:text-pink-400"
              href={`https://wa.me/${whatsappNumber}?text=Ola!%20Vim%20Atraves%20do%20seu%20site%20e%20gostaria%20de%20mais%20informacoes%20sobre%20seus%20produtos.`}
              target="_blank"
            >
              Saiba mais{" "}
              <span className="group-hover:translate-x-1 transition-all">
                <BsArrowRight />
              </span>
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
