import React, { useEffect, useState } from 'react';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import './procedure-ele.css'; // Combined styles into a single file

// Set the worker for PDF.js
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const Procedure = () => {
  const [pdfUrl, setPdfUrl] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.5); // Initial zoom level

  useEffect(() => {
    // Replace with your actual API call to fetch the PDF URL
    const fetchPdfUrl = async () => {
      try {
        const response = await fetch('https://www.orimi.com/pdf-test.pdf'); // Replace with your API endpoint
        const data = await response.json();
        setPdfUrl(data.pdfUrl);
      } catch (error) {
        console.error('Error fetching PDF:', error);
      }
    };
    fetchPdfUrl();
  }, []);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1); // Reset to the first page when a new document is loaded
  };

  const onDocumentError = (error) => {
    console.error('Error loading PDF:', error);
  };

  const changePage = (offset) => {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  };

  const zoomIn = () => setScale((prevScale) => Math.min(prevScale + 0.2, 3));
  const zoomOut = () => setScale((prevScale) => Math.max(prevScale - 0.2, 0.5));

  return (
    <div className="procedure-container">
      <h2>Procedure Document</h2>
      {pdfUrl ? (
        <div className="pdf-viewer">
          <Document
            file={pdfUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            onError={onDocumentError}
            loading="Loading PDF..."
          >
            <Page pageNumber={pageNumber} scale={scale} />
          </Document>

          {/* Controls for navigation and zoom */}
          <div className="pdf-controls">
            <button onClick={() => changePage(-1)} disabled={pageNumber <= 1}>
              <span aria-label="Previous page">Previous</span>
            </button>
            <span>
              Page {pageNumber} of {numPages}
            </span>
            <button onClick={() => changePage(1)} disabled={pageNumber >= numPages}>
              <span aria-label="Next page">Next</span>
            </button>

            <button onClick={zoomOut} disabled={scale <= 0.5}>
              <span aria-label="Zoom out">Zoom Out</span>
            </button>
            <button onClick={zoomIn} disabled={scale >= 3}>
              <span aria-label="Zoom in">Zoom In</span>
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