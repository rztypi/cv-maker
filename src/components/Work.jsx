import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { getYearMonthFromFormat, getFormatFromYearMonth } from "../utils.js";
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
  const [workDetails, setWorkDetails] = useState([...workObj.details]);
  const [present, setPresent] = useState(workObj.endYear === "Present");

  function handleAddDetail() {
    setWorkDetails(
      workDetails.concat({
        key: uuidv4(),
        text: "",
      })
    );
  }

  function handleChangeDetail(event, key) {
    setWorkDetails(
      workDetails.map((detailObj) => {
        if (detailObj.key === key) {
          return { ...detailObj, text: event.target.value };
        }
        return detailObj;
      })
    );
  }

  function handleRemoveDetail(key) {
    setWorkDetails(workDetails.filter((detailObj) => detailObj.key !== key));
  }

  function handleCancelBtn() {
    setActiveKey(null);
    setWorkArray([...cvData.work]);
  }

  function handleSaveWork(event) {
    event.preventDefault();

    const [startYear, startMonth] = getYearMonthFromFormat(
      document.querySelector("#workStartDate").value
    );
    let endYear, endMonth;
    if (present) {
      endYear = "Present";
    } else {
      [endYear, endMonth] = getYearMonthFromFormat(
        document.querySelector("#workEndDate").value
      );
    }

    setCvData({
      ...cvData,
      work: workArray.map((workObj) => {
        if (workObj.key === activeKey) {
          return {
            key: activeKey,
            name: document.querySelector("#workName").value,
            startMonth,
            startYear,
            endMonth,
            endYear,
            title: document.querySelector("#workTitle").value,
            address: document.querySelector("#workAddress").value,
            details: workDetails.filter((detailObj) => !!detailObj.text),
          };
        }
        return workObj;
      }),
    });
  }

  return (
    <form onSubmit={handleSaveWork} id="workForm">
      <div className="inputLabel">
        <label htmlFor="workName">Company Name</label>
        <input type="text" id="workName" defaultValue={workObj.name} />
      </div>
      <div className="inputLabel">
        <label htmlFor="workTitle">Title</label>
        <input type="text" id="workTitle" defaultValue={workObj.title} />
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
            <label htmlFor="workStartDate">Start Date</label>
            <input
              type="month"
              id="workStartDate"
              defaultValue={getFormatFromYearMonth(
                workObj.startYear,
                workObj.startMonth
              )}
            />
          </div>
          <div className="inputLabel">
            <label htmlFor="workEndDate">End Date</label>
            <input
              type="month"
              id="workEndDate"
              defaultValue={getFormatFromYearMonth(
                workObj.endYear,
                workObj.endMonth
              )}
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
        {workDetails.length > 0 && <label>Details</label>}
        {workDetails.map((detailObj) => (
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
              <span className="material-symbols-outlined deleteIcon">
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
          <span className="material-symbols-outlined">add</span> add detail
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

function Work({ cvData, setCvData }) {
  const [activeKey, setActiveKey] = useState(null);
  const [workArray, setWorkArray] = useState([...cvData.work]);

  function handleAddWorkBtn() {
    const newKey = uuidv4();
    setActiveKey(newKey);
    setWorkArray(
      workArray.concat({
        key: newKey,
        name: "",
        startMonth: "",
        startYear: "",
        endMonth: "",
        endYear: "",
        title: "",
        address: "",
        details: [],
      })
    );
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
        <button
          key={workObj.key}
          type="button"
          className="itemSelectBtn"
          onClick={() => {
            setActiveKey(workObj.key);
          }}
        >
          {workObj.name}
        </button>
      ))}
      <button
        type="button"
        className="addListItemBtn"
        onClick={handleAddWorkBtn}
      >
        <span className="material-symbols-outlined">add</span> add work
        experience
      </button>
    </div>
  );
}

export default Work;
