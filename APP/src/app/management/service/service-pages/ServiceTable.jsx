import { useService } from "../service-components/ServiceProvider";
import DataTables from "@/components/datatables/Datatables";
import useServiceTableConfig from "../service-components/ServiceColumn";
import ServiceDashboard from "./ServiceDashboard";
import ServiceSubject from "../service-components/ServiceSubject";

export default function ServiceTable() {
  const { serviceState } = useService();
  const { serviceColumn, filterFields } = useServiceTableConfig();

  return (
    <>
      <ServiceSubject />
      <ServiceDashboard service={serviceState.data} />

      <DataTables
        columns={serviceColumn}
        data={serviceState.data}
        filterFields={filterFields}
      />
    </>
  );
}
