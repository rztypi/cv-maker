import CvPdf from "./CvPdf.jsx";
import { PDFViewer } from "@react-pdf/renderer";
import "../styles/Cv.css";

function Cv({ cvData }) {
  return (
    <div id="cv">
      <PDFViewer className="pdfviewer" showToolbar={false}>
        <CvPdf cvData={cvData} />
      </PDFViewer>
    </div>
  );
}

export default Cv;
