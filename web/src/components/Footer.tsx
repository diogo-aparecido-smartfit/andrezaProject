import { AiFillInstagram, AiOutlineWhatsApp } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useMyContext } from "./DataContext";
import { FaFacebookF } from "react-icons/fa";
import Button from "./Button";
import { IoLogIn } from "react-icons/io5";

export default function Footer() {
  const navigate = useNavigate();
  const { socialMedia } = useMyContext();

  const social = [
    `https://instagram.com/${socialMedia?.map((item) => item.instagram)}`,
    `https://wa.me/${socialMedia?.map((item) => item.whatsapp)}`,
  ];

  return (
    <footer className="flex flex-row w-full justify-around gap-7 text-xl text-gray-400 items-center p-12 mt-12">
      <div className="flex gap-7">
        <a
          href={social[0]}
          target="_blank"
          className="hover:text-pink-700 transition-all"
        >
          <AiFillInstagram />
        </a>
        <a
          href={social[1]}
          target="_blank"
          className=" hover:text-green-600 transition-all"
        >
          <AiOutlineWhatsApp />
        </a>
        <a
          href={social[1]}
          target="_blank"
          className=" hover:text-green-600 transition-all"
        >
          <FaFacebookF />
        </a>
      </div>

      <button onClick={() => navigate("/login")} className="text-base">
        © Andreza Moda Praia
      </button>

      <Button
        onClick={() => navigate("/login")}
        className="text-base bg-black text-white"
      >
        <IoLogIn /> Fazer login
      </Button>
    </footer>
  );
}
