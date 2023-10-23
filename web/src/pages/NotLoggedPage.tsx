import { User, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import { BiErrorCircle } from "react-icons/bi";
import { Link } from "react-router-dom";
import { auth } from "../services/firebase";

interface NotLoggedPageProps {
  children: React.ReactNode;
}

export default function NotLoggedPage({ children }: NotLoggedPageProps) {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // const uid = user.uid;
        // console.log("uid", uid);
        setUser(user);
      } else {
        console.log("user is logged out");
      }
    });
  }, []);

  return (
    <>
      {user ? (
        children
      ) : (
        <div className="w-screen h-screen flex flex-col gap-2 justify-center items-center">
          <h1 className="text-4xl font-bold text-red-500">Erro!</h1>
          <p>Você precisa estar logado para entrar nesta página!</p>
          <Link to="/login">
            <h2 className="flex flex-row items-center gap-2 font-semibold">
              <span className="text-2xl">
                <BiErrorCircle />
              </span>
              <h1 className="text-xl hover:underline">Fazer login.</h1>
            </h2>
          </Link>
        </div>
      )}
    </>
  );
}
