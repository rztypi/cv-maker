import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import GenInfo from "./GenInfo.jsx";
import Work from "./Work.jsx";
import Education from "./Education.jsx";
import Section from "./Section.jsx";
import "../styles/Form.css";

function Accordion({ title, open = false, children }) {
  const [isOpen, setIsOpen] = useState(open);

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
  function handleAddSectionBtn() {
    setCvData({
      ...cvData,
      sections: cvData.sections.concat({
        key: uuidv4(),
        title: "New Section",
        content: [],
      }),
    });
  }

  return (
    <div id="form">
      <div className="accordions">
        <Accordion title="General Information" open={true}>
          <GenInfo cvData={cvData} setCvData={setCvData}></GenInfo>
        </Accordion>
        <Accordion title="Work Experience">
          <Work cvData={cvData} setCvData={setCvData}></Work>
        </Accordion>
        <Accordion title="Education">
          <Education cvData={cvData} setCvData={setCvData}></Education>
        </Accordion>
        {cvData.sections.map((secObj) => (
          <Accordion key={secObj.key} title={secObj.title}>
            <Section
              cvData={cvData}
              setCvData={setCvData}
              secObj={secObj}
            ></Section>
          </Accordion>
        ))}
        <button
          type="button"
          className="addListItemBtn addSectionBtn"
          onClick={handleAddSectionBtn}
        >
          <span className="material-symbols-outlined" aria-hidden="true">
            add
          </span>
          add section
        </button>
      </div>
    </div>
  );
}

export default Form;
