const local_url = "http://localhost:5000";
const server_url = "https://crm-api.mytaxteknologi.site";

const isDev = import.meta.env.MODE === "development";

export const base_url = isDev ? local_url : server_url;
