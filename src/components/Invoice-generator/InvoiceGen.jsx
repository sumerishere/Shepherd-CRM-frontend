import { useState, useEffect } from "react";
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
    setItems([...items, { name: "", quantity: "", rate: "", amount: "" }]);
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

  const [imgData, setImgData] = useState("");

  // Convert local image to base64
  useEffect(() => {
    const loadImage = async () => {
      try {
        const response = await fetch("/Admin-img/logo.png");
        // Update this path
        const blob = await response.blob();
        const reader = new FileReader();
        reader.onloadend = () => {
          setImgData(reader.result);
        };
        reader.readAsDataURL(blob);
      } catch (error) {
        console.error("Error loading image:", error);
      }
    };

    loadImage();
  }, []);

  const generatePDF = () => {
    const doc = new jsPDF();

    // Add PNG Image from base64
    if (imgData) {
        doc.addImage(imgData, "PNG", 150, 10, 40, 40); // Adjusted image position
    } else {
        console.error("Image data is not available.");
    }

    // Title with "PAID" Text
    doc.setFontSize(16);
    const title = "Invoice";
    const paidText = "PAID";

    // Title positioning
    doc.setTextColor(0, 0, 0); // Black text
    doc.text(title, 20, 20);

    // Add "PAID" text with green background
    const paidTextWidth = doc.getTextWidth(paidText);
    const paidTextX = 20 + doc.getTextWidth(title) + 5; // Position "PAID" next to "Invoice"
    const titleY = 20;

    doc.setFillColor(0, 128, 0); // Green background for "PAID"
    doc.rect(paidTextX - 3, titleY - 4, paidTextWidth + 6, 10, 'F'); // Background rectangle
    doc.setTextColor(255, 255, 255); // White text color
    doc.text(paidText, paidTextX, titleY + 3);

    // Font sizes
    const headingFontSize = 12;
    const valueFontSize = 10;

    // Helper function to wrap text within a given width
    const wrapText = (text, x, y, maxWidth) => {
        const lines = doc.splitTextToSize(text, maxWidth);
        lines.forEach((line, index) => {
            doc.text(line, x, y + (index * 5)); // Adjust line spacing if needed
        });
        return lines.length * 5; // Return the total height used by the text
    };

    // Billed By Section
    const billedByX = 15;
    const billedByY = 50; // Adjusted to position below the title
    const width = 85;
    const radius = 5; // Radius for rounded corners

    // Calculate text height
    const billedByNameHeight = wrapText(invoiceDetails.billedByName, billedByX + 5, billedByY + 20, width - 10);
    const billedByAddressHeight = wrapText(invoiceDetails.billedByAddress, billedByX + 5, billedByY + 20 + billedByNameHeight, width - 10);

    // Adjust height of the rectangle dynamically
    const billedByHeight = billedByY + 20 + billedByNameHeight + billedByAddressHeight;
    drawRoundedRect(doc, billedByX, billedByY, width, billedByHeight - billedByY, radius);

    doc.setTextColor(0, 0, 0); // Black text
    doc.setFontSize(headingFontSize);
    doc.text("Billed By:", billedByX + 5, billedByY + 10);
    doc.setFontSize(valueFontSize);
    wrapText(invoiceDetails.billedByName, billedByX + 5, billedByY + 20, width - 10);
    wrapText(invoiceDetails.billedByAddress, billedByX + 5, billedByY + 20 + billedByNameHeight, width - 10);

    // Billed To Section
    const billedToX = 110;
    const billedToY = billedByY; // Start at the same vertical position as "Billed By"

    // Calculate text height
    const billedToNameHeight = wrapText(invoiceDetails.billedToName, billedToX + 5, billedToY + 20, width - 10);
    const billedToAddressHeight = wrapText(invoiceDetails.billedToAddress, billedToX + 5, billedToY + 20 + billedToNameHeight, width - 10);

    // Adjust height of the rectangle dynamically
    const billedToHeight = billedToY + 20 + billedToNameHeight + billedToAddressHeight;
    drawRoundedRect(doc, billedToX, billedToY, width, billedToHeight - billedToY, radius);

    doc.setTextColor(0, 0, 0); // Black text
    doc.setFontSize(headingFontSize);
    doc.text("Billed To:", billedToX + 5, billedToY + 10);
    doc.setFontSize(valueFontSize);
    wrapText(invoiceDetails.billedToName, billedToX + 5, billedToY + 20, width - 10);
    wrapText(invoiceDetails.billedToAddress, billedToX + 5, billedToY + 20 + billedToNameHeight, width - 10);

    // Table Headers and Rows
    const tableStartY = Math.max(billedByHeight, billedToHeight) + 20; // Position below the taller section
    doc.autoTable({
        startY: tableStartY,
        head: [["Item", "Quantity", "Rate", "Amount"]],
        body: items.map((item) => [
            item.name,
            item.quantity,
            item.rate,
            item.amount,
        ]),
        theme: "grid",
        headStyles: {
            fillColor: [128, 0, 128], // Purple
            textColor: [255, 255, 255], // White
        },
        styles: {
            fillColor: [240, 240, 255], // Light grey-purple
            textColor: [0, 0, 0], // Black
        },
        margin: { top: 10, right: 10, bottom: 10, left: 10 },
    });

    // Payments Section
    const paymentsStartY = doc.autoTable.previous.finalY + 20; // Position below the table
    doc.text("Payments:", 16, paymentsStartY);
    doc.autoTable({
        startY: paymentsStartY + 10, // Start below the "Payments" label
        head: [["Date", "Mode", "Amount"]],
        body: payments.map((payment) => [
            payment.date,
            payment.mode,
            payment.amount,
        ]),
        theme: "grid",
        headStyles: {
            fillColor: [128, 0, 128], // Purple
            textColor: [255, 255, 255], // White
        },
        styles: {
            fillColor: [240, 240, 255], // Light grey-purple
            textColor: [0, 0, 0], // Black
        },
        margin: { top: 10, right: 10, bottom: 10, left: 10 },
    });

    // Terms & Conditions Section
    const termsX = 15;
    const termsY = doc.autoTable.previous.finalY + 20; // Position below the payments section
    const termsWidth = 180; // Same width as other sections

    // Title and text positioning
    const termsTitleHeight = 20; // Height of title
    const termsText = [
        "1. Fees paid is not transferrable and non-refundable.",
        "2. Placement charges are applicable upon receipt of offer letter.",
        "3. Fees paid shall be applicable for the batch only for which admission is taken.",
        "4. Batch transfer charges (Rs. 5000) shall be applicable in case you want to change your current batch.",
        "5. If fees are paid in instalment, then the first instalment shall be paid at the time of admission and the next instalment shall be paid within 25 days of admission."
    ];
    const termsTextHeight = termsText.reduce((height, line) => height + wrapText(line, termsX + 5, termsY + height + termsTitleHeight, termsWidth - 10), 0);

    // Adjust height of the rectangle dynamically
    drawRoundedRect(doc, termsX, termsY, termsWidth, termsTitleHeight + termsTextHeight, radius);

    doc.setTextColor(0, 0, 0); // Black text
    doc.setFontSize(headingFontSize);
    doc.text("Terms & Conditions:", termsX + 5, termsY + 10); // Title above the rectangle
    doc.setFontSize(valueFontSize);
    termsText.forEach((line, index) => {
        wrapText(line, termsX + 5, termsY + 16 + (index * 6), termsWidth - 10); // Adjust spacing between lines
    });

    doc.save("invoice.pdf");
};

// Helper function to draw a rounded rectangle
const drawRoundedRect = (doc, x, y, width, height, radius) => {
    doc.setFillColor(240, 240, 255); // Light grey-purple

    // Draw the rounded rectangle
    doc.setDrawColor(0, 0, 0); // Border color (black)
    doc.setLineWidth(0.5); // Border width

    doc.roundedRect(x, y, width, height, radius, radius, 'F'); // 'F' for fill
    doc.roundedRect(x, y, width, height, radius, radius, 'S'); // 'S' for stroke
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
                  <option value="" disabled>
                    Select course type
                  </option>
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
          <button
            className="invoice-gen-add-payment-button"
            onClick={addPayment}
          >
            Add Payment
          </button>
        </div>
      </div>

      <div className="invoice-gen-footer">
        <button
          className="invoice-gen-generate-pdf-button"
          onClick={generatePDF}
        >
          Get Invoice PDF
        </button>
      </div>
    </div>
  );
};

export default InvoiceGen;
