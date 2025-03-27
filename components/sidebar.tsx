"use client"

import { useState, useEffect } from "react"
import "./sidebar.css"

interface ChildItem {
  id: number
  title: string
  status: "not-started" | "in-progress" | "completed"
  content: string
}

interface ParentItem {
  id: number
  title: string
  children: ChildItem[]
}

interface SidebarProps {
  data: ParentItem[]
  onItemClick: (item: ChildItem) => void
}

export default function Sidebar({ data, onItemClick }: SidebarProps) {
  // Initialize with all items expanded
  const [expandedItems, setExpandedItems] = useState<number[]>([])

  // Set all items to be expanded by default
  useEffect(() => {
    setExpandedItems(data.map((item) => item.id))
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
      case "in-progress":
        return "⟳"
      case "not-started":
      default:
        return ""
    }
  }

  // Calculate parent status based on children statuses
  const getParentStatus = (children: ChildItem[]) => {
    const allCompleted = children.every((child) => child.status === "completed")
    if (allCompleted) return "completed"

    const allNotStarted = children.every((child) => child.status === "not-started")
    if (allNotStarted) return "not-started"

    return "in-progress"
  }

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Navigation</h2>
      </div>
      <div className="sidebar-content">
        {data.map((parent) => {
          const parentStatus = getParentStatus(parent.children)

          return (
            <div key={parent.id} className="dropdown-container">
              <div className="dropdown-header" onClick={() => toggleExpand(parent.id)}>
                <div className="parent-item">
                  <div className={`status-indicator status-${parentStatus}`}>
                    <span className="status-icon">{getStatusIcon(parentStatus)}</span>
                  </div>
                  <span>{parent.title}</span>
                </div>
                <span className={`dropdown-arrow ${expandedItems.includes(parent.id) ? "expanded" : ""}`}>▼</span>
              </div>
              {expandedItems.includes(parent.id) && (
                <div className="dropdown-content">
                  <div className="children-container">
                    {parent.children.map((child, index) => (
                      <div key={child.id} className="child-item-wrapper">
                        {index > 0 && <div className="vertical-connector"></div>}
                        <div
                          className={`dropdown-item ${child.status === "completed" ? "completed-text" : ""}`}
                          onClick={() => onItemClick(child)}
                        >
                          <div className={`status-indicator status-${child.status}`}>
                            <span className="status-icon">{getStatusIcon(child.status)}</span>
                          </div>
                          <span>{child.title}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

