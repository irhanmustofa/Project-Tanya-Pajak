import MainPage from "@/layouts/MainPage";
import ClientProvider from "@/app/management/clients/client-components/ClientProvider";
import ClientTable from "@/app/management/clients/client-pages/ClientTable";

export default function Client() {
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
