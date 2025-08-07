const jenisAsset = [
  { code: 0, name: 'Asset Disusutkan' },
  { code: 1, name: 'Asset Tidak Disusutkan' },
]

const kategoriAsset = [
  { code: 0, name: 'Bangunan' },
  { code: 1, name: 'Bukan Bangunan' },
  { code: 2, name: 'Tanah' },
]

const golonganAsset = [
  { code: 0, name: 'Bangunan Permanen' },
  { code: 1, name: 'Kelompok 1' },
  { code: 2, name: 'Kelompok 2' },
  { code: 3, name: 'Tanah' },
]

const metodePenyusutan = [
  { code: 0, name: 'Garis Lurus' },
  { code: 1, name: 'Saldo Menurun' }
]

const jenisHarta = [
  { name: 'Perlengkapan kantor', code: 'D-01' },
  { name: 'Komputer Hardware & Software', code: 'D-02' },
  { name: 'Mebel & Furnitures', code: 'D-03' },
  { name: 'Kendaraan', code: 'D-04' },
  { name: 'Peralatan Kantor', code: 'D-05' },
  { name: 'Peralatan Dapur', code: 'D-06' },
  { name: 'Mesin', code: 'D-07' },
  { name: 'Bangunan', code: 'D-08' },
  { name: 'Tanah', code: 'ND-02' },
  { name: 'Lainnya', code: 'ND-01' },
];

const assetSetting = {
  jenisAsset,
  kategoriAsset,
  golonganAsset,
  metodePenyusutan,
  jenisHarta,
}

export default assetSetting;