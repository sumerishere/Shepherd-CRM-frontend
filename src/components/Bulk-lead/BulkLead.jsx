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


  const uploadFile = async (skipDuplicates = false) => {
    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file-xle", selectedFile);
    if (skipDuplicates) {
      formData.append("skipDuplicates", "true");
    }

    try {
      const response = await fetch("http://localhost:8080/add-bulk-lead", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 409 || data.error?.includes("duplicate")) {
          setShowDuplicateAlert(true);
        }
        throw new Error(data.error || "Failed to upload file");
      }

        // Check if recordsProcessed is 0, indicating invalid data
      if (data.recordsProcessed === 0) {
        setError("Failed!!! to proceed, check the data format again!");
        setSelectedFile(null);
        // const fileInput = document.querySelector('input[type="file"]');
        // if (fileInput) fileInput.value = "";
        return;
      }

      setUploadResponse(data);
      setSelectedFile(null);
      setShowDuplicateAlert(false);
      // Reset file input
      // const fileInput = document.querySelector('input[type="file"]');
      // if (fileInput) fileInput.value = "";
    }
     catch (err) {
      setError(err.message);
      setSelectedFile(null);
      // const fileInput = document.querySelector('input[type="file"]');
      // if (fileInput) fileInput.value = "";
    } 
    finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedFile) {
      setError("Please upload an Excel file.");
      return;
    }
    uploadFile(false);
  };

  const handleSkipDuplicates = () => {
    uploadFile(true);
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

        {uploadResponse && !error && uploadResponse.recordsProcessed > 0 && (
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

