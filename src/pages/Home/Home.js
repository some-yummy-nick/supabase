import { useState, useEffect } from 'react'

import api from 'config/api'
import './Home.scss'

//components
import SmoothieCard from 'components/SmoothieCard/SmoothieCard'

const Home = () => {
  const [fetchError, setFetchError] = useState(null)
  const [smoothies, setSmoothies] = useState(null)
  const [reverseSort, setReverseSort] = useState(1)
  const [orderBy, setOrderBy] = useState('created_at')

  const fetchSmoothies = async () => {
    const { data, error } = await api
      .from('smoothies')
      .select()
      .order('created_at', { ascending: false })

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

  const handleSort = (currentOrder) => {
    if (orderBy !== currentOrder) {
      setReverseSort(1)
    }
    setReverseSort(reverseSort < 0 ? 1 : -1)

    setSmoothies(() => {
      let newArray = null
      const dataArray = [...smoothies]
      switch (currentOrder) {
        case 'title':
          newArray = dataArray.sort((a, b) => {
            return (
              reverseSort *
              ('' + a[currentOrder]).localeCompare(b[currentOrder])
            )
          })
          break
        case 'created_at':
          newArray = dataArray.sort(
            (a, b) =>
              reverseSort * Date.parse(a[currentOrder]) -
              Date.parse(b[currentOrder])
          )
          break
        case 'rating':
          newArray = dataArray.sort(
            (a, b) => reverseSort * a[currentOrder] - b[currentOrder]
          )
          break
        default:
          newArray = dataArray
      }
      setOrderBy(currentOrder)
      return newArray
    })
  }

  useEffect(() => {
    fetchSmoothies()
  }, [])

  return (
    <div className="page home">
      {fetchError && <p>{fetchError}</p>}
      {smoothies && (
        <div className="smoothie">
          <div className="order-by">
            <p>Order by:</p>
            <button onClick={() => handleSort('created_at')}>
              Time Created
            </button>
            <button onClick={() => handleSort('title')}>Title</button>
            <button onClick={() => handleSort('rating')}>Rating</button>
          </div>
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
