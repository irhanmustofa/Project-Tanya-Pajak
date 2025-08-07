import { badRequest } from "../../../app/response.js";
import PeriodeLaporan from "../periode-laporan.entities.js";
import PeriodeLaporanRepository from "../periode-laporan.repositories.js";

export async function updatePeriodeLaporan(id, body) {
  const data = new PeriodeLaporan(body);
  if (data.errors && data.errors.length > 0) {
    return badRequest({ message: data.errors.join(", ") });
  }

  return await PeriodeLaporanRepository.update(id, data);
}
