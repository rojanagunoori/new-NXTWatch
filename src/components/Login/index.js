import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import {
  LoginContainer,
  LoginForm,
  FormInput,
  LoginButton,
  LogoImg,
} from './styledComponents'

import NxtWatchContext from '../../context/NxtWatchContext'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    isTextPassword: false,
    isError: false,
    errorMsg: '',
  }

  onChangeUserName = e => {
    this.setState({username: e.target.value})
  }

  onChangePassword = e => {
    this.setState({password: e.target.value})
  }

  successData = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitForm = async e => {
    e.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const url = 'https://apis.ccbp.in/login'
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      this.successData(data.jwt_token)
    } else {
      this.setState({isError: true, errorMsg: data.error_msg})
    }
  }

  renderUserName = () => {
    const {username} = this.state
    return (
      <NxtWatchContext.Consumer>
        {value => {
          const {isDark} = value
          return (
            <div>
              <label className="label" htmlFor="username">
                USERNAME
              </label>
              <FormInput
                color={isDark ? '#0f0f0f' : '#f8fafc'}
                type="text"
                className="input"
                placeholder="Username"
                id="username"
                value={username}
                onChange={this.onChangeUserName}
              />
            </div>
          )
        }}
      </NxtWatchContext.Consumer>
    )
  }

  renderPassword = () => {
    const {password, isTextPassword} = this.state
    return (
      <NxtWatchContext.Consumer>
        {value => {
          const {isDark} = value
          return (
            <div>
              <label className="label" htmlFor="password">
                PASSWORD
              </label>
              <FormInput
                color={isDark ? '#0f0f0f' : '#f8fafc'}
                type={isTextPassword ? 'text' : 'password'}
                className="input"
                placeholder="Password"
                id="password"
                value={password}
                onChange={this.onChangePassword}
              />
            </div>
          )
        }}
      </NxtWatchContext.Consumer>
    )
  }

  onChangeShowPassword = e => {
    this.setState({isTextPassword: e.target.checked})
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <NxtWatchContext.Consumer>
        {value => {
          const {isDark} = value
          const {isError, errorMsg, isTextPassword} = this.state

          const loginUrl = !isDark
            ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
            : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'

          return (
            <LoginContainer
              color={isDark ? '#0f0f0f' : '#f9f9f9'}
              bgColor={isDark ? '#fff' : '#181818'}
            >
              <LoginForm
                color={isDark ? '#0f0f0f' : '#f9f9f9'}
                bgColor={isDark ? '#f9f9f9' : '#0f0f0f'}
                onSubmit={this.onSubmitForm}
              >
                <LogoImg src={loginUrl} alt="website logo" />
                {this.renderUserName()}
                {this.renderPassword()}
                <div className="checkbox-con">
                  <input
                    color={isDark ? '#0f0f0f' : '#0f0f0f'}
                    type="checkbox"
                    checked={isTextPassword}
                    placeholder="Password"
                    id="checkbox1"
                    value={isTextPassword}
                    onChange={this.onChangeShowPassword}
                  />
                  <label className="checkbox" htmlFor="checkbox1">
                    Show Password
                  </label>
                </div>

                <p className="small">username1: rahul,password1:rahul@2021</p>

                <p className="small">
                  username2: henry,password2:henry_the_developer
                </p>

                <LoginButton type="submit" color="#ffffff">
                  Login
                </LoginButton>
                {isError && <p className="error-para">*{errorMsg}</p>}
              </LoginForm>
            </LoginContainer>
          )
        }}
      </NxtWatchContext.Consumer>
    )
  }
}

export default Login
