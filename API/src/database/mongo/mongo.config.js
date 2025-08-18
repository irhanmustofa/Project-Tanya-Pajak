export const mongoConfig = {
  urlMaster: `mongodb+srv://123lainlain:oSKFzkHhUWCGu73q@cluster-0001.cftug9j.mongodb.net/db_tanya_pajak?authSource=admin&retryWrites=true&w=majority&appName=Cluster-0001`,
  urlClient: (client_id) =>
    `mongodb+srv://123lainlain:oSKFzkHhUWCGu73q@cluster-0001.cftug9j.mongodb.net/${client_id}?authSource=admin&retryWrites=true&w=majority&appName=Cluster-0001`,
  collection: {
    register: "register",
    forgot_password: "forgot_password",
    client_akun: "client_akun",
    users: "users",
    authentication: "authentication",
    authorization: "authorization",
    try_logins: "try_logins",
    master_client: "master_client",
    permission: "permission",
    documents: "documents",
    pajak_keluaran: "pajak_keluaran",
    pajak_masukan: "pajak_masukan",
    faktur_pajak: "faktur_pajak",
  },
};
