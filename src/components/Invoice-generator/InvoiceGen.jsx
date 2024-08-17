import { useState,useEffect } from "react";
import jsPDF from "jspdf";
import "./InvoiceGen.css";
import "jspdf-autotable";

const InvoiceGen = () => {
  const [payments, setPayments] = useState([
    { date: "", mode: "", amount: "" },
  ]);
  const [items, setItems] = useState([
    { name: "", quantity: "", rate: "", amount: "" },
  ]);
  const [invoiceDetails, setInvoiceDetails] = useState({
    billedByName: "",
    billedByAddress: "",
    billedToName: "",
    billedToAddress: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInvoiceDetails({ ...invoiceDetails, [name]: value });
  };

  const handlePaymentChange = (index, event) => {
    const { name, value } = event.target;
    const newPayments = [...payments];
    newPayments[index][name] = value;
    setPayments(newPayments);
  };

  const handleItemChange = (index, event) => {
    const { name, value } = event.target;
    const newItems = [...items];
    newItems[index][name] = value;
    setItems(newItems);
  };

  const addItem = () => {
    setItems([
      ...items,
      { name: "", quantity: "", rate: "", amount: "" },
    ]);
  };

  const addPayment = () => {
    setPayments([...payments, { date: "", mode: "", amount: "" }]);
  };

  const removeItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const removePayment = (index) => {
    const newPayments = payments.filter((_, i) => i !== index);
    setPayments(newPayments);
  };


  const [imgData, setImgData] = useState('');

  // Convert local image to base64
  useEffect(() => {
    const loadImage = async () => {
      try {
        const response = await fetch('/Admin-img/logo.png');
 // Update this path
        const blob = await response.blob();
        const reader = new FileReader();
        reader.onloadend = () => {
          setImgData(reader.result);
        };
        reader.readAsDataURL(blob);
      } catch (error) {
        console.error('Error loading image:', error);
      }
    };

    loadImage();
  }, []);
  
  const generatePDF = () => {

    const doc = new jsPDF();

    if (imgData) {
      // Add PNG Image from base64
      doc.addImage(imgData, 'PNG', 160, 3, 40, 40); // Adjust these values as needed
    } else {
      console.error('Image data is not available.');
    }

    doc.setFontSize(16);
    doc.text("Invoice", 105, 20, { align: "center" });
  
    // Billed By Section
    const billedByX = 20;
    const billedByY = 40;
    doc.setFillColor(240, 240, 255); // Light grey-purple
    doc.rect(billedByX, billedByY, 85, 40, "F"); // Draw filled rectangle
    doc.setTextColor(0, 0, 0); // Black text
    doc.text("Billed By:", billedByX, billedByY + 10);
    doc.text(invoiceDetails.billedByName, billedByX, billedByY + 20);
    doc.text(invoiceDetails.billedByAddress, billedByX, billedByY + 30);
  
    // Billed To Section
    const billedToX = 115;
    const billedToY = 40;
    doc.setFillColor(240, 240, 255); // Light grey-purple
    doc.rect(billedToX, billedToY, 85, 40, "F"); // Draw filled rectangle
    doc.setTextColor(0, 0, 0); // Black text
    doc.text("Billed To:", billedToX, billedToY + 10);
    doc.text(invoiceDetails.billedToName, billedToX, billedToY + 20);
    doc.text(invoiceDetails.billedToAddress, billedToX, billedToY + 30);
  
    // Table Headers and Rows
    doc.autoTable({
      startY: billedToY + 50, // Start below "Billed To" section
      head: [["Item", "Quantity", "Rate", "Amount"]],
      body: items.map(item => [item.name, item.quantity, item.rate, item.amount]),
      theme: "grid",
      headStyles: {
        fillColor: [128, 0, 128], // Purple
        textColor: [255, 255, 255] // White
      },
      styles: {
        fillColor: [240, 240, 255], // Light grey-purple
        textColor: [0, 0, 0] // Black
      },
      margin: { top: 10, right: 10, bottom: 10, left: 10 }
    });
  
    // Payments Section
    doc.text("Payments:", 20, doc.autoTable.previous.finalY + 20);
    doc.autoTable({
      startY: doc.autoTable.previous.finalY + 30, // Start below previous table
      head: [["Date", "Mode", "Amount"]],
      body: payments.map(payment => [payment.date, payment.mode, payment.amount]),
      theme: "grid",
      headStyles: {
        fillColor: [128, 0, 128], // Purple
        textColor: [255, 255, 255] // White
      },
      styles: {
        fillColor: [240, 240, 255], // Light grey-purple
        textColor: [0, 0, 0] // Black
      },
      margin: { top: 10, right: 10, bottom: 10, left: 10 }
    });
  
    doc.save("invoice.pdf");
  };

  return (
    <div className="invoice-gen-root">
      <h1 className="invoice-gen-title">Invoice Generator</h1>
      <div id="invoice-gen-section" className="invoice-gen-section">
        {/* Billed By Section */}
        <div className="invoice-gen-details">
          <h3 className="invoice-gen-header">Billed By</h3>
          <div className="invoice-gen-input-group">
            <div className="invoice-gen-input-container">
              <label htmlFor="billedByName">Name</label>
              <input
                type="text"
                id="billedByName"
                name="billedByName"
                placeholder="Billed By Name"
                value={invoiceDetails.billedByName}
                onChange={handleInputChange}
              />
            </div>
            <div className="invoice-gen-input-container">
              <label htmlFor="billedByAddress">Address</label>
              <input
                type="text"
                id="billedByAddress"
                name="billedByAddress"
                placeholder="Billed By Address"
                value={invoiceDetails.billedByAddress}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        {/* Billed To Section */}
        <div className="invoice-gen-party-details">
          <h3 className="invoice-gen-header">Billed To</h3>
          <div className="invoice-gen-input-group">
            <div className="invoice-gen-input-container">
              <label htmlFor="billedToName">Name</label>
              <input
                type="text"
                id="billedToName"
                name="billedToName"
                placeholder="Billed To Name"
                value={invoiceDetails.billedToName}
                onChange={handleInputChange}
              />
            </div>
            <div className="invoice-gen-input-container">
              <label htmlFor="billedToAddress">Address</label>
              <input
                type="text"
                id="billedToAddress"
                name="billedToAddress"
                placeholder="Billed To Address"
                value={invoiceDetails.billedToAddress}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        {/* Items Section */}
        <div className="invoice-gen-items-section">
          <h3 className="invoice-gen-header">Items</h3>
          {items.map((item, index) => (
            <div key={index} className="invoice-gen-input-group">
              <div className="invoice-gen-input-container">
                <label htmlFor={`itemName-${index}`}>Item</label>
                <select
                  name="name"
                  id={`itemName-${index}`}
                  value={item.name}
                  onChange={(e) => handleItemChange(index, e)}
                >
                  <option value="" disabled>Select course type</option>
                  <option value="Java fullStack development">
                    Java fullStack development
                  </option>
                  <option value="Automation Testing">Automation Testing</option>
                  <option value="UI/UX">UI/UX</option>
                  <option value="MERN Stack">MERN Stack</option>
                  {/* Add more options as needed */}
                </select>
              </div>

              <div className="invoice-gen-input-container">
                <label htmlFor={`itemQuantity-${index}`}>Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  id={`itemQuantity-${index}`}
                  placeholder="Quantity"
                  value={item.quantity}
                  onChange={(e) => handleItemChange(index, e)}
                />
              </div>
              <div className="invoice-gen-input-container">
                <label htmlFor={`itemRate-${index}`}>Rate</label>
                <input
                  type="number"
                  name="rate"
                  id={`itemRate-${index}`}
                  placeholder="Rate"
                  value={item.rate}
                  onChange={(e) => handleItemChange(index, e)}
                />
              </div>
              <div className="invoice-gen-input-container">
                <label htmlFor={`itemAmount-${index}`}>Amount</label>
                <input
                  type="number"
                  name="amount"
                  id={`itemAmount-${index}`}
                  placeholder="Amount"
                  value={item.amount}
                  onChange={(e) => handleItemChange(index, e)}
                />
              </div>
              <button
                className="invoice-gen-remove-item-button"
                onClick={() => removeItem(index)}
              >
                Remove Item
              </button>
            </div>
          ))}
          <button className="invoice-gen-add-item-button" onClick={addItem}>
            Add Item
          </button>
        </div>

        {/* Payments Section */}
        <div className="invoice-gen-payments-section">
          <h3 className="invoice-gen-header">Payments</h3>
          {payments.map((payment, index) => (
            <div key={index} className="invoice-gen-input-group">
              <div className="invoice-gen-input-container">
                <label htmlFor={`paymentDate-${index}`}>Date</label>
                <input
                  type="date"
                  name="date"
                  id={`paymentDate-${index}`}
                  placeholder="Payment Date"
                  value={payment.date}
                  onChange={(e) => handlePaymentChange(index, e)}
                />
              </div>
              <div className="invoice-gen-input-container">
                <label htmlFor={`paymentMode-${index}`}>Mode</label>
                <input
                  type="text"
                  name="mode"
                  id={`paymentMode-${index}`}
                  placeholder="Payment Mode"
                  value={payment.mode}
                  onChange={(e) => handlePaymentChange(index, e)}
                />
              </div>
              <div className="invoice-gen-input-container">
                <label htmlFor={`paymentAmount-${index}`}>Amount</label>
                <input
                  type="number"
                  name="amount"
                  id={`paymentAmount-${index}`}
                  placeholder="Payment Amount"
                  value={payment.amount}
                  onChange={(e) => handlePaymentChange(index, e)}
                />
              </div>
              <button
                className="invoice-gen-remove-payment-button"
                onClick={() => removePayment(index)}
              >
                Remove Payment
              </button>
            </div>
          ))}
          <button className="invoice-gen-add-payment-button" onClick={addPayment}>
            Add Payment
          </button>
        </div>
      </div>

      <div className="invoice-gen-footer">
        <button className="invoice-gen-generate-pdf-button" onClick={generatePDF}>
          Get Invoice PDF
        </button>
      </div>
    </div>
  );
};

export default InvoiceGen;
