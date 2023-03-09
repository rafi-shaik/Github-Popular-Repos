// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {details} = props
  const {avatarUrl, startsCount, forksCount, issuesCount, name} = details

  return (
    <li className="list-item">
      <img src={avatarUrl} alt={name} className="image" />
      <h1 className="name">{name}</h1>
      <div className="count-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="icon"
        />
        <p className="para">{startsCount} stars</p>
      </div>
      <div className="count-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="icon"
        />
        <p className="para">{forksCount} forks</p>
      </div>
      <div className="count-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="icon"
        />
        <p className="para">{issuesCount} issues</p>
      </div>
    </li>
  )
}

export default RepositoryItem
