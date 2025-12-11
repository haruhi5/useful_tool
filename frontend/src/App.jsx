import React, { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [tools, setTools] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchTools()
  }, [])

  const fetchTools = async () => {
    try {
      const response = await fetch('/api/tools')
      if (!response.ok) throw new Error('Failed to fetch tools')
      const data = await response.json()
      setTools(data.tools)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app">
      <header className="header">
        <h1>🛠️ Useful Tools</h1>
        <p>Your personal toolkit, accessible everywhere</p>
      </header>

      <main className="container">
        {loading && <p>Loading tools...</p>}
        {error && <p className="error">Error: {error}</p>}
        
        <div className="tools-grid">
          {tools.map(tool => (
            <div key={tool.id} className="tool-card">
              <h3>{tool.name}</h3>
              <span className="tag">{tool.category}</span>
              <button onClick={() => alert(`Opening ${tool.name}`)}>
                Open Tool
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default App
