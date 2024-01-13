import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Form from "./components/Form.jsx";
import Cv from "./components/Cv.jsx";
import CvPdf from "./components/CvPdf.jsx";
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
      startDate: "2000-01",
      endDate: "2024-12",
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

function App() {
  const [cvData, setCvData] = useState(defaultCvData);

  return (
    <div id="app">
      <header>
        <div className="headerContent">
          <h1>CV Maker</h1>
          <PDFDownloadLink
            document={<CvPdf cvData={cvData} />}
            fileName="cv.pdf"
            className="downloadBtn"
          >
            {({ loading }) =>
              loading ? (
                <span className="material-symbols-outlined">hourglass</span>
              ) : (
                <>
                  <span className="material-symbols-outlined">download</span>
                  Download PDF
                </>
              )
            }
          </PDFDownloadLink>
        </div>
      </header>
      <main>
        <Form cvData={cvData} setCvData={setCvData} />
        <Cv cvData={cvData} />
      </main>
      <footer>
        <a href="https://github.com/rztypi">rztypi</a>
      </footer>
    </div>
  );
}

export default App;
