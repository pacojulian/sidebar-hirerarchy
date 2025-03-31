import HeaderBackground from "./header-background"
import "./header.css"

export default function Header() {
  return (
    <header className="header">
      <HeaderBackground />
      <div className="header-left">
        <h1 className="header-title">Project Dashboard</h1>
        <div className="header-subtitle">workflow-management-system</div>
      </div>
      <div className="header-right">
        <div className="header-status-item">
          <div className="header-status-label">Status</div>
          <div className="header-status-value">Development</div>
        </div>
        <div className="header-status-item">
          <div className="header-status-label">Completion</div>
          <div className="header-status-value">65%</div>
        </div>
        <div className="header-status-item">
          <div className="header-status-label">Effort</div>
          <div className="header-status-value">Medium</div>
        </div>
      </div>
    </header>
  )
}


