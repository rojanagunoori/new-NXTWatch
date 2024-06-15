import {Component} from 'react'

import {BsDot} from 'react-icons/bs'
import { LinkHomeItem} from './styledComponents'

import NxtWatchContext from '../../context/NxtWatchContext'
import './index.css'

class HomeListItem extends Component {
  render() {
    return (
      <NxtWatchContext.Consumer>
        {value => {
          const {isDark} = value
          const {homeList} = this.props
          const {id, publishedAt, thumbnailUrl, title, viewCount, channel} =
            homeList
          const {name, profileImageUrl} = channel

          return (
            <>
              <li>
                <LinkHomeItem
                  color={isDark ? '#0f0f0f' : '#f9f9f9'}
                  bgcolor={isDark ? '#f9f9f9' : '#0f0f0f'}
                  to={`/videos/${id}`}
                >
                  <img
                    src={thumbnailUrl}
                    alt="video thumbnail"
                    className="thumbnail-url"
                  />
                  <div className="flex-con">
                    <img
                      src={profileImageUrl}
                      alt="channel logo"
                      className="channel-logo"
                    />
                    <div>
                      <p className="channel-head">{title}</p>
                      <p>{name}</p>
                      <div className="view-con">
                        <p>{viewCount} views</p>
                        <BsDot className="dot-icon" />
                        <p>{publishedAt}</p>
                      </div>
                    </div>
                  </div>
                </LinkHomeItem>
              </li>
            </>
          )
        }}
      </NxtWatchContext.Consumer>
    )
  }
}
export default HomeListItem
