import styled from 'styled-components'
import { Link} from 'react-router-dom'

export const HomeContainer = styled.div`
padding-top:14vh;
margin-left:18vw;
 color:${props => props.color} ;
background-color:${props => props.bgColor} ;
min-height:100vh;
padding-left:20px;
padding-right:20px;
padding-bottom:20px;

`

export const LinkHomeItem = styled(Link)`
 color:${props => props.color} ;
background-color:${props => props.bgcolor} ;
 text-decoration: none;
 width:200px;
 margin:10px;
 padding:10px;
`
