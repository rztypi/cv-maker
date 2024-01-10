import { useState } from "react";
import "../styles/Work.css";

function WorkItem({ workObj, handleSaveWork }) {
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
          <input type="checkbox" id="present" />
          <label htmlFor="present">I am currently working here</label>
        </div>
        <div className="dateRow">
          <div className="inputLabel">
            <label htmlFor="workStartDate">Start Date</label>
            <input type="month" id="workStartDate" />
          </div>
          <div className="inputLabel">
            <label htmlFor="workEndDate">End Date</label>
            <input type="month" id="workEndDate" />
          </div>
        </div>
      </div>
      <div className="inputLabel">
        <label htmlFor="workAddress">Address</label>
        <input type="text" id="workAddress" defaultValue={workObj.address} />
      </div>
      <button type="submit">Save</button>
    </form>
  );
}

function Work({ cvData, setCvData }) {
  const [activeKey, setActiveKey] = useState(null);

  function handleSaveWork(event) {
    event.preventDefault();
  }

  return (
    <div className="workDiv">
      {activeKey !== null ? (
        <WorkItem
          workObj={cvData.work.find((workObj) => workObj.key === activeKey)}
          handleSaveWork={handleSaveWork}
        ></WorkItem>
      ) : (
        <>
          {cvData.work.map((workObj) => (
            <button
              key={workObj.key}
              type="button"
              onClick={() => {
                setActiveKey(workObj.key);
              }}
            >
              {workObj.name}
            </button>
          ))}
          <button type="button">add work experience</button>
        </>
      )}
    </div>
  );
}

export default Work;
