import { useNavigate } from "react-router-dom";
import { BsArrowLeftShort } from "react-icons/bs";
import { Toaster } from "react-hot-toast";

export default function LoginPage() {
  // const [user, setUser] = useState<User>();
  const navigate = useNavigate();
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  // useEffect(() => {
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       setUser(user);
  //     } else {
  //       console.log("user is logged out");
  //     }
  //   });
  // }, []);

  // const isLogged = () => {
  //   if (user) {
  //     navigate("/adm");
  //   }
  // };

  // // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // const onLogin = (e: any) => {
  //   e.preventDefault();
  //   signInWithEmailAndPassword(auth, email, password)
  //     .then(() => {
  //       navigate("/adm");
  //     })
  //     .catch((error) => {
  //       const notify = () => toast.error("Credenciais incorretas!");
  //       notify();
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //       console.log(errorCode, errorMessage);
  //     });
  // };

  return (
    <>
      {/* {user ? navigate("/adm") : ( */}
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
              disabled
              // onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg px-6 py-3 bg-transparent border-solid border-2 border-zinc-400/20 mt-4 bg-gray-100"
              placeholder="Email"
              type="email"
              id="email"
              name="email"
            />
            <input
              required
              disabled
              // onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg px-6 py-3 bg-transparent border-solid border-2 border-zinc-400/20 bg-gray-100"
              placeholder="Senha"
              type="password"
              id="password"
              name="password"
            />
            <button className="bg-pink-100/50 text-pink-300/50 cursor-not-allowed w-full justify-center mt-4 p-4 flex items-center sm:p-3 text-center gap-2 rounded-lg h-fit">
              Entrar
            </button>
            <button
              onClick={() => navigate("/adm")}
              className="bg-pink-200 text-pink-600 w-full justify-center p-4 flex items-center sm:p-3 hover:brightness-75 transition-all text-center gap-2 rounded-lg h-fit"
            >
              Entrar sem login
            </button>
          </form>
        </div>
        <Toaster />
      </html>
      {/* )} */}
    </>
  );
}
