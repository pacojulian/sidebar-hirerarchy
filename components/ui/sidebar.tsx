
import { useState, useEffect } from "react"
import "./sidebar.css"

interface ChildItem {
  id: number
  title: string
  status: "not-started" | "in-progress" | "completed" | "active"
  content: string
}

interface ParentItem {
  id: number
  title: string
  status: "not-started" | "in-progress" | "completed" | "active"
  expanded?: boolean
  children: ChildItem[]
}

interface SidebarProps {
  data: ParentItem[]
  onItemClick: (item: ChildItem) => void
}

export default function Sidebar({ data, onItemClick }: SidebarProps) {
  // Initialize with expanded items from data
  const [expandedItems, setExpandedItems] = useState<number[]>([])

  // Set expanded items based on data
  useEffect(() => {
    const initialExpanded = data.filter((item) => item.expanded).map((item) => item.id)
    setExpandedItems(initialExpanded)
  }, [data])

  const toggleExpand = (id: number) => {
    if (expandedItems.includes(id)) {
      setExpandedItems(expandedItems.filter((item) => item !== id))
    } else {
      setExpandedItems([...expandedItems, id])
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return "✓"
      case "active":
      case "in-progress":
      case "not-started":
      default:
        return ""
    }
  }

  const hasChildren = (item: ParentItem) => {
    return item.children && item.children.length > 0
  }

  return (
    <div className="sidebar-component">
      <div className="sidebar-content">
        <div className="workflow-list">
          {data.map((parent) => (
            <div key={parent.id} className="workflow-item">
              <div
                className={`parent-item ${hasChildren(parent) ? "has-children" : ""}`}
                onClick={() => (hasChildren(parent) ? toggleExpand(parent.id) : null)}
              >
                <div className={`status-circle status-${parent.status}`}>{getStatusIcon(parent.status)}</div>
                <span className="item-title">{parent.title}</span>
                {hasChildren(parent) && (
                  <span className={`dropdown-arrow ${expandedItems.includes(parent.id) ? "expanded" : ""}`}>▼</span>
                )}
              </div>

              {expandedItems.includes(parent.id) && hasChildren(parent) && (
                <>
                  <div className="parent-child-connector"></div>
                  <div className="children-container">
                    {parent.children.map((child, index) => (
                      <div key={child.id} className="child-item-wrapper">
                        <div className="vertical-line"></div>
                        <div
                          className={`child-item ${child.status === "active" ? "active-item" : ""}`}
                          onClick={() => onItemClick(child)}
                        >
                          <div className={`status-circle status-${child.status}`}>{getStatusIcon(child.status)}</div>
                          <span className="item-title">{child.title}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

