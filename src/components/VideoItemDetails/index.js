import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsDot} from 'react-icons/bs'
import {AiOutlineLike, AiOutlineDislike} from 'react-icons/ai'
import {RiMenuAddLine} from 'react-icons/ri'

import Loader from 'react-loader-spinner'
import ReactPlayer from 'react-player'
import Header from '../Header'
import {
  VideoItemDetailsContainer,
  VideoItemDetailsContainerUl,
  LikeButton,
  DisLikeButton,
  SaveButton,
} from './styledComponents'
import NxtWatchContext from '../../context/NxtWatchContext'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  in_progress: 'IN_PROGRESS',
  failure: 'FAILURE',
  success: 'SUCCESS',
}

class VideoItemDetails extends Component {
  state = {
    homeList: {},
    isLike: false,
    isDislike: false,
    isSave: false,
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getProducts()
  }

  getProducts = async () => {
    this.setState({apiStatus: apiStatusConstants.in_progress})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const url = `https://apis.ccbp.in/videos/${id}`
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
      const updated = {
        id: data.video_details.id,
        publishedAt: data.video_details.published_at,
        thumbnailUrl: data.video_details.thumbnail_url,
        title: data.video_details.title,
        viewCount: data.video_details.view_count,
        videoUrl: data.video_details.video_url,
        description: data.video_details.description,
        channel: {
          name: data.video_details.channel.name,
          profileImageUrl: data.video_details.channel.profile_image_url,
          subscriberCount: data.video_details.channel.subscriber_count,
        },
      }
      this.setState({apiStatus: apiStatusConstants.success, homeList: updated})
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onClickLike = () => {
    this.setState(prev => ({isLike: !prev.isLike, isDislike: false}))
  }

  onClickDisLike = () => {
    this.setState(prev => ({isDislike: !prev.isDislike, isLike: false}))
  }

  onRenderSuccess = () => (
    <NxtWatchContext.Consumer>
      {value => {
        const { savedList, onAddSavedList, onRemoveSavedList} = value
        const {homeList, isLike, isDislike} = this.state
        const {
          id,
          publishedAt,
          title,
          viewCount,
          videoUrl,
          description,
          channel,
        } = homeList
        const {name, profileImageUrl, subscriberCount} = channel || {}
        const isActive = savedList.find(each => each.id === id)

        const onClickSave = () => {
          if (isActive) {
            onRemoveSavedList(homeList.id)
          } else {
            onAddSavedList(homeList)
          }
          this.setState(prev => ({isSave: !prev.isSave}))
        }

        return (
          <VideoItemDetailsContainerUl>
            <div className="video-con">
              <ReactPlayer url={videoUrl} className="video-con" controls />
              <p className="title-head">{title}</p>
              <div className="like-container">
                <div className="flex-container1">
                  <p>{viewCount} views</p>
                  <BsDot className="dot-icon" />
                  <p className="published-at">{publishedAt}</p>{' '}
                </div>
                <div className="flex-container">
                  <LikeButton
                    color={isLike ? '#2563eb' : '#64748b'}
                    type="button"
                    onClick={this.onClickLike}
                  >
                    <AiOutlineLike className="icon-like" />
                    Like
                  </LikeButton>
                  <DisLikeButton
                    color={isDislike ? '#2563eb' : '#64748b'}
                    type="button"
                    onClick={this.onClickDisLike}
                  >
                    <AiOutlineDislike className="icon-like" />
                    Dislike
                  </DisLikeButton>
                  <SaveButton
                    color={isActive ? '#2563eb' : '#64748b'}
                    type="button"
                    onClick={onClickSave}
                  >
                    <RiMenuAddLine className="icon-like" />
                    {isActive ? 'Saved' : 'Save'}
                  </SaveButton>
                </div>
              </div>
              <hr />
              <div className="flex-container">
                <img
                  src={profileImageUrl}
                  alt="channel logo"
                  className="channels-logo"
                />
                <div>
                  <p className="channel-name">{name}</p>
                  <p>{subscriberCount} subscribers</p>
                  <p>{description}</p>
                </div>
              </div>
            </div>
          </VideoItemDetailsContainerUl>
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
              We are having some trouble to complete your request. Please try
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
        return this.onRenderSuccess()
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
            <div data-testid="videoItemDetails">
              <Header />
              <VideoItemDetailsContainer
                color={isDark ? '#0f0f0f' : '#f9f9f9'}
                bgColor={isDark ? '#f9f9f9' : '#0f0f0f'}
              >
                {this.renderApiStatus()}
              </VideoItemDetailsContainer>
            </div>
          )
        }}
      </NxtWatchContext.Consumer>
    )
  }
}

export default VideoItemDetails
