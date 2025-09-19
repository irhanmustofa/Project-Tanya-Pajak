import Axios from "axios";

export default async function provinceReq(setValue) {
  return await Axios.get("https://wilayah.id/api/provinces.json")
    .then((res) => {
      if (res.status == 200) {
        setValue(res.data.data);
      }
    })
    .catch((err) => {
      console.log("err:", err);
    });
}

export async function regencyReq(setValue, province) {
  return await Axios.get(`https://wilayah.id/api/regencies/${province}.json`)
    .then((res) => {
      if (res.status == 200) {
        setValue(res.data.data);
      }
    })
    .catch((err) => {
      console.log("err:", err);
    });
}

export async function districtReq(setValue, regency) {
  return await Axios.get(`https://wilayah.id/api/districts/${regency}.json`)
    .then((res) => {
      if (res.status == 200) {
        setValue(res.data.data);
      }
    })
    .catch((err) => {
      console.log("err:", err);
    });
}

export async function villageReq(setValue, district) {
  return await Axios.get(`https://wilayah.id/api/villages/${district}.json`)
    .then((res) => {
      if (res.status == 200) {
        setValue(res.data.data);
      }
    })
    .catch((err) => {
      console.log("err:", err);
    });
}
