export default class CurrencyHelper {
  static toDouble = (str: string) => {
    const cur_re = /\D*(\d+|\d.*?\d)(?:\D+(\d{2}))?\D*$/;
    const parts = cur_re.exec(str);
    if (!parts) return;
    const number = parseFloat(
      parts[1].replace(/\D/, "") + "." + (parts[2] ? parts[2] : "00")
    );

    return number.toFixed(2);
  };
}
