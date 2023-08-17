// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {eachList, onFilterLanguageId} = props
  const {language, id} = eachList

  const onGetLanguageList = () => {
    onFilterLanguageId(id)
  }

  return (
    <li className="language-item-box">
      <button type="button" className="button" onClick={onGetLanguageList}>
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
