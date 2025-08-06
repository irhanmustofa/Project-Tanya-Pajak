export const mongoConfig = {
  urlMaster: `mongodb://admin:PasswordKuat123@212.38.94.214:27017/db_tanya_pajak?authSource=admin`,
  urlClient: (client_id) =>
    `mongodb://admin:PasswordKuat123@212.38.94.214:27017/${client_id}?authSource=admin`,
  collection: {
    users: "users",
    authentication: "authentication",
    authorization: "authorization",
    try_logins: "try_logins",
    master_client: "master_client",
    register: "register",
  },
};
