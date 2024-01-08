import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Form from "./components/Form.jsx";
import Cv from "./components/Cv.jsx";
import "./styles/App.css";

function App() {
  const [cvData, setCvData] = useState({
    name: "First M. Last",
    email: "your_email@here.com",
    phone: "0123456789",
    work: [
      {
        key: uuidv4(),
        name: "Company Name",
        startMonth: "Month",
        startYear: "Year",
        endMonth: "Month",
        endYear: "Year",
        title: "Job Title",
        address: "Address",
        details: [
          { key: uuidv4(), text: "Core responsibility #1" },
          { key: uuidv4(), text: "Core responsibility #2" },
        ],
      },
      {
        key: uuidv4(),
        name: "Company Name",
        startMonth: "Month",
        startYear: "Year",
        endMonth: "Month",
        endYear: "Year",
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
  });

  function handleCvData() {
    const newCvData = {
      ...cvData,
    };
    setCvData(newCvData);
  }

  return (
    <>
      <Form handleCvData={handleCvData} />
      <Cv cvData={cvData} />
    </>
  );
}

export default App;
