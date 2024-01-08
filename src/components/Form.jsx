import { useState } from "react";
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

function GenInfo({ cvData, setCvData }) {
  function handleSaveGenInfo(event) {
    event.preventDefault();
    const newCvData = {
      ...cvData,
      name: document.querySelector("#name").value,
      email: document.querySelector("#email").value,
      phone: document.querySelector("#phone").value,
      address: document.querySelector("#address").value,
    };
    setCvData(newCvData);
  }

  return (
    <>
      <form onSubmit={handleSaveGenInfo}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" defaultValue={cvData.name} />
        <label htmlFor="email">Email</label>
        <input type="text" id="email" defaultValue={cvData.email} />
        <label htmlFor="phone">Phone</label>
        <input type="text" id="phone" defaultValue={cvData.phone} />
        <label htmlFor="address">Address</label>
        <input type="text" id="address" defaultValue={cvData.address} />
        <button type="submit">Save</button>
      </form>
    </>
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
