import PropTypes from "prop-types";
import ClientData from "../Client-data/ClientData";
import "../Client-data/ClientDataTable.css";

const ClientDataTable = ({ templateId }) => {

  console.log("templateId = ",templateId)
  return (
    <div className="client-data-table-root">
      {templateId !== null ? (
        <div className="client-data-table-div">
          <ClientData templateId={templateId} />
        </div>
      ) : (
        <div className="data-not-found-div">
          <img className="data-not-found-img" src="/images/data-not-found.jpg" alt="img" />
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
