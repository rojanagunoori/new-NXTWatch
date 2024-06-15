import styled from 'styled-components'

export const VideoItemDetailsContainer = styled.div`
  padding-top: 14vh;
margin-left:18vw;
 color:${props => props.color} ;
background-color:${props => props.bgColor} ;
  min-height:100vh;
padding-left:20px;
padding-right:20px;
padding-bottom:20px;
overflow: auto;
`
export const VideoItemDetailsContainerUl = styled.li`
list-style-type: none;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-top: 20px;
   padding-bottom: 20px;
   flex-wrap:wrap;
`

export const LikeButton = styled.button`
background-color: transparent;
  border: 0px;
  padding: 10px;
  color:${props => props.color} ;
  font-size:18px;
  display:flex;
  align-items:center;
`

export const DisLikeButton = styled.button`
background-color: transparent;
  border: 0px;
  padding: 10px;
  color:${props => props.color} ;
  font-size:18px;
  display:flex;
  align-items:center;
`

export const SaveButton = styled.button`
background-color: transparent;
  border: 0px;
  padding: 10px;
  color:${props => props.color} ;
  font-size:18px;
  display:flex;
  align-items:center;

`
