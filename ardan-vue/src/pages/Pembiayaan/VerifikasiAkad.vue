<template>
	<div>
		<h1 class="mb-5">{{ $route.name }}</h1>
		<b-card>
			<b-row no-gutters>
				<b-col cols="12" class="d-flex justify-content-end mb-5 pb-5 border-bottom">
					<!-- <b-button variant="success" @click="$bvModal.show('modal-form')" v-b-tooltip.hover title="Tambah Data Baru">
			  <b-icon icon="plus" />
			  Tambah Baru
			</b-button> -->
				</b-col>
				<b-col cols="12" class="mb-5">
					<b-row no-gutters>
						<b-col cols="6">
							<div class="w-100 max-200 pr-5">
								<b-input-group size="sm" prepend="Per Halaman">
									<b-form-select v-model="paging.perPage" :options="opt.perPage" @change="doGet()" />
								</b-input-group>
							</div>
						</b-col>
						<b-col cols="6" class="d-flex justify-content-end">
							<div class="w-100 max-300">
								<b-input-group size="sm">
									<b-form-input v-model="paging.search" />
									<b-input-group-append>
										<b-button size="sm" text="Button" variant="primary" @click="doGet()">
											<b-icon icon="search" />
											Cari
										</b-button>
									</b-input-group-append>
								</b-input-group>
							</div>
						</b-col>
					</b-row>
				</b-col>
				<b-col cols="12">
					<b-table responsive bordered outlined small striped hover :fields="table.fields"
						:items="table.items" :sort-by.sync="paging.sortBy" :sort-desc.sync="paging.sortDesc" show-empty
						@filtered="onTableUpdate" :emptyText="table.loading ? 'Memuat data...' : 'Tidak ada data'">
						<template #cell(no)="item">
							{{ item.index + 1 }}
						</template>
						<template #cell(pokok)="item">
							Rp {{ thousand(item.item.pokok) }}
						</template>
						<template #cell(margin)="item">
							Rp {{ thousand(item.item.margin) }}
						</template>
						<template #cell(action)="item">
							<!-- <b-button variant="danger" size="xs" class="mx-1" @click="doDelete(item,true)">
				  <b-icon icon="trash" />
				</b-button>
				<b-button variant="success" size="xs" class="mx-1" @click="doUpdate(item,false)">
				  <b-icon icon="pencil" />
				</b-button> -->
							<b-button variant="info" size="xs" class="mx-1" @click="doUpdate(item, false)">
								<b-icon icon="check" />
							</b-button>
						</template>
					</b-table>
				</b-col>
				<b-col cols="12" class="justify-content-end d-flex">
					<b-pagination v-model="paging.page" :total-rows="table.totalRows" :per-page="paging.perPage">
					</b-pagination>
				</b-col>
			</b-row>
		</b-card>
		<b-modal title="Form Pencairan" id="modal-form" hide-footer size="xl" centered>
			<b-form @submit="doSave()">
				<b-row>
					<!-- <b-col cols="12" sm="4">
			  <b-form-group label="Cabang">
				<b-select v-model="form.data.kode_cabang" :options="opt.cabang" @change="doGetRembug()"/>
			  </b-form-group>
			</b-col> -->
					<b-col cols="12" sm="4">
						<b-form-group label="Rembug">
							<b-select :value="form.data.kode_rembug" :options="opt.rembug"
								@change="doGetAnggota(form.data.kode_rembug)" disabled />
						</b-form-group>
					</b-col>
					<!-- <b-col cols="12" sm="4">
			  <b-form-group label="Nama">
				<b-select :value="form.data.no_anggota" :options="opt.anggota" disabled/>
			  </b-form-group>
			</b-col> -->
					<b-col cols="12" sm="4">
						<b-form-group label="Nama Anggota">
							<b-input :value="pengajuan.nama_anggota" disabled />
						</b-form-group>
					</b-col>
					<b-col cols="12" sm="4">
						<b-form-group label="No Anggota">
							<b-input :value="pengajuan.no_anggota" disabled />
						</b-form-group>
					</b-col>
					<b-col cols="12" sm="4">
						<b-form-group label="No Pengajuan">
							<b-input :value="pengajuan.no_pengajuan" disabled />
						</b-form-group>
					</b-col>
					<b-col cols="12" sm="4">
						<b-form-group label="Pembiayaan Ke">
							<b-input :value="pengajuan.pengajuan_ke" disabled />
						</b-form-group>
					</b-col>
					<b-col cols="12" sm="4">
						<b-form-group label="Jumlah Pengajuan">
							<b-input :value="thousand(pengajuan.pokok)" disabled />
						</b-form-group>
					</b-col>
					<b-col cols="12" sm="4">
						<b-form-group label="Peruntukan">
							<b-select :value="pengajuan.peruntukan" :options="opt.peruntukan" disabled />
						</b-form-group>
					</b-col>
					<b-col cols="12" sm="8">
						<b-form-group label="Keterangan">
							<b-textarea :value="pengajuan.keterangan_peruntukan" rows="5" disabled />
						</b-form-group>
					</b-col>
					<b-col cols="12">
						<hr>
					</b-col>
					<b-col cols="12" sm="6">
						<b-form-group label="Akad/ Produk">
							<b-select :value="form.data.kode_produk" :options="opt.product" disabled />
						</b-form-group>
					</b-col>
					<b-col cols="12" sm="6">
						<b-form-group label="Plafon">
							<b-input :value="thousand(form.data.pokok)" disabled />
						</b-form-group>
					</b-col>
					<b-col cols="12" sm="6">
						<b-form-group label="Margin">
							<b-input :value="thousand(form.data.margin)" disabled />
						</b-form-group>
					</b-col>
					<b-col cols="12" sm="6">
						<b-form-group label="Jangka Waktu">
							<b-row>
								<b-col cols="4">
									<b-input v-model="form.data.jangka_waktu" disabled />
								</b-col>
								<b-col>
									<b-select v-model="form.data.periode_jangka_waktu"
										:options="opt.rencanaPeriodeJangkaWaktu" disabled />
								</b-col>
							</b-row>
						</b-form-group>
					</b-col>
					<b-col cols="12">
						<hr>
					</b-col>
					<b-col cols="12" sm="6">
						<h4 class="mb-5">Angsuran</h4>
						<b-form-group label="Pokok">
							<b-input :value="thousand(form.data.angsuran_pokok)" disabled />
						</b-form-group>
						<b-form-group label="Margin">
							<b-input :value="thousand(form.data.angsuran_margin)" disabled />
						</b-form-group>
						<b-form-group label="Minggon">
							<b-input :value="thousand(form.data.angsuran_minggon)" disabled />
						</b-form-group>
						<b-form-group label="Total">
							<b-input
								:value="thousand(Number(form.data.angsuran_pokok) + Number(form.data.angsuran_margin) + Number(form.data.angsuran_minggon))"
								disabled />
						</b-form-group>
					</b-col>
					<b-col cols="12" sm="6">
						<h4 class="mb-5">Setoran Saat Pencairan</h4>
						<b-form-group label="Biaya Adm">
							<b-input :value="thousand(form.data.biaya_administrasi)" disabled />
						</b-form-group>
						<b-form-group label="Asuransi">
							<b-input :value="thousand(form.data.biaya_asuransi_jiwa)" disabled />
						</b-form-group>
						<b-form-group label="Dana Kebajikan">
							<b-input :value="thousand(form.data.dana_kebajikan)" disabled />
						</b-form-group>
						<b-form-group label="Simpanan Wajib">
							<b-input :value="thousand(form.data.tabungan_persen)" disabled />
						</b-form-group>
						<b-form-group label="Total">
							<b-input
								:value="thousand(Number(form.data.biaya_administrasi) + Number(form.data.biaya_asuransi_jiwa) + Number(form.data.dana_kebajikan) + Number(form.data.tabungan_persen))"
								disabled />
						</b-form-group>
					</b-col>
					<b-col cols="12">
						<hr>
					</b-col>
					<b-col cols="12" sm="6">
						<b-form-group label="Tanggal Pengajuan">
							<b-form-datepicker v-model="form.data.tanggal_pengajuan"
								:date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }" locale="id"
								disabled />
						</b-form-group>
					</b-col>
					<!-- <b-col cols="12" sm="6">
			  <b-form-group label="Tanggal Komite">
				<b-form-datepicker v-model="form.data.tanggal_jtempo" :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
				  locale="id"/>
			  </b-form-group>
			</b-col> -->
					<b-col cols="12" sm="6">
						<b-form-group label="Tanggal Akad">
							<b-form-datepicker v-model="form.data.tanggal_akad"
								:date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }" locale="id"
								disabled />
						</b-form-group>
					</b-col>
					<!-- <b-col cols="12" sm="4">
			  <b-form-group label="Mulai Angsur">
				<b-form-datepicker v-model="form.data.tanggal_mulai_angsur"
				  :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }" locale="id" />
			  </b-form-group>
			</b-col> -->
					<b-col cols="12" sm="6">
						<b-form-group label="Sumber Dana">
							<b-select v-model="form.data.sumber_dana" :options="opt.sumber_dana" disabled />
						</b-form-group>
					</b-col>
					<b-col cols="12" sm="6" v-show="(form.data.sumber_dana == 1)">
						<b-form-group label="Nama Kreditur">
							<b-select v-model="form.data.kode_kreditur" :options="opt.kreditur" disabled />
						</b-form-group>
					</b-col>
				</b-row>
				<b-row>
					<b-col cols="12">
					<hr>
				</b-col>
				<b-col cols="12" sm="6">
					<b-form-group label="TTD Pencairan" description="Click to upload">
					<label for="fm-ttd_pencairan" class="w-100" ref="previewImage">
						<b-img-lazy :src="(form.data.ttd_pencairan) ? form.data.ttd_pencairan : '/media/doc-upload.png'" fluid
						class="w-100" />
						<input type="file" ref="fm-ttd_pencairan" hidden id="fm-ttd_pencairan"
						@change="previewImage($event, 'ttd_pencairan')" accept="image/*">
					</label>
					</b-form-group>
				</b-col>
				<b-col cols="12" sm="6">
					<b-form-group label="Doc Pencairan" description="Click to upload">
					<label for="fm-doc_pencairan" class="w-100" ref="previewImage">
						<b-img-lazy :src="(form.data.doc_pencairan) ? form.data.doc_pencairan : '/media/doc-upload.png'"
						fluid class="w-100" />
						<input type="file" ref="fm-doc_pencairan" hidden id="fm-doc_pencairan"
						@change="previewImage($event, 'doc_pencairan')" accept="image/*">
					</label>
					</b-form-group>
				</b-col>
				</b-row>
				
				<b-row>
					<b-col cols="12" sm="12" class="d-flex justify-content-end border-top pt-5">
						<b-button variant="secondary" @click="$bvModal.hide('modal-form')"
							:disabled="form.loading">Cancel
						</b-button>
						<!-- <b-button variant="danger" type="button" :disabled="form.loading" class="ml-3"
							@click="doApproval('reject')">
							{{ form.loading ? 'Memproses...' : 'Reject' }}
						</b-button> -->
						<b-button variant="primary" type="button" :disabled="form.loading" class="ml-3"
							@click="doApproval('approve')">
							{{ form.loading ? 'Memproses...' : 'Approve' }}
						</b-button>
					</b-col>
				</b-row>
			</b-form>
		</b-modal>
		<b-modal title="Delete" id="modal-delete" hide-footer size="sm" header-bg-variant="warning"
			body-bg-variant="warning" centered>
			<p class="text-center py-3">Anda yakin ingin menghapus data ini?</p>
			<div class="d-flex justify-content-end">
				<b-button variant="light" type="button" :disabled="remove.loading"
					@click="$bvModal.hide('modal-delete')">Tidak
				</b-button>
				<b-button variant="danger" class="ml-3" type="button" :disabled="remove.loading"
					@click="doDelete(remove.data, false)">
					{{ remove.loading ? 'Memproses...' : 'Ya' }}
				</b-button>
			</div>
		</b-modal>
	</div>
