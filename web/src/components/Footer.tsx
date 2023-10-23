import { AiFillInstagram, AiOutlineWhatsApp } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useMyContext } from "./DataContext";

export default function Footer() {
  const navigate = useNavigate();
  const { socialMedia } = useMyContext();

  const social = [
    `https://instagram.com/${socialMedia?.map((item) => item.instagram)}`,
    `https://wa.me/${socialMedia?.map((item) => item.whatsapp)}`,
  ];

  return (
    <footer className="flex flex-row justify-around gap-7 text-xl text-gray-400 items-center p-12 mt-12">
      <a
        href={social[0]}
        target="_blank"
        className="hover:text-pink-700 transition-all"
      >
        <AiFillInstagram />
      </a>

      <button onClick={() => navigate("/login")} className="text-base">
        © Andreza Moda Praia
      </button>

      <a
        href={social[1]}
        target="_blank"
        className=" hover:text-green-600 transition-all"
      >
        <AiOutlineWhatsApp />
      </a>
    </footer>
  );
}
