// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {listOfLanguage} = props
  const {avatarUrl, forksCount, issuesCount, starsCount, name} = listOfLanguage
  return (
    <li className="language-box">
      <img src={avatarUrl} alt={name} className="image" />
      <p>{name}</p>
      <div className="image-list">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="images"
        />
        <p>{starsCount}</p>
      </div>
      <div className="image-list">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="images"
        />
        <p>{forksCount}</p>
      </div>
      <div className="image-list">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="images"
        />
        <p>{issuesCount}</p>
      </div>
    </li>
  )
}

export default RepositoryItem
