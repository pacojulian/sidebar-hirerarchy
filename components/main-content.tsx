import "./main-content.css"

interface ChildItem {
  id: number
  title: string
  status: "not-started" | "in-progress" | "completed"
  content: string
}

interface MainContentProps {
  selectedItem: ChildItem | null
}

export default function MainContent({ selectedItem }: MainContentProps) {
  const getStatusLabel = (status: string) => {
    switch (status) {
      case "completed":
        return "Completed"
      case "in-progress":
        return "In Progress"
      case "not-started":
      default:
        return "Not Started"
    }
  }

  return (
    <main className="main-content">
      {selectedItem ? (
        <div className="content-container">
          <h2>{selectedItem.title}</h2>
          <div className={`status-display status-${selectedItem.status}`}>
            Status: {getStatusLabel(selectedItem.status)}
          </div>
          <div className="content-body">{selectedItem.content}</div>
        </div>
      ) : (
        <div className="empty-state">
          <h2>Welcome to the Dashboard</h2>
          <p>Select an item from the sidebar to view details</p>
        </div>
      )}
    </main>
  )
}

