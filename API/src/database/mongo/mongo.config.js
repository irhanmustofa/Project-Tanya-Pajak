export const mongoConfig = {
  urlMaster: `mongodb+srv://123lainlain:oSKFzkHhUWCGu73q@cluster-0001.cftug9j.mongodb.net/db_tanya_pajak?retryWrites=true&w=majority&appName=Cluster-0001`,
  urlClient: (client_id) =>
    `mongodb+srv://123lainlain:oSKFzkHhUWCGu73q@cluster-0001.cftug9j.mongodb.net/${client_id}??retryWrites=true&w=majority&appName=Cluster-0001`,
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
  },
};
