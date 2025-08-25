import ClientProvider from "@/app/management/perubahan-profil/perubahan-profil-components/PerubahanProfilProvider";
import MainPage from "@/layouts/MainPage";
import PerubahanProfilPages from "./perubahan-profil-pages/PerubahanProfilPages";

export default function PerubahanProfil() {
  return (
    <>
      <MainPage>
        <ClientProvider>
          <PerubahanProfilPages />
        </ClientProvider>
      </MainPage>
    </>
  );
}
