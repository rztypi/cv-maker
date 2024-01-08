import { useState } from "react";
import GenInfo from "./GenInfo.jsx";
import "../styles/Form.css";

function Accordion({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="accordion">
      <div className="accordionHead">
        <span
          className="material-symbols-outlined expand"
          onClick={() => setIsOpen(!isOpen)}
        >
          expand_more
        </span>
        <h3>{title}</h3>
      </div>
      {isOpen && <div className="accordionBody">{children}</div>}
    </div>
  );
}

function Form({ cvData, setCvData }) {
  return (
    <div id="form">
      <h1>Form</h1>
      <div className="accordions">
        <Accordion title="General Information">
          <GenInfo cvData={cvData} setCvData={setCvData}></GenInfo>
        </Accordion>
        <Accordion title="Work Experience">
          <h1>work experience form here</h1>
        </Accordion>
      </div>
    </div>
  );
}

export default Form;
