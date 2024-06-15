import styled from 'styled-components'
import {Link} from 'react-router-dom'

export const TendingContainer = styled.div`
  padding-top: 14vh;
  margin-left: 18vw;
  color: ${props => props.color};
  background-color: ${props => props.bgColor};
  min-height: 100vh;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 20px;
  overflow: auto;
`
export const TrendingContainerUl = styled.ul`
  list-style-type: none;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding-top: 20px;
  padding-bottom: 20px;
  flex-wrap: wrap;
`

export const TrendIconContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: ${props => props.color};
  background-color: ${props => props.bgColor};
`
export const LinkIcon1 = styled(Link)`
  width: 100%;
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: ${props => props.color};
  background-color: ${props => props.bgcolor};
`
