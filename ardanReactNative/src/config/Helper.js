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
  thousandMask(num) {
    if (num) {
      let num_parts = num.toString().split(",");
      num_parts[0] = num_parts[0].replace(/\./g,'')
      num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      return [num_parts.join(",")];
    } else {
      return [0]
    }
  },
  removeThousand(num) {
    if (num) {
      let num_parts = num.toString().split(",");
      num_parts[0] = num_parts[0].replace(/\./g,'')
      return num_parts.join(",");
    } else {
      return 0
    }
  },
  dateFormatId(date) {
    if(date) {
      let theDate = new Date(date)
      let d = theDate.getDate()
      let m = theDate.getMonth() + 1
      let y = theDate.getFullYear()
      return `${d}-${m}-${y}`
    } else {
      return null
    }
  },
  dateFormatEn(date) {
    if(date) {
      let theDate = new Date(date)
      let d = theDate.getDate()
      let m = theDate.getMonth() + 1
      let y = theDate.getFullYear()
      return theDate
    } else {
      return null
    }
  },
  maxLength(s,l) {
    return String(s).substring(0,l);
  },
  limitWords(textToLimit, wordLimit) {
    var finalText = "";
    var text2 = textToLimit.replace(/\s+/g, " ");
    var text3 = text2.split(" ");
    var numberOfWords = text3.length;
    var i = 0;
    if (numberOfWords > wordLimit) {
      for (i = 0; i < wordLimit; i++)
        finalText = finalText + " " + text3[i] + " ";
      return finalText + "…";
    } else return textToLimit;
  }
}
export default helper