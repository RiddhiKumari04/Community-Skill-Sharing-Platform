import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function Home(){
  const [workshops, setWorkshops] = useState([])

  useEffect(()=>{
    axios.get(import.meta.env.VITE_API_URL + '/workshops')
      .then(r => setWorkshops(r.data))
      .catch(()=> setWorkshops([]))
  },[])

  return (
    <div className="container mx-auto p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Community Skill Share</h1>
        <p className="text-gray-600">Share and learn skills from your community</p>
      </header>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Workshops</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {workshops.length === 0 && (
            <div className="p-6 bg-white rounded shadow">No workshops found (backend might be offline)</div>
          )}
          {workshops.map(w => (
            <div key={w._id} className="p-4 bg-white rounded shadow">
              <h3 className="font-bold">{w.title}</h3>
              <p className="text-sm text-gray-600">{w.description}</p>
              <div className="mt-2 text-xs text-gray-500">Hosted by {w.host?.name || 'Unknown'}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
