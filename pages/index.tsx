import React from 'react'
import dynamic from 'next/dynamic'
const KanbanBoard = dynamic(import("../components/KanbanBoard"), {ssr : false })


const Home = () => {
  return (
    <div>
      <KanbanBoard/>
    </div>
  )
}

export default Home
