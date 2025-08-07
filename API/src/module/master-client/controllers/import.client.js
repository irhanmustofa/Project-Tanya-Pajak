// import Response, { badRequest } from "../../../app/response.js";
// import Client from "../master-client.entities.js";
// import masterClientModel from "../master-client.model.js";

import Response, { forbidden } from "../../../app/response.js";

export default async function importClient(req, res) {
    //     const clients = req.body;
    //     if (!Array.isArray(clients) || clients.length === 0) {
    //         return Response(res, badRequest({ message: "No clients to import." }));
    //     }
    //     const results = [];
    //     for (const clientData of clients) {
    //         const input = {
    //             group_id: req.headers.groupid,
    //             company_name: clientData.company_name || '',
    //             address_company: clientData.address_company || '',
    //             no_npwp: clientData.no_npwp || '',
    //             no_pkp: clientData.no_pkp || '',
    //             director_name: clientData.director_name || '',
    //             no_ktp_director: clientData.no_ktp_director || '',
    //             address_director: clientData.address_director || '',
    //             rups_akhir_tahun: clientData.rups_akhir_tahun || '',
    //             pengurus: clientData.pengurus || {},
    //             tahun_buku: clientData.tahun_buku || '',
    //             periode_awal: clientData.periode_awal || '',
    //             periode_akhir: clientData.periode_akhir || '',
    //             tanggal_ttd: clientData.tanggal_ttd || '',
    //             tempat_ttd: clientData.tempat_ttd || '',
    //             tarif_pph: clientData.tarif_pph || [],
    //             legalitas_perusahaan: clientData.legalitas_perusahaan || [],
    //             status: 1,
    //         };

    //         const newClient = new Client(input);
    //         if (newClient.errors) {
    //             results.push({ company_name: input.company_name, success: false, message: newClient.errors.join(', ') });
    //             return Response(res, {
    //                 success: false,
    //                 message: newClient.errors.join(', '),
    //                 results
    //             });
    //         }

    //         const existing = await masterClientModel.getClientByCompanyName(input.company_name);
    //         if (existing && existing.success && existing.data.length > 0) {
    //             results.push({ company_name: input.company_name, success: false, message: "Company name already exists." });
    //             continue;
    //         }

    //         try {
    //             await masterClientModel.create(newClient);
    //             results.push({ company_name: input.company_name, success: true, message: "Imported successfully." });
    //         } catch (error) {
    //             results.push({ company_name: input.company_name, success: false, message: error.message });
    //         }
    //     }

    //     return Response(res, {
    //         success: true,
    //         imported: results.filter(r => r.success).length,
    //         failed: results.filter(r => !r.success).length,
    //         results
    //     });
    return Response(res,
        forbidden({
            message: "Service unavailable."
        })
    );
}