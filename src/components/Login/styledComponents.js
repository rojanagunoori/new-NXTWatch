import styled from 'styled-components'

export const LoginContainer = styled.div`
display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    color:${props => props.color} ;
    background-color:${props => props.bgColor} ;
`

export const LogoImg = styled.img`
width: 150px;
  display: flex;
  align-self: center;

  margin: 20px;
`

export const LoginButton = styled.button`
  background-color: #3b82f6;
  color: ${props => props.color};
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 20px;
  width: 100%;
`
export const LoginForm = styled.form`
display: flex;
    flex-direction: column;
    justify-content: center;
   width:50vw;
  padding: 2%;
  box-shadow: 0px 4px 16px 0px #bfbfbf;
  border-radius: 20px;
    color:${props => props.color} ;
    background-color:${props => props.bgColor} ;
`
export const FormInput = styled.input`
margin-top: 10px;
  margin-bottom: 10px;
  width: 100%;
  outline: none;
  border: 1px solid #475569;
  background-color: transparent;
  padding: 10px;
  color:${props => props.color} ;

`
