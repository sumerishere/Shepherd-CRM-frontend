import { useState } from "react";
import "../Bulk-lead/BulkLead.css";

const BulkLeadComponent = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]); // Get the selected file
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedFile) {
      alert("Please upload an Excel file.");
      return;
    }
    console.log("File submitted:", selectedFile);
    // Add your file submission logic here (e.g., send to backend)
  };

  return (
    <div className="bulk-lead-root">

      <div>
        <p id="bulk-form-heading-p">Upload the bulk lead Excel File (.xlsx) to submit the all lead entries.</p>
      </div>

      <div className="bulk-lead-child">
        <form className="bulk-lead-form" onSubmit={handleSubmit}>
          <label className="bulk-lead-label">Upload Excel File (.xlsx)</label>
          <input
            type="file"
            accept=".xlsx"
            className="bulk-lead-file-input"
            onChange={handleFileChange}
          />
          <button type="submit" className="bulk-lead-submit-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default BulkLeadComponent;