</template>
<script>
import helper from '@/core/helper'
import { mapGetters } from 'vuex'
import easycoApi from '@/core/services/easyco.service'
export default {
	name: "VerifikasiAkad",
	components: {

	},
	data() {
		return {
			form: {
				data: {
					id: null,
					nama_cabang: null,
					nama_rembug: null,
					nama_anggota: null,
					no_anggota: null,
					no_pengajuan: null,
					pembiayaan_ke: 0,
					jumlah_pengajuan: 0,
					keterangan: null,
					// produk: null,
					kode_produk: null,
					kode_akad: null,
					kode_petugas: null,
					no_pengajuan: null,
					// no_rekening: null,
					pokok: 0,
					margin: 0,
					periode_jangka_waktu: null,
					jangka_waktu: 0,
					angsuran_pokok: 0,
					angsuran_margin: 0,
					angsuran_minggon: 2000,
					biaya_administrasi: 10000,
					biaya_asuransi_jiwa: 0,
					tabungan_persen: 0,
					dana_kebajikan: 0,
					// tanggal_registrasi: null,
					tanggal_akad: null,
					// tanggal_mulai_angsur: null,
					// tanggal_jtempo: null,
					// saldo_pokok: 0,
					// saldo_margin: 0,
					// saldo_catab: 0,
					// saldo_minggon: 0,
					// jtempo_angsuran_next: null,
					sumber_dana: null,
					kode_kreditur: null,
					peruntukan: null,
					// norek_tabungan: null,
					created_by: null,
				},
				loading: false
			},
			pengajuan: {
				jumlah_pengajuan: null,
				keterangan_peruntukan: null,
				nama_anggota: null,
				no_anggota: null,
				no_pengajuan: null,
				pembiayaan_ke: null,
				peruntukan: null,
				rencana_droping: null,
				tanggal_pengajuan: null,
				pokok: null,
				margin: null,
				angsuran_pokok: 0,
				angsuran_margin: 0,
				angsuran_minggon: 0,
				angsuran_total: 0,
				biaya_administrasi: 0,
				biaya_asuransi_jiwa: 0,
				dana_kebajikan: 0,
				tabungan_persen: 0,
				total_setoran_saat_pencairan: 0
			},
			table: {
				fields: [
					{
						key: 'no',
						sortable: false,
						label: 'No',
						thClass: 'text-center w-5p',
						tdClass: 'text-center'
					},
					{
						key: 'no_anggota',
						sortable: true,
						label: 'No Anggota',
						thClass: 'text-center',
						tdClass: ''
					},
					{
						key: 'nama_anggota',
						sortable: true,
						label: 'Nama Anggota',
						thClass: 'text-center',
						tdClass: ''
					},
					{
						key: 'nama_rembug',
						sortable: true,
						label: 'Majelis',
						thClass: 'text-center',
						tdClass: ''
					},
					{
						key: 'nama_cabang',
						sortable: true,
						label: 'Cabang',
						thClass: 'text-center',
						tdClass: ''
					},
					{
						key: 'no_pengajuan',
						sortable: true,
						label: 'No Pengajuan',
						thClass: 'text-center',
						tdClass: ''
					},
					{
						key: 'pokok',
						sortable: true,
						label: 'Pokok',
						thClass: 'text-center',
						tdClass: 'text-right'
					},
					{
						key: 'margin',
						sortable: true,
						label: 'Margin',
						thClass: 'text-center',
						tdClass: 'text-right'
					},
					{
						key: 'action',
						sortable: false,
						label: 'Action',
						thClass: 'text-center w-10p',
						tdClass: 'text-center'
					},
				],
				items: [],
				loading: false,
				totalRows: 0
			},
			paging: {
				page: 1,
				perPage: 10,
				sortDesc: true,
				sortBy: 'id',
				search: '',
				status_rekening: [1],
				status_droping: [0],
				jenis_pembiayaan: '~',
				petugas: '~',
				rembug: '~',
				produk: '~',
				from: null,
				to: null
			},
			remove: {
				data: Object,
				loading: false
			},
			opt: {
				perPage: [10, 20, 50, 100, 200],
				rembug: [],
				anggota: [],
				peruntukan: [],
				product: [],
				rencanaPeriodeJangkaWaktu: [{
					text: "Harian",
					value: "0"
				}, {
					text: "Mingguan",
					value: "1"
				}, {
					text: "Bulanan",
					value: "2"
				}],
				sumber_dana: [{
					text: "Sendiri",
					value: 0
				}, {
					text: "Kreditur",
					value: 1
				}, {
					text: "Campuran",
					value: 2
				}],
			},
			loading: false
		}
	},
	computed: {
		...mapGetters(["user"]),
	},
	watch: {
		paging: {
			handler(val) {
				this.doGet()
			},
			deep: true
		},
	},
	mounted() {
		this.doGet()
		this.doGetRembug()
		this.doGetPeruntukan()
		this.doGetProduct()
		this.doGetKreditur()
	},
	methods: {
		...helper,
		calculateForm() {
			let noAnggota = this.form.data.no_anggota
			let data = this.form.data
			if (noAnggota) {
				let pengajuan = this.opt.anggota.find((i) => i.value == noAnggota).data
				this.form.data.keterangan = pengajuan.keterangan_peruntukan
				this.form.data.kode_petugas = this.user.kode_petugas
				this.form.data.nama_anggota = pengajuan.nama_anggota
				this.form.data.nama_cabang = pengajuan.nama_cabang
				this.form.data.nama_rembug = pengajuan.nama_rembug
				this.form.data.no_pengajuan = pengajuan.no_pengajuan
				this.form.data.pembiayaan_ke = pengajuan.pembiayaan_ke
				this.form.data.peruntukan = pengajuan.peruntukan
				this.form.data.jumlah_pengajuan = pengajuan.jumlah_pengajuan
				this.pengajuan = { ...pengajuan }
				let pokok = pengajuan.jumlah_pengajuan
				if (!this.form.data.pokok) {
					this.form.data.pokok = pengajuan.jumlah_pengajuan
				} else {
					pokok = this.form.data.pokok
				}
				if (!this.form.data.margin) {
					this.form.data.margin = Math.round(pokok * 30 / 100)
				}

				this.form.data.angsuran_pokok = Math.round(pokok / data.jangka_waktu)
				this.form.data.angsuran_margin = Math.round(this.form.data.margin / data.jangka_waktu)
				if (!this.form.data.biaya_asuransi_jiwa) {
					this.form.data.biaya_asuransi_jiwa = Math.round(pokok * 0.5 / 100)
				}
				if (!this.form.data.dana_kebajikan) {
					this.form.data.dana_kebajikan = Math.round(pokok * 1 / 100)
				}
				this.form.data.tabungan_persen = Math.round(pokok * 4 / 100)
				var tgl = new Date(pengajuan.tanggal_pengajuan);
				this.form.data.tanggal_pengajuan = new Date(tgl.setDate(tgl.getDate()));
				this.form.data.tanggal_akad = new Date(tgl.setDate(tgl.getDate() + 7));
			}
		},
		async doGetCabang() {
			let payload = {
				perPage: '~',
				page: 1,
				sortBy: 'nama_cabang',
				sortDir: 'ASC',
				search: ''
			}
			try {
				let req = await easycoApi.cabangRead(payload, this.user.token)
				let { data, status, msg } = req.data
				if (status) {
					this.opt.cabang = []
					data.map((item) => {
						this.opt.cabang.push({
							value: item.kode_cabang,
							text: item.nama_cabang
						})
					})
				}
			} catch (error) {
				console.error(error)
			}
		},
		async doGetRembug() {
			let payload = {
				kode_cabang: this.user.kode_cabang
			}
			try {
				let req = await easycoApi.anggotaRembug(payload, this.user.token)
				let { data, status, msg } = req.data
				if (status) {
					this.opt.rembug = []
					data.map((item) => {
						this.opt.rembug.push({
							value: item.kode_rembug,
							text: item.nama_rembug
						})
					})
				}
			} catch (error) {
				console.error(error)
			}
		},
		async doGetAnggota(rembug) {
			if (rembug) {
				let payload = {
					kode_rembug: rembug
				}
				try {
					let req = await easycoApi.PembiayaanGetPengajuan(payload, this.user.token)
					let { data, status, msg, total } = req.data
					if (status) {
						this.opt.anggota = []
						data.map((item) => {
							this.opt.anggota.push({
								value: item.no_anggota,
								text: `${item.nama_anggota} - ${item.no_pengajuan}`,
								data: item
							})
						})
					} else {
						this.notify('danger', 'Error', msg)
					}
					this.table.loading = false
				} catch (error) {
					this.table.loading = false
					console.error(error)
					this.notify('danger', 'Login Error', error)
				}
			}
		},
		async doGetPeruntukan() {
			let payload = null
			try {
				let req = await easycoApi.peruntukanRead(payload, this.user.token)
				let { data, status, msg } = req.data
				if (status) {
					this.opt.peruntukan = []
					data.map((item) => {
						this.opt.peruntukan.push({
							value: item.kode_value,
							text: item.kode_display,
						})
					})
				} else {
					this.notify('danger', 'Error', msg)
				}
				this.table.loading = false
			} catch (error) {
				this.table.loading = false
				console.error(error)
				this.notify('danger', 'Login Error', error)
			}
		},
		async doGetProduct() {
			let payload = null
			try {
				let req = await easycoApi.pembiayaanGetProduk(payload, this.user.token)
				let { data, status, msg } = req.data
				if (status) {
					this.opt.product = []
					data.map((item) => {
						this.opt.product.push({
							value: item.kode_produk,
							text: `${item.kode_produk} - ${item.nama_produk}`,
							data: item
						})
					})
				} else {
					this.notify('danger', 'Error', msg)
				}
				this.table.loading = false
			} catch (error) {
				this.table.loading = false
				console.error(error)
				this.notify('danger', 'Login Error', error)
			}
		},
		async doGetKreditur() {
			let payload = null
			try {
				let req = await easycoApi.pembiayaanGetKreditur(payload, this.user.token)
				let { data, status, msg } = req.data
				if (status) {
					this.opt.kreditur = []
					data.map((item) => {
						this.opt.kreditur.push({
							value: item.kode_value,
							text: item.kode_display
						})
					})
				} else {
					this.notify('danger', 'Error', msg)
				}
				this.table.loading = false
			} catch (error) {
				this.table.loading = false
				console.error(error)
				this.notify('danger', 'Login Error', error)
			}
		},
		async doGet() {
			let payload = this.paging
			payload.sortDir = payload.sortDesc ? 'DESC' : 'ASC'
			this.table.loading = true
			try {
				let req = await easycoApi.regisAkadRead(payload, this.user.token)
				let { data, status, msg, total } = req.data
				if (status) {
					this.table.items = data
					this.table.totalRows = total
				} else {
					this.notify('danger', 'Error', msg)
				}
				this.table.loading = false
			} catch (error) {
				this.table.loading = false
				console.error(error)
				this.notify('danger', 'Login Error', error)
			}
		},
		async doSave() {
			this.form.loading = true
			try {
				let payload = this.form.data
				payload.kode_akad = this.opt.product.find((i) => i.value == payload.kode_produk).data.kode_akad
				payload.angsuran_margin = Number(payload.angsuran_margin)
				payload.angsuran_minggon = Number(payload.angsuran_minggon)
				payload.angsuran_pokok = Number(payload.angsuran_pokok)
				payload.biaya_administrasi = Number(payload.biaya_administrasi)
				payload.biaya_asuransi_jiwa = Number(payload.biaya_asuransi_jiwa)
				payload.dana_kebajikan = Number(payload.dana_kebajikan)
				payload.jangka_waktu = Number(payload.jangka_waktu)
				payload.jumlah_pengajuan = Number(payload.jumlah_pengajuan)
				payload.margin = Number(payload.margin)
				payload.pokok = Number(payload.pokok)
				payload.tabungan_persen = Number(payload.tabungan_persen)
				payload.created_by = this.user.id
				let req = false
				if (payload.id) {
					req = await easycoApi.regisAkadUpdate(payload, this.user.token)
				} else {
					req = await easycoApi.regisAkadCreate(payload, this.user.token)
				}
				let { data, status, msg } = req.data
				if (status) {
					this.doGet()
					this.$bvModal.hide('modal-form')
					this.doClearForm()
					this.notify('success', 'Success', msg)
				} else {
					this.notify('danger', 'Error', msg)
				}
				this.form.loading = false
			} catch (error) {
				this.form.loading = false
				console.error(error)
				this.notify('danger', 'Login Error', error)
			}
		},
		async doUpdate(data, setRembug) {
			let id = `?id=${data.item.id}`
			try {
				let req = await easycoApi.regisAkadReadDetail(id, this.user.token)
				let { data, status, msg } = req.data
				if (status) {
					this.form.data = { ...data.get, ...data.get2[0] }
					this.pengajuan = { ...this.form.data }
					this.form.data.kode_rembug = Number(this.form.data.kode_rembug)
					this.doGetRembug()
					this.doGetAnggota(this.form.data.kode_rembug)
					this.form.data.no_anggota = Number(this.form.data.no_anggota)
					this.pengajuan = { ...this.form.data }
					this.$bvModal.show('modal-form')
				} else {
					this.notify('danger', 'Error', msg)
				}
			} catch (error) {
				console.error(error)
			}
		},
		async doDelete(data, dialog) {
			if (dialog) {
				console.log('dialog:', data)
				this.$bvModal.show('modal-delete')
				this.remove.data = data.item
			} else {
				console.log('on delete:', data)
				try {
					this.remove.loading = true
					let req = await easycoApi.anggotaDelete(`?id=${this.remove.data.id}`, this.user.token)
					let { data, status, msg } = req.data
					if (status) {
						this.$bvModal.hide('modal-delete')
						this.doGet()
						this.remove.data = Object
						this.notify('success', 'Success', msg)
					} else {
						this.notify('danger', 'Error', msg)
					}
					this.remove.loading = false
				} catch (error) {
					console.log(error)
					this.notify('danger', 'Error', error)
				}
			}
		},
		previewImage(event, target) {
      let theImg = null
      let vm = this
      const ttd_pencairan = this.$refs['fm-ttd_pencairan']
      const ttd_doc_pencairan = this.$refs['fm-doc_pencairan']
      let reader = new FileReader();
      switch (target) {
        case 'ttd_pencairan':
          theImg = event.target.files[0];
          reader.readAsDataURL(theImg);
          reader.onload = function () {
            vm.form.data.ttd_pencairan = reader.result
            ttd_pencairan.type = 'text';
            ttd_pencairan.type = 'file';
          };
          reader.onerror = function () {
            vm.form.data.ttd_pencairan = null
            ttd_pencairan.type = 'text';
            ttd_pencairan.type = 'file';
          };
          break;
        case 'doc_pencairan':
          theImg = event.target.files[0];
          reader.readAsDataURL(theImg);
          reader.onload = function () {
            vm.form.data.doc_pencairan = reader.result
            doc_pencairan.type = 'text';
            doc_pencairan.type = 'file';
          };
          reader.onerror = function () {
            vm.form.data.doc_pencairan = null
            doc_pencairan.type = 'text';
			doc_pencairan.type = 'file';
          };
          break;
      }
    },
		async doApproval(status) {
			let state = status
			try {
				let payload = this.form.data
				this.form.loading = true
				let req = false
				if (state == 'approve') {
					console.log('approve')
					req = await easycoApi.verifikasiAkadApprove(payload, this.user.token)
				} else {
					console.log('reject')
					req = await easycoApi.verifikasiAkadReject(`?id=${this.form.data.id}`, this.user.token)
				}
				let { status, msg } = req.data
				if (status) {
					this.$bvModal.hide('modal-form')
					this.doGet()
					this.remove.data = Object
					this.notify('success', 'Success', msg)
				} else {
					this.notify('danger', 'Error', msg)
				}
				this.form.loading = false
			} catch (error) {
				this.form.loading = false
				console.log(error)
				this.notify('danger', 'Error', error)
			}
		},
		onTableUpdate(v) {
			console.log(v)
		},
		doClearForm() {
			this.form.data = {
				id: null,
				nama_cabang: null,
				nama_rembug: null,
				nama_anggota: null,
				no_anggota: null,
				no_pengajuan: null,
				pembiayaan_ke: 0,
				jumlah_pengajuan: 0,
				keterangan: null,
				// produk: null,
				kode_produk: null,
				kode_akad: null,
				kode_petugas: null,
				no_pengajuan: null,
				// no_rekening: null,
				pokok: 0,
				margin: 0,
				periode_jangka_waktu: null,
				jangka_waktu: 0,
				angsuran_pokok: 0,
				angsuran_margin: 0,
				angsuran_minggon: 2000,
				biaya_administrasi: 10000,
				biaya_asuransi_jiwa: 0,
				tabungan_persen: 0,
				dana_kebajikan: 0,
				// tanggal_registrasi: null,
				tanggal_akad: null,
				// tanggal_mulai_angsur: null,
				// tanggal_jtempo: null,
				// saldo_pokok: 0,
				// saldo_margin: 0,
				// saldo_catab: 0,
				// saldo_minggon: 0,
				// jtempo_angsuran_next: null,
				sumber_dana: null,
				kode_kreditur: null,
				peruntukan: null,
				// norek_tabungan: null,
				created_by: null,
			}
			this.pengajuan = {
				jumlah_pengajuan: null,
				keterangan_peruntukan: null,
				nama_anggota: null,
				no_anggota: null,
				no_pengajuan: null,
				pembiayaan_ke: null,
				peruntukan: null,
				rencana_droping: null,
				tanggal_pengajuan: null,
				pokok: null,
				margin: null,
				angsuran_pokok: 0,
				angsuran_margin: 0,
				angsuran_minggon: 0,
				angsuran_total: 0,
				biaya_administrasi: 0,
				biaya_asuransi_jiwa: 0,
				dana_kebajikan: 0,
				tabungan_persen: 0,
				total_setoran_saat_pencairan: 0
			}
		},
		notify(type, title, msg) {
			this.$bvToast.toast(msg, {
				title: title,
				autoHideDelay: 5000,
				variant: type,
				toaster: 'b-toaster-bottom-right',
				appendToast: true
			})
		}
	}
};
</script>
	