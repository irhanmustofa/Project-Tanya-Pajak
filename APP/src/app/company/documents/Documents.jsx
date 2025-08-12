import MainPage from "@/layouts/MainPage";
import DocumentProvider from "@/app/company/documents/document-components/DocumentProvider";
import DocumentTable from "@/app/company/documents/document-pages/DocumentTable";

export default function Documents() {
  return (
    <>
      <MainPage>
        <DocumentProvider>
          <DocumentTable />
        </DocumentProvider>
      </MainPage>
    </>
  );
}
