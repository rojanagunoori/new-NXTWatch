import {Component} from 'react'
import Cookies from 'js-cookie'

import {BsDot} from 'react-icons/bs'

import {FaFire} from 'react-icons/fa'

import Loader from 'react-loader-spinner'

import Header from '../Header'
import {
  LinkIcon,
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

class Trending extends Component {
  state = {
    homeList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getProducts()
  }

  getProducts = async () => {
    this.setState({apiStatus: apiStatusConstants.in_progress})

    const url = 'https://apis.ccbp.in/videos/trending'
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
        publishedAt: each.published_at,
        thumbnailUrl: each.thumbnail_url,
        title: each.title,
        viewCount: each.view_count,
        channel: {
          name: each.channel.name,
          profile_image_url: each.channel.profile_image_url,
        },
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
              <li className="li-container" key={each.id}>
                <LinkIcon
                  color={isDark ? '#0f0f0f' : '#f9f9f9'}
                  bgcolor={isDark ? '#f9f9f9' : '#0f0f0f'}
                  to={`/videos/${each.id}`}
                >
                  <img
                    src={each.thumbnailUrl}
                    alt="video thumbnail"
                    className="trend-img"
                  />
                  <div className="">
                    <p className="trend-head">{each.title}</p>
                    <p>{each.channel.name}</p>
                    <div className="flex-con">
                      <p>{each.viewCount} views</p>
                      <BsDot className="dot-icon" />
                      <p>{each.publishedAt}</p>
                    </div>
                  </div>
                </LinkIcon>
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
      <div data-testid="trending">
        <Header />
        <NxtWatchContext.Consumer>
          {value => {
            const {isDark} = value

            return (
              <TendingContainer
                data-testid="trending"
                color={isDark ? '#0f0f0f' : '#f9f9f9'}
                bgColor={isDark ? '#f9f9f9' : '#0f0f0f'}
              >
                <TrendIconContainer
                  color={isDark ? '#0f0f0f' : '#f9f9f9'}
                  bgColor={isDark ? '#e2e8f0' : ' #181818'}
                >
                  <FaFire className="fire-icon" />
                  <h1>Trending</h1>
                </TrendIconContainer>
                {this.renderApiStatus()}
              </TendingContainer>
            )
          }}
        </NxtWatchContext.Consumer>
      </div>
    )
  }
}
export default Trending
