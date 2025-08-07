export default function templateJurnal(data) {
  const inputJurnal = {
    buku: data.buku,
    buku_id: data.buku_id,
    voucher: data.voucher,
    tanggal: data.tanggal,
    tahun: data.tahun,
    masa: data.masa,
    vendor: data.vendor,
    keterangan: data.keterangan,
  };

  const jurnalEntries = [];
  let urut = 0;

  // for (let i = 1; i <= 6; i++) {
  //   const amount = data[`amount_${i}`];
  //   if (!amount) continue;

  //   for (let j = 1; j <= 2; j++) {
  //     switch (j) {
  //       case 1:
  //         inputJurnal.urut = urut++;
  //         inputJurnal.kode_akun = data[`akun_debet_${i}`];
  //         inputJurnal.debet = amount;
  //         inputJurnal.credit = 0;
  //         break;
  //       case 2:
  //         inputJurnal.urut = urut++;
  //         inputJurnal.kode_akun = data[`akun_credit_${i}`];
  //         inputJurnal.debet = 0;
  //         inputJurnal.credit = amount;
  //         break;
  //       default:
  //         break;
  //     }

  //     jurnalEntries.push(inputJurnal);
  //   }

  // }

  for (let i = 1; i <= 6; i++) {
    const amount = data[`amount_${i}`];
    if (!amount) continue;

    jurnalEntries.push({
      ...inputJurnal,
      urut: urut++,
      kode_akun: data[`akun_debet_${i}`],
      debet: amount,
      credit: 0,
    });

    jurnalEntries.push({
      ...inputJurnal,
      urut: urut++,
      kode_akun: data[`akun_credit_${i}`],
      debet: 0,
      credit: amount,
    });
  }

  return jurnalEntries;
}
