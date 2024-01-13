export default class Storage {
  static getStoredData() {
    return JSON.parse(localStorage.getItem("cvData"));
  }

  static setStoredData(data) {
    localStorage.setItem("cvData", JSON.stringify(data));
  }
}
