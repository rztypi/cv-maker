import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Form from "./components/Form.jsx";
import Cv from "./components/Cv.jsx";
import "./styles/App.css";

const defaultCvData = {
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
      startMonth: "Jan",
      startYear: "2000",
      endMonth: "Dec",
      endYear: "2024",
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
      startMonth: "Jan",
      startYear: "2000",
      endMonth: "Dec",
      endYear: "2024",
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
      month: "Graduation Month",
      year: "Year",
      degree: "Degree",
      address: "Address",
      details: [
        { key: uuidv4(), text: "Education details #1" },
        { key: uuidv4(), text: "Education details #2" },
      ],
    },
  ],
};

function App() {
  const [cvData, setCvData] = useState(defaultCvData);

  return (
    <>
      <Form cvData={cvData} setCvData={setCvData} />
      <Cv cvData={cvData} />
    </>
  );
}

export default App;
