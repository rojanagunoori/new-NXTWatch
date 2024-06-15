
import Header from '../Header'
import {NotFoundContainer} from './styledComponents'
import NxtWatchContext from '../../context/NxtWatchContext'
import './index.css'

const NotFound = () => (
  <NxtWatchContext.Consumer>
    {value => {
      const {isDark} = value
      const imageUrl = isDark
        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'
      return (
        <>
          <Header />
          <NotFoundContainer
            color={isDark ? '#0f0f0f' : '#f9f9f9'}
            bgColor={isDark ? '#f9f9f9' : '#0f0f0f'}
          >
            <div className="padding-container">
              <img src={imageUrl} alt="not found" className="no-video-img" />
              <h1 className="no-video-head">Page Not Found</h1>
              <p className="no-video-para">
                We are sorry, the page you requested could not be found.
              </p>
            </div>
          </NotFoundContainer>
        </>
      )
    }}
  </NxtWatchContext.Consumer>
)

export default NotFound
