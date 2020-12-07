export default class DateHelper {
  static toString = (date: Date) => {
    const date_obj = new Date(date);
    const day = date_obj.getDate();
    const month = date_obj.getMonth() + 1;
    const year = date_obj.getFullYear();
    const hours = date_obj.getHours();
    const minutes =
      date_obj.getMinutes() < 10
        ? "0" + date_obj.getMinutes()
        : date_obj.getMinutes();

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };
}
