import { useState, useEffect } from 'react'

import api from 'config/api'
import './Home.scss'

//components
import SmoothieCard from 'components/SmoothieCard/SmoothieCard'

const Home = () => {
  const [fetchError, setFetchError] = useState(null)
  const [smoothies, setSmoothies] = useState(null)

  useEffect(() => {
    fetchSmoothies()
  }, [])

  const fetchSmoothies = async () => {
    const { data, error } = await api.from('smoothies').select()

    if (error) {
      setFetchError('Could not fetch the smoothies')
      console.error(error)
      setSmoothies(null)
    }
    if (data) {
      setSmoothies(data)
      setFetchError(null)
    }
  }

  const handleDelete = (id) => {
    setSmoothies((prevSmoothies) => {
      return prevSmoothies.filter((sm) => sm.id !== id)
    })
  }

  return (
    <div className="page home">
      {fetchError && <p>{fetchError}</p>}
      {smoothies && (
        <div className="smoothie">
          <div className="smoothie-grid">
            {smoothies.map((smoothie) => (
              <SmoothieCard
                key={smoothie.id}
                smoothie={smoothie}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Home
