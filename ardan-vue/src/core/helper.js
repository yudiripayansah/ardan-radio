const thousand = (num) => {
  if (num) {
    let num_parts = num.toString().split(".");
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return num_parts.join(",");
  } else {
    return 0
  }
}
const thousandMask = (num) => {
  if (num) {
    let num_parts = num.toString().split(",");
    num_parts[0] = num_parts[0].replace(/\./g,'')
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return [num_parts.join(",")];
  } else {
    return [0]
  }
}
const removeThousand = (num) => {
  if (num) {
    let num_parts = num.toString().split(",");
    num_parts[0] = num_parts[0].replace(/\./g,'')
    return num_parts.join(",");
  } else {
    return 0
  }
}

const dateFormatId = (date, sepparator='-') => {
  if(date) {
    let theDate = new Date(date)
    let d = theDate.getDate()
    let m = theDate.getMonth() + 1
    let y = theDate.getFullYear()
    return `${d}${sepparator}${m}${sepparator}${y}`
  } else {
    return null
  }
}

const maxLength = (s,l) => {
  return String(s).substring(0,l);
}


export default { thousand, thousandMask, removeThousand, dateFormatId , maxLength}