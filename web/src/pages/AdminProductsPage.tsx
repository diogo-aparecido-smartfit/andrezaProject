import { BiPlus } from "react-icons/bi";
import NavBar from "../components/AdminPage/NavBar";
import Button from "../components/Button";
import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";
import { IoIosSave } from "react-icons/io";
import CaseMenu from "../components/CaseMenu";
import api from "../services/api";
import { Toaster } from "react-hot-toast";
import { CgSpinnerAlt } from "react-icons/cg";

interface Products {
  id: string;
  name: string;
  category: string;
  style: string;
  price: string;
  image: string;
  idCategory: string;
  idStyle: string;
}

interface ProductFormData {
  originalId: string;
  id: string;
  name: string;
  category: string;
  idCategory: string;
  idStyle: string;
  style: string;
  price: string;
  image: File | null;
}

interface Category {
  image: string;
  id: string;
  name: string;
}

interface Style {
  image: string;
  id: string;
  name: string;
}

export default function AdminProductsPage() {
  const [data, setData] = useState<Products[]>();
  const [categories, setCategories] = useState<Category[]>();
  const [styles, setStyles] = useState<Style[]>();
  const [formData, setFormData] = useState<ProductFormData>({
    originalId: "",
    id: "",
    idStyle: "",
    idCategory: "",
    name: "",
    category: "",
    style: "",
    price: "",
    image: null,
  });
  const [seed, setSeed] = useState(1);
  const [loading, setLoading] = useState(true);
  const [isSaving] = useState(false);
  const [isDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // fetch products data
  useEffect(() => {
    api
      .get("/products")
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
        setLoading(false);
      });
  }, [loading, isSaving]);

  // fetch categories
  useEffect(() => {
    api
      .get("/categories")
      .then((response) => {
        setCategories(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
        setLoading(false);
      });
  }, []);

  // fetch styles
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
  }, []);

  // create product
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
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

  // submit form to create category
  // const handleSubmit = async (event: React.FormEvent) => {
  //   event.preventDefault();
  //   setIsSaving(true);

  //   // find category/style and set related id to them
  //   const selectedCategory = categories
  //     ? categories.find((category) => category.id === formData.category)
  //     : null;

  //   const selectedStyle = styles
  //     ? styles.find((style) => style.id === formData.style)
  //     : null;

  //   const formDataToSend = new FormData();
  //   formDataToSend.append("id", formData.id);
  //   formDataToSend.append("name", formData.name);
  //   formDataToSend.append("price", formData.price);
  //   formDataToSend.append("idCategory", formData.category);
  //   formDataToSend.append("idStyle", formData.style);

  //   if (selectedCategory) {
  //     formDataToSend.append("category", selectedCategory.name);
  //   } else {
  //     formDataToSend.append("category", "");
  //   }

  //   if (selectedStyle) {
  //     formDataToSend.append("style", selectedStyle.name);
  //   } else {
  //     formDataToSend.append("style", "");
  //   }

  //   if (formData.image) {
  //     formDataToSend.append("image", formData.image);
  //   }

  //   try {
  //     const response = await api.post("/products", formDataToSend, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     });

  //     console.log("Resposta da API:", response.data);
  //     const notify = () => toast.success("Produto criado com sucesso!");
  //     notify();
  //   } catch (error) {
  //     setIsVisible(false);
  //     setHidden();
  //     console.log("Erro ao criar produto: ", error);
  //     const notify = () => toast.error("Erro ao criar produto!");
  //     notify();
  //     console.error("Erro ao enviar os dados:", error);
  //   } finally {
  //     setHidden();
  //     setIsSaving(false);
  //     handleToggleMenu();
  //   }
  //   setSeed(Math.random());
  // };

  // edit product
  const handleEdit = (data: Products) => {
    // Preencha os campos de edição com os dados existentes
    setIsEditing(true);
    setFormData({
      idCategory: "",
      idStyle: "",
      id: data.id,
      originalId: data.id,
      name: data.name,
      category: data.category,
      price: data.price,
      style: data.style,
      image: null,
    });

    handleToggleMenu();
    setHidden();
  };

  // const handleUpdate = async (event: React.FormEvent) => {
  //   event.preventDefault();
  //   setIsSaving(true);

  //   const selectedCategory = categories
  //     ? categories.find((category) => category.id === formData.category)
  //     : null;

  //   const selectedStyle = styles
  //     ? styles.find((style) => style.id === formData.style)
  //     : null;

  //   const formDataToSend = new FormData();
  //   formDataToSend.append("name", formData.name);
  //   formDataToSend.append("id", formData.name);
  //   formDataToSend.append("price", formData.price);
  //   formDataToSend.append("idCategory", formData.category);
  //   formDataToSend.append("idStyle", formData.style);

  //   if (selectedStyle && selectedCategory) {
  //     formDataToSend.append("style", selectedStyle.name);
  //     formDataToSend.append("category", selectedCategory.name);
  //   }
  //   if (formData.image) {
  //     formDataToSend.append("image", formData.image);
  //   }

  //   try {
  //     await api.put(`products/${formData.originalId}`, formDataToSend, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     });
  //     console.log("Dados atualizados com sucesso");
  //     const notify = () => toast.success("Produto atualizado com sucesso!");
  //     notify();
  //   } catch (error) {
  //     console.error("Erro ao atualizar os dados:", error);
  //     const notify = () => toast.error("Erro ao atualizar os dados!");
  //     notify();
  //   } finally {
  //     setIsSaving(false);
  //     handleToggleMenu();
  //     setHidden();
  //   }
  //   setSeed(Math.random());
  // };

  // delete product
  // const deleteProduct = (productId: string) => {
  //   setIsDeleting(true);

  //   try {
  //     api.delete(`/products/${productId}`).then(() => {
  //       // Atualize a lista de categorias após a exclusão bem-sucedida
  //       setData((prevProducts) =>
  //         prevProducts
  //           ? prevProducts.filter((product) => product.id !== productId)
  //           : undefined
  //       );
  //     });
  //     setIsDeleting(false);
  //     const notify = () => toast.success("Produto deletado com sucesso!");
  //     notify();
  //   } catch (error) {
  //     console.error("Erro ao excluir o produto:", error);
  //     setIsDeleting(false);
  //   }
  // };

  const setHidden = () => {
    if (document.body.style.overflow !== "hidden") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  };

  const handleToggleMenu = () => {
    if (isVisible) {
      setIsVisible(false);
      setHidden();
      setFormData({
        id: "",
        idCategory: "",
        idStyle: "",
        originalId: "",
        name: "",
        category: "Selecione uma categoria",
        price: "",
        style: "Selecione um estilo",
        image: null,
      });
      if (isEditing) {
        setIsEditing(false);
      }
      setTimeout(() => {
        setSeed(Math.random());
      }, 1000);
    } else {
      setIsVisible(true);
      setHidden();
    }
  };

  return (
    <html className="min-h-screen bg-[#F6F6F6]">
      {/* <NotLoggedPage> */}
      <div className="flex flex-col items-center p-4 md:px-52 lg:px-72 xl:px-96 2xl:px-[550px]">
        <NavBar title="Produtos" route="/adm" />
        <Button
          onClick={() => handleToggleMenu()}
          className="p-2 border-transparent border-2 rounded-xl hover:border-zinc-300 transition-all text-black"
        >
          <BiPlus /> Criar novo produto
        </Button>
        <div className="flex">
          <ul className="flex flex-wrap justify-center gap-4 mt-8 sm:mt-12">
            {data
              ? data.map((item, i) => (
                  <li key={i}>
                    <ProductCard
                      isDeleting={isDeleting}
                      // handleEdit={() => deleteProduct(item.id)}
                      isEdit
                      openModal={() => {
                        handleEdit(item);
                      }}
                      {...item}
                    />
                  </li>
                ))
              : null}
          </ul>
        </div>

        <CaseMenu
          key={seed}
          title={isEditing ? "Editar produto" : "Criar novo produto"}
          isVisible={isVisible}
          handleToggleMenu={() => handleToggleMenu()}
        >
          <div className="flex flex-col mt-6">
            <form
              className="flex flex-col mb-4"
              // onSubmit={isEditing ? handleUpdate : handleSubmit}
            >
              <p>
                Nome do produto <span className="text-red-500">*</span>
              </p>
              <input
                placeholder="Digite o nome do produto"
                className="p-4 w-full bg-[#313131] rounded-xl"
                required
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleInputChange}
              />
              <p className="mt-4">
                Digite o identificador do produto{" "}
                <span className="text-zinc-300">(Não utilize espaços!)</span>{" "}
                <span className="text-red-500">*</span>{" "}
              </p>
              <input
                placeholder="Digite o id do produto"
                className="p-4 w-full bg-[#313131] rounded-xl"
                required
                type="text"
                name="id"
                id="id"
                value={formData.id}
                onChange={handleInputChange}
              />
              <p className="mt-4">
                Selecione a categoria do produto{" "}
                <span className="text-red-500">*</span>
              </p>
              <select
                required
                onChange={handleSelectChange}
                name="category"
                id="category"
                className="bg-[#313131] border border-gray-700 text-zinc-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4"
              >
                <option selected value="">
                  Selecione uma categoria
                </option>
                {categories
                  ? categories.map((category: Category, i: number) => (
                      <option key={i} value={category.id}>
                        {category.name}
                      </option>
                    ))
                  : null}
              </select>
              <p className="mt-4">
                Selecione o estilo do produto{" "}
                <span className="text-red-500">*</span>
              </p>
              <select
                name="style"
                id="style"
                onChange={handleSelectChange}
                className="bg-[#313131] border border-gray-700 text-zinc-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4"
              >
                <option selected value="">
                  Selecione um estilo
                </option>
                {styles
                  ? styles.map((style: Style, i: number) => (
                      <option key={i} value={style.id}>
                        {style.name}
                      </option>
                    ))
                  : null}
              </select>
              <p className="mt-4">
                Preço do produto <span className="text-red-500">*</span>
              </p>
              <input
                placeholder="Digite o preço do produto"
                className="p-4 w-full bg-[#313131] rounded-xl"
                required
                type="text"
                name="price"
                id="price"
                value={formData.price}
                onChange={handleInputChange}
              />
              <div className="flex items-center justify-center w-full mt-4">
                <label
                  htmlFor="image"
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-bray-800 bg-[#313131] hover:brightness-110"
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
                    name="image"
                    id="image"
                    type="file"
                    className="hidden"
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
      {/* </NotLoggedPage> */}
      <Toaster />
    </html>
  );
}
