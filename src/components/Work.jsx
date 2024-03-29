import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "../styles/Work.css";

function WorkItem({
  activeKey,
  setActiveKey,
  cvData,
  setCvData,
  workArray,
  setWorkArray,
}) {
  const workObj = workArray.find((workObj) => workObj.key === activeKey);
  const [details, setDetails] = useState(workObj.details);
  const [present, setPresent] = useState(workObj.endDate === "present");

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
    setWorkArray(cvData.work);
  }

  function handleSaveWork(event) {
    event.preventDefault();

    setCvData({
      ...cvData,
      work: workArray.map((workObj) => {
        if (workObj.key === activeKey) {
          return {
            key: activeKey,
            name: document.querySelector("#workName").value,
            startDate: document.querySelector("#workStartDate").value,
            endDate: present
              ? "present"
              : document.querySelector("#workEndDate").value,
            title: document.querySelector("#workTitle").value,
            address: document.querySelector("#workAddress").value,
            details: details.filter((detailObj) => !!detailObj.text),
          };
        }
        return workObj;
      }),
    });
  }

  return (
    <form onSubmit={handleSaveWork} id="workForm">
      <div className="inputLabel">
        <label htmlFor="workName">
          Company Name
          <span className="required" aria-hidden="true">
            *
          </span>
        </label>
        <input type="text" id="workName" defaultValue={workObj.name} required />
      </div>
      <div className="inputLabel">
        <label htmlFor="workTitle">
          Title
          <span className="required" aria-hidden="true">
            *
          </span>
        </label>
        <input
          type="text"
          id="workTitle"
          defaultValue={workObj.title}
          required
        />
      </div>
      <div className="dateGroup">
        <div className="checkbox">
          <input
            type="checkbox"
            id="present"
            checked={present}
            onChange={() => setPresent(!present)}
          />
          <label htmlFor="present">I am currently working here</label>
        </div>
        <div className="dateRow">
          <div className="inputLabel">
            <label htmlFor="workStartDate">
              Start Date
              <span className="required" aria-hidden="true">
                *
              </span>
            </label>
            <input
              type="month"
              id="workStartDate"
              defaultValue={workObj.startDate}
              required
            />
          </div>
          <div className="inputLabel">
            <label htmlFor="workEndDate">End Date</label>
            <input
              type="month"
              id="workEndDate"
              defaultValue={workObj.endDate}
              disabled={present}
            />
          </div>
        </div>
      </div>
      <div className="inputLabel">
        <label htmlFor="workAddress">Address</label>
        <input type="text" id="workAddress" defaultValue={workObj.address} />
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
        <button type="submit">Save</button>
        <button type="button" className="cancelBtn" onClick={handleCancelBtn}>
          Cancel
        </button>
      </div>
    </form>
  );
}

function Work({ cvData, setCvData }) {
  const [activeKey, setActiveKey] = useState(null);
  const [workArray, setWorkArray] = useState(cvData.work);

  function handleAddWorkBtn() {
    const newKey = uuidv4();
    setActiveKey(newKey);
    setWorkArray(
      workArray.concat({
        key: newKey,
        name: "",
        startDate: "",
        endDate: "",
        title: "",
        address: "",
        details: [],
      })
    );
  }

  function handleRemoveWorkBtn(key) {
    const newWorkArray = workArray.filter((workObj) => workObj.key !== key);
    setWorkArray(newWorkArray);
    setCvData({
      ...cvData,
      work: newWorkArray,
    });
  }

  if (activeKey !== null) {
    return (
      <WorkItem
        activeKey={activeKey}
        setActiveKey={setActiveKey}
        cvData={cvData}
        setCvData={setCvData}
        workArray={workArray}
        setWorkArray={setWorkArray}
      ></WorkItem>
    );
  }

  return (
    <div className="workDiv">
      {workArray.map((workObj) => (
        <div key={workObj.key} className="workItem">
          <button
            type="button"
            className="itemSelectBtn"
            onClick={() => {
              setActiveKey(workObj.key);
            }}
          >
            {workObj.name}
          </button>
          <button
            type="button"
            className="deleteListItemBtn"
            onClick={() => handleRemoveWorkBtn(workObj.key)}
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
        onClick={handleAddWorkBtn}
      >
        <span className="material-symbols-outlined" aria-hidden="true">
          add
        </span>
        add work experience
      </button>
    </div>
  );
}

export default Work;
