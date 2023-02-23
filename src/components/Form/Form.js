import './Form.scss'

const Form = ({
  handleSubmit,
  setTitle,
  setMethod,
  setRating,
  formError,
  title,
  method,
  rating,
  buttonText,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Title:</label>
      <input
        type="text"
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <label htmlFor="method">Method:</label>
      <textarea
        id="method"
        value={method}
        onChange={(e) => setMethod(e.target.value)}
      />

      <label htmlFor="rating">Rating:</label>
      <input
        type="number"
        id="rating"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
      />

      <button>{buttonText}</button>

      {formError && <p className="error">{formError}</p>}
    </form>
  )
}

export default Form
