import { useState } from "react";
import "../styles/Work.css";

function WorkItem({ workObj, handleSaveWork }) {
  return (
    <form onSubmit={handleSaveWork} id="workForm">
      <label htmlFor={"workName" + workObj.key}>Company Name</label>
      <input
        type="text"
        id={"workName" + workObj.key}
        defaultValue={workObj.name}
      />
      <label htmlFor={"workTitle" + workObj.key}>Title</label>
      <input
        type="text"
        id={"workTitle" + workObj.key}
        defaultValue={workObj.title}
      />
      <div className="dateGroup">
        <div className="checkbox">
          <input type="checkbox" id="present" />
          <label htmlFor="present">I am currently working here</label>
        </div>
        <div className="dateRow">
          <div className="inputLabel">
            <label htmlFor="">Start Date</label>
            <input type="month" />
          </div>
          <div className="inputLabel">
            <label htmlFor="">End Date</label>
            <input type="month" />
          </div>
        </div>
      </div>
      <label htmlFor={"workAddress" + workObj.key}>Address</label>
      <input
        type="text"
        id={"workAddress" + workObj.key}
        defaultValue={workObj.address}
      />
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
        cvData.work.map((workObj) => (
          <button
            key={workObj.key}
            type="button"
            onClick={() => {
              setActiveKey(workObj.key);
            }}
          >
            {workObj.name}
          </button>
        ))
      )}
      <button type="button">add work experience</button>
    </div>
  );
}

export default Work;
