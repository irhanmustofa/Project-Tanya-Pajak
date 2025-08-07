import HttpRequest from "@/api/http-request";
import { base_url } from "@/api/http-endpoints";

export const jurnalUmumEndpoint = {
  import: `${base_url}/jurnal-umum/import`,
  buku: `${base_url}/jurnal-umum/buku`,
  jurnal: `${base_url}/jurnal-umum/jurnal`,
  bukuById: (id) => `${base_url}/jurnal-umum/buku/${id}`,
  jurnalById: (id) => `${base_url}/jurnal-umum/jurnal/${id}`,
  create: `${base_url}/jurnal-umum`,
  update: (id) => `${base_url}/jurnal-umum/${id}`,
  delete: (id) => `${base_url}/jurnal-umum/${id}`,
};

export const jurnalUmumImport = async (data) => {
  return await HttpRequest.method("POST")
    .url(jurnalUmumEndpoint.import)
    .body(data)
    .send();
};

export const jurnalUmumGetBuku = async () => {
  return await HttpRequest.method("GET").url(jurnalUmumEndpoint.buku).send();
};

export const jurnalUmumGetJurnal = async () => {
  return await HttpRequest.method("GET").url(jurnalUmumEndpoint.jurnal).send();
};

export const jurnalUmumGetBukuById = async (id) => {
  return await HttpRequest.method("GET")
    .url(jurnalUmumEndpoint.bukuById(id))
    .send();
};

export const jurnalUmumGetJurnalById = async (id) => {
  const result = await HttpRequest.method("GET")
    .url(jurnalUmumEndpoint.jurnalById(id))
    .send();
  return result;
};

export const jurnalUmumCreate = async (data) => {
  return await HttpRequest.method("POST")
    .url(jurnalUmumEndpoint.create)
    .body(data)
    .send();
};

export const jurnalUmumUpdate = async (id, data) => {
  return await HttpRequest.method("PUT")
    .url(jurnalUmumEndpoint.update(id))
    .body(data)
    .send();
};

export const jurnalUmumDelete = async (id) => {
  return await HttpRequest.method("DELETE")
    .url(jurnalUmumEndpoint.delete(id))
    .send();
};
