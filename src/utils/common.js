import { saveAs } from "file-saver";

export const xlsxMIME = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

export const downloadCommon = (base64, mime, fileName) => {
    let bstr = atob(base64),
        n = bstr.length,
        u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    let file = new File([u8arr], fileName, { type: mime })
    saveAs(file)
    
    return true
  }

  export const YYYYMMDD = (date) => {
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}