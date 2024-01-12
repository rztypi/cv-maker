import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "../styles/Section.css";

function Section({ cvData, setCvData, secObj }) {
  const [contentArray, setContentArray] = useState(secObj.content);

  function handleAddContent(type) {
    setContentArray(
      contentArray.concat({
        key: uuidv4(),
        type,
        text: "",
      })
    );
  }

  function handleContentChange(event, key) {
    setContentArray(
      contentArray.map((contentObj) => {
        if (contentObj.key === key) {
          return { ...contentObj, text: event.target.value };
        }
        return contentObj;
      })
    );
  }

  function handleDeleteBtn() {
    setCvData({
      ...cvData,
      sections: cvData.sections.filter((section) => section.key != secObj.key),
    });
  }

  function handleSaveSection(event) {
    event.preventDefault();

    setCvData({
      ...cvData,
      sections: cvData.sections.map((section) => {
        if (section.key === secObj.key) {
          return {
            ...secObj,
            title: document.querySelector(`#sectionTitle${secObj.key}`).value,
            content: contentArray.filter((contentObj) => !!contentObj.text),
          };
        }
        return section;
      }),
    });
  }

  return (
    <form onSubmit={handleSaveSection} className="sectionForm">
      <div className="inputLabel">
        <label htmlFor={"sectionTitle" + secObj.key}>Title</label>
        <input
          type="text"
          id={"sectionTitle" + secObj.key}
          defaultValue={secObj.title}
        />
      </div>
      <div className="detailsGroup">
        {contentArray.length > 0 && <label>Content</label>}
        {contentArray.map((content) => (
          <div key={content.key} className={content.type}>
            {content.type === "item" && (
              <span className="material-symbols-outlined" aria-hidden="true">
                arrow_right
              </span>
            )}
            <input
              type="text"
              id={content.key}
              defaultValue={content.text}
              onChange={(event) => handleContentChange(event, content.key)}
            ></input>
          </div>
        ))}
      </div>
      <div className="contentAddBtns">
        <button
          type="button"
          className="addListItemBtn"
          onClick={() => handleAddContent("heading")}
        >
          <span className="material-symbols-outlined" aria-hidden="true">
            add
          </span>
          add heading
        </button>
        <button
          type="button"
          className="addListItemBtn"
          onClick={() => handleAddContent("item")}
        >
          <span className="material-symbols-outlined" aria-hidden="true">
            add
          </span>
          add item
        </button>
      </div>
      <div className="bottomBtns">
        <button type="submit">Save</button>
        <button type="button" className="deleteBtn" onClick={handleDeleteBtn}>
          Delete
        </button>
      </div>
    </form>
  );
}

export default Section;
