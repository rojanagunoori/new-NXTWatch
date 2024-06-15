import styled from 'styled-components'

export const HomeDiv = styled.div`
 color:${props => props.color} ;
background-color:${props => props.bgColor} ;
`

export const HomeContainer = styled.div`
padding-top:14vh;
margin-left:18vw;
 color:${props => props.color} ;
 background-color: ${props => props.bgColor};
min-height:100vh;
padding-left:20px;
padding-right:20px;
padding-bottom:20px;
overflow: auto;
`

export const HomeSearchInput = styled.input`
color:${props => props.color} ;
background-color:${props => props.bgColor} ;
padding:10px;
font-size:15px;
height:40px;
width:50%;
 border:1px solid #ebebeb;
 outline:none;
`
export const ButtonSearch = styled.button`
color:${props => props.color} ;
background-color:${props => props.bgColor} ;
font-size:20px;
height:40px;
border:0px;
 border:1px solid #ebebeb;
`
export const HomeMainContainerUl = styled.ul`
list-style-type: none;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-top: 20px;
   padding-bottom: 20px;
   flex-wrap:wrap;
`
export const BannerContainer = styled.div`
background-image: url('https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png');
  background-size: cover;
  padding: 20px;
  width: 100%;
  color: #1e293b;
  display: flex;
  
  justify-content: space-between;
  align-items: flex-start;

`
