import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "../styles/Education.css";

function EducationItem({
  activeKey,
  setActiveKey,
  cvData,
  setCvData,
  educArray,
  setEducArray,
}) {
  const educObj = educArray.find((educObj) => educObj.key === activeKey);
  const [details, setDetails] = useState(educObj.details);

  function handleAddDetail() {
    setDetails(
      details.concat({
        key: uuidv4(),
        text: "",
      })
    );
  }

  function handleChangeDetail(event, key) {
    setDetails(
      details.map((detailObj) => {
        if (detailObj.key === key) {
          return { ...detailObj, text: event.target.value };
        }
        return detailObj;
      })
    );
  }

  function handleRemoveDetail(key) {
    setDetails(details.filter((detailObj) => detailObj.key !== key));
  }

  function handleCancelBtn() {
    setActiveKey(null);
    setEducArray(cvData.education);
  }

  function handleSaveEduc(event) {
    event.preventDefault();

    setCvData({
      ...cvData,
      education: educArray.map((educObj) => {
        if (educObj.key === activeKey) {
          return {
            key: activeKey,
            name: document.querySelector("#educName").value,
            endDate: document.querySelector("#educDate").value,
            degree: document.querySelector("#educDegree").value,
            address: document.querySelector("#educAddress").value,
            details: details.filter((detailObj) => !!detailObj.text),
          };
        }
        return educObj;
      }),
    });
  }

  return (
    <form onSubmit={handleSaveEduc} id="educForm">
      <div className="inputLabel">
        <label htmlFor="educName">
          University Name
          <span className="required" aria-hidden="true">
            *
          </span>
        </label>
        <input type="text" id="educName" defaultValue={educObj.name} required />
      </div>
      <div className="inputLabel">
        <label htmlFor="educDegree">
          Degree
          <span className="required" aria-hidden="true">
            *
          </span>
        </label>
        <input
          type="text"
          id="educDegree"
          defaultValue={educObj.degree}
          required
        />
      </div>
      <div className="inputLabel">
        <label htmlFor="educDate">
          Graduation Date{" "}
          <span className="required" aria-hidden="true">
            *
          </span>
        </label>
        <input
          type="month"
          id="educDate"
          defaultValue={educObj.endDate}
          required
        />
      </div>
      <div className="inputLabel">
        <label htmlFor="educAddress">Address</label>
        <input type="text" id="educAddress" defaultValue={educObj.address} />
      </div>
      <div className="detailsGroup">
        {details.length > 0 && <label>Details</label>}
        {details.map((detailObj) => (
          <div key={detailObj.key} className="detailsRow">
            <input
              type="text"
              defaultValue={detailObj.text}
              onChange={(event) => handleChangeDetail(event, detailObj.key)}
            />
            <button
              type="button"
              className="deleteListItemBtn"
              onClick={() => handleRemoveDetail(detailObj.key)}
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
          onClick={handleAddDetail}
        >
          <span className="material-symbols-outlined" aria-hidden="true">
            add
          </span>
          add detail
        </button>
      </div>
      <div className="bottomBtns">
        <button type="button" className="cancelBtn" onClick={handleCancelBtn}>
          Cancel
        </button>
        <button type="submit">Save</button>
      </div>
    </form>
  );
}

function Education({ cvData, setCvData }) {
  const [activeKey, setActiveKey] = useState(null);
  const [educArray, setEducArray] = useState(cvData.education);

  function handleAddEducBtn() {
    const newKey = uuidv4();
    setActiveKey(newKey);
    setEducArray(
      educArray.concat({
        key: newKey,
        name: "",
        endDate: "",
        degree: "",
        address: "",
        details: [],
      })
    );
  }

  function handleRemoveEducBtn(key) {
    const newEducArray = educArray.filter((educObj) => educObj.key !== key);
    setEducArray(newEducArray);
    setCvData({
      ...cvData,
      education: newEducArray,
    });
  }

  if (activeKey !== null) {
    return (
      <EducationItem
        activeKey={activeKey}
        setActiveKey={setActiveKey}
        cvData={cvData}
        setCvData={setCvData}
        educArray={educArray}
        setEducArray={setEducArray}
      ></EducationItem>
    );
  }

  return (
    <div className="educDiv">
      {educArray.map((educObj) => (
        <div key={educObj.key} className="educItem">
          <button
            type="button"
            className="itemSelectBtn"
            onClick={() => {
              setActiveKey(educObj.key);
            }}
          >
            {educObj.name}
          </button>
          <button
            type="button"
            className="deleteListItemBtn"
            onClick={() => handleRemoveEducBtn(educObj.key)}
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
        onClick={handleAddEducBtn}
      >
        <span className="material-symbols-outlined" aria-hidden="true">
          add
        </span>{" "}
        add education
      </button>
    </div>
  );
}

export default Education;
