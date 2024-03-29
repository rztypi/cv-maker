import { v4 as uuidv4 } from "uuid";

export default class Storage {
  static defaultCvData = {
    name: "First M. Last",
    email: "your_email@here.com",
    phone: "0123456789",
    address: "Address",
    links: [
      {
        key: uuidv4(),
        linkName: "website.com",
        linkRef: "https://www.website.com/",
      },
    ],
    work: [
      {
        key: uuidv4(),
        name: "Company Name #1",
        startDate: "2000-01",
        endDate: "present",
        title: "Job Title",
        address: "Address",
        details: [
          { key: uuidv4(), text: "Core responsibility #1" },
          { key: uuidv4(), text: "Core responsibility #2" },
        ],
      },
      {
        key: uuidv4(),
        name: "Company Name #2",
        startDate: "2000-01",
        endDate: "2024-12",
        title: "Job Title",
        address: "Address",
        details: [
          { key: uuidv4(), text: "Core responsibility #1" },
          { key: uuidv4(), text: "Core responsibility #2" },
        ],
      },
    ],
    education: [
      {
        key: uuidv4(),
        name: "University Name",
        endDate: "2024-12",
        degree: "Degree",
        address: "Address",
        details: [
          { key: uuidv4(), text: "Education details #1" },
          { key: uuidv4(), text: "Education details #2" },
        ],
      },
    ],
    sections: [
      {
        key: uuidv4(),
        title: "Extra Section",
        content: [
          {
            key: uuidv4(),
            type: "heading",
            text: "Heading",
          },
          {
            key: uuidv4(),
            type: "item",
            text: "Item #1",
          },
          {
            key: uuidv4(),
            type: "item",
            text: "Item #2",
          },
        ],
      },
    ],
  };

  static getStoredData = () => {
    return JSON.parse(localStorage.getItem("cvData")) || this.defaultCvData;
  };

  static setStoredData = (data) => {
    localStorage.setItem("cvData", JSON.stringify(data));
  };
}
