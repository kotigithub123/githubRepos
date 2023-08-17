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

// Write your code here

const apiCallProgress = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inprogress: 'IN_PROGRESS',
}

class GithubPopularRepos extends Component {
  state = {
    activeLanguageId: languageFiltersData[0].id,
    languageItem: [],
    apiCall: apiCallProgress.inprogress,
  }

  componentDidMount() {
    this.getLanguageList()
  }

  getLanguageList = async () => {
    const {activeLanguageId} = this.state
    const url = `https://apis.ccbp.in/popular-repos?language=${activeLanguageId}`
    const response = await fetch(url)
    if (response.ok === true) {
      const data = await response.json()
      const fetchedData = data.popular_repos.map(eachOne => ({
        avatarUrl: eachOne.avatar_url,
        forksCount: eachOne.forks_count,
        issuesCount: eachOne.issues_count,
        starsCount: eachOne.stars_count,
        id: eachOne.id,
        name: eachOne.name,
      }))
      this.setState({
        languageItem: fetchedData,
        apiCall: apiCallProgress.success,
      })
    } else {
      const {apiCall} = this.state
      this.setState((apiCall: apiCallProgress.failure))
    }
  }

  getLanguageItems = () => {
    const {languageItem} = this.state

    return (
      <ul className="list_of_items">
        {languageItem.map(eachList => (
          <RepositoryItem listOfLanguage={eachList} key={eachList.id} />
        ))}
      </ul>
    )
  }

  getFailureview = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
      <p>Something Went Wrong</p>
    </div>
  )

  getLanguageItemLists = () => {
    const {appCall} = this.state
    switch (appCall) {
      case appCall === apiCallProgress.success:
        return this.getLanguageItems()
      case appCall === apiCallProgress.inprogress:
        return (
          <div data-testid="loader">
            <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
          </div>
        )
      case appCall === apiCallProgress.failure:
        return this.getFailureview()
      default:
        return null
    }
  }

  onFilterLanguageId = id => {
    this.setState({activeLanguageId: id}, this.getLanguageList())
  }

  render() {
    return (
      <div className="bg-container">
        <h1 className="heading">popular</h1>
        <div className="language-container">
          {languageFiltersData.map(eachOne => (
            <LanguageFilterItem
              eachList={eachOne}
              key={eachOne.id}
              onFilterLanguageId={this.onFilterLanguageId}
            />
          ))}
        </div>
        <div>{this.getLanguageItemLists()}</div>
      </div>
    )
  }
}

export default GithubPopularRepos
