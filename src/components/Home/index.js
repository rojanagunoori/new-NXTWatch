import {Component} from 'react'
import Cookies from 'js-cookie'

import {IoMdClose, IoIosSearch} from 'react-icons/io'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import {
  HomeContainer,
  HomeSearchInput,
  ButtonSearch,
  HomeMainContainerUl,
  BannerContainer,
} from './styledComponents'

import HomeListItem from '../HomeListItem'

import NxtWatchContext from '../../context/NxtWatchContext'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  in_progress: 'IN_PROGRESS',
  failure: 'FAILURE',
  success: 'SUCCESS',
}

class Home extends Component {
  state = {
    homeList: [],
    isBanner: true,
    searchInput: '',
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getProducts()
  }

  getProducts = async () => {
    this.setState({apiStatus: apiStatusConstants.in_progress})
    const {searchInput} = this.state
    const url = `https://apis.ccbp.in/videos/all?search=${searchInput}`
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
          profileImageUrl: each.channel.profile_image_url,
        },
      }))

      this.setState({apiStatus: apiStatusConstants.success, homeList: updated})
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onClickBanner = () => {
    this.setState({isBanner: false})
  }

  onChangeSearch = e => {
    this.setState({searchInput: e.target.value})
  }

  onKeyDownPress = e => {
    if (e.key === 'Enter') {
      this.getProducts()
    }
  }

  onClickSearchIcon = () => {
    this.getProducts()
  }

  onRenderSuccess = () => (
    <NxtWatchContext.Consumer>
      {value => {
        const {homeList} = this.state
        return (
          <HomeMainContainerUl>
            {homeList.length === 0 ? (
              <div className="padding-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
                  alt="no videos"
                  className="no-video-img"
                />
                <h1 className="no-video-head">No search results found</h1>
                <p className="no-video-para">
                  Try different key words or remove search filter
                </p>
                <button
                  type="button"
                  className="confirm-button"
                  onClick={this.getProducts}
                >
                  Retry
                </button>
              </div>
            ) : (
              homeList.map(each => (
                <HomeListItem homeList={each} key={each.id} />
              ))
            )}
          </HomeMainContainerUl>
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
              onClick={this.onClickSearchIcon}
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
    const {isBanner, searchInput} = this.state
    const bannerImageUrl =
      'https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png'

    return (
      <div>
        <Header />
        <NxtWatchContext.Consumer>
          {value => {
            const {isDark} = value

            return (
              <HomeContainer
                data-testid="home"
                color={isDark ? '#0f0f0f' : '#f9f9f9'}
                bgColor={!isDark ? '#181818' : '#f9f9f9'}
              >
                {isBanner && (
                  <div>
                    <BannerContainer
                      data-testid="banner"
                      style={{backgroundImage: `url(${bannerImageUrl})`}}
                    >
                      <div>
                        {' '}
                        <img
                          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                          alt="nxt watch logo"
                          className="banner-logo"
                        />
                        <p className="banner-para">
                          Buy Nxt Watch Premium period plans with UPI
                        </p>
                        <button type="button" className="banner-btn">
                          GET IT NOW
                        </button>
                      </div>
                      <button
                        data-testid="close"
                        aria-label="banner-close"
                        onClick={this.onClickBanner}
                        type="button"
                        className="banner-close"
                      >
                        <IoMdClose />
                      </button>
                    </BannerContainer>
                  </div>
                )}
                <div className="search-container">
                  <HomeSearchInput
                    onKeyDown={this.onKeyDownPress}
                    color={isDark ? '#0f0f0f' : '#f9f9f9'}
                    bgColor={isDark ? '#f9f9f9' : '#0f0f0f'}
                    type="search"
                    placeholder="Search"
                    onChange={this.onChangeSearch}
                    value={searchInput}
                  />
                  <ButtonSearch
                    onClick={this.onClickSearchIcon}
                    color={isDark ? '#0f0f0f' : '#f9f9f9'}
                    bgColor={isDark ? '#d7dfe9' : '#1e293b'}
                    type="button"
                    data-testid="searchButton"
                  >
                    <IoIosSearch />
                  </ButtonSearch>
                </div>

                {this.renderApiStatus()}
              </HomeContainer>
            )
          }}
        </NxtWatchContext.Consumer>
      </div>
    )
  }
}

export default Home
