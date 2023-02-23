import { Link } from 'react-router-dom'

import api from 'config/api'
import './SmoothieCard.scss'

const SmoothieCard = ({ smoothie, onDelete }) => {
  const handleDelete = async () => {
    const { error } = await api.from('smoothies').delete().eq('id', smoothie.id)

    if (error) {
      console.error(error.message)
      return
    }
    onDelete(smoothie.id)
  }

  return (
    <div className="smoothie-card">
      <h3>{smoothie.title}</h3>
      <p>{smoothie.method}</p>
      <div className="rating">{smoothie.rating}</div>
      <div className="buttons">
        <Link to={'/' + smoothie.id}>
          <i className="material-icons">edit</i>
        </Link>
        <button className="button-delete" onClick={handleDelete}>
          <i className="material-icons">delete</i>
        </button>
      </div>
    </div>
  )
}

export default SmoothieCard
