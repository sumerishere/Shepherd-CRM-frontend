import { useEffect, useState } from 'react';
import './DataTableComp.css';
import PropTypes from 'prop-types';

const DataTableComp = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/get-template-data/${1}`);
        if (response.ok) {
          const result = await response.json();
          console.log("Fetched template data:", result);
          setData(result);
        } else {
          console.error("Failed to fetch template data");
        }
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div id="loading-id">Loading...</div>;
  }

  if (data.length === 0) {
    return <div>No data available for the selected template.</div>;
  }

  // Extract fields_Data for table
  const fieldsDataArray = data.map((item) => item.fields_Data);
  const columnHeaders = Object.keys(fieldsDataArray[0]); // Get column headers from first object

  return (
    <div className="data-table-root">
      {/* <h1 id="data-table-h1">Data Table</h1> */}
      <div className="data-table-child">
        <table className='table-class'>
          <thead>
            <tr>
              {columnHeaders.map((header) => (
                <th key={header}>{header}</th>
              ))}
              <th>UID</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.uid}>
                {columnHeaders.map((header) => (
                  <td key={header}>
                    {typeof row.fields_Data[header] === 'boolean' ? (
                      row.fields_Data[header] ? 'Yes' : 'No'
                    ) : (
                      row.fields_Data[header]
                    )}
                  </td>
                ))}
                <td>{row.uid}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

DataTableComp.propTypes = {
  formTemplateId: PropTypes.number.isRequired,
};

export default DataTableComp;
