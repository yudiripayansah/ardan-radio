const helper = {
  thousand(num) {
    if (num) {
      let num_parts = num.toString().split(".");
      num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      return num_parts.join(",");
    } else {
      return 0
    }
  },
  removeThousand(num) {
    if (num) {
      let num_parts = num.toString().split(",");
      num_parts[0] = num_parts[0].replace(/\D/g, "")
      num_parts[0] = num_parts[0].replace(/\./g,'')
      num_parts[0] = parseInt(num_parts[0])
      return num_parts.join(",");
    } else {
      return 0
    }
  },
  NumbersOnly(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
      evt.preventDefault();;
    } else {
      return true;
    }
  },
  dateIndo(date) {
    let theDate = new Date(date)
    let month = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus','September','Oktober','November','Desember']
    let day = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']
    let dy = theDate.getDay()
    let d = theDate.getDate()
    let m = theDate.getMonth()
    let y = theDate.getFullYear()
    return `${day[dy]}, ${d} ${month[m]} ${y}`
  },
  timeIndo(time) {
    let theTime = new Date(time)
    let h = theTime.getHours()
    let m = theTime.getMinutes()
    h = ('0' + (h)).slice(-2)
    m = ('0' + (m)).slice(-2)
    return `${h}:${m}`
  },
  formatDate(date) {
    let theDate = new Date(date)
    let d = theDate.getDate()
    let m = theDate.getMonth()
    let y = theDate.getFullYear()
    m = ('0' + (m+1)).slice(-2)
    d = ('0' + (d)).slice(-2)
    return `${y}-${m}-${d}`
  }
}