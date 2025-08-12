import { useDocument } from "../document-components/DocumentProvider";
import DataTables from "@/components/datatables/Datatables";
import useDocumentTableConfig from "../document-components/DocumentColumn";
import DocumentSubject from "../document-components/DocumentSubject";

export default function DocumentTable() {
  const { documentState } = useDocument();
  const { documentColumn, filterFields } = useDocumentTableConfig();

  return (
    <>
      <DocumentSubject />

      <DataTables
        columns={documentColumn}
        data={documentState.data}
        filterFields={filterFields}
      />
    </>
  );
}
