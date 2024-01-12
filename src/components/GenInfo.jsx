import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "../styles/GenInfo.css";

function GenInfo({ cvData, setCvData }) {
  const [cvLinks, setCvLinks] = useState(cvData.links);

  function handleAddLink() {
    setCvLinks(
      cvLinks.concat({
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
        return linkObj;
      })
    );
  }

  function handleRemoveLink(key) {
    setCvLinks(cvLinks.filter((linkObj) => linkObj.key !== key));
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
      <div className="inputLabel">
        <label htmlFor="name">
          Name
          <span className="required" aria-hidden="true">
            *
          </span>
        </label>
        <input type="text" id="name" defaultValue={cvData.name} required />
      </div>
      <div className="inputLabel">
        <label htmlFor="email">
          Email
          <span className="required" aria-hidden="true">
            *
          </span>
        </label>
        <input type="email" id="email" defaultValue={cvData.email} required />
      </div>
      <div className="inputLabel">
        <label htmlFor="phone">Phone</label>
        <input type="text" id="phone" defaultValue={cvData.phone} />
      </div>
      <div className="inputLabel">
        <label htmlFor="address">Address</label>
        <input type="text" id="address" defaultValue={cvData.address} />
      </div>
      <div className="linkGroup">
        {cvLinks.length > 0 && (
          <div className="linkRow">
            <label>Link Name</label>
            <label>Link Ref</label>
          </div>
        )}
        {cvLinks.map((linkObj) => (
          <div key={linkObj.key} className="linkRow">
            <input
              type="text"
              className="linkName"
              defaultValue={linkObj.linkName}
              onChange={(event) =>
                handleChangeLink(event, linkObj.key, "linkName")
              }
            />
            <input
              type="url"
              className="linkRef"
              defaultValue={linkObj.linkRef}
              onChange={(event) =>
                handleChangeLink(event, linkObj.key, "linkRef")
              }
            />
            <button
              type="button"
              className="deleteListItemBtn"
              onClick={() => handleRemoveLink(linkObj.key)}
            >
              <span
                className="material-symbols-outlined deleteIcon"
                aria-hidden="true"
              >
                delete
              </span>
            </button>
          </div>
        ))}
        <button
          type="button"
          className="addListItemBtn"
          onClick={handleAddLink}
        >
          <span className="material-symbols-outlined" aria-hidden="true">
            add_link
          </span>
          add link
        </button>
      </div>
      <button type="submit">Save</button>
    </form>
  );
}

export default GenInfo;
