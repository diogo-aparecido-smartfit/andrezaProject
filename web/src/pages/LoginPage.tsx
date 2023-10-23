import { useNavigate } from "react-router-dom";
import { auth } from "../services/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import toast, { Toaster } from "react-hot-toast";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onLogin = (e: any) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        // .then((userCredential) => {

        // Signed in
        // const user = userCredential.user;
        // console.log(user);
        navigate("/adm");
      })
      .catch((error) => {
        const notify = () => toast.error("Credenciais incorretas!");
        notify();
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <html className="min-h-screen bg-[#F6F6F6]">
      <div className="flex flex-col h-screen w-screen justify-center items-center px-4 sm:px-40 xl:px-48 2xl:px-52">
        <form
          className="bg-white rounded-3xl p-4 flex flex-col items-center justify-center gap-4 w-full max-w-[400px]"
          action=""
        >
          <div className="text-2xl font-bold mb-4 bg-zinc-200 p-6 rounded-2xl flex items-center w-full gap-3">
            <button
              onClick={() => navigate("/")}
              className="p-3 bg-zinc-300 rounded-lg hover:brightness-90 transition-all"
            >
              <BsArrowLeftShort />
            </button>
            Login
          </div>
          <input
            required
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg px-6 py-3 bg-transparent border-solid border-2 border-zinc-700/20 mt-4"
            placeholder="Email"
            type="email"
            id="email"
            name="email"
          />
          <input
            required
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg px-6 py-3 bg-transparent border-solid border-2 border-zinc-700/20"
            placeholder="Senha"
            type="password"
            id="password"
            name="password"
          />
          <button
            onClick={onLogin}
            className="bg-pink-200 text-pink-600 w-full justify-center mt-4 p-4 flex items-center sm:p-3 text-center gap-2 rounded-lg hover:brightness-75 transition-all h-fit"
          >
            Entrar
          </button>
        </form>
      </div>
      <Toaster />
    </html>
  );
}
