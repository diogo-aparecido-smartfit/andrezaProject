import { IoIosArrowBack } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineLogout } from "react-icons/hi";

interface NavBarProps {
  title: string;
  route: string;
}

export default function NavBar({ title, route }: NavBarProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // signOut(auth)
    //   .then(() => {
    //     // Sign-out successful.
    navigate("/");
    //   console.log("Signed out successfully");
    // })
    // .catch((error) => {
    //   console.log(error);
    // });
  };

  return (
    <div className="flex items-center justify-between text-center mb-10 mt-14 w-full">
      <Link to={route} className="text-2xl hover:scale-125 transition-all">
        <IoIosArrowBack />
      </Link>
      <h1 className="font-bold text-2xl md:text-5xl ">{title}</h1>
      <button
        className="text-2xl hover:scale-125 transition-all"
        onClick={handleLogout}
      >
        <HiOutlineLogout />
      </button>
    </div>
  );
}
