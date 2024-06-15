import styled from 'styled-components'
import {WiDaySunny} from 'react-icons/wi'
import {FaMoon, FaFire} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import {IoMdHome} from 'react-icons/io'

import {SiYoutubegaming} from 'react-icons/si'
import {RiMenuAddFill} from 'react-icons/ri'

import Popup from 'reactjs-popup'

import 'reactjs-popup/dist/index.css'

export const TopHeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  min-height: 10vh;
  color: ${props => props.color};
  background-color: ${props => props.bgColor};
  padding-left: 20px;
  padding-right: 20px;
  position: fixed;
  width: 100vw;
`

export const LogoImg = styled.img`
  width: 150px;
  display: flex;
  align-self: center;
  margin: 20px;
`
export const TopHeaderFlex = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const WiDaySunnyIcon = styled(WiDaySunny)`
  color: ${props => props.color};
  font-size: 50px;
  cursor: pointer;
  margin-left: 20px;
  margin-right: 20px;
`

export const FaMoonIcon = styled(FaMoon)`
  color: ${props => props.color};
  font-size: 35px;
  cursor: pointer;
  margin-left: 20px;
  margin-right: 20px;
`
export const ButtonLogOut = styled.button`
  margin-left: 20px;
  margin-right: 20px;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid;
  border-color: ${props => props.color};
  color: ${props => props.color};
  background-color: transparent;
  font-weight: 600;
`
export const LeftHeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 90vh;
  color: ${props => props.color};
  background-color: ${props => props.bgColor};
  position: fixed;
  width: 18vw;
  margin-top: 10vh;
  padding-bottom: 20px;
`

export const StyledUl = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`

export const LeftHeaderLi = styled.li`
  list-style-type: none;
  background-color: ${props =>
    props.isActive && (props.isDark ? '#d7dfe9' : '#1e293b')};
  width: 18vw;
  padding-top: 5px;
  padding-bottom: 5px;
  margin-top: 8px;
  margin-bottom: 8px;
  padding-left: 10px;
`

export const HomeIcons = styled(IoMdHome)`
  color: ${props => {
    if (props.color) {
      return 'red'
    } else {
      if (props.isDark) {
        return '#0f0f0f'
      } else {
        return '#f9f9f9'
      }
    }
  }};
  font-size: 30px;
  margin-right: 20px;
`

export const TrendIcons = styled(FaFire)`
  color: ${props => {
    if (props.color) {
      return 'red'
    } else {
      if (props.isDark) {
        return '#0f0f0f'
      } else {
        return '#f9f9f9'
      }
    }
  }};
  font-size: 25px;
  margin-right: 20px;
`

export const MenuIcons = styled(RiMenuAddFill)`
 color: ${props => {
    if (props.color) {
      return 'red'
    } else {
      if (props.isDark) {
        return '#0f0f0f'
      } else {
        return '#f9f9f9'
      }
    }
  }};
  font-size: 25px;
  margin-right: 20px;
`

export const GameIcons = styled(SiYoutubegaming)`
color: ${props => {
  if (props.color) {
    return 'red'
  } else {
    if (props.isDark) {
      return '#0f0f0f'
    } else {
      return '#f9f9f9'
    }
  }
}};
font-size: 25px;
margin-right:20px;

`

export const LinkElement = styled(Link)`
 text-decoration: none;
 color:${props => props.color} ;
 font-size: 15px;
 display:flex;

 flex-direction: row;
   justify-content: flex-start;
    align-items: center;
`
export const LeftHeaderBottom = styled.div`
color:${props => props.color} ;
padding:15px;
`

export const PopContainer = styled(Popup)`

&-content {
    background-color: ${props => props.bgColor};
    color: ${props => props.color};
    padding:20px;
  }
  &-overlay {
    padding:20px;
    background: rgba(0, 0, 0, 0.5);
  }

`
