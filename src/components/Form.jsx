import { useState } from "react";
import GenInfo from "./GenInfo.jsx";
import Work from "./Work.jsx";
import Education from "./Education.jsx";
import "../styles/Form.css";

function Accordion({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);

  let accordionClass = "accordion";
  if (isOpen) {
    accordionClass += " open";
  }

  return (
    <div className={accordionClass}>
      <div className="accordionHead" onClick={() => setIsOpen(!isOpen)}>
        <h3>{title}</h3>
        <span
          className="material-symbols-outlined expandIcon"
          aria-hidden="true"
        >
          expand_more
        </span>
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
          <Work cvData={cvData} setCvData={setCvData}></Work>
        </Accordion>
        <Accordion title="Education">
          <Education cvData={cvData} setCvData={setCvData}></Education>
        </Accordion>
      </div>
    </div>
  );
}

export default Form;
