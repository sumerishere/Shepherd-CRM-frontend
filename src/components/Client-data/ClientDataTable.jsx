import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import ClientData from "../Client-data/ClientData";
import "../Client-data/ClientDataTable.css";

const ClientDataTable = ({ templateId }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set loading to true when the component starts loading
    if (templateId !== null) {
      setLoading(true);
      // Simulate a loading delay
      setTimeout(() => {
        setLoading(false); // Set loading to false after data is "fetched"
      }, 1000); // Adjust the timeout duration as needed
    } else {
      setLoading(false); // No need to load if templateId is null
    }
  }, [templateId]);

  return (
    <div className="client-data-table-root">
      {loading ? (
        <div className="loading-div">
          <p id="loading-text">Loading...</p>
        </div>
      ) : templateId !== null ? (
        <div className="client-data-table-div">
          <ClientData templateId={templateId} />
        </div>
      ) : (
        <div className="data-not-found-div">
          <img
            className="data-not-found-img"
            src="/images/undraw_File_searching_.png"
            alt="Data not found"
          />
          <p id="data-not-found-p">Oops...Data Not Found!!!</p>
        </div>
      )}
    </div>
  );
};

// Add prop validation using PropTypes
ClientDataTable.propTypes = {
  templateId: PropTypes.string.isRequired, // Ensure templateId is required and a string
};

export default ClientDataTable;
