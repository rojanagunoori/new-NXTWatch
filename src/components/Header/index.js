import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {FaMoon} from 'react-icons/fa'
import {WiDaySunny} from 'react-icons/wi'

import 'reactjs-popup/dist/index.css'

import {
  TopHeaderContainer,
  TopHeaderFlex,
  ButtonLogOut,
  LeftHeaderContainer,
  LeftHeaderLi,
  HomeIcons,
  LinkElement,
  StyledUl,
  TrendIcons,
  GameIcons,
  MenuIcons,
  LeftHeaderBottom,
  PopContainer,
  LogoImg,
} from './styledComponents'

import NxtWatchContext from '../../context/NxtWatchContext'
import './index.css'

class Header extends Component {
  render() {
    const {history} = this.props
    const {location} = history
    const {pathname} = location

    return (
      <NxtWatchContext.Consumer>
        {value => {
          const {isDark, onChangeDark} = value

          const loginUrl = !isDark
            ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
            : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'

          const onClickLogout = () => {
            Cookies.remove('jwt_token')
            history.replace('/login')
          }

          const topHeader = () => (
            <TopHeaderContainer
              color={isDark ? '#0f0f0f' : '#f9f9f9'}
              bgColor={isDark ? '#fff' : '#231f20'}
            >
              <Link to="/">
                <LogoImg
                  src={loginUrl}
                  alt="website logo"
                  className="login-logo"
                />
              </Link>
              <TopHeaderFlex>
                <button
                  data-testid="theme"
                  onClick={onChangeDark}
                  type="button"
                  className="light-btn"
                >
                  {!isDark ? (
                    <WiDaySunny color="#f9f9f9" />
                  ) : (
                    <FaMoon color="#0f0f0f" />
                  )}
                </button>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                  alt="profile"
                  className="pro-img"
                />
                <PopContainer
                  color={isDark ? '#0f0f0f' : '#f9f9f9'}
                  bgColor={isDark ? '#f9f9f9' : '#0f0f0f'}
                  modal
                  trigger={
                    <ButtonLogOut
                      type="button"
                      color={isDark ? '#0f0f0f' : '#f9f9f9'}
                    >
                      Logout
                    </ButtonLogOut>
                  }
                >
                  {close => (
                    <>
                      <div>
                        <p>Are you sure, you want to logout?</p>
                      </div>
                      <ButtonLogOut
                        color={isDark ? '#0f0f0f' : '#f9f9f9'}
                        bgColor={isDark ? '#f9f9f9' : '#0f0f0f'}
                        type="button"
                        className="trigger-button"
                        onClick={() => close()}
                      >
                        Cancel
                      </ButtonLogOut>
                      <button
                        type="button"
                        className="confirm-button"
                        onClick={onClickLogout}
                      >
                        Confirm
                      </button>
                    </>
                  )}
                </PopContainer>
              </TopHeaderFlex>
            </TopHeaderContainer>
          )

          const leftHeader = () => (
            <LeftHeaderContainer
              color={isDark ? '#0f0f0f' : '#f9f9f9'}
              bgColor={isDark ? '#fff' : '#231f20'}
            >
              <StyledUl>
                <LeftHeaderLi isDark={isDark} isActive={pathname === '/'}>
                  <LinkElement to="/" color={isDark ? '#0f0f0f' : '#f9f9f9'}>
                    <HomeIcons color={pathname === '/'} isDark={isDark} />
                    Home
                  </LinkElement>
                </LeftHeaderLi>
                <LeftHeaderLi
                  isDark={isDark}
                  isActive={pathname === '/trending'}
                >
                  <LinkElement
                    to="/trending"
                    color={isDark ? '#0f0f0f' : '#f9f9f9'}
                  >
                    <TrendIcons
                      color={pathname === '/trending'}
                      isDark={isDark}
                    />
                    Trending
                  </LinkElement>
                </LeftHeaderLi>
                <LeftHeaderLi isDark={isDark} isActive={pathname === '/gaming'}>
                  <LinkElement
                    to="/gaming"
                    color={isDark ? '#0f0f0f' : '#f9f9f9'}
                  >
                    <GameIcons color={pathname === '/gaming'} isDark={isDark} />
                    Gaming
                  </LinkElement>
                </LeftHeaderLi>
                <LeftHeaderLi
                  isDark={isDark}
                  isActive={pathname === '/saved-videos'}
                >
                  <LinkElement
                    to="/saved-videos"
                    color={isDark ? '#0f0f0f' : '#f9f9f9'}
                  >
                    <MenuIcons
                      color={pathname === '/saved-videos'}
                      isDark={isDark}
                    />
                    Saved Videos
                  </LinkElement>
                </LeftHeaderLi>
              </StyledUl>
              <LeftHeaderBottom color={isDark ? '#0f0f0f' : '#f9f9f9'}>
                <p className="left-header-head">CONTACT US</p>
                <div className="icon-conatainers">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                    alt="facebook logo"
                    className="icon"
                  />
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                    alt="twitter logo"
                    className="icon"
                  />
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                    alt="linked in logo"
                    className="icon"
                  />
                </div>
                <p className="left-header-para">
                  Enjoy! Now to see your channels and recommendations!
                </p>
              </LeftHeaderBottom>
            </LeftHeaderContainer>
          )

          return (
            <div className="heacer-container">
              {topHeader()}
              {leftHeader()}
            </div>
          )
        }}
      </NxtWatchContext.Consumer>
    )
  }
}

export default withRouter(Header)
