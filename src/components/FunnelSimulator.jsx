import { useState } from "react"
import useAnimatedNumber from "./useAnimatedNumber"

function formatCurrency(value) {
  return `$${Math.round(value).toLocaleString()}`
}

function formatNumber(value) {
  return Math.round(value).toLocaleString()
}

export default function FunnelSimulator() {
  const [visitors, setVisitors] = useState(5000)
  const [landingCVR, setLandingCVR] = useState(12)
  const [checkoutCVR, setCheckoutCVR] = useState(18)
  const [aov, setAov] = useState(65)

  const leads = visitors * (landingCVR / 100)
  const customers = leads * (checkoutCVR / 100)
  const revenue = customers * aov

  const animatedLeads = useAnimatedNumber(leads)
  const animatedCustomers = useAnimatedNumber(customers)
  const animatedRevenue = useAnimatedNumber(revenue)

  return (
    <div className="funnel-card">
      <div className="funnel-header">
        <span className="funnel-title">funnel_model.js</span>
        <span className="funnel-status">LIVE</span>
      </div>
      <div className="funnel-controls">
        <label className="funnel-control">
          <span className="funnel-control-label">
            Visitors <b>{formatNumber(visitors)}</b>
          </span>
          <input
            type="range"
            min="100"
            max="100000"
            step="100"
            value={visitors}
            onChange={(e) => setVisitors(Number(e.target.value))}
          />
        </label>
        <label className="funnel-control">
          <span className="funnel-control-label">
            Landing CVR <b>{landingCVR}%</b>
          </span>
          <input
            type="range"
            min="1"
            max="50"
            value={landingCVR}
            onChange={(e) => setLandingCVR(Number(e.target.value))}
          />
        </label>
        <label className="funnel-control">
          <span className="funnel-control-label">
            Checkout CVR <b>{checkoutCVR}%</b>
          </span>
          <input
            type="range"
            min="1"
            max="50"
            value={checkoutCVR}
            onChange={(e) => setCheckoutCVR(Number(e.target.value))}
          />
        </label>
        <label className="funnel-control">
          <span className="funnel-control-label">
            Avg Order Value <b>${aov}</b>
          </span>
          <input
            type="range"
            min="5"
            max="500"
            step="5"
            value={aov}
            onChange={(e) => setAov(Number(e.target.value))}
          />
        </label>
      </div>
      <div className="funnel-outputs">
        <div className="funnel-output">
          <span className="funnel-output-label">Leads</span>
          <span className="funnel-output-value">{formatNumber(animatedLeads)}</span>
        </div>
        <div className="funnel-output">
          <span className="funnel-output-label">Customers</span>
          <span className="funnel-output-value">{formatNumber(animatedCustomers)}</span>
        </div>
        <div className="funnel-output funnel-output-primary">
          <span className="funnel-output-label">Revenue</span>
          <span className="funnel-output-value">{formatCurrency(animatedRevenue)}</span>
        </div>
      </div>
    </div>
  )
}
