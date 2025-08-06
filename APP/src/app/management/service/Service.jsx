import MainPage from "@/layouts/MainPage";
import ServiceProvider from "@/app/management/service/service-components/ServiceProvider";
import ServiceTable from "@/app/management/service/service-pages/ServiceTable";

export default function Service() {
  return (
    <>
      <MainPage>
        <ServiceProvider>
          <ServiceTable />
        </ServiceProvider>
      </MainPage>
    </>
  );
}
