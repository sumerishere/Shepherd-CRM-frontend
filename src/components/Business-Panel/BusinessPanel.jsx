import "./BusinessPanel.css";

const BusinessPanel = () => {
  return (
    <div className="business-root-div">

      <div className="business-container-div">

        <div className="create-batch">
          <p>Create Batch</p>
          <input type="text" name="" placeholder="Enter batch Name" id="input-batch" />
          <button id="create-batch-btn">Create Batch</button>
        </div>

        <div className="card-title">
          <h3>Card Title</h3>
          <p id="info-text">The Lead Info Page</p>
          <button id="lead-info-btn">Lead Info Page</button></div>
      </div>
      
    </div>
  );
};

export default BusinessPanel;
