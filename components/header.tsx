import "./header.css"

export default function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <h1>Application Dashboard</h1>
        <div className="header-actions">
          <button className="header-button">Settings</button>
          <button className="header-button">Profile</button>
        </div>
      </div>
    </header>
  )
}

