import ProfileCard from "../components/AdminPage/ProfileCard";
import SettingsSection from "../components/AdminPage/SettingsSection";
import NavBar from "../components/AdminPage/NavBar";
import NotLoggedPage from "./NotLoggedPage";

export default function AdminPage() {
  return (
    <html className="min-h-screen bg-[#F6F6F6]">
      <NotLoggedPage>
        <div className="flex flex-col items-center p-4 md:px-52 lg:px-72 xl:px-96 2xl:px-[550px]">
          <NavBar route="/" title="Configurações" />

          <div className="w-full">
            <ProfileCard />
          </div>
          <div className="h-[1px] w-full bg-zinc-300 my-4"></div>
          <SettingsSection />
        </div>
      </NotLoggedPage>
    </html>
  );
}
