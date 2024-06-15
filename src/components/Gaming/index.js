import {Component} from 'react'
import Cookies from 'js-cookie'

import {SiYoutubegaming} from 'react-icons/si'

import Loader from 'react-loader-spinner'

import Header from '../Header'
import {
  LinkIcon1,
  TendingContainer,
  TrendingContainerUl,
  TrendIconContainer,
} from './styledComponent'

import NxtWatchContext from '../../context/NxtWatchContext'
import './index.css'

const apiStatusConstants = {
  initial: 'INITAL',
  in_progress: 'IN_PROGESS',
  failure: 'FAILURE',
  success: 'SUCCESS',
}

class Gaming extends Component {
  state = {
    homeList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getProducts()
  }

  getProducts = async () => {
    this.setState({apiStatus: apiStatusConstants.in_progress})

    const url = 'https://apis.ccbp.in/videos/gaming'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      const updated = data.videos.map(each => ({
        id: each.id,
        thumbnailUrl: each.thumbnail_url,
        title: each.title,
        viewCount: each.view_count,
      }))

      this.setState({apiStatus: apiStatusConstants.success, homeList: updated})
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onRenderSucess = () => (
    <NxtWatchContext.Consumer>
      {value => {
        const {isDark} = value
        const {homeList} = this.state

        return (
          <TrendingContainerUl>
            {homeList.map(each => (
              <li className="li-container1" key={each.id}>
                <LinkIcon1
                  color={isDark ? '#0f0f0f' : '#f9f9f9'}
                  bgcolor={isDark ? '#f9f9f9' : '#0f0f0f'}
                  to={`/videos/${each.id}`}
                >
                  <img
                    src={each.thumbnailUrl}
                    alt="video thumbnail"
                    className="game-img"
                  />
                  <p className="game-head">{each.title}</p>
                  <p className="game-para">
                    {each.viewCount} Watching Worldwide
                  </p>
                </LinkIcon1>
              </li>
            ))}
          </TrendingContainerUl>
        )
      }}
    </NxtWatchContext.Consumer>
  )

  renderLoader = () => (
    <div className="padding-container">
      <div className="loader" data-testid="loader">
        <Loader type="ThreeDots" width={50} height={50} color="blue" />
      </div>
    </div>
  )

  renderFailure = () => (
    <NxtWatchContext.Consumer>
      {value => {
        const {isDark} = value

        const failUrl = isDark
          ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
          : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
        return (
          <div className="padding-container">
            <img src={failUrl} alt="failure view" className="no-video-img" />
            <h1 className="no-video-head">Oops! Something Went Wrong</h1>
            <p className="no-video-para">
              We are having some trouble to complete your request.plaese try
              again.
            </p>
            <button
              type="button"
              className="confirm-button"
              onClick={this.getProducts}
            >
              Retry
            </button>
          </div>
        )
      }}
    </NxtWatchContext.Consumer>
  )

  renderApiStatus = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.in_progress:
        return this.renderLoader()
      case apiStatusConstants.failure:
        return this.renderFailure()
      case apiStatusConstants.success:
        return this.onRenderSucess()
      default:
        return null
    }
  }

  render() {
    return (
      <NxtWatchContext.Consumer>
        {value => {
          const {isDark} = value

          return (
            <div>
              <Header />
              <TendingContainer
                data-testid="gaming"
                color={isDark ? '#0f0f0f' : '#f9f9f9'}
                bgColor={isDark ? '#f9f9f9' : '#0f0f0f'}
              >
                <TrendIconContainer
                  color={isDark ? '#0f0f0f' : '#f9f9f9'}
                  bgColor={isDark ? '#e2e8f0' : ' #181818'}
                >
                  <SiYoutubegaming className="fire-icon" />
                  <h1>Gaming</h1>
                </TrendIconContainer>
                {this.renderApiStatus()}
              </TendingContainer>
            </div>
          )
        }}
      </NxtWatchContext.Consumer>
    )
  }
}
export default Gaming
