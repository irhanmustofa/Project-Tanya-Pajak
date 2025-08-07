import HttpRequest from "@/api/http-request";
import { base_url } from "@/api/http-endpoints";

export const saldoAwalEndpoint = {
  import: `${base_url}/saldo-awal/import`,
  buku: `${base_url}/saldo-awal/buku`,
  jurnal: `${base_url}/saldo-awal/jurnal`,
  bukuById: (id) => `${base_url}/saldo-awal/buku/${id}`,
  jurnalById: (id) => `${base_url}/saldo-awal/jurnal/${id}`,
  create: `${base_url}/saldo-awal`,
  update: (id) => `${base_url}/saldo-awal/${id}`,
  delete: (id) => `${base_url}/saldo-awal/${id}`,
};

export const saldoAwalImport = async (data) => {
  return await HttpRequest.method("POST")
    .url(saldoAwalEndpoint.import)
    .body(data)
    .send();
};

export const saldoAwalGetBuku = async () => {
  return await HttpRequest.method("GET").url(saldoAwalEndpoint.buku).send();
};

export const saldoAwalGetJurnal = async () => {
  return await HttpRequest.method("GET").url(saldoAwalEndpoint.jurnal).send();
};

export const saldoAwalGetBukuById = async (id) => {
  return await HttpRequest.method("GET")
    .url(saldoAwalEndpoint.bukuById(id))
    .send();
};

export const saldoAwalGetJurnalById = async (id) => {
  const result = await HttpRequest.method("GET")
    .url(saldoAwalEndpoint.jurnalById(id))
    .send();
  console.log("saldoAwalGetJurnalById result", result);
  return result;
};

export const saldoAwalCreate = async (data) => {
  return await HttpRequest.method("POST")
    .url(saldoAwalEndpoint.create)
    .body(data)
    .send();
};

export const saldoAwalUpdate = async (id, data) => {
  return await HttpRequest.method("PUT")
    .url(saldoAwalEndpoint.update(id))
    .body(data)
    .send();
};

export const saldoAwalDelete = async (id) => {
  return await HttpRequest.method("DELETE")
    .url(saldoAwalEndpoint.delete(id))
    .send();
};
