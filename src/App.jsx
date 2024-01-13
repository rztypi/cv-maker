import { useState } from "react";
import Form from "./components/Form.jsx";
import Cv from "./components/Cv.jsx";
import Storage from "./storage.js";
import "./styles/App.css";

function App() {
  const [cvData, setCvDataState] = useState(Storage.getStoredData());

  function setCvData(data) {
    setCvDataState(data);
    Storage.setStoredData(data);
  }

  return (
    <div id="app">
      <header>
        <div className="headerContent">
          <h1>CV Maker</h1>
        </div>
      </header>
      <main>
        <Form cvData={cvData} setCvData={setCvData} />
        <Cv cvData={cvData} />
      </main>
      <footer>
        <a href="https://github.com/rztypi">rztypi</a>
      </footer>
    </div>
  );
}

export default App;
