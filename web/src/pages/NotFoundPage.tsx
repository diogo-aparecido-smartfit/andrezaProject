import { Link } from "react-router-dom";
import { BiErrorCircle } from "react-icons/bi";

export default function NotFoundPage() {
  return (
    <div className="w-screen h-screen flex flex-col gap-2 justify-center items-center">
      <h1 className="text-4xl font-bold text-red-500">Erro!</h1>
      <Link to="/">
        <h2 className="flex flex-row items-center gap-2 font-semibold">
          <span className="text-2xl">
            <BiErrorCircle />
          </span>
          <h1 className="text-xl hover:underline">Voltar para o início.</h1>
        </h2>
      </Link>
    </div>
  );
}
