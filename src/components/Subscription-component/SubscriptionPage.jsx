import "./SubscriptionPage.css";

const SubscriptionPage = () => {
  return (
    <div className="subscription-page-root">
      <div className="subscription-page-container">
        <h1 className="subscription-title">Choose your plan</h1>
        <div className="subscription-plans-container">
          <div className="subscription-plan subscription-plan-create">
            <h2>Create</h2>
            <p className="subscription-price">
              $79 <span>per month</span>
            </p>
            <p>15,000 unique monthly visitors</p>
            <button className="subscription-btn">
              Start 14-day free trial
            </button>
            <ul className="subscription-features">
              <li>#1 drag & drop builder</li>
              <li>Reusable page blocks and forms</li>
              <li>Real-time visual collaboration</li>
              <li>Triggered popups and sticky bars</li>
              <li>AI content</li>
              <li>Mobile responsiveness</li>
            </ul>
            <p>Unlimited conversions</p>
          </div>
          <div className="subscription-plan subscription-plan-optimize">
            <h2>Optimize</h2>
            <span className="subscription-recommended">Recommended</span>
            <p className="subscription-price">
              $159 <span>per month</span>
            </p>
            <p>30,000 unique monthly visitors</p>
            <button className="subscription-btn">
              Start 14-day free trial
            </button>
            <ul className="subscription-features">
              <li>All Create features plus:</li>
              <li>Server-side A/B testing</li>
              <li>Hypothesis setting and history</li>
              <li>Customizable traffic splitting</li>
              <li>Scheduling</li>
              <li>Multi-step forms</li>
              <li>Dynamic text replacement</li>
            </ul>
            <p>Unlimited conversions</p>
          </div>
          <div className="subscription-plan subscription-plan-convert">
            <h2>Convert</h2>
            <p className="subscription-custom-price">Custom</p>
            <p>Custom unique monthly visitors</p>
            <button className="subscription-btn">Get a demo</button>
            <ul className="subscription-features">
              <li>All Optimize features plus:</li>
              <li>Enterprise-ready platform</li>
              <li>Global Blocks</li>
              <li>Heatmaps</li>
              <li>Audit logs</li>
              <li>Direct lead bypass</li>
              <li>CSM & Professional Services</li>
            </ul>
            <p>Unlimited conversions</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;
