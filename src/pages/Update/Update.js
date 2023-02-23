import { lazy, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import api from 'config/api'
import './Update.scss'

const Form = lazy(() => import('../../components/Form/Form'))

const Update = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [method, setMethod] = useState('')
  const [rating, setRating] = useState('')
  const [formError, setFormError] = useState(null)

  const fetchSmoothie = async () => {
    const { data, error } = await api
      .from('smoothies')
      .select()
      .eq('id', id)
      .single()

    if (error) {
      navigate('/', { replace: true })
    }
    if (data) {
      setTitle(data.title)
      setMethod(data.method)
      setRating(data.rating)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title || !method || !rating) {
      setFormError('Please fill in all the fields correctly.')
      return
    }
    const { error } = await api
      .from('smoothies')
      .update({ title, method, rating })
      .eq('id', id)

    if (error) {
      console.error(error)
      setFormError('Please fill in all the fields correctly.')
      return
    }

    setFormError(null)
    navigate('/')
  }

  useEffect(() => {
    fetchSmoothie()
  }, [id, navigate])

  return (
    <div className="page update">
      <Form
        handleSubmit={handleSubmit}
        setTitle={setTitle}
        setMethod={setMethod}
        setRating={setRating}
        formError={formError}
        method={method}
        title={title}
        rating={rating}
        buttonText="Update Smoothie Recipe"
      />
    </div>
  )
}

export default Update