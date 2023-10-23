import { FaRegUser } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";

export default function ProfileCard() {
  return (
    <Link to="/adm/personal">
      <div className="rounded-xl bg-white flex items-center px-6 py-4 gap-4 hover:brightness-90 transition-all">
        <div className="flex items-center justify-center text-white rounded-full bg-zinc-900 min-w-[48px] min-h-[48px]">
          <FaRegUser />
        </div>
        <div className="flex items-center justify-between w-full">
          <div className="flex flex-col gap-1">
            <h1 className="font-semibold text-zinc-700">Andreza</h1>
            <p className="text-zinc-700">Alterar configurações</p>
          </div>
          <div className="text-zinc-700">
            <IoIosArrowForward />
          </div>
        </div>
      </div>
    </Link>
  );
}
