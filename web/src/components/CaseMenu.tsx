import { AiOutlineClose } from "react-icons/ai";
import Button from "./Button";

interface CaseMenuProps {
  isVisible: boolean;
  children: React.ReactNode;
  handleToggleMenu: () => void;
  title: string;
}

export default function CaseMenu({
  children,
  isVisible,
  title,
  handleToggleMenu,
}: CaseMenuProps) {
  return (
    <div
      className={` w-screen h-screen flex fixed items-end justify-center overflow-hidden slide-up backdrop-blur-sm  ${
        isVisible ? "active" : "inactive"
      }`}
    >
      <div
        className={`flex bottom-0 w-full max-w-[500px] min-h-[450px] max-h-[500px] sm:max-h-screen bg-[#212120] rounded-t-2xl p-6 shadow-2xl overflow-auto text-white`}
      >
        <div className="flex flex-col w-full">
          <nav className="flex justify-between">
            <h1 className="font-semibold text-lg">{title}</h1>
            <Button onClick={() => handleToggleMenu()}>
              <AiOutlineClose />
            </Button>
          </nav>
          {children}
        </div>
      </div>
    </div>
  );
}
