// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {name, changeId, isActive} = props
  const {id, language} = name

  const activeButtonClass = isActive ? 'active-language-btn' : ''

  const onClickButton = () => {
    changeId(id)
  }

  return (
    <li>
      <button
        type="button"
        className={`language-btn ${activeButtonClass}`}
        onClick={onClickButton}
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
