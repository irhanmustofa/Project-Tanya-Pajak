import MainPage from "@/layouts/MainPage";
import ClientProvider from "@/app/management/clients/profile/client-components/ClientProvider";
import ClientTable from "@/app/management/clients/profile/client-pages/ClientTable";

export default function Clients() {
  return (
    <>
      <MainPage>
        <ClientProvider>
          <ClientTable />
        </ClientProvider>
      </MainPage>
    </>
  );
}
