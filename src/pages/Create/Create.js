import { lazy, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import api from 'config/api'

//components
const Form = lazy(() => import('components/Form/Form'))

const Create = () => {
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [method, setMethod] = useState('')
  const [rating, setRating] = useState('')
  const [formError, setFormError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!title || !method || !rating) {
      setFormError('Please fill in all the fields correctly.')
      return
    }

    const { error } = await api
      .from('smoothies')
      .insert([{ title, method, rating }])

    if (error) {
      console.error(error)
      setFormError(error.message)
      return
    }
    setFormError(null)
    navigate('/')
  }
  return (
    <div className="page create">
      <Form
        handleSubmit={handleSubmit}
        setTitle={setTitle}
        setMethod={setMethod}
        setRating={setRating}
        formError={formError}
        method={method}
        title={title}
        rating={rating}
        buttonText="Create Smoothie Recipe"
      />
    </div>
  )
}

export default Create
