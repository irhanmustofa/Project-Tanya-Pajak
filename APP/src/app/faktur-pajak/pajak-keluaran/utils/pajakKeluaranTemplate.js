import * as XLSX from "xlsx";

export const downloadPajakKeluaranTemplate = () => {
    // Sheet 1: Items
    const transaksi = [
        [
            "Tipe Transaksi",
            "No Faktur",
            "Kode Transaksi",
            "Tanggal Faktur",
            "Jenis Faktur",
            "Referensi Faktur",
            "Alamat",
            "IDTKU",
            "Nama Pembeli",
            "NPWP Pembeli",
            "Alamat Pembeli",
            "IDTKU Pembeli",
            "Email Pembeli",
        ],
        [
            "Penjualan",
            "1234567890",
            "1234567890",
            "2022-01-01",
            "Faktur Penjualan",
            "1234567890",
            "Jl. Contoh No. 1",
            "1234567890",
            "John Doe",
            "1234567890",
            "Jl. Contoh No. 2",
            "1234567890",
            "V9MfM@example.com",
        ],
    ];

    const items = [
        [
            "No Faktur",
            "Tipe",
            "Nama",
            "Kode",
            "Qty",
            "Satuan",
            "Harga Satuan",
            "Total Harga",
            "Diskon",
            "Tarif PPN",
            "PPN",
            "DPP",
            "DPP Nilai Lain",
            "Tarif PPNBM",
            "PPNBM",
        ],
        [
            "1234567890",
            "Barang",
            "Produk A",
            "KD001",
            2,
            "Pcs",
            10000,
            20000,
            0,
            11,
            2200,
            20000,
            0,
            0,
            0,
        ],
        [
            "1234567890",
            "Barang",
            "Produk B",
            "KD002",
            5,
            "Box",
            5000,
            25000,
            0,
            11,
            2750,
            25000,
            0,
            0,
            0,
        ],
    ];

    // Sheet 2: Transaksi


    // Buat workbook
    const wb = XLSX.utils.book_new();
    const wsTransaksi = XLSX.utils.aoa_to_sheet(transaksi);
    const wsItems = XLSX.utils.aoa_to_sheet(items);

    XLSX.utils.book_append_sheet(wb, wsTransaksi, "Transaksi");
    XLSX.utils.book_append_sheet(wb, wsItems, "Items");

    // Simpan file
    XLSX.writeFile(wb, "TemplateUploadPajakKeluaran.xlsx");
};
