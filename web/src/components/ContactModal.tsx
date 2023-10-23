import {
  AiFillInstagram,
  AiOutlineWhatsApp,
  AiOutlineClose,
} from "react-icons/ai";
import Button from "./Button";
import { useMyContext } from "./DataContext";

interface ContactModalProps {
  onRequestClose: () => void;
}

export default function ContactModal({ onRequestClose }: ContactModalProps) {
  const { socialMedia } = useMyContext();

  const handleButtonClick = (link: string) => {
    window.open(link, "_blank");
  };

  const social = [
    `https://instagram.com/${socialMedia?.map((item) => item.instagram)}`,
    `https://wa.me/${socialMedia?.map((item) => item.whatsapp)}`,
  ];

  return (
    <div className="flex fixed overflow-hidden items-center justify-center top-0 left-0 bg-black/70 w-full h-full transition-all p-4">
      <div className="flex flex-col items-center justify-center rounded-lg min-h-[450px] max-w-xs min-w-[300px] sm:min-h-[450px] sm:min-w-[450px] sm:max-w-md bg-white p-6 sm:p-10 text-center">
        <div className="flex flex-col gap-2 mb-4 mt-auto">
          <h1 className="text-2xl font-semibold">Que pena... 🥺</h1>
          <p className="">
            Nossos produtos não estão disponíveis para a venda online. Você pode
            comprar nossos produtos entrando em contato conosco, que tal? 😄
          </p>
        </div>
        <ul className="flex gap-4 mb-auto">
          <li>
            <Button
              onClick={() => handleButtonClick(social[0])}
              className="p-2 sm:p-3 bg-pink-400 text-pink-800"
            >
              <AiFillInstagram />
            </Button>
          </li>
          <li>
            <Button
              onClick={() => handleButtonClick(social[1])}
              className="p-2 sm:p-3 bg-green-400 text-green-800"
            >
              <AiOutlineWhatsApp />
            </Button>
          </li>
        </ul>
        <Button
          className="p-2 sm:p-3 flex bg-red-400 text-red-800"
          onClick={onRequestClose}
        >
          <AiOutlineClose /> Fechar
        </Button>
      </div>
    </div>
  );
}
