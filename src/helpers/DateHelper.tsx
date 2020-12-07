export default class DateHelper {
  static toString = (date: Date) => {
    return `${new Date(date).getDate()}/${new Date(date).getMonth() + 1}/${new Date(date).getFullYear()}`;
  };
}
