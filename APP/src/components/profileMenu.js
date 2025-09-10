import {
    AwardIcon,
    Bell,
    BookCopy,
    File,
    FileSignature,
    FileStack,
    FileUser,
    Locate,
    PencilLineIcon,
    PenSquareIcon,
    ScrollText,
    Trash2,
    User,
} from "lucide-react";

export const profileMenu = [
    {
        title: "My Documents",
        icon: File,
        link: "/documents",
        permission: "documents.read",
    },
    {
        title: "My Notifications",
        icon: Bell,
        permission: "notifications.read",
        onClick: () => console.log("Navigate to notifications"),
    },
    {
        title: "My Cases",
        icon: FileUser,
        permission: "cases.read",
    },
    {
        title: "Perubahan Data",
        icon: FileSignature,
        permission: "update.read",
        children: [
            {
                title: "Identitas Wajib Pajak",
                icon: User,
                link: "/update-profile",
                permission: "update.identity",
            },
            {
                title: "Perubahan Alamat Utama",
                icon: Locate,
                permission: "update.address",
            },
            {
                title: "Perubahan Data Objek Pajak PBB P5L",
                icon: FileSignature,
                permission: "update.objek",
            },
            {
                title: "Perubahan Data Pemungut PPN PMSE dengan Kepdirjen",
                icon: PenSquareIcon,
                permission: "update.pmse",
            },
        ],
    },
    {
        title: "Perubahan Status",
        icon: PencilLineIcon,
        permission: "status.read",
        children: [
            {
                title: "Penetapan Wajib Pajak Nonaktif",
                permission: "status.nonactive",
            },
            { title: "Pengaktifan Kembali Wajib Pajak Nonaktif" },
            { title: "Penunjukan Pemungut PMSE Dalam Negeri" },
            { title: "Penetapan Pemungut Bea Meterai" },
            { title: "Pencabutan Pemungut Bea Meterai" },
            { title: "Penunjukan Wakil/Kuasa" },
            { title: "Perubahan Data Wakil/Kuasa Wajib Pajak" },
            { title: "Pencabutan Wakil/Kuasa" },
            { title: "Penunjukan Pemotong atau Pemungut PPh/PPN" },
            { title: "Pencabutan Pemotong atau Pemungut PPh/PPN" },
            { title: "Pencabutan Pemungut PPN PMSE" },
            { title: "Lembaga Keuangan Pelapor - Pencabutan" },
            { title: "Lembaga Keuangan Pelapor - Perubahan Data" },
        ],
    },
    {
        title: "Penghapusan & Pencabutan",
        icon: Trash2,
        permission: "delete.read",
    },
    {
        title: "Sertifikat Elektronik",
        icon: AwardIcon,
        permission: "certificate.read",
    },
    {
        title: "Pengukuhan PKP",
        icon: BookCopy,
        permission: "pkp.read",
    },
    {
        title: "Pendaftaran Objek Pajak PBB P5L",
        icon: FileStack,
        permission: "pbb.read",
    },
];
