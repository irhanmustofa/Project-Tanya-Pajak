import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
  pdf,
  Link,
} from "@react-pdf/renderer";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useClient } from "../../client-components/ClientProvider";
import { tarifPph } from "@/helpers/variables";
import { base_url } from "@/api/http-endpoints";

const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontSize: 11,
    fontFamily: "Helvetica",
  },
  header: {
    backgroundColor: "#FACC15",
    color: "#000",
    fontWeight: "bold",
    padding: 6,
    textAlign: "center",
    border: "1pt solid #000",
    marginBottom: 10,
  },
  section: {
    border: "1pt solid #000",
    borderRadius: 3,
    marginBottom: 10,
  },
  sectionHeader: {
    backgroundColor: "#FACC15",
    padding: 6,
    fontWeight: "bold",
    borderBottom: "1pt solid #000",
    textAlign: "left",
  },
  subSectionHeader: {
    backgroundColor: "#d1d5db", // Tailwind gray-300
    fontWeight: "bold",
    padding: 6,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableRowBorder: {
    flexDirection: "row",
    // borderBottom: "1pt dashed #000",
    paddingVertical: 4,
  },
  labelCell: {
    width: "35%",
    fontWeight: "bold",
    paddingHorizontal: 6,
  },
  valueCell: {
    width: "65%",
    paddingHorizontal: 6,
  },
  tableHeaderRow: {
    flexDirection: "row",
    backgroundColor: "#e5e7eb", // Tailwind gray-200
    fontWeight: "bold",
    paddingVertical: 4,
  },
  link: {
    color: "blue",
    textDecoration: "underline",
    marginRight: 4,
  },
  redLink: {
    color: "red",
    textDecoration: "underline",
  },
});

