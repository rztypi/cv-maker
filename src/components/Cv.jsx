import CvPdf from "./CvPdf.jsx";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import "../styles/Cv.css";

function Cv({ cvData }) {
  return (
    <div id="cv">
      <PDFDownloadLink
        document={<CvPdf cvData={cvData} />}
        fileName="cv.pdf"
        className="downloadBtn"
      >
        {({ loading }) =>
          loading ? (
            <span className="material-symbols-outlined" aria-hidden="true">
              hourglass
            </span>
          ) : (
            <>
              <span className="material-symbols-outlined" aria-hidden="true">
                download
              </span>
              Download PDF
            </>
          )
        }
      </PDFDownloadLink>
      <PDFViewer className="pdfviewer" showToolbar={false}>
        <CvPdf cvData={cvData} />
      </PDFViewer>
    </div>
  );
}

export default Cv;
