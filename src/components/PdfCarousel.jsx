import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

/* Netlify + Vite safe worker */
pdfjs.GlobalWorkerOptions.workerSrc =
  "https://unpkg.com/pdfjs-dist@4.4.168/build/pdf.worker.min.js";

export default function PdfCarousel({ pdf }) {
  const [numPages, setNumPages] = useState(null);
  const [current, setCurrent] = useState(0);

  if (!pdf) return null;

  const pdfUrl = pdf.startsWith("http")
    ? pdf
    : `${window.location.origin}${pdf}`;

  function onLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setCurrent(0);
  }

  const next = () =>
    setCurrent((c) => Math.min(c + 1, numPages - 1));
  const prev = () =>
    setCurrent((c) => Math.max(c - 1, 0));

  return (
    <div style={styles.wrapper}>
      <Document
        file={pdfUrl}
        onLoadSuccess={onLoadSuccess}
        loading={<p>Loading PDF…</p>}
        error={<p style={{ color: "red" }}>Failed to load PDF</p>}
      >
        {numPages &&
          Array.from(new Array(numPages)).map((_, index) => (
            <div
              key={index}
              style={{
                ...styles.slide,
                transform: `translateX(${(index - current) * 100}%)`,
              }}
            >
              <Page
                pageNumber={index + 1}
                width={500}
                renderTextLayer={false}
                renderAnnotationLayer={false}
              />
            </div>
          ))}
      </Document>

      {/* Controls */}
      <button onClick={prev} disabled={current === 0} style={styles.left}>
        ←
      </button>
      <button
        onClick={next}
        disabled={current === numPages - 1}
        style={styles.right}
      >
        →
      </button>

      <div style={styles.counter}>
        {current + 1} / {numPages}
      </div>
    </div>
  );
}

/* Inline styles to avoid CSS bugs */
const styles = {
  wrapper: {
    position: "relative",
    width: "100%",
    maxWidth: "540px",
    height: "700px",
    overflow: "hidden",
    marginTop: "1rem",
    borderRadius: "12px",
    background: "#1e1e1e",
  },
  slide: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    transition: "transform 0.4s ease",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  left: {
    position: "absolute",
    left: "10px",
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: 10,
  },
  right: {
    position: "absolute",
    right: "10px",
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: 10,
  },
  counter: {
    position: "absolute",
    bottom: "10px",
    right: "50%",
    transform: "translateX(50%)",
    fontSize: "12px",
    opacity: 0.7,
  },
};
