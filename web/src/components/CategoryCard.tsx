interface CategoryCardProps {
  loading?: boolean;
  imageUrl: string;
  name: React.ReactNode;
}

export default function CategoryCard({
  name,
  imageUrl,
  loading,
}: CategoryCardProps) {
  return loading ? (
    <button
      className={`flex w-full min-w-[370px] max-w-[370px] h-20 max-h-20 sm:h-44 sm:max-h-44 transition-all text-white items-center justify-start rounded-2xl overflow-hidden group scale-75 mobileM:scale-90 mobileL:scale-100 bg-gray-300`}
    >
      <p className="absolute text-base font-bold bg-gray-400 h-4 w-44 rounded-xl ml-2"></p>
    </button>
  ) : (
    <button
      className={`flex w-full min-w-[370px] max-w-[370px] h-20 max-h-20 sm:h-44 sm:max-h-44 transition-all text-white items-center justify-start rounded-2xl overflow-hidden group scale-75 mobileM:scale-90 mobileL:scale-100 `}
    >
      <div
        className={`flex items-center justify-center w-full h-full bg-center bg-cover bg-no-repeat group-hover:scale-150 group-hover:saturate-0 transition-all ease-in-out duration-500 `}
      >
        <img
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover"
          src={imageUrl}
          alt=""
        />
      </div>
      <p className="absolute text-base sm:text-2xl font-bold p-4">{name}</p>
    </button>
  );
}
