import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

// Write your code here
class GithubPopularRepos extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    displayId: languageFiltersData[0].id,
    reposList: [],
  }

  componentDidMount() {
    this.getReposList()
  }

  getReposList = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const {displayId} = this.state
    const response = await fetch(
      `https://apis.ccbp.in/popular-repos?language=${displayId}`,
    )
    if (response.ok) {
      const data = await response.json()
      const modifiedData = data.popular_repos.map(each => ({
        name: each.name,
        id: each.id,
        issuesCount: each.issues_count,
        forksCount: each.forks_count,
        startsCount: each.stars_count,
        avatarUrl: each.avatar_url,
      }))

      this.setState({
        reposList: modifiedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  changeId = uniqId => {
    this.setState({displayId: uniqId}, this.getReposList)
  }

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-view-image"
      />
      <h1 className="error-message">Something Went Wrong</h1>
    </div>
  )

  renderList = () => {
    const {reposList} = this.state
    return (
      <ul className="list-container">
        {reposList.map(each => (
          <RepositoryItem key={each.id} details={each} />
        ))}
      </ul>
    )
  }

  renderRepositories = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderList()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderLanguagesList = () => {
    const {displayId} = this.state
    return (
      <ul className="tabs-list-container">
        {languageFiltersData.map(each => (
          <LanguageFilterItem
            key={each.id}
            changeId={this.changeId}
            name={each}
            isActive={displayId === each.id}
          />
        ))}
      </ul>
    )
  }

  render() {
    return (
      <div className="bg-container">
        <div className="main-container">
          <h1 className="heading">Popular</h1>
          {this.renderLanguagesList()}
          {this.renderRepositories()}
        </div>
      </div>
    )
  }
}

export default GithubPopularRepos
