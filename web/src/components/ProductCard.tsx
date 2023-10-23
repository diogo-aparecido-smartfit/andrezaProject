import { BsPencil } from "react-icons/bs";
import Button from "./Button";
import { AiOutlinePlus } from "react-icons/ai";
import { BiTrash } from "react-icons/bi";
import { CgSpinnerAlt } from "react-icons/cg";

interface ProductCardProps {
  isEdit?: boolean;
  category: string;
  name: string;
  price: string;
  image: string;
  openModal: () => void;
  handleEdit?: () => void;
  isDeleting?: boolean;
  loading?: boolean;
}

export default function ProductCard({
  category,
  isEdit,
  price,
  image,
  name,
  openModal,
  handleEdit,
  isDeleting,
  loading,
}: ProductCardProps) {
  return loading ? (
    <div className="flex flex-col items-center text-left w-full min-w-[260px] max-w-[270px] rounded-2xl bg-zinc-200 overflow-hidden transition-all animate-pulse">
      <div className="flex max-h-56 h-56 relative">
        <div className="absolute bottom-0 right-0 p-4 group">
          <Button
            onClick={() => openModal()}
            className="sm:hidden flex p-3 bg-pink-300 text-pink-600"
            children={isEdit ? <BsPencil /> : <AiOutlinePlus />}
          />
          {isEdit ? (
            <Button
              onClick={handleEdit ? () => handleEdit() : () => {}}
              className="sm:hidden flex p-3 bg-red-300 text-red-600 mt-2"
              children={
                isDeleting ? (
                  <CgSpinnerAlt className="animate-spin" />
                ) : (
                  <BiTrash />
                )
              }
            />
          ) : null}
        </div>
        <img className="rounded-b-2xl object-cover bg-gray-300 w-64" />
      </div>
      <div className="flex flex-row justify-between w-full p-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-gray-400 text-xs font-bold w-32 h-4 bg-gray-300 rounded-full"></h2>
          <h1 className="text-black text-base font-normal w-36 h-4 bg-gray-300 rounded-full"></h1>
          <p className="text-red-500 text-base font-bold w-28 h-4 bg-gray-300 rounded-full"></p>
        </div>
        <span className="hidden sm:flex items-center gap-2">
          <Button
            onClick={() => openModal()}
            className="bg-gray-300 text-gray-600"
            children={isEdit ? <BsPencil /> : <AiOutlinePlus />}
          />
          {isEdit ? (
            <Button
              onClick={handleEdit ? () => handleEdit() : () => {}}
              className="bg-gray-300 text-gray-600"
              children={
                isDeleting ? (
                  <CgSpinnerAlt className="animate-spin" />
                ) : (
                  <BiTrash />
                )
              }
            />
          ) : null}
        </span>
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center text-left w-full min-w-[260px] max-w-[270px] rounded-2xl bg-zinc-200 overflow-hidden transition-all">
      <div className="flex max-h-56 h-56 relative">
        <div className="absolute bottom-0 right-0 p-4 group">
          <Button
            onClick={() => openModal()}
            className="sm:hidden flex p-3 bg-pink-300 text-pink-600"
            children={isEdit ? <BsPencil /> : <AiOutlinePlus />}
          />
          {isEdit ? (
            <Button
              onClick={handleEdit ? () => handleEdit() : () => {}}
              className="sm:hidden flex p-3 bg-red-300 text-red-600 mt-2"
              children={
                isDeleting ? (
                  <CgSpinnerAlt className="animate-spin" />
                ) : (
                  <BiTrash />
                )
              }
            />
          ) : null}
        </div>
        <img
          loading="lazy"
          decoding="async"
          className="rounded-b-2xl object-cover"
          src={image}
          alt="Imagem do produto"
        />
      </div>
      <div className="flex flex-row justify-between w-full p-6">
        <div className="flex flex-col">
          <h2 className="text-gray-400 text-xs font-bold">{category}</h2>
          <h1 className="text-black text-base font-normal">{name}</h1>
          <p className="text-red-500 text-base font-bold">R${price}</p>
        </div>
        <span className="hidden sm:flex items-center gap-2">
          <Button
            onClick={() => openModal()}
            className="bg-pink-300 text-pink-600"
            children={isEdit ? <BsPencil /> : <AiOutlinePlus />}
          />
          {isEdit ? (
            <Button
              onClick={handleEdit ? () => handleEdit() : () => {}}
              className="bg-red-300 text-red-600"
              children={
                isDeleting ? (
                  <CgSpinnerAlt className="animate-spin" />
                ) : (
                  <BiTrash />
                )
              }
            />
          ) : null}
        </span>
      </div>
    </div>
  );
}
