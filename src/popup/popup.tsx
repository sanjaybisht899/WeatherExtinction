import React from 'react'
import { createRoot } from 'react-dom/client'
import './popup.css'
import WeatherCard from './WeatherCard/WeatherCard'
const App: React.FC<{}> = () => {
  return (
    <div>
      <WeatherCard city='Chandigarh'/>
      <WeatherCard city='Delhi'/>
    </div>
  )
}

const container = document.createElement('div')
document.body.appendChild(container)
const root = createRoot(container)
root.render(<App />)
