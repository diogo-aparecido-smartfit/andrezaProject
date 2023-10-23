import { IoArrowBackSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

interface CategoryHeaderProps {
  children: React.ReactNode;
  imageUrl: string;
}

export default function CategoryHeader({
  children,
  imageUrl,
}: CategoryHeaderProps) {
  return (
    <div
      className={`flex relative items-center justify-start gap-3 rounded-2xl p-12 md:p-16 w-full max-h-fit text-white bg-zinc-500 bg-no-repeat bg-center bg-cover transition-all overflow-hidden`}
    >
      <div
        className={`absolute left-0 w-full max-h-full bg-center bg-cover bg-no-repeat `}
      >
        <img className="flex w-full" src={imageUrl} alt="" />
      </div>
      <div className="flex absolute gap-3 items-center justify-center">
        <Link to="/">
          <button className="flex items-center justify-center backdrop-blur-sm bg-black/30 p-3 rounded-lg hover:backdrop-brightness-110 transition-all group">
            <span className="group-hover:scale-x-125 transition-all">
              <IoArrowBackSharp />
            </span>
          </button>
        </Link>
        <h1 className="font-bold text-2xl md:text-5xl">{children}</h1>
      </div>
    </div>
  );
}
