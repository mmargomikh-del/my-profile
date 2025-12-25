import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// ✅ REQUIRED for Netlify + Vite
pdfjs.GlobalWorkerOptions.workerSrc =
  "https://unpkg.com/pdfjs-dist@4.4.168/build/pdf.worker.min.js";

export default function PdfCarousel({ pdf }) {
  const [numPages, setNumPages] = useState(null);
  const [page, setPage] = useState(1);

  if (!pdf) return null;

  // ✅ Make CMS-relative path absolute
  const pdfUrl = pdf.startsWith("http")
    ? pdf
    : `${window.location.origin}${pdf}`;

  function onLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPage(1);
  }

  function nextPage() {
    setPage((p) => Math.min(p + 1, numPages));
  }

  function prevPage() {
    setPage((p) => Math.max(p - 1, 1));
  }

  return (
    <div
      style={{
        width: "100%",
        padding: "1rem",
        background: "#2b2b2b",
        borderRadius: "12px",
        position: "relative",
      }}
    >
      <Document
        file={pdfUrl}
        onLoadSuccess={onLoadSuccess}
        onLoadError={(err) => console.error("PDF load error:", err)}
        loading={<p>Loading PDF…</p>}
        error={<p style={{ color: "red" }}>Failed to load PDF</p>}
      >
        <Page
          pageNumber={page}
          width={600}
          renderAnnotationLayer={false}
          renderTextLayer={false}
        />
      </Document>

      {/* Controls */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "1rem",
          alignItems: "center",
        }}
      >
        <button onClick={prevPage} disabled={page <= 1}>
          ← Prev
        </button>

        <span>
          Page {page} / {numPages || "?"}
        </span>

        <button onClick={nextPage} disabled={page >= numPages}>
          Next →
        </button>
      </div>

      {/* Open full PDF */}
      <a
        href={pdfUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: "absolute",
          top: "1rem",
          right: "1rem",
          color: "#7aa2ff",
          textDecoration: "underline",
        }}
      >
        Open PDF
      </a>
    </div>
  );
}