const ProfilePDFDocument = ({ clientProfile, periodeLaporan }) => {
  const latestLegalitas = clientProfile?.legalitas_perusahaan?.[0] || {};
  const latestPemegangSaham = latestLegalitas?.pemegang_saham?.[0] || {};
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>
          MYTAXACCOUNTINGSYSTEM - PROFILE & LEGALITAS WAJIB PAJAK
        </Text>

        {/* PROFILE WAJIB PAJAK */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>PROFILE WAJIB PAJAK</Text>
          <View style={styles.tableRowBorder}>
            <Text style={styles.labelCell}>NAMA WAJIB PAJAK:</Text>
            <Text style={styles.valueCell}>
              {clientProfile?.company_name || "-"}
            </Text>
          </View>
          <View style={styles.tableRowBorder}>
            <Text style={styles.labelCell}>ALAMAT:</Text>
            <Text style={styles.valueCell}>
              {clientProfile?.address_company || "-"}
            </Text>
          </View>
          <View style={styles.tableRowBorder}>
            <Text style={styles.labelCell}>NO. NPWP:</Text>
            <Text style={styles.valueCell}>
              {clientProfile?.no_npwp || "-"}
            </Text>
          </View>
          <View style={styles.tableRowBorder}>
            <Text style={styles.labelCell}>NO. PKP:</Text>
            <Text style={styles.valueCell}>{clientProfile?.no_pkp || "-"}</Text>
          </View>
        </View>

        {/* KUASA WAJIB PAJAK */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>KUASA WAJIB PAJAK</Text>
          <View style={styles.tableRowBorder}>
            <Text style={styles.labelCell}>NAMA DIREKTUR:</Text>
            <Text style={styles.valueCell}>
              {latestPemegangSaham?.nama || clientProfile?.director_name || "-"}
            </Text>
          </View>
          <View style={styles.tableRowBorder}>
            <Text style={styles.labelCell}>NO. KTP DIREKTUR:</Text>
            <Text style={styles.valueCell}>
              {latestPemegangSaham?.no_ktp ||
                clientProfile?.no_ktp_director ||
                "-"}
            </Text>
          </View>
          <View style={styles.tableRowBorder}>
            <Text style={styles.labelCell}>ALAMAT DIREKTUR:</Text>
            <Text style={styles.valueCell}>
              {latestPemegangSaham?.address ||
                clientProfile?.address_director ||
                "-"}
            </Text>
          </View>
          <View style={styles.tableRowBorder}>
            <Text style={styles.labelCell}>NO. PKP:</Text>
            <Text style={styles.valueCell}>{clientProfile?.no_pkp || "-"}</Text>
          </View>
          <View style={styles.tableRowBorder}>
            <Text style={styles.labelCell}>RUPS AKHIR TAHUN No:</Text>
            <Text style={styles.valueCell}>{clientProfile?.rups || "-"}</Text>
          </View>
        </View>

        {/* NAMA PENGURUS */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>
            NAMA PENGURUS SESUAI DENGAN AKTA PERUBAHAN TERAKHIR
          </Text>
          <View style={styles.tableRowBorder}>
            <Text style={styles.labelCell}>NAMA:</Text>
            <Text style={styles.valueCell}>
              {latestPemegangSaham?.nama || "-"}
            </Text>
          </View>
          <View style={styles.tableRowBorder}>
            <Text style={styles.labelCell}>NO KTP:</Text>
            <Text style={styles.valueCell}>
              {latestPemegangSaham?.no_ktp || "-"}
            </Text>
          </View>
          <View style={styles.tableRowBorder}>
            <Text style={styles.labelCell}>ALAMAT:</Text>
            <Text style={styles.valueCell}>
              {latestPemegangSaham?.address || "-"}
            </Text>
          </View>
          <View style={styles.tableRowBorder}>
            <Text style={styles.labelCell}>TEMPAT, TGL LAHIR:</Text>
            <Text style={styles.valueCell}>
              {latestPemegangSaham?.tempat_lahir || "-"},{" "}
              {latestPemegangSaham?.tanggal_lahir || "-"}
            </Text>
          </View>
          <View style={styles.tableRowBorder}>
            <Text style={styles.labelCell}>JABATAN:</Text>
            <Text style={styles.valueCell}>
              {latestPemegangSaham?.jabatan || "-"}
            </Text>
          </View>
          <View style={styles.tableRowBorder}>
            <Text style={styles.labelCell}>JUMLAH SAHAM:</Text>
            <Text style={styles.valueCell}>
              {latestPemegangSaham?.jumlah_saham || "-"}
            </Text>
          </View>
          <View style={styles.tableRowBorder}>
            <Text style={styles.labelCell}>PERSENTASE KEPEMILIKAN:</Text>
            <Text style={styles.valueCell}>
              {latestPemegangSaham?.persentase || "-"}%
            </Text>
          </View>
        </View>

        {/* PERIODE LAPORAN */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>PERIODE LAPORAN</Text>
          <View style={styles.tableRowBorder}>
            <Text style={styles.labelCell}>TAHUN BUKU:</Text>
            <Text style={styles.valueCell}>
              {periodeLaporan?.tahun_buku || "-"}
            </Text>
          </View>
          <View style={styles.tableRowBorder}>
            <Text style={styles.labelCell}>PERIODE LAPORAN:</Text>
            <Text style={styles.valueCell}>
              {periodeLaporan?.periode_laporan || "-"}
            </Text>
          </View>
          <View style={styles.tableRowBorder}>
            <Text style={styles.labelCell}>PERIODE AWAL:</Text>
            <Text style={styles.valueCell}>
              {periodeLaporan?.periode_awal
                ? new Date(periodeLaporan.periode_awal).toLocaleDateString(
                    "id-ID",
                    {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    }
                  )
                : "-"}
            </Text>
          </View>
          <View style={styles.tableRowBorder}>
            <Text style={styles.labelCell}>PERIODE AKHIR:</Text>
            <Text style={styles.valueCell}>
              {periodeLaporan?.periode_akhir
                ? new Date(periodeLaporan.periode_akhir).toLocaleDateString(
                    "id-ID",
                    {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    }
                  )
                : "-"}
            </Text>
          </View>
          <View style={styles.tableRowBorder}>
            <Text style={styles.labelCell}>Tanggal & Tempat (TTD SPT):</Text>
            <Text style={styles.valueCell}>
              {periodeLaporan?.tempat_ttd},
              {new Date(periodeLaporan?.tanggal_ttd).toLocaleDateString(
                "id-ID",
                {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                }
              ) || "-"}
            </Text>
          </View>
        </View>

        {/* TARIF PERHITUNGAN CIT */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>TARIF PERHITUNGAN CIT</Text>
          <View style={styles.tableHeaderRow}>
            <Text style={[styles.labelCell, { width: "40%" }]}>Keterangan</Text>
            <Text style={[styles.labelCell, { width: "20%" }]}>Periode</Text>
            <Text style={[styles.labelCell, { width: "20%" }]}>Tarif PPh</Text>
            <Text style={[styles.labelCell, { width: "20%" }]}>Link</Text>
          </View>
          <View style={styles.tableRowBorder}>
            <Text style={[styles.valueCell, { width: "40%" }]}>
              SPT TAHUN SEBELUMNYA
            </Text>
            <Text style={[styles.valueCell, { width: "20%" }]}>
              {periodeLaporan?.periode_spt_sebelumnya
                ? new Date(
                    periodeLaporan.periode_spt_sebelumnya
                  ).toLocaleDateString("id-ID")
                : "-"}
            </Text>
            <Text style={[styles.valueCell, { width: "20%" }]}>
              {(() => {
                const selectedTarif = tarifPph.find(
                  (item) =>
                    item.code == periodeLaporan?.tarif_pph_spt_sebelumnya
                );
                return selectedTarif ? selectedTarif.name : "-";
              })()}
            </Text>
            <Text style={[styles.valueCell, { width: "20%" }]}>
              <Link
                src={`${base_url}/public/${periodeLaporan?.file_spt_sebelumnya}`}
                style={styles.link}
              >
                LINK SPT
              </Link>{" "}
            </Text>
          </View>
          <View style={styles.tableRowBorder}>
            <Text style={[styles.valueCell, { width: "40%" }]}>
              SPT TAHUN BERJALAN
            </Text>
            <Text style={[styles.valueCell, { width: "20%" }]}>
              {periodeLaporan?.periode_spt_berjalan
                ? new Date(
                    periodeLaporan.periode_spt_berjalan
                  ).toLocaleDateString("id-ID")
                : "-"}
            </Text>
            <Text style={[styles.valueCell, { width: "20%" }]}>
              {(() => {
                const selectedTarif = tarifPph.find(
                  (item) => item.code == periodeLaporan?.tarif_pph_spt_berjalan
                );
                return selectedTarif ? selectedTarif.name : "-";
              })()}
            </Text>
            <Text style={[styles.valueCell, { width: "20%" }]}>
              <Link
                src={`${base_url}/public/${periodeLaporan?.file_spt_berjalan}`}
                style={styles.link}
              >
                LINK SPT
              </Link>{" "}
            </Text>
          </View>
          <View style={styles.tableRowBorder}>
            <Text style={[styles.valueCell, { width: "40%" }]}>
              SPT TAHUN BERIKUTNYA
            </Text>
            <Text style={[styles.valueCell, { width: "20%" }]}>
              {periodeLaporan?.periode_spt_berikutnya
                ? new Date(
                    periodeLaporan.periode_spt_berikutnya
                  ).toLocaleDateString("id-ID")
                : "-"}
            </Text>
            <Text style={[styles.valueCell, { width: "20%" }]}>
              {(() => {
                const selectedTarif = tarifPph.find(
                  (item) =>
                    item.code == periodeLaporan?.tarif_pph_spt_berikutnya
                );
                return selectedTarif ? selectedTarif.name : "-";
              })()}
            </Text>
            <Text style={[styles.valueCell, { width: "20%" }]}>
              <Link
                src={`${base_url}/public/${periodeLaporan?.file_spt_berikutnya}`}
                style={styles.link}
                target="_blank"
              >
                LINK SPT
              </Link>{" "}
            </Text>
          </View>
        </View>

        {/* LEGALITAS PERUSAHAAN */}
        {clientProfile?.legalitas_perusahaan?.map((item, idx) => (
          <View key={idx} style={styles.section}>
            <Text
              style={[
                styles.sectionHeader,
                { backgroundColor: "#7f1d1d", color: "#fff" },
              ]}
            >
              {item.jenis_akta?.toUpperCase() || `AKTA PERUSAHAAN - ${idx + 1}`}
            </Text>

            <View
              style={[
                styles.tableRowBorder,
                { flexDirection: "row", justifyContent: "space-between" },
              ]}
            >
              <Text style={styles.labelCell}>NOMOR AKTA:</Text>
              <View style={{ width: "50%", flexDirection: "row" }}>
                <Text style={styles.valueCell}>{item.nomor_akta || "-"} </Text>
                <Text style={[styles.valueCell, { textAlign: "right" }]}>
                  {item.link_akta && (
                    <Link src={item.link_akta} style={styles.link}>
                      LINK AKTA
                    </Link>
                  )}
                </Text>
              </View>
            </View>
            <View
              style={[
                styles.tableRowBorder,
                { flexDirection: "row", justifyContent: "space-between" },
              ]}
            >
              <Text style={styles.labelCell}>NOMOR SK:</Text>
              <View style={{ width: "50%", flexDirection: "row" }}>
                <Text style={styles.valueCell}>{item.nomor_sk || "-"} </Text>
                <Text style={[styles.valueCell, { textAlign: "right" }]}>
                  {item.link_sk && (
                    <Link src={item.link_sk} style={styles.link}>
                      LINK SK
                    </Link>
                  )}
                </Text>
              </View>
            </View>
            <View
              style={[
                styles.tableRowBorder,
                { flexDirection: "row", justifyContent: "space-between" },
              ]}
            >
              <Text style={[styles.labelCell]}>NOMOR NIB:</Text>
              <View style={{ width: "50%", flexDirection: "row" }}>
                <Text style={styles.valueCell}>{item.nomor_nib || "-"} </Text>
                <Text style={[styles.valueCell, { textAlign: "right" }]}>
                  {item.link_nib && (
                    <Link src={item.link_nib} style={styles.link}>
                      LINK NIB
                    </Link>
                  )}
                </Text>
              </View>
            </View>
            <View
              style={[
                styles.tableRowBorder,
                { flexDirection: "row", justifyContent: "space-between" },
              ]}
            >
              <Text style={styles.labelCell}>ALAMAT:</Text>
              <Text
                style={
                  ([styles.valueCell], { textAlign: "right", paddingRight: 6 })
                }
              >
                {item.alamat_perusahaan || "-"}
              </Text>
            </View>
            <View
              style={[
                styles.tableRowBorder,
                { flexDirection: "row", justifyContent: "space-between" },
              ]}
            >
              <Text style={styles.labelCell}>TOTAL SAHAM:</Text>
              <Text
                style={[
                  styles.valueCell,
                  { textAlign: "right", paddingRight: 6 },
                ]}
              >
                {item.total_saham?.toLocaleString("id-ID") || "-"}
              </Text>
            </View>
            <View
              style={[
                styles.tableRowBorder,
                { flexDirection: "row", justifyContent: "space-between" },
              ]}
            >
              <Text style={styles.labelCell}>HARGA / SAHAM:</Text>
              <Text
                style={[
                  styles.valueCell,
                  { textAlign: "right", paddingRight: 6 },
                ]}
              >
                Rp {item.harga_saham?.toLocaleString("id-ID") || "-"}
              </Text>
            </View>
            <View
              style={[
                styles.tableRowBorder,
                { flexDirection: "row", justifyContent: "space-between" },
              ]}
            >
              <Text style={styles.labelCell}>JUMLAH SAHAM:</Text>
              <Text style={{ alignSelf: "flex-end", paddingRight: 6 }}>
                Rp {item.jumlah_saham?.toLocaleString("id-ID") || "-"}
              </Text>
            </View>

            {/* PEMEGANG SAHAM */}
            <Text style={styles.subSectionHeader}>NAMA PEMEGANG SAHAM</Text>
            {item.pemegang_saham?.map((ps, i) => (
              <View
                key={i}
                style={[
                  styles.tableRowBorder,
                  { flexDirection: "row", justifyContent: "space-between" },
                ]}
              >
                <View style={{ width: "55%", flexDirection: "row" }}>
                  <Text style={[styles.labelCell, { width: "35%" }]}>
                    {ps.nama}
                  </Text>
                  <Text style={[styles.valueCell, { width: "20%" }]}>
                    {ps.persentase}%
                  </Text>
                </View>
                <Text
                  style={[
                    styles.valueCell,
                    { width: "45%", textAlign: "right" },
                  ]}
                >
                  Rp {ps.jumlah_saham?.toLocaleString("id-ID")}
                </Text>
              </View>
            ))}

            {/* NAMA PENGURUS */}
            <Text style={styles.subSectionHeader}>NAMA PENGURUS</Text>
            {item.pengurus?.map((pg, i) => (
              <View key={i} style={styles.tableRowBorder}>
                <Text style={[styles.labelCell, { width: "50%" }]}>
                  {pg.nama}
                </Text>
                <Text style={[styles.valueCell, { width: "50%" }]}>
                  {pg.jabatan}
                </Text>
              </View>
            ))}
          </View>
        ))}
      </Page>
    </Document>
  );
};

const ProfilePDF = ({ onClose, periode }) => {
  const { clientState, clientPeriodeLaporan } = useClient();
  const id = useLocalStorage.get("clientId");
  const [clientProfile, setClientProfile] = useState({});
  const [selectedPeriode, setSelectedPeriode] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (clientState?.data && Array.isArray(clientState.data) && id) {
      const foundClient = clientState.data.find((item) => item._id === id);
      if (foundClient) {
        setClientProfile(foundClient);
      }
    }

    if (clientPeriodeLaporan) {
      const foundPeriode = clientPeriodeLaporan.find(
        (item) => item._id === periode
      );
      if (foundPeriode) {
        setSelectedPeriode(foundPeriode);
      }
    }
    setLoading(false);
  }, [id, clientState?.data, periode, clientPeriodeLaporan]);
  const handleCloseDialog = () => {
    if (onClose) onClose();
  };

  const handleDownloadPDF = async () => {
    try {
      const blob = await pdf(
        <ProfilePDFDocument
          clientProfile={clientProfile}
          periodeLaporan={selectedPeriode}
        />
      ).toBlob();

      const fileName = `Profile-${clientProfile?.company_name || "client"}.pdf`;

      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <Dialog open={true} onOpenChange={handleCloseDialog}>
      <DialogContent className="w-[90%] h-full max-w-full max-h-[90%] flex flex-col overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b">
          <div>
            <DialogTitle>Export Profile Client</DialogTitle>
            <DialogDescription>
              Exporting client profile data to PDF.
            </DialogDescription>
          </div>
          <Button
            variant="outline"
            onClick={handleDownloadPDF}
            className="ml-auto bg-blue-500 text-white hover:bg-blue-600"
            disabled={loading}
          >
            Download
          </Button>
        </div>
        <div className="flex-1 w-full h-full overflow-hidden">
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <p>Loading...</p>
            </div>
          ) : (
            <PDFViewer
              title="Export Profile Client"
              style={{ width: "100%", height: "100%" }}
            >
              <ProfilePDFDocument
                clientProfile={clientProfile}
                periodeLaporan={selectedPeriode}
              />
            </PDFViewer>
          )}
        </div>
        <DialogFooter>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProfilePDF;
