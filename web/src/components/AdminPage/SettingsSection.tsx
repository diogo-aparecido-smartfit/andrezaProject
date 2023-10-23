import { HiOutlineShoppingBag } from "react-icons/hi";
import { IoIosArrowForward } from "react-icons/io";
import { BiCategoryAlt, BiPaintRoll } from "react-icons/bi";
import { PiFrameCorners } from "react-icons/pi";
import { Link } from "react-router-dom";

export default function SettingsSection() {
  return (
    <div className="flex flex-col w-full rounded-xl overflow-hidden">
      <Link to="/adm/products">
        <div className="group">
          <div className="flex p-4 items-center justify-between w-full group-hover:brightness-90 transition-all bg-white">
            <div className="flex items-center gap-2 text-base">
              <HiOutlineShoppingBag />
              <p>Produtos</p>
            </div>
            <span>
              <IoIosArrowForward />
            </span>
          </div>
          <div className="h-[1px] w-full bg-zinc-300"></div>
        </div>
      </Link>
      <Link to="/adm/categories">
        <div className="group">
          <div className="flex p-4 items-center justify-between w-full group-hover:brightness-90 transition-all bg-white">
            <div className="flex items-center gap-2 text-base">
              <BiCategoryAlt />
              <p>Categorias</p>
            </div>
            <span>
              <IoIosArrowForward />
            </span>
          </div>
          <div className="h-[1px] w-full bg-zinc-300"></div>
        </div>
      </Link>
      <Link to="/adm/styles">
        <div className="group">
          <div className="flex p-4 items-center justify-between w-full group-hover:brightness-90 transition-all bg-white">
            <div className="flex items-center gap-2 text-base">
              <BiPaintRoll />
              <p>Estilos</p>
            </div>
            <span>
              <IoIosArrowForward />
            </span>
          </div>
          <div className="h-[1px] w-full bg-zinc-300"></div>
        </div>
      </Link>
      <Link to="/adm/banner">
        <div className="group">
          <div className="flex p-4 items-center justify-between w-full group-hover:brightness-90 transition-all bg-white">
            <div className="flex items-center gap-2 text-base">
              <PiFrameCorners />
              <p>Banner</p>
            </div>
            <span>
              <IoIosArrowForward />
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
