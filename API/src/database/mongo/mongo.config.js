export const mongoConfig = {
  urlMaster: `mongodb://admin:PasswordKuat123@212.38.94.214:27017/db_tanya_pajak?authSource=admin`,
  urlClient: (client_id) =>
    `mongodb://admin:PasswordKuat123@212.38.94.214:27017/${client_id}?authSource=admin`,
  collection: {
    register: "register",
    forgot_password: "forgot_password",
    client_akun: "client_akun",
    users: "users",
    authentication: "authentication",
    authorization: "authorization",
    try_logins: "try_logins",
    master_client: "master_client",
<<<<<<< HEAD
=======
    register: "register",
>>>>>>> fd410b4 (update-register)
  },
};
