import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class LoginComponent extends Component {
  state = {
    username: '',
    password: '',
    errorMsg: '',
    isInvalid: false,
  }

  onChangeUsername = event => {
    this.setState({
      username: event.target.value,
    })
  }

  onChangePassword = event => {
    this.setState({
      password: event.target.value,
    })
  }

  onsubmitsuccess = jwtToken => {
    const {history} = this.props
    this.setState({
      isInvalid: false,
    })
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onsubmitfailure = errorMsg => {
    this.setState({
      isInvalid: true,
      username: '',
      errorMsg,
      password: '',
    })
  }

  onSubmitform = async event => {
    event.preventDefault()

    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)

    const data = await response.json()
    // console.log(data)
    // console.log(response.ok)
    if (response.ok) {
      this.onsubmitsuccess(data.jwt_token)
    } else {
      this.onsubmitfailure(data.error_msg)
    }
  }

  render() {
    const {username, password, isInvalid, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-container">
        <div className="login-card">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            className="logo"
            alt="website logo"
          />
          <h1 className="title">Jobby</h1>
          <form onSubmit={this.onSubmitform}>
            <div className="input-group">
              <label htmlFor="username" className="input-label">
                Username
              </label>
              <input
                type="text"
                placeholder="Enter username"
                id="username"
                value={username}
                onChange={this.onChangeUsername}
                className="input-field"
              />
            </div>
            <div className="input-group">
              <label htmlFor="password" className="input-label">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter password"
                id="password"
                value={password}
                onChange={this.onChangePassword}
                className="input-field"
              />
            </div>
            <button type="submit" className="login-button">
              Login
            </button>
            {isInvalid ? <p className="error-message">{errorMsg}</p> : ''}
          </form>
        </div>
      </div>
    )
  }
}

export default LoginComponent
