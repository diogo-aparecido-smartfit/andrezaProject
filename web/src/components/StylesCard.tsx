interface StylesCardProps {
  loading?: boolean;
  name: React.ReactNode;
  imageUrl: string;
}

export default function StylesCard({
  name,
  imageUrl,
  loading,
}: StylesCardProps) {
  return loading ? (
    <button
      className={`flex items-center max-w-xl min-w-[270px] h-64 max-h-64 sm:h-96 sm:max-h-96 transition-all text-white  justify-start rounded-2xl overflow-hidden group bg-gray-300 animate-pulse w-full`}
    >
      <p className="absolute text-base sm:text-2xl font-bold h-6 w-40 bg-gray-400 rounded-xl ml-2"></p>
    </button>
  ) : (
    <button
      className={`flex max-w-xl min-w-[270px] h-64 max-h-64 sm:h-96 sm:max-h-96 transition-all text-white  justify-start rounded-2xl overflow-hidden group`}
    >
      <div
        className={`w-full h-full transition-al bg-center bg-cover bg-no-repeat group-hover:scale-150 group-hover:saturate-0 transition-all ease-in-out duration-500`}
      >
        <img
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover"
          src={imageUrl}
          alt=""
        />
      </div>
      <p className="absolute text-base sm:text-2xl font-bold p-6 sm:p-10">
        {name}
      </p>
    </button>
  );
}
