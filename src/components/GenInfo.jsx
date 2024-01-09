import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "../styles/GenInfo.css";

function GenInfo({ cvData, setCvData }) {
  const [cvLinks, setCvLinks] = useState(
    cvData.links.map((linkObj) => {
      return { ...linkObj };
    })
  );

  function handleAddLink() {
    setCvLinks(
      cvLinks
        .map((linkObj) => {
          return { ...linkObj };
        })
        .concat({
          key: uuidv4(),
          linkName: "",
          linkRef: "",
        })
    );
  }

  function handleChangeLink(event, key, prop) {
    setCvLinks(
      cvLinks.map((linkObj) => {
        if (linkObj.key === key) {
          return { ...linkObj, [prop]: event.target.value };
        }
        return { ...linkObj };
      })
    );
  }

  function handleSaveGenInfo(event) {
    event.preventDefault();
    const newCvData = {
      ...cvData,
      name: document.querySelector("#name").value,
      email: document.querySelector("#email").value,
      phone: document.querySelector("#phone").value,
      address: document.querySelector("#address").value,
      links: cvLinks.filter(
        (linkObj) => !!linkObj.linkName && !!linkObj.linkRef
      ),
    };
    setCvData(newCvData);
  }

  return (
    <form onSubmit={handleSaveGenInfo} id="genInfoForm">
      <label htmlFor="name">Name</label>
      <input type="text" id="name" defaultValue={cvData.name} />
      <label htmlFor="email">Email</label>
      <input type="text" id="email" defaultValue={cvData.email} />
      <label htmlFor="phone">Phone</label>
      <input type="text" id="phone" defaultValue={cvData.phone} />
      <label htmlFor="address">Address</label>
      <input type="text" id="address" defaultValue={cvData.address} />
      {cvLinks.length > 0 && (
        <div className="linkDiv">
          <label>Link Name</label>
          <label>Link Ref</label>
        </div>
      )}
      {cvLinks.map((linkObj) => (
        <div key={linkObj.key} className="linkDiv">
          <input
            type="text"
            className="linkName"
            defaultValue={linkObj.linkName}
            onChange={(event) =>
              handleChangeLink(event, linkObj.key, "linkName")
            }
          />
          <input
            type="text"
            className="linkRef"
            defaultValue={linkObj.linkRef}
            onChange={(event) =>
              handleChangeLink(event, linkObj.key, "linkRef")
            }
          />
        </div>
      ))}
      <button type="button" className="addLink" onClick={handleAddLink}>
        Add Link <span className="material-symbols-outlined">link</span>
      </button>
      <button type="submit">Save</button>
    </form>
  );
}

export default GenInfo;
