"use client"

import type React from "react"

import { useState } from "react"
import Sidebar from "@/components/sidebar"
import Header from "@/components/header"
import MainContent from "@/components/main-content"
import "./globals.css"

// Updated data structure with three status types: 'not-started', 'in-progress', 'completed'
const data = [
  {
    id: 1,
    title: "Dashboard",
    children: [
      { id: 101, title: "Analytics", status: "completed", content: "Analytics dashboard content goes here." },
      { id: 102, title: "Reports", status: "not-started", content: "Reports dashboard content goes here." },
      { id: 103, title: "Statistics", status: "in-progress", content: "Statistics dashboard content goes here." },
    ],
  },
  {
    id: 2,
    title: "Projects",
    children: [
      { id: 201, title: "Active Projects", status: "completed", content: "Active projects content goes here." },
      { id: 202, title: "Archived Projects", status: "not-started", content: "Archived projects content goes here." },
      { id: 203, title: "Project Templates", status: "in-progress", content: "Project templates content goes here." },
    ],
  },
  {
    id: 3,
    title: "Tasks",
    children: [
      { id: 301, title: "My Tasks", status: "completed", content: "My tasks content goes here." },
      { id: 302, title: "Assigned Tasks", status: "in-progress", content: "Assigned tasks content goes here." },
      { id: 303, title: "Completed Tasks", status: "not-started", content: "Completed tasks content goes here." },
    ],
  },
]

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [selectedItem, setSelectedItem] = useState<any>(null)

  const handleItemClick = (item: any) => {
    setSelectedItem(item)
  }

  return (
    <html lang="en">
      <body>
        <div className="app-container">
          <Header />
          <div className="content-layout">
            <Sidebar data={data} onItemClick={handleItemClick} />
            <MainContent selectedItem={selectedItem} />
          </div>
          {children}
        </div>
      </body>
    </html>
  )
}



import './globals.css'

export const metadata = {
      generator: 'v0.dev'
    };
