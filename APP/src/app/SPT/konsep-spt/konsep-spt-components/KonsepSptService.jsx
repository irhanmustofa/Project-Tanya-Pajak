import HttpRequest from "@/api/http-request";
import { base_url } from "@/api/http-endpoints";
import { useLocalStorage } from "@/hooks/use-local-storage";

export const konsepSptEndpoint = {
  all: `${base_url}/spt`,
  create: `${base_url}/spt`,
  deleteSome: `${base_url}/spt/delete`,
  get: (id) => `${base_url}/spt/${id}`,
  update: (id) => `${base_url}/spt/${id}`,
  delete: (id) => `${base_url}/spt/${id}`,
};

export const sptAll = async () => {
  // buatkan data dummy untuk testing
  const dataAll = {
    success: true,
    data: [
      {
        id: 1,
        nama_jenis_dokumen: "SPT",
        nomor_dokumen: "123456",
        nik_npwp: "1234567890",
        paspor: "1234567890",
      },
    ],
  };

  return dataAll;
};

export const sptFirst = async (id) => {
  try {
    const request = await HttpRequest.method("GET")
      .url(konsepSptEndpoint.get(id))
      .send();

    return request;
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const sptCreate = async (data) => {
  try {
    const request = await HttpRequest.method("POST")
      .url(konsepSptEndpoint.create)
      .body(data)
      .headers({
        clientid: useLocalStorage.get("clientId"),
      })
      .send();

    return request;
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const sptUpdate = async (id, data) => {
  try {
    const request = await HttpRequest.method("PUT")
      .url(konsepSptEndpoint.update(id))
      .body(data)
      .headers({
        clientid: useLocalStorage.get("clientId"),
      })
      .send();

    return request;
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};
