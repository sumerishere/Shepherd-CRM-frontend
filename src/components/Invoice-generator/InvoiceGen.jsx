import { useState } from "react";
import "./InvoiceGen.css";

const InvoiceGen = () => {
  const [payments, setPayments] = useState([
    { date: "", mode: "", amount: "" },
  ]);

  const [items, setItems] = useState([
    { description: "", quantity: "", rate: "", amount: "" },
  ]);

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
    setItems([...items, { description: "", quantity: "", rate: "", amount: "" }]);
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

  const generatePDF = () => {
    // PDF generation logic
  };

  return (
    <div className="invoice-gen-root">
      <h1 className="invoice-gen-title">Invoice Generator</h1>
      <div className="invoice-gen-section">

        {/* Billed By Section */}
        <div className="invoice-gen-details">
          <h3 className="invoice-gen-header">Billed By</h3>
          <div className="invoice-gen-input-group">
            <div className="invoice-gen-input-container">
              <label htmlFor="billedByName">Name</label>
              <input type="text" id="billedByName" placeholder="Billed By Name" />
            </div>
            <div className="invoice-gen-input-container">
              <label htmlFor="billedByAddress">Address</label>
              <input type="text" id="billedByAddress" placeholder="Billed By Address" />
            </div>
          </div>
        </div>

        {/* Billed To Section */}
        <div className="invoice-gen-party-details">
          <h3 className="invoice-gen-header">Billed To</h3>
          <div className="invoice-gen-input-group">
            <div className="invoice-gen-input-container">
              <label htmlFor="billedToName">Name</label>
              <input type="text" id="billedToName" placeholder="Billed To Name" />
            </div>
            <div className="invoice-gen-input-container">
              <label htmlFor="billedToAddress">Address</label>
              <input type="text" id="billedToAddress" placeholder="Billed To Address" />
            </div>
          </div>
        </div>

        {/* Itemized Section */}
        <div className="invoice-gen-items-section">
          <h3 className="invoice-gen-header">Items</h3>
          {items.map((item, index) => (
            <div key={index} className="invoice-gen-input-group">
              <div className="invoice-gen-input-container">
                <label htmlFor={`itemDescription-${index}`}>Description</label>
                <input
                  type="text"
                  name="description"
                  id={`itemDescription-${index}`}
                  placeholder="Item Description"
                  value={item.description}
                  onChange={(e) => handleItemChange(index, e)}
                />
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
                <label htmlFor={`invoicePaymentDate-${index}`}>Date</label>
                <input
                  type="date"
                  name="date"
                  id={`invoicePaymentDate-${index}`}
                  value={payment.date}
                  onChange={(e) => handlePaymentChange(index, e)}
                />
              </div>
              <div className="invoice-gen-input-container">
                <label htmlFor={`invoicePaymentMode-${index}`}>Mode</label>
                <input
                  type="text"
                  name="mode"
                  id={`invoicePaymentMode-${index}`}
                  placeholder="Payment Mode"
                  value={payment.mode}
                  onChange={(e) => handlePaymentChange(index, e)}
                />
              </div>
              <div className="invoice-gen-input-container">
                <label htmlFor={`invoicePaymentAmount-${index}`}>Amount</label>
                <input
                  type="number"
                  name="amount"
                  id={`invoicePaymentAmount-${index}`}
                  placeholder="Amount"
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

        <button className="invoice-gen-generate-pdf-button" onClick={generatePDF}>
          Generate PDF
        </button>
      </div>
    </div>
  );
};

export default InvoiceGen;
