const menu = [
  {
    target: '/dashboard',
    label: 'Dashboard',
    icon: 'menu-icon flaticon2-architecture-and-city',
    component: import('@/pages/Dashboard.vue')
  },
  // Keanggotaan
  {
    target: '/keanggotaan',
    label: 'Keanggotaan',
    icon: 'menu-icon far fa-user',
    component: import('@/pages/Keanggotaan'),
    children: [
      {
        target: 'registrasi-anggota',
        label: 'Registrasi Anggota',
        component: import('@/pages/Keanggotaan/RegistrasiAnggota'),
      },
      {
        target: 'registrasi-anggota-rembug',
        label: 'Registrasi Anggota Majelis',
        component: import('@/pages/Keanggotaan/RegistrasiAnggotaRembug.vue'),
      },
      {
        target: 'registrasi-anggota-keluar',
        label: 'Registrasi Anggota Keluar',
        component: import('@/pages/Dummy.vue'),
      },
      {
        target: 'approval-registrasi-keluar',
        label: 'Approval Registrasi Anggota Keluar',
        component: import('@/pages/Dummy.vue'),
      },
      {
        target: 'laporan',
        label: 'Laporan Keanggotaan',
        component: import('@/pages/Keanggotaan'),
        children: [
          {
            target: 'registrasi-anggota',
            label: 'Laporan Registrasi Anggota',
            component: import('@/pages/Keanggotaan/Laporan/RegistrasiAnggota.vue'),
          },
          {
            target: 'profil-anggota',
            label: 'Profil Anggota',
            component: import('@/pages/Keanggotaan/Laporan/ProfilAnggota.vue'),
          },
          {
            target: 'saldo-anggota',
            label: 'Saldo Anggota',
            component: import('@/pages/Keanggotaan/Laporan/SaldoAnggota.vue'),
          },
          {
            target: 'anggota-keluar',
            label: 'Anggota Keluar',
            component: import('@/pages/Dummy.vue'),
          },
        ],
      },
    ]
  },
  // Tabungan
  {
    target: '/tabungan',
    label: 'Tabungan',
    icon: 'menu-icon fas fa-money-check-alt',
    component: import('@/pages/Tabungan'),
    children: [
      {
        target: 'pembukaan-rekening-tabungan',
        label: 'Pembukaan Rekening Tabungan',
        component: import('@/pages/Tabungan/PembukaanRekeningTabungan.vue'),
      },
      {
        target: 'penutupan-rekening-tabungan',
        label: 'Penutupan Rekening Tabungan',
        component: import('@/pages/Dummy.vue'),
      },
      {
        target: 'verifikasi-pencairan-tabungan',
        label: 'Verifikasi Pencairan Tabungan',
        component: import('@/pages/Tabungan/VerifikasiPencairanTabungan.vue'),
      },
      {
        target: 'laporan',
        label: 'Laporan Tabungan',
        component: import('@/pages/Tabungan'),
        children: [
          {
            target: 'pembukaan-rekening-tabungan',
            label: 'Laporan Pembukaan Rekening Tabungan',
            component: import('@/pages/Dummy.vue'),
          },
          {
            target: 'saldo-tabungan',
            label: 'Saldo Tabungan',
            component: import('@/pages/Dummy.vue'),
          },
          {
            target: 'statement-tabungan',
            label: 'Statement Tabungan',
            component: import('@/pages/Dummy.vue'),
          },
          {
            target: 'penutupan-rekening-tabungan',
            label: 'Laporan Penutupan Rekening Tabungan',
            component: import('@/pages/Dummy.vue'),
          },
        ],
      },
    ]
  },
  // Pembiayaan
  {
    target: '/pembiayaan',
    label: 'Pembiayaan',
    icon: 'menu-icon fas fa-wallet',
    component: import('@/pages/Pembiayaan'),
    children: [
      // {
      //   target: 'pengajuan-pembiayaan-old',
      //   label: 'Pengajuan Pembiayaan Old',
      //   component: import('@/pages/Pembiayaan/PengajuanPembiayaan/index.vue'),
      // },
      {
        target: 'pengajuan-pembiayaan',
        label: 'Pengajuan Pembiayaan',
        component: import('@/pages/Pembiayaan/PengajuanPembiayaan.vue'),
      },
      {
        target: 'update-status-komite',
        label: 'Update Status Komite',
        component: import('@/pages/Pembiayaan/UpdateStatusPengajuan.vue'),
      },
      // {
      //   target: 'registrasi-akad-old',
      //   label: 'Registrasi Akad Old',
      //   component: import('@/pages/Pembiayaan/RegistrasiAkad/index.vue'),
      // },
      {
        target: 'registrasi-akad',
        label: 'Registrasi Akad',
        component: import('@/pages/Pembiayaan/RegistrasiAkad.vue'),
      },
      {
        target: 'verifikasi-akad',
        label: 'Pencairan',
        component: import('@/pages/Pembiayaan/VerifikasiAkad.vue'),
      },
      {
        target: 'cetak-akad',
        label: 'Cetak Akad',
        component: import('@/pages/Dummy.vue'),
      },
      /*
      {
        target: 'pencairan',
        label: 'Pencairan',
        component: import('@/pages/Dummy.vue'),
      },
      */
      {
        target: 'laporan',
        label: 'Laporan',
        component: import('@/pages/Pembiayaan'),
        children: [
          {
            target: 'pengajuan-pembiayaan',
            label: 'Laporan Pengajuan Pembiayaan',
            component: import('@/pages/Pembiayaan/Laporan/PengajuanPembiayaan.vue'),
          },
          {
            target: 'registrasi-akad',
            label: 'Laporan Registrasi Akad',
            component: import('@/pages/Pembiayaan/Laporan/LaporanRegistrasiAkad.vue'),
          },
          {
            target: 'pencairan',
            label: 'Laporan Pencairan Pembiayaan',
            component: import('@/pages/Pembiayaan/Laporan/LaporanPencairanPembiayaan.vue'),
          },
          {
            target: 'kartu-angsuran',
            label: 'Kartu Angsuran',
            component: import('@/pages/Pembiayaan/Laporan/LaporanKartuAngsuran.vue'),
          },
          {
            target: 'list-outstanding',
            label: 'Laporan Outstanding',
            component: import('@/pages/Pembiayaan/Laporan/LaporanOutstanding.vue'),
          },
          {
            target: 'list-penerimaan-angsuran',
            label: 'Laporan Penerimaaan Angsuran',
            component: import('@/pages/Pembiayaan/Laporan/LaporanPenerimaanAngsuran.vue'),
          },
          {
            target: 'list-pelunasan',
            label: 'List Pelunasan',
            component: import('@/pages/Dummy.vue'),
          },
          {
            target: 'par-kolektibilitas',
            label: 'PAR/ Kolektibilitas',
            component: import('@/pages/Dummy.vue'),
          },
        ],
      },
    ]
  },
  // Transaksi
  {
    target: '/transaksi',
    label: 'Transaksi',
    icon: 'menu-icon fas fa-random',
    component: import('@/pages/Transaksi'),
    children: [
      {
        target: 'transaksi-rembug',
        label: 'Transaksi Majelis',
        component: import('@/pages/Dummy.vue'),
      },
      {
        target: 'verifikasi-transaksi-rembug',
        label: 'Verifikasi Transaksi Majelis',
        component: import('@/pages/Transaksi/VerifikasiTransaksiRembug.vue'),
      },
      {
        target: 'transaksi-kas-petugas',
        label: 'Transaksi Kas Petugas',
        component: import('@/pages/Transaksi/TransaksiKasPetugas.vue'),
      },
      {
        target: 'verifikasi-transaksi-kas-petugas',
        label: 'Verifikasi Transaksi Kas Petugas',
        component: import('@/pages/Dummy.vue'),
      },
      {
        target: 'transaksi-jurnal',
        label: 'Transaksi Jurnal Umum',
        component: import('@/pages/Transaksi/TransaksiJurnalUmum.vue'),
      },
      {
        target: 'verifikasi-transaksi-jurnal',
        label: 'Verifikasi Transaksi Jurnal',
        component: import('@/pages/Dummy.vue'),
      },
      {
        target: 'laporan',
        label: 'Laporan Transaksi',
        component: import('@/pages/Transaksi'),
        children: [
          {
            target: 'transaksi-rembug',
            label: 'Laporan Transaksi Majelis',
            component: import('@/pages/Transaksi/Laporan/LaporanTransaksiMajelis'),
          },
          {
            target: 'transaksi-kas-petugas',
            label: 'Laporan Transaksi Kas Petugas',
            component: import('@/pages/Transaksi/Laporan/LaporanTransaksiKasPetugas'),
          },
          {
            target: 'jurnal-transaksi',
            label: ' Laporan Jurnal Transaksi',
            component: import('@/pages/Transaksi/Laporan/LaporanTransaksiJurnal.vue'),
          }
        ]
      },
    ]
  },
  // Keuangan
  {
    target: '/laporan-keuangan',
    label: 'Laporan Keuangan',
    icon: 'menu-icon fas fa-coins',
    component: import('@/pages/Keuangan'),
    children: [
      {
        target: 'laporan-cash-flow',
        label: 'Laporan Cash Flow',
        component: import('@/pages/Dummy.vue'),
      },
      {
        target: 'laporan-jurnal-transaksi',
        label: 'Laporan Jurnal Transaksi',
        component: import('@/pages/Dummy.vue'),
      },
      {
        target: 'laporan-buku-besar',
        label: 'Laporan Buku Besar',
        component: import('@/pages/Keuangan/LaporanBukuBesar.vue'),
      },
      {
        target: 'laporan-neraca-saldo',
        label: 'Laporan Neraca Saldo',
        component: import('@/pages/Dummy.vue'),
      },
      {
        target: 'laporan-nreaca',
        label: 'Laporan Neraca',
        component: import('@/pages/Dummy.vue'),
      },
      {
        target: 'laporan-labarugi',
        label: 'Laporan Laba Rugi',
        component: import('@/pages/Dummy.vue'),
      },
    ]
  },
  // Pengaturan
  {
    target: '/pengaturan',
    label: 'Pengaturan',
    icon: 'menu-icon fas fa-cogs',
    component: import('@/pages/Pengaturan'),
    children: [
      {
        target: 'pengguna',
        label: 'Pengguna',
        component: import('@/pages/Pengaturan/Pengguna'),
      },
      {
        target: 'grup-pengguna',
        label: 'Grup Pengguna',
        component: import('@/pages/Dummy.vue'),
      },
      {
        target: 'menu',
        label: 'Menu',
        component: import('@/pages/Dummy.vue'),
      },
      {
        target: 'master-data',
        label: 'Master Data',
        component: import('@/pages/Pengaturan/MasterData'),
        children: [
          {
            target: 'gl',
            label: 'Gl',
            component: import('@/pages/Pengaturan/MasterData/Gl'),
          },
          {
            target: 'kategori-par',
            label: 'Kategori PAR',
            component: import('@/pages/Pengaturan/MasterData/KategoriPar'),
          },
          {
            target: 'list-kode',
            label: 'List Kode',
            component: import('@/pages/Pengaturan/MasterData/ListKode'),
          },
          {
            target: 'produk-pembiayaan',
            label: 'Produk Pembiayaan',
            component: import('@/pages/Pengaturan/MasterData/ProdukPembiayaan'),
          },
          {
            target: 'produk-tabungan',
            label: 'Produk Tabungan',
            component: import('@/pages/Pengaturan/MasterData/ProdukTabungan'),
          },
          {
            target: 'produk-deposito',
            label: 'Produk Deposito',
            component: import('@/pages/Pengaturan/MasterData/ProdukDeposito'),
          },
          {
            target: 'pegawai',
            label: 'Pegawai',
            component: import('@/pages/Pengaturan/MasterData/Pegawai'),
          },
          {
            target: 'rembug',
            label: 'Majelis',
            component: import('@/pages/Pengaturan/MasterData/Rembug'),
          },
          {
            target: 'lembaga',
            label: 'Lembaga',
            component: import('@/pages/Pengaturan/MasterData/Lembaga'),
          },
          {
            target: 'cabang',
            label: 'Cabang',
            component: import('@/pages/Pengaturan/MasterData/Cabang'),
          },
          {
            target: 'desa',
            label: 'Desa',
            component: import('@/pages/Pengaturan/MasterData/Desa'),
          },
          {
            target: 'kecamatan',
            label: 'Kecamatan',
            component: import('@/pages/Pengaturan/MasterData/Kecamatan'),
          },
          {
            target: 'kota-kabupaten',
            label: 'Kota Kabupaten',
            component: import('@/pages/Pengaturan/MasterData/KotaKabupaten'),
          },
        ]
      }
    ]
  },
]
export default menu