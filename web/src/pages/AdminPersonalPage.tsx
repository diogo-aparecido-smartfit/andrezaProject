import { IoIosArrowForward, IoIosSave } from "react-icons/io";
import NavBar from "../components/AdminPage/NavBar";
import { AiOutlineInstagram, AiOutlineWhatsApp } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";
import { MdOutlineLocalLibrary } from "react-icons/md";
import Button from "../components/Button";
import { useEffect, useState } from "react";
import api from "../services/api";
import { Toaster } from "react-hot-toast";

interface Data {
  name: string;
  address: string;
  whatsapp: string;
  instagram: string;
}

export default function AdminPersonalPage() {
  const [data, setData] = useState<Data[]>();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    whatsapp: "",
    name: "",
    address: "",
    instagram: "",
  });
  const elements = [
    {
      id: 1,
      icon: <FaRegUser />,
      name: "Nome",
      instruction: "Digite seu nome no campo abaixo:",
      placeholder: "Digite seu nome",
      type: "text",
      field: "name",
    },
    {
      id: 2,
      icon: <MdOutlineLocalLibrary />,
      name: "Endereço",
      instruction: "Digite seu endereço no campo abaixo:",
      placeholder: "Digite seu endereço",
      type: "text",
      field: "address",
    },
    {
      id: 3,
      icon: <AiOutlineWhatsApp />,
      name: "WhatsApp",
      instruction:
        "Digite seu número de telefone no campo abaixo (11 números):",
      placeholder: "34999999999",
      type: "number",
      field: "whatsapp",
    },
    {
      id: 4,
      icon: <AiOutlineInstagram />,
      name: "Instagram",
      instruction: "Digite seu instagram no campo abaixo (sem o @):",
      placeholder: "Digite seu @ do instagram",
      type: "text",
      field: "instagram",
    },
  ];

  const [sectionVisibility, setSectionVisibility] = useState(
    elements.map(() => false)
  );

  // get categories
  useEffect(() => {
    api
      .get("/media")
      .then((response) => {
        setData(response.data);
        setFormData({
          name: data ? data[0].name : "",
          whatsapp: data ? data[0].whatsapp : "",
          instagram: data ? data[0].instagram : "",
          address: data ? data[0].address : "",
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  // Function to change visibility of a specific section
  const toggleSection = (index: number) => {
    const updatedVisibility = [...sectionVisibility];
    updatedVisibility[index] = !updatedVisibility[index];
    setSectionVisibility(updatedVisibility);
  };

  // function to update a local field value
  const handleFieldChange = (fieldName: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  // function to send data to api
  // const handleUpdate = async (field: string, value: string) => {
  //   try {
  //     const updatedData = {
  //       ...formData,
  //       [field]: value,
  //     };
  //     await api.put("media", updatedData);
  //     const notify = () => toast.success(`Campo's atualizado com sucesso!`);
  //     notify();
  //     console.log(`${field} atualizado com sucesso`);
  //   } catch (error) {
  //     const notify = () =>
  //       toast.error(`erro ao atualizar ${field}! Erro: ${error}`);
  //     notify();
  //     console.error(`Erro ao atualizar ${field}:`, error);
  //   }
  // };

  return (
    <html className="min-h-screen bg-[#F6F6F6]">
      {/* <NotLoggedPage> */}
      <div className="flex flex-col items-center p-4 md:px-52 lg:px-72 xl:px-96 2xl:px-[550px]">
        <NavBar route="/adm" title="Informações" />

        <div className="flex flex-col texxt-zinc-700 w-full rounded-xl overflow-hidden">
          {loading ? (
            <div className="h-full w-full flex items-center justify-center text-2xl">
              <ImSpinner2 className="animate-spin" />
            </div>
          ) : (
            <>
              {elements.map((element, i) => (
                <div key={element.id}>
                  <button
                    onClick={() => toggleSection(i)}
                    className="flex p-4 items-center justify-between w-full hover:brightness-90 transition-all bg-white"
                  >
                    <div className="flex items-center gap-2 text-base">
                      {element.icon}
                      <p>{element.name}</p>
                    </div>
                    <span>
                      <IoIosArrowForward />
                    </span>
                  </button>
                  <div className="h-[1px] w-full bg-zinc-300"></div>
                  <div
                    className={`${
                      sectionVisibility[i] ? "flex" : "hidden"
                    } flex-col items-start p-4 gap-2 bg-zinc-100`}
                  >
                    <p>{element.instruction}</p>
                    <input
                      className="w-full rounded-lg p-4"
                      type={element.type}
                      placeholder={element.placeholder}
                      value={formData[element.field as keyof typeof formData]}
                      onChange={(e) =>
                        handleFieldChange(element.field, e.target.value)
                      }
                    />
                    <Button
                      // onClick={() =>
                      //   handleUpdate(
                      //     element.field,
                      //     formData[element.field as keyof typeof formData]
                      //   )
                      // }
                      className="border-solid border-2 border-blue-200 text-blue-600"
                    >
                      <IoIosSave /> Salvar
                    </Button>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
      {/* </NotLoggedPage> */}
      <Toaster />
    </html>
  );
}
