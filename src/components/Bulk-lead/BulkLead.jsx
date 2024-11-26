import { useState } from "react";
import "./BulkLead.css";

const BulkLeadComponent = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showDuplicateAlert, setShowDuplicateAlert] = useState(false);
  const [uploadResponse, setUploadResponse] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.name.match(/\.(xlsx|xls)$/)) {
        setError("Please upload a valid Excel file (.xlsx or .xls)");
        setSelectedFile(null);
        e.target.value = null;
      } else {
        setError(null);
        setSelectedFile(file);
      }
    }
  };

  const uploadFile = async () => {
    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file-xle", selectedFile);

    try {
      const response = await fetch("http://localhost:8080/add-bulk-lead", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.error?.includes("duplicate")) {
          setShowDuplicateAlert(true);
        } else {
          throw new Error(data.error || "Failed to upload file");
        }
      } else {
        setUploadResponse(data);
        setSelectedFile(null);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedFile) {
      setError("Please upload an Excel file.");
      return;
    }
    uploadFile();
  };

  const handleSkipDuplicates = () => {
    setShowDuplicateAlert(false);
    // Add logic to resubmit with skip duplicates flag
  };

  return (
    <div className="bulk-lead-root">
      <div className="bulk-lead-child">
        <form className="bulk-lead-form" onSubmit={handleSubmit}>
          <label className="bulk-lead-label">Upload Excel File (.xlsx)</label>
          <input
            type="file"
            accept=".xlsx,.xls"
            className="bulk-lead-file-input"
            onChange={handleFileChange}
            disabled={isLoading}
          />
          <button
            type="submit"
            className={`bulk-lead-submit-button ${isLoading ? "loading" : ""}`}
            disabled={!selectedFile || isLoading}
          >
            {isLoading ? (
              <>
                <span className="spinner"></span>
                Processing...
              </>
            ) : (
              "Submit"
            )}
          </button>
        </form>
        <div>
          <p id="bulk-form-heading-p">
            Upload the bulk lead Excel File (.xlsx) to submit the all lead
            entries.
          </p>
        </div>

        {error && <div className="error-message">{error}</div>}

        {uploadResponse && (
          <div className="success-message">
            Successfully processed {uploadResponse.recordsProcessed} records
          </div>
        )}

        {showDuplicateAlert && (
          <div className="duplicate-alert-overlay">
            <div className="duplicate-alert-container">
              <h3>Duplicate Entries Found</h3>
              <p>
                Some entries in the Excel file already exist in the system.
                Would you like to skip the duplicate entries and continue with
                the upload?
              </p>
              <div className="duplicate-alert-buttons">
                <button
                  className="duplicate-alert-button cancel"
                  onClick={() => setShowDuplicateAlert(false)}
                >
                  Cancel
                </button>
                <button
                  className="duplicate-alert-button skip"
                  onClick={handleSkipDuplicates}
                >
                  Skip Duplicates
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BulkLeadComponent;

// import { useState } from "react";
// import "../Bulk-lead/BulkLead.css";

// const BulkLeadComponent = () => {
//   const [selectedFile, setSelectedFile] = useState(null);

//   const handleFileChange = (e) => {
//     setSelectedFile(e.target.files[0]); // Get the selected file
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!selectedFile) {
//       alert("Please upload an Excel file.");
//       return;
//     }
//     console.log("File submitted:", selectedFile);
//     // Add your file submission logic here (e.g., send to backend)
//   };

//   return (
//     <div className="bulk-lead-root">

//       <div>
//         <p id="bulk-form-heading-p">Upload the bulk lead Excel File (.xlsx) to submit the all lead entries.</p>
//       </div>

//       <div className="bulk-lead-child">
//         <form className="bulk-lead-form" onSubmit={handleSubmit}>
//           <label className="bulk-lead-label">Upload Excel File (.xlsx)</label>
//           <input
//             type="file"
//             accept=".xlsx"
//             className="bulk-lead-file-input"
//             onChange={handleFileChange}
//           />
//           <button type="submit" className="bulk-lead-submit-button">
//             Submit
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default BulkLeadComponent;
