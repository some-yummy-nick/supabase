import { Suspense, lazy } from 'react'

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

// pages
const Home = lazy(() => import('./pages/Home'))
const Create = lazy(() => import('./pages/Create'))
const Update = lazy(() => import('./pages/Update'))

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <nav>
          <h1>Supa Smoothies</h1>
          <Link to="/">Home</Link>
          <Link to="/create">Create New Smoothie</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/:id" element={<Update />} />
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App
