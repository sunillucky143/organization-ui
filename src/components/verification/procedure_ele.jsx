import React, { useEffect, useState } from 'react';
import { Document, Page } from 'react-pdf'; // Importing from react-pdf
import { pdfjs } from 'react-pdf'; // To ensure the PDF worker is set
import '@react-pdf-viewer/core/lib/styles/index.css';
import './procedure-ele.css';

// Set the worker for PDF.js
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const Procedure = () => {
  const [pdfUrl, setPdfUrl] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.5); // Initial zoom level

  useEffect(() => {
    // Simulate API call to fetch the PDF URL
    const simulateApiCall = () => {
      const samplePdfUrl = 'https://www.orimi.com/pdf-test.pdf'; // Use a sample PDF URL
      setPdfUrl(samplePdfUrl);
    };
    simulateApiCall();
  }, []);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1); // Reset to the first page when a new document is loaded
  };

  const changePage = (offset) => {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  };

  const zoomIn = () => setScale((prevScale) => Math.min(prevScale + 0.2, 3)); // Max zoom in to 3x
  const zoomOut = () => setScale((prevScale) => Math.max(prevScale - 0.2, 0.5)); // Min zoom out to 0.5x

  return (
    <div className="procedure-container">
      <h2>Procedure Document</h2>
      {pdfUrl ? (
        <div className="pdf-viewer">
          <Document
            file={pdfUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            loading="Loading PDF..."
          >
            <Page pageNumber={pageNumber} scale={scale} />
          </Document>

          {/* Controls for navigation and zoom */}
          <div className="pdf-controls">
            <button onClick={() => changePage(-1)} disabled={pageNumber <= 1}>
              Previous
            </button>
            <span>
              Page {pageNumber} of {numPages}
            </span>
            <button onClick={() => changePage(1)} disabled={pageNumber >= numPages}>
              Next
            </button>

            <button onClick={zoomOut} disabled={scale <= 0.5}>
              Zoom Out
            </button>
            <button onClick={zoomIn} disabled={scale >= 3}>
              Zoom In
            </button>
          </div>
        </div>
      ) : (
        <p>Loading procedure PDF...</p>
      )}
    </div>
  );
};

export default Procedure;
