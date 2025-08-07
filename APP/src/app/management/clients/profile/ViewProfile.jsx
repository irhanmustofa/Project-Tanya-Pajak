import MainPage from "@/layouts/MainPage";
import ClientProvider from "./client-components/ClientProvider";
import ViewProfileContent from "./profile-perusahaan/components/ViewProfileContent";

export default function ViewProfile() {
  return (
    <MainPage>
      <ClientProvider>
        <ViewProfileContent />
      </ClientProvider>
    </MainPage>
  );
}
