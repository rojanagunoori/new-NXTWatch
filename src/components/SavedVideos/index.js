import {Component} from 'react'

import {BsDot} from 'react-icons/bs'

import {formatDistanceToNow} from 'date-fns'

import {RiMenuAddFill} from 'react-icons/ri'

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
  /*  state = {
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
            <img src={failUrl} alt="no videos" className="no-video-img" />
            <h1 className="no-video-head">Opps! Something Went Wrong</h1>
            <p className="no-video-para">
              We are having some trouble to complete your request.plaese try
              again.
            </p>
            <button
              type="button"
              className="confirm-button"
              onClick={this.onClickSerachIcon}
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
  
  */

  onRenderSucess = () => (
    <NxtWatchContext.Consumer>
      {value => {
        const {isDark, savedList} = value

        return (
          <TrendingContainerUl>
            {savedList.length === 0 ? (
              <div className="padding-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
                  alt="no saved videos"
                  className="no-video-img"
                />
                <h1 className="no-video-head">No saved videos found</h1>
                <p className="no-video-para">
                  You can save your videos while watching them
                </p>
              </div>
            ) : (
              savedList.map(each => (
                <li className="li-container" key={each.id}>
                  <LinkIcon
                    color={isDark ? '#0f0f0f' : '#f9f9f9'}
                    bgcolor={isDark ? '#f9f9f9' : '#0f0f0f'}
                    to={`/videos/${each.id}`}
                  >
                    <img
                      src={each.thumbnailUrl}
                      alt="video thumbnail"
                      className="trend-img1"
                    />
                    <div className="">
                      <p className="trend-head">{each.title}</p>
                      <p>{each.channel.name}</p>
                      <div className="flex-con">
                        <p>{each.viewCount} views</p>
                        <BsDot className="dot-icon" />
                        <p>{formatDistanceToNow(new Date(each.publishedAt))}</p>
                        <p>{each.publishedAt}</p>
                      </div>
                    </div>
                  </LinkIcon>
                </li>
              ))
            )}
          </TrendingContainerUl>
        )
      }}
    </NxtWatchContext.Consumer>
  )

  render() {
    return (
      <div data-testid="savedVideos">
        <Header />
        <NxtWatchContext.Consumer>
          {value => {
            const {isDark} = value

            return (
              <TendingContainer
                color={isDark ? '#0f0f0f' : '#f9f9f9'}
                bgColor={isDark ? '#f9f9f9' : '#0f0f0f'}
              >
                <TrendIconContainer
                  color={isDark ? '#0f0f0f' : '#f9f9f9'}
                  bgColor={isDark ? '#e2e8f0' : ' #181818'}
                >
                  <RiMenuAddFill className="fire-icon" />
                  <h1>Saved Videos</h1>
                </TrendIconContainer>
                {this.onRenderSucess()}
              </TendingContainer>
            )
          }}
        </NxtWatchContext.Consumer>
      </div>
    )
  }
}
export default Trending
