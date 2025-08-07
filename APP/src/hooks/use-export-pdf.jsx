import { useState } from "react";
import { PDFViewer, Document, Page, View, Text } from "@react-pdf/renderer";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

const styles = {
  table: { width: "95%", margin: 10, borderWidth: 0.5, borderColor: "#000" },
  row: { flexDirection: "row", borderBottomWidth: 0.5, borderColor: "#000" },
  header: {
    backgroundColor: "#d9d9d9",
    fontWeight: "bold",
    padding: 4,
    textAlign: "center",
    fontSize: 8,
    borderWidth: 0.5,
    borderColor: "#000",
    flex: 1,
  },
  cell: {
    padding: 4,
    textAlign: "center",
    fontSize: 8,
    borderWidth: 0.5,
    borderColor: "#000",
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    margin: 10,
    marginTop: 20,
    marginBottom: 0,
  },
};

const ExportPage = ({ title = "", columns = [], data = [], config = {} }) => {
  const size = config?.size || "A4";
  const orientation = config?.orientation || "portrait";

  return (
    <div>
      <div className="mb-4">
        <DialogTitle className="mb-2">{title}</DialogTitle>
        <DialogDescription>Exporting data to PDF file</DialogDescription>
      </div>

      <PDFViewer width="100%" height="92%">
        <Document>
          <Page size={size} orientation={orientation}>
            <View key={"title"}>
              <Text style={styles.title}>{title}</Text>
            </View>
            <View style={styles.table} key={"table"}>
              <View style={styles.row} key={"header"}>
                {columns.map((header) => (
                  <Text style={styles.header} key={header}>
                    {header}
                  </Text>
                ))}
              </View>
              {data.map((item, index) => (
                <View style={styles.row} key={index}>
                  {item.map((value, colIndex) => (
                    <Text style={styles.cell} key={colIndex}>
                      {value}
                    </Text>
                  ))}
                </View>
              ))}
            </View>
          </Page>
        </Document>
      </PDFViewer>
    </div>
  );
};

const ExportPDF = ({ title, columns, data, onClose, config = {} }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        setIsOpen(false);
        onClose();
      }}
    >
      <DialogContent className="max-w-[90%] min-w-[90%] max-h-[90%] min-h-[90%]">
        <ExportPage
          title={title}
          columns={columns}
          data={data}
          config={config}
        />
      </DialogContent>
    </Dialog>
  );
};

export const useExportPDF = () => {
  return { ExportPDF };
};
