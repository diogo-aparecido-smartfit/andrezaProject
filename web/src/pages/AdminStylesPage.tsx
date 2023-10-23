import { useEffect, useState } from "react";
import CaseMenu from "../components/CaseMenu";
import { BiErrorCircle, BiPencil, BiPlus } from "react-icons/bi";
import NavBar from "../components/AdminPage/NavBar";
import Button from "../components/Button";
import { FiTrash } from "react-icons/fi";
import { IoIosSave } from "react-icons/io";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "../services/firebase";
import { Link } from "react-router-dom";
import api from "../services/api";
import { CgSpinnerAlt } from "react-icons/cg";
import toast, { Toaster } from "react-hot-toast";

interface styleData {
  id: string;
  name: string;
  image: string;
}

interface styleFormData {
  id: string;
  originalId: string;
  name: string;
  image: File | null;
}

export default function AdminStylesPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [styles, setStyles] = useState<styleData[]>();
  const [formData, setFormData] = useState<styleFormData>({
    id: "",
    originalId: "",
    name: "",
    image: null,
  });
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [user, setUser] = useState<User>();

  // verify user login
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        console.log("user is logged out");
      }
    });
  }, []);

  // get styles
  useEffect(() => {
    api
      .get("/styles")
      .then((response) => {
        setStyles(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
        setLoading(false);
      });
  }, [styles]);

  // create style
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const imageFile = event.target.files && event.target.files[0];
    setFormData({
      ...formData,
      image: imageFile || null,
    });
  };

  // submit form to create style
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setIsSaving(true);

    const formDataToSend = new FormData();
    formDataToSend.append("id", formData.id);
    formDataToSend.append("name", formData.name);
    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }

    try {
      const response = await api.post("/styles", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Resposta da API:", response.data);
      const notify = () => toast.success("Estilo criado com sucesso!");
      notify();
    } catch (error) {
      setIsVisible(false);
      setHidden();
      const notify = () => toast.error("Erro ao criar estilo!");
      notify();
      console.error("Erro ao enviar os dados:", error);
    } finally {
      setIsVisible(false);
      setHidden();
      setIsSaving(false);
      setFormData({
        id: "",
        originalId: "",
        name: "",
        image: null,
      });
    }
  };

  // edit style
  const handleEdit = (data: styleData) => {
    // Preencha os campos de edição com os dados existentes
    setIsEditing(true);
    setFormData({
      id: data.id,
      originalId: data.id,
      name: data.name,
      image: null, // Você pode ou não resetar a imagem existente
    });

    handleToggleMenu();
    setHidden();
  };

  const handleUpdate = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSaving(true);

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }

    try {
      await api.put(`styles/${formData.originalId}`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Dados atualizados com sucesso");
      const notify = () => toast.success("estilo atualizada com sucesso!");
      notify();
    } catch (error) {
      console.error("Erro ao atualizar os dados:", error);
      const notify = () => toast.error("Erro ao atualizar os dados!");
      notify();
    } finally {
      setIsSaving(false);
      setIsVisible(false);
      setHidden();
    }
  };

  // delete cateogry
  const deletestyle = (styleId: string) => {
    setIsDeleting(true);

    try {
      api.delete(`/styles/${styleId}`).then(() => {
        // Atualize a lista de estilos após a exclusão bem-sucedida
        setStyles((prevstyles) =>
          prevstyles
            ? prevstyles.filter((style) => style.id !== styleId)
            : undefined
        );
      });
      setIsDeleting(false);
      const notify = () => toast.success("Estilo deletado com sucesso!");
      notify();
    } catch (error) {
      console.error("Erro ao excluir a estilo:", error);
      setIsDeleting(false);
    }
  };

  // hidden scroll when menu is activated
  const setHidden = () => {
    if (document.body.style.overflow !== "hidden") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  };

  // toggle create/edit style menu
  const handleToggleMenu = () => {
    if (isVisible) {
      setIsVisible(false);
      setHidden();
      setFormData({
        id: "",
        originalId: "",
        name: "",
        image: null,
      });
      if (isEditing) {
        setIsEditing(false);
      }
    } else {
      setIsVisible(true);
      setHidden();
    }
  };

  return (
    <html className="min-h-screen bg-[#F6F6F6]">
      {user ? (
        <div className="flex flex-col items-center p-4 md:px-52 lg:px-72 xl:px-96 2xl:px-[550px]">
          <NavBar title="Estilos" route="/adm" />
          <Button
            onClick={() => handleToggleMenu()}
            className="p-2 border-transparent border-2 rounded-xl hover:border-zinc-300 transition-all"
          >
            <BiPlus /> Criar novo estilo
          </Button>
          <div className="flex mt-6 w-full">
            <div className="flex flex-col w-full rounded-xl overflow-hidden">
              {loading ? (
                <p>Carregando</p>
              ) : styles ? (
                styles.map((style, index) => (
                  <div className="group" key={index}>
                    <div className="flex p-4 items-center group-hover:brightness-90 transition-all bg-white justify-between">
                      <div className="flex items-center gap-2 text-base">
                        <p>{style.name}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          className="p-2 border-transparent border-2 rounded-xl hover:border-zinc-300 transition-all"
                          onClick={() => handleEdit(style)}
                        >
                          <BiPencil />
                        </button>
                        <button
                          onClick={() => deletestyle(style.id)}
                          className="p-2 border-transparent border-2 rounded-xl hover:border-red-300 transition-all text-red-500"
                        >
                          {isDeleting ? (
                            <CgSpinnerAlt className="animate-spin" />
                          ) : (
                            <FiTrash />
                          )}
                        </button>
                      </div>
                    </div>
                    <div className="h-[1px] w-full bg-zinc-300"></div>
                  </div>
                ))
              ) : null}
            </div>
          </div>

          <CaseMenu
            title={isEditing ? "Editar estilo" : "Criar novo estilo"}
            isVisible={isVisible}
            handleToggleMenu={() => handleToggleMenu()}
          >
            <div className="flex flex-col mt-6">
              <form
                className="flex flex-col mb-4"
                onSubmit={isEditing ? handleUpdate : handleSubmit}
              >
                <p>
                  Digite o nome da estilo{" "}
                  <span className="text-red-500">*</span>
                </p>
                <input
                  placeholder="Digite o nome do estilo"
                  className="p-4 w-full bg-[#313131] rounded-xl"
                  required
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
                <p className="mt-4">
                  Digite o identificador da estilo{" "}
                  <span className="text-zinc-300">(Não utilize espaços!)</span>{" "}
                  <span className="text-red-500">*</span>{" "}
                </p>
                <input
                  placeholder="Digite a estilo do estilo"
                  className="p-4 w-full bg-[#313131] rounded-xl"
                  required
                  type="text"
                  name="id"
                  id="id"
                  value={formData.id}
                  onChange={handleInputChange}
                />
                <div className="flex items-center justify-center w-full mt-4">
                  <label
                    htmlFor="image"
                    className={`flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-bray-800 bg-[#313131] ${
                      formData.image ? formData.image : "bg-[#313131]"
                    } hover:brightness-110`}
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        className="w-8 h-8 mb-4  text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                      <p className="mb-2 text-sm  text-gray-400 flex flex-col items-center">
                        <span className="font-semibold">
                          Clique aqui carregar
                        </span>{" "}
                        ou então arraste a imagem
                      </p>
                      <p className="text-xs  text-gray-400">
                        SVG, PNG or JPG (MAX. 1600x1400px)
                      </p>
                    </div>
                    <input
                      id="image"
                      type="file"
                      className="flex text-gray-300"
                      onChange={handleImageChange}
                    />
                  </label>
                </div>
                <Button
                  type="submit"
                  className="bg-blue-200 text-blue-600 justify-center my-4 p-4"
                >
                  {isSaving ? (
                    <CgSpinnerAlt className="animate-spin" />
                  ) : (
                    <>
                      <IoIosSave /> Salvar
                    </>
                  )}
                </Button>
              </form>
            </div>
          </CaseMenu>
        </div>
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
      <Toaster />
    </html>
  );
}
