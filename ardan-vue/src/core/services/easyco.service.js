import axios from "axios";
axios.defaults.baseURL = "https://easyco.kopikoding.com/api/api/";

const easycoApi = {
  login(payload) {
    let url = "authenticate/login";
    return axios.post(url, payload);
  },
  anggotaCreate(payload, token) {
    let url = "anggota/create";
    let config = {
      headers: {
        token: token,
      },
    };
    return axios.post(url, payload, config);
  },
  anggotaRead(payload, token) {
    let url = "anggota/read";
    let config = {
      headers: {
        token: token,
      },
    };
    return axios.post(url, payload, config);
  },
  anggotaUpdate(payload, token) {
    let url = "anggota/update";
    let config = {
      headers: {
        token: token,
      },
    };
    return axios.post(url, payload, config);
  },
  anggotaDelete(payload, token) {
    let url = "anggota/delete/" + payload;
    let config = {
      headers: {
        token: token,
      },
    };
    return axios.get(url, config);
  },
  anggotaDetail(payload, token) {
    let url = "anggota/detail/" + payload;
    let config = {
      headers: {
        token: token,
      },
    };
    return axios.get(url, config);
  },
  anggotaSimpanan(token) {
    let url = "anggota/simpanan_anggota";
    let config = {
      headers: {
        token: token,
      },
    };
    return axios.get(url, config);
  },
  anggotaRembug(payload, token) {
    let url = "anggota/rembug";
    let config = {
      headers: {
        token: token,
      },
    };
    return axios.post(url, payload, config);
  },

  // laporan excel
  anggotaExcel(payload, token) {
    let url =
      "laporan/list/excel/anggota_masuk?"+payload;
    let config = {
      headers: {
        token: token,
      },
      responseType: 'blob'
    };
    return axios.get(url, config);
  },
  saldoAnggotaExcel(payload, token) {
    let url =
      "laporan/list/excel/saldo_anggota?"+payload;
    let config = {
      headers: {
        token: token,
      },
      responseType: 'blob'
    };
    return axios.get(url, config);
  },
  pengajuanPembiayaanExcel(payload, token) {
    let url =
      "laporan/list/excel/pengajuan?"+payload;
    let config = {
      headers: {
        token: token,
      },
      responseType: 'blob'
    };
    return axios.get(url, config);
  },
  pencairanPembiayaanExcel(payload, token) {
    let url =
      "laporan/list/excel/pencairan?"+payload;
    let config = {
      headers: {
        token: token,
      },
      responseType: 'blob'
    };
    return axios.get(url, config);
  },
  outstandingPembiayaanExcel(payload, token) {
    let url =
      "laporan/list/excel/saldo_outstanding?"+payload;
    let config = {
      headers: {
        token: token,
      },
      responseType: 'blob'
    };
    return axios.get(url, config);
  },
  registrasiAkadExcel(payload, token) {
    let url =
      "laporan/list/excel/regis_akad?"+payload;
    let config = {
      headers: {
        token: token,
      },
      responseType: 'blob'
    };
    return axios.get(url, config);
  },
  kasPetugasExcel(payload, token){
    let url = "laporan/list/excel/kas_petugas?"+payload;
    let config = {
      headers: {
        token: token,
      },
      responseType: 'blob'
    };
    return axios.get(url, config);
  },
  jurnalTransaksiExcel(payload, token){
    let url = "laporan/list/excel/jurnal_transaksi?"+payload;
    let config = {
      headers: {
        token: token,
      },
      responseType: 'blob'
    };
    return axios.get(url, config);
  },
  kartuAngsuranExcel(payload, token){
    let url = "laporan/list/excel/kartu_angsuran?"+payload;
    let config = {
      headers: {
        token: token,
      },
      responseType: 'blob'
    };
    return axios.get(url, config);
  },

  // laporan csv
  anggotaCsv(payload, token) {
    let url =
      "laporan/list/csv/anggota_masuk?"+payload;
    let config = {
      headers: {
        token: token,
      },
      responseType: 'blob'
    };
    return axios.get(url, config);
  },
  saldoAnggotaCsv(payload, token) {
    let url =
      "laporan/list/csv/saldo_anggota?"+payload;
    let config = {
      headers: {
        token: token,
      },
      responseType: 'blob'
    };
    return axios.get(url, config);
  },
  pengajuanPembiayaanCsv(payload, token) {
    let url =
      "laporan/list/csv/pengajuan?"+payload;
    let config = {
      headers: {
        token: token,
      },
      responseType: 'blob'
    };
    return axios.get(url, config);
  },
  pencairanPembiayaanCsv(payload, token) {
    let url =
      "laporan/list/csv/pencairan?"+payload;
    let config = {
      headers: {
        token: token,
      },
      responseType: 'blob'
    };
    return axios.get(url, config);
  },
  outstandingPembiayaanCsv(payload, token) {
    let url =
      "laporan/list/csv/saldo_outstanding?"+payload;
    let config = {
      headers: {
        token: token,
      },
      responseType: 'blob'
    };
    return axios.get(url, config);
  },
  registrasiAkadCsv(payload, token) {
    let url =
      "laporan/list/csv/regis_akad?"+payload;
    let config = {
      headers: {
        token: token,
      },
      responseType: 'blob'
    };
    return axios.get(url, config);
  },
  kasPetugasCsv(payload, token){
    let url = "laporan/list/csv/kas_petugas?"+payload;
    let config = {
      headers: {
        token: token,
      },
      responseType: 'blob'
    };
    return axios.get(url, config);
  },
  kartuAngsuranCsv(payload, token){
    let url = "laporan/list/csv/kartu_angsuran?"+payload;
    let config = {
      headers: {
        token: token,
      },
      responseType: 'blob'
    };
    return axios.get(url, config);
  },

  // Petugas
  petugasRead(payload, token) {
    let url = "pengajuan/fa";
    let config = {
      headers: {
        token: token,
      },
    };
    return axios.post(url, payload, config);
  },
  // Peruntukan
  peruntukanRead(payload, token) {
    let url = "pengajuan/peruntukan";
    let config = {
      headers: {
        token: token,
      },
    };
    return axios.post(url, payload, config);
  },
  // Cabang
  cabangRead(payload, token) {
    let url = "cabang/read";
    let config = {
      headers: {
        token: token,
      },
    };
    return axios.post(url, payload, config);
  },
  // Pengajuan Pembiayaan
  pengajuanAnggotaRead(payload, token) {
    let url = "pengajuan/member";
    let config = {
      headers: {
        token: token,
      },
    };
    return axios.post(url, payload, config);
  },
  pengajuanPembiayaanCreate(payload, token) {
    let url = "pengajuan/create";
    let config = {
      headers: {
        token: token,
      },
    };
    return axios.post(url, payload, config);
  },
  pengajuanRead(payload, token) {
    let url = "pengajuan/read";
    let config = {
      headers: {
        token: token,
      },
    };
    return axios.post(url, payload, config);
  },
  pengajuanUpdate(payload, token) {
    let url = "pengajuan/update";
    let config = {
      headers: {
        token: token,
      },
    };
    return axios.post(url, payload, config);
  },
  pengajuanDetail(payload, token) {
    let url = "pengajuan/detail" + payload;
    let config = {
      headers: {
        token: token,
      },
    };
    return axios.get(url, config);
  },
  pengajuanDelete(payload, token) {
    let url = "pengajuan/delete" + payload;
    let config = {
      headers: {
        token: token,
      },
    };
    return axios.get(url, config);
  },
  // Registrasi Akad
  regisAkadRead(payload, token) {
    let url = "registrasiakad/read";
    let config = {
      headers: {
        token: token,
      },
    };
    return axios.post(url, payload, config);
  },
  regisAkadCreate(payload, token) {
    let url = "registrasiakad/create";
    let config = {
      headers: {
        token: token,
      },
    };
    return axios.post(url, payload, config);
  },
  regisAkadReadDetail(payload, token) {
    let url = "registrasiakad/detail" + payload;
    let config = {
      headers: {
        token: token,
      },
    };
    return axios.get(url, config);
  },
  regisAkadUpdate(payload, token) {
    let url = "registrasiakad/update";
    let config = {
      headers: {
        token: token,
      },
    };
    return axios.post(url, payload, config);
  },
  pembiayaanGetRembug(payload, token) {
    let url = "registrasiakad/rembug";
    let config = {
      headers: {
        token: token,
      },
    };
    return axios.post(url, payload, config);
  },
  PembiayaanGetPengajuan(payload, token) {
    let url = "registrasiakad/pengajuan";
    let config = {
      headers: {
        token: token,
      },
    };
    return axios.post(url, payload, config);
  },
  PembiayaanGetPeruntukan(payload, token) {
    let url = "registrasiakad/peruntukan";
    let config = {
      headers: {
        token: token,
      },
    };
    return axios.post(url, payload, config);
  },
  pembiayaanGetProduk(payload, token) {
    let url = "registrasiakad/product";
    let config = {
      headers: {
        token: token,
      },
    };
    return axios.post(url, payload, config);
  },
  pembiayaanGetKreditur(payload, token) {
    let url = "registrasiakad/kreditur";
    let config = {
      headers: {
        token: token,
      },
    };
    return axios.post(url, payload, config);
  },
  updateKomite(payload, token) {
    let url = "pengajuan/update_komite";
    let config = {
      headers: {
        token: token,
      },
    };
    return axios.post(url, payload, config);
  },
  // Keanggotaan
  keanggotaanGetSimpananAnggota(payload, token) {
    let url = "anggota/simpanan_anggota";
    let config = {
      headers: {
        token: token,
      },
    };
    return axios.get(url, config);
  },
  // Verifikasi Akad
  detailVerifikasiAkad(payload, token) {
    let url = "registrasiakad/detail?id=" + payload;
    let config = {
      headers: {
        token: token,
      },
    };
    return axios.get(url, config);
  },
  verifikasiAkadApprove(payload, token) {
    let url = "registrasiakad/approve";
    let config = {
      headers: {
        token: token,
      },
    };
    return axios.post(url, payload, config);
  },
  verifikasiAkadReject(payload, token) {
    let url = "registrasiakad/reject" + payload;
    let config = {
      headers: {
        token: token,
      },
    };
    return axios.get(url, config);
  },
  penerimaanAngsuran(payload, token) {
    let url = "trx_member/penerimaan_angsuran";
    let config = {
      headers: {
        token: token,
      },
    };
    return axios.post(url, payload, config);
  },
  transaksiRembug(payload, token) {
    let url = "trx_member/transaksi_majelis";
    let config = {
      headers: {
        token: token,
      },
    };
    return axios.post(url, payload, config);
  },
  // cabang
  cabangRead(payload, token) {
    let url = "cabang/read";
    let config = {
      headers: {
        token: token,
      },
    };
    return axios.post(url, payload, config);
  },
  cabangDetail(payload, token) {
    let url = "cabang/detail?" + payload;
    let config = {
      headers: {
        token: token,
      },
    };
    return axios.get(url, config);
  },
  cabangCreate(payload, token) {
    let url = "cabang/create";
    let config = {
      headers: {
        token: token,
      },
    };
    return axios.post(url, payload, config);
  },
  cabangUpdate(payload, token) {
    let url = "cabang/update";
    let config = {
      headers: {
        token: token,
      },
    };
    return axios.post(url, payload, config);
  },
  cabangDelete(payload, token) {
    let url = "cabang/delete?" + payload;
    let config = {
      headers: {
        token: token,
      },
    };
    return axios.get(url, config);
  },
  // rembug
  rembugRead(payload, token) {
    let url = "rembug/read";
    let config = {
      headers: {
        token: token,
      },
    };
    return axios.post(url, payload, config);
  },
  rembugDetail(payload, token) {
    let url = "rembug/detail?" + payload;
    let config = {
      headers: {
        token: token,
      },
    };
    return axios.get(url, config);
  },
  rembugCreate(payload, token) {
    let url = "rembug/create";
    let config = {
      headers: {
        token: token,
      },
    };
    return axios.post(url, payload, config);
  },
  rembugUpdate(payload, token) {
    let url = "rembug/update";
    let config = {
      headers: {
        token: token,
      },
    };
    return axios.post(url, payload, config);
  },
  rembugDelete(payload, token) {
    let url = "rembug/delete?" + payload;
    let config = {
      headers: {
        token: token,
      },
    };
    return axios.get(url, config);
  },
  // Produk Tabungan
  prdtabunganRead(payload, token) {
    let url = "prdtabungan/read";
    let config = {
      headers: {
        token: token,
      },
    };
    return axios.post(url, payload, config);
  },
  prdtabunganDetail(payload, token) {
    let url = "prdtabungan/detail?" + payload;
    let config = {
      headers: {
        token: token,
      },
    };
    return axios.get(url, config);
  },
  prdtabunganCreate(payload, token) {
    let url = "prdtabungan/create";
    let config = {
      headers: {
        token: token,
      },
    };
    return axios.post(url, payload, config);
  },
  prdtabunganUpdate(payload, token) {
    let url = "prdtabungan/update";
    let config = {
      headers: {
        token: token,
      },
    };
    return axios.post(url, payload, config);
  },
  prdtabunganDelete(payload, token) {
    let url = "prdtabungan/delete?" + payload;
    let config = {
      headers: {
        token: token,
      },
    };
    return axios.get(url, config);
  },
  // Produk Pembiayaan
  prdpembiayaanRead(payload, token) {
    let url = "prdpembiayaan/read";
    let config = {
      headers: {
        token: token,
      },
    };
    return axios.post(url, payload, config);
  },
  prdpembiayaanDetail(payload, token) {
    let url = "prdpembiayaan/detail?" + payload;
    let config = {
      headers: {
        token: token,
      },
    };
    return axios.get(url, config);
  },
  prdpembiayaanCreate(payload, token) {
    let url = "prdpembiayaan/create";
    let config = {
      headers: {
        token: token,
      },
    };
    return axios.post(url, payload, config);
  },
  prdpembiayaanUpdate(payload, token) {
    let url = "prdpembiayaan/update";
    let config = {
      headers: {
        token: token,
      },
    };
    return axios.post(url, payload, config);
  },
  prdpembiayaanDelete(payload, token) {
    let url = "prdpembiayaan/delete?" + payload;
    let config = {
      headers: {
        token: token,
      },
    };
    return axios.get(url, config);
  },
  // Produk Deposito
  prddepositoRead(payload, token) {
    let url = "prddeposito/read";
    let config = {
      headers: {
        token: token,
      },
    };
    return axios.post(url, payload, config);
  },
  prddepositoDetail(payload, token) {
    let url = "prddeposito/detail?" + payload;
    let config = {
      headers: {
        token: token,
      },
    };
    return axios.get(url, config);
  },
  prddepositoCreate(payload, token) {
    let url = "prddeposito/create";
    let config = {
      headers: {
        token: token,
      },
    };
    return axios.post(url, payload, config);
  },
  prddepositoUpdate(payload, token) {
    let url = "prddeposito/update";
    let config = {
      headers: {
        token: token,
      },
    };
    return axios.post(url, payload, config);
  },
  prddepositoDelete(payload, token) {
    let url = "prddeposito/delete?" + payload;
    let config = {
      headers: {
        token: token,
      },
    };
    return axios.get(url, config);
  },
  // LEMBAGA
  lembagaRead(payload, token) {
    let url = "lembaga/read";
    let config = {
      headers: {
        token: token,
      },
    };
    return axios.post(url, payload, config);
  },
  lembagaDetail(payload, token) {
    let url = "lembaga/detail?" + payload;
    let config = {
      headers: {
        token: token,
      },
    };
    return axios.get(url, config);
  },
  lembagaCreate(payload, token) {
    let url = "lembaga/create";
    let config = {
      headers: {
        token: token,
      },
    };
    return axios.post(url, payload, config);
  },
  lembagaUpdate(payload, token) {
    let url = "lembaga/update";
    let config = {
      headers: {
        token: token,
      },
    };
    return axios.post(url, payload, config);
  },
  lembagaDelete(payload, token) {
    let url = "lembaga/delete?" + payload;
    let config = {
      headers: {
        token: token,
      },
    };
    return axios.get(url, config);
  },
  // PEGAWAI
  pegawaiGenerate(payload, token) {
    let url = "pegawai/generate";
    let config = {
      headers: {
        token: token,
      },
    };
    return axios.post(url, payload, config);
  },
  pegawaiRead(payload, token) {
    let url = "pegawai/read";
    let config = {
      headers: {
        token: token,
      },
    };
    return axios.post(url, payload, config);
  },
  pegawaiDetail(payload, token) {
    let url = "pegawai/detail?" + payload;
    let config = {
      headers: {
        token: token,
      },
    };
    return axios.get(url, config);
  },
  pegawaiCreate(payload, token) {
    let url = "pegawai/create";
    let config = {
      headers: {
        token: token,
      },
    };
    return axios.post(url, payload, config);
  },
  pegawaiUpdate(payload, token) {
    let url = "pegawai/update";
    let config = {
      headers: {
        token: token,
      },
    };
    return axios.post(url, payload, config);
  },
  pegawaiDelete(payload, token) {
    let url = "pegawai/delete?" + payload;
    let config = {
      headers: {
        token: token,
      },
    };
    return axios.get(url, config);
  },
  // GL
  glRead(payload, token) {
    let url = "gl/read";
    let config = {
      headers: {
        token: token,
      },
    };
    return axios.post(url, payload, config);
  },
  glDetail(payload, token) {
    let url = "gl/detail?" + payload;
    let config = {
      headers: {
        token: token,
      },
    };
    return axios.get(url, config);
  },
  glCreate(payload, token) {
    let url = "gl/create";
    let config = {
      headers: {
        token: token,
      },
    };
    return axios.post(url, payload, config);
  },
  glUpdate(payload, token) {
    let url = "gl/update";
    let config = {
      headers: {
        token: token,
      },
    };
    return axios.post(url, payload, config);
  },
  glDelete(payload, token) {
    let url = "gl/delete?" + payload;
    let config = {
      headers: {
        token: token,
      },
    };
    return axios.get(url, config);
  },
  // KATEGORI PAR
  katgoriparRead(payload, token) {
    let url = "katgoripar/read";
    let config = {
      headers: {
        token: token,
      },
    };
    return axios.post(url, payload, config);
  },
  katgoriparDetail(payload, token) {
    let url = "katgoripar/detail?" + payload;
    let config = {
      headers: {
        token: token,
      },
    };
    return axios.get(url, config);
  },
  katgoriparCreate(payload, token) {
    let url = "katgoripar/create";
    let config = {
      headers: {
        token: token,
      },
    };
    return axios.post(url, payload, config);
  },
  katgoriparUpdate(payload, token) {
    let url = "katgoripar/update";
    let config = {
      headers: {
        token: token,
      },
    };
    return axios.post(url, payload, config);
  },
  katgoriparDelete(payload, token) {
    let url = "katgoripar/delete?" + payload;
    let config = {
      headers: {
        token: token,
      },
    };
    return axios.get(url, config);
  },
  // LIST KODE
  listkodeRead(payload, token) {
    let url = "listkode/read";
    let config = {
      headers: {
        token: token,
      },
    };
    return axios.post(url, payload, config);
  },
  listkodeDetail(payload, token) {
    let url = "listkode/detail?" + payload;
    let config = {
      headers: {
        token: token,
      },
    };
    return axios.get(url, config);
  },
  listkodeCreate(payload, token) {
    let url = "listkode/create";
    let config = {
      headers: {
        token: token,
      },
    };
    return axios.post(url, payload, config);
  },
  listkodeUpdate(payload, token) {
    let url = "listkode/update";
    let config = {
      headers: {
        token: token,
      },
    };
    return axios.post(url, payload, config);
  },
  listkodeDelete(payload, token) {
    let url = "listkode/delete?" + payload;
    let config = {
      headers: {
        token: token,
      },
    };
    return axios.get(url, config);
  },
  // kotakab
  kotakabRead(payload, token) {
    let url = "kotakab/read";
    let config = {
      headers: {
        token: token,
      },
    };
    return axios.post(url, payload, config);
  },
  kotakabDetail(payload, token) {
    let url = "kotakab/detail?" + payload;
    let config = {
      headers: {
        token: token,
      },
    };
    return axios.get(url, config);
  },
  kotakabCreate(payload, token) {
    let url = "kotakab/create";
    let config = {
      headers: {
        token: token,
      },
    };
    return axios.post(url, payload, config);
  },
  kotakabUpdate(payload, token) {
    let url = "kotakab/update";
    let config = {
      headers: {
        token: token,
      },
    };
    return axios.post(url, payload, config);
  },
  kotakabDelete(payload, token) {
    let url = "kotakab/delete?" + payload;
    let config = {
      headers: {
        token: token,
      },
    };
    return axios.get(url, config);
  },
  // kecamatan
  kecamatanRead(payload, token) {
    let url = "kecamatan/read";
    let config = {
      headers: {
        token: token,
      },
    };
    return axios.post(url, payload, config);
  },
  kecamatanDetail(payload, token) {
    let url = "kecamatan/detail?" + payload;
    let config = {
      headers: {
        token: token,
      },
    };
    return axios.get(url, config);
  },
  kecamatanCreate(payload, token) {
    let url = "kecamatan/create";
    let config = {
      headers: {
        token: token,
      },
    };
    return axios.post(url, payload, config);
  },
  kecamatanUpdate(payload, token) {
    let url = "kecamatan/update";
    let config = {
      headers: {
        token: token,
      },
    };
    return axios.post(url, payload, config);
  },
  kecamatanDelete(payload, token) {
    let url = "kecamatan/delete?" + payload;
    let config = {
      headers: {
        token: token,
      },
    };
    return axios.get(url, config);
  },
  kecamatanGenerate(payload, token) {
    let url = "kecamatan/generate";
    let config = {
      headers: {
        token: token,
      },
    };
    return axios.post(url, payload, config);
  },
  // desa
  desaRead(payload, token) {
    let url = "desa/read";
    let config = {
      headers: {
        token: token,
      },
    };
    return axios.post(url, payload, config);
  },
  desaDetail(payload, token) {
    let url = "desa/detail?" + payload;
    let config = {
      headers: {
        token: token,
      },
    };
    return axios.get(url, config);
  },
  desaCreate(payload, token) {
    let url = "desa/create";
    let config = {
      headers: {
        token: token,
      },
    };
    return axios.post(url, payload, config);
  },
  desaUpdate(payload, token) {
    let url = "desa/update";
    let config = {
      headers: {
        token: token,
      },
    };
    return axios.post(url, payload, config);
  },
  desaDelete(payload, token) {
    let url = "desa/delete?" + payload;
    let config = {
      headers: {
        token: token,
      },
    };
    return axios.get(url, config);
  },
  desaGenerate(payload, token) {
    let url = "desa/generate";
    let config = {
      headers: {
        token: token,
      },
    };
    return axios.post(url, payload, config);
  },
  // user
  userRead(payload, token) {
    let url = "user/read";
    let config = {
      headers: {
        token: token,
      },
    };
    return axios.post(url, payload, config);
  },
  userDetail(payload, token) {
    let url = "user/detail?" + payload;
    let config = {
      headers: {
        token: token,
      },
    };
    return axios.get(url, config);
  },
  userCreate(payload, token) {
    let url = "user/create";
    let config = {
      headers: {
        token: token,
      },
    };
    return axios.post(url, payload, config);
  },
  userUpdate(payload, token) {
    let url = "user/update";
    let config = {
      headers: {
        token: token,
      },
    };
    return axios.post(url, payload, config);
  },
  userDelete(payload, token) {
    let url = "user/delete?" + payload;
    let config = {
      headers: {
        token: token,
      },
    };
    return axios.get(url, config);
  },
  // jurnal umum
  jurnalUmumCreate(payload, token) {
    let url = "general_ledger/create";
    let config = {
      headers: {
        token: token,
      },
    };
    return axios.post(url, payload, config);
  },
  // transaksi rembug
  transaksiRembugRead(payload, token) {
    let url = "trx_rembug/read";
    let config = {
      headers: {
        token: token,
      },
    };
    return axios.post(url, payload, config);
  },
  transaksiRembugDetail(payload, token) {
    let url = "trx_rembug/verifikasi";
    let config = {
      headers: {
        token: token,
      },
    };
    return axios.post(url, payload, config);
  },
  transaksiRembugProses(payload, token) {
    let url = "trx_rembug/proses_verifikasi";
    let config = {
      headers: {
        token: token,
      },
    };
    return axios.post(url, payload, config);
  },
  // LAPORAN TRANSAKSI KAS PETUGAS
  kodeKasPetugas(payload, token){
    let url = "kaspetugas/read";
    let config = {
      headers: {
        token: token,
      },
    };
    return axios.post(url, payload, config);
  },
 

  // GET KODE CABANG
  getKodeCabang(payload, token) {
    let url = "cabang/read";
    let config = {
      headers: {
        token: token,
      },
    };
    return axios.post(url, payload, config);
  },
  // GET KODE PEGAWAI
  getKodePegawai(payload, token) {
    let url = "pegawai/generate";
    let config = {
      headers: {
        token: token,
      },
    };
    return axios.post(url, payload, config);
  },
  getTrxKasPetugas(payload, token) {
    let url = "trx_rembug/read_trx_kas_petugas";
    let config = {
      headers: {
        token: token,
      },
    };
    return axios.post(url, payload, config);
  },
  
  laporanProfilAnggota(payload, token) {
    let url = "laporan/list/pdf/profil_anggota";
    let config = {
      headers: {
        token: token,
      },
    };
    return axios.post(url, payload, config);
  },
  
  registrasiTabungan(payload, token) {
    let url = "tabungan/registrasi";
    let config = {
      headers: {
        token: token,
      },
    };
    return axios.post(url, payload, config);
  },

  getVerifikasiPencairan(payload, token) {
    let url = "tabungan/read";
    let config = {
      headers: {
        token: token,
      },
    };
    return axios.post(url, payload, config);
  },

  approveVerifikasiPencairan(payload, token) {
    let url = "tabungan/verifikasi_tutup";
    let config = {
      headers: {
        token: token,
      },
    };
    return axios.post(url, payload, config);
  },
  rejectVerifikasiPencairan(payload, token) {
    let url = "tabungan/reject_tutup";
    let config = {
      headers: {
        token: token,
      },
    };
    return axios.post(url, payload, config);
  },

};
export default easycoApi;