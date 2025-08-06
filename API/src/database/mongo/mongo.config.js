export const mongoConfig = {
  urlMaster: `mongodb://admin:PasswordKuat123@212.38.94.214:27017/my_db?authSource=admin`,
  urlClient: (client_id) =>
    `mongodb://admin:PasswordKuat123@212.38.94.214:27017/${client_id}?authSource=admin`,
  collection: {
    users: "users",
    authentication: "authentication",
    authorization: "authorization",
    try_logins: "try_logins",
    master_group: "master_group",
    master_client: "master_client",

    master_coa: "master_coa",
    coa_head: "coa_head",
    coa_group: "coa_group",
    coa_jenis_asset: "coa_jenis_asset",
    buku: "buku",
    jurnal: "jurnal",
    master_asset: "master_asset",
    periode_laporan: "periode_laporan",
    tarif_cit: "tarif_cit",
    buku_all: "buku_all",
  },
};
